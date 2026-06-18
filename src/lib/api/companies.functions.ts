import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "@/lib/db/index.server";
import * as schema from "@/lib/db/schema";
import { eq, desc, and, or, ilike, sql, count, inArray } from "drizzle-orm";
import { requireAuth, requireRole, requireVerifiedCompany } from "@/lib/auth/session.server";
import type { PaginatedResult, Company } from "@/lib/types";

// ── listCompanies ────────────────────────────────────────────────────

export const listCompanies = createServerFn({ method: "GET" })
  .validator(
    z.object({
      page: z.number().int().positive().optional().default(1),
      pageSize: z.number().int().positive().max(100).optional().default(20),
      search: z.string().optional(),
    })
  )
  .handler(async ({ data }): Promise<PaginatedResult<Company>> => {
    const user = await requireAuth();
    const db = getDb();

    const page = data.page ?? 1;
    const pageSize = data.pageSize ?? 20;
    const offset = (page - 1) * pageSize;

    const conditions: ReturnType<typeof eq>[] = [];

    // Company-scoped access for non-super-admin
    if (user.role !== "super_admin" && user.companyId) {
      conditions.push(eq(schema.companies.id, user.companyId));
    }

    if (data.search) {
      conditions.push(ilike(schema.companies.name, `%${data.search}%`));
    }

    const whereClause =
      conditions.length > 0 ? and(...conditions) : undefined;

    // Count
    const [totalResult] = await db
      .select({ total: count() })
      .from(schema.companies)
      .where(whereClause);

    const total = totalResult?.total ?? 0;

    // Fetch with employee count subquery
    const rows = await db
      .select({
        id: schema.companies.id,
        name: schema.companies.name,
        industry: schema.companies.industry,
        size: schema.companies.size,
        location: schema.companies.location,
        website: schema.companies.website,
        logoUrl: schema.companies.logoUrl,
        verified: schema.companies.verified,
        status: schema.companies.status,
        createdAt: schema.companies.createdAt,
        updatedAt: schema.companies.updatedAt,
        creatorName: schema.users.fullName,
        creatorEmail: schema.users.email,
        employeeCount:
          sql<number>`(SELECT COUNT(*)::int FROM ${schema.employees} WHERE ${schema.employees.companyId} = ${schema.companies.id})`.as(
            "employee_count"
          ),
      })
      .from(schema.companies)
      .leftJoin(schema.users, eq(schema.companies.createdById, schema.users.id))
      .where(whereClause)
      .orderBy(desc(schema.companies.createdAt))
      .limit(pageSize)
      .offset(offset);

    const companies: Company[] = rows.map((row) => ({
      id: row.id,
      name: row.name,
      industry: row.industry,
      size: row.size,
      location: row.location,
      website: row.website,
      logoUrl: row.logoUrl,
      verified: row.verified,
      status: row.status,
      employeeCount: row.employeeCount ?? 0,
      creatorName: row.creatorName,
      creatorEmail: row.creatorEmail,
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
      data: companies,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  });

// ── createCompany ────────────────────────────────────────────────────

export const createCompany = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(1, "Company name is required"),
      industry: z.string().min(1, "Industry is required"),
      size: z.string().min(1, "Company size is required"),
      location: z.string().min(1, "Location is required"),
      website: z.string().url("Invalid website URL").or(z.literal("")),
    })
  )
  .handler(async ({ data }) => {
    const user = await requireRole(["super_admin"]);
    const db = getDb();

    const [company] = await db
      .insert(schema.companies)
      .values({
        name: data.name,
        industry: data.industry,
        size: data.size,
        location: data.location,
        website: data.website,
      })
      .returning();

    // Audit
    await db.insert(schema.auditLogs).values({
      userId: user.id,
      action: `Created company: ${data.name}`,
      targetType: "company",
      targetId: company.id,
      type: "create",
    });

    return company;
  });

// ── updateCompany ────────────────────────────────────────────────────

export const updateCompany = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string().uuid("Invalid company ID"),
      name: z.string().min(1).optional(),
      industry: z.string().min(1).optional(),
      size: z.string().min(1).optional(),
      location: z.string().optional(),
      website: z.string().url().or(z.literal("")).optional(),
      verified: z.boolean().optional(),
      status: z.enum(["pending", "approved", "rejected", "suspended", "archived", "deleted"]).optional(),
    })
  )
  .handler(async ({ data }) => {
    const user = await requireRole(["super_admin", "company_admin"]);
    await requireVerifiedCompany(user);
    const db = getDb();

    // Company admins can only update their own company
    if (user.role === "company_admin" && user.companyId !== data.id) {
      throw new Error("You can only update your own company");
    }

    // Only super_admins can change the verification status of a company
    if (data.verified !== undefined && user.role !== "super_admin") {
      throw new Error("Only super administrators can verify or change company status");
    }

    const { id, ...updateFields } = data;

    // Filter out undefined values
    const updates: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(updateFields)) {
      if (value !== undefined) {
        updates[key] = value;
      }
    }

    if (Object.keys(updates).length === 0) {
      throw new Error("No fields to update");
    }

    updates.updatedAt = new Date();

    // Fetch current status before update for logging
    const [currentCompany] = await db
      .select({ status: schema.companies.status, name: schema.companies.name })
      .from(schema.companies)
      .where(eq(schema.companies.id, id))
      .limit(1);

    if (currentCompany) {
      console.log(`[updateCompany] Before update - Company: "${currentCompany.name}" (ID: ${id}) current status is: "${currentCompany.status}"`);
    }

    const [updated] = await db
      .update(schema.companies)
      .set(updates)
      .where(eq(schema.companies.id, id))
      .returning();

    if (!updated) {
      throw new Error("Company not found");
    }

    console.log(`[updateCompany] After update - Company: "${updated.name}" (ID: ${id}) new status is: "${updated.status}"`);

    // Audit
    await db.insert(schema.auditLogs).values({
      userId: user.id,
      action: `Updated company: ${updated.name}`,
      targetType: "company",
      targetId: id,
      type: "update",
      metadata: { updatedFields: Object.keys(updates) },
    });

    return updated;
  });

