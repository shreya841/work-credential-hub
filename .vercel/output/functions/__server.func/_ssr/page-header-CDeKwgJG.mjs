import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-header-CDeKwgJG.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/components/page-header.tsx";
function PageHeader({ title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "truncate font-display text-2xl font-bold tracking-tight sm:text-3xl",
				children: title
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 7,
				columnNumber: 9
			}, this), description && /* @__PURE__ */ (void 0)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: description
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 8,
				columnNumber: 25
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 6,
			columnNumber: 7
		}, this), actions && /* @__PURE__ */ (void 0)("div", {
			className: "flex shrink-0 items-center gap-2",
			children: actions
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 10,
			columnNumber: 19
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 5,
		columnNumber: 5
	}, this);
}
//#endregion
export { PageHeader as t };
