import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DnxMo53r.mjs";
import { n as CardContent, t as Card } from "./card-CCXaAbeo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/empty-state-DmMIw0uj.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/components/empty-state.tsx";
function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
		className: "border-dashed border-border/60",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
			className: "grid place-items-center py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto grid h-14 w-14 place-items-center rounded-xl bg-muted text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-7 w-7" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 18,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 17,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "mt-4 font-display text-lg font-semibold",
					children: title
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 20,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 max-w-sm text-center text-sm text-muted-foreground",
					children: description
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 21,
					columnNumber: 9
				}, this),
				actionLabel && onAction && /* @__PURE__ */ (void 0)(Button, {
					onClick: onAction,
					className: "mt-6 bg-gradient-hero text-primary-foreground shadow-elegant",
					children: actionLabel
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 23,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 16,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 15,
		columnNumber: 5
	}, this);
}
//#endregion
export { EmptyState as t };
