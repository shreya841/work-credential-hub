import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DnxMo53r.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-Cj2KU_kF.mjs";
import { a as numberType, c as stringType, o as objectType, r as enumType, t as arrayType } from "../_libs/zod.mjs";
import { t as Input } from "./input-C8wv43d_.mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-cNCVehGV.mjs";
import { t as Label } from "./label-ZItyyoZm.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./auth.signup-SedlzK-Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.signup-C1OZW6IF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/routes/auth.signup.tsx?tsr-split=component";
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
})).handler(createSsrRpc("191480fe2bd93034e80fcb6742f820cf4f69e36c3707fb136e75d97e4a6c9565"));
var getInvitationEmail = createServerFn({ method: "GET" }).validator(objectType({ inviteId: stringType() })).handler(createSsrRpc("3a89481c16ff9991436caf678b49b3e33020a5802821740329c790ea6dea998b"));
function Signup() {
	const search = Route.useSearch();
	const prefilledEmail = search.email || "";
	const inviteId = search.inviteId || "";
	const nav = useNavigate();
	const queryClient = useQueryClient();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [emailVal, setEmailVal] = (0, import_react.useState)(prefilledEmail);
	const [role, setRole] = (0, import_react.useState)(prefilledEmail || inviteId ? "employee" : "company_admin");
	(0, import_react.useEffect)(() => {
		if (inviteId && !prefilledEmail) getInvitationEmail({ data: { inviteId } }).then((res) => {
			if (res?.email) setEmailVal(res.email);
		}).catch(console.error);
	}, [inviteId, prefilledEmail]);
	(0, import_react.useEffect)(() => {
		if (prefilledEmail) setEmailVal(prefilledEmail);
	}, [prefilledEmail]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		const formData = new FormData(e.currentTarget);
		const firstName = formData.get("firstName");
		const lastName = formData.get("lastName");
		const companyName = formData.get("companyName");
		const companyIndustry = formData.get("companyIndustry");
		const companyLocation = formData.get("companyLocation");
		const companySize = formData.get("companySize");
		const companyWebsite = formData.get("companyWebsite");
		const email = formData.get("email");
		const password = formData.get("password");
		if (password !== formData.get("confirmPassword")) {
			setError("Passwords do not match");
			setLoading(false);
			return;
		}
		const phone = formData.get("phone");
		const skills = formData.get("skills");
		const experience = formData.get("experience");
		const portfolioLinks = formData.get("portfolioLinks");
		const resumeUrl = formData.get("resumeUrl");
		const skillsArray = skills ? skills.split(",").map((s) => s.trim()).filter((s) => s.length > 0) : [];
		const portfolioLinksArray = portfolioLinks ? portfolioLinks.split(",").map((s) => s.trim()).filter((s) => s.length > 0) : [];
		try {
			await signupAction({ data: {
				firstName,
				lastName,
				companyName: role === "company_admin" ? companyName : void 0,
				companyIndustry: role === "company_admin" ? companyIndustry : void 0,
				companyLocation: role === "company_admin" ? companyLocation : void 0,
				companySize: role === "company_admin" ? companySize : void 0,
				companyWebsite: role === "company_admin" ? companyWebsite : void 0,
				email,
				password,
				role,
				phone: role === "independent_professional" ? phone : void 0,
				skills: role === "independent_professional" ? skillsArray : void 0,
				experience: role === "independent_professional" ? Number(experience) : void 0,
				portfolioLinks: role === "independent_professional" ? portfolioLinksArray : void 0,
				resumeUrl: role === "independent_professional" ? resumeUrl : void 0
			} });
			queryClient.clear();
			toast.success("Account created successfully");
			nav({ to: "/app/dashboard" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Signup failed");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
			className: "font-display text-3xl font-bold",
			children: "Create your workspace"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 125,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "Start managing employee reputation in minutes."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 126,
			columnNumber: 7
		}, this),
		error && /* @__PURE__ */ (void 0)("div", {
			className: "mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive",
			children: error
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 130,
			columnNumber: 17
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
			className: "mt-8 space-y-4",
			onSubmit: handleSubmit,
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "I am a" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 136,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
						value: role,
						onValueChange: (v) => setRole(v),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 139,
							columnNumber: 15
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 138,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
								value: "company_admin",
								children: "Company Admin"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 142,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
								value: "employee",
								children: "Company Employee"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 143,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
								value: "independent_professional",
								children: "Independent Professional"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 144,
								columnNumber: 15
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 141,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 137,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 135,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							htmlFor: "firstName",
							children: "First name"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 150,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							id: "firstName",
							name: "firstName",
							required: true
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 151,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 149,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							htmlFor: "lastName",
							children: "Last name"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 154,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							id: "lastName",
							name: "lastName",
							required: true
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 155,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 153,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 148,
					columnNumber: 9
				}, this),
				role === "company_admin" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (void 0)(Label, {
								htmlFor: "companyName",
								children: "Company name"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 161,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Input, {
								id: "companyName",
								name: "companyName",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 162,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 160,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (void 0)(Label, {
								htmlFor: "companyIndustry",
								children: "Industry"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 165,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Input, {
								id: "companyIndustry",
								name: "companyIndustry",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 166,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 164,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 159,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (void 0)(Label, {
								htmlFor: "companyLocation",
								children: "Location"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 171,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Input, {
								id: "companyLocation",
								name: "companyLocation",
								placeholder: "e.g. Delhi, India",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 172,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 170,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (void 0)(Label, {
								htmlFor: "companySize",
								children: "Size (employees)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 175,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Select, {
								name: "companySize",
								defaultValue: "1-10",
								children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
									id: "companySize",
									children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 178,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 177,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: [
									/* @__PURE__ */ (void 0)(SelectItem, {
										value: "1-10",
										children: "1-10 employees"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 181,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)(SelectItem, {
										value: "11-50",
										children: "11-50 employees"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 182,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)(SelectItem, {
										value: "51-200",
										children: "51-200 employees"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 183,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)(SelectItem, {
										value: "201-500",
										children: "201-500 employees"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 184,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)(SelectItem, {
										value: "500+",
										children: "500+ employees"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 185,
										columnNumber: 21
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 180,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 176,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 174,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 169,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (void 0)(Label, {
							htmlFor: "companyWebsite",
							children: "Company Website"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 191,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)(Input, {
							id: "companyWebsite",
							name: "companyWebsite",
							type: "url",
							placeholder: "https://example.com",
							required: true
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 192,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 190,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 158,
					columnNumber: 38
				}, this),
				role === "independent_professional" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (void 0)(Label, {
								htmlFor: "phone",
								children: "Phone number"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 198,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Input, {
								id: "phone",
								name: "phone",
								placeholder: "e.g. +1234567890",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 199,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 197,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (void 0)(Label, {
								htmlFor: "experience",
								children: "Years of Experience"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 202,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Input, {
								id: "experience",
								name: "experience",
								type: "number",
								min: "0",
								placeholder: "e.g. 5",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 203,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 201,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 196,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (void 0)(Label, {
							htmlFor: "skills",
							children: "Skills (comma separated)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 207,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)(Input, {
							id: "skills",
							name: "skills",
							placeholder: "e.g. React, SQL, TypeScript",
							required: true
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 208,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 206,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (void 0)(Label, {
							htmlFor: "portfolioLinks",
							children: "Portfolio Links (comma separated)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 211,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)(Input, {
							id: "portfolioLinks",
							name: "portfolioLinks",
							placeholder: "e.g. https://portfolio.com, https://github.com"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 212,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 210,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (void 0)(Label, {
							htmlFor: "resumeUrl",
							children: "Resume URL"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 215,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)(Input, {
							id: "resumeUrl",
							name: "resumeUrl",
							type: "url",
							placeholder: "https://drive.google.com/resume.pdf"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 216,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 214,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 195,
					columnNumber: 49
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						htmlFor: "email",
						children: "Work email"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 220,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						id: "email",
						name: "email",
						type: "email",
						required: true,
						placeholder: "you@company.com",
						value: emailVal,
						onChange: (e) => setEmailVal(e.target.value)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 221,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 219,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						htmlFor: "password",
						children: "Password"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 224,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						id: "password",
						name: "password",
						type: "password",
						required: true,
						minLength: 8,
						placeholder: "Min 8 characters"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 225,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 223,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						htmlFor: "confirmPassword",
						children: "Confirm Password"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 228,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						id: "confirmPassword",
						name: "confirmPassword",
						type: "password",
						required: true,
						minLength: 8,
						placeholder: "Confirm your password"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 229,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 227,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					className: "w-full bg-gradient-hero text-primary-foreground shadow-elegant",
					disabled: loading,
					children: loading ? "Creating…" : prefilledEmail || inviteId ? "Claim Profile" : "Create workspace"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 231,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 134,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "mt-6 text-center text-sm text-muted-foreground",
			children: [
				"Have an account?",
				" ",
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/auth/login",
					className: "text-primary hover:underline",
					children: "Sign in"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 237,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 235,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 124,
		columnNumber: 10
	}, this);
}
//#endregion
export { Signup as component };
