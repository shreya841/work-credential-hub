import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-a-evWZ4r.mjs";
import { a as numberType, c as stringType, i as literalType, n as booleanType, o as objectType, r as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/companies.functions-r1DEM_Ym.js
var listCompanies = createServerFn({ method: "GET" }).validator(objectType({
	page: numberType().int().positive().optional().default(1),
	pageSize: numberType().int().positive().max(100).optional().default(20),
	search: stringType().optional()
})).handler(createSsrRpc("982fd993fe717d5b7d457d00f37e814477af9b9a12c447095049dc428d4d8f38"));
var createCompany = createServerFn({ method: "POST" }).validator(objectType({
	name: stringType().min(1, "Company name is required"),
	industry: stringType().min(1, "Industry is required"),
	size: stringType().min(1, "Company size is required"),
	location: stringType().min(1, "Location is required"),
	website: stringType().url("Invalid website URL").or(literalType(""))
})).handler(createSsrRpc("de04640b39f548be7e7fd6a625b46831eaffc97b489c7c61923c0ef5c8482486"));
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
})).handler(createSsrRpc("6c70a5bc04e38a0c8f0592dcabd121ff4af6ee6353dd530af1a89e308e0a45a6"));
var getCompanyById = createServerFn({ method: "GET" }).validator(objectType({ id: stringType().uuid("Invalid company ID") })).handler(createSsrRpc("49bae503bc1b4ee9e4673084cf895265b750d3c6114b717f2f42e82ba1d9c08e"));
var getCompanyDeleteImpact = createServerFn({ method: "GET" }).validator(objectType({ id: stringType().uuid("Invalid company ID") })).handler(createSsrRpc("a185dd6f845fc97894ecd1a2db9279980032551b5509f24ef27af79de23e78c9"));
var deleteCompany = createServerFn({ method: "POST" }).validator(objectType({ id: stringType().uuid("Invalid company ID") })).handler(createSsrRpc("d802b857d1baab04820b35485eaca1b8836df7796c00d2c211a5fe8377689429"));
//#endregion
export { listCompanies as a, getCompanyDeleteImpact as i, deleteCompany as n, updateCompany as o, getCompanyById as r, createCompany as t };
