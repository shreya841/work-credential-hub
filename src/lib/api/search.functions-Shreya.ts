import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "@/lib/db/index.server";
import * as schema from "@/lib/db/schema";
import { eq, and, or, ilike, exists, sql } from "drizzle-orm";
import { requireAuth } from "@/lib/auth/session.server";
import type { Employee } from "@/lib/types";

// ── searchEmployees ──────────────────────────────────────────────────

export const searchEmployees = createServerFn({ method: "POST" })
  .validator(
    z.object({
      query: z.string().min(1, "Search query is required"),
    })
  )
  .handler(async ({ data }): Promise<Employee[]> => {
    const user = await requireAuth();
    const db = getDb();

    const searchPattern = `%${data.query}%`;
    const searchCondition = or(
      ilike(schema.employees.fullName, searchPattern),
      ilike(schema.employees.email, searchPattern),
      ilike(schema.employees.employeeId, searchPattern),
      sql`${schema.employees.skills}::text ILIKE ${searchPattern}`
    );

    const conditions = [searchCondition];

    if (user.role !== "super_admin") {
      const consentConditions = [];

      if (user.companyId) {
        consentConditions.push(eq(schema.employees.companyId, user.companyId));
      }

      consentConditions.push(
        exists(
          db
            .select()
            .from(schema.consentSettings)
            .where(
              and(
                eq(schema.consentSettings.employeeId, schema.employees.id),
                eq(schema.consentSettings.publicVisible, true)
              )
            )
        )
      );

      if (user.companyId) {
        consentConditions.push(
          exists(
            db
              .select()
              .from(schema.consentGrants)
              .where(
                and(
                  eq(schema.consentGrants.employeeId, schema.employees.id),
                  eq(schema.consentGrants.companyId, user.companyId),
                  eq(schema.consentGrants.granted, true)
                )
              )
          )
        );
      }

      conditions.push(or(...consentConditions));
    }

    const rows = await db
      .select()
      .from(schema.employees)
      .where(and(...conditions))
      .limit(50);

    // Audit log
    await db.insert(schema.auditLogs).values({
      userId: user.id,
      action: `Searched employees with query: "${data.query}"`,
      targetType: "employee",
      targetId: "",
      type: "access",
      metadata: { query: data.query, resultsCount: rows.length },
    });

    return rows.map((row) => ({
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
      joiningDate: row.joiningDate.toISOString(),
      exitDate: row.exitDate ? row.exitDate.toISOString() : null,
      experience: row.experience,
      status: row.status as Employee["status"],
      photoUrl: row.photoUrl,
      resumeUrl: row.resumeUrl,
      verified: row.verified,
      rating: Number(row.rating),
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    }));
  });
