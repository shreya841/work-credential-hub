import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { setCookie, deleteCookie } from "@tanstack/react-start/server";
import { getDb } from "@/lib/db/index.server";
import * as schema from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import {
  signAccessToken,
  signRefreshToken,
  hashPassword,
  comparePassword,
} from "@/lib/auth/jwt.server";
import { getSession, requireAuth } from "@/lib/auth/session.server";
import type { AuthUser } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

// ── Cookie helpers ───────────────────────────────────────────────────

const isProduction = () => process.env.NODE_ENV === "production";

function setAuthCookies(accessToken: string, refreshToken: string): void {
  setCookie("access_token", accessToken, {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15, // 15 minutes
  });
  setCookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

function clearAuthCookies(): void {
  deleteCookie("access_token", { path: "/" });
  deleteCookie("refresh_token", { path: "/" });
}

// ── loginUser ────────────────────────────────────────────────────────

export const loginUser = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string().email("Invalid email address"),
      password: z.string().min(1, "Password is required"),
    })
  )
  .handler(async ({ data }): Promise<{ user: AuthUser }> => {
    const db = getDb();

    // Find user by email
    const [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, data.email.toLowerCase().trim()))
      .limit(1);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Verify password
    const valid = await comparePassword(data.password, user.passwordHash);
    if (!valid) {
      throw new Error("Invalid email or password");
    }

    // Generate tokens
    const accessToken = signAccessToken({
      userId: user.id,
      role: user.role,
      email: user.email,
    });
    const refreshToken = signRefreshToken(user.id);

    // Set cookies
    setAuthCookies(accessToken, refreshToken);

    // Store refresh token hash in DB
    const refreshTokenHash = await hashPassword(refreshToken);
    await db.insert(schema.refreshTokens).values({
      userId: user.id,
      tokenHash: refreshTokenHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // Log audit
    await db.insert(schema.auditLogs).values({
      userId: user.id,
      action: "User logged in",
      targetType: "user",
      targetId: user.id,
      type: "login",
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role as AuthUser["role"],
        companyId: user.companyId,
        avatarUrl: user.avatarUrl,
      },
    };
  });

// ── signupUser ───────────────────────────────────────────────────────

export const signupUser = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string().email("Invalid email address"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      fullName: z.string().min(1, "Full name is required"),
      companyName: z.string().min(1, "Company name is required"),
      companyIndustry: z.string().min(1, "Industry is required"),
    })
  )
  .handler(async ({ data }): Promise<{ user: AuthUser }> => {
    const db = getDb();

    // Check if email already exists
    const [existing] = await db
      .select({ id: schema.users.id })
      .from(schema.users)
      .where(eq(schema.users.email, data.email.toLowerCase().trim()))
      .limit(1);

    if (existing) {
      throw new Error("An account with this email already exists");
    }

    // Create company
    const [company] = await db
      .insert(schema.companies)
      .values({
        name: data.companyName,
        industry: data.companyIndustry,
        size: "1-10",
        location: "",
        website: "",
      })
      .returning();

    // Hash password and create user
    const passwordHash = await hashPassword(data.password);
    const [user] = await db
      .insert(schema.users)
      .values({
        email: data.email.toLowerCase().trim(),
        passwordHash,
        fullName: data.fullName,
        role: "company_admin",
        companyId: company.id,
      })
      .returning();

    // Generate tokens
    const accessToken = signAccessToken({
      userId: user.id,
      role: user.role,
      email: user.email,
    });
    const refreshToken = signRefreshToken(user.id);

    // Set cookies
    setAuthCookies(accessToken, refreshToken);

    // Store refresh token hash
    const refreshTokenHash = await hashPassword(refreshToken);
    await db.insert(schema.refreshTokens).values({
      userId: user.id,
      tokenHash: refreshTokenHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // Log audit
    await db.insert(schema.auditLogs).values({
      userId: user.id,
      action: "User signed up and company created",
      targetType: "user",
      targetId: user.id,
      type: "create",
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role as AuthUser["role"],
        companyId: user.companyId,
        avatarUrl: user.avatarUrl,
      },
    };
  });

// ── forgotPassword ───────────────────────────────────────────────────

export const forgotPassword = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string().email("Invalid email address"),
    })
  )
  .handler(async ({ data }): Promise<{ message: string }> => {
    const db = getDb();

    const [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, data.email.toLowerCase().trim()))
      .limit(1);

    // Always return success to prevent email enumeration
    if (!user) {
      return {
        message:
          "If an account with that email exists, a password reset link has been sent.",
      };
    }

    // Generate a reset token
    const resetToken = uuidv4();
    const resetTokenHash = await hashPassword(resetToken);

    // Store as a refresh token with a short expiry (1 hour)
    await db.insert(schema.refreshTokens).values({
      userId: user.id,
      tokenHash: resetTokenHash,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    });

    // In production, send an email. For now, log the reset link.
    const resetLink = `${process.env.APP_URL ?? "http://localhost:3000"}/reset-password?token=${resetToken}&userId=${user.id}`;
    console.log(`[Password Reset] Link for ${user.email}: ${resetLink}`);

    return {
      message:
        "If an account with that email exists, a password reset link has been sent.",
    };
  });

