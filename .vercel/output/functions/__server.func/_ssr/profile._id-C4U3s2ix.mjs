import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { c as stringType, o as objectType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { c as eq, o as desc, s as and } from "../_libs/drizzle-orm+postgres.mjs";
import { a as consentSettings, i as consentGrants, o as employees, r as companies, u as performanceReviews } from "./schema-BhmjnuI8.mjs";
import { getDb } from "./index.server-ir69dnPx.mjs";
import { t as getSession } from "./session.server-CB7XLiCS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile._id-C4U3s2ix.js
var fetchPublicProfile_createServerFn_handler = createServerRpc({
	id: "5f1330871839ac8ebe579c30af805b841a9848d5232310cd2289a74286ac8342",
	name: "fetchPublicProfile",
	filename: "src/routes/profile.$id.tsx"
}, (opts) => fetchPublicProfile.__executeServer(opts));
var fetchPublicProfile = createServerFn({ method: "GET" }).validator(objectType({ id: stringType().uuid() })).handler(fetchPublicProfile_createServerFn_handler, async ({ data }) => {
	const db = getDb();
	const session = await getSession();
	const rows = await db.select({
		employee: employees,
		company: companies
	}).from(employees).leftJoin(companies, eq(employees.companyId, companies.id)).where(eq(employees.id, data.id)).limit(1);
	if (rows.length === 0) return null;
	const { employee: emp, company } = rows[0];
	let authorized = false;
	if (session) {
		if (session.role === "super_admin" || session.role === "company_admin" || session.role === "hr") authorized = true;
		else if (emp.userId === session.id) authorized = true;
		else if (session.companyId && emp.companyId === session.companyId) authorized = true;
	}
	if (!authorized && session && session.companyId) {
		const [comp] = await db.select({ status: companies.status }).from(companies).where(eq(companies.id, session.companyId)).limit(1);
		if (comp && comp.status === "verified") {
			const [consent] = await db.select().from(consentSettings).where(and(eq(consentSettings.employeeId, emp.id), eq(consentSettings.publicVisible, true))).limit(1);
			if (consent) authorized = true;
			if (!authorized) {
				const [grant] = await db.select().from(consentGrants).where(and(eq(consentGrants.employeeId, emp.id), eq(consentGrants.companyId, session.companyId), eq(consentGrants.granted, true))).limit(1);
				if (grant) authorized = true;
			}
		}
	}
	if (!authorized) return {
		isPrivate: true,
		employee: {
			fullName: emp.fullName,
			photoUrl: emp.photoUrl
		}
	};
	return {
		isPrivate: false,
		employee: {
			id: emp.id,
			employeeId: emp.employeeId,
			fullName: emp.fullName,
			email: emp.email,
			phone: emp.phone,
			designation: emp.designation,
			department: emp.department,
			skills: emp.skills ?? [],
			joiningDate: emp.joiningDate.toISOString(),
			exitDate: emp.exitDate ? emp.exitDate.toISOString() : null,
			experience: emp.experience,
			status: emp.status,
			photoUrl: emp.photoUrl,
			verified: emp.verified,
			rating: Number(emp.rating),
			company: company ? {
				name: company.name,
				location: company.location,
				logoUrl: company.logoUrl
			} : null
		}
	};
});
var fetchPublicReviews_createServerFn_handler = createServerRpc({
	id: "5da27b2b2b751179c614c18019cbee8b5193f3ec2cc56cb935d9d83cd96ba427",
	name: "fetchPublicReviews",
	filename: "src/routes/profile.$id.tsx"
}, (opts) => fetchPublicReviews.__executeServer(opts));
var fetchPublicReviews = createServerFn({ method: "GET" }).validator(objectType({ employeeId: stringType().uuid() })).handler(fetchPublicReviews_createServerFn_handler, async ({ data }) => {
	return (await getDb().select({
		id: performanceReviews.id,
		period: performanceReviews.period,
		overall: performanceReviews.overall,
		feedback: performanceReviews.feedback,
		createdAt: performanceReviews.createdAt
	}).from(performanceReviews).where(eq(performanceReviews.employeeId, data.employeeId)).orderBy(desc(performanceReviews.createdAt)).limit(5)).map((r) => ({
		id: r.id,
		period: r.period,
		overall: Number(r.overall),
		feedback: r.feedback,
		createdAt: r.createdAt.toISOString()
	}));
});
//#endregion
export { fetchPublicProfile_createServerFn_handler, fetchPublicReviews_createServerFn_handler };
