import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { a as numberType, c as stringType, o as objectType, r as enumType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { a as count, c as eq, l as ilike, o as desc, p as or, s as and } from "../_libs/drizzle-orm+postgres.mjs";
import { h as verificationRequests, l as notifications, m as users, n as auditLogs, o as employees, r as companies, u as performanceReviews } from "./schema-BhmjnuI8.mjs";
import { getDb } from "./index.server-ir69dnPx.mjs";
import { i as requireVerifiedCompany, n as requireAuth, r as requireRole } from "./session.server-CB7XLiCS.mjs";
import { getVerificationRequestHtml, sendEmail } from "./email.server-Czmx-_mw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verification.functions-gybopj_e.js
var createVerificationRequest_createServerFn_handler = createServerRpc({
	id: "f052ac7231c1cd1a1360a30eea084e4b0e61ec0023272fcd668e90fc2412a2f4",
	name: "createVerificationRequest",
	filename: "src/lib/api/verification.functions.ts"
}, (opts) => createVerificationRequest.__executeServer(opts));
var createVerificationRequest = createServerFn({ method: "POST" }).validator(objectType({
	employeeId: stringType().uuid("Invalid employee ID"),
	requestType: stringType().min(1, "Request type is required")
})).handler(createVerificationRequest_createServerFn_handler, async ({ data }) => {
	const user = await requireRole([
		"super_admin",
		"company_admin",
		"hr"
	]);
	await requireVerifiedCompany(user);
	const db = getDb();
	const [employee] = await db.select().from(employees).where(eq(employees.id, data.employeeId)).limit(1);
	if (!employee) throw new Error("Employee not found");
	if (user.role !== "super_admin" && user.companyId) {
		const [company] = await db.select({ status: companies.status }).from(companies).where(eq(companies.id, user.companyId)).limit(1);
		if (!company || company.status !== "verified") throw new Error("Only verified companies can send verification requests");
	}
	let companyName = "System Admin";
	if (user.companyId) {
		const [comp] = await db.select({ name: companies.name }).from(companies).where(eq(companies.id, user.companyId)).limit(1);
		if (comp) companyName = comp.name;
	}
	const [request] = await db.insert(verificationRequests).values({
		requestedById: user.id,
		employeeId: data.employeeId,
		status: "pending",
		requestType: data.requestType
	}).returning();
	if (employee.userId) await db.insert(notifications).values({
		userId: employee.userId,
		title: "New Verification Request",
		message: `Company "${companyName}" has requested to verify your credentials.`
	});
	try {
		const emailHtml = getVerificationRequestHtml({
			employeeName: employee.fullName,
			companyName,
			requestType: data.requestType
		});
		await sendEmail({
			to: employee.email,
			subject: "New Verification Request on WorkCred",
			html: emailHtml
		});
	} catch (emailErr) {
		console.error("Failed to send verification request email:", emailErr);
	}
	await db.insert(auditLogs).values({
		userId: user.id,
		action: `Created verification request for employee: ${employee.fullName}`,
		targetType: "verification_request",
		targetId: request.id,
		type: "verification_request"
	});
	return request;
});
var listVerificationRequests_createServerFn_handler = createServerRpc({
	id: "5f2e96323fe4cfe07b8a2538d202b0ea12990f549fa473169d574e6d07a90ba0",
	name: "listVerificationRequests",
	filename: "src/lib/api/verification.functions.ts"
}, (opts) => listVerificationRequests.__executeServer(opts));
var listVerificationRequests = createServerFn({ method: "GET" }).validator(objectType({
	page: numberType().int().positive().optional().default(1),
	pageSize: numberType().int().positive().optional().default(20)
})).handler(listVerificationRequests_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	await requireVerifiedCompany(user);
	const db = getDb();
	const page = data.page ?? 1;
	const pageSize = data.pageSize ?? 20;
	const offset = (page - 1) * pageSize;
	const conditions = [];
	if (user.role !== "super_admin") {
		const [emp] = await db.select({ id: employees.id }).from(employees).where(eq(employees.userId, user.id)).limit(1);
		const empId = emp ? emp.id : "";
		conditions.push(or(eq(verificationRequests.requestedById, user.id), eq(verificationRequests.employeeId, empId)));
	}
	const whereClause = conditions.length > 0 ? and(...conditions) : void 0;
	const [totalResult] = await db.select({ total: count() }).from(verificationRequests).where(whereClause);
	const total = totalResult?.total ?? 0;
	return {
		data: (await db.select({
			id: verificationRequests.id,
			requestedById: verificationRequests.requestedById,
			requestedByName: users.fullName,
			requestedByCompany: companies.name,
			employeeId: verificationRequests.employeeId,
			employeeName: employees.fullName,
			status: verificationRequests.status,
			requestType: verificationRequests.requestType,
			responseData: verificationRequests.responseData,
			createdAt: verificationRequests.createdAt,
			resolvedAt: verificationRequests.resolvedAt
		}).from(verificationRequests).leftJoin(users, eq(verificationRequests.requestedById, users.id)).leftJoin(companies, eq(users.companyId, companies.id)).leftJoin(employees, eq(verificationRequests.employeeId, employees.id)).where(whereClause).orderBy(desc(verificationRequests.createdAt)).limit(pageSize).offset(offset)).map((row) => ({
			id: row.id,
			requestedById: row.requestedById,
			requestedByName: row.requestedByName ?? "Unknown",
			requestedByCompany: row.requestedByCompany ?? "Platform",
			employeeId: row.employeeId,
			employeeName: row.employeeName ?? "Unknown",
			status: row.status,
			requestType: row.requestType,
			responseData: row.responseData,
			createdAt: row.createdAt.toISOString(),
			resolvedAt: row.resolvedAt ? row.resolvedAt.toISOString() : null
		})),
		total,
		page,
		pageSize,
		totalPages: Math.ceil(total / pageSize)
	};
});
var resolveVerificationRequest_createServerFn_handler = createServerRpc({
	id: "6f54955d4b84892375ee87d05af6e4f5cec177113811bbeaec1eec62cf802304",
	name: "resolveVerificationRequest",
	filename: "src/lib/api/verification.functions.ts"
}, (opts) => resolveVerificationRequest.__executeServer(opts));
var resolveVerificationRequest = createServerFn({ method: "POST" }).validator(objectType({
	id: stringType().uuid("Invalid request ID"),
	status: enumType(["approved", "denied"])
})).handler(resolveVerificationRequest_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	const db = getDb();
	const [request] = await db.select().from(verificationRequests).where(eq(verificationRequests.id, data.id)).limit(1);
	if (!request) throw new Error("Verification request not found");
	if (request.status !== "pending") throw new Error("Verification request has already been resolved");
	const [employee] = await db.select().from(employees).where(eq(employees.id, request.employeeId)).limit(1);
	if (!employee) throw new Error("Employee not found for this request");
	if (user.role !== "super_admin" && employee.userId !== user.id) throw new Error("You are not authorized to resolve this verification request");
	let responseData = null;
	if (data.status === "approved") {
		const reviews = await db.select().from(performanceReviews).where(eq(performanceReviews.employeeId, employee.id)).orderBy(desc(performanceReviews.createdAt));
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
			reviews: reviews.map((r) => ({
				period: r.period,
				overall: Number(r.overall),
				feedback: r.feedback
			}))
		};
	}
	const [updated] = await db.update(verificationRequests).set({
		status: data.status,
		resolvedAt: /* @__PURE__ */ new Date(),
		responseData
	}).where(eq(verificationRequests.id, data.id)).returning();
	if (request.requestedById) await db.insert(notifications).values({
		userId: request.requestedById,
		title: `Verification Request ${data.status === "approved" ? "Approved" : "Rejected"}`,
		message: `Employee "${employee.fullName}" has ${data.status} your verification request.`
	});
	await db.insert(auditLogs).values({
		userId: user.id,
		action: `Resolved verification request ${data.id} as ${data.status}`,
		targetType: "verification_request",
		targetId: data.id,
		type: "consent_change"
	});
	return updated;
});
var getVerificationResult_createServerFn_handler = createServerRpc({
	id: "be342b2a65dba7644bcb4d9364ec37e61c446c3a50b689379575c5aae33277af",
	name: "getVerificationResult",
	filename: "src/lib/api/verification.functions.ts"
}, (opts) => getVerificationResult.__executeServer(opts));
var getVerificationResult = createServerFn({ method: "GET" }).validator(objectType({ id: stringType().uuid("Invalid request ID") })).handler(getVerificationResult_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	await requireVerifiedCompany(user);
	const db = getDb();
	const rows = await db.select({
		id: verificationRequests.id,
		requestedById: verificationRequests.requestedById,
		requestedByName: users.fullName,
		requestedByCompany: companies.name,
		employeeId: verificationRequests.employeeId,
		employeeName: employees.fullName,
		status: verificationRequests.status,
		requestType: verificationRequests.requestType,
		responseData: verificationRequests.responseData,
		createdAt: verificationRequests.createdAt,
		resolvedAt: verificationRequests.resolvedAt
	}).from(verificationRequests).leftJoin(users, eq(verificationRequests.requestedById, users.id)).leftJoin(companies, eq(users.companyId, companies.id)).leftJoin(employees, eq(verificationRequests.employeeId, employees.id)).where(eq(verificationRequests.id, data.id)).limit(1);
	if (rows.length === 0) throw new Error("Verification request not found");
	const row = rows[0];
	const [employee] = await db.select({ userId: employees.userId }).from(employees).where(eq(employees.id, row.employeeId)).limit(1);
	if (user.role !== "super_admin" && row.requestedById !== user.id && employee?.userId !== user.id) throw new Error("You do not have access to this verification request");
	return {
		id: row.id,
		requestedById: row.requestedById,
		requestedByName: row.requestedByName ?? "Unknown",
		requestedByCompany: row.requestedByCompany ?? "Platform",
		employeeId: row.employeeId,
		employeeName: row.employeeName ?? "Unknown",
		status: row.status,
		requestType: row.requestType,
		responseData: row.responseData,
		createdAt: row.createdAt.toISOString(),
		resolvedAt: row.resolvedAt ? row.resolvedAt.toISOString() : null
	};
});
var searchEmployeesGlobal_createServerFn_handler = createServerRpc({
	id: "2d06160c143ef287b70d7231123f1cc4cddac51bf6c3ed95316495bc1bc5bfe2",
	name: "searchEmployeesGlobal",
	filename: "src/lib/api/verification.functions.ts"
}, (opts) => searchEmployeesGlobal.__executeServer(opts));
var searchEmployeesGlobal = createServerFn({ method: "GET" }).validator(objectType({ query: stringType().min(1, "Search query is required").max(100) })).handler(searchEmployeesGlobal_createServerFn_handler, async ({ data }) => {
	const user = await requireRole([
		"super_admin",
		"company_admin",
		"hr"
	]);
	await requireVerifiedCompany(user);
	const db = getDb();
	const searchPattern = `%${data.query.trim()}%`;
	const conditions = [or(eq(companies.status, "verified"), eq(companies.status, "approved")), or(ilike(employees.fullName, searchPattern), ilike(employees.email, searchPattern), ilike(employees.employeeId, searchPattern), ilike(employees.designation, searchPattern))];
	if (user.role !== "super_admin") conditions.push(eq(employees.userId, user.id));
	return (await db.select({
		id: employees.id,
		employeeId: employees.employeeId,
		fullName: employees.fullName,
		email: employees.email,
		designation: employees.designation,
		department: employees.department,
		photoUrl: employees.photoUrl,
		verified: employees.verified,
		companyId: employees.companyId,
		companyName: companies.name,
		companyStatus: companies.status
	}).from(employees).leftJoin(companies, eq(employees.companyId, companies.id)).where(and(...conditions)).limit(15).orderBy(employees.fullName)).map((r) => ({
		id: r.id,
		employeeId: r.employeeId,
		fullName: r.fullName,
		email: r.email,
		designation: r.designation ?? "",
		department: r.department ?? "",
		photoUrl: r.photoUrl,
		verified: r.verified,
		companyId: r.companyId,
		companyName: r.companyName ?? "Independent Professional"
	}));
});
//#endregion
export { createVerificationRequest_createServerFn_handler, getVerificationResult_createServerFn_handler, listVerificationRequests_createServerFn_handler, resolveVerificationRequest_createServerFn_handler, searchEmployeesGlobal_createServerFn_handler };
