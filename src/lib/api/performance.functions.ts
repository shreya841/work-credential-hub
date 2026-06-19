import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "@/lib/db/index.server";
import * as schema from "@/lib/db/schema";
import { eq, desc, and, sql, count, avg } from "drizzle-orm";
import { requireAuth, requireRole, requireVerifiedCompany } from "@/lib/auth/session.server";
import type { PerformanceReview } from "@/lib/types";

// ── listReviews ──────────────────────────────────────────────────────

export const listReviews = createServerFn({ method: "GET" })
  .validator(
    z.object({
      employeeId: z.string().uuid("Invalid employee ID"),
    })
  )
  .handler(async ({ data }): Promise<PerformanceReview[]> => {
    const user = await requireAuth();
    await requireVerifiedCompany(user);
    const db = getDb();

    // Verify access to the employee
    const [employee] = await db
      .select()
      .from(schema.employees)
      .where(eq(schema.employees.id, data.employeeId))
      .limit(1);

    if (!employee) {
      throw new Error("Employee not found");
    }

    // Check permissions: super_admin, company_admin, hr, or the employee themselves can see reviews
    if (user.role !== "super_admin" && user.role !== "company_admin" && user.role !== "hr" && user.id !== employee.userId) {
      throw new Error("You do not have access to this employee's reviews.");
    }

    const rows = await db
      .select({
        id: schema.performanceReviews.id,
        employeeId: schema.performanceReviews.employeeId,
        reviewerId: schema.performanceReviews.reviewerId,
        reviewerName: sql<string>`COALESCE(${schema.performanceReviews.reviewerName}, ${schema.users.fullName}, 'Unknown')`,
        period: schema.performanceReviews.period,
        productivity: schema.performanceReviews.productivity,
        teamwork: schema.performanceReviews.teamwork,
        communication: schema.performanceReviews.communication,
        leadership: schema.performanceReviews.leadership,
        attendance: schema.performanceReviews.attendance,
        overall: schema.performanceReviews.overall,
        feedback: schema.performanceReviews.feedback,
        createdAt: schema.performanceReviews.createdAt,
      })
      .from(schema.performanceReviews)
      .leftJoin(
        schema.users,
        eq(schema.performanceReviews.reviewerId, schema.users.id)
      )
      .where(eq(schema.performanceReviews.employeeId, data.employeeId))
      .orderBy(desc(schema.performanceReviews.createdAt));

    return rows.map((row) => ({
      id: row.id,
      employeeId: row.employeeId,
      reviewerId: row.reviewerId,
      reviewerName: row.reviewerName ?? "Unknown",
      period: row.period,
      productivity: Number(row.productivity),
      teamwork: Number(row.teamwork),
      communication: Number(row.communication),
      leadership: Number(row.leadership),
      attendance: Number(row.attendance),
      overall: Number(row.overall),
      feedback: row.feedback,
      createdAt:
        row.createdAt instanceof Date
          ? row.createdAt.toISOString()
          : String(row.createdAt),
    }));
  });

// ── createReview ─────────────────────────────────────────────────────

const ratingSchema = z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5");

export const createReview = createServerFn({ method: "POST" })
  .validator(
    z.object({
      employeeId: z.string().uuid("Invalid employee ID"),
      period: z.string().min(1, "Review period is required"),
      productivity: ratingSchema,
      teamwork: ratingSchema,
      communication: ratingSchema,
      leadership: ratingSchema,
      attendance: z.number().min(0, "Attendance must be at least 0").max(100, "Attendance must be at most 100"),
      feedback: z.string().min(1, "Feedback is required"),
      reviewerName: z.string().min(1, "Reviewer name is required").optional(),
    })
  )
  .handler(async ({ data }) => {
    const user = await requireRole(["super_admin", "company_admin", "hr"]);
    await requireVerifiedCompany(user);
    const db = getDb();

    // Verify employee exists and is accessible
    const [employee] = await db
      .select()
      .from(schema.employees)
      .where(eq(schema.employees.id, data.employeeId))
      .limit(1);

    if (!employee) {
      throw new Error("Employee not found");
    }

    if (user.role !== "super_admin" && user.companyId !== employee.companyId) {
      throw new Error("You can only review employees in your company");
    }

    // Calculate overall rating (attendance is scaled: (attendance/100)*5)
    const overall =
      (data.productivity +
        data.teamwork +
        data.communication +
        data.leadership +
        (data.attendance / 100) * 5) /
      5;

    const [review] = await db
      .insert(schema.performanceReviews)
      .values({
        employeeId: data.employeeId,
        reviewerId: user.id,
        reviewerName: data.reviewerName || user.fullName,
        period: data.period,
        productivity: data.productivity,
        teamwork: data.teamwork,
        communication: data.communication,
        leadership: data.leadership,
        attendance: data.attendance,
        overall: Math.round(overall * 100) / 100,
        feedback: data.feedback,
      })
      .returning();

    // Update employee's average rating
    const [avgResult] = await db
      .select({ avgRating: avg(schema.performanceReviews.overall) })
      .from(schema.performanceReviews)
      .where(eq(schema.performanceReviews.employeeId, data.employeeId));

    const newAvgRating = avgResult?.avgRating
      ? Math.round(Number(avgResult.avgRating) * 100) / 100
      : overall;

    await db
      .update(schema.employees)
      .set({ rating: newAvgRating, updatedAt: new Date() })
      .where(eq(schema.employees.id, data.employeeId));

    // Audit
    await db.insert(schema.auditLogs).values({
      userId: user.id,
      action: `Created performance review for ${employee.fullName} (${data.period})`,
      targetType: "performance_review",
      targetId: review.id,
      type: "create",
      metadata: { overall, period: data.period },
    });

    // Notify employee
    if (employee.userId) {
      await db.insert(schema.notifications).values({
        userId: employee.userId,
        title: "New Performance Review Added",
        message: `A new performance review has been added for period: ${data.period}. Overall rating: ${Math.round(overall * 100) / 100}/5.`,
      });
    }

    return review;
  });

