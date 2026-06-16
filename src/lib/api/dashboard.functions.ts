import { createServerFn } from "@tanstack/react-start";
import { getDb } from "@/lib/db/index.server";
import * as schema from "@/lib/db/schema";
import { eq, desc, and, sql, count } from "drizzle-orm";
import { requireAuth } from "@/lib/auth/session.server";
import type {
  DashboardStats,
  HiringTrendPoint,
  RatingDistPoint,
} from "@/lib/types";

// ── getDashboardStats ────────────────────────────────────────────────

export const getDashboardStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<DashboardStats> => {
    const user = await requireAuth();
    const db = getDb();

    // Employee role: only their own stats
    if (user.role === "employee") {
      const [empRow] = await db
        .select()
        .from(schema.employees)
        .where(eq(schema.employees.userId, user.id))
        .limit(1);

      if (!empRow) {
        return {
          totalEmployees: 0,
          activeEmployees: 0,
          totalReviews: 0,
          verifiedEmployees: 0,
        };
      }

      const [reviewCount] = await db
        .select({ total: count() })
        .from(schema.performanceReviews)
        .where(eq(schema.performanceReviews.employeeId, empRow.id));

      return {
        totalEmployees: 1,
        activeEmployees: empRow.status === "active" ? 1 : 0,
        totalReviews: reviewCount?.total ?? 0,
        verifiedEmployees: empRow.verified ? 1 : 0,
      };
    }

    // Build company filter for non-super-admin
    const companyCondition =
      user.role !== "super_admin" && user.companyId
        ? eq(schema.employees.companyId, user.companyId)
        : undefined;

    const [totalResult] = await db
      .select({ total: count() })
      .from(schema.employees)
      .where(companyCondition);

    const [activeResult] = await db
      .select({ total: count() })
      .from(schema.employees)
      .where(
        companyCondition
          ? and(companyCondition, eq(schema.employees.status, "active"))
          : eq(schema.employees.status, "active")
      );

    const [verifiedResult] = await db
      .select({ total: count() })
      .from(schema.employees)
      .where(
        companyCondition
          ? and(companyCondition, eq(schema.employees.verified, true))
          : eq(schema.employees.verified, true)
      );

    // Reviews: join through employees for company scoping
    let reviewTotal = 0;
    if (companyCondition) {
      const [reviewResult] = await db
        .select({ total: count() })
        .from(schema.performanceReviews)
        .innerJoin(
          schema.employees,
          eq(schema.performanceReviews.employeeId, schema.employees.id)
        )
        .where(companyCondition);
      reviewTotal = reviewResult?.total ?? 0;
    } else {
      const [reviewResult] = await db
        .select({ total: count() })
        .from(schema.performanceReviews);
      reviewTotal = reviewResult?.total ?? 0;
    }

    return {
      totalEmployees: totalResult?.total ?? 0,
      activeEmployees: activeResult?.total ?? 0,
      totalReviews: reviewTotal,
      verifiedEmployees: verifiedResult?.total ?? 0,
    };
  }
);

// ── getHiringTrend ───────────────────────────────────────────────────

export const getHiringTrend = createServerFn({ method: "GET" }).handler(
  async (): Promise<HiringTrendPoint[]> => {
    const user = await requireAuth();
    const db = getDb();

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const companyFilter =
      user.role !== "super_admin" && user.companyId
        ? sql`AND ${schema.employees.companyId} = ${user.companyId}`
        : sql``;

    // Hires by month
    const hires = await db.execute(sql`
      SELECT
        TO_CHAR(${schema.employees.joiningDate}, 'YYYY-MM') AS month,
        COUNT(*)::int AS hires
      FROM ${schema.employees}
      WHERE ${schema.employees.joiningDate} >= ${sixMonthsAgo}
      ${companyFilter}
      GROUP BY TO_CHAR(${schema.employees.joiningDate}, 'YYYY-MM')
      ORDER BY month ASC
    `);

    // Exits by month
    const exits = await db.execute(sql`
      SELECT
        TO_CHAR(${schema.employees.exitDate}, 'YYYY-MM') AS month,
        COUNT(*)::int AS exits
      FROM ${schema.employees}
      WHERE ${schema.employees.exitDate} IS NOT NULL
        AND ${schema.employees.exitDate} >= ${sixMonthsAgo}
      ${companyFilter}
      GROUP BY TO_CHAR(${schema.employees.exitDate}, 'YYYY-MM')
      ORDER BY month ASC
    `);

    // Merge into a single array
    const hiresMap = new Map<string, number>();
    const exitsMap = new Map<string, number>();

    for (const row of hires.rows as Array<{ month: string; hires: number }>) {
      hiresMap.set(row.month, row.hires);
    }
    for (const row of exits.rows as Array<{ month: string; exits: number }>) {
      exitsMap.set(row.month, row.exits);
    }

    // Generate last 6 months
    const result: HiringTrendPoint[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      result.push({
        month: key,
        hires: hiresMap.get(key) ?? 0,
        exits: exitsMap.get(key) ?? 0,
      });
    }

    return result;
  }
);

// ── getRatingDistribution ────────────────────────────────────────────

