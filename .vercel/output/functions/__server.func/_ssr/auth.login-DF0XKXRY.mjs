import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BPK1zgJN.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as loginUser } from "./auth.functions-D6X1b0I_.mjs";
import { t as Input } from "./input-BYcV5Phs.mjs";
import { A as Lock, I as Eye, J as CircleAlert, L as EyeOff, O as Mail } from "../_libs/lucide-react.mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as Label } from "./label-qle7VSy6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AlertDescription, t as Alert } from "./alert-DuG7Sg73.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.login-DF0XKXRY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [rememberMe, setRememberMe] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			const response = await loginUser({ data: {
				email,
				password
			} });
			queryClient.clear();
			toast.success(`Welcome back, ${response.user.fullName}!`);
			navigate({ to: "/app/dashboard" });
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err.message : "Invalid email or password");
			toast.error("Sign in failed");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-300",
					children: "Welcome Back"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-500 dark:text-white/50 transition-colors duration-300",
					children: "Sign in to your WorkCred workspace to manage trust."
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
				variant: "destructive",
				className: "bg-red-500/10 border-red-500/20 text-red-800 dark:text-red-200",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, {
					className: "text-xs",
					children: error
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-4",
				onSubmit: handleSubmit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							className: "text-xs font-semibold text-slate-700 dark:text-white/70",
							children: "Work Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-white/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								type: "email",
								required: true,
								placeholder: "you@company.com",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								disabled: loading,
								className: "pl-10 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:border-[#00C2FF] dark:focus:border-[#00C2FF]/50 focus:ring-1 focus:ring-[#00C2FF] dark:focus:ring-[#00C2FF]/50 h-10.5 rounded-xl transition-all"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "password",
								className: "text-xs font-semibold text-slate-700 dark:text-white/70",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth/forgot",
								className: "text-xs text-sky-600 dark:text-[#00C2FF] hover:text-emerald-500 dark:hover:text-[#00E5A8] transition-colors",
								children: "Forgot?"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-white/40" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "password",
									type: showPassword ? "text" : "password",
									required: true,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									disabled: loading,
									className: "pl-10 pr-10 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:border-[#00C2FF] dark:focus:border-[#00C2FF]/50 focus:ring-1 focus:ring-[#00C2FF] dark:focus:ring-[#00C2FF]/50 h-10.5 rounded-xl transition-all"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowPassword(!showPassword),
									className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white/70 transition-colors p-1",
									children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between py-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 cursor-pointer select-none",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: rememberMe,
									onChange: (e) => setRememberMe(e.target.checked),
									className: "sr-only peer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-4.5 h-4.5 rounded border border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-white/5 flex items-center justify-center peer-checked:bg-[#00C2FF] peer-checked:border-[#00C2FF] transition-all",
									children: rememberMe && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "w-3.5 h-3.5 text-white dark:text-black font-bold",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: "3",
											d: "M5 13l4 4L19 7"
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-slate-600 dark:text-white/60",
									children: "Keep me logged in"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						className: "w-full relative h-11 bg-gradient-to-r from-[#00C2FF] to-[#00E5A8] text-[#0A0F1D] dark:text-[#0A0F1D] font-bold rounded-xl shadow-lg hover:shadow-[#00C2FF]/20 hover:scale-[1.01] active:scale-[0.99] transition-all overflow-hidden group border-0 cursor-pointer",
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative z-10",
							children: loading ? "Signing in…" : "Sign In"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-center text-xs text-slate-500 dark:text-white/50 pt-2",
				children: [
					"New here?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth/signup",
						className: "text-sky-600 dark:text-[#00E5A8] hover:text-[#00C2FF] font-semibold hover:underline transition-colors",
						children: "Create an account"
					})
				]
			})
		]
	});
}
//#endregion
export { Login as component };
