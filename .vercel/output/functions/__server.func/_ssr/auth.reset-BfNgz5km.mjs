import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BPK1zgJN.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as resetPassword } from "./auth.functions-D6X1b0I_.mjs";
import { t as Input } from "./input-BYcV5Phs.mjs";
import { J as CircleAlert } from "../_libs/lucide-react.mjs";
import { t as Label } from "./label-qle7VSy6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AlertDescription, t as Alert } from "./alert-DuG7Sg73.mjs";
import { t as Route } from "./auth.reset-X8ZSYJkz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.reset-BfNgz5km.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold",
			children: "New password"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "Enter a secure new password for your account."
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
			variant: "destructive",
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: error })]
		}),
		success ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-600 dark:text-emerald-400",
			children: "Password updated successfully! Redirecting you to login..."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-8 space-y-4",
			onSubmit: handleSubmit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "newPassword",
						children: "New Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "newPassword",
						type: "password",
						required: true,
						value: newPassword,
						onChange: (e) => setNewPassword(e.target.value),
						disabled: loading || !token || !userId
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "confirmPassword",
						children: "Confirm New Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "confirmPassword",
						type: "password",
						required: true,
						value: confirmPassword,
						onChange: (e) => setConfirmPassword(e.target.value),
						disabled: loading || !token || !userId
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full bg-gradient-hero text-primary-foreground shadow-elegant",
					disabled: loading || !token || !userId,
					children: loading ? "Updating..." : "Reset password"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-center text-sm text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/auth/login",
				className: "text-primary hover:underline",
				children: "Back to sign in"
			})
		})
	] });
}
//#endregion
export { ResetPassword as component };
