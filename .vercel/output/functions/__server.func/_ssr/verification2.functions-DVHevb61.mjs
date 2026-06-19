import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-a-evWZ4r.mjs";
import { a as numberType, c as stringType, o as objectType, r as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verification2.functions-DVHevb61.js
var createVerificationRequest = createServerFn({ method: "POST" }).validator(objectType({
	employeeId: stringType().uuid("Invalid employee ID"),
	requestType: stringType().min(1, "Request type is required")
})).handler(createSsrRpc("f052ac7231c1cd1a1360a30eea084e4b0e61ec0023272fcd668e90fc2412a2f4"));
var listVerificationRequests = createServerFn({ method: "GET" }).validator(objectType({
	page: numberType().int().positive().optional().default(1),
	pageSize: numberType().int().positive().optional().default(20)
})).handler(createSsrRpc("5f2e96323fe4cfe07b8a2538d202b0ea12990f549fa473169d574e6d07a90ba0"));
var resolveVerificationRequest = createServerFn({ method: "POST" }).validator(objectType({
	id: stringType().uuid("Invalid request ID"),
	status: enumType(["approved", "denied"])
})).handler(createSsrRpc("6f54955d4b84892375ee87d05af6e4f5cec177113811bbeaec1eec62cf802304"));
createServerFn({ method: "GET" }).validator(objectType({ id: stringType().uuid("Invalid request ID") })).handler(createSsrRpc("be342b2a65dba7644bcb4d9364ec37e61c446c3a50b689379575c5aae33277af"));
var searchEmployeesGlobal = createServerFn({ method: "GET" }).validator(objectType({ query: stringType().min(1, "Search query is required").max(100) })).handler(createSsrRpc("2d06160c143ef287b70d7231123f1cc4cddac51bf6c3ed95316495bc1bc5bfe2"));
//#endregion
export { searchEmployeesGlobal as i, listVerificationRequests as n, resolveVerificationRequest as r, createVerificationRequest as t };
