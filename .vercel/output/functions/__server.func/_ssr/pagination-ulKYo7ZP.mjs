import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as buttonVariants, r as cn } from "./button-DnxMo53r.mjs";
import { X as ChevronRight, Z as ChevronLeft, z as Ellipsis } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pagination-ulKYo7ZP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/components/ui/pagination.tsx";
var Pagination = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
	role: "navigation",
	"aria-label": "pagination",
	className: cn("mx-auto flex w-full justify-center", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 8,
	columnNumber: 3
}, void 0);
Pagination.displayName = "Pagination";
var PaginationContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
	ref,
	className: cn("flex flex-row items-center gap-1", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 19,
	columnNumber: 5
}, void 0));
PaginationContent.displayName = "PaginationContent";
var PaginationItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
	ref,
	className: cn("", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 25,
	columnNumber: 37
}, void 0));
PaginationItem.displayName = "PaginationItem";
var PaginationLink = ({ className, isActive, size = "icon", ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
	"aria-current": isActive ? "page" : void 0,
	className: cn(buttonVariants({
		variant: isActive ? "outline" : "ghost",
		size
	}), className),
	...props
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 35,
	columnNumber: 3
}, void 0);
PaginationLink.displayName = "PaginationLink";
var PaginationPrevious = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PaginationLink, {
	"aria-label": "Go to previous page",
	size: "default",
	className: cn("gap-1 pl-2.5", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronLeft, { className: "h-4 w-4" }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 59,
		columnNumber: 5
	}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Previous" }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 60,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName,
	lineNumber: 53,
	columnNumber: 3
}, void 0);
PaginationPrevious.displayName = "PaginationPrevious";
var PaginationNext = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PaginationLink, {
	"aria-label": "Go to next page",
	size: "default",
	className: cn("gap-1 pr-2.5", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Next" }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 72,
		columnNumber: 5
	}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "h-4 w-4" }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 73,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName,
	lineNumber: 66,
	columnNumber: 3
}, void 0);
PaginationNext.displayName = "PaginationNext";
var PaginationEllipsis = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
	"aria-hidden": true,
	className: cn("flex h-9 w-9 items-center justify-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Ellipsis, { className: "h-4 w-4" }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 84,
		columnNumber: 5
	}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: "sr-only",
		children: "More pages"
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 85,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName,
	lineNumber: 79,
	columnNumber: 3
}, void 0);
PaginationEllipsis.displayName = "PaginationEllipsis";
//#endregion
export { PaginationNext as a, PaginationLink as i, PaginationContent as n, PaginationPrevious as o, PaginationItem as r, Pagination as t };
