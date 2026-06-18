import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "@/lib/db/index.server";
import * as schema from "@/lib/db/schema";
import { eq, and, desc, count } from "drizzle-orm";
import { requireAuth, requireRole } from "@/lib/auth/session.server";
import type { VerificationRequest } from "@/lib/types";

// ── createVerificationRequest ───────────────────────────────────────

export const createVerificationRequest = createServerFn({ method: "POST" })
  .validator(
    z.object({
      employeeId: z.string().uuid("Invalid employee ID"),
      requestType: z.string().min(1, "Request type is required"),
    })
  )
  .handler(async ({ data }) => {
    const user = await requireRole(["super_admin", "company_admin", "hr"]);
    const db = getDb();

    const [employee] = await db
      .select()
      .from(schema.employees)
      .where(eq(schema.employees.id, data.employeeId))
      .limit(1);

    if (!employee) {
      throw new Error("Employee not found");
    }

    const [request] = await db
      .insert(schema.verificationRequests)
      .values({
        requestedById: user.id,
        employeeId: data.employeeId,
        status: "pending",
        requestType: data.requestType,
      })
      .returning();

    await db.insert(schema.auditLogs).values({
      userId: user.id,
      action: `Created verification request for employee: ${employee.fullName}`,
      targetType: "verification_request",
      targetId: request.id,
      type: "verification_request",
    });

    return request;
  });

// ── listVerificationRequests ────────────────────────────────────────

export const listVerificationRequests = createServerFn({ method: "GET" })
  .validator(
    z.object({
      page: z.number().int().positive().optional().default(1),
      pageSize: z.number().int().positive().optional().default(20),
    })
  )
  .handler(async ({ data }) => {
    const user = await requireAuth();
    const db = getDb();

    const page = data.page ?? 1;
    const pageSize = data.pageSize ?? 20;
    const offset = (page - 1) * pageSize;

    const conditions = [];

    if (user.role === "employee") {
      const [employee] = await db
        .select({ id: schema.employees.id })
        .from(schema.employees)
        .where(eq(schema.employees.userId, user.id))
        .limit(1);

      if (!employee) {
        return { data: [], total: 0, page, pageSize, totalPages: 0 };
      }
      conditions.push(eq(schema.verificationRequests.employeeId, employee.id));
    } else if (user.role === "hr" || user.role === "company_admin") {
      conditions.push(eq(schema.verificationRequests.requestedById, user.id));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [totalResult] = await db
      .select({ total: count() })
      .from(schema.verificationRequests)
      .where(whereClause);

    const total = totalResult?.total ?? 0;

    const rows = await db
      .select({
        id: schema.verificationRequests.id,
        requestedById: schema.verificationRequests.requestedById,
        requestedByName: schema.users.fullName,
        requestedByCompany: schema.companies.name,
        employeeId: schema.verificationRequests.employeeId,
        employeeName: schema.employees.fullName,
        status: schema.verificationRequests.status,
        requestType: schema.verificationRequests.requestType,
        responseData: schema.verificationRequests.responseData,
        createdAt: schema.verificationRequests.createdAt,
        resolvedAt: schema.verificationRequests.resolvedAt,
      })
      .from(schema.verificationRequests)
      .leftJoin(schema.users, eq(schema.verificationRequests.requestedById, schema.users.id))
      .leftJoin(schema.companies, eq(schema.users.companyId, schema.companies.id))
      .leftJoin(schema.employees, eq(schema.verificationRequests.employeeId, schema.employees.id))
      .where(whereClause)
      .orderBy(desc(schema.verificationRequests.createdAt))
      .limit(pageSize)
      .offset(offset);

    const requests: VerificationRequest[] = rows.map((row) => ({
      id: row.id,
      requestedById: row.requestedById,
      requestedByName: row.requestedByName ?? "Unknown",
      requestedByCompany: row.requestedByCompany ?? "Platform",
      employeeId: row.employeeId,
      employeeName: row.employeeName ?? "Unknown",
      status: row.status as VerificationRequest["status"],
      requestType: row.requestType,
      responseData: row.responseData as Record<string, unknown> | null,
      createdAt: row.createdAt.toISOString(),
      resolvedAt: row.resolvedAt ? row.resolvedAt.toISOString() : null,
    }));

    return {
      data: requests,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  });

// ── resolveVerificationRequest ───────────────────────────────────────

export const resolveVerificationRequest = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string().uuid("Invalid request ID"),
      status: z.enum(["approved", "denied"]),
    })
  )
  .handler(async ({ data }) => {
    const user = await requireAuth();
    const db = getDb();

    const [request] = await db
      .select()
      .from(schema.verificationRequests)
      .where(eq(schema.verificationRequests.id, data.id))
      .limit(1);

    if (!request) {
      throw new Error("Verification request not found");
    }

    if (request.status !== "pending") {
      throw new Error("Verification request has already been resolved");
    }

    const [employee] = await db
      .select()
      .from(schema.employees)
      .where(eq(schema.employees.id, request.employeeId))
      .limit(1);

    if (!employee) {
      throw new Error("Employee not found for this request");
    }

    if (user.role !== "super_admin" && employee.userId !== user.id) {
      throw new Error("You are not authorized to resolve this verification request");
    }

    let responseData: Record<string, unknown> | null = null;
    if (data.status === "approved") {
      const reviews = await db
        .select()
        .from(schema.performanceReviews)
        .where(eq(schema.performanceReviews.employeeId, employee.id))
        .orderBy(desc(schema.performanceReviews.createdAt));

      responseData = {
        fullName: employee.fullName,
        designation: employee.designation,
        department: employee.department,
        joiningDate: employee.joiningDate.toISOString(),
        exitDate: employee.exitDate ? employee.exitDate.toISOString() : null,
        experience: employee.experience,
        status: employee.status,
        rating: Number(employee.rating),
        reviewsCount: reviews.length,
        reviews: reviews.map(r => ({
          period: r.period,
          overall: Number(r.overall),
          feedback: r.feedback,
        })),
      };
    }

    const [updated] = await db
      .update(schema.verificationRequests)
      .set({
        status: data.status,
        resolvedAt: new Date(),
        responseData: responseData,
      })
      .where(eq(schema.verificationRequests.id, data.id))
      .returning();

    await db.insert(schema.auditLogs).values({
      userId: user.id,
      action: `Resolved verification request ${data.id} as ${data.status}`,
      targetType: "verification_request",
      targetId: data.id,
      type: "consent_change",
    });

    return updated;
  });

