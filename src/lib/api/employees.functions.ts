import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "@/lib/db/index.server";
import * as schema from "@/lib/db/schema";
import { eq, desc, and, or, ilike, sql, count } from "drizzle-orm";
import { requireAuth, requireRole } from "@/lib/auth/session.server";
import type { PaginatedResult, Employee, EmployeeWithCompany } from "@/lib/types";

// ── listEmployees ────────────────────────────────────────────────────

export const listEmployees = createServerFn({ method: "GET" })
  .validator(
    z.object({
      page: z.number().int().positive().optional().default(1),
      pageSize: z.number().int().positive().max(100).optional().default(20),
      search: z.string().optional(),
      status: z.enum(["active", "on_leave", "exited"]).optional(),
    })
  )
  .handler(async ({ data }): Promise<PaginatedResult<Employee>> => {
    const user = await requireAuth();
    const db = getDb();

    const page = data.page ?? 1;
    const pageSize = data.pageSize ?? 20;
    const offset = (page - 1) * pageSize;

    const conditions: ReturnType<typeof eq>[] = [];

    // Company-scoped for non-super-admin
    if (user.role !== "super_admin" && user.companyId) {
      conditions.push(eq(schema.employees.companyId, user.companyId));
    }

    // Employee role: only their own record
    if (user.role === "employee") {
      conditions.push(eq(schema.employees.userId, user.id));
    }

    // Status filter
    if (data.status) {
      conditions.push(eq(schema.employees.status, data.status));
    }

    // Search filter
    if (data.search) {
      const searchPattern = `%${data.search}%`;
      conditions.push(
        or(
          ilike(schema.employees.fullName, searchPattern),
          ilike(schema.employees.email, searchPattern),
          ilike(schema.employees.employeeId, searchPattern),
          ilike(schema.employees.designation, searchPattern)
        )!
      );
    }

    const whereClause =
      conditions.length > 0 ? and(...conditions) : undefined;

    // Count
    const [totalResult] = await db
      .select({ total: count() })
      .from(schema.employees)
      .where(whereClause);

    const total = totalResult?.total ?? 0;

    // Fetch
    const rows = await db
      .select()
      .from(schema.employees)
      .where(whereClause)
      .orderBy(desc(schema.employees.createdAt))
      .limit(pageSize)
      .offset(offset);

    const employees: Employee[] = rows.map((row) => ({
      id: row.id,
      employeeId: row.employeeId,
      userId: row.userId,
      companyId: row.companyId,
      fullName: row.fullName,
      email: row.email,
      phone: row.phone,
      designation: row.designation,
      department: row.department,
      skills: row.skills ?? [],
      joiningDate:
        row.joiningDate instanceof Date
          ? row.joiningDate.toISOString()
          : String(row.joiningDate),
      exitDate: row.exitDate
        ? row.exitDate instanceof Date
          ? row.exitDate.toISOString()
          : String(row.exitDate)
        : null,
      experience: row.experience,
      status: row.status as Employee["status"],
      photoUrl: row.photoUrl,
      resumeUrl: row.resumeUrl,
      verified: row.verified,
      rating: Number(row.rating),
      createdAt:
        row.createdAt instanceof Date
          ? row.createdAt.toISOString()
          : String(row.createdAt),
      updatedAt:
        row.updatedAt instanceof Date
          ? row.updatedAt.toISOString()
          : String(row.updatedAt),
    }));

    return {
      data: employees,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  });

// ── createEmployee ───────────────────────────────────────────────────

export const createEmployee = createServerFn({ method: "POST" })
  .validator(
    z.object({
      fullName: z.string().min(1, "Full name is required"),
      email: z.string().email("Invalid email"),
      phone: z.string().min(1, "Phone is required"),
      designation: z.string().min(1, "Designation is required"),
      department: z.string().min(1, "Department is required"),
      skills: z.array(z.string()).optional().default([]),
      joiningDate: z.string().min(1, "Joining date is required"),
      exitDate: z.string().nullable().optional(),
      experience: z.number().int().min(0).optional().default(0),
      status: z.enum(["active", "on_leave", "exited"]).optional().default("active"),
      photoUrl: z.string().nullable().optional(),
      resumeUrl: z.string().nullable().optional(),
      companyId: z.string().uuid().optional(),
      userId: z.string().uuid().nullable().optional(),
      employeeId: z.string().optional(),
    })
  )
  .handler(async ({ data }) => {
    const user = await requireRole(["super_admin", "company_admin", "hr"]);
    const db = getDb();

    // Determine company
    const companyId = user.role === "super_admin" && data.companyId
      ? data.companyId
      : user.companyId;

    if (!companyId) {
      throw new Error("Company context is required to create an employee");
    }

    // Generate employee ID if not provided
    let employeeId = data.employeeId;
    if (!employeeId) {
      const [latestEmp] = await db
        .select({ employeeId: schema.employees.employeeId })
        .from(schema.employees)
        .where(eq(schema.employees.companyId, companyId))
        .orderBy(desc(schema.employees.createdAt))
        .limit(1);

      if (latestEmp?.employeeId) {
        const match = latestEmp.employeeId.match(/EMP-(\d+)/);
        const nextNum = match ? parseInt(match[1], 10) + 1 : 1;
        employeeId = `EMP-${String(nextNum).padStart(4, "0")}`;
      } else {
        employeeId = "EMP-0001";
      }
    }

    // Check for duplicate email within company
    const [existingEmail] = await db
      .select({ id: schema.employees.id })
      .from(schema.employees)
      .where(
        and(
          eq(schema.employees.email, data.email.toLowerCase().trim()),
          eq(schema.employees.companyId, companyId)
        )
      )
      .limit(1);

    if (existingEmail) {
      throw new Error("An employee with this email already exists in this company");
    }

    const [employee] = await db
      .insert(schema.employees)
      .values({
        employeeId,
        companyId,
        fullName: data.fullName,
        email: data.email.toLowerCase().trim(),
        phone: data.phone,
        designation: data.designation,
        department: data.department,
        skills: data.skills ?? [],
        joiningDate: new Date(data.joiningDate),
        exitDate: data.exitDate ? new Date(data.exitDate) : null,
        experience: data.experience ?? 0,
        status: data.status ?? "active",
        photoUrl: data.photoUrl ?? null,
        resumeUrl: data.resumeUrl ?? null,
        userId: data.userId ?? null,
      })
      .returning();

    // Audit
    await db.insert(schema.auditLogs).values({
      userId: user.id,
      action: `Created employee: ${data.fullName} (${employeeId})`,
      targetType: "employee",
      targetId: employee.id,
      type: "create",
    });

    return employee;
  });

// ── updateEmployee ───────────────────────────────────────────────────

export const updateEmployee = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string().uuid("Invalid employee ID"),
      fullName: z.string().min(1).optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      designation: z.string().optional(),
      department: z.string().optional(),
      skills: z.array(z.string()).optional(),
      joiningDate: z.string().optional(),
      exitDate: z.string().nullable().optional(),
      experience: z.number().int().min(0).optional(),
      status: z.enum(["active", "on_leave", "exited"]).optional(),
      photoUrl: z.string().nullable().optional(),
      resumeUrl: z.string().nullable().optional(),
      verified: z.boolean().optional(),
    })
  )
  .handler(async ({ data }) => {
    const user = await requireRole(["super_admin", "company_admin", "hr"]);
    const db = getDb();

    // Verify employee exists and is within user's company
    const [existing] = await db
      .select()
      .from(schema.employees)
      .where(eq(schema.employees.id, data.id))
      .limit(1);

    if (!existing) {
      throw new Error("Employee not found");
    }

    if (
      user.role !== "super_admin" &&
      user.companyId !== existing.companyId
    ) {
      throw new Error("You can only update employees in your company");
    }

    const { id, ...updateFields } = data;

    const updates: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(updateFields)) {
      if (value !== undefined) {
        if (key === "joiningDate" || key === "exitDate") {
          updates[key] = value ? new Date(value as string) : null;
        } else {
          updates[key] = value;
        }
      }
    }

    if (Object.keys(updates).length === 0) {
      throw new Error("No fields to update");
    }

    updates.updatedAt = new Date();

    const [updated] = await db
      .update(schema.employees)
      .set(updates)
      .where(eq(schema.employees.id, id))
      .returning();

    // Audit
    await db.insert(schema.auditLogs).values({
      userId: user.id,
      action: `Updated employee: ${updated.fullName}`,
      targetType: "employee",
      targetId: id,
      type: "update",
      metadata: { updatedFields: Object.keys(updates) },
    });

    return updated;
  });

