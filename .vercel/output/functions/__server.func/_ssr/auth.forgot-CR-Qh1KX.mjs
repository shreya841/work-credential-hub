import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DnxMo53r.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as forgotPassword } from "./auth.functions-7eFT9ROn.mjs";
import { t as Input } from "./input-C8wv43d_.mjs";
import { t as Label } from "./label-ZItyyoZm.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.forgot-CR-Qh1KX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/routes/auth.forgot.tsx?tsr-split=component";
function Forgot() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [sent, setSent] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await forgotPassword({ data: { email } });
			setSent(true);
			toast.success("Reset link generated in server logs");
		} catch (error) {
			console.error(error);
			toast.error("Failed to send reset link");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
			className: "font-display text-3xl font-bold",
			children: "Reset password"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 31,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "We'll generate a secure reset link."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 32,
			columnNumber: 7
		}, this),
		sent ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-8 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-600 dark:text-emerald-400",
			children: "Instructions sent! Check the server console log for the reset link."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 33,
			columnNumber: 15
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
			className: "mt-8 space-y-4",
			onSubmit: handleSubmit,
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
					htmlFor: "email",
					children: "Work email"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 37,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
					id: "email",
					type: "email",
					required: true,
					value: email,
					onChange: (e) => setEmail(e.target.value),
					disabled: loading,
					placeholder: "you@company.com"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 38,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 36,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				className: "w-full bg-gradient-hero text-primary-foreground shadow-elegant",
				disabled: loading,
				children: loading ? "Sending..." : "Send reset link"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 40,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 35,
			columnNumber: 18
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "mt-6 text-center text-sm text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/auth/login",
				className: "text-primary hover:underline",
				children: "Back to sign in"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 45,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 44,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 30,
		columnNumber: 10
	}, this);
}
//#endregion
export { Forgot as component };
