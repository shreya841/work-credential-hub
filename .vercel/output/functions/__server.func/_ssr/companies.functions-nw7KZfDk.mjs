import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { a as numberType, c as stringType, i as literalType, n as booleanType, o as objectType, r as enumType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { a as count, c as eq, l as ilike, o as desc, s as and, u as inArray, w as sql } from "../_libs/drizzle-orm+postgres.mjs";
import { h as verificationRequests, m as users, n as auditLogs, o as employees, r as companies, s as employmentHistory, u as performanceReviews } from "./schema-BhmjnuI8.mjs";
import { getDb } from "./index.server-ir69dnPx.mjs";
import { i as requireVerifiedCompany, n as requireAuth, r as requireRole } from "./session.server-CB7XLiCS.mjs";
import { getCompanyApprovalHtml, getCompanyRejectionHtml, sendEmail } from "./email.server-Czmx-_mw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/companies.functions-nw7KZfDk.js
var listCompanies_createServerFn_handler = createServerRpc({
	id: "982fd993fe717d5b7d457d00f37e814477af9b9a12c447095049dc428d4d8f38",
	name: "listCompanies",
	filename: "src/lib/api/companies.functions.ts"
}, (opts) => listCompanies.__executeServer(opts));
var listCompanies = createServerFn({ method: "GET" }).validator(objectType({
	page: numberType().int().positive().optional().default(1),
	pageSize: numberType().int().positive().max(100).optional().default(20),
	search: stringType().optional()
})).handler(listCompanies_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	const db = getDb();
	const page = data.page ?? 1;
	const pageSize = data.pageSize ?? 20;
	const offset = (page - 1) * pageSize;
	const conditions = [];
	if (user.role !== "super_admin" && user.companyId) conditions.push(eq(companies.id, user.companyId));
	if (data.search) conditions.push(ilike(companies.name, `%${data.search}%`));
	const whereClause = conditions.length > 0 ? and(...conditions) : void 0;
	const [totalResult] = await db.select({ total: count() }).from(companies).where(whereClause);
	const total = totalResult?.total ?? 0;
	return {
		data: (await db.select({
			id: companies.id,
			name: companies.name,
			industry: companies.industry,
			size: companies.size,
			location: companies.location,
			website: companies.website,
			logoUrl: companies.logoUrl,
			verified: companies.verified,
			status: companies.status,
			createdAt: companies.createdAt,
			updatedAt: companies.updatedAt,
			creatorName: users.fullName,
			creatorEmail: users.email,
			employeeCount: sql`(SELECT COUNT(*)::int FROM ${employees} WHERE ${employees.companyId} = ${companies.id})`.as("employee_count")
		}).from(companies).leftJoin(users, eq(companies.createdById, users.id)).where(whereClause).orderBy(desc(companies.createdAt)).limit(pageSize).offset(offset)).map((row) => ({
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
			createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : String(row.createdAt),
			updatedAt: row.updatedAt instanceof Date ? row.updatedAt.toISOString() : String(row.updatedAt)
		})),
		total,
		page,
		pageSize,
		totalPages: Math.ceil(total / pageSize)
	};
});
var createCompany_createServerFn_handler = createServerRpc({
	id: "de04640b39f548be7e7fd6a625b46831eaffc97b489c7c61923c0ef5c8482486",
	name: "createCompany",
	filename: "src/lib/api/companies.functions.ts"
}, (opts) => createCompany.__executeServer(opts));
var createCompany = createServerFn({ method: "POST" }).validator(objectType({
	name: stringType().min(1, "Company name is required"),
	industry: stringType().min(1, "Industry is required"),
	size: stringType().min(1, "Company size is required"),
	location: stringType().min(1, "Location is required"),
	website: stringType().url("Invalid website URL").or(literalType(""))
})).handler(createCompany_createServerFn_handler, async ({ data }) => {
	const user = await requireRole(["super_admin"]);
	const db = getDb();
	const [company] = await db.insert(companies).values({
		name: data.name,
		industry: data.industry,
		size: data.size,
		location: data.location,
		website: data.website
	}).returning();
	await db.insert(auditLogs).values({
		userId: user.id,
		action: `Created company: ${data.name}`,
		targetType: "company",
		targetId: company.id,
		type: "create"
	});
	return company;
});
var updateCompany_createServerFn_handler = createServerRpc({
	id: "6c70a5bc04e38a0c8f0592dcabd121ff4af6ee6353dd530af1a89e308e0a45a6",
	name: "updateCompany",
	filename: "src/lib/api/companies.functions.ts"
}, (opts) => updateCompany.__executeServer(opts));
var updateCompany = createServerFn({ method: "POST" }).validator(objectType({
	id: stringType().uuid("Invalid company ID"),
	name: stringType().min(1).optional(),
	industry: stringType().min(1).optional(),
	size: stringType().min(1).optional(),
	location: stringType().optional(),
	website: stringType().url().or(literalType("")).optional(),
	verified: booleanType().optional(),
	status: enumType([
		"pending",
		"approved",
		"rejected",
		"suspended",
		"archived",
		"deleted"
	]).optional()
})).handler(updateCompany_createServerFn_handler, async ({ data }) => {
	const user = await requireRole(["super_admin", "company_admin"]);
	await requireVerifiedCompany(user);
	const db = getDb();
	if (user.role === "company_admin" && user.companyId !== data.id) throw new Error("You can only update your own company");
	if (data.verified !== void 0 && user.role !== "super_admin") throw new Error("Only super administrators can verify or change company status");
	const { id, ...updateFields } = data;
	const updates = {};
	for (const [key, value] of Object.entries(updateFields)) if (value !== void 0) updates[key] = value;
	if (Object.keys(updates).length === 0) throw new Error("No fields to update");
	updates.updatedAt = /* @__PURE__ */ new Date();
	const [currentCompany] = await db.select({
		status: companies.status,
		name: companies.name
	}).from(companies).where(eq(companies.id, id)).limit(1);
	if (currentCompany) console.log(`[updateCompany] Before update - Company: "${currentCompany.name}" (ID: ${id}) current status is: "${currentCompany.status}"`);
	const [updated] = await db.update(companies).set(updates).where(eq(companies.id, id)).returning();
	if (!updated) throw new Error("Company not found");
	console.log(`[updateCompany] After update - Company: "${updated.name}" (ID: ${id}) new status is: "${updated.status}"`);
	await db.insert(auditLogs).values({
		userId: user.id,
		action: `Updated company: ${updated.name}`,
		targetType: "company",
		targetId: id,
		type: "update",
		metadata: { updatedFields: Object.keys(updates) }
	});
	if (currentCompany && updated.status !== currentCompany.status) {
		if (updated.createdById && (updated.status === "approved" || updated.status === "rejected")) try {
			const [creator] = await db.select({
				email: users.email,
				fullName: users.fullName
			}).from(users).where(eq(users.id, updated.createdById)).limit(1);
			if (creator && creator.email) {
				if (updated.status === "approved") {
					const emailHtml = getCompanyApprovalHtml({
						creatorName: creator.fullName,
						companyName: updated.name
					});
					await sendEmail({
						to: creator.email,
						subject: `Your Company Has Been Approved on WorkCred`,
						html: emailHtml
					});
				} else if (updated.status === "rejected") {
					const emailHtml = getCompanyRejectionHtml({
						creatorName: creator.fullName,
						companyName: updated.name
					});
					await sendEmail({
						to: creator.email,
						subject: `Your Company Registration Request - WorkCred`,
						html: emailHtml
					});
				}
			}
		} catch (emailErr) {
			console.error("Failed to send company verification outcome email:", emailErr);
		}
	}
	return updated;
});
var getCompanyById_createServerFn_handler = createServerRpc({
	id: "49bae503bc1b4ee9e4673084cf895265b750d3c6114b717f2f42e82ba1d9c08e",
	name: "getCompanyById",
	filename: "src/lib/api/companies.functions.ts"
}, (opts) => getCompanyById.__executeServer(opts));
var getCompanyById = createServerFn({ method: "GET" }).validator(objectType({ id: stringType().uuid("Invalid company ID") })).handler(getCompanyById_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	const db = getDb();
	if (user.role !== "super_admin" && user.companyId !== data.id) throw new Error("You do not have access to this company");
	const [company] = await db.select().from(companies).where(eq(companies.id, data.id)).limit(1);
	if (!company) throw new Error("Company not found");
	const [empCount] = await db.select({ total: count() }).from(employees).where(eq(employees.companyId, data.id));
	return {
		...company,
		employeeCount: empCount?.total ?? 0,
		createdAt: company.createdAt instanceof Date ? company.createdAt.toISOString() : String(company.createdAt),
		updatedAt: company.updatedAt instanceof Date ? company.updatedAt.toISOString() : String(company.updatedAt)
	};
});
var getCompanyDeleteImpact_createServerFn_handler = createServerRpc({
	id: "a185dd6f845fc97894ecd1a2db9279980032551b5509f24ef27af79de23e78c9",
	name: "getCompanyDeleteImpact",
	filename: "src/lib/api/companies.functions.ts"
}, (opts) => getCompanyDeleteImpact.__executeServer(opts));
var getCompanyDeleteImpact = createServerFn({ method: "GET" }).validator(objectType({ id: stringType().uuid("Invalid company ID") })).handler(getCompanyDeleteImpact_createServerFn_handler, async ({ data }) => {
	await requireRole(["super_admin"]);
	const db = getDb();
	const [company] = await db.select({ name: companies.name }).from(companies).where(eq(companies.id, data.id)).limit(1);
	if (!company) throw new Error("Company not found");
	const [hrCountRes] = await db.select({ total: count() }).from(users).where(eq(users.companyId, data.id));
	const [employeeCountRes] = await db.select({ total: count() }).from(employees).where(eq(employees.companyId, data.id));
	let reviewCount = 0;
	let requestCount = 0;
	const empIds = (await db.select({ id: employees.id }).from(employees).where(eq(employees.companyId, data.id))).map((e) => e.id);
	if (empIds.length > 0) {
		const [reviewCountRes] = await db.select({ total: count() }).from(performanceReviews).where(inArray(performanceReviews.employeeId, empIds));
		reviewCount = reviewCountRes?.total ?? 0;
		const [requestCountRes] = await db.select({ total: count() }).from(verificationRequests).where(inArray(verificationRequests.employeeId, empIds));
		requestCount = requestCountRes?.total ?? 0;
	}
	return {
		companyName: company.name,
		hrCount: hrCountRes?.total ?? 0,
		employeeCount: employeeCountRes?.total ?? 0,
		reviewCount,
		requestCount
	};
});
var deleteCompany_createServerFn_handler = createServerRpc({
	id: "d802b857d1baab04820b35485eaca1b8836df7796c00d2c211a5fe8377689429",
	name: "deleteCompany",
	filename: "src/lib/api/companies.functions.ts"
}, (opts) => deleteCompany.__executeServer(opts));
var deleteCompany = createServerFn({ method: "POST" }).validator(objectType({ id: stringType().uuid("Invalid company ID") })).handler(deleteCompany_createServerFn_handler, async ({ data }) => {
	const user = await requireRole(["super_admin"]);
	const db = getDb();
	const [company] = await db.select().from(companies).where(eq(companies.id, data.id)).limit(1);
	if (!company) throw new Error("Company not found");
	const now = /* @__PURE__ */ new Date();
	await db.transaction(async (tx) => {
		await tx.update(companies).set({
			status: "deleted",
			verified: false,
			updatedAt: now
		}).where(eq(companies.id, data.id));
		const companyEmployees = await tx.select().from(employees).where(eq(employees.companyId, data.id));
		for (const emp of companyEmployees) {
			await tx.insert(employmentHistory).values({
				employeeId: emp.id,
				companyId: data.id,
				companyName: `${company.name} (Deleted Company)`,
				designation: emp.designation || "Employee",
				department: emp.department,
				joiningDate: emp.joiningDate,
				exitDate: now,
				experience: emp.experience,
				verificationStatus: "verified"
			});
			await tx.update(employees).set({
				companyId: null,
				verified: false,
				updatedAt: now
			}).where(eq(employees.id, emp.id));
		}
		await tx.update(users).set({
			companyId: null,
			updatedAt: now
		}).where(eq(users.companyId, data.id));
		await tx.insert(auditLogs).values({
			userId: user.id,
			action: `Deleted company: ${company.name} (Soft Delete - Employees Archived)`,
			targetType: "company",
			targetId: data.id,
			type: "delete"
		});
	});
	return {
		success: true,
		company
	};
});
//#endregion
export { createCompany_createServerFn_handler, deleteCompany_createServerFn_handler, getCompanyById_createServerFn_handler, getCompanyDeleteImpact_createServerFn_handler, listCompanies_createServerFn_handler, updateCompany_createServerFn_handler };