// ── getVerificationResult ───────────────────────────────────────────

export const getVerificationResult = createServerFn({ method: "GET" })
  .validator(
    z.object({
      id: z.string().uuid("Invalid request ID"),
    })
  )
  .handler(async ({ data }): Promise<VerificationRequest> => {
    const user = await requireAuth();
    const db = getDb();

    const rows = await db
      .select({
        id: schema.verificationRequests.id,
        requestedById: schema.verificationRequests.requestedById,
        requestedByName: schema.users.fullName,
        requestedByCompany: schema.companies.name,
        employeeId: schema.verificationRequests.employeeId,
        employeeName: schema.employees.fullName,
        status: schema.verificationRequests.status,
        requestType: schema.verificationRequests.requestType,
        responseData: schema.verificationRequests.responseData,
        createdAt: schema.verificationRequests.createdAt,
        resolvedAt: schema.verificationRequests.resolvedAt,
      })
      .from(schema.verificationRequests)
      .leftJoin(schema.users, eq(schema.verificationRequests.requestedById, schema.users.id))
      .leftJoin(schema.companies, eq(schema.users.companyId, schema.companies.id))
      .leftJoin(schema.employees, eq(schema.verificationRequests.employeeId, schema.employees.id))
      .where(eq(schema.verificationRequests.id, data.id))
      .limit(1);

    if (rows.length === 0) {
      throw new Error("Verification request not found");
    }

    const row = rows[0];

    const [employee] = await db
      .select({ userId: schema.employees.userId })
      .from(schema.employees)
      .where(eq(schema.employees.id, row.employeeId))
      .limit(1);

    if (
      user.role !== "super_admin" &&
      row.requestedById !== user.id &&
      employee?.userId !== user.id
    ) {
      throw new Error("You do not have access to this verification request");
    }

    return {
      id: row.id,
      requestedById: row.requestedById,
      requestedByName: row.requestedByName ?? "Unknown",
      requestedByCompany: row.requestedByCompany ?? "Platform",
      employeeId: row.employeeId,
      employeeName: row.employeeName ?? "Unknown",
      status: row.status as VerificationRequest["status"],
      requestType: row.requestType,
      responseData: row.responseData as Record<string, unknown> | null,
      createdAt: row.createdAt.toISOString(),
      resolvedAt: row.resolvedAt ? row.resolvedAt.toISOString() : null,
    };
  });
