import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "@/lib/db/index.server";
import * as schema from "@/lib/db/schema";
import { eq, and, desc, count } from "drizzle-orm";
import { requireAuth, requireRole } from "@/lib/auth/session.server";
import { comparePassword, hashPassword } from "@/lib/auth/jwt.server";
import type { User, PaginatedResult } from "@/lib/types";

// ── getCurrentUserProfile ───────────────────────────────────────────

export const getCurrentUserProfile = createServerFn({ method: "GET" }).handler(
  async (): Promise<User> => {
    const user = await requireAuth();
    const db = getDb();

    const [profile] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, user.id))
      .limit(1);

    if (!profile) {
      throw new Error("User profile not found");
    }

    return {
      id: profile.id,
      email: profile.email,
      fullName: profile.fullName,
      role: profile.role as User["role"],
      companyId: profile.companyId,
      avatarUrl: profile.avatarUrl,
      createdAt: profile.createdAt.toISOString(),
      updatedAt: profile.updatedAt.toISOString(),
    };
  }
);

// ── updateUserProfile ───────────────────────────────────────────────

export const updateUserProfile = createServerFn({ method: "POST" })
  .validator(
    z.object({
      fullName: z.string().min(1, "Full name is required").optional(),
      avatarUrl: z.string().url("Invalid avatar URL").nullable().optional(),
    })
  )
  .handler(async ({ data }): Promise<User> => {
    const user = await requireAuth();
    const db = getDb();

    const updates: Record<string, unknown> = {};
    if (data.fullName !== undefined) updates.fullName = data.fullName;
    if (data.avatarUrl !== undefined) updates.avatarUrl = data.avatarUrl;

    if (Object.keys(updates).length === 0) {
      throw new Error("No fields to update");
    }

    updates.updatedAt = new Date();

    const [updated] = await db
      .update(schema.users)
      .set(updates)
      .where(eq(schema.users.id, user.id))
      .returning();

    if (user.role === "employee" && data.fullName) {
      await db
        .update(schema.employees)
        .set({ fullName: data.fullName, photoUrl: data.avatarUrl ?? null })
        .where(eq(schema.employees.userId, user.id));
    }

    await db.insert(schema.auditLogs).values({
      userId: user.id,
      action: "Updated user profile details",
      targetType: "user",
      targetId: user.id,
      type: "update",
    });

    return {
      id: updated.id,
      email: updated.email,
      fullName: updated.fullName,
      role: updated.role as User["role"],
      companyId: updated.companyId,
      avatarUrl: updated.avatarUrl,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    };
  });

// ── changePassword ──────────────────────────────────────────────────

export const changePassword = createServerFn({ method: "POST" })
  .validator(
    z.object({
      currentPassword: z.string().min(1, "Current password is required"),
      newPassword: z.string().min(8, "New password must be at least 8 characters"),
    })
  )
  .handler(async ({ data }): Promise<{ success: boolean }> => {
    const user = await requireAuth();
    const db = getDb();

    const [dbUser] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, user.id))
      .limit(1);

    if (!dbUser) {
      throw new Error("User not found");
    }

    const valid = await comparePassword(data.currentPassword, dbUser.passwordHash);
    if (!valid) {
      throw new Error("Current password is incorrect");
    }

    const passwordHash = await hashPassword(data.newPassword);

    await db
      .update(schema.users)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(schema.users.id, user.id));

    await db.insert(schema.auditLogs).values({
      userId: user.id,
      action: "Changed user account password",
      targetType: "user",
      targetId: user.id,
      type: "update",
    });

    return { success: true };
  });

// ── listUsers ───────────────────────────────────────────────────────

export const listUsers = createServerFn({ method: "GET" })
  .validator(
    z.object({
      page: z.number().int().positive().optional().default(1),
      pageSize: z.number().int().positive().optional().default(20),
    })
  )
  .handler(async ({ data }): Promise<PaginatedResult<User>> => {
    const user = await requireRole(["super_admin", "company_admin"]);
    const db = getDb();

    const page = data.page ?? 1;
    const pageSize = data.pageSize ?? 20;
    const offset = (page - 1) * pageSize;

    const conditions = [];

    if (user.role === "company_admin" && user.companyId) {
      conditions.push(eq(schema.users.companyId, user.companyId));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [totalResult] = await db
      .select({ total: count() })
      .from(schema.users)
      .where(whereClause);

    const total = totalResult?.total ?? 0;

    const rows = await db
      .select()
      .from(schema.users)
      .where(whereClause)
      .orderBy(desc(schema.users.createdAt))
      .limit(pageSize)
      .offset(offset);

    const usersList: User[] = rows.map((row) => ({
      id: row.id,
      email: row.email,
      fullName: row.fullName,
      role: row.role as User["role"],
      companyId: row.companyId,
      avatarUrl: row.avatarUrl,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    }));

    return {
      data: usersList,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  });
