import { getCookie, setCookie, getRequest } from "@tanstack/react-start/server";
import { verifyAccessToken, verifyRefreshToken, comparePassword, hashPassword, signAccessToken, signRefreshToken } from "./jwt.server";
import { getDb } from "../db/index.server";
import { users, companies, refreshTokens } from "../db/schema";
import { eq, and } from "drizzle-orm";
import type { AuthUser } from "../types";

export async function getSession(): Promise<AuthUser | null> {
  const db = getDb();
  try {
    // CSRF Protection: check request origin on mutation methods
    const request = getRequest();
    if (request && ["POST", "PUT", "DELETE", "PATCH"].includes(request.method)) {
      const origin = request.headers.get("origin");
      if (origin) {
        const host = request.headers.get("host") || "";
        try {
          const originHost = new URL(origin).host;
          if (originHost !== host) {
            console.warn(`Blocked CSRF attempt. Origin: ${origin}, Host: ${host}`);
            return null;
          }
        } catch (e) {
          // Ignore invalid URL
        }
      }
    }

    const token = getCookie("access_token");
    if (token) {
      const decoded = verifyAccessToken(token);
      const [user] = await db
        .select({
          id: users.id,
          email: users.email,
          fullName: users.fullName,
          role: users.role,
          companyId: users.companyId,
          avatarUrl: users.avatarUrl,
          status: users.status,
        })
        .from(users)
        .where(eq(users.id, decoded.userId))
        .limit(1);

      if (user && user.status === "active") {
        // Suspend user if company is suspended
        if (user.companyId) {
          const [company] = await db
            .select({ status: companies.status })
            .from(companies)
            .where(eq(companies.id, user.companyId))
            .limit(1);
          if (company && company.status === "suspended") {
            return null;
          }
        }
        return user as AuthUser;
      }
    }
  } catch (err) {
    // Access token invalid/expired, proceed to try refresh token rotation below
  }

  // Refresh Token Rotation (RTR)
  try {
    const refreshToken = getCookie("refresh_token");
    if (!refreshToken) {
      return null;
    }

    const decoded = verifyRefreshToken(refreshToken);
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        fullName: users.fullName,
        role: users.role,
        companyId: users.companyId,
        avatarUrl: users.avatarUrl,
        status: users.status,
      })
      .from(users)
      .leftJoin(companies, eq(users.companyId, companies.id))
      .where(eq(users.id, decoded.userId))
      .limit(1);

    if (!user || user.status !== "active") {
      return null;
    }

    // Suspend user if company is suspended
    if (user.companyId) {
      const [company] = await db
        .select({ status: companies.status })
        .from(companies)
        .where(eq(companies.id, user.companyId))
        .limit(1);
      if (company && company.status === "suspended") {
        return null;
      }
    }

    // Verify active refresh token in database
    const dbTokens = await db
      .select()
      .from(refreshTokens)
      .where(
        and(
          eq(refreshTokens.userId, user.id),
          eq(refreshTokens.revoked, false)
        )
      );

    let activeRecord = null;
    for (const r of dbTokens) {
      if (r.expiresAt < new Date()) continue;
      const isMatch = await comparePassword(refreshToken, r.tokenHash);
      if (isMatch) {
        activeRecord = r;
        break;
      }
    }

    if (!activeRecord) {
      return null;
    }

    // Revoke old refresh token (rotation)
    await db
      .update(refreshTokens)
      .set({ revoked: true })
      .where(eq(refreshTokens.id, activeRecord.id));

    // Sign new pair of tokens
    const newAccessToken = signAccessToken({
      userId: user.id,
      role: user.role,
      email: user.email,
    });
    const newRefreshToken = signRefreshToken(user.id);

    // Set new cookies
    const isProduction = process.env.NODE_ENV === "production";
    setCookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });
    setCookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    // Save new refresh token in DB
    const newHash = await hashPassword(newRefreshToken);
    await db.insert(refreshTokens).values({
      userId: user.id,
      tokenHash: newHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return user as AuthUser;
  } catch (e) {
    return null;
  }
}

export async function requireAuth(): Promise<AuthUser> {
  const session = await getSession();
  if (!session) {
    throw new Error(
      "Authentication required. Please log in to access this resource."
    );
  }
  return session;
}

export async function requireRole(allowedRoles: string[]): Promise<AuthUser> {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role)) {
    throw new Error(
      `Access denied. This action requires one of the following roles: ${allowedRoles.join(", ")}. Your current role is: ${user.role}.`
    );
  }
  return user;
}

export async function requireVerifiedCompany(user: AuthUser): Promise<void> {
  if (user.role === "company_admin" || user.role === "hr") {
    if (!user.companyId) {
      throw new Error("Company context is required for this action.");
    }
    const { getDb } = await import("../db/index.server");
    const { companies } = await import("../db/schema");
    const { eq } = await import("drizzle-orm");
    
    const db = getDb();
    const [comp] = await db
      .select({ status: companies.status })
      .from(companies)
      .where(eq(companies.id, user.companyId))
      .limit(1);

    if (!comp || comp.status !== "approved") {
      throw new Error("Company must be approved by Super Admin before accessing this feature.");
    }
  }
}
