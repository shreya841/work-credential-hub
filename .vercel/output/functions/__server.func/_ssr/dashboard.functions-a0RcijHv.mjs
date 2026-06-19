import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { c as stringType, o as objectType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { a as count, c as eq, o as desc, w as sql } from "../_libs/drizzle-orm+postgres.mjs";
import { h as verificationRequests, m as users, n as auditLogs, o as employees, r as companies, u as performanceReviews } from "./schema-BhmjnuI8.mjs";
import { getDb } from "./index.server-ir69dnPx.mjs";
import { i as requireVerifiedCompany, n as requireAuth } from "./session.server-CB7XLiCS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.functions-a0RcijHv.js
async function fetchDashboardStats(db, user) {
	if (user.role === "employee") {
		const [empRow] = await db.select().from(employees).where(eq(employees.userId, user.id)).limit(1);
		if (!empRow) return {
			totalEmployees: 0,
			activeEmployees: 0,
			totalReviews: 0,
			verifiedEmployees: 0
		};
		const [reviewCount] = await db.select({ total: count() }).from(performanceReviews).where(eq(performanceReviews.employeeId, empRow.id));
		return {
			totalEmployees: 1,
			activeEmployees: empRow.status === "active" ? 1 : 0,
			totalReviews: reviewCount?.total ?? 0,
			verifiedEmployees: empRow.verified ? 1 : 0
		};
	}
	const companyCondition = user.role !== "super_admin" && user.companyId ? eq(employees.companyId, user.companyId) : void 0;
	const empPromise = db.select({
		total: count(),
		active: sql`count(*) filter (where ${employees.status} = 'active')::int`,
		verified: sql`count(*) filter (where ${employees.verified} = true)::int`
	}).from(employees).where(companyCondition);
	const reviewPromise = companyCondition ? db.select({ total: count() }).from(performanceReviews).innerJoin(employees, eq(performanceReviews.employeeId, employees.id)).where(companyCondition) : db.select({ total: count() }).from(performanceReviews);
	const [[empResult], [reviewResult]] = await Promise.all([empPromise, reviewPromise]);
	return {
		totalEmployees: empResult?.total ?? 0,
		activeEmployees: empResult?.active ?? 0,
		totalReviews: reviewResult?.total ?? 0,
		verifiedEmployees: empResult?.verified ?? 0
	};
}
async function fetchHiringTrend(db, user) {
	const sixMonthsAgo = /* @__PURE__ */ new Date();
	sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
	const companyFilter = user.role === "employee" ? sql`AND ${employees.userId} = ${user.id}` : user.role !== "super_admin" && user.companyId ? sql`AND ${employees.companyId} = ${user.companyId}` : sql``;
	const hiresPromise = db.execute(sql`
    SELECT
      TO_CHAR(${employees.joiningDate}, 'YYYY-MM') AS month,
      COUNT(*)::int AS hires
    FROM ${employees}
    WHERE ${employees.joiningDate} >= ${sixMonthsAgo.toISOString()}
    ${companyFilter}
    GROUP BY TO_CHAR(${employees.joiningDate}, 'YYYY-MM')
    ORDER BY month ASC
  `);
	const exitsPromise = db.execute(sql`
    SELECT
      TO_CHAR(${employees.exitDate}, 'YYYY-MM') AS month,
      COUNT(*)::int AS exits
    FROM ${employees}
    WHERE ${employees.exitDate} IS NOT NULL
      AND ${employees.exitDate} >= ${sixMonthsAgo.toISOString()}
    ${companyFilter}
    GROUP BY TO_CHAR(${employees.exitDate}, 'YYYY-MM')
    ORDER BY month ASC
  `);
	const [hires, exits] = await Promise.all([hiresPromise, exitsPromise]);
	const hiresMap = /* @__PURE__ */ new Map();
	const exitsMap = /* @__PURE__ */ new Map();
	for (const row of hires) hiresMap.set(row.month, row.hires);
	for (const row of exits) exitsMap.set(row.month, row.exits);
	const result = [];
	for (let i = 5; i >= 0; i--) {
		const d = /* @__PURE__ */ new Date();
		d.setMonth(d.getMonth() - i);
		const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
		result.push({
			month: key,
			hires: hiresMap.get(key) ?? 0,
			exits: exitsMap.get(key) ?? 0
		});
	}
	return result;
}
async function fetchRatingDistribution(db, user) {
	const companyFilter = user.role === "employee" ? sql`AND ${employees.userId} = ${user.id}` : user.role !== "super_admin" && user.companyId ? sql`AND ${employees.companyId} = ${user.companyId}` : sql``;
	const rows = await db.execute(sql`
    SELECT
      ROUND(${performanceReviews.overall})::int AS rating_bucket,
      COUNT(*)::int AS review_count
    FROM ${performanceReviews}
    INNER JOIN ${employees}
      ON ${performanceReviews.employeeId} = ${employees.id}
    WHERE ${performanceReviews.overall} > 0
    ${companyFilter}
    GROUP BY ROUND(${performanceReviews.overall})::int
    ORDER BY rating_bucket ASC
  `);
	const countMap = /* @__PURE__ */ new Map();
	for (const row of rows) countMap.set(row.rating_bucket, row.review_count);
	const result = [];
	for (let i = 1; i <= 5; i++) result.push({
		rating: `${i} Star${i > 1 ? "s" : ""}`,
		count: countMap.get(i) ?? 0
	});
	return result;
}
async function fetchDepartmentAnalytics(db, user) {
	const companyFilter = user.role === "employee" ? sql`WHERE ${employees.userId} = ${user.id}` : user.role !== "super_admin" && user.companyId ? sql`WHERE ${employees.companyId} = ${user.companyId}` : sql``;
	return (await db.execute(sql`
    SELECT
      COALESCE(NULLIF(TRIM(${employees.department}), ''), 'Unassigned') AS department,
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE ${employees.verified} = true)::int AS verified
    FROM ${employees}
    ${companyFilter}
    GROUP BY COALESCE(NULLIF(TRIM(${employees.department}), ''), 'Unassigned')
    ORDER BY total DESC, department ASC
    LIMIT 8
  `)).map((row) => ({
		department: row.department,
		total: Number(row.total),
		verified: Number(row.verified)
	}));
}
async function fetchVerificationStatistics(db, user) {
	let companyFilter = sql``;
	if (user.role !== "super_admin") {
		const [emp] = await db.select({ id: employees.id }).from(employees).where(eq(employees.userId, user.id)).limit(1);
		if (emp) companyFilter = sql`WHERE ${verificationRequests.requestedById} = ${user.id} OR ${verificationRequests.employeeId} = ${emp.id}`;
		else companyFilter = sql`WHERE ${verificationRequests.requestedById} = ${user.id}`;
	}
	const rows = await db.execute(sql`
    SELECT
      ${verificationRequests.status} AS status,
      COUNT(*)::int AS count
    FROM ${verificationRequests}
    LEFT JOIN ${users}
      ON ${verificationRequests.requestedById} = ${users.id}
    ${companyFilter}
    GROUP BY ${verificationRequests.status}
  `);
	const countMap = /* @__PURE__ */ new Map();
	for (const row of rows) countMap.set(row.status, Number(row.count));
	return [
		"pending",
		"approved",
		"denied"
	].map((status) => ({
		status,
		count: countMap.get(status) ?? 0
	}));
}
async function fetchRecentEmployees(db, user) {
	const companyCondition = user.role !== "super_admin" ? eq(employees.userId, user.id) : void 0;
	return (await db.select({
		id: employees.id,
		employeeId: employees.employeeId,
		fullName: employees.fullName,
		email: employees.email,
		designation: employees.designation,
		department: employees.department,
		status: employees.status,
		photoUrl: employees.photoUrl,
		verified: employees.verified,
		rating: employees.rating,
		createdAt: employees.createdAt
	}).from(employees).where(companyCondition).orderBy(desc(employees.createdAt)).limit(6)).map((row) => ({
		...row,
		createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : String(row.createdAt)
	}));
}
async function fetchRecentActivity(db, user) {
	const condition = user.role !== "super_admin" ? eq(auditLogs.userId, user.id) : void 0;
	return (await db.select({
		id: auditLogs.id,
		userId: auditLogs.userId,
		userName: sql`COALESCE(${users.fullName}, 'System')`,
		action: auditLogs.action,
		targetType: auditLogs.targetType,
		targetId: auditLogs.targetId,
		timestamp: auditLogs.timestamp,
		type: auditLogs.type
	}).from(auditLogs).leftJoin(users, eq(auditLogs.userId, users.id)).where(condition).orderBy(desc(auditLogs.timestamp)).limit(6)).map((row) => ({
		...row,
		userName: row.userName ?? "System",
		timestamp: row.timestamp instanceof Date ? row.timestamp.toISOString() : String(row.timestamp)
	}));
}
var getDashboardData_createServerFn_handler = createServerRpc({
	id: "b6fc71d242071d137840a72f04ba960c612aa824c43b4cfe38cfc23bbd85efa6",
	name: "getDashboardData",
	filename: "src/lib/api/dashboard.functions.ts"
}, (opts) => getDashboardData.__executeServer(opts));
var getDashboardData = createServerFn({ method: "GET" }).handler(getDashboardData_createServerFn_handler, async () => {
	const user = await requireAuth();
	await requireVerifiedCompany(user);
	const db = getDb();
	const [stats, hiringTrend, ratingDist, departmentAnalytics, verificationStats, recentEmployees, recentActivity] = await Promise.all([
		fetchDashboardStats(db, user),
		fetchHiringTrend(db, user),
		fetchRatingDistribution(db, user),
		fetchDepartmentAnalytics(db, user),
		fetchVerificationStatistics(db, user),
		fetchRecentEmployees(db, user),
		fetchRecentActivity(db, user)
	]);
	return {
		stats,
		hiringTrend,
		ratingDist,
		departmentAnalytics,
		verificationStats,
		recentEmployees,
		recentActivity
	};
});
var getDashboardStats_createServerFn_handler = createServerRpc({
	id: "ef21b06479268871cc4e7e459f6137b9840ddddb3d146fa9773ea638f11e3575",
	name: "getDashboardStats",
	filename: "src/lib/api/dashboard.functions.ts"
}, (opts) => getDashboardStats.__executeServer(opts));
var getDashboardStats = createServerFn({ method: "GET" }).handler(getDashboardStats_createServerFn_handler, async () => {
	const user = await requireAuth();
	await requireVerifiedCompany(user);
	return fetchDashboardStats(getDb(), user);
});
var getHiringTrend_createServerFn_handler = createServerRpc({
	id: "c3be863bd11c1e4d9b7b69eae22011fdd3a3e20c54da3ba5d1cb95828f52f4e9",
	name: "getHiringTrend",
	filename: "src/lib/api/dashboard.functions.ts"
}, (opts) => getHiringTrend.__executeServer(opts));
var getHiringTrend = createServerFn({ method: "GET" }).handler(getHiringTrend_createServerFn_handler, async () => {
	const user = await requireAuth();
	await requireVerifiedCompany(user);
	return fetchHiringTrend(getDb(), user);
});
var getRatingDistribution_createServerFn_handler = createServerRpc({
	id: "fba27a3b571a8021c0bb3035cf4a15ae837cb672619ff16bd1ca0c6dd487d531",
	name: "getRatingDistribution",
	filename: "src/lib/api/dashboard.functions.ts"
}, (opts) => getRatingDistribution.__executeServer(opts));
var getRatingDistribution = createServerFn({ method: "GET" }).handler(getRatingDistribution_createServerFn_handler, async () => {
	const user = await requireAuth();
	await requireVerifiedCompany(user);
	return fetchRatingDistribution(getDb(), user);
});
var getDepartmentAnalytics_createServerFn_handler = createServerRpc({
	id: "a8a5cb0f357ad168109cfd842934d2116142c72593b26a602d230a02dbd6af5e",
	name: "getDepartmentAnalytics",
	filename: "src/lib/api/dashboard.functions.ts"
}, (opts) => getDepartmentAnalytics.__executeServer(opts));
var getDepartmentAnalytics = createServerFn({ method: "GET" }).handler(getDepartmentAnalytics_createServerFn_handler, async () => {
	const user = await requireAuth();
	await requireVerifiedCompany(user);
	return fetchDepartmentAnalytics(getDb(), user);
});
var getVerificationStatistics_createServerFn_handler = createServerRpc({
	id: "e6e18f562728d0bfab4008c6843e4c799938baa679149ad74c66fd48c880236f",
	name: "getVerificationStatistics",
	filename: "src/lib/api/dashboard.functions.ts"
}, (opts) => getVerificationStatistics.__executeServer(opts));
var getVerificationStatistics = createServerFn({ method: "GET" }).handler(getVerificationStatistics_createServerFn_handler, async () => {
	const user = await requireAuth();
	await requireVerifiedCompany(user);
	return fetchVerificationStatistics(getDb(), user);
});
var getRecentEmployees_createServerFn_handler = createServerRpc({
	id: "3293efc06e67d6a705f219868153ba7786762c2d2fc81f3083b67f5227717851",
	name: "getRecentEmployees",
	filename: "src/lib/api/dashboard.functions.ts"
}, (opts) => getRecentEmployees.__executeServer(opts));
var getRecentEmployees = createServerFn({ method: "GET" }).handler(getRecentEmployees_createServerFn_handler, async () => {
	const user = await requireAuth();
	await requireVerifiedCompany(user);
	return fetchRecentEmployees(getDb(), user);
});
var getRecentActivity_createServerFn_handler = createServerRpc({
	id: "6d120a8e7b8253c5bc8b0b79f091b14936d9eee15650bc736a29d59e5cba983b",
	name: "getRecentActivity",
	filename: "src/lib/api/dashboard.functions.ts"
}, (opts) => getRecentActivity.__executeServer(opts));
var getRecentActivity = createServerFn({ method: "GET" }).handler(getRecentActivity_createServerFn_handler, async () => {
	const user = await requireAuth();
	await requireVerifiedCompany(user);
	return fetchRecentActivity(getDb(), user);
});
var seedCompanyDemoData_createServerFn_handler = createServerRpc({
	id: "6c8786950acc351e0a4d2be279fedbde63f28b3ab0ce8e16890348d0e40b4f26",
	name: "seedCompanyDemoData",
	filename: "src/lib/api/dashboard.functions.ts"
}, (opts) => seedCompanyDemoData.__executeServer(opts));
var seedCompanyDemoData = createServerFn({ method: "POST" }).validator(objectType({
	companyId: stringType(),
	reviewerId: stringType()
})).handler(seedCompanyDemoData_createServerFn_handler, async ({ data }) => {
	const db = getDb();
	const [existing] = await db.select({ total: count() }).from(employees).where(eq(employees.companyId, data.companyId));
	if (existing && existing.total > 0) return {
		seeded: false,
		reason: "Company already has employees"
	};
	const now = /* @__PURE__ */ new Date();
	const getPastDate = (monthsAgo, daysAgo = 0) => {
		const d = new Date(now);
		d.setMonth(d.getMonth() - monthsAgo);
		d.setDate(d.getDate() - daysAgo);
		return d;
	};
	const mockEmployees = [
		{
			fullName: "Alice Johnson",
			email: "alice.j@company.com",
			phone: "555-0101",
			designation: "Senior Software Engineer",
			department: "Engineering",
			skills: [
				"React",
				"TypeScript",
				"Node.js",
				"GraphQL"
			],
			joiningDate: getPastDate(11),
			experience: 6,
			status: "active",
			verified: true,
			rating: 4.8
		},
		{
			fullName: "Bob Smith",
			email: "bob.s@company.com",
			phone: "555-0102",
			designation: "Software Engineer",
			department: "Engineering",
			skills: [
				"JavaScript",
				"React",
				"CSS",
				"Tailwind"
			],
			joiningDate: getPastDate(9),
			experience: 3,
			status: "active",
			verified: true,
			rating: 4.2
		},
		{
			fullName: "Charlie Davis",
			email: "charlie.d@company.com",
			phone: "555-0103",
			designation: "Senior Product Manager",
			department: "Product",
			skills: [
				"Product Strategy",
				"Agile",
				"Roadmapping",
				"SQL"
			],
			joiningDate: getPastDate(8),
			experience: 8,
			status: "active",
			verified: true,
			rating: 4.5
		},
		{
			fullName: "Diana Prince",
			email: "diana.p@company.com",
			phone: "555-0104",
			designation: "Account Executive",
			department: "Sales",
			skills: [
				"Negotiation",
				"CRM",
				"Salesforce",
				"Communication"
			],
			joiningDate: getPastDate(6),
			experience: 4,
			status: "active",
			verified: false,
			rating: 3.9
		},
		{
			fullName: "Ethan Hunt",
			email: "ethan.h@company.com",
			phone: "555-0105",
			designation: "Security Operations Analyst",
			department: "Engineering",
			skills: [
				"Cybersecurity",
				"Penetration Testing",
				"Linux",
				"Network Security"
			],
			joiningDate: getPastDate(5),
			experience: 5,
			status: "active",
			verified: true,
			rating: 4.9
		},
		{
			fullName: "Fiona Gallagher",
			email: "fiona.g@company.com",
			phone: "555-0106",
			designation: "HR Coordinator",
			department: "HR",
			skills: [
				"Recruiting",
				"Onboarding",
				"Employee Relations"
			],
			joiningDate: getPastDate(4),
			experience: 2,
			status: "active",
			verified: false,
			rating: 4
		},
		{
			fullName: "George Clark",
			email: "george.c@company.com",
			phone: "555-0107",
			designation: "Marketing Specialist",
			department: "Marketing",
			skills: [
				"SEO",
				"Content Writing",
				"Google Analytics",
				"Social Media"
			],
			joiningDate: getPastDate(3),
			experience: 3,
			status: "active",
			verified: false,
			rating: 4.3
		},
		{
			fullName: "Hannah Abbott",
			email: "hannah.a@company.com",
			phone: "555-0108",
			designation: "QA Engineer",
			department: "Engineering",
			skills: [
				"Cypress",
				"Selenium",
				"Manual Testing",
				"API Testing"
			],
			joiningDate: getPastDate(2),
			experience: 4,
			status: "active",
			verified: true,
			rating: 4.6
		},
		{
			fullName: "Ian Malcolm",
			email: "ian.m@company.com",
			phone: "555-0109",
			designation: "Product Designer",
			department: "Product",
			skills: [
				"Figma",
				"UI/UX",
				"Prototyping",
				"User Research"
			],
			joiningDate: getPastDate(1),
			experience: 3,
			status: "active",
			verified: false,
			rating: 4.1
		},
		{
			fullName: "Julia Roberts",
			email: "julia.r@company.com",
			phone: "555-0110",
			designation: "Sales Development Rep",
			department: "Sales",
			skills: [
				"Cold Calling",
				"Lead Gen",
				"Outreach",
				"Email Marketing"
			],
			joiningDate: getPastDate(0, 15),
			experience: 1,
			status: "active",
			verified: false,
			rating: 4.4
		},
		{
			fullName: "Kevin Bacon",
			email: "kevin.b@company.com",
			phone: "555-0111",
			designation: "Account Executive",
			department: "Sales",
			skills: [
				"Sales",
				"B2B",
				"Presentations"
			],
			joiningDate: getPastDate(10),
			exitDate: getPastDate(2),
			experience: 5,
			status: "exited",
			verified: true,
			rating: 3.5
		},
		{
			fullName: "Laura Croft",
			email: "laura.c@company.com",
			phone: "555-0112",
			designation: "Senior Frontend Engineer",
			department: "Engineering",
			skills: [
				"Next.js",
				"React",
				"CSS Grid",
				"Performance"
			],
			joiningDate: getPastDate(7),
			exitDate: getPastDate(1),
			experience: 7,
			status: "exited",
			verified: true,
			rating: 4.7
		}
	];
	await db.transaction(async (tx) => {
		for (const emp of mockEmployees) {
			const empId = `EMP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
			const [insertedEmp] = await tx.insert(employees).values({
				employeeId: empId,
				companyId: data.companyId,
				fullName: emp.fullName,
				email: emp.email,
				phone: emp.phone,
				designation: emp.designation,
				department: emp.department,
				skills: emp.skills,
				joiningDate: emp.joiningDate,
				exitDate: emp.exitDate,
				experience: emp.experience,
				status: emp.status,
				verified: emp.verified,
				rating: emp.rating
			}).returning();
			if (emp.verified) {
				await tx.insert(performanceReviews).values({
					employeeId: insertedEmp.id,
					reviewerId: data.reviewerId,
					period: "2025 Annual",
					productivity: Math.round(emp.rating),
					teamwork: Math.round(emp.rating - .2),
					communication: Math.round(emp.rating + .1),
					leadership: Math.round(emp.rating),
					attendance: 5,
					overall: emp.rating,
					feedback: `Great performance overall. Highly skilled and reliable employee who contributes significantly to ${emp.department}.`
				});
				await tx.insert(verificationRequests).values({
					requestedById: data.reviewerId,
					employeeId: insertedEmp.id,
					status: "approved",
					requestType: "background_check",
					responseData: {
						verified: true,
						verifiedAt: (/* @__PURE__ */ new Date()).toISOString()
					},
					resolvedAt: /* @__PURE__ */ new Date()
				});
			} else if (emp.fullName === "Ethan Hunt") await tx.insert(verificationRequests).values({
				requestedById: data.reviewerId,
				employeeId: insertedEmp.id,
				status: "pending",
				requestType: "security_clearance"
			});
			else if (emp.fullName === "Ian Malcolm") await tx.insert(verificationRequests).values({
				requestedById: data.reviewerId,
				employeeId: insertedEmp.id,
				status: "denied",
				requestType: "resume_verification",
				resolvedAt: /* @__PURE__ */ new Date()
			});
		}
		await tx.update(companies).set({ employeeCount: mockEmployees.length }).where(eq(companies.id, data.companyId));
	});
	return { seeded: true };
});
//#endregion
export { getDashboardData_createServerFn_handler, getDashboardStats_createServerFn_handler, getDepartmentAnalytics_createServerFn_handler, getHiringTrend_createServerFn_handler, getRatingDistribution_createServerFn_handler, getRecentActivity_createServerFn_handler, getRecentEmployees_createServerFn_handler, getVerificationStatistics_createServerFn_handler, seedCompanyDemoData_createServerFn_handler };
