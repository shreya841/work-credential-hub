import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { a as numberType, c as stringType, o as objectType, r as enumType, t as arrayType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.signup-DrULM8Qc.js
var signupAction_createServerFn_handler = createServerRpc({
	id: "191480fe2bd93034e80fcb6742f820cf4f69e36c3707fb136e75d97e4a6c9565",
	name: "signupAction",
	filename: "src/routes/auth.signup.tsx"
}, (opts) => signupAction.__executeServer(opts));
var signupAction = createServerFn({ method: "POST" }).validator(objectType({
	firstName: stringType().min(1, "First name is required"),
	lastName: stringType().min(1, "Last name is required"),
	companyName: stringType().optional(),
	companyIndustry: stringType().optional(),
	companyLocation: stringType().optional(),
	companySize: stringType().optional(),
	companyWebsite: stringType().optional(),
	email: stringType().email("Please enter a valid email"),
	password: stringType().min(8, "Password must be at least 8 characters"),
	role: enumType([
		"company_admin",
		"employee",
		"independent_professional"
	]),
	phone: stringType().optional(),
	skills: arrayType(stringType()).optional(),
	certifications: arrayType(stringType()).optional(),
	experience: numberType().optional(),
	portfolioLinks: arrayType(stringType()).optional(),
	resumeUrl: stringType().optional()
})).handler(signupAction_createServerFn_handler, async ({ data }) => {
	try {
		const { setCookie } = await import("./server-CgVhEEGw.mjs").then((n) => n.o).then((n) => n.t);
		const { getDb } = await import("./index.server-ir69dnPx.mjs");
		const { users, companies } = await import("./schema-BhmjnuI8.mjs").then((n) => n.f);
		const { eq } = await import("../_libs/drizzle-orm+postgres.mjs").then((n) => n.t);
		const { hashPassword, signAccessToken, signRefreshToken } = await import("./jwt.server-CF1PrlKa.mjs").then((n) => n.a).then((n) => n.a);
		const db = getDb();
		const [existing] = await db.select().from(users).where(eq(users.email, data.email)).limit(1);
		if (existing) throw new Error("An account with this email already exists");
		const passwordHash = await hashPassword(data.password);
		const fullName = `${data.firstName} ${data.lastName}`;
		let companyId = null;
		let employeeIdToLink = null;
		const isIndependent = data.role === "independent_professional";
		const dbRole = isIndependent ? "employee" : data.role;
		if (data.role === "company_admin") {
			if (!data.companyName) throw new Error("Company name is required for Company Admin");
			const [company] = await db.insert(companies).values({
				name: data.companyName,
				industry: data.companyIndustry || "General",
				size: data.companySize || "1-10",
				location: data.companyLocation || "",
				website: data.companyWebsite || ""
			}).returning();
			companyId = company.id;
		} else if (data.role === "employee") {
			const { employees, invitations } = await import("./schema-BhmjnuI8.mjs").then((n) => n.f);
			const { and } = await import("../_libs/drizzle-orm+postgres.mjs").then((n) => n.t);
			const [inv] = await db.select().from(invitations).where(and(eq(invitations.email, data.email.toLowerCase().trim()), eq(invitations.status, "pending"))).limit(1);
			if (inv) {
				companyId = inv.companyId;
				employeeIdToLink = inv.employeeId;
				await db.update(invitations).set({ status: "accepted" }).where(eq(invitations.id, inv.id));
			} else {
				const [existingEmp] = await db.select().from(employees).where(eq(employees.email, data.email.toLowerCase().trim())).limit(1);
				if (existingEmp) {
					companyId = existingEmp.companyId;
					employeeIdToLink = existingEmp.id;
				}
			}
		}
		const [user] = await db.insert(users).values({
			email: data.email,
			passwordHash,
			fullName,
			role: dbRole,
			companyId
		}).returning();
		if (data.role === "company_admin" && companyId) await db.update(companies).set({ createdById: user.id }).where(eq(companies.id, companyId));
		const { employees } = await import("./schema-BhmjnuI8.mjs").then((n) => n.f);
		if (employeeIdToLink) await db.update(employees).set({
			userId: user.id,
			claimStatus: "claimed"
		}).where(eq(employees.id, employeeIdToLink));
		else if (isIndependent || data.role === "employee") {
			const employeeId = `${isIndependent ? "IND" : "EMP"}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
			await db.insert(employees).values({
				employeeId,
				userId: user.id,
				companyId: companyId || null,
				fullName,
				email: data.email.toLowerCase().trim(),
				phone: data.phone || "",
				designation: isIndependent ? "Independent Professional" : "Employee Profile",
				department: isIndependent ? "Self" : "General",
				skills: data.skills || [],
				certifications: data.certifications || [],
				portfolioLinks: data.portfolioLinks || [],
				resumeUrl: data.resumeUrl || "",
				joiningDate: /* @__PURE__ */ new Date(),
				experience: data.experience || 0,
				status: "active",
				claimStatus: "claimed"
			});
		}
		try {
			const { sendEmail, getWelcomeEmailHtml } = await import("./email.server-Czmx-_mw.mjs");
			const welcomeHtml = getWelcomeEmailHtml({ fullName: user.fullName });
			await sendEmail({
				to: user.email,
				subject: "Welcome to WorkCred!",
				html: welcomeHtml
			});
		} catch (emailErr) {
			console.error("Failed to send welcome email:", emailErr);
		}
		const accessToken = signAccessToken({
			userId: user.id,
			role: user.role,
			email: user.email
		});
		const refreshToken = signRefreshToken(user.id);
		setCookie("access_token", accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			path: "/",
			maxAge: 900
		});
		setCookie("refresh_token", refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			path: "/",
			maxAge: 3600 * 24 * 7
		});
		return { user: {
			id: user.id,
			email: user.email,
			fullName: user.fullName,
			role: user.role,
			companyId: user.companyId,
			avatarUrl: user.avatarUrl
		} };
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : "Signup failed");
	}
});
var getInvitationEmail_createServerFn_handler = createServerRpc({
	id: "3a89481c16ff9991436caf678b49b3e33020a5802821740329c790ea6dea998b",
	name: "getInvitationEmail",
	filename: "src/routes/auth.signup.tsx"
}, (opts) => getInvitationEmail.__executeServer(opts));
var getInvitationEmail = createServerFn({ method: "GET" }).validator(objectType({ inviteId: stringType() })).handler(getInvitationEmail_createServerFn_handler, async ({ data }) => {
	const { getDb } = await import("./index.server-ir69dnPx.mjs");
	const { invitations } = await import("./schema-BhmjnuI8.mjs").then((n) => n.f);
	const { eq, and } = await import("../_libs/drizzle-orm+postgres.mjs").then((n) => n.t);
	const [inv] = await getDb().select({ email: invitations.email }).from(invitations).where(and(eq(invitations.id, data.inviteId), eq(invitations.status, "pending"))).limit(1);
	return inv || null;
});
//#endregion
export { getInvitationEmail_createServerFn_handler, signupAction_createServerFn_handler };
