import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BPK1zgJN.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as forgotPassword } from "./auth.functions-D6X1b0I_.mjs";
import { t as Input } from "./input-BYcV5Phs.mjs";
import { t as Label } from "./label-qle7VSy6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.forgot-CQgKFl0V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold",
			children: "Reset password"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "We'll generate a secure reset link."
		}),
		sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-600 dark:text-emerald-400",
			children: "Instructions sent! Check the server console log for the reset link."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-8 space-y-4",
			onSubmit: handleSubmit,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "email",
					children: "Work email"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "email",
					type: "email",
					required: true,
					value: email,
					onChange: (e) => setEmail(e.target.value),
					disabled: loading,
					placeholder: "you@company.com"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full bg-gradient-hero text-primary-foreground shadow-elegant",
				disabled: loading,
				children: loading ? "Sending..." : "Send reset link"
			})]
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
export { Forgot as component };