// ── getEmployeeById ──────────────────────────────────────────────────

export const getEmployeeById = createServerFn({ method: "GET" })
  .validator(
    z.object({
      id: z.string().uuid("Invalid employee ID"),
    })
  )
  .handler(async ({ data }): Promise<EmployeeWithCompany> => {
    const user = await requireAuth();
    const db = getDb();

    const rows = await db
      .select({
        employee: schema.employees,
        company: schema.companies,
      })
      .from(schema.employees)
      .leftJoin(
        schema.companies,
        eq(schema.employees.companyId, schema.companies.id)
      )
      .where(eq(schema.employees.id, data.id))
      .limit(1);

    if (rows.length === 0) {
      throw new Error("Employee not found");
    }

    const { employee: emp, company } = rows[0];

    // Company-scoped access
    if (
      user.role !== "super_admin" &&
      user.companyId !== emp.companyId &&
      user.id !== emp.userId
    ) {
      throw new Error("You do not have access to this employee");
    }

    return {
      id: emp.id,
      employeeId: emp.employeeId,
      userId: emp.userId,
      companyId: emp.companyId,
      fullName: emp.fullName,
      email: emp.email,
      phone: emp.phone,
      designation: emp.designation,
      department: emp.department,
      skills: emp.skills ?? [],
      joiningDate:
        emp.joiningDate instanceof Date
          ? emp.joiningDate.toISOString()
          : String(emp.joiningDate),
      exitDate: emp.exitDate
        ? emp.exitDate instanceof Date
          ? emp.exitDate.toISOString()
          : String(emp.exitDate)
        : null,
      experience: emp.experience,
      status: emp.status as Employee["status"],
      photoUrl: emp.photoUrl,
      resumeUrl: emp.resumeUrl,
      verified: emp.verified,
      rating: Number(emp.rating),
      createdAt:
        emp.createdAt instanceof Date
          ? emp.createdAt.toISOString()
          : String(emp.createdAt),
      updatedAt:
        emp.updatedAt instanceof Date
          ? emp.updatedAt.toISOString()
          : String(emp.updatedAt),
      company: company
        ? {
            id: company.id,
            name: company.name,
            industry: company.industry,
            size: company.size,
            location: company.location,
            website: company.website,
            logoUrl: company.logoUrl,
            verified: company.verified,
            employeeCount: 0,
            createdAt:
              company.createdAt instanceof Date
                ? company.createdAt.toISOString()
                : String(company.createdAt),
            updatedAt:
              company.updatedAt instanceof Date
                ? company.updatedAt.toISOString()
                : String(company.updatedAt),
          }
        : null,
    };
  });

