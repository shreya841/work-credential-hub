import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "@/lib/db/index.server";
import * as schema from "@/lib/db/schema";
import { eq, desc, and, like, sql, count, or } from "drizzle-orm";
import { requireRole } from "@/lib/auth/session.server";
import type { AuditActionType, PaginatedResult, AuditEntry } from "@/lib/types";

// ── logAction ────────────────────────────────────────────────────────
// Internal helper server function to record an audit log entry.

export const logAction = createServerFn({ method: "POST" })
  .validator(
    z.object({
      userId: z.string().uuid(),
      action: z.string().min(1),
      targetType: z.string().min(1),
      targetId: z.string().min(1),
      type: z.enum([
        "login",
        "logout",
        "access",
        "create",
        "update",
        "delete",
        "verification_request",
        "consent_change",
      ]),
      metadata: z.record(z.unknown()).optional(),
      ipAddress: z.string().optional(),
    })
  )
  .handler(async ({ data }) => {
    const db = getDb();

    const [entry] = await db
      .insert(schema.auditLogs)
      .values({
        userId: data.userId,
        action: data.action,
        targetType: data.targetType,
        targetId: data.targetId,
        type: data.type,
        metadata: data.metadata ?? null,
        ipAddress: data.ipAddress ?? null,
      })
      .returning();

    return entry;
  });

export const listAuditLogs = createServerFn({ method: "GET" })
  .validator(
    z.object({
      page: z.number().int().positive().optional().default(1),
      pageSize: z.number().int().positive().max(100).optional().default(20),
      type: z
        .enum([
          "login",
          "logout",
          "access",
          "create",
          "update",
          "delete",
          "verification_request",
          "consent_change",
        ])
        .optional(),
      search: z.string().optional(),
      targetId: z.string().optional(),
      userId: z.string().uuid().optional(),
    })
  )
  .handler(async ({ data }): Promise<PaginatedResult<AuditEntry>> => {
    const user = await requireAuth();
    const db = getDb();

    // Check permissions: only admins/HR can view general audit logs. Employees can only view logs matching their own ID.
    if (user.role !== "super_admin" && user.role !== "company_admin" && user.role !== "hr") {
      // If targetId is provided, check if it belongs to this employee
      if (data.targetId) {
        const [emp] = await db
          .select({ userId: schema.employees.userId })
          .from(schema.employees)
          .where(eq(schema.employees.id, data.targetId))
          .limit(1);
        if (!emp || emp.userId !== user.id) {
          throw new Error("Access denied. You can only view audit logs for your own profile.");
        }
      } else if (data.userId !== user.id) {
        throw new Error("Access denied. You can only view audit logs for your own profile.");
      }
    }

    const page = data.page ?? 1;
    const pageSize = data.pageSize ?? 20;
    const offset = (page - 1) * pageSize;

    // Build conditions
    const conditions: any[] = [];

    if (data.type) {
      conditions.push(eq(schema.auditLogs.type, data.type));
    }

    if (data.targetId) {
      conditions.push(eq(schema.auditLogs.targetId, data.targetId));
    }

    if (data.userId) {
      conditions.push(eq(schema.auditLogs.userId, data.userId));
    }

    if (data.search) {
      const searchPattern = `%${data.search}%`;
      conditions.push(
        or(
          like(schema.auditLogs.action, searchPattern),
          like(schema.auditLogs.targetType, searchPattern),
          like(schema.auditLogs.targetId, searchPattern)
        )!
      );
    }

    const whereClause =
      conditions.length > 0 ? and(...conditions) : undefined;

    // Count total
    const [totalResult] = await db
      .select({ total: count() })
      .from(schema.auditLogs)
      .where(whereClause);

    const total = totalResult?.total ?? 0;

    // Fetch paginated rows with user name
    const rows = await db
      .select({
        id: schema.auditLogs.id,
        userId: schema.auditLogs.userId,
        userName: sql<string>`COALESCE(${schema.users.fullName}, 'System')`,
        action: schema.auditLogs.action,
        targetType: schema.auditLogs.targetType,
        targetId: schema.auditLogs.targetId,
        metadata: schema.auditLogs.metadata,
        ipAddress: schema.auditLogs.ipAddress,
        timestamp: schema.auditLogs.timestamp,
        type: schema.auditLogs.type,
      })
      .from(schema.auditLogs)
      .leftJoin(schema.users, eq(schema.auditLogs.userId, schema.users.id))
      .where(whereClause)
      .orderBy(desc(schema.auditLogs.timestamp))
      .limit(pageSize)
      .offset(offset);

    const entries: AuditEntry[] = rows.map((row) => ({
      id: row.id,
      userId: row.userId,
      userName: row.userName ?? "System",
      action: row.action,
      targetType: row.targetType,
      targetId: row.targetId,
      metadata: row.metadata as Record<string, unknown> | null,
      ipAddress: row.ipAddress,
      timestamp:
        row.timestamp instanceof Date
          ? row.timestamp.toISOString()
          : String(row.timestamp),
      type: row.type as AuditActionType,
    }));

    return {
      data: entries,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  });
