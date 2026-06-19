import { createServerFn } from "@tanstack/react-start";
import { getDb } from "@/lib/db/index.server";
import * as schema from "@/lib/db/schema";
import { eq, desc, and, sql, count, inArray } from "drizzle-orm";
import { z } from "zod";
import { requireAuth, requireVerifiedCompany } from "@/lib/auth/session.server";
import type {
  DepartmentAnalyticsPoint,
  DashboardStats,
  HiringTrendPoint,
  RatingDistPoint,
  VerificationStatsPoint,
} from "@/lib/types";

// ── Helper Queries for Dashboard ─────────────────────────────────────

async function fetchDashboardStats(db: any, user: any): Promise<DashboardStats> {
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

  // Build company filter for non-super-admin (which will be company_admin or hr)
  const companyCondition =
    user.role !== "super_admin" && user.companyId
      ? eq(schema.employees.companyId, user.companyId)
      : undefined;

  // Single select query to get total, active and verified employee counts
  const empPromise = db
    .select({
      total: count(),
      active: sql<number>`count(*) filter (where ${schema.employees.status} = 'active')::int`,
      verified: sql<number>`count(*) filter (where ${schema.employees.verified} = true)::int`,
    })
    .from(schema.employees)
    .where(companyCondition);

  // Single select query to get total reviews
  const reviewPromise = companyCondition
    ? db
        .select({ total: count() })
        .from(schema.performanceReviews)
        .innerJoin(
          schema.employees,
          eq(schema.performanceReviews.employeeId, schema.employees.id)
        )
        .where(companyCondition)
    : db
        .select({ total: count() })
        .from(schema.performanceReviews);

  const [
    [empResult],
    [reviewResult]
  ] = await Promise.all([
    empPromise,
    reviewPromise
  ]);

  return {
    totalEmployees: empResult?.total ?? 0,
    activeEmployees: empResult?.active ?? 0,
    totalReviews: reviewResult?.total ?? 0,
    verifiedEmployees: empResult?.verified ?? 0,
  };
}

