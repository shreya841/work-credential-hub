import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-a-evWZ4r.mjs";
import { a as numberType, c as stringType, o as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/performance.functions-bbiyboZ8.js
var listReviews = createServerFn({ method: "GET" }).validator(objectType({ employeeId: stringType().uuid("Invalid employee ID") })).handler(createSsrRpc("f08cb5f0752f02d66d028cf2f3b75f223a8fb1e0074cc68fde903bc71b40fced"));
var ratingSchema = numberType().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5");
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
})).handler(createSsrRpc("3eac2998df22e73c7d9cb8fec5ead0e69ca066f0c88d528bfadac05d47be0650"));
var getPerformanceRanking = createServerFn({ method: "GET" }).handler(createSsrRpc("888d35b3868b3657cf56fee86caedc4d724eb131b91b46ee57779be25dd01fe0"));
var getPerformanceBreakdown = createServerFn({ method: "GET" }).validator(objectType({ employeeId: stringType().uuid("Invalid employee ID") })).handler(createSsrRpc("73ff4232fc7a3553338c71a4b171eb925dcbc394aa54a56c4292425d0be4f9c5"));
//#endregion
export { listReviews as i, getPerformanceBreakdown as n, getPerformanceRanking as r, createReview as t };
