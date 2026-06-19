import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "@/lib/db/index.server";
import * as schema from "@/lib/db/schema";
import { eq, desc, and, or, ilike, sql, count, inArray } from "drizzle-orm";
import { requireAuth, requireRole, requireVerifiedCompany } from "@/lib/auth/session.server";
import type { PaginatedResult, Employee, EmployeeWithCompany } from "@/lib/types";
import { sendEmail, getEmployeeInvitationHtml, getEmployeeStatusUpdateHtml, getEmployeeDeletionHtml } from "@/lib/email.server";

async function getTrustScore(db: any, employeeId: string, experience: number, verified: boolean): Promise<number> {
  const reviews = await db
    .select({
      overall: schema.performanceReviews.overall,
      attendance: schema.performanceReviews.attendance,
    })
    .from(schema.performanceReviews)
    .where(eq(schema.performanceReviews.employeeId, employeeId));

  let avgPerformance = 5.0;
  let avgAttendance = 5.0;

  if (reviews.length > 0) {
    const totalPerformance = reviews.reduce((sum: number, r: any) => sum + Number(r.overall), 0);
    const totalAttendance = reviews.reduce((sum: number, r: any) => sum + Number(r.attendance), 0);
    avgPerformance = totalPerformance / reviews.length;
    avgAttendance = totalAttendance / reviews.length;
  }

  const performanceScore = (avgPerformance / 5) * 40;
  const attendanceScore = (avgAttendance / 5) * 20;
  const experienceScore = (Math.min(experience, 10) / 10) * 20;
  const verificationScore = verified ? 20 : 0;

  return Math.round(performanceScore + attendanceScore + experienceScore + verificationScore);
}

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
    await requireVerifiedCompany(user);
    const db = getDb();

    const page = data.page ?? 1;
    const pageSize = data.pageSize ?? 20;
    const offset = (page - 1) * pageSize;

    const conditions: ReturnType<typeof eq>[] = [];

    // Scope employees list based on role
    if (user.role === "company_admin" || user.role === "hr") {
      if (!user.companyId) {
        throw new Error("Company context is required to list employees");
      }
      conditions.push(eq(schema.employees.companyId, user.companyId));
    } else if (user.role === "employee") {
      conditions.push(eq(schema.employees.userId, user.id));
    } else if (user.role !== "super_admin") {
      throw new Error("Unauthorized to access employee list");
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

    // Fetch all reviews for these employees in a single query to avoid N+1
    const employeeIds = rows.map((r) => r.id);
    const reviewsMap = new Map<string, { overall: number; attendance: number }[]>();
    
    if (employeeIds.length > 0) {
      const dbReviews = await db
        .select({
          employeeId: schema.performanceReviews.employeeId,
          overall: schema.performanceReviews.overall,
          attendance: schema.performanceReviews.attendance,
        })
        .from(schema.performanceReviews)
        .where(inArray(schema.performanceReviews.employeeId, employeeIds));

      for (const r of dbReviews) {
        if (!reviewsMap.has(r.employeeId)) {
          reviewsMap.set(r.employeeId, []);
        }
        reviewsMap.get(r.employeeId)!.push({
          overall: Number(r.overall),
          attendance: Number(r.attendance),
        });
      }
    }

    const employees: Employee[] = rows.map((row) => {
      // Calculate trust score synchronously in memory
      const empReviews = reviewsMap.get(row.id) ?? [];
      let avgPerformance = 5.0;
      let avgAttendance = 5.0;

      if (empReviews.length > 0) {
        const totalPerformance = empReviews.reduce((sum, r) => sum + r.overall, 0);
        const totalAttendance = empReviews.reduce((sum, r) => sum + r.attendance, 0);
        avgPerformance = totalPerformance / empReviews.length;
        avgAttendance = totalAttendance / empReviews.length;
      }

      const performanceScore = (avgPerformance / 5) * 40;
      const attendanceScore = (avgAttendance / 5) * 20;
      const experienceScore = (Math.min(row.experience, 10) / 10) * 20;
      const verificationScore = row.verified ? 20 : 0;
      const trustScore = Math.round(performanceScore + attendanceScore + experienceScore + verificationScore);

      return {
        id: row.id,
        employeeId: row.employeeId,
        userId: row.userId,
        companyId: row.companyId,
        fullName: row.fullName,
        email: row.email,
        phone: row.phone ?? "",
        designation: row.designation ?? "",
        department: row.department ?? "",
        skills: (row.skills as string[]) ?? [],
        certifications: (row.certifications as string[]) ?? [],
        portfolioLinks: (row.portfolioLinks as string[]) ?? [],
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
        claimStatus: row.claimStatus as Employee["claimStatus"],
        rating: Number(row.rating),
        trustScore,
        createdAt:
          row.createdAt instanceof Date
            ? row.createdAt.toISOString()
            : String(row.createdAt),
        updatedAt:
          row.updatedAt instanceof Date
            ? row.updatedAt.toISOString()
            : String(row.updatedAt),
      };
    });

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
      phone: z.string().min(1, "Phone number is required"),
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
      sendEmail: z.boolean().optional().default(true),
    })
  )
  .handler(async ({ data }) => {
    const user = await requireRole(["super_admin", "company_admin", "hr"]);
    await requireVerifiedCompany(user);
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

    // Check if there is a registered user with this email to automatically link
    const [existingUser] = await db
      .select({ id: schema.users.id })
      .from(schema.users)
      .where(eq(schema.users.email, data.email.toLowerCase().trim()))
      .limit(1);

    const userIdToLink = existingUser ? existingUser.id : null;

    // Get company name for email template
    const [comp] = await db
      .select({ name: schema.companies.name })
      .from(schema.companies)
      .where(eq(schema.companies.id, companyId))
      .limit(1);
    const companyName = comp?.name || "your employer";

    const [employee] = await db
      .insert(schema.employees)
      .values({
        employeeId,
        companyId,
        fullName: data.fullName,
        email: data.email.toLowerCase().trim(),
        phone: data.phone ?? "",
        designation: data.designation,
        department: data.department,
        skills: data.skills ?? [],
        joiningDate: new Date(data.joiningDate),
        exitDate: data.exitDate ? new Date(data.exitDate) : null,
        experience: data.experience ?? 0,
        status: data.status ?? "active",
        photoUrl: data.photoUrl ?? null,
        resumeUrl: data.resumeUrl ?? null,
        userId: userIdToLink || data.userId || null,
        claimStatus: (userIdToLink || data.userId) ? "claimed" : "unclaimed",
      })
      .returning();

    // If a user was found, update their companyId
    if (userIdToLink) {
      await db
        .update(schema.users)
        .set({ companyId })
        .where(eq(schema.users.id, userIdToLink));
    }

    let invitationId: string | null = null;

    if (!userIdToLink && !data.userId) {
      // Create invitation for claiming profile
      // Check if invitation already exists for this email and delete it to prevent unique violation
      await db
        .delete(schema.invitations)
        .where(eq(schema.invitations.email, data.email.toLowerCase().trim()));

      const [invitation] = await db
        .insert(schema.invitations)
        .values({
          email: data.email.toLowerCase().trim(),
          companyId,
          employeeId: employee.id,
          status: "pending",
        })
        .returning();

      invitationId = invitation.id;

      // Send invitation link if requested
      if (data.sendEmail) {
        const appUrl = process.env.APP_URL || "http://localhost:3000";
        const inviteLink = `${appUrl}/auth/signup?email=${encodeURIComponent(employee.email)}&inviteId=${invitation.id}`;

        const emailHtml = getEmployeeInvitationHtml({
          companyName,
          claimLink: inviteLink,
        });

        try {
          await sendEmail({
            to: employee.email,
            subject: "You Have Been Added to WorkCred",
            html: emailHtml,
          });
        } catch (emailErr: any) {
          console.warn("Failed to send invitation email via Resend:", emailErr.message);
          console.log("============================================================");
          console.log("[Resend Sandbox Fallback Log]");
          console.log(`To: ${employee.email}`);
          console.log(`Claim Link: ${inviteLink}`);
          console.log("============================================================");
        }
      }
    }

    // Audit
    await db.insert(schema.auditLogs).values({
      userId: user.id,
      action: `Created employee: ${data.fullName} (${employeeId})`,
      targetType: "employee",
      targetId: employee.id,
      type: "create",
    });

    return {
      ...employee,
      invitationId,
      companyName,
    } as any;
  });

