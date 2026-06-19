import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-Cj2KU_kF.mjs";
import { a as numberType, c as stringType, n as booleanType, o as objectType, r as enumType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employees.functions-DNhepElv.js
var listEmployees = createServerFn({ method: "GET" }).validator(objectType({
	page: numberType().int().positive().optional().default(1),
	pageSize: numberType().int().positive().max(100).optional().default(20),
	search: stringType().optional(),
	status: enumType([
		"active",
		"on_leave",
		"exited"
	]).optional()
})).handler(createSsrRpc("8dd7749cf3e7ca388f2dfc52e817ba18f353524e222489fc95e57e122be6b46d"));
var createEmployee = createServerFn({ method: "POST" }).validator(objectType({
	fullName: stringType().min(1, "Full name is required"),
	email: stringType().email("Invalid email"),
	phone: stringType().min(1, "Phone number is required"),
	designation: stringType().min(1, "Designation is required"),
	department: stringType().min(1, "Department is required"),
	skills: arrayType(stringType()).optional().default([]),
	joiningDate: stringType().min(1, "Joining date is required"),
	exitDate: stringType().nullable().optional(),
	experience: numberType().int().min(0).optional().default(0),
	status: enumType([
		"active",
		"on_leave",
		"exited"
	]).optional().default("active"),
	photoUrl: stringType().nullable().optional(),
	resumeUrl: stringType().nullable().optional(),
	companyId: stringType().uuid().optional(),
	userId: stringType().uuid().nullable().optional(),
	employeeId: stringType().optional(),
	sendEmail: booleanType().optional().default(true)
})).handler(createSsrRpc("90ee2cb0505d4b20e1c1bd4600122d0e4cacdbbddb5c9ad61e51dcd826fbc4d9"));
var getEmployeeInviteLink = createServerFn({ method: "POST" }).validator(objectType({ employeeId: stringType().uuid("Invalid employee ID") })).handler(createSsrRpc("e26e028dcf1d0ffa388746d15a7e8abe1b3dc9404911d6b1ada2131935241fef"));
var updateEmployee = createServerFn({ method: "POST" }).validator(objectType({
	id: stringType().uuid("Invalid employee ID"),
	fullName: stringType().min(1).optional(),
	email: stringType().email().optional(),
	phone: stringType().optional(),
	designation: stringType().optional(),
	department: stringType().optional(),
	skills: arrayType(stringType()).optional(),
	certifications: arrayType(stringType()).optional(),
	portfolioLinks: arrayType(stringType()).optional(),
	joiningDate: stringType().optional(),
	exitDate: stringType().nullable().optional(),
	experience: numberType().int().min(0).optional(),
	status: enumType([
		"active",
		"on_leave",
		"exited"
	]).optional(),
	photoUrl: stringType().nullable().optional(),
	resumeUrl: stringType().nullable().optional(),
	verified: booleanType().optional()
})).handler(createSsrRpc("bad757c986b3f7ff1d20dba2970ed40c710ec1f83200a1d8b416fb354410899a"));
var deleteEmployee = createServerFn({ method: "POST" }).validator(objectType({ id: stringType().uuid("Invalid employee ID") })).handler(createSsrRpc("e7153f4ace0aec4f8dfb07869aa8c83d7b85976d2ca07bd64118f447efbeddc5"));
var getEmployeeById = createServerFn({ method: "GET" }).validator(objectType({ id: stringType().uuid("Invalid employee ID") })).handler(createSsrRpc("1461b0fcc6cfd003cc49dad0a670c65dc1c094c20199a9a43cc8da5c857565f5"));
var getEmployeeByUserId = createServerFn({ method: "GET" }).validator(objectType({ userId: stringType().uuid("Invalid user ID").optional() })).handler(createSsrRpc("90a6a1d181358c1440267a4b9bf787130c9fdaff933bf6cbd522054b079fe8e0"));
var addEmploymentHistory = createServerFn({ method: "POST" }).validator(objectType({
	employeeId: stringType().uuid("Invalid employee ID"),
	companyName: stringType().min(1, "Company name is required"),
	companyId: stringType().uuid().nullable().optional(),
	designation: stringType().min(1, "Designation is required"),
	department: stringType().optional(),
	joiningDate: stringType().min(1, "Joining date is required"),
	exitDate: stringType().nullable().optional(),
	experience: numberType().min(0).optional().default(0),
	salary: numberType().nullable().optional()
})).handler(createSsrRpc("09ae1161f4449b75d791225848445f712d66f28c79696c03ab0d3c485e37ca72"));
createServerFn({ method: "POST" }).validator(objectType({
	historyId: stringType().uuid("Invalid history ID"),
	status: enumType(["verified", "rejected"])
})).handler(createSsrRpc("20b17c55c5d6fcd6a947b1e25f541896bc8e7dbb99acfc74c9e7ae72c56ead27"));
var getEmploymentHistory = createServerFn({ method: "GET" }).validator(objectType({ employeeId: stringType().uuid("Invalid employee ID") })).handler(createSsrRpc("108c569cac177158991e460f77793efc05ec19455e206f83ba4a58915b44e0a8"));
//#endregion
export { getEmployeeByUserId as a, listEmployees as c, getEmployeeById as i, updateEmployee as l, createEmployee as n, getEmployeeInviteLink as o, deleteEmployee as r, getEmploymentHistory as s, addEmploymentHistory as t };
