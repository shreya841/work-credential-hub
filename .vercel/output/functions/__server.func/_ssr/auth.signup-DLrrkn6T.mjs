import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BPK1zgJN.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-a-evWZ4r.mjs";
import { a as numberType, c as stringType, o as objectType, r as enumType, t as arrayType } from "../_libs/zod.mjs";
import { t as Input } from "./input-BYcV5Phs.mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-C9T31-X3.mjs";
import { t as Label } from "./label-qle7VSy6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./auth.signup-6gPndGa-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.signup-DLrrkn6T.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
var getInvitationDetails = createServerFn({ method: "GET" }).validator(objectType({ inviteId: stringType() })).handler(createSsrRpc("7ef1ff19c264547fc09a5e6078040e8fcc5f9e4ad5a203fafaee7434ece4388c"));
function Signup() {
	const search = Route.useSearch();
	const prefilledEmail = search.email || "";
	const inviteId = search.inviteId || "";
	const nav = useNavigate();
	const queryClient = useQueryClient();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [emailVal, setEmailVal] = (0, import_react.useState)(prefilledEmail);
	const [firstNameVal, setFirstNameVal] = (0, import_react.useState)("");
	const [lastNameVal, setLastNameVal] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)(prefilledEmail || inviteId ? "employee" : "company_admin");
	(0, import_react.useEffect)(() => {
		if (inviteId) getInvitationDetails({ data: { inviteId } }).then((res) => {
			if (res) {
				setEmailVal(res.email);
				if (res.fullName) {
					const parts = res.fullName.trim().split(/\s+/);
					if (parts.length > 0) {
						setFirstNameVal(parts[0]);
						setLastNameVal(parts.slice(1).join(" "));
					}
				}
			}
		}).catch(console.error);
	}, [inviteId]);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold",
			children: "Create your workspace"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "Start managing employee reputation in minutes."
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive",
			children: error
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-8 space-y-4",
			onSubmit: handleSubmit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "I am a" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: role,
						onValueChange: (v) => setRole(v),
						disabled: !!inviteId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							disabled: !!inviteId,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "company_admin",
								children: "Company Admin"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "employee",
								children: "Company Employee"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "independent_professional",
								children: "Independent Professional"
							})
						] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "firstName",
							children: "First name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "firstName",
							name: "firstName",
							required: true,
							value: firstNameVal,
							onChange: (e) => setFirstNameVal(e.target.value)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "lastName",
							children: "Last name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "lastName",
							name: "lastName",
							required: true,
							value: lastNameVal,
							onChange: (e) => setLastNameVal(e.target.value)
						})]
					})]
				}),
				role === "company_admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "companyName",
								children: "Company name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "companyName",
								name: "companyName",
								required: true
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "companyIndustry",
								children: "Industry"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "companyIndustry",
								name: "companyIndustry",
								required: true
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "companyLocation",
								children: "Location"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "companyLocation",
								name: "companyLocation",
								placeholder: "e.g. Delhi, India",
								required: true
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "companySize",
								children: "Size (employees)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								name: "companySize",
								defaultValue: "1-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									id: "companySize",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "1-10",
										children: "1-10 employees"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "11-50",
										children: "11-50 employees"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "51-200",
										children: "51-200 employees"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "201-500",
										children: "201-500 employees"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "500+",
										children: "500+ employees"
									})
								] })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "companyWebsite",
							children: "Company Website"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "companyWebsite",
							name: "companyWebsite",
							type: "url",
							placeholder: "https://example.com",
							required: true
						})]
					})
				] }),
				role === "independent_professional" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "phone",
								children: "Phone number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "phone",
								name: "phone",
								placeholder: "e.g. +1234567890",
								required: true
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "experience",
								children: "Years of Experience"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "experience",
								name: "experience",
								type: "number",
								min: "0",
								placeholder: "e.g. 5",
								required: true
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "skills",
							children: "Skills (comma separated)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "skills",
							name: "skills",
							placeholder: "e.g. React, SQL, TypeScript",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "portfolioLinks",
							children: "Portfolio Links (comma separated)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "portfolioLinks",
							name: "portfolioLinks",
							placeholder: "e.g. https://portfolio.com, https://github.com"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "resumeUrl",
							children: "Resume URL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "resumeUrl",
							name: "resumeUrl",
							type: "url",
							placeholder: "https://drive.google.com/resume.pdf"
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "email",
						children: "Work email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "email",
						name: "email",
						type: "email",
						required: true,
						placeholder: "you@company.com",
						value: emailVal,
						onChange: (e) => setEmailVal(e.target.value),
						readOnly: !!inviteId,
						className: inviteId ? "bg-muted cursor-not-allowed" : ""
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "password",
						children: "Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "password",
						name: "password",
						type: "password",
						required: true,
						minLength: 8,
						placeholder: "Min 8 characters"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "confirmPassword",
						children: "Confirm Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "confirmPassword",
						name: "confirmPassword",
						type: "password",
						required: true,
						minLength: 8,
						placeholder: "Confirm your password"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full bg-gradient-hero text-primary-foreground shadow-elegant",
					disabled: loading,
					children: loading ? "Creating…" : prefilledEmail || inviteId ? "Claim Profile" : "Create workspace"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-6 text-center text-sm text-muted-foreground",
			children: [
				"Have an account?",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/auth/login",
					className: "text-primary hover:underline",
					children: "Sign in"
				})
			]
		})
	] });
}
//#endregion
export { Signup as component };
