import { o as __toESM, r as __exportAll } from "../_runtime.mjs";
import { t as __exportAll$1 } from "./schema-BhmjnuI8.mjs";
import { t as require_jsonwebtoken } from "../_libs/jsonwebtoken+[...].mjs";
import { t as bcryptjs_default } from "../_libs/bcryptjs.mjs";
import crypto from "crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/jwt.server-CF1PrlKa.js
var jwt_server_CF1PrlKa_exports = /* @__PURE__ */ __exportAll({
	a: () => jwt_server_exports,
	c: () => verifyAccessToken,
	i: () => hashTokenFast,
	l: () => verifyRefreshToken,
	n: () => compareTokenFast,
	o: () => signAccessToken,
	r: () => hashPassword,
	s: () => signRefreshToken,
	t: () => comparePassword
});
var import_jsonwebtoken = /* @__PURE__ */ __toESM(require_jsonwebtoken());
var jwt_server_exports = /* @__PURE__ */ __exportAll$1({
	comparePassword: () => comparePassword,
	compareTokenFast: () => compareTokenFast,
	getJwtSecret: () => getJwtSecret,
	getRefreshSecret: () => getRefreshSecret,
	hashPassword: () => hashPassword,
	hashTokenFast: () => hashTokenFast,
	signAccessToken: () => signAccessToken,
	signRefreshToken: () => signRefreshToken,
	verifyAccessToken: () => verifyAccessToken,
	verifyRefreshToken: () => verifyRefreshToken
});
function getJwtSecret() {
	const secret = process.env.JWT_SECRET;
	if (!secret) throw new Error("JWT_SECRET environment variable is not set. Please configure a secure secret key (minimum 32 characters).");
	return secret;
}
function getRefreshSecret() {
	const secret = process.env.JWT_REFRESH_SECRET;
	if (!secret) throw new Error("JWT_REFRESH_SECRET environment variable is not set. Please configure a secure refresh secret key (minimum 32 characters).");
	return secret;
}
function signAccessToken(payload) {
	return import_jsonwebtoken.default.sign(payload, getJwtSecret(), { expiresIn: "15m" });
}
function signRefreshToken(userId) {
	return import_jsonwebtoken.default.sign({ userId }, getRefreshSecret(), { expiresIn: "7d" });
}
function verifyAccessToken(token) {
	try {
		return import_jsonwebtoken.default.verify(token, getJwtSecret());
	} catch (error) {
		if (error instanceof import_jsonwebtoken.default.TokenExpiredError) throw new Error("Access token has expired. Please log in again.");
		if (error instanceof import_jsonwebtoken.default.JsonWebTokenError) throw new Error("Invalid access token. Please log in again.");
		throw new Error("Failed to verify access token.");
	}
}
function verifyRefreshToken(token) {
	try {
		return import_jsonwebtoken.default.verify(token, getRefreshSecret());
	} catch (error) {
		if (error instanceof import_jsonwebtoken.default.TokenExpiredError) throw new Error("Refresh token has expired. Please log in again.");
		if (error instanceof import_jsonwebtoken.default.JsonWebTokenError) throw new Error("Invalid refresh token. Please log in again.");
		throw new Error("Failed to verify refresh token.");
	}
}
var BCRYPT_ROUNDS = 12;
async function hashPassword(password) {
	return bcryptjs_default.hash(password, BCRYPT_ROUNDS);
}
async function comparePassword(password, hash) {
	return bcryptjs_default.compare(password, hash);
}
function hashTokenFast(token) {
	return crypto.createHash("sha256").update(token).digest("hex");
}
async function compareTokenFast(token, hash) {
	if (hash.startsWith("$2a$") || hash.startsWith("$2b$")) return bcryptjs_default.compare(token, hash);
	try {
		const tokenHash = hashTokenFast(token);
		return crypto.timingSafeEqual(Buffer.from(tokenHash), Buffer.from(hash));
	} catch {
		return false;
	}
}
//#endregion
export { jwt_server_CF1PrlKa_exports as a, verifyAccessToken as c, hashTokenFast as i, verifyRefreshToken as l, compareTokenFast as n, signAccessToken as o, hashPassword as r, signRefreshToken as s, comparePassword as t };
