import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DnxMo53r.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as loginUser } from "./auth.functions-7eFT9ROn.mjs";
import { t as Input } from "./input-C8wv43d_.mjs";
import { A as Lock, I as Eye, J as CircleAlert, L as EyeOff, O as Mail } from "../_libs/lucide-react.mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as Label } from "./label-ZItyyoZm.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AlertDescription, t as Alert } from "./alert-CMP8_63J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.login-BH0697E7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/routes/auth.login.tsx?tsr-split=component";
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-center space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-300",
					children: "Welcome Back"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 47,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-slate-500 dark:text-white/50 transition-colors duration-300",
					children: "Sign in to your WorkCred workspace to manage trust."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 50,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 46,
				columnNumber: 7
			}, this),
			error && /* @__PURE__ */ (void 0)(Alert, {
				variant: "destructive",
				className: "bg-red-500/10 border-red-500/20 text-red-800 dark:text-red-200",
				children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 56,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)(AlertDescription, {
					className: "text-xs",
					children: error
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 57,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 55,
				columnNumber: 17
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				className: "space-y-4",
				onSubmit: handleSubmit,
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							htmlFor: "email",
							className: "text-xs font-semibold text-slate-700 dark:text-white/70",
							children: "Work Email"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 63,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-white/40" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 67,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								id: "email",
								type: "email",
								required: true,
								placeholder: "you@company.com",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								disabled: loading,
								className: "pl-10 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:border-[#00C2FF] dark:focus:border-[#00C2FF]/50 focus:ring-1 focus:ring-[#00C2FF] dark:focus:ring-[#00C2FF]/50 h-10.5 rounded-xl transition-all"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 68,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 66,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 62,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "password",
								className: "text-xs font-semibold text-slate-700 dark:text-white/70",
								children: "Password"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 75,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/auth/forgot",
								className: "text-xs text-sky-600 dark:text-[#00C2FF] hover:text-emerald-500 dark:hover:text-[#00E5A8] transition-colors",
								children: "Forgot?"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 78,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 74,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-white/40" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 83,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "password",
									type: showPassword ? "text" : "password",
									required: true,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									disabled: loading,
									className: "pl-10 pr-10 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:border-[#00C2FF] dark:focus:border-[#00C2FF]/50 focus:ring-1 focus:ring-[#00C2FF] dark:focus:ring-[#00C2FF]/50 h-10.5 rounded-xl transition-all"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 84,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setShowPassword(!showPassword),
									className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white/70 transition-colors p-1",
									children: showPassword ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EyeOff, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 86,
										columnNumber: 31
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 86,
										columnNumber: 64
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 85,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 82,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 73,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between py-1",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "flex items-center gap-2 cursor-pointer select-none",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "checkbox",
									checked: rememberMe,
									onChange: (e) => setRememberMe(e.target.checked),
									className: "sr-only peer"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 94,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "w-4.5 h-4.5 rounded border border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-white/5 flex items-center justify-center peer-checked:bg-[#00C2FF] peer-checked:border-[#00C2FF] transition-all",
									children: rememberMe && /* @__PURE__ */ (void 0)("svg", {
										className: "w-3.5 h-3.5 text-white dark:text-black font-bold",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ (void 0)("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: "3",
											d: "M5 13l4 4L19 7"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 97,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 96,
										columnNumber: 30
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 95,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs text-slate-600 dark:text-white/60",
									children: "Keep me logged in"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 100,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 93,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 92,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "submit",
						className: "w-full relative h-11 bg-gradient-to-r from-[#00C2FF] to-[#00E5A8] text-[#0A0F1D] dark:text-[#0A0F1D] font-bold rounded-xl shadow-lg hover:shadow-[#00C2FF]/20 hover:scale-[1.01] active:scale-[0.99] transition-all overflow-hidden group border-0 cursor-pointer",
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 106,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "relative z-10",
							children: loading ? "Signing in…" : "Sign In"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 107,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 105,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 60,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-center text-xs text-slate-500 dark:text-white/50 pt-2",
				children: [
					"New here?",
					" ",
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/auth/signup",
						className: "text-sky-600 dark:text-[#00E5A8] hover:text-[#00C2FF] font-semibold hover:underline transition-colors",
						children: "Create an account"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 114,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 112,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 45,
		columnNumber: 10
	}, this);
}
//#endregion
export { Login as component };
