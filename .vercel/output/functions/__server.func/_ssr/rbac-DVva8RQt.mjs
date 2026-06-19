//#region node_modules/.nitro/vite/services/ssr/assets/rbac-DVva8RQt.js
var ROLE_LABELS = {
	super_admin: "Super Admin",
	company_admin: "Company Admin",
	hr: "HR",
	employee: "Employee"
};
var SIDEBAR_ITEMS = {
	super_admin: [
		"dashboard",
		"companies",
		"audit",
		"settings"
	],
	company_admin: [
		"dashboard",
		"companies",
		"employees",
		"performance",
		"search",
		"verification",
		"audit"
	],
	hr: [
		"dashboard",
		"employees",
		"performance",
		"search",
		"verification",
		"audit"
	],
	employee: [
		"dashboard",
		"consent",
		"profile",
		"audit"
	]
};
var ACTION_PERMISSIONS = {
	create_company: ["super_admin"],
	edit_company: ["super_admin", "company_admin"],
	create_employee: ["company_admin", "hr"],
	edit_employee: ["company_admin", "hr"],
	delete_employee: ["company_admin"],
	create_review: [
		"super_admin",
		"company_admin",
		"hr"
	],
	request_verification: ["company_admin", "hr"],
	manage_consent: ["employee"],
	view_audit_logs: [
		"super_admin",
		"company_admin",
		"hr",
		"employee"
	],
	manage_users: ["super_admin", "company_admin"]
};
function canPerformAction(role, action) {
	const allowed = ACTION_PERMISSIONS[action];
	if (!allowed) return false;
	return allowed.includes(role);
}
//#endregion
export { SIDEBAR_ITEMS as n, canPerformAction as r, ROLE_LABELS as t };
