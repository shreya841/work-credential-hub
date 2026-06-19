import { c as eq, s as and } from "../_libs/drizzle-orm+postgres.mjs";
import { d as refreshTokens, m as users, r as companies } from "./schema-BhmjnuI8.mjs";
import { getDb } from "./index.server-ir69dnPx.mjs";
import { n as getCookie, r as getRequest, s as setCookie$1 } from "./server-CgVhEEGw.mjs";
import { c as verifyAccessToken, i as hashTokenFast, l as verifyRefreshToken, n as compareTokenFast, o as signAccessToken, s as signRefreshToken } from "./jwt.server-CF1PrlKa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/session.server-CB7XLiCS.js
async function getSession() {
	const db = getDb();
	try {
		const request = getRequest();
		if (request && [
			"POST",
			"PUT",
			"DELETE",
			"PATCH"
		].includes(request.method)) {
			const origin = request.headers.get("origin");
			if (origin) {
				const host = request.headers.get("host") || "";
				try {
					if (new URL(origin).host !== host) {
						console.warn(`Blocked CSRF attempt. Origin: ${origin}, Host: ${host}`);
						return null;
					}
				} catch (e) {}
			}
		}
		const token = getCookie("access_token");
		if (token) {
			const decoded = verifyAccessToken(token);
			const [user] = await db.select({
				id: users.id,
				email: users.email,
				fullName: users.fullName,
				role: users.role,
				companyId: users.companyId,
				avatarUrl: users.avatarUrl,
				status: users.status,
				companyStatus: companies.status
			}).from(users).leftJoin(companies, eq(users.companyId, companies.id)).where(eq(users.id, decoded.userId)).limit(1);
			if (user && user.status === "active") {
				if (user.companyStatus === "suspended") return null;
				return user;
			}
		}
	} catch (err) {}
	try {
		const refreshToken = getCookie("refresh_token");
		if (!refreshToken) return null;
		const decoded = verifyRefreshToken(refreshToken);
		const [user] = await db.select({
			id: users.id,
			email: users.email,
			fullName: users.fullName,
			role: users.role,
			companyId: users.companyId,
			avatarUrl: users.avatarUrl,
			status: users.status,
			companyStatus: companies.status
		}).from(users).leftJoin(companies, eq(users.companyId, companies.id)).where(eq(users.id, decoded.userId)).limit(1);
		if (!user || user.status !== "active") return null;
		if (user.companyStatus === "suspended") return null;
		const dbTokens = await db.select().from(refreshTokens).where(and(eq(refreshTokens.userId, user.id), eq(refreshTokens.revoked, false)));
		let activeRecord = null;
		for (const r of dbTokens) {
			if (r.expiresAt < /* @__PURE__ */ new Date()) continue;
			if (await compareTokenFast(refreshToken, r.tokenHash)) {
				activeRecord = r;
				break;
			}
		}
		if (!activeRecord) return null;
		await db.update(refreshTokens).set({ revoked: true }).where(eq(refreshTokens.id, activeRecord.id));
		const newAccessToken = signAccessToken({
			userId: user.id,
			role: user.role,
			email: user.email
		});
		const newRefreshToken = signRefreshToken(user.id);
		const isProduction = true;
		setCookie$1("access_token", newAccessToken, {
			httpOnly: true,
			secure: isProduction,
			sameSite: "lax",
			path: "/",
			maxAge: 900
		});
		setCookie$1("refresh_token", newRefreshToken, {
			httpOnly: true,
			secure: isProduction,
			sameSite: "lax",
			path: "/",
			maxAge: 3600 * 24 * 7
		});
		const newHash = hashTokenFast(newRefreshToken);
		await db.insert(refreshTokens).values({
			userId: user.id,
			tokenHash: newHash,
			expiresAt: new Date(Date.now() + 10080 * 60 * 1e3)
		});
		return user;
	} catch (e) {
		return null;
	}
}
async function requireAuth() {
	const session = await getSession();
	if (!session) throw new Error("Authentication required. Please log in to access this resource.");
	return session;
}
async function requireRole(allowedRoles) {
	const user = await requireAuth();
	if (!allowedRoles.includes(user.role)) throw new Error(`Access denied. This action requires one of the following roles: ${allowedRoles.join(", ")}. Your current role is: ${user.role}.`);
	return user;
}
async function requireVerifiedCompany(user) {
	if (user.role === "company_admin" || user.role === "hr") {
		if (!user.companyId) throw new Error("Company context is required for this action.");
		const { getDb } = await import("./index.server-ir69dnPx.mjs");
		const { companies } = await import("./schema-BhmjnuI8.mjs").then((n) => n.f);
		const { eq } = await import("../_libs/drizzle-orm+postgres.mjs").then((n) => n.t);
		const [comp] = await getDb().select({ status: companies.status }).from(companies).where(eq(companies.id, user.companyId)).limit(1);
		if (!comp || comp.status !== "approved") throw new Error("Company must be approved by Super Admin before accessing this feature.");
	}
}
//#endregion
export { requireVerifiedCompany as i, requireAuth as n, requireRole as r, getSession as t };
