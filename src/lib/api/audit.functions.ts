import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "@/lib/db/index.server";
import * as schema from "@/lib/db/schema";
import { eq, desc, and, like, sql, count, or } from "drizzle-orm";
import { requireAuth, requireRole } from "@/lib/auth/session.server";
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

    return entry as any;
  });

// ── listAuditLogs ────────────────────────────────────────────────────
// Paginated, filterable list of audit logs. Requires auth.

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
    })
  )
  .handler(async ({ data }): Promise<PaginatedResult<AuditEntry>> => {
    const user = await requireAuth();
    const db = getDb();

    const page = data.page ?? 1;
    const pageSize = data.pageSize ?? 20;
    const offset = (page - 1) * pageSize;

    // Build conditions
    const conditions: ReturnType<typeof eq>[] = [];

    if (user.role !== "super_admin") {
      conditions.push(eq(schema.auditLogs.userId, user.id));
    }

    if (data.type) {
      conditions.push(eq(schema.auditLogs.type, data.type));
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
