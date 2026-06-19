import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BPK1zgJN.mjs";
import { n as CardContent, t as Card } from "./card-DRtcuf8H.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/empty-state-B-onYlus.js
var import_jsx_runtime = require_jsx_runtime();
function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "border-dashed border-border/60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "grid place-items-center py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid h-14 w-14 place-items-center rounded-xl bg-muted text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-7 w-7" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-4 font-display text-lg font-semibold",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-sm text-center text-sm text-muted-foreground",
					children: description
				}),
				actionLabel && onAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: onAction,
					className: "mt-6 bg-gradient-hero text-primary-foreground shadow-elegant",
					children: actionLabel
				})
			]
		})
	});
}
//#endregion
export { EmptyState as t };