export const getRatingDistribution = createServerFn({ method: "GET" }).handler(
  async (): Promise<RatingDistPoint[]> => {
    const user = await requireAuth();
    const db = getDb();

    const companyFilter =
      user.role !== "super_admin" && user.companyId
        ? sql`AND ${schema.employees.companyId} = ${user.companyId}`
        : sql``;

    const rows = await db.execute(sql`
      SELECT
        ROUND(${schema.performanceReviews.overall})::int AS rating_bucket,
        COUNT(*)::int AS review_count
      FROM ${schema.performanceReviews}
      INNER JOIN ${schema.employees}
        ON ${schema.performanceReviews.employeeId} = ${schema.employees.id}
      WHERE ${schema.performanceReviews.overall} > 0
      ${companyFilter}
      GROUP BY ROUND(${schema.performanceReviews.overall})::int
      ORDER BY rating_bucket ASC
    `);

    // Ensure we always have entries for ratings 1-5
    const countMap = new Map<number, number>();
    for (const row of rows.rows as Array<{
      rating_bucket: number;
      review_count: number;
    }>) {
      countMap.set(row.rating_bucket, row.review_count);
    }

    const result: RatingDistPoint[] = [];
    for (let i = 1; i <= 5; i++) {
      result.push({
        rating: `${i} Star${i > 1 ? "s" : ""}`,
        count: countMap.get(i) ?? 0,
      });
    }

    return result;
  }
);

// ── getRecentEmployees ───────────────────────────────────────────────

export const getRecentEmployees = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await requireAuth();
    const db = getDb();

    const companyCondition =
      user.role !== "super_admin" && user.companyId
        ? eq(schema.employees.companyId, user.companyId)
        : undefined;

    const rows = await db
      .select({
        id: schema.employees.id,
        employeeId: schema.employees.employeeId,
        fullName: schema.employees.fullName,
        email: schema.employees.email,
        designation: schema.employees.designation,
        department: schema.employees.department,
        status: schema.employees.status,
        photoUrl: schema.employees.photoUrl,
        verified: schema.employees.verified,
        rating: schema.employees.rating,
        createdAt: schema.employees.createdAt,
      })
      .from(schema.employees)
      .where(companyCondition)
      .orderBy(desc(schema.employees.createdAt))
      .limit(6);

    return rows.map((row) => ({
      ...row,
      createdAt:
        row.createdAt instanceof Date
          ? row.createdAt.toISOString()
          : String(row.createdAt),
    }));
  }
);

// ── getRecentActivity ────────────────────────────────────────────────

export const getRecentActivity = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await requireAuth();
    const db = getDb();

    const rows = await db
      .select({
        id: schema.auditLogs.id,
        userId: schema.auditLogs.userId,
        userName: sql<string>`COALESCE(${schema.users.fullName}, 'System')`,
        action: schema.auditLogs.action,
        targetType: schema.auditLogs.targetType,
        targetId: schema.auditLogs.targetId,
        timestamp: schema.auditLogs.timestamp,
        type: schema.auditLogs.type,
      })
      .from(schema.auditLogs)
      .leftJoin(schema.users, eq(schema.auditLogs.userId, schema.users.id))
      .orderBy(desc(schema.auditLogs.timestamp))
      .limit(6);

    return rows.map((row) => ({
      ...row,
      userName: row.userName ?? "System",
      timestamp:
        row.timestamp instanceof Date
          ? row.timestamp.toISOString()
          : String(row.timestamp),
    }));
  }
);

// ── getDepartmentAnalytics ───────────────────────────────────────────

export const getDepartmentAnalytics = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await requireAuth();
    const db = getDb();

    const companyFilter =
      user.role !== "super_admin" && user.companyId
        ? sql`AND ${schema.employees.companyId} = ${user.companyId}`
        : sql``;

    const rows = await db.execute(sql`
      SELECT
        COALESCE(${schema.employees.department}, 'General') AS department,
        COUNT(*)::int AS employee_count,
        ROUND(AVG(${schema.employees.rating})::numeric, 2)::float AS avg_rating
      FROM ${schema.employees}
      WHERE ${schema.employees.status} = 'active'
      ${companyFilter}
      GROUP BY COALESCE(${schema.employees.department}, 'General')
      ORDER BY avg_rating DESC
    `);

    return rows.rows as Array<{
      department: string;
      employee_count: number;
      avg_rating: number;
    }>;
  }
);

// ── getVerificationStats ─────────────────────────────────────────────

export const getVerificationStats = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await requireAuth();
    const db = getDb();

    let companyFilter = sql``;
    if (user.role === "employee") {
      const [employee] = await db
        .select({ id: schema.employees.id })
        .from(schema.employees)
        .where(eq(schema.employees.userId, user.id))
        .limit(1);

      if (!employee) {
        return { pending: 0, approved: 0, denied: 0, expired: 0 };
      }
      companyFilter = sql`AND ${schema.verificationRequests.employeeId} = ${employee.id}`;
    } else if (user.role === "hr" || user.role === "company_admin") {
      companyFilter = sql`AND ${schema.verificationRequests.requestedById} = ${user.id}`;
    }

    const rows = await db.execute(sql`
      SELECT
        status,
        COUNT(*)::int AS count
      FROM ${schema.verificationRequests}
      WHERE 1=1
      ${companyFilter}
      GROUP BY status
    `);

    const stats = { pending: 0, approved: 0, denied: 0, expired: 0 };
    for (const row of rows.rows as Array<{ status: string; count: number }>) {
      if (row.status in stats) {
        stats[row.status as keyof typeof stats] = row.count;
      }
    }

    return stats;
  }
);