async function fetchHiringTrend(db: any, user: any): Promise<HiringTrendPoint[]> {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const companyFilter =
    user.role === "employee"
      ? sql`AND ${schema.employees.userId} = ${user.id}`
      : user.role !== "super_admin" && user.companyId
      ? sql`AND ${schema.employees.companyId} = ${user.companyId}`
      : sql``;

  // Hires by month
  const hiresPromise = db.execute(sql`
    SELECT
      TO_CHAR(${schema.employees.joiningDate}, 'YYYY-MM') AS month,
      COUNT(*)::int AS hires
    FROM ${schema.employees}
    WHERE ${schema.employees.joiningDate} >= ${sixMonthsAgo.toISOString()}
    ${companyFilter}
    GROUP BY TO_CHAR(${schema.employees.joiningDate}, 'YYYY-MM')
    ORDER BY month ASC
  `);

  // Exits by month
  const exitsPromise = db.execute(sql`
    SELECT
      TO_CHAR(${schema.employees.exitDate}, 'YYYY-MM') AS month,
      COUNT(*)::int AS exits
    FROM ${schema.employees}
    WHERE ${schema.employees.exitDate} IS NOT NULL
      AND ${schema.employees.exitDate} >= ${sixMonthsAgo.toISOString()}
    ${companyFilter}
    GROUP BY TO_CHAR(${schema.employees.exitDate}, 'YYYY-MM')
    ORDER BY month ASC
  `);

  const [hires, exits] = await Promise.all([hiresPromise, exitsPromise]);

  // Merge into a single array
  const hiresMap = new Map<string, number>();
  const exitsMap = new Map<string, number>();

  for (const row of hires as any as Array<{ month: string; hires: number }>) {
    hiresMap.set(row.month, row.hires);
  }
  for (const row of exits as any as Array<{ month: string; exits: number }>) {
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

async function fetchRatingDistribution(db: any, user: any): Promise<RatingDistPoint[]> {
  const companyFilter =
    user.role === "employee"
      ? sql`AND ${schema.employees.userId} = ${user.id}`
      : user.role !== "super_admin" && user.companyId
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
  for (const row of rows as any as Array<{
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

async function fetchDepartmentAnalytics(db: any, user: any): Promise<DepartmentAnalyticsPoint[]> {
  const companyFilter =
    user.role === "employee"
      ? sql`WHERE ${schema.employees.userId} = ${user.id}`
      : user.role !== "super_admin" && user.companyId
      ? sql`WHERE ${schema.employees.companyId} = ${user.companyId}`
      : sql``;

  const rows = await db.execute(sql`
    SELECT
      COALESCE(NULLIF(TRIM(${schema.employees.department}), ''), 'Unassigned') AS department,
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE ${schema.employees.verified} = true)::int AS verified
    FROM ${schema.employees}
    ${companyFilter}
    GROUP BY COALESCE(NULLIF(TRIM(${schema.employees.department}), ''), 'Unassigned')
    ORDER BY total DESC, department ASC
    LIMIT 8
  `);

  return (rows as any as Array<{ department: string; total: number; verified: number }>).map(
    (row) => ({
      department: row.department,
      total: Number(row.total),
      verified: Number(row.verified),
    })
  );
}

async function fetchVerificationStatistics(db: any, user: any): Promise<VerificationStatsPoint[]> {
  let companyFilter = sql``;
  if (user.role !== "super_admin") {
    const [emp] = await db
      .select({ id: schema.employees.id })
      .from(schema.employees)
      .where(eq(schema.employees.userId, user.id))
      .limit(1);
    
    if (emp) {
      companyFilter = sql`WHERE ${schema.verificationRequests.requestedById} = ${user.id} OR ${schema.verificationRequests.employeeId} = ${emp.id}`;
    } else {
      companyFilter = sql`WHERE ${schema.verificationRequests.requestedById} = ${user.id}`;
    }
  }

  const rows = await db.execute(sql`
    SELECT
      ${schema.verificationRequests.status} AS status,
      COUNT(*)::int AS count
    FROM ${schema.verificationRequests}
    LEFT JOIN ${schema.users}
      ON ${schema.verificationRequests.requestedById} = ${schema.users.id}
    ${companyFilter}
    GROUP BY ${schema.verificationRequests.status}
  `);

  const countMap = new Map<string, number>();
  for (const row of rows as any as Array<{ status: string; count: number }>) {
    countMap.set(row.status, Number(row.count));
  }

  return (["pending", "approved", "denied"] as const).map((status) => ({
    status,
    count: countMap.get(status) ?? 0,
  }));
}

async function fetchRecentEmployees(db: any, user: any) {
  const companyCondition =
    user.role !== "super_admin"
      ? eq(schema.employees.userId, user.id)
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

async function fetchRecentActivity(db: any, user: any) {
  const condition =
    user.role !== "super_admin"
      ? eq(schema.auditLogs.userId, user.id)
      : undefined;

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
    .where(condition)
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

// ── Combined Dashboard Data Server Function ──────────────────────────

export const getDashboardData = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await requireAuth();
    await requireVerifiedCompany(user);
    const db = getDb();

    const [
      stats,
      hiringTrend,
      ratingDist,
      departmentAnalytics,
      verificationStats,
      recentEmployees,
      recentActivity,
    ] = await Promise.all([
      fetchDashboardStats(db, user),
      fetchHiringTrend(db, user),
      fetchRatingDistribution(db, user),
      fetchDepartmentAnalytics(db, user),
      fetchVerificationStatistics(db, user),
      fetchRecentEmployees(db, user),
      fetchRecentActivity(db, user),
    ]);

    return {
      stats,
      hiringTrend,
      ratingDist,
      departmentAnalytics,
      verificationStats,
      recentEmployees,
      recentActivity,
    };
  }
);

// ── Expose individual functions for backwards compatibility ──────────

export const getDashboardStats = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await requireAuth();
    await requireVerifiedCompany(user);
    return fetchDashboardStats(getDb(), user);
  }
);

export const getHiringTrend = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await requireAuth();
    await requireVerifiedCompany(user);
    return fetchHiringTrend(getDb(), user);
  }
);

export const getRatingDistribution = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await requireAuth();
    await requireVerifiedCompany(user);
    return fetchRatingDistribution(getDb(), user);
  }
);

export const getDepartmentAnalytics = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await requireAuth();
    await requireVerifiedCompany(user);
    return fetchDepartmentAnalytics(getDb(), user);
  }
);

