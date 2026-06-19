import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { c as stringType, o as objectType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { c as eq, l as ilike, p as or, s as and, w as sql } from "../_libs/drizzle-orm+postgres.mjs";
import { n as auditLogs, o as employees, r as companies } from "./schema-BhmjnuI8.mjs";
import { getDb } from "./index.server-ir69dnPx.mjs";
import { i as requireVerifiedCompany, n as requireAuth } from "./session.server-CB7XLiCS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search.functions-CfdU0CYL.js
var searchEmployees_createServerFn_handler = createServerRpc({
	id: "dca39a83d994db6d76f1c1be4ee749d7805df76d76072425abb1f563fa26be59",
	name: "searchEmployees",
	filename: "src/lib/api/search.functions.ts"
}, (opts) => searchEmployees.__executeServer(opts));
var searchEmployees = createServerFn({ method: "POST" }).validator(objectType({ query: stringType().min(1, "Search query is required") })).handler(searchEmployees_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	await requireVerifiedCompany(user);
	const db = getDb();
	if (user.role !== "super_admin" && user.companyId) {
		const [company] = await db.select({ status: companies.status }).from(companies).where(eq(companies.id, user.companyId)).limit(1);
		if (!company || company.status !== "verified") throw new Error("Only verified companies can search employees");
	}
	const searchPattern = `%${data.query}%`;
	const conditions = [or(ilike(employees.fullName, searchPattern), ilike(employees.email, searchPattern), ilike(employees.employeeId, searchPattern), sql`${employees.skills}::text ILIKE ${searchPattern}`)];
	if (user.role !== "super_admin") conditions.push(eq(employees.userId, user.id));
	const rows = await db.select().from(employees).where(and(...conditions)).limit(50);
	await db.insert(auditLogs).values({
		userId: user.id,
		action: `Searched employees with query: "${data.query}"`,
		targetType: "employee",
		targetId: "",
		type: "access",
		metadata: {
			query: data.query,
			resultsCount: rows.length
		}
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
		status: row.status,
		photoUrl: row.photoUrl,
		resumeUrl: row.resumeUrl,
		verified: row.verified,
		rating: Number(row.rating),
		createdAt: row.createdAt.toISOString(),
		updatedAt: row.updatedAt.toISOString()
	}));
});
//#endregion
export { searchEmployees_createServerFn_handler };
