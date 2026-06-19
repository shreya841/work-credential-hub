import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BPK1zgJN.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { rt as Briefcase } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app2.employees._id-DTN1VsQU.js
var import_jsx_runtime = require_jsx_runtime();
var SplitNotFoundComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "flex flex-col items-center justify-center py-20 text-center",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-12 w-12 text-muted-foreground mb-4" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-lg font-semibold",
			children: "Employee not found"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground mt-1",
			children: "The requested employee record does not exist or you do not have permission to view it."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-6",
			variant: "outline",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/app/employees",
				children: "Back to employees"
			})
		})
	]
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