export const getVerificationStatistics = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await requireAuth();
    await requireVerifiedCompany(user);
    return fetchVerificationStatistics(getDb(), user);
  }
);

export const getRecentEmployees = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await requireAuth();
    await requireVerifiedCompany(user);
    return fetchRecentEmployees(getDb(), user);
  }
);

export const getRecentActivity = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await requireAuth();
    await requireVerifiedCompany(user);
    return fetchRecentActivity(getDb(), user);
  }
);

// ── seedCompanyDemoData ──────────────────────────────────────────────
export const seedCompanyDemoData = createServerFn({ method: "POST" })
  .validator(z.object({ companyId: z.string(), reviewerId: z.string() }))
  .handler(async ({ data }) => {
    const db = getDb();
    
    // Check if company has employees
    const [existing] = await db
      .select({ total: count() })
      .from(schema.employees)
      .where(eq(schema.employees.companyId, data.companyId));
      
    if (existing && existing.total > 0) {
      return { seeded: false, reason: "Company already has employees" };
    }

    // Insert mock employees
    const now = new Date();
    
    const getPastDate = (monthsAgo: number, daysAgo = 0) => {
      const d = new Date(now);
      d.setMonth(d.getMonth() - monthsAgo);
      d.setDate(d.getDate() - daysAgo);
      return d;
    };

    const mockEmployees = [
      {
        fullName: "Alice Johnson",
        email: "alice.j@company.com",
        phone: "555-0101",
        designation: "Senior Software Engineer",
        department: "Engineering",
        skills: ["React", "TypeScript", "Node.js", "GraphQL"],
        joiningDate: getPastDate(11),
        experience: 6,
        status: "active" as const,
        verified: true,
        rating: 4.8,
      },
      {
        fullName: "Bob Smith",
        email: "bob.s@company.com",
        phone: "555-0102",
        designation: "Software Engineer",
        department: "Engineering",
        skills: ["JavaScript", "React", "CSS", "Tailwind"],
        joiningDate: getPastDate(9),
        experience: 3,
        status: "active" as const,
        verified: true,
        rating: 4.2,
      },
      {
        fullName: "Charlie Davis",
        email: "charlie.d@company.com",
        phone: "555-0103",
        designation: "Senior Product Manager",
        department: "Product",
        skills: ["Product Strategy", "Agile", "Roadmapping", "SQL"],
        joiningDate: getPastDate(8),
        experience: 8,
        status: "active" as const,
        verified: true,
        rating: 4.5,
      },
      {
        fullName: "Diana Prince",
        email: "diana.p@company.com",
        phone: "555-0104",
        designation: "Account Executive",
        department: "Sales",
        skills: ["Negotiation", "CRM", "Salesforce", "Communication"],
        joiningDate: getPastDate(6),
        experience: 4,
        status: "active" as const,
        verified: false,
        rating: 3.9,
      },
      {
        fullName: "Ethan Hunt",
        email: "ethan.h@company.com",
        phone: "555-0105",
        designation: "Security Operations Analyst",
        department: "Engineering",
        skills: ["Cybersecurity", "Penetration Testing", "Linux", "Network Security"],
        joiningDate: getPastDate(5),
        experience: 5,
        status: "active" as const,
        verified: true,
        rating: 4.9,
      },
      {
        fullName: "Fiona Gallagher",
        email: "fiona.g@company.com",
        phone: "555-0106",
        designation: "HR Coordinator",
        department: "HR",
        skills: ["Recruiting", "Onboarding", "Employee Relations"],
        joiningDate: getPastDate(4),
        experience: 2,
        status: "active" as const,
        verified: false,
        rating: 4.0,
      },
      {
        fullName: "George Clark",
        email: "george.c@company.com",
        phone: "555-0107",
        designation: "Marketing Specialist",
        department: "Marketing",
        skills: ["SEO", "Content Writing", "Google Analytics", "Social Media"],
        joiningDate: getPastDate(3),
        experience: 3,
        status: "active" as const,
        verified: false,
        rating: 4.3,
      },
      {
        fullName: "Hannah Abbott",
        email: "hannah.a@company.com",
        phone: "555-0108",
        designation: "QA Engineer",
        department: "Engineering",
        skills: ["Cypress", "Selenium", "Manual Testing", "API Testing"],
        joiningDate: getPastDate(2),
        experience: 4,
        status: "active" as const,
        verified: true,
        rating: 4.6,
      },
      {
        fullName: "Ian Malcolm",
        email: "ian.m@company.com",
        phone: "555-0109",
        designation: "Product Designer",
        department: "Product",
        skills: ["Figma", "UI/UX", "Prototyping", "User Research"],
        joiningDate: getPastDate(1),
        experience: 3,
        status: "active" as const,
        verified: false,
        rating: 4.1,
      },
      {
        fullName: "Julia Roberts",
        email: "julia.r@company.com",
        phone: "555-0110",
        designation: "Sales Development Rep",
        department: "Sales",
        skills: ["Cold Calling", "Lead Gen", "Outreach", "Email Marketing"],
        joiningDate: getPastDate(0, 15),
        experience: 1,
        status: "active" as const,
        verified: false,
        rating: 4.4,
      },
      {
        fullName: "Kevin Bacon",
        email: "kevin.b@company.com",
        phone: "555-0111",
        designation: "Account Executive",
        department: "Sales",
        skills: ["Sales", "B2B", "Presentations"],
        joiningDate: getPastDate(10),
        exitDate: getPastDate(2),
        experience: 5,
        status: "exited" as const,
        verified: true,
        rating: 3.5,
      },
      {
        fullName: "Laura Croft",
        email: "laura.c@company.com",
        phone: "555-0112",
        designation: "Senior Frontend Engineer",
        department: "Engineering",
        skills: ["Next.js", "React", "CSS Grid", "Performance"],
        joiningDate: getPastDate(7),
        exitDate: getPastDate(1),
        experience: 7,
        status: "exited" as const,
        verified: true,
        rating: 4.7,
      },
    ];

    await db.transaction(async (tx) => {
      for (const emp of mockEmployees) {
        const empId = `EMP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
        const [insertedEmp] = await tx
          .insert(schema.employees)
          .values({
            employeeId: empId,
            companyId: data.companyId,
            fullName: emp.fullName,
            email: emp.email,
            phone: emp.phone,
            designation: emp.designation,
            department: emp.department,
            skills: emp.skills,
            joiningDate: emp.joiningDate,
            exitDate: emp.exitDate,
            experience: emp.experience,
            status: emp.status,
            verified: emp.verified,
            rating: emp.rating,
          })
          .returning();

        // Create a couple of reviews for each verified employee
        if (emp.verified) {
          await tx.insert(schema.performanceReviews).values({
            employeeId: insertedEmp.id,
            reviewerId: data.reviewerId,
            period: "2025 Annual",
            productivity: Math.round(emp.rating),
            teamwork: Math.round(emp.rating - 0.2),
            communication: Math.round(emp.rating + 0.1),
            leadership: Math.round(emp.rating),
            attendance: 5,
            overall: emp.rating,
            feedback: `Great performance overall. Highly skilled and reliable employee who contributes significantly to ${emp.department}.`,
          });
          
          // Add verification request history
          await tx.insert(schema.verificationRequests).values({
            requestedById: data.reviewerId,
            employeeId: insertedEmp.id,
            status: "approved",
            requestType: "background_check",
            responseData: { verified: true, verifiedAt: new Date().toISOString() },
            resolvedAt: new Date(),
          });
        } else if (emp.fullName === "Ethan Hunt") {
          // Pending request
          await tx.insert(schema.verificationRequests).values({
            requestedById: data.reviewerId,
            employeeId: insertedEmp.id,
            status: "pending",
            requestType: "security_clearance",
          });
        } else if (emp.fullName === "Ian Malcolm") {
          // Denied request
          await tx.insert(schema.verificationRequests).values({
            requestedById: data.reviewerId,
            employeeId: insertedEmp.id,
            status: "denied",
            requestType: "resume_verification",
            resolvedAt: new Date(),
          });
        }
      }
      
      // Update company employee count
      await tx
        .update(schema.companies)
        .set({ employeeCount: mockEmployees.length })
        .where(eq(schema.companies.id, data.companyId));
    });

    return { seeded: true };
  });
