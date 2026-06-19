import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-Cj2KU_kF.mjs";
import { c as stringType, o as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.functions-7eFT9ROn.js
var loginUser = createServerFn({ method: "POST" }).validator(objectType({
	email: stringType().email("Invalid email address"),
	password: stringType().min(1, "Password is required")
})).handler(createSsrRpc("07fd746ed5ac20e1b8ea1aa3717bc499703f6cbd93934e8807c3cae6171ed915"));
createServerFn({ method: "POST" }).validator(objectType({
	email: stringType().email("Invalid email address"),
	password: stringType().min(8, "Password must be at least 8 characters"),
	fullName: stringType().min(1, "Full name is required"),
	companyName: stringType().min(1, "Company name is required"),
	companyIndustry: stringType().min(1, "Industry is required")
})).handler(createSsrRpc("d93a105586995fcc723cca909ffcb5b999d7f4ad11c1549823b24560b8c19b42"));
var forgotPassword = createServerFn({ method: "POST" }).validator(objectType({ email: stringType().email("Invalid email address") })).handler(createSsrRpc("717a60e20e756f043030962c4f7b63dae1ef9771dbb0ee38dd973ad091cba144"));
var logoutUser = createServerFn({ method: "POST" }).handler(createSsrRpc("2497bd9ecf1e52905e51dfcbe33a7fa36a62b5d7be4ca9711ee7e967bce00776"));
var getCurrentUser = createServerFn({ method: "GET" }).handler(createSsrRpc("fd1ef0cf3915d135c4d3d1cb4ee0b5a29ab5988291b867e2feb17e2b6f48d6a8"));
var resetPassword = createServerFn({ method: "POST" }).validator(objectType({
	userId: stringType().uuid("Invalid user ID"),
	token: stringType().min(1, "Reset token is required"),
	newPassword: stringType().min(8, "Password must be at least 8 characters")
})).handler(createSsrRpc("c1d435743beb4d7cca1970fea11aec060554888f28e238161b6b810f6b1cbb10"));
//#endregion
export { resetPassword as a, logoutUser as i, getCurrentUser as n, loginUser as r, forgotPassword as t };
