import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { a as numberType, c as stringType, o as objectType, r as enumType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { a as count, c as eq, o as desc, s as and } from "../_libs/drizzle-orm+postgres.mjs";
import { l as notifications, m as users, n as auditLogs, o as employees } from "./schema-BhmjnuI8.mjs";
import { getDb } from "./index.server-ir69dnPx.mjs";
import { r as hashPassword, t as comparePassword } from "./jwt.server-CF1PrlKa.mjs";
import { n as requireAuth, r as requireRole } from "./session.server-CB7XLiCS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users.functions-vg2J2LTE.js
var getCurrentUserProfile_createServerFn_handler = createServerRpc({
	id: "f89eace00e79f5d3923347f755546e0d9fd3d6a6914cd981256f50728de24f71",
	name: "getCurrentUserProfile",
	filename: "src/lib/api/users.functions.ts"
}, (opts) => getCurrentUserProfile.__executeServer(opts));
var getCurrentUserProfile = createServerFn({ method: "GET" }).handler(getCurrentUserProfile_createServerFn_handler, async () => {
	const user = await requireAuth();
	const [profile] = await getDb().select().from(users).where(eq(users.id, user.id)).limit(1);
	if (!profile) throw new Error("User profile not found");
	return {
		id: profile.id,
		email: profile.email,
		fullName: profile.fullName,
		role: profile.role,
		companyId: profile.companyId,
		avatarUrl: profile.avatarUrl,
		createdAt: profile.createdAt.toISOString(),
		updatedAt: profile.updatedAt.toISOString()
	};
});
var updateUserProfile_createServerFn_handler = createServerRpc({
	id: "f067a397ca460d9f5ea56a4704f2d4cc6c043cc99ba9b4f941d74af91dce2796",
	name: "updateUserProfile",
	filename: "src/lib/api/users.functions.ts"
}, (opts) => updateUserProfile.__executeServer(opts));
var updateUserProfile = createServerFn({ method: "POST" }).validator(objectType({
	fullName: stringType().min(1, "Full name is required").optional(),
	avatarUrl: stringType().url("Invalid avatar URL").nullable().optional()
})).handler(updateUserProfile_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	const db = getDb();
	const updates = {};
	if (data.fullName !== void 0) updates.fullName = data.fullName;
	if (data.avatarUrl !== void 0) updates.avatarUrl = data.avatarUrl;
	if (Object.keys(updates).length === 0) throw new Error("No fields to update");
	updates.updatedAt = /* @__PURE__ */ new Date();
	const [updated] = await db.update(users).set(updates).where(eq(users.id, user.id)).returning();
	if (user.role === "employee" && data.fullName) await db.update(employees).set({
		fullName: data.fullName,
		photoUrl: data.avatarUrl ?? null
	}).where(eq(employees.userId, user.id));
	await db.insert(auditLogs).values({
		userId: user.id,
		action: "Updated user profile details",
		targetType: "user",
		targetId: user.id,
		type: "update"
	});
	return {
		id: updated.id,
		email: updated.email,
		fullName: updated.fullName,
		role: updated.role,
		companyId: updated.companyId,
		avatarUrl: updated.avatarUrl,
		createdAt: updated.createdAt.toISOString(),
		updatedAt: updated.updatedAt.toISOString()
	};
});
var changePassword_createServerFn_handler = createServerRpc({
	id: "72dfe0790e8521a4820d86f82f6877c6a99aad1c0e60f667dcc320865965dee0",
	name: "changePassword",
	filename: "src/lib/api/users.functions.ts"
}, (opts) => changePassword.__executeServer(opts));
var changePassword = createServerFn({ method: "POST" }).validator(objectType({
	currentPassword: stringType().min(1, "Current password is required"),
	newPassword: stringType().min(8, "New password must be at least 8 characters")
})).handler(changePassword_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	const db = getDb();
	const [dbUser] = await db.select().from(users).where(eq(users.id, user.id)).limit(1);
	if (!dbUser) throw new Error("User not found");
	if (!await comparePassword(data.currentPassword, dbUser.passwordHash)) throw new Error("Current password is incorrect");
	const passwordHash = await hashPassword(data.newPassword);
	await db.update(users).set({
		passwordHash,
		updatedAt: /* @__PURE__ */ new Date()
	}).where(eq(users.id, user.id));
	await db.insert(auditLogs).values({
		userId: user.id,
		action: "Changed user account password",
		targetType: "user",
		targetId: user.id,
		type: "update"
	});
	return { success: true };
});
var listUsers_createServerFn_handler = createServerRpc({
	id: "ee4369630f07f6f7b7ad10a330fa70c08d688e1b61653cee8dfeaba438121e81",
	name: "listUsers",
	filename: "src/lib/api/users.functions.ts"
}, (opts) => listUsers.__executeServer(opts));
var listUsers = createServerFn({ method: "GET" }).validator(objectType({
	page: numberType().int().positive().optional().default(1),
	pageSize: numberType().int().positive().optional().default(20)
})).handler(listUsers_createServerFn_handler, async ({ data }) => {
	const user = await requireRole(["super_admin", "company_admin"]);
	const db = getDb();
	const page = data.page ?? 1;
	const pageSize = data.pageSize ?? 20;
	const offset = (page - 1) * pageSize;
	const conditions = [];
	if (user.role === "company_admin" && user.companyId) conditions.push(eq(users.companyId, user.companyId));
	const whereClause = conditions.length > 0 ? and(...conditions) : void 0;
	const [totalResult] = await db.select({ total: count() }).from(users).where(whereClause);
	const total = totalResult?.total ?? 0;
	return {
		data: (await db.select().from(users).where(whereClause).orderBy(desc(users.createdAt)).limit(pageSize).offset(offset)).map((row) => ({
			id: row.id,
			email: row.email,
			fullName: row.fullName,
			role: row.role,
			companyId: row.companyId,
			avatarUrl: row.avatarUrl,
			status: row.status,
			createdAt: row.createdAt.toISOString(),
			updatedAt: row.updatedAt.toISOString()
		})),
		total,
		page,
		pageSize,
		totalPages: Math.ceil(total / pageSize)
	};
});
var updateUserAdmin_createServerFn_handler = createServerRpc({
	id: "4781417443957f0f02505b109ec14aa09cd55d080fb16d5db44f2f17dd4b4b6e",
	name: "updateUserAdmin",
	filename: "src/lib/api/users.functions.ts"
}, (opts) => updateUserAdmin.__executeServer(opts));
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
})).handler(updateUserAdmin_createServerFn_handler, async ({ data }) => {
	const user = await requireRole(["super_admin"]);
	const db = getDb();
	const updates = {};
	if (data.role !== void 0) updates.role = data.role;
	if (data.status !== void 0) updates.status = data.status;
	if (data.companyId !== void 0) updates.companyId = data.companyId;
	if (Object.keys(updates).length === 0) throw new Error("No fields to update");
	updates.updatedAt = /* @__PURE__ */ new Date();
	const [updated] = await db.update(users).set(updates).where(eq(users.id, data.userId)).returning();
	if (!updated) throw new Error("User not found");
	if (data.status) try {
		await db.insert(notifications).values({
			userId: updated.id,
			title: data.status === "suspended" ? "Account Suspended" : "Account Reactivated",
			message: `Your account has been ${data.status} by a system administrator.`
		});
	} catch (err) {}
	await db.insert(auditLogs).values({
		userId: user.id,
		action: `Super Admin updated user ${updated.email}: role=${updated.role}, status=${updated.status}`,
		targetType: "user",
		targetId: updated.id,
		type: "update"
	});
	return {
		id: updated.id,
		email: updated.email,
		fullName: updated.fullName,
		role: updated.role,
		companyId: updated.companyId,
		avatarUrl: updated.avatarUrl,
		status: updated.status,
		createdAt: updated.createdAt.toISOString(),
		updatedAt: updated.updatedAt.toISOString()
	};
});
//#endregion
export { changePassword_createServerFn_handler, getCurrentUserProfile_createServerFn_handler, listUsers_createServerFn_handler, updateUserAdmin_createServerFn_handler, updateUserProfile_createServerFn_handler };
