import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "@/lib/db/index.server";
import * as schema from "@/lib/db/schema";
import { eq, and, ne, desc } from "drizzle-orm";
import { requireAuth } from "@/lib/auth/session.server";
import type { ConsentSettings, ConsentGrant } from "@/lib/types";

// ── getConsentSettings ──────────────────────────────────────────────

export const getConsentSettings = createServerFn({ method: "GET" }).handler(
  async (): Promise<ConsentSettings | null> => {
    const user = await requireAuth();
    const db = getDb();

    const [employee] = await db
      .select()
      .from(schema.employees)
      .where(eq(schema.employees.userId, user.id))
      .limit(1);

    if (!employee) {
      return null;
    }

    let [settings] = await db
      .select()
      .from(schema.consentSettings)
      .where(eq(schema.consentSettings.employeeId, employee.id))
      .limit(1);

    if (!settings) {
      [settings] = await db
        .insert(schema.consentSettings)
        .values({
          employeeId: employee.id,
          publicVisible: false,
        })
        .returning();
    }

    return {
      id: settings.id,
      employeeId: settings.employeeId,
      publicVisible: settings.publicVisible,
      createdAt: settings.createdAt.toISOString(),
      updatedAt: settings.updatedAt.toISOString(),
    };
  }
);

// ── updateConsentVisibility ─────────────────────────────────────────

export const updateConsentVisibility = createServerFn({ method: "POST" })
  .validator(
    z.object({
      publicVisible: z.boolean(),
    })
  )
  .handler(async ({ data }): Promise<ConsentSettings> => {
    const user = await requireAuth();
    const db = getDb();

    const [employee] = await db
      .select()
      .from(schema.employees)
      .where(eq(schema.employees.userId, user.id))
      .limit(1);

    if (!employee) {
      throw new Error("Employee record not found for this user");
    }

    let [settings] = await db
      .select()
      .from(schema.consentSettings)
      .where(eq(schema.consentSettings.employeeId, employee.id))
      .limit(1);

    if (settings) {
      [settings] = await db
        .update(schema.consentSettings)
        .set({
          publicVisible: data.publicVisible,
          updatedAt: new Date(),
        })
        .where(eq(schema.consentSettings.id, settings.id))
        .returning();
    } else {
      [settings] = await db
        .insert(schema.consentSettings)
        .values({
          employeeId: employee.id,
          publicVisible: data.publicVisible,
        })
        .returning();
    }

    await db.insert(schema.auditLogs).values({
      userId: user.id,
      action: `Updated public profile visibility to ${data.publicVisible}`,
      targetType: "consent_settings",
      targetId: settings.id,
      type: "consent_change",
    });

    return {
      id: settings.id,
      employeeId: settings.employeeId,
      publicVisible: settings.publicVisible,
      createdAt: settings.createdAt.toISOString(),
      updatedAt: settings.updatedAt.toISOString(),
    };
  });

// ── listConsentGrants ────────────────────────────────────────────────

export const listConsentGrants = createServerFn({ method: "GET" }).handler(
  async (): Promise<ConsentGrant[]> => {
    const user = await requireAuth();
    const db = getDb();

    const [employee] = await db
      .select()
      .from(schema.employees)
      .where(eq(schema.employees.userId, user.id))
      .limit(1);

    if (!employee) {
      return [];
    }

    const rows = await db
      .select({
        companyId: schema.companies.id,
        companyName: schema.companies.name,
        companyIndustry: schema.companies.industry,
        companyLocation: schema.companies.location,
        companyLogoUrl: schema.companies.logoUrl,
        grantId: schema.consentGrants.id,
        granted: schema.consentGrants.granted,
        grantedAt: schema.consentGrants.grantedAt,
        revokedAt: schema.consentGrants.revokedAt,
      })
      .from(schema.companies)
      .leftJoin(
        schema.consentGrants,
        and(
          eq(schema.consentGrants.companyId, schema.companies.id),
          eq(schema.consentGrants.employeeId, employee.id)
        )
      )
      .where(ne(schema.companies.id, employee.companyId));

    return rows.map((row) => ({
      id: row.grantId ?? "",
      employeeId: employee.id,
      companyId: row.companyId,
      companyName: row.companyName,
      companyIndustry: row.companyIndustry,
      companyLocation: row.companyLocation ?? "",
      companyLogoUrl: row.companyLogoUrl,
      granted: row.granted ?? false,
      grantedAt: row.grantedAt ? row.grantedAt.toISOString() : null,
      revokedAt: row.revokedAt ? row.revokedAt.toISOString() : null,
    }));
  }
);

// ── grantAccess ──────────────────────────────────────────────────────