// ── getPerformanceRanking ────────────────────────────────────────────

export const getPerformanceRanking = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await requireAuth();
    await requireVerifiedCompany(user);
    const db = getDb();

    const companyCondition =
      user.role !== "super_admin"
        ? eq(schema.employees.userId, user.id)
        : undefined;

    const rows = await db
      .select({
        id: schema.employees.id,
        employeeId: schema.employees.employeeId,
        fullName: schema.employees.fullName,
        designation: schema.employees.designation,
        department: schema.employees.department,
        photoUrl: schema.employees.photoUrl,
        rating: schema.employees.rating,
        verified: schema.employees.verified,
        reviewCount: sql<number>`(
          SELECT COUNT(*)::int FROM ${schema.performanceReviews}
          WHERE ${schema.performanceReviews.employeeId} = ${schema.employees.id}
        )`.as("review_count"),
      })
      .from(schema.employees)
      .where(companyCondition)
      .orderBy(desc(schema.employees.rating))
      .limit(10);

    return rows.map((row) => ({
      ...row,
      rating: Number(row.rating),
      reviewCount: row.reviewCount ?? 0,
    }));
  }
);

// ── getPerformanceBreakdown ──────────────────────────────────────────

export const getPerformanceBreakdown = createServerFn({ method: "GET" })
  .validator(
    z.object({
      employeeId: z.string().uuid("Invalid employee ID"),
    })
  )
  .handler(async ({ data }) => {
    const user = await requireAuth();
    await requireVerifiedCompany(user);
    const db = getDb();

    // Verify access
    const [employee] = await db
      .select()
      .from(schema.employees)
      .where(eq(schema.employees.id, data.employeeId))
      .limit(1);

    if (!employee) {
      throw new Error("Employee not found");
    }

    // Check permissions: non-super-admins can only see their own performance breakdown
    if (user.role !== "super_admin" && user.id !== employee.userId) {
      throw new Error("You do not have access to this employee's performance data.");
    }

    // Get latest review
    const [latestReview] = await db
      .select()
      .from(schema.performanceReviews)
      .where(eq(schema.performanceReviews.employeeId, data.employeeId))
      .orderBy(desc(schema.performanceReviews.createdAt))
      .limit(1);

    if (!latestReview) {
      return {
        employeeId: data.employeeId,
        employeeName: employee.fullName,
        hasReviews: false,
        employeeAvgRating: Number(employee.rating),
        departmentAvgRating: 0,
        metrics: null,
      };
    }

    // Calculate department average
    let departmentAvgRating = 0;
    if (employee.department) {
      const [deptAvgResult] = await db
        .select({ avgRating: avg(schema.performanceReviews.overall) })
        .from(schema.performanceReviews)
        .innerJoin(
          schema.employees,
          eq(schema.performanceReviews.employeeId, schema.employees.id)
        )
        .where(
          and(
            eq(schema.employees.department, employee.department),
            eq(schema.employees.companyId, employee.companyId)
          )
        );
      departmentAvgRating = deptAvgResult?.avgRating ? Math.round(Number(deptAvgResult.avgRating) * 100) / 100 : 0;
    }

    return {
      employeeId: data.employeeId,
      employeeName: employee.fullName,
      hasReviews: true,
      employeeAvgRating: Number(employee.rating),
      departmentAvgRating,
      metrics: {
        productivity: Number(latestReview.productivity),
        teamwork: Number(latestReview.teamwork),
        communication: Number(latestReview.communication),
        leadership: Number(latestReview.leadership),
        attendance: Number(latestReview.attendance),
        overall: Number(latestReview.overall),
        period: latestReview.period,
        feedback: latestReview.feedback,
        createdAt:
          latestReview.createdAt instanceof Date
            ? latestReview.createdAt.toISOString()
            : String(latestReview.createdAt),
      },
    };
  });
