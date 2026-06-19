import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DnxMo53r.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as resetPassword } from "./auth.functions-7eFT9ROn.mjs";
import { t as Input } from "./input-C8wv43d_.mjs";
import { J as CircleAlert } from "../_libs/lucide-react.mjs";
import { t as Label } from "./label-ZItyyoZm.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AlertDescription, t as Alert } from "./alert-CMP8_63J.mjs";
import { t as Route } from "./auth.reset-Dyccxo3J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.reset-B3sYMzDF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/routes/auth.reset.tsx?tsr-split=component";
function ResetPassword() {
	const { token, userId } = Route.useSearch();
	const navigate = useNavigate();
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [success, setSuccess] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!token || !userId) {
			setError("Invalid password reset link. Please request a new one.");
			return;
		}
		if (newPassword.length < 8) {
			setError("Password must be at least 8 characters long.");
			return;
		}
		if (newPassword !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}
		setLoading(true);
		setError(null);
		try {
			await resetPassword({ data: {
				userId,
				token,
				newPassword
			} });
			setSuccess(true);
			toast.success("Password reset successful!");
			setTimeout(() => {
				navigate({ to: "/auth/login" });
			}, 2e3);
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err.message : "Failed to reset password.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
			className: "font-display text-3xl font-bold",
			children: "New password"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 61,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "Enter a secure new password for your account."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 62,
			columnNumber: 7
		}, this),
		error && /* @__PURE__ */ (void 0)(Alert, {
			variant: "destructive",
			className: "mt-6",
			children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "h-4 w-4" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 65,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)(AlertDescription, { children: error }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 66,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 64,
			columnNumber: 17
		}, this),
		success ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-8 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-600 dark:text-emerald-400",
			children: "Password updated successfully! Redirecting you to login..."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 69,
			columnNumber: 18
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
			className: "mt-8 space-y-4",
			onSubmit: handleSubmit,
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						htmlFor: "newPassword",
						children: "New Password"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 73,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						id: "newPassword",
						type: "password",
						required: true,
						value: newPassword,
						onChange: (e) => setNewPassword(e.target.value),
						disabled: loading || !token || !userId
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 74,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						htmlFor: "confirmPassword",
						children: "Confirm New Password"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 77,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						id: "confirmPassword",
						type: "password",
						required: true,
						value: confirmPassword,
						onChange: (e) => setConfirmPassword(e.target.value),
						disabled: loading || !token || !userId
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 78,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 76,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					className: "w-full bg-gradient-hero text-primary-foreground shadow-elegant",
					disabled: loading || !token || !userId,
					children: loading ? "Updating..." : "Reset password"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 80,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 71,
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
				lineNumber: 86,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 85,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 60,
		columnNumber: 10
	}, this);
}
//#endregion
export { ResetPassword as component };
