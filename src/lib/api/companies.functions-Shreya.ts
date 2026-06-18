import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "@/lib/db/index.server";
import * as schema from "@/lib/db/schema";
import { eq, desc, and, ilike, sql, count } from "drizzle-orm";
import { requireAuth, requireRole } from "@/lib/auth/session.server";
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
        createdAt: schema.companies.createdAt,
        updatedAt: schema.companies.updatedAt,
        employeeCount:
          sql<number>`(SELECT COUNT(*)::int FROM ${schema.employees} WHERE ${schema.employees.companyId} = ${schema.companies.id})`.as(
            "employee_count"
          ),
      })
      .from(schema.companies)
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
      employeeCount: row.employeeCount ?? 0,
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
    })
  )
  .handler(async ({ data }) => {
    const user = await requireRole(["super_admin", "company_admin"]);
    const db = getDb();

    // Company admins can only update their own company
    if (user.role === "company_admin" && user.companyId !== data.id) {
      throw new Error("You can only update your own company");
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

    const [updated] = await db
      .update(schema.companies)
      .set(updates)
      .where(eq(schema.companies.id, id))
      .returning();

    if (!updated) {
      throw new Error("Company not found");
    }

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
