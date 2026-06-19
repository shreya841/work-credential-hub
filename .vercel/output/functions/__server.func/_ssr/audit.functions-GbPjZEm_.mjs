import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { a as numberType, c as stringType, l as unknownType, o as objectType, r as enumType, s as recordType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { a as count, c as eq, d as like, o as desc, p as or, s as and, w as sql } from "../_libs/drizzle-orm+postgres.mjs";
import { m as users, n as auditLogs } from "./schema-BhmjnuI8.mjs";
import { getDb } from "./index.server-ir69dnPx.mjs";
import { n as requireAuth } from "./session.server-CB7XLiCS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audit.functions-GbPjZEm_.js
var logAction_createServerFn_handler = createServerRpc({
	id: "1c1abf229d9f31801a2a85caa841db9d1369b889d67ce9789510429952f9a5f9",
	name: "logAction",
	filename: "src/lib/api/audit.functions.ts"
}, (opts) => logAction.__executeServer(opts));
var logAction = createServerFn({ method: "POST" }).validator(objectType({
	userId: stringType().uuid(),
	action: stringType().min(1),
	targetType: stringType().min(1),
	targetId: stringType().min(1),
	type: enumType([
		"login",
		"logout",
		"access",
		"create",
		"update",
		"delete",
		"verification_request",
		"consent_change"
	]),
	metadata: recordType(unknownType()).optional(),
	ipAddress: stringType().optional()
})).handler(logAction_createServerFn_handler, async ({ data }) => {
	const [entry] = await getDb().insert(auditLogs).values({
		userId: data.userId,
		action: data.action,
		targetType: data.targetType,
		targetId: data.targetId,
		type: data.type,
		metadata: data.metadata ?? null,
		ipAddress: data.ipAddress ?? null
	}).returning();
	return entry;
});
var listAuditLogs_createServerFn_handler = createServerRpc({
	id: "eaa35f0047882869158ac10fcfdb8ee46905956a415ed8b52c10b5df3abcf06a",
	name: "listAuditLogs",
	filename: "src/lib/api/audit.functions.ts"
}, (opts) => listAuditLogs.__executeServer(opts));
var listAuditLogs = createServerFn({ method: "GET" }).validator(objectType({
	page: numberType().int().positive().optional().default(1),
	pageSize: numberType().int().positive().max(100).optional().default(20),
	type: enumType([
		"login",
		"logout",
		"access",
		"create",
		"update",
		"delete",
		"verification_request",
		"consent_change"
	]).optional(),
	search: stringType().optional()
})).handler(listAuditLogs_createServerFn_handler, async ({ data }) => {
	const user = await requireAuth();
	const db = getDb();
	const page = data.page ?? 1;
	const pageSize = data.pageSize ?? 20;
	const offset = (page - 1) * pageSize;
	const conditions = [];
	if (user.role !== "super_admin") conditions.push(eq(auditLogs.userId, user.id));
	if (data.type) conditions.push(eq(auditLogs.type, data.type));
	if (data.search) {
		const searchPattern = `%${data.search}%`;
		conditions.push(or(like(auditLogs.action, searchPattern), like(auditLogs.targetType, searchPattern), like(auditLogs.targetId, searchPattern)));
	}
	const whereClause = conditions.length > 0 ? and(...conditions) : void 0;
	const [totalResult] = await db.select({ total: count() }).from(auditLogs).where(whereClause);
	const total = totalResult?.total ?? 0;
	return {
		data: (await db.select({
			id: auditLogs.id,
			userId: auditLogs.userId,
			userName: sql`COALESCE(${users.fullName}, 'System')`,
			action: auditLogs.action,
			targetType: auditLogs.targetType,
			targetId: auditLogs.targetId,
			metadata: auditLogs.metadata,
			ipAddress: auditLogs.ipAddress,
			timestamp: auditLogs.timestamp,
			type: auditLogs.type
		}).from(auditLogs).leftJoin(users, eq(auditLogs.userId, users.id)).where(whereClause).orderBy(desc(auditLogs.timestamp)).limit(pageSize).offset(offset)).map((row) => ({
			id: row.id,
			userId: row.userId,
			userName: row.userName ?? "System",
			action: row.action,
			targetType: row.targetType,
			targetId: row.targetId,
			metadata: row.metadata,
			ipAddress: row.ipAddress,
			timestamp: row.timestamp instanceof Date ? row.timestamp.toISOString() : String(row.timestamp),
			type: row.type
		})),
		total,
		page,
		pageSize,
		totalPages: Math.ceil(total / pageSize)
	};
});
//#endregion
export { listAuditLogs_createServerFn_handler, logAction_createServerFn_handler };
