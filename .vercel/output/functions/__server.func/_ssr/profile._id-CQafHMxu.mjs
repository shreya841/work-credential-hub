import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BPK1zgJN.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as ShieldOff } from "../_libs/lucide-react.mjs";
import { n as CardContent, t as Card } from "./card-DRtcuf8H.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile._id-CQafHMxu.js
var import_jsx_runtime = require_jsx_runtime();
var SplitNotFoundComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "flex min-h-screen items-center justify-center p-6 text-center",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "max-w-md border-border/60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldOff, { className: "mx-auto h-12 w-12 text-muted-foreground mb-4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "Profile not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-2",
					children: "The profile you are looking for does not exist or has been removed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6",
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Back to home"
					})
				})
			]
		})
	})
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
