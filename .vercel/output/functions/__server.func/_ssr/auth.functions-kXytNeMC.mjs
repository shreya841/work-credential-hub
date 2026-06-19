import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { c as stringType, o as objectType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { c as eq, s as and } from "../_libs/drizzle-orm+postgres.mjs";
import { d as refreshTokens, m as users, n as auditLogs, r as companies } from "./schema-BhmjnuI8.mjs";
import { getDb } from "./index.server-ir69dnPx.mjs";
import { s as setCookie$1, t as deleteCookie$1 } from "./server-CgVhEEGw.mjs";
import { i as hashTokenFast, n as compareTokenFast, o as signAccessToken, r as hashPassword, s as signRefreshToken, t as comparePassword } from "./jwt.server-CF1PrlKa.mjs";
import { t as getSession } from "./session.server-CB7XLiCS.mjs";
import { getPasswordResetHtml, sendEmail } from "./email.server-Czmx-_mw.mjs";
import { t as v4 } from "../_libs/uuid.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.functions-kXytNeMC.js
var isProduction = () => true;
function setAuthCookies(accessToken, refreshToken) {
	setCookie$1("access_token", accessToken, {
		httpOnly: true,
		secure: isProduction(),
		sameSite: "lax",
		path: "/",
		maxAge: 900
	});
	setCookie$1("refresh_token", refreshToken, {
		httpOnly: true,
		secure: isProduction(),
		sameSite: "lax",
		path: "/",
		maxAge: 3600 * 24 * 7
	});
}
function clearAuthCookies() {
	deleteCookie$1("access_token", { path: "/" });
	deleteCookie$1("refresh_token", { path: "/" });
}
var loginUser_createServerFn_handler = createServerRpc({
	id: "07fd746ed5ac20e1b8ea1aa3717bc499703f6cbd93934e8807c3cae6171ed915",
	name: "loginUser",
	filename: "src/lib/api/auth.functions.ts"
}, (opts) => loginUser.__executeServer(opts));
var loginUser = createServerFn({ method: "POST" }).validator(objectType({
	email: stringType().email("Invalid email address"),
	password: stringType().min(1, "Password is required")
})).handler(loginUser_createServerFn_handler, async ({ data }) => {
	const db = getDb();
	const [user] = await db.select().from(users).where(eq(users.email, data.email.toLowerCase().trim())).limit(1);
	if (!user) throw new Error("Invalid email or password");
	if (user.status === "suspended") throw new Error("Your account has been suspended by an administrator");
	let companyStatus = null;
	if (user.companyId) {
		const [company] = await db.select({ status: companies.status }).from(companies).where(eq(companies.id, user.companyId)).limit(1);
		if (company) {
			companyStatus = company.status;
			if (company.status === "suspended") throw new Error("Your company account has been suspended");
		}
	}
	if (user.lockoutUntil && user.lockoutUntil > /* @__PURE__ */ new Date()) {
		const remainingTime = Math.ceil((user.lockoutUntil.getTime() - Date.now()) / 6e4);
		throw new Error(`Account temporarily locked. Please try again in ${remainingTime} minutes.`);
	}
	if (!await comparePassword(data.password, user.passwordHash)) {
		const attempts = user.loginAttempts + 1;
		if (attempts >= 5) {
			const lockoutUntil = new Date(Date.now() + 900 * 1e3);
			await db.update(users).set({
				loginAttempts: attempts,
				lockoutUntil
			}).where(eq(users.id, user.id));
			throw new Error("Invalid email or password. Too many failed attempts. Account is locked for 15 minutes.");
		} else {
			await db.update(users).set({ loginAttempts: attempts }).where(eq(users.id, user.id));
			throw new Error("Invalid email or password");
		}
	}
	await db.update(users).set({
		loginAttempts: 0,
		lockoutUntil: null
	}).where(eq(users.id, user.id));
	const accessToken = signAccessToken({
		userId: user.id,
		role: user.role,
		email: user.email
	});
	const refreshToken = signRefreshToken(user.id);
	setAuthCookies(accessToken, refreshToken);
	const refreshTokenHash = hashTokenFast(refreshToken);
	await db.insert(refreshTokens).values({
		userId: user.id,
		tokenHash: refreshTokenHash,
		expiresAt: new Date(Date.now() + 10080 * 60 * 1e3)
	});
	await db.insert(auditLogs).values({
		userId: user.id,
		action: "User logged in",
		targetType: "user",
		targetId: user.id,
		type: "login"
	});
	return { user: {
		id: user.id,
		email: user.email,
		fullName: user.fullName,
		role: user.role,
		companyId: user.companyId,
		avatarUrl: user.avatarUrl,
		companyStatus
	} };
});
var signupUser_createServerFn_handler = createServerRpc({
	id: "d93a105586995fcc723cca909ffcb5b999d7f4ad11c1549823b24560b8c19b42",
	name: "signupUser",
	filename: "src/lib/api/auth.functions.ts"
}, (opts) => signupUser.__executeServer(opts));
var signupUser = createServerFn({ method: "POST" }).validator(objectType({
	email: stringType().email("Invalid email address"),
	password: stringType().min(8, "Password must be at least 8 characters"),
	fullName: stringType().min(1, "Full name is required"),
	companyName: stringType().min(1, "Company name is required"),
	companyIndustry: stringType().min(1, "Industry is required")
})).handler(signupUser_createServerFn_handler, async ({ data }) => {
	const db = getDb();
	const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, data.email.toLowerCase().trim())).limit(1);
	if (existing) throw new Error("An account with this email already exists");
	const [company] = await db.insert(companies).values({
		name: data.companyName,
		industry: data.companyIndustry,
		size: "1-10",
		location: "",
		website: ""
	}).returning();
	const passwordHash = await hashPassword(data.password);
	const [user] = await db.insert(users).values({
		email: data.email.toLowerCase().trim(),
		passwordHash,
		fullName: data.fullName,
		role: "company_admin",
		companyId: company.id
	}).returning();
	const accessToken = signAccessToken({
		userId: user.id,
		role: user.role,
		email: user.email
	});
	const refreshToken = signRefreshToken(user.id);
	setAuthCookies(accessToken, refreshToken);
	const refreshTokenHash = hashTokenFast(refreshToken);
	await db.insert(refreshTokens).values({
		userId: user.id,
		tokenHash: refreshTokenHash,
		expiresAt: new Date(Date.now() + 10080 * 60 * 1e3)
	});
	await db.insert(auditLogs).values({
		userId: user.id,
		action: "User signed up and company created",
		targetType: "user",
		targetId: user.id,
		type: "create"
	});
	return { user: {
		id: user.id,
		email: user.email,
		fullName: user.fullName,
		role: user.role,
		companyId: user.companyId,
		avatarUrl: user.avatarUrl,
		companyStatus: company.status
	} };
});
var forgotPassword_createServerFn_handler = createServerRpc({
	id: "717a60e20e756f043030962c4f7b63dae1ef9771dbb0ee38dd973ad091cba144",
	name: "forgotPassword",
	filename: "src/lib/api/auth.functions.ts"
}, (opts) => forgotPassword.__executeServer(opts));
var forgotPassword = createServerFn({ method: "POST" }).validator(objectType({ email: stringType().email("Invalid email address") })).handler(forgotPassword_createServerFn_handler, async ({ data }) => {
	const db = getDb();
	const [user] = await db.select().from(users).where(eq(users.email, data.email.toLowerCase().trim())).limit(1);
	if (!user) return { message: "If an account with that email exists, a password reset link has been sent." };
	const resetToken = v4();
	const resetTokenHash = hashTokenFast(resetToken);
	await db.insert(refreshTokens).values({
		userId: user.id,
		tokenHash: resetTokenHash,
		expiresAt: new Date(Date.now() + 3600 * 1e3)
	});
	const resetLink = `${process.env.APP_URL ?? "http://localhost:3000"}/reset-password?token=${resetToken}&userId=${user.id}`;
	const emailHtml = getPasswordResetHtml({
		fullName: user.fullName,
		resetLink
	});
	try {
		await sendEmail({
			to: user.email,
			subject: "Reset Your WorkCred Password",
			html: emailHtml
		});
	} catch (emailErr) {
		console.warn("Failed to send password reset email via Resend:", emailErr.message);
		console.log("============================================================");
		console.log("[Resend Sandbox Fallback Log]");
		console.log(`To: ${user.email}`);
		console.log(`Reset Link: ${resetLink}`);
		console.log("============================================================");
	}
	return { message: "If an account with that email exists, a password reset link has been sent." };
});
var logoutUser_createServerFn_handler = createServerRpc({
	id: "2497bd9ecf1e52905e51dfcbe33a7fa36a62b5d7be4ca9711ee7e967bce00776",
	name: "logoutUser",
	filename: "src/lib/api/auth.functions.ts"
}, (opts) => logoutUser.__executeServer(opts));
var logoutUser = createServerFn({ method: "POST" }).handler(logoutUser_createServerFn_handler, async () => {
	const db = getDb();
	let userId = null;
	try {
		userId = (await getSession())?.id ?? null;
	} catch {}
	clearAuthCookies();
	if (userId) {
		await db.delete(refreshTokens).where(eq(refreshTokens.userId, userId));
		await db.insert(auditLogs).values({
			userId,
			action: "User logged out",
			targetType: "user",
			targetId: userId,
			type: "logout"
		});
	}
	return { success: true };
});
var getCurrentUser_createServerFn_handler = createServerRpc({
	id: "fd1ef0cf3915d135c4d3d1cb4ee0b5a29ab5988291b867e2feb17e2b6f48d6a8",
	name: "getCurrentUser",
	filename: "src/lib/api/auth.functions.ts"
}, (opts) => getCurrentUser.__executeServer(opts));
var getCurrentUser = createServerFn({ method: "GET" }).handler(getCurrentUser_createServerFn_handler, async () => {
	return { user: await getSession() };
});
var resetPassword_createServerFn_handler = createServerRpc({
	id: "c1d435743beb4d7cca1970fea11aec060554888f28e238161b6b810f6b1cbb10",
	name: "resetPassword",
	filename: "src/lib/api/auth.functions.ts"
}, (opts) => resetPassword.__executeServer(opts));
var resetPassword = createServerFn({ method: "POST" }).validator(objectType({
	userId: stringType().uuid("Invalid user ID"),
	token: stringType().min(1, "Reset token is required"),
	newPassword: stringType().min(8, "Password must be at least 8 characters")
})).handler(resetPassword_createServerFn_handler, async ({ data }) => {
	const db = getDb();
	const [user] = await db.select().from(users).where(eq(users.id, data.userId)).limit(1);
	if (!user) throw new Error("User not found");
	const tokens = await db.select().from(refreshTokens).where(and(eq(refreshTokens.userId, data.userId), eq(refreshTokens.revoked, false)));
	let validTokenId = null;
	for (const t of tokens) {
		if (t.expiresAt < /* @__PURE__ */ new Date()) continue;
		if (await compareTokenFast(data.token, t.tokenHash)) {
			validTokenId = t.id;
			break;
		}
	}
	if (!validTokenId) throw new Error("Invalid or expired reset token");
	const passwordHash = await hashPassword(data.newPassword);
	await db.update(users).set({
		passwordHash,
		updatedAt: /* @__PURE__ */ new Date()
	}).where(eq(users.id, data.userId));
	await db.update(refreshTokens).set({ revoked: true }).where(eq(refreshTokens.id, validTokenId));
	await db.insert(auditLogs).values({
		userId: user.id,
		action: "Reset user account password via email link",
		targetType: "user",
		targetId: user.id,
		type: "update"
	});
	return { success: true };
});
//#endregion
export { forgotPassword_createServerFn_handler, getCurrentUser_createServerFn_handler, loginUser_createServerFn_handler, logoutUser_createServerFn_handler, resetPassword_createServerFn_handler, signupUser_createServerFn_handler };