// ── getEmployeeInviteLink ────────────────────────────────────────────

export const getEmployeeInviteLink = createServerFn({ method: "POST" })
  .validator(
    z.object({
      employeeId: z.string().uuid("Invalid employee ID"),
    })
  )
  .handler(async ({ data }) => {
    const user = await requireAuth();
    await requireVerifiedCompany(user);
    const db = getDb();

    // Verify employee exists
    const [employee] = await db
      .select()
      .from(schema.employees)
      .where(eq(schema.employees.id, data.employeeId))
      .limit(1);

    if (!employee) {
      throw new Error("Employee not found");
    }

    // Access control
    if (user.role !== "super_admin" && employee.companyId !== user.companyId) {
      throw new Error("Unauthorized to access this employee's invite link");
    }

    // Get company name
    const [comp] = await db
      .select({ name: schema.companies.name })
      .from(schema.companies)
      .where(eq(schema.companies.id, employee.companyId))
      .limit(1);
    const companyName = comp?.name || "your employer";

    // Find or create invitation
    let [invitation] = await db
      .select()
      .from(schema.invitations)
      .where(eq(schema.invitations.employeeId, employee.id))
      .limit(1);

    if (!invitation && employee.claimStatus === "unclaimed") {
      // Create a new invitation
      await db
        .delete(schema.invitations)
        .where(eq(schema.invitations.email, employee.email.toLowerCase().trim()));

      const [newInv] = await db
        .insert(schema.invitations)
        .values({
          email: employee.email.toLowerCase().trim(),
          companyId: employee.companyId,
          employeeId: employee.id,
          status: "pending",
        })
        .returning();
      invitation = newInv;
    }

    if (!invitation) {
      throw new Error("No pending invitation found for this employee");
    }

    return {
      invitationId: invitation.id,
      fullName: employee.fullName,
      phone: employee.phone || "",
      companyName,
    };
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
      certifications: z.array(z.string()).optional(),
      portfolioLinks: z.array(z.string()).optional(),
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
    const user = await requireAuth();
    const db = getDb();

    // Verify employee exists
    const [existing] = await db
      .select()
      .from(schema.employees)
      .where(eq(schema.employees.id, data.id))
      .limit(1);

    if (!existing) {
      throw new Error("Employee not found");
    }

    // Permission checks
    if (user.role === "company_admin" || user.role === "hr") {
      await requireVerifiedCompany(user);
      if (user.companyId !== existing.companyId) {
        throw new Error("You can only update employees in your company");
      }
    } else if (user.role === "employee") {
      if (existing.userId !== user.id) {
        throw new Error("You can only update your own employee profile");
      }
      if (data.verified !== undefined && data.verified !== existing.verified) {
        throw new Error("You cannot change your verification status");
      }
      if (data.status !== undefined && data.status !== existing.status) {
        throw new Error("You cannot change your employment status");
      }
    } else if (user.role !== "super_admin") {
      throw new Error("Unauthorized to update employee record");
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

    // Send email notification if status changed
    if (updates.status && updates.status !== existing.status) {
      const [comp] = await db
        .select({ name: schema.companies.name })
        .from(schema.companies)
        .where(eq(schema.companies.id, updated.companyId))
        .limit(1);
      const companyName = comp?.name || "your employer";

      try {
        const emailHtml = getEmployeeStatusUpdateHtml({
          employeeName: updated.fullName,
          companyName,
          status: updated.status as any,
        });

        await sendEmail({
          to: updated.email,
          subject: "Your Employment Status Has Been Updated",
          html: emailHtml,
        });
      } catch (emailErr) {
        console.error("Failed to send status update email:", emailErr);
      }
    }

    // Audit
    await db.insert(schema.auditLogs).values({
      userId: user.id,
      action: `Updated employee: ${updated.fullName}`,
      targetType: "employee",
      targetId: id,
      type: "update",
      metadata: { updatedFields: Object.keys(updates) },
    });

    return updated as any;
  });

// ── deleteEmployee ───────────────────────────────────────────────────

export const deleteEmployee = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string().uuid("Invalid employee ID"),
    })
  )
  .handler(async ({ data }) => {
    const user = await requireRole(["super_admin", "company_admin", "hr"]);
    const db = getDb();

    // Verify employee exists
    const [existing] = await db
      .select()
      .from(schema.employees)
      .where(eq(schema.employees.id, data.id))
      .limit(1);

    if (!existing) {
      throw new Error("Employee not found");
    }

    // Permission check
    if (user.role !== "super_admin" && user.companyId !== existing.companyId) {
      throw new Error("You do not have permission to delete this employee");
    }

    // Fetch company name for email template
    const [comp] = await db
      .select({ name: schema.companies.name })
      .from(schema.companies)
      .where(eq(schema.companies.id, existing.companyId))
      .limit(1);
    const companyName = comp?.name || "your employer";

    // Send email notification to employee
    try {
      const emailHtml = getEmployeeDeletionHtml({
        employeeName: existing.fullName,
        companyName,
      });

      await sendEmail({
        to: existing.email,
        subject: "Your WorkCred Profile has been Removed",
        html: emailHtml,
      });
    } catch (emailErr) {
      console.error("Failed to send deletion email:", emailErr);
    }

    // Safely delete referencing rows first to avoid constraint violation
    await db.delete(schema.invitations).where(eq(schema.invitations.employeeId, data.id));
    await db.delete(schema.employmentHistory).where(eq(schema.employmentHistory.employeeId, data.id));

    // Delete employee
    await db
      .delete(schema.employees)
      .where(eq(schema.employees.id, data.id));

    // Audit
    await db.insert(schema.auditLogs).values({
      userId: user.id,
      action: `Deleted employee: ${existing.fullName} (${existing.employeeId})`,
      targetType: "employee",
      targetId: data.id,
      type: "delete",
    });

    return { success: true };
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

    // Access control:
    // - super_admin can view anyone
    // - company_admin / hr can view employees within their company
    // - employees can only view their own record
    if (user.role !== "super_admin") {
      const isOwnRecord = user.id === emp.userId;
      const isCompanyMember =
        (user.role === "company_admin" || user.role === "hr") &&
        user.companyId != null &&
        user.companyId === emp.companyId;

      if (!isOwnRecord && !isCompanyMember) {
        throw new Error("You do not have access to this employee");
      }
    }

    const trustScore = await getTrustScore(db, emp.id, emp.experience, emp.verified);

    return {
      id: emp.id,
      employeeId: emp.employeeId,
      userId: emp.userId,
      companyId: emp.companyId,
      fullName: emp.fullName,
      email: emp.email,
      phone: emp.phone ?? "",
      designation: emp.designation ?? "",
      department: emp.department ?? "",
      skills: (emp.skills as string[]) ?? [],
      certifications: (emp.certifications as string[]) ?? [],
      portfolioLinks: (emp.portfolioLinks as string[]) ?? [],
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
      claimStatus: emp.claimStatus as Employee["claimStatus"],
      rating: Number(emp.rating),
      trustScore,
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
            size: company.size ?? "",
            location: company.location ?? "",
            website: company.website ?? "",
            logoUrl: company.logoUrl,
            verified: company.verified,
            status: company.status,
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

    // Non-super-admin users can only query their own record
    if (user.role !== "super_admin" && targetUserId !== user.id) {
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
      // Bulletproof auto-linking: check if an employee record exists with the same email
      const [dbUser] = await db
        .select({ email: schema.users.email })
        .from(schema.users)
        .where(eq(schema.users.id, targetUserId))
        .limit(1);

      if (dbUser) {
        const [empByEmail] = await db
          .select()
          .from(schema.employees)
          .where(eq(schema.employees.email, dbUser.email.toLowerCase().trim()))
          .limit(1);

        if (empByEmail) {
          // Perform linking
          await db
            .update(schema.employees)
            .set({ userId: targetUserId, claimStatus: "claimed" })
            .where(eq(schema.employees.id, empByEmail.id));

          await db
            .update(schema.users)
            .set({ companyId: empByEmail.companyId })
            .where(eq(schema.users.id, targetUserId));

          // Fetch the newly linked row
          const newRows = await db
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

          if (newRows.length > 0) {
            rows.push(newRows[0]);
          }
        }
      }
    }

    if (rows.length === 0) {
      return null;
    }

    const { employee: emp, company } = rows[0];
    const trustScore = await getTrustScore(db, emp.id, emp.experience, emp.verified);

    return {
      id: emp.id,
      employeeId: emp.employeeId,
      userId: emp.userId,
      companyId: emp.companyId,
      fullName: emp.fullName,
      email: emp.email,
      phone: emp.phone ?? "",
      designation: emp.designation ?? "",
      department: emp.department ?? "",
      skills: (emp.skills as string[]) ?? [],
      certifications: (emp.certifications as string[]) ?? [],
      portfolioLinks: (emp.portfolioLinks as string[]) ?? [],
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
      claimStatus: emp.claimStatus as Employee["claimStatus"],
      rating: Number(emp.rating),
      trustScore,
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
            size: company.size ?? "",
            location: company.location ?? "",
            website: company.website ?? "",
            logoUrl: company.logoUrl,
            verified: company.verified,
            status: company.status,
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

// ── addEmploymentHistory ─────────────────────────────────────────────
export const addEmploymentHistory = createServerFn({ method: "POST" })
  .validator(
    z.object({
      employeeId: z.string().uuid("Invalid employee ID"),
      companyName: z.string().min(1, "Company name is required"),
      companyId: z.string().uuid().nullable().optional(),
      designation: z.string().min(1, "Designation is required"),
      department: z.string().optional(),
      joiningDate: z.string().min(1, "Joining date is required"),
      exitDate: z.string().nullable().optional(),
      experience: z.number().min(0).optional().default(0),
      salary: z.number().nullable().optional(),
    })
  )
  .handler(async ({ data }) => {
    const user = await requireAuth();
    const db = getDb();

    // Verify employee exists
    const [employee] = await db
      .select()
      .from(schema.employees)
      .where(eq(schema.employees.id, data.employeeId))
      .limit(1);

    if (!employee) {
      throw new Error("Employee not found");
    }

    // Only the employee themselves, or super admin, or HR of employee's company can add history
    if (
      user.role !== "super_admin" &&
      employee.userId !== user.id &&
      employee.companyId !== user.companyId
    ) {
      throw new Error("Unauthorized to add employment history for this employee");
    }

    const [history] = await db
      .insert(schema.employmentHistory)
      .values({
        employeeId: data.employeeId,
        companyId: data.companyId || null,
        companyName: data.companyName,
        designation: data.designation,
        department: data.department || null,
        joiningDate: new Date(data.joiningDate),
        exitDate: data.exitDate ? new Date(data.exitDate) : null,
        experience: data.experience ?? 0,
        salary: data.salary || null,
        verificationStatus: "pending",
      })
      .returning();

    return history;
  });

// ── verifyEmploymentHistory ──────────────────────────────────────────
export const verifyEmploymentHistory = createServerFn({ method: "POST" })
  .validator(
    z.object({
      historyId: z.string().uuid("Invalid history ID"),
      status: z.enum(["verified", "rejected"]),
    })
  )
  .handler(async ({ data }) => {
    const user = await requireRole(["super_admin", "company_admin", "hr"]);
    await requireVerifiedCompany(user);
    const db = getDb();

    const [history] = await db
      .select()
      .from(schema.employmentHistory)
      .where(eq(schema.employmentHistory.id, data.historyId))
      .limit(1);

    if (!history) {
      throw new Error("History record not found");
    }

    // Must be super admin, or the company matching the history entry
    if (user.role !== "super_admin") {
      if (history.companyId) {
        if (user.companyId !== history.companyId) {
          throw new Error("Unauthorized. This history is for a different company");
        }
      } else {
        // If there's no companyId in the entry, match by name
        const [comp] = await db
          .select({ name: schema.companies.name })
          .from(schema.companies)
          .where(eq(schema.companies.id, user.companyId!))
          .limit(1);
        if (!comp || comp.name.toLowerCase().trim() !== history.companyName.toLowerCase().trim()) {
          throw new Error("Unauthorized. Company name mismatch");
        }
      }
    }

    const [updated] = await db
      .update(schema.employmentHistory)
      .set({
        verificationStatus: data.status,
        updatedAt: new Date(),
      })
      .where(eq(schema.employmentHistory.id, data.historyId))
      .returning();

    // Check if we verified it, we can also update the employee's verified status
    if (data.status === "verified") {
      // Find employee
      const [employee] = await db
        .select()
        .from(schema.employees)
        .where(eq(schema.employees.id, history.employeeId))
        .limit(1);
      
      if (employee) {
        // Mark employee as verified
        await db
          .update(schema.employees)
          .set({ verified: true, updatedAt: new Date() })
          .where(eq(schema.employees.id, employee.id));
      }
    }

    return updated;
  });

// ── getEmploymentHistory ─────────────────────────────────────────────
export const getEmploymentHistory = createServerFn({ method: "GET" })
  .validator(
    z.object({
      employeeId: z.string().uuid("Invalid employee ID"),
    })
  )
  .handler(async ({ data }) => {
    const user = await requireAuth();
    const db = getDb();

    const [employee] = await db
      .select()
      .from(schema.employees)
      .where(eq(schema.employees.id, data.employeeId))
      .limit(1);

    if (!employee) {
      throw new Error("Employee not found");
    }

    // Check access permissions: non-super-admins can only access their own history
    if (user.role !== "super_admin" && employee.userId !== user.id) {
      throw new Error("You do not have access to this employee's history");
    }
    const canViewConfidential = user.role !== "employee";

    const rows = await db
      .select()
      .from(schema.employmentHistory)
      .where(eq(schema.employmentHistory.employeeId, data.employeeId))
      .orderBy(desc(schema.employmentHistory.joiningDate));

    return rows.map((row) => ({
      id: row.id,
      employeeId: row.employeeId,
      companyId: row.companyId,
      companyName: row.companyName,
      designation: row.designation,
      department: row.department,
      joiningDate: row.joiningDate.toISOString(),
      exitDate: row.exitDate ? row.exitDate.toISOString() : null,
      experience: row.experience,
      salary: canViewConfidential ? row.salary : null,
      verificationStatus: row.verificationStatus as "pending" | "verified" | "rejected",
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    }));
  });