// ── getEmployeeByUserId ──────────────────────────────────────────────

export const getEmployeeByUserId = createServerFn({ method: "GET" })
  .validator(
    z.object({
      userId: z.string().uuid("Invalid user ID").optional(),
    })
  )
  .handler(async ({ data }): Promise<EmployeeWithCompany | null> => {
    const user = await requireAuth();
    const db = getDb();

    // Use provided userId or fall back to current user
    const targetUserId = data.userId ?? user.id;

    // Non-admin users can only query their own record
    if (
      user.role === "employee" &&
      targetUserId !== user.id
    ) {
      throw new Error("You can only view your own employee record");
    }

    const rows = await db
      .select({
        employee: schema.employees,
        company: schema.companies,
      })
      .from(schema.employees)
      .leftJoin(
        schema.companies,
        eq(schema.employees.companyId, schema.companies.id)
      )
      .where(eq(schema.employees.userId, targetUserId))
      .limit(1);

    if (rows.length === 0) {
      return null;
    }

    const { employee: emp, company } = rows[0];

    return {
      id: emp.id,
      employeeId: emp.employeeId,
      userId: emp.userId,
      companyId: emp.companyId,
      fullName: emp.fullName,
      email: emp.email,
      phone: emp.phone,
      designation: emp.designation,
      department: emp.department,
      skills: emp.skills ?? [],
      joiningDate:
        emp.joiningDate instanceof Date
          ? emp.joiningDate.toISOString()
          : String(emp.joiningDate),
      exitDate: emp.exitDate
        ? emp.exitDate instanceof Date
          ? emp.exitDate.toISOString()
          : String(emp.exitDate)
        : null,
      experience: emp.experience,
      status: emp.status as Employee["status"],
      photoUrl: emp.photoUrl,
      resumeUrl: emp.resumeUrl,
      verified: emp.verified,
      rating: Number(emp.rating),
      createdAt:
        emp.createdAt instanceof Date
          ? emp.createdAt.toISOString()
          : String(emp.createdAt),
      updatedAt:
        emp.updatedAt instanceof Date
          ? emp.updatedAt.toISOString()
          : String(emp.updatedAt),
      company: company
        ? {
            id: company.id,
            name: company.name,
            industry: company.industry,
            size: company.size,
            location: company.location,
            website: company.website,
            logoUrl: company.logoUrl,
            verified: company.verified,
            employeeCount: 0,
            createdAt:
              company.createdAt instanceof Date
                ? company.createdAt.toISOString()
                : String(company.createdAt),
            updatedAt:
              company.updatedAt instanceof Date
                ? company.updatedAt.toISOString()
                : String(company.updatedAt),
          }
        : null,
    };
  });