// ── logoutUser ───────────────────────────────────────────────────────

export const logoutUser = createServerFn({ method: "POST" }).handler(
  async () => {
    const db = getDb();

    // Try to get current user before clearing cookies
    let userId: string | null = null;
    try {
      const session = await getSession();
      userId = session?.id ?? null;
    } catch {
      // Session may already be invalid
    }

    // Clear cookies
    clearAuthCookies();

    // Revoke all refresh tokens for user
    if (userId) {
      await db
        .delete(schema.refreshTokens)
        .where(eq(schema.refreshTokens.userId, userId));

      // Log audit
      await db.insert(schema.auditLogs).values({
        userId,
        action: "User logged out",
        targetType: "user",
        targetId: userId,
        type: "logout",
      });
    }

    return { success: true };
  }
);

// ── getCurrentUser ───────────────────────────────────────────────────

export const getCurrentUser = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ user: AuthUser | null }> => {
    const session = await getSession();
    return { user: session };
  }
);

// ── resetPassword ────────────────────────────────────────────────────

export const resetPassword = createServerFn({ method: "POST" })
  .validator(
    z.object({
      userId: z.string().uuid("Invalid user ID"),
      token: z.string().min(1, "Reset token is required"),
      newPassword: z.string().min(8, "Password must be at least 8 characters"),
    })
  )
  .handler(async ({ data }): Promise<{ success: boolean }> => {
    const db = getDb();

    // Fetch user
    const [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, data.userId))
      .limit(1);

    if (!user) {
      throw new Error("User not found");
    }

    // Fetch active tokens
    const tokens = await db
      .select()
      .from(schema.refreshTokens)
      .where(
        and(
          eq(schema.refreshTokens.userId, data.userId),
          eq(schema.refreshTokens.revoked, false)
        )
      );

    let validTokenId: string | null = null;
    for (const t of tokens) {
      if (t.expiresAt < new Date()) continue; // Expired
      const isMatch = await comparePassword(data.token, t.tokenHash);
      if (isMatch) {
        validTokenId = t.id;
        break;
      }
    }

    if (!validTokenId) {
      throw new Error("Invalid or expired reset token");
    }

    // Hash new password and update user
    const passwordHash = await hashPassword(data.newPassword);
    await db
      .update(schema.users)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(schema.users.id, data.userId));

    // Revoke the reset token used
    await db
      .update(schema.refreshTokens)
      .set({ revoked: true })
      .where(eq(schema.refreshTokens.id, validTokenId));

    // Log audit
    await db.insert(schema.auditLogs).values({
      userId: user.id,
      action: "Reset user account password via email link",
      targetType: "user",
      targetId: user.id,
      type: "update",
    });

    return { success: true };
  });

