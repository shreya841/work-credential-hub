import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-a-evWZ4r.mjs";
import { a as numberType, c as stringType, o as objectType, r as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users.functions-B1Y8sN5J.js
createServerFn({ method: "GET" }).handler(createSsrRpc("f89eace00e79f5d3923347f755546e0d9fd3d6a6914cd981256f50728de24f71"));
var updateUserProfile = createServerFn({ method: "POST" }).validator(objectType({
	fullName: stringType().min(1, "Full name is required").optional(),
	avatarUrl: stringType().url("Invalid avatar URL").nullable().optional()
})).handler(createSsrRpc("f067a397ca460d9f5ea56a4704f2d4cc6c043cc99ba9b4f941d74af91dce2796"));
createServerFn({ method: "POST" }).validator(objectType({
	currentPassword: stringType().min(1, "Current password is required"),
	newPassword: stringType().min(8, "New password must be at least 8 characters")
})).handler(createSsrRpc("72dfe0790e8521a4820d86f82f6877c6a99aad1c0e60f667dcc320865965dee0"));
var listUsers = createServerFn({ method: "GET" }).validator(objectType({
	page: numberType().int().positive().optional().default(1),
	pageSize: numberType().int().positive().optional().default(20)
})).handler(createSsrRpc("ee4369630f07f6f7b7ad10a330fa70c08d688e1b61653cee8dfeaba438121e81"));
var updateUserAdmin = createServerFn({ method: "POST" }).validator(objectType({
	userId: stringType().uuid("Invalid user ID"),
	role: enumType([
		"super_admin",
		"company_admin",
		"hr",
		"employee"
	]).optional(),
	status: enumType(["active", "suspended"]).optional(),
	companyId: stringType().uuid().nullable().optional()
})).handler(createSsrRpc("4781417443957f0f02505b109ec14aa09cd55d080fb16d5db44f2f17dd4b4b6e"));
//#endregion
export { updateUserAdmin as n, updateUserProfile as r, listUsers as t };