// ── getCompanyById ───────────────────────────────────────────────────

export const getCompanyById = createServerFn({ method: "GET" })
  .validator(
    z.object({
      id: z.string().uuid("Invalid company ID"),
    })
  )
  .handler(async ({ data }) => {
    const user = await requireAuth();
    const db = getDb();

    // Non-super-admin can only view their own company
    if (user.role !== "super_admin" && user.companyId !== data.id) {
      throw new Error("You do not have access to this company");
    }

    const [company] = await db
      .select()
      .from(schema.companies)
      .where(eq(schema.companies.id, data.id))
      .limit(1);

    if (!company) {
      throw new Error("Company not found");
    }

    // Get employee count
    const [empCount] = await db
      .select({ total: count() })
      .from(schema.employees)
      .where(eq(schema.employees.companyId, data.id));

    return {
      ...company,
      employeeCount: empCount?.total ?? 0,
      createdAt:
        company.createdAt instanceof Date
          ? company.createdAt.toISOString()
          : String(company.createdAt),
      updatedAt:
        company.updatedAt instanceof Date
          ? company.updatedAt.toISOString()
          : String(company.updatedAt),
    } as Company;
  });

// ── getCompanyDeleteImpact ───────────────────────────────────────────

export const getCompanyDeleteImpact = createServerFn({ method: "GET" })
  .validator(
    z.object({
      id: z.string().uuid("Invalid company ID"),
    })
  )
  .handler(async ({ data }) => {
    const user = await requireRole(["super_admin"]);
    const db = getDb();

    // 1. Fetch company details
    const [company] = await db
      .select({ name: schema.companies.name })
      .from(schema.companies)
      .where(eq(schema.companies.id, data.id))
      .limit(1);

    if (!company) {
      throw new Error("Company not found");
    }

    // 2. Count HR/Admin accounts linked to this company
    const [hrCountRes] = await db
      .select({ total: count() })
      .from(schema.users)
      .where(eq(schema.users.companyId, data.id));

    // 3. Count employees belonging to this company
    const [employeeCountRes] = await db
      .select({ total: count() })
      .from(schema.employees)
      .where(eq(schema.employees.companyId, data.id));

    // 4. Count performance reviews for these employees
    let reviewCount = 0;
    let requestCount = 0;

    const companyEmployees = await db
      .select({ id: schema.employees.id })
      .from(schema.employees)
      .where(eq(schema.employees.companyId, data.id));

    const empIds = companyEmployees.map((e) => e.id);
    if (empIds.length > 0) {
      const [reviewCountRes] = await db
        .select({ total: count() })
        .from(schema.performanceReviews)
        .where(inArray(schema.performanceReviews.employeeId, empIds));
      reviewCount = reviewCountRes?.total ?? 0;

      const [requestCountRes] = await db
        .select({ total: count() })
        .from(schema.verificationRequests)
        .where(inArray(schema.verificationRequests.employeeId, empIds));
      requestCount = requestCountRes?.total ?? 0;
    }

    return {
      companyName: company.name,
      hrCount: hrCountRes?.total ?? 0,
      employeeCount: employeeCountRes?.total ?? 0,
      reviewCount,
      requestCount,
    };
  });

// ── deleteCompany ────────────────────────────────────────────────────

export const deleteCompany = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string().uuid("Invalid company ID"),
    })
  )
  .handler(async ({ data }) => {
    const user = await requireRole(["super_admin"]);
    const db = getDb();

    // 1. Fetch company details first to make sure it exists
    const [company] = await db
      .select()
      .from(schema.companies)
      .where(eq(schema.companies.id, data.id))
      .limit(1);

    if (!company) {
      throw new Error("Company not found");
    }

    const now = new Date();

    // Run the soft delete operations inside a transaction
    await db.transaction(async (tx) => {
      // A. Soft-delete the company (set status = "deleted")
      await tx
        .update(schema.companies)
        .set({ status: "deleted", verified: false, updatedAt: now })
        .where(eq(schema.companies.id, data.id));

      // B. Fetch employees belonging to this company
      const companyEmployees = await tx
        .select()
        .from(schema.employees)
        .where(eq(schema.employees.companyId, data.id));

      // C. Archive employment career history and unlink employees
      for (const emp of companyEmployees) {
        // Create an archived career history entry
        await tx.insert(schema.employmentHistory).values({
          employeeId: emp.id,
          companyId: data.id,
          companyName: `${company.name} (Deleted Company)`,
          designation: emp.designation || "Employee",
          department: emp.department,
          joiningDate: emp.joiningDate,
          exitDate: now,
          experience: emp.experience,
          verificationStatus: "verified",
        });

        // Unlink employee profile (profile survives, companyId set to null)
        await tx
          .update(schema.employees)
          .set({ companyId: null, verified: false, updatedAt: now })
          .where(eq(schema.employees.id, emp.id));
      }

      // D. Unlink all user accounts linked to this company
      await tx
        .update(schema.users)
        .set({ companyId: null, updatedAt: now })
        .where(eq(schema.users.companyId, data.id));

      // E. Write audit log
      await tx.insert(schema.auditLogs).values({
        userId: user.id,
        action: `Deleted company: ${company.name} (Soft Delete - Employees Archived)`,
        targetType: "company",
        targetId: data.id,
        type: "delete",
      });
    });

    return { success: true, company };
  });

