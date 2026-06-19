import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { c as stringType, n as booleanType, o as objectType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { c as eq, f as ne, o as desc, s as and } from "../_libs/drizzle-orm+postgres.mjs";
import { a as consentSettings, h as verificationRequests, i as consentGrants, l as notifications, m as users, n as auditLogs, o as employees, r as companies } from "./schema-BhmjnuI8.mjs";
import { getDb } from "./index.server-ir69dnPx.mjs";
import { n as requireAuth } from "./session.server-CB7XLiCS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/consent.functions-DXrJKHZY.js
var getConsentSettings_createServerFn_handler = createServerRpc({
	id: "00154c326d5011867d6fbff32acf209216aed3008c56cc344f91197c3a44067e",
	name: "getConsentSettings",
	filename: "src/lib/api/consent.functions.ts"
}, (opts) => getConsentSettings.__executeServer(opts));
var getConsentSettings = createServerFn({ method: "GET" }).handler(getConsentSettings_createServerFn_handler, async () => {
	const user = await requireAuth();
	const db = getDb();
	const [employee] = await db.select().from(employees).where(eq(employees.userId, user.id)).limit(1);
	if (!employee) return null;
	let [settings] = await db.select().from(consentSettings).where(eq(consentSettings.employeeId, employee.id)).limit(1);
	if (!settings) [settings] = await db.insert(consentSettings).values({
		employeeId: employee.id,
		publicVisible: false
	}).returning();
	return {
		id: settings.id,
		employeeId: settings.employeeId,
		publicVisible: settings.publicVisible,
		createdAt: settings.createdAt.toISOString(),
		updatedAt: settings.updatedAt.toISOString()
	};
});
var updateConsentVisibility_createServerFn_handler = createServerRpc({
	id: "2087f69dbd8ce238c7a44bc1238bf21712d5619e32cab0353c9c87612b93657a",
	name: "updateConsentVisibility",
	filename: "src/lib/api/consent.functions.ts"
}, (opts) => updateConsentVisibility.__executeServer(opts));
var updateConsentVisibility = createServerFn({ method: "POST" }).validator(objectType({ publicVisible: booleanType() })).handler(updateConsentVisibility_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	const db = getDb();
	const [employee] = await db.select().from(employees).where(eq(employees.userId, user.id)).limit(1);
	if (!employee) throw new Error("Employee record not found for this user");
	let [settings] = await db.select().from(consentSettings).where(eq(consentSettings.employeeId, employee.id)).limit(1);
	if (settings) [settings] = await db.update(consentSettings).set({
		publicVisible: data.publicVisible,
		updatedAt: /* @__PURE__ */ new Date()
	}).where(eq(consentSettings.id, settings.id)).returning();
	else [settings] = await db.insert(consentSettings).values({
		employeeId: employee.id,
		publicVisible: data.publicVisible
	}).returning();
	await db.insert(auditLogs).values({
		userId: user.id,
		action: `Updated public profile visibility to ${data.publicVisible}`,
		targetType: "consent_settings",
		targetId: settings.id,
		type: "consent_change"
	});
	return {
		id: settings.id,
		employeeId: settings.employeeId,
		publicVisible: settings.publicVisible,
		createdAt: settings.createdAt.toISOString(),
		updatedAt: settings.updatedAt.toISOString()
	};
});
var listConsentGrants_createServerFn_handler = createServerRpc({
	id: "d9826fdea6e23705d85b16a9f6434949814c907ccafed5f2bb20b6ec5d6c585a",
	name: "listConsentGrants",
	filename: "src/lib/api/consent.functions.ts"
}, (opts) => listConsentGrants.__executeServer(opts));
var listConsentGrants = createServerFn({ method: "GET" }).handler(listConsentGrants_createServerFn_handler, async () => {
	const user = await requireAuth();
	const db = getDb();
	const [employee] = await db.select().from(employees).where(eq(employees.userId, user.id)).limit(1);
	if (!employee) return [];
	return (await db.select({
		companyId: companies.id,
		companyName: companies.name,
		companyIndustry: companies.industry,
		companyLocation: companies.location,
		companyLogoUrl: companies.logoUrl,
		grantId: consentGrants.id,
		granted: consentGrants.granted,
		grantedAt: consentGrants.grantedAt,
		revokedAt: consentGrants.revokedAt
	}).from(companies).leftJoin(consentGrants, and(eq(consentGrants.companyId, companies.id), eq(consentGrants.employeeId, employee.id))).where(ne(companies.id, employee.companyId))).map((row) => ({
		id: row.grantId ?? "",
		employeeId: employee.id,
		companyId: row.companyId,
		companyName: row.companyName,
		companyIndustry: row.companyIndustry,
		companyLocation: row.companyLocation ?? "",
		companyLogoUrl: row.companyLogoUrl,
		granted: row.granted ?? false,
		grantedAt: row.grantedAt ? row.grantedAt.toISOString() : null,
		revokedAt: row.revokedAt ? row.revokedAt.toISOString() : null
	}));
});
var grantAccess_createServerFn_handler = createServerRpc({
	id: "e27c297b4939adcc11f41364c765d77368e1f789672629fa790107fab3c372bd",
	name: "grantAccess",
	filename: "src/lib/api/consent.functions.ts"
}, (opts) => grantAccess.__executeServer(opts));
var grantAccess = createServerFn({ method: "POST" }).validator(objectType({ companyId: stringType().uuid() })).handler(grantAccess_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	const db = getDb();
	const [employee] = await db.select().from(employees).where(eq(employees.userId, user.id)).limit(1);
	if (!employee) throw new Error("Employee record not found");
	const [existing] = await db.select().from(consentGrants).where(and(eq(consentGrants.employeeId, employee.id), eq(consentGrants.companyId, data.companyId))).limit(1);
	let grant;
	if (existing) [grant] = await db.update(consentGrants).set({
		granted: true,
		grantedAt: /* @__PURE__ */ new Date(),
		revokedAt: null
	}).where(eq(consentGrants.id, existing.id)).returning();
	else [grant] = await db.insert(consentGrants).values({
		employeeId: employee.id,
		companyId: data.companyId,
		granted: true,
		grantedAt: /* @__PURE__ */ new Date()
	}).returning();
	const admins = await db.select({ id: users.id }).from(users).where(and(eq(users.companyId, data.companyId), eq(users.role, "company_admin")));
	for (const admin of admins) await db.insert(notifications).values({
		userId: admin.id,
		title: "Consent Access Granted",
		message: `Employee "${employee.fullName}" has granted your company access to view their profile.`
	});
	await db.insert(auditLogs).values({
		userId: user.id,
		action: `Granted profile access to company ${data.companyId}`,
		targetType: "consent_grant",
		targetId: grant.id,
		type: "consent_change"
	});
	return grant;
});
var revokeAccess_createServerFn_handler = createServerRpc({
	id: "3a39a799af86c4b5120db0a87d016db16b81cadee92430e276a290a0c6bcfb9b",
	name: "revokeAccess",
	filename: "src/lib/api/consent.functions.ts"
}, (opts) => revokeAccess.__executeServer(opts));
var revokeAccess = createServerFn({ method: "POST" }).validator(objectType({ companyId: stringType().uuid() })).handler(revokeAccess_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	const db = getDb();
	const [employee] = await db.select().from(employees).where(eq(employees.userId, user.id)).limit(1);
	if (!employee) throw new Error("Employee record not found");
	const [existing] = await db.select().from(consentGrants).where(and(eq(consentGrants.employeeId, employee.id), eq(consentGrants.companyId, data.companyId))).limit(1);
	if (!existing) throw new Error("No existing access grant found");
	const [grant] = await db.update(consentGrants).set({
		granted: false,
		revokedAt: /* @__PURE__ */ new Date()
	}).where(eq(consentGrants.id, existing.id)).returning();
	const admins = await db.select({ id: users.id }).from(users).where(and(eq(users.companyId, data.companyId), eq(users.role, "company_admin")));
	for (const admin of admins) await db.insert(notifications).values({
		userId: admin.id,
		title: "Consent Access Revoked",
		message: `Employee "${employee.fullName}" has revoked your company's access to view their profile.`
	});
	await db.insert(auditLogs).values({
		userId: user.id,
		action: `Revoked profile access from company ${data.companyId}`,
		targetType: "consent_grant",
		targetId: grant.id,
		type: "consent_change"
	});
	return grant;
});
var downloadSharedDataHistory_createServerFn_handler = createServerRpc({
	id: "f813c8ccb45e92e86109d5cb921f0c3a7b4f71feba83df47e4b7e6e608d5c3f6",
	name: "downloadSharedDataHistory",
	filename: "src/lib/api/consent.functions.ts"
}, (opts) => downloadSharedDataHistory.__executeServer(opts));
var downloadSharedDataHistory = createServerFn({ method: "GET" }).handler(downloadSharedDataHistory_createServerFn_handler, async () => {
	const user = await requireAuth();
	const db = getDb();
	const [employee] = await db.select().from(employees).where(eq(employees.userId, user.id)).limit(1);
	if (!employee) throw new Error("Employee record not found");
	const settings = await db.select().from(consentSettings).where(eq(consentSettings.employeeId, employee.id));
	const grants = await db.select({
		id: consentGrants.id,
		companyName: companies.name,
		granted: consentGrants.granted,
		grantedAt: consentGrants.grantedAt,
		revokedAt: consentGrants.revokedAt
	}).from(consentGrants).leftJoin(companies, eq(consentGrants.companyId, companies.id)).where(eq(consentGrants.employeeId, employee.id));
	const verifications = await db.select({
		id: verificationRequests.id,
		companyName: companies.name,
		status: verificationRequests.status,
		requestType: verificationRequests.requestType,
		createdAt: verificationRequests.createdAt,
		resolvedAt: verificationRequests.resolvedAt
	}).from(verificationRequests).leftJoin(users, eq(verificationRequests.requestedById, users.id)).leftJoin(companies, eq(users.companyId, companies.id)).where(eq(verificationRequests.employeeId, employee.id));
	const audits = await db.select().from(auditLogs).where(and(eq(auditLogs.userId, user.id), eq(auditLogs.type, "consent_change"))).orderBy(desc(auditLogs.timestamp));
	const dataHistory = {
		exportTimestamp: (/* @__PURE__ */ new Date()).toISOString(),
		employeeProfile: {
			fullName: employee.fullName,
			email: employee.email,
			phone: employee.phone,
			designation: employee.designation,
			department: employee.department,
			joiningDate: employee.joiningDate,
			exitDate: employee.exitDate
		},
		consentSettings: settings,
		consentGrants: grants,
		verificationHistory: verifications,
		auditLogs: audits
	};
	return JSON.stringify(dataHistory, null, 2);
});
//#endregion
export { downloadSharedDataHistory_createServerFn_handler, getConsentSettings_createServerFn_handler, grantAccess_createServerFn_handler, listConsentGrants_createServerFn_handler, revokeAccess_createServerFn_handler, updateConsentVisibility_createServerFn_handler };
