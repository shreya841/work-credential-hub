import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { a as numberType, c as stringType, o as objectType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { c as eq, i as avg, o as desc, s as and, w as sql } from "../_libs/drizzle-orm+postgres.mjs";
import { l as notifications, m as users, n as auditLogs, o as employees, u as performanceReviews } from "./schema-BhmjnuI8.mjs";
import { getDb } from "./index.server-ir69dnPx.mjs";
import { i as requireVerifiedCompany, n as requireAuth, r as requireRole } from "./session.server-CB7XLiCS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/performance.functions-CSCraOS7.js
var listReviews_createServerFn_handler = createServerRpc({
	id: "f08cb5f0752f02d66d028cf2f3b75f223a8fb1e0074cc68fde903bc71b40fced",
	name: "listReviews",
	filename: "src/lib/api/performance.functions.ts"
}, (opts) => listReviews.__executeServer(opts));
var listReviews = createServerFn({ method: "GET" }).validator(objectType({ employeeId: stringType().uuid("Invalid employee ID") })).handler(listReviews_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	await requireVerifiedCompany(user);
	const db = getDb();
	const [employee] = await db.select().from(employees).where(eq(employees.id, data.employeeId)).limit(1);
	if (!employee) throw new Error("Employee not found");
	if (user.role !== "super_admin" && user.id !== employee.userId) throw new Error("You do not have access to this employee's reviews.");
	return (await db.select({
		id: performanceReviews.id,
		employeeId: performanceReviews.employeeId,
		reviewerId: performanceReviews.reviewerId,
		reviewerName: sql`COALESCE(${performanceReviews.reviewerName}, ${users.fullName}, 'Unknown')`,
		period: performanceReviews.period,
		productivity: performanceReviews.productivity,
		teamwork: performanceReviews.teamwork,
		communication: performanceReviews.communication,
		leadership: performanceReviews.leadership,
		attendance: performanceReviews.attendance,
		overall: performanceReviews.overall,
		feedback: performanceReviews.feedback,
		createdAt: performanceReviews.createdAt
	}).from(performanceReviews).leftJoin(users, eq(performanceReviews.reviewerId, users.id)).where(eq(performanceReviews.employeeId, data.employeeId)).orderBy(desc(performanceReviews.createdAt))).map((row) => ({
		id: row.id,
		employeeId: row.employeeId,
		reviewerId: row.reviewerId,
		reviewerName: row.reviewerName ?? "Unknown",
		period: row.period,
		productivity: Number(row.productivity),
		teamwork: Number(row.teamwork),
		communication: Number(row.communication),
		leadership: Number(row.leadership),
		attendance: Number(row.attendance),
		overall: Number(row.overall),
		feedback: row.feedback,
		createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : String(row.createdAt)
	}));
});
var ratingSchema = numberType().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5");
var createReview_createServerFn_handler = createServerRpc({
	id: "3eac2998df22e73c7d9cb8fec5ead0e69ca066f0c88d528bfadac05d47be0650",
	name: "createReview",
	filename: "src/lib/api/performance.functions.ts"
}, (opts) => createReview.__executeServer(opts));
var createReview = createServerFn({ method: "POST" }).validator(objectType({
	employeeId: stringType().uuid("Invalid employee ID"),
	period: stringType().min(1, "Review period is required"),
	productivity: ratingSchema,
	teamwork: ratingSchema,
	communication: ratingSchema,
	leadership: ratingSchema,
	attendance: numberType().min(0, "Attendance must be at least 0").max(100, "Attendance must be at most 100"),
	feedback: stringType().min(1, "Feedback is required"),
	reviewerName: stringType().min(1, "Reviewer name is required").optional()
})).handler(createReview_createServerFn_handler, async ({ data }) => {
	const user = await requireRole([
		"super_admin",
		"company_admin",
		"hr"
	]);
	await requireVerifiedCompany(user);
	const db = getDb();
	const [employee] = await db.select().from(employees).where(eq(employees.id, data.employeeId)).limit(1);
	if (!employee) throw new Error("Employee not found");
	if (user.role !== "super_admin" && user.companyId !== employee.companyId) throw new Error("You can only review employees in your company");
	const overall = (data.productivity + data.teamwork + data.communication + data.leadership + data.attendance / 100 * 5) / 5;
	const [review] = await db.insert(performanceReviews).values({
		employeeId: data.employeeId,
		reviewerId: user.id,
		reviewerName: data.reviewerName || user.fullName,
		period: data.period,
		productivity: data.productivity,
		teamwork: data.teamwork,
		communication: data.communication,
		leadership: data.leadership,
		attendance: data.attendance,
		overall: Math.round(overall * 100) / 100,
		feedback: data.feedback
	}).returning();
	const [avgResult] = await db.select({ avgRating: avg(performanceReviews.overall) }).from(performanceReviews).where(eq(performanceReviews.employeeId, data.employeeId));
	const newAvgRating = avgResult?.avgRating ? Math.round(Number(avgResult.avgRating) * 100) / 100 : overall;
	await db.update(employees).set({
		rating: newAvgRating,
		updatedAt: /* @__PURE__ */ new Date()
	}).where(eq(employees.id, data.employeeId));
	await db.insert(auditLogs).values({
		userId: user.id,
		action: `Created performance review for ${employee.fullName} (${data.period})`,
		targetType: "performance_review",
		targetId: review.id,
		type: "create",
		metadata: {
			overall,
			period: data.period
		}
	});
	if (employee.userId) await db.insert(notifications).values({
		userId: employee.userId,
		title: "New Performance Review Added",
		message: `A new performance review has been added for period: ${data.period}. Overall rating: ${Math.round(overall * 100) / 100}/5.`
	});
	return review;
});
var getPerformanceRanking_createServerFn_handler = createServerRpc({
	id: "888d35b3868b3657cf56fee86caedc4d724eb131b91b46ee57779be25dd01fe0",
	name: "getPerformanceRanking",
	filename: "src/lib/api/performance.functions.ts"
}, (opts) => getPerformanceRanking.__executeServer(opts));
var getPerformanceRanking = createServerFn({ method: "GET" }).handler(getPerformanceRanking_createServerFn_handler, async () => {
	const user = await requireAuth();
	await requireVerifiedCompany(user);
	const db = getDb();
	const companyCondition = user.role !== "super_admin" ? eq(employees.userId, user.id) : void 0;
	return (await db.select({
		id: employees.id,
		employeeId: employees.employeeId,
		fullName: employees.fullName,
		designation: employees.designation,
		department: employees.department,
		photoUrl: employees.photoUrl,
		rating: employees.rating,
		verified: employees.verified,
		reviewCount: sql`(
          SELECT COUNT(*)::int FROM ${performanceReviews}
          WHERE ${performanceReviews.employeeId} = ${employees.id}
        )`.as("review_count")
	}).from(employees).where(companyCondition).orderBy(desc(employees.rating)).limit(10)).map((row) => ({
		...row,
		rating: Number(row.rating),
		reviewCount: row.reviewCount ?? 0
	}));
});
var getPerformanceBreakdown_createServerFn_handler = createServerRpc({
	id: "73ff4232fc7a3553338c71a4b171eb925dcbc394aa54a56c4292425d0be4f9c5",
	name: "getPerformanceBreakdown",
	filename: "src/lib/api/performance.functions.ts"
}, (opts) => getPerformanceBreakdown.__executeServer(opts));
var getPerformanceBreakdown = createServerFn({ method: "GET" }).validator(objectType({ employeeId: stringType().uuid("Invalid employee ID") })).handler(getPerformanceBreakdown_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	await requireVerifiedCompany(user);
	const db = getDb();
	const [employee] = await db.select().from(employees).where(eq(employees.id, data.employeeId)).limit(1);
	if (!employee) throw new Error("Employee not found");
	if (user.role !== "super_admin" && user.id !== employee.userId) throw new Error("You do not have access to this employee's performance data.");
	const [latestReview] = await db.select().from(performanceReviews).where(eq(performanceReviews.employeeId, data.employeeId)).orderBy(desc(performanceReviews.createdAt)).limit(1);
	if (!latestReview) return {
		employeeId: data.employeeId,
		employeeName: employee.fullName,
		hasReviews: false,
		employeeAvgRating: Number(employee.rating),
		departmentAvgRating: 0,
		metrics: null
	};
	let departmentAvgRating = 0;
	if (employee.department) {
		const [deptAvgResult] = await db.select({ avgRating: avg(performanceReviews.overall) }).from(performanceReviews).innerJoin(employees, eq(performanceReviews.employeeId, employees.id)).where(and(eq(employees.department, employee.department), eq(employees.companyId, employee.companyId)));
		departmentAvgRating = deptAvgResult?.avgRating ? Math.round(Number(deptAvgResult.avgRating) * 100) / 100 : 0;
	}
	return {
		employeeId: data.employeeId,
		employeeName: employee.fullName,
		hasReviews: true,
		employeeAvgRating: Number(employee.rating),
		departmentAvgRating,
		metrics: {
			productivity: Number(latestReview.productivity),
			teamwork: Number(latestReview.teamwork),
			communication: Number(latestReview.communication),
			leadership: Number(latestReview.leadership),
			attendance: Number(latestReview.attendance),
			overall: Number(latestReview.overall),
			period: latestReview.period,
			feedback: latestReview.feedback,
			createdAt: latestReview.createdAt instanceof Date ? latestReview.createdAt.toISOString() : String(latestReview.createdAt)
		}
	};
});
//#endregion
export { createReview_createServerFn_handler, getPerformanceBreakdown_createServerFn_handler, getPerformanceRanking_createServerFn_handler, listReviews_createServerFn_handler };