export const grantAccess = createServerFn({ method: "POST" })
  .validator(z.object({ companyId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const user = await requireAuth();
    const db = getDb();

    const [employee] = await db
      .select()
      .from(schema.employees)
      .where(eq(schema.employees.userId, user.id))
      .limit(1);

    if (!employee) {
      throw new Error("Employee record not found");
    }

    const [existing] = await db
      .select()
      .from(schema.consentGrants)
      .where(
        and(
          eq(schema.consentGrants.employeeId, employee.id),
          eq(schema.consentGrants.companyId, data.companyId)
        )
      )
      .limit(1);

    let grant;
    if (existing) {
      [grant] = await db
        .update(schema.consentGrants)
        .set({
          granted: true,
          grantedAt: new Date(),
          revokedAt: null,
        })
        .where(eq(schema.consentGrants.id, existing.id))
        .returning();
    } else {
      [grant] = await db
        .insert(schema.consentGrants)
        .values({
          employeeId: employee.id,
          companyId: data.companyId,
          granted: true,
          grantedAt: new Date(),
        })
        .returning();
    }

    // Notify company admins of the granted company
    const admins = await db
      .select({ id: schema.users.id })
      .from(schema.users)
      .where(
        and(
          eq(schema.users.companyId, data.companyId),
          eq(schema.users.role, "company_admin")
        )
      );
    
    for (const admin of admins) {
      await db.insert(schema.notifications).values({
        userId: admin.id,
        title: "Consent Access Granted",
        message: `Employee "${employee.fullName}" has granted your company access to view their profile.`,
      });
    }

    await db.insert(schema.auditLogs).values({
      userId: user.id,
      action: `Granted profile access to company ${data.companyId}`,
      targetType: "consent_grant",
      targetId: grant.id,
      type: "consent_change",
    });

    return grant;
  });

// ── revokeAccess ─────────────────────────────────────────────────────

export const revokeAccess = createServerFn({ method: "POST" })
  .validator(z.object({ companyId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const user = await requireAuth();
    const db = getDb();

    const [employee] = await db
      .select()
      .from(schema.employees)
      .where(eq(schema.employees.userId, user.id))
      .limit(1);

    if (!employee) {
      throw new Error("Employee record not found");
    }

    const [existing] = await db
      .select()
      .from(schema.consentGrants)
      .where(
        and(
          eq(schema.consentGrants.employeeId, employee.id),
          eq(schema.consentGrants.companyId, data.companyId)
        )
      )
      .limit(1);

    if (!existing) {
      throw new Error("No existing access grant found");
    }

    const [grant] = await db
      .update(schema.consentGrants)
      .set({
        granted: false,
        revokedAt: new Date(),
      })
      .where(eq(schema.consentGrants.id, existing.id))
      .returning();

    // Notify company admins of the revoked company
    const admins = await db
      .select({ id: schema.users.id })
      .from(schema.users)
      .where(
        and(
          eq(schema.users.companyId, data.companyId),
          eq(schema.users.role, "company_admin")
        )
      );
    
    for (const admin of admins) {
      await db.insert(schema.notifications).values({
        userId: admin.id,
        title: "Consent Access Revoked",
        message: `Employee "${employee.fullName}" has revoked your company's access to view their profile.`,
      });
    }

    await db.insert(schema.auditLogs).values({
      userId: user.id,
      action: `Revoked profile access from company ${data.companyId}`,
      targetType: "consent_grant",
      targetId: grant.id,
      type: "consent_change",
    });

    return grant;
  });

// ── downloadSharedDataHistory ────────────────────────────────────────

export const downloadSharedDataHistory = createServerFn({ method: "GET" }).handler(
  async (): Promise<string> => {
    const user = await requireAuth();
    const db = getDb();

    const [employee] = await db
      .select()
      .from(schema.employees)
      .where(eq(schema.employees.userId, user.id))
      .limit(1);

    if (!employee) {
      throw new Error("Employee record not found");
    }

    const settings = await db
      .select()
      .from(schema.consentSettings)
      .where(eq(schema.consentSettings.employeeId, employee.id));

    const grants = await db
      .select({
        id: schema.consentGrants.id,
        companyName: schema.companies.name,
        granted: schema.consentGrants.granted,
        grantedAt: schema.consentGrants.grantedAt,
        revokedAt: schema.consentGrants.revokedAt,
      })
      .from(schema.consentGrants)
      .leftJoin(schema.companies, eq(schema.consentGrants.companyId, schema.companies.id))
      .where(eq(schema.consentGrants.employeeId, employee.id));

    const verifications = await db
      .select({
        id: schema.verificationRequests.id,
        companyName: schema.companies.name,
        status: schema.verificationRequests.status,
        requestType: schema.verificationRequests.requestType,
        createdAt: schema.verificationRequests.createdAt,
        resolvedAt: schema.verificationRequests.resolvedAt,
      })
      .from(schema.verificationRequests)
      .leftJoin(schema.users, eq(schema.verificationRequests.requestedById, schema.users.id))
      .leftJoin(schema.companies, eq(schema.users.companyId, schema.companies.id))
      .where(eq(schema.verificationRequests.employeeId, employee.id));

    const audits = await db
      .select()
      .from(schema.auditLogs)
      .where(
        and(
          eq(schema.auditLogs.userId, user.id),
          eq(schema.auditLogs.type, "consent_change")
        )
      )
      .orderBy(desc(schema.auditLogs.timestamp));

    const dataHistory = {
      exportTimestamp: new Date().toISOString(),
      employeeProfile: {
        fullName: employee.fullName,
        email: employee.email,
        phone: employee.phone,
        designation: employee.designation,
        department: employee.department,
        joiningDate: employee.joiningDate,
        exitDate: employee.exitDate,
      },
      consentSettings: settings,
      consentGrants: grants,
      verificationHistory: verifications,
      auditLogs: audits,
    };

    return JSON.stringify(dataHistory, null, 2);
  }
);
