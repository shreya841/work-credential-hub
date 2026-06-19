import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { a as numberType, c as stringType, n as booleanType, o as objectType, r as enumType, t as arrayType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { a as count, c as eq, l as ilike, o as desc, p as or, s as and, u as inArray } from "../_libs/drizzle-orm+postgres.mjs";
import { c as invitations, m as users, n as auditLogs, o as employees, r as companies, s as employmentHistory, u as performanceReviews } from "./schema-BhmjnuI8.mjs";
import { getDb } from "./index.server-ir69dnPx.mjs";
import { i as requireVerifiedCompany, n as requireAuth, r as requireRole } from "./session.server-CB7XLiCS.mjs";
import { getEmployeeDeletionHtml, getEmployeeInvitationHtml, getEmployeeStatusUpdateHtml, sendEmail } from "./email.server-Czmx-_mw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employees.functions-DRpOtwF5.js
async function getTrustScore(db, employeeId, experience, verified) {
	const reviews = await db.select({
		overall: performanceReviews.overall,
		attendance: performanceReviews.attendance
	}).from(performanceReviews).where(eq(performanceReviews.employeeId, employeeId));
	let avgPerformance = 5;
	let avgAttendance = 5;
	if (reviews.length > 0) {
		const totalPerformance = reviews.reduce((sum, r) => sum + Number(r.overall), 0);
		const totalAttendance = reviews.reduce((sum, r) => sum + Number(r.attendance), 0);
		avgPerformance = totalPerformance / reviews.length;
		avgAttendance = totalAttendance / reviews.length;
	}
	const performanceScore = avgPerformance / 5 * 40;
	const attendanceScore = avgAttendance / 5 * 20;
	const experienceScore = Math.min(experience, 10) / 10 * 20;
	const verificationScore = verified ? 20 : 0;
	return Math.round(performanceScore + attendanceScore + experienceScore + verificationScore);
}
var listEmployees_createServerFn_handler = createServerRpc({
	id: "8dd7749cf3e7ca388f2dfc52e817ba18f353524e222489fc95e57e122be6b46d",
	name: "listEmployees",
	filename: "src/lib/api/employees.functions.ts"
}, (opts) => listEmployees.__executeServer(opts));
var listEmployees = createServerFn({ method: "GET" }).validator(objectType({
	page: numberType().int().positive().optional().default(1),
	pageSize: numberType().int().positive().max(100).optional().default(20),
	search: stringType().optional(),
	status: enumType([
		"active",
		"on_leave",
		"exited"
	]).optional()
})).handler(listEmployees_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	await requireVerifiedCompany(user);
	const db = getDb();
	const page = data.page ?? 1;
	const pageSize = data.pageSize ?? 20;
	const offset = (page - 1) * pageSize;
	const conditions = [];
	if (user.role === "company_admin" || user.role === "hr") {
		if (!user.companyId) throw new Error("Company context is required to list employees");
		conditions.push(eq(employees.companyId, user.companyId));
	} else if (user.role === "employee") conditions.push(eq(employees.userId, user.id));
	else if (user.role !== "super_admin") throw new Error("Unauthorized to access employee list");
	if (data.status) conditions.push(eq(employees.status, data.status));
	if (data.search) {
		const searchPattern = `%${data.search}%`;
		conditions.push(or(ilike(employees.fullName, searchPattern), ilike(employees.email, searchPattern), ilike(employees.employeeId, searchPattern), ilike(employees.designation, searchPattern)));
	}
	const whereClause = conditions.length > 0 ? and(...conditions) : void 0;
	const [totalResult] = await db.select({ total: count() }).from(employees).where(whereClause);
	const total = totalResult?.total ?? 0;
	const rows = await db.select().from(employees).where(whereClause).orderBy(desc(employees.createdAt)).limit(pageSize).offset(offset);
	const employeeIds = rows.map((r) => r.id);
	const reviewsMap = /* @__PURE__ */ new Map();
	if (employeeIds.length > 0) {
		const dbReviews = await db.select({
			employeeId: performanceReviews.employeeId,
			overall: performanceReviews.overall,
			attendance: performanceReviews.attendance
		}).from(performanceReviews).where(inArray(performanceReviews.employeeId, employeeIds));
		for (const r of dbReviews) {
			if (!reviewsMap.has(r.employeeId)) reviewsMap.set(r.employeeId, []);
			reviewsMap.get(r.employeeId).push({
				overall: Number(r.overall),
				attendance: Number(r.attendance)
			});
		}
	}
	return {
		data: rows.map((row) => {
			const empReviews = reviewsMap.get(row.id) ?? [];
			let avgPerformance = 5;
			let avgAttendance = 5;
			if (empReviews.length > 0) {
				const totalPerformance = empReviews.reduce((sum, r) => sum + r.overall, 0);
				const totalAttendance = empReviews.reduce((sum, r) => sum + r.attendance, 0);
				avgPerformance = totalPerformance / empReviews.length;
				avgAttendance = totalAttendance / empReviews.length;
			}
			const performanceScore = avgPerformance / 5 * 40;
			const attendanceScore = avgAttendance / 5 * 20;
			const experienceScore = Math.min(row.experience, 10) / 10 * 20;
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
				skills: row.skills ?? [],
				certifications: row.certifications ?? [],
				portfolioLinks: row.portfolioLinks ?? [],
				joiningDate: row.joiningDate instanceof Date ? row.joiningDate.toISOString() : String(row.joiningDate),
				exitDate: row.exitDate ? row.exitDate instanceof Date ? row.exitDate.toISOString() : String(row.exitDate) : null,
				experience: row.experience,
				status: row.status,
				photoUrl: row.photoUrl,
				resumeUrl: row.resumeUrl,
				verified: row.verified,
				claimStatus: row.claimStatus,
				rating: Number(row.rating),
				trustScore,
				createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : String(row.createdAt),
				updatedAt: row.updatedAt instanceof Date ? row.updatedAt.toISOString() : String(row.updatedAt)
			};
		}),
		total,
		page,
		pageSize,
		totalPages: Math.ceil(total / pageSize)
	};
});
var createEmployee_createServerFn_handler = createServerRpc({
	id: "90ee2cb0505d4b20e1c1bd4600122d0e4cacdbbddb5c9ad61e51dcd826fbc4d9",
	name: "createEmployee",
	filename: "src/lib/api/employees.functions.ts"
}, (opts) => createEmployee.__executeServer(opts));
var createEmployee = createServerFn({ method: "POST" }).validator(objectType({
	fullName: stringType().min(1, "Full name is required"),
	email: stringType().email("Invalid email"),
	phone: stringType().min(1, "Phone number is required"),
	designation: stringType().min(1, "Designation is required"),
	department: stringType().min(1, "Department is required"),
	skills: arrayType(stringType()).optional().default([]),
	joiningDate: stringType().min(1, "Joining date is required"),
	exitDate: stringType().nullable().optional(),
	experience: numberType().int().min(0).optional().default(0),
	status: enumType([
		"active",
		"on_leave",
		"exited"
	]).optional().default("active"),
	photoUrl: stringType().nullable().optional(),
	resumeUrl: stringType().nullable().optional(),
	companyId: stringType().uuid().optional(),
	userId: stringType().uuid().nullable().optional(),
	employeeId: stringType().optional(),
	sendEmail: booleanType().optional().default(true)
})).handler(createEmployee_createServerFn_handler, async ({ data }) => {
	const user = await requireRole([
		"super_admin",
		"company_admin",
		"hr"
	]);
	await requireVerifiedCompany(user);
	const db = getDb();
	const companyId = user.role === "super_admin" && data.companyId ? data.companyId : user.companyId;
	if (!companyId) throw new Error("Company context is required to create an employee");
	let employeeId = data.employeeId;
	if (!employeeId) {
		const [latestEmp] = await db.select({ employeeId: employees.employeeId }).from(employees).where(eq(employees.companyId, companyId)).orderBy(desc(employees.createdAt)).limit(1);
		if (latestEmp?.employeeId) {
			const match = latestEmp.employeeId.match(/EMP-(\d+)/);
			const nextNum = match ? parseInt(match[1], 10) + 1 : 1;
			employeeId = `EMP-${String(nextNum).padStart(4, "0")}`;
		} else employeeId = "EMP-0001";
	}
	const [existingEmail] = await db.select({ id: employees.id }).from(employees).where(and(eq(employees.email, data.email.toLowerCase().trim()), eq(employees.companyId, companyId))).limit(1);
	if (existingEmail) throw new Error("An employee with this email already exists in this company");
	const [existingUser] = await db.select({ id: users.id }).from(users).where(eq(users.email, data.email.toLowerCase().trim())).limit(1);
	const userIdToLink = existingUser ? existingUser.id : null;
	const [comp] = await db.select({ name: companies.name }).from(companies).where(eq(companies.id, companyId)).limit(1);
	const companyName = comp?.name || "your employer";
	const [employee] = await db.insert(employees).values({
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
		claimStatus: userIdToLink || data.userId ? "claimed" : "unclaimed"
	}).returning();
	if (userIdToLink) await db.update(users).set({ companyId }).where(eq(users.id, userIdToLink));
	let invitationId = null;
	if (!userIdToLink && !data.userId) {
		await db.delete(invitations).where(eq(invitations.email, data.email.toLowerCase().trim()));
		const [invitation] = await db.insert(invitations).values({
			email: data.email.toLowerCase().trim(),
			companyId,
			employeeId: employee.id,
			status: "pending"
		}).returning();
		invitationId = invitation.id;
		if (data.sendEmail) {
			const inviteLink = `${process.env.APP_URL || "http://localhost:3000"}/auth/signup?email=${encodeURIComponent(employee.email)}&inviteId=${invitation.id}`;
			const emailHtml = getEmployeeInvitationHtml({
				companyName,
				claimLink: inviteLink
			});
			try {
				await sendEmail({
					to: employee.email,
					subject: "You Have Been Added to WorkCred",
					html: emailHtml
				});
			} catch (emailErr) {
				console.warn("Failed to send invitation email via Resend:", emailErr.message);
				console.log("============================================================");
				console.log("[Resend Sandbox Fallback Log]");
				console.log(`To: ${employee.email}`);
				console.log(`Claim Link: ${inviteLink}`);
				console.log("============================================================");
			}
		}
	}
	await db.insert(auditLogs).values({
		userId: user.id,
		action: `Created employee: ${data.fullName} (${employeeId})`,
		targetType: "employee",
		targetId: employee.id,
		type: "create"
	});
	return {
		...employee,
		invitationId,
		companyName
	};
});
var getEmployeeInviteLink_createServerFn_handler = createServerRpc({
	id: "e26e028dcf1d0ffa388746d15a7e8abe1b3dc9404911d6b1ada2131935241fef",
	name: "getEmployeeInviteLink",
	filename: "src/lib/api/employees.functions.ts"
}, (opts) => getEmployeeInviteLink.__executeServer(opts));
var getEmployeeInviteLink = createServerFn({ method: "POST" }).validator(objectType({ employeeId: stringType().uuid("Invalid employee ID") })).handler(getEmployeeInviteLink_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	await requireVerifiedCompany(user);
	const db = getDb();
	const [employee] = await db.select().from(employees).where(eq(employees.id, data.employeeId)).limit(1);
	if (!employee) throw new Error("Employee not found");
	if (user.role !== "super_admin" && employee.companyId !== user.companyId) throw new Error("Unauthorized to access this employee's invite link");
	const [comp] = await db.select({ name: companies.name }).from(companies).where(eq(companies.id, employee.companyId)).limit(1);
	const companyName = comp?.name || "your employer";
	let [invitation] = await db.select().from(invitations).where(eq(invitations.employeeId, employee.id)).limit(1);
	if (!invitation && employee.claimStatus === "unclaimed") {
		await db.delete(invitations).where(eq(invitations.email, employee.email.toLowerCase().trim()));
		const [newInv] = await db.insert(invitations).values({
			email: employee.email.toLowerCase().trim(),
			companyId: employee.companyId,
			employeeId: employee.id,
			status: "pending"
		}).returning();
		invitation = newInv;
	}
	if (!invitation) throw new Error("No pending invitation found for this employee");
	return {
		invitationId: invitation.id,
		fullName: employee.fullName,
		phone: employee.phone || "",
		companyName
	};
});
var updateEmployee_createServerFn_handler = createServerRpc({
	id: "bad757c986b3f7ff1d20dba2970ed40c710ec1f83200a1d8b416fb354410899a",
	name: "updateEmployee",
	filename: "src/lib/api/employees.functions.ts"
}, (opts) => updateEmployee.__executeServer(opts));
var updateEmployee = createServerFn({ method: "POST" }).validator(objectType({
	id: stringType().uuid("Invalid employee ID"),
	fullName: stringType().min(1).optional(),
	email: stringType().email().optional(),
	phone: stringType().optional(),
	designation: stringType().optional(),
	department: stringType().optional(),
	skills: arrayType(stringType()).optional(),
	certifications: arrayType(stringType()).optional(),
	portfolioLinks: arrayType(stringType()).optional(),
	joiningDate: stringType().optional(),
	exitDate: stringType().nullable().optional(),
	experience: numberType().int().min(0).optional(),
	status: enumType([
		"active",
		"on_leave",
		"exited"
	]).optional(),
	photoUrl: stringType().nullable().optional(),
	resumeUrl: stringType().nullable().optional(),
	verified: booleanType().optional()
})).handler(updateEmployee_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	const db = getDb();
	const [existing] = await db.select().from(employees).where(eq(employees.id, data.id)).limit(1);
	if (!existing) throw new Error("Employee not found");
	if (user.role === "company_admin" || user.role === "hr") {
		await requireVerifiedCompany(user);
		if (user.companyId !== existing.companyId) throw new Error("You can only update employees in your company");
	} else if (user.role === "employee") {
		if (existing.userId !== user.id) throw new Error("You can only update your own employee profile");
		if (data.verified !== void 0 && data.verified !== existing.verified) throw new Error("You cannot change your verification status");
		if (data.status !== void 0 && data.status !== existing.status) throw new Error("You cannot change your employment status");
	} else if (user.role !== "super_admin") throw new Error("Unauthorized to update employee record");
	const { id, ...updateFields } = data;
	const updates = {};
	for (const [key, value] of Object.entries(updateFields)) if (value !== void 0) if (key === "joiningDate" || key === "exitDate") updates[key] = value ? new Date(value) : null;
	else updates[key] = value;
	if (Object.keys(updates).length === 0) throw new Error("No fields to update");
	updates.updatedAt = /* @__PURE__ */ new Date();
	const [updated] = await db.update(employees).set(updates).where(eq(employees.id, id)).returning();
	if (updates.status && updates.status !== existing.status) {
		const [comp] = await db.select({ name: companies.name }).from(companies).where(eq(companies.id, updated.companyId)).limit(1);
		const companyName = comp?.name || "your employer";
		try {
			const emailHtml = getEmployeeStatusUpdateHtml({
				employeeName: updated.fullName,
				companyName,
				status: updated.status
			});
			await sendEmail({
				to: updated.email,
				subject: "Your Employment Status Has Been Updated",
				html: emailHtml
			});
		} catch (emailErr) {
			console.error("Failed to send status update email:", emailErr);
		}
	}
	await db.insert(auditLogs).values({
		userId: user.id,
		action: `Updated employee: ${updated.fullName}`,
		targetType: "employee",
		targetId: id,
		type: "update",
		metadata: { updatedFields: Object.keys(updates) }
	});
	return updated;
});
var deleteEmployee_createServerFn_handler = createServerRpc({
	id: "e7153f4ace0aec4f8dfb07869aa8c83d7b85976d2ca07bd64118f447efbeddc5",
	name: "deleteEmployee",
	filename: "src/lib/api/employees.functions.ts"
}, (opts) => deleteEmployee.__executeServer(opts));
var deleteEmployee = createServerFn({ method: "POST" }).validator(objectType({ id: stringType().uuid("Invalid employee ID") })).handler(deleteEmployee_createServerFn_handler, async ({ data }) => {
	const user = await requireRole([
		"super_admin",
		"company_admin",
		"hr"
	]);
	const db = getDb();
	const [existing] = await db.select().from(employees).where(eq(employees.id, data.id)).limit(1);
	if (!existing) throw new Error("Employee not found");
	if (user.role !== "super_admin" && user.companyId !== existing.companyId) throw new Error("You do not have permission to delete this employee");
	const [comp] = await db.select({ name: companies.name }).from(companies).where(eq(companies.id, existing.companyId)).limit(1);
	const companyName = comp?.name || "your employer";
	try {
		const emailHtml = getEmployeeDeletionHtml({
			employeeName: existing.fullName,
			companyName
		});
		await sendEmail({
			to: existing.email,
			subject: "Your WorkCred Profile has been Removed",
			html: emailHtml
		});
	} catch (emailErr) {
		console.error("Failed to send deletion email:", emailErr);
	}
	await db.delete(invitations).where(eq(invitations.employeeId, data.id));
	await db.delete(employmentHistory).where(eq(employmentHistory.employeeId, data.id));
	await db.delete(employees).where(eq(employees.id, data.id));
	await db.insert(auditLogs).values({
		userId: user.id,
		action: `Deleted employee: ${existing.fullName} (${existing.employeeId})`,
		targetType: "employee",
		targetId: data.id,
		type: "delete"
	});
	return { success: true };
});
var getEmployeeById_createServerFn_handler = createServerRpc({
	id: "1461b0fcc6cfd003cc49dad0a670c65dc1c094c20199a9a43cc8da5c857565f5",
	name: "getEmployeeById",
	filename: "src/lib/api/employees.functions.ts"
}, (opts) => getEmployeeById.__executeServer(opts));
var getEmployeeById = createServerFn({ method: "GET" }).validator(objectType({ id: stringType().uuid("Invalid employee ID") })).handler(getEmployeeById_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	const db = getDb();
	const rows = await db.select({
		employee: employees,
		company: companies
	}).from(employees).leftJoin(companies, eq(employees.companyId, companies.id)).where(eq(employees.id, data.id)).limit(1);
	if (rows.length === 0) throw new Error("Employee not found");
	const { employee: emp, company } = rows[0];
	if (user.role !== "super_admin") {
		const isOwnRecord = user.id === emp.userId;
		const isCompanyMember = (user.role === "company_admin" || user.role === "hr") && user.companyId != null && user.companyId === emp.companyId;
		if (!isOwnRecord && !isCompanyMember) throw new Error("You do not have access to this employee");
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
		skills: emp.skills ?? [],
		certifications: emp.certifications ?? [],
		portfolioLinks: emp.portfolioLinks ?? [],
		joiningDate: emp.joiningDate instanceof Date ? emp.joiningDate.toISOString() : String(emp.joiningDate),
		exitDate: emp.exitDate ? emp.exitDate instanceof Date ? emp.exitDate.toISOString() : String(emp.exitDate) : null,
		experience: emp.experience,
		status: emp.status,
		photoUrl: emp.photoUrl,
		resumeUrl: emp.resumeUrl,
		verified: emp.verified,
		claimStatus: emp.claimStatus,
		rating: Number(emp.rating),
		trustScore,
		createdAt: emp.createdAt instanceof Date ? emp.createdAt.toISOString() : String(emp.createdAt),
		updatedAt: emp.updatedAt instanceof Date ? emp.updatedAt.toISOString() : String(emp.updatedAt),
		company: company ? {
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
			createdAt: company.createdAt instanceof Date ? company.createdAt.toISOString() : String(company.createdAt),
			updatedAt: company.updatedAt instanceof Date ? company.updatedAt.toISOString() : String(company.updatedAt)
		} : null
	};
});
var getEmployeeByUserId_createServerFn_handler = createServerRpc({
	id: "90a6a1d181358c1440267a4b9bf787130c9fdaff933bf6cbd522054b079fe8e0",
	name: "getEmployeeByUserId",
	filename: "src/lib/api/employees.functions.ts"
}, (opts) => getEmployeeByUserId.__executeServer(opts));
var getEmployeeByUserId = createServerFn({ method: "GET" }).validator(objectType({ userId: stringType().uuid("Invalid user ID").optional() })).handler(getEmployeeByUserId_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	const db = getDb();
	const targetUserId = data.userId ?? user.id;
	if (user.role !== "super_admin" && targetUserId !== user.id) throw new Error("You can only view your own employee record");
	const rows = await db.select({
		employee: employees,
		company: companies
	}).from(employees).leftJoin(companies, eq(employees.companyId, companies.id)).where(eq(employees.userId, targetUserId)).limit(1);
	if (rows.length === 0) {
		const [dbUser] = await db.select({ email: users.email }).from(users).where(eq(users.id, targetUserId)).limit(1);
		if (dbUser) {
			const [empByEmail] = await db.select().from(employees).where(eq(employees.email, dbUser.email.toLowerCase().trim())).limit(1);
			if (empByEmail) {
				await db.update(employees).set({
					userId: targetUserId,
					claimStatus: "claimed"
				}).where(eq(employees.id, empByEmail.id));
				await db.update(users).set({ companyId: empByEmail.companyId }).where(eq(users.id, targetUserId));
				const newRows = await db.select({
					employee: employees,
					company: companies
				}).from(employees).leftJoin(companies, eq(employees.companyId, companies.id)).where(eq(employees.userId, targetUserId)).limit(1);
				if (newRows.length > 0) rows.push(newRows[0]);
			}
		}
	}
	if (rows.length === 0) return null;
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
		skills: emp.skills ?? [],
		certifications: emp.certifications ?? [],
		portfolioLinks: emp.portfolioLinks ?? [],
		joiningDate: emp.joiningDate instanceof Date ? emp.joiningDate.toISOString() : String(emp.joiningDate),
		exitDate: emp.exitDate ? emp.exitDate instanceof Date ? emp.exitDate.toISOString() : String(emp.exitDate) : null,
		experience: emp.experience,
		status: emp.status,
		photoUrl: emp.photoUrl,
		resumeUrl: emp.resumeUrl,
		verified: emp.verified,
		claimStatus: emp.claimStatus,
		rating: Number(emp.rating),
		trustScore,
		createdAt: emp.createdAt instanceof Date ? emp.createdAt.toISOString() : String(emp.createdAt),
		updatedAt: emp.updatedAt instanceof Date ? emp.updatedAt.toISOString() : String(emp.updatedAt),
		company: company ? {
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
			createdAt: company.createdAt instanceof Date ? company.createdAt.toISOString() : String(company.createdAt),
			updatedAt: company.updatedAt instanceof Date ? company.updatedAt.toISOString() : String(company.updatedAt)
		} : null
	};
});
var addEmploymentHistory_createServerFn_handler = createServerRpc({
	id: "09ae1161f4449b75d791225848445f712d66f28c79696c03ab0d3c485e37ca72",
	name: "addEmploymentHistory",
	filename: "src/lib/api/employees.functions.ts"
}, (opts) => addEmploymentHistory.__executeServer(opts));
var addEmploymentHistory = createServerFn({ method: "POST" }).validator(objectType({
	employeeId: stringType().uuid("Invalid employee ID"),
	companyName: stringType().min(1, "Company name is required"),
	companyId: stringType().uuid().nullable().optional(),
	designation: stringType().min(1, "Designation is required"),
	department: stringType().optional(),
	joiningDate: stringType().min(1, "Joining date is required"),
	exitDate: stringType().nullable().optional(),
	experience: numberType().min(0).optional().default(0),
	salary: numberType().nullable().optional()
})).handler(addEmploymentHistory_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	const db = getDb();
	const [employee] = await db.select().from(employees).where(eq(employees.id, data.employeeId)).limit(1);
	if (!employee) throw new Error("Employee not found");
	if (user.role !== "super_admin" && employee.userId !== user.id && employee.companyId !== user.companyId) throw new Error("Unauthorized to add employment history for this employee");
	const [history] = await db.insert(employmentHistory).values({
		employeeId: data.employeeId,
		companyId: data.companyId || null,
		companyName: data.companyName,
		designation: data.designation,
		department: data.department || null,
		joiningDate: new Date(data.joiningDate),
		exitDate: data.exitDate ? new Date(data.exitDate) : null,
		experience: data.experience ?? 0,
		salary: data.salary || null,
		verificationStatus: "pending"
	}).returning();
	return history;
});
var verifyEmploymentHistory_createServerFn_handler = createServerRpc({
	id: "20b17c55c5d6fcd6a947b1e25f541896bc8e7dbb99acfc74c9e7ae72c56ead27",
	name: "verifyEmploymentHistory",
	filename: "src/lib/api/employees.functions.ts"
}, (opts) => verifyEmploymentHistory.__executeServer(opts));
var verifyEmploymentHistory = createServerFn({ method: "POST" }).validator(objectType({
	historyId: stringType().uuid("Invalid history ID"),
	status: enumType(["verified", "rejected"])
})).handler(verifyEmploymentHistory_createServerFn_handler, async ({ data }) => {
	const user = await requireRole([
		"super_admin",
		"company_admin",
		"hr"
	]);
	await requireVerifiedCompany(user);
	const db = getDb();
	const [history] = await db.select().from(employmentHistory).where(eq(employmentHistory.id, data.historyId)).limit(1);
	if (!history) throw new Error("History record not found");
	if (user.role !== "super_admin") if (history.companyId) {
		if (user.companyId !== history.companyId) throw new Error("Unauthorized. This history is for a different company");
	} else {
		const [comp] = await db.select({ name: companies.name }).from(companies).where(eq(companies.id, user.companyId)).limit(1);
		if (!comp || comp.name.toLowerCase().trim() !== history.companyName.toLowerCase().trim()) throw new Error("Unauthorized. Company name mismatch");
	}
	const [updated] = await db.update(employmentHistory).set({
		verificationStatus: data.status,
		updatedAt: /* @__PURE__ */ new Date()
	}).where(eq(employmentHistory.id, data.historyId)).returning();
	if (data.status === "verified") {
		const [employee] = await db.select().from(employees).where(eq(employees.id, history.employeeId)).limit(1);
		if (employee) await db.update(employees).set({
			verified: true,
			updatedAt: /* @__PURE__ */ new Date()
		}).where(eq(employees.id, employee.id));
	}
	return updated;
});
var getEmploymentHistory_createServerFn_handler = createServerRpc({
	id: "108c569cac177158991e460f77793efc05ec19455e206f83ba4a58915b44e0a8",
	name: "getEmploymentHistory",
	filename: "src/lib/api/employees.functions.ts"
}, (opts) => getEmploymentHistory.__executeServer(opts));
var getEmploymentHistory = createServerFn({ method: "GET" }).validator(objectType({ employeeId: stringType().uuid("Invalid employee ID") })).handler(getEmploymentHistory_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	const db = getDb();
	const [employee] = await db.select().from(employees).where(eq(employees.id, data.employeeId)).limit(1);
	if (!employee) throw new Error("Employee not found");
	if (user.role !== "super_admin" && employee.userId !== user.id) throw new Error("You do not have access to this employee's history");
	const canViewConfidential = user.role !== "employee";
	return (await db.select().from(employmentHistory).where(eq(employmentHistory.employeeId, data.employeeId)).orderBy(desc(employmentHistory.joiningDate))).map((row) => ({
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
		verificationStatus: row.verificationStatus,
		createdAt: row.createdAt.toISOString(),
		updatedAt: row.updatedAt.toISOString()
	}));
});
//#endregion
export { addEmploymentHistory_createServerFn_handler, createEmployee_createServerFn_handler, deleteEmployee_createServerFn_handler, getEmployeeById_createServerFn_handler, getEmployeeByUserId_createServerFn_handler, getEmployeeInviteLink_createServerFn_handler, getEmploymentHistory_createServerFn_handler, listEmployees_createServerFn_handler, updateEmployee_createServerFn_handler, verifyEmploymentHistory_createServerFn_handler };
