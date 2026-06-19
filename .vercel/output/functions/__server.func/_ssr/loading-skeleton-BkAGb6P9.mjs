import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Skeleton } from "./skeleton-W2p1PR5p.mjs";
import { i as CardHeader, n as CardContent, t as Card } from "./card-CCXaAbeo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/loading-skeleton-BkAGb6P9.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/components/loading-skeleton.tsx";
function TableSkeleton({ rows = 5, columns = 5 }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "overflow-hidden rounded-lg border",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "border-b bg-muted/30 px-4 py-3",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-4",
				style: { gridTemplateColumns: `repeat(${columns}, 1fr)` },
				children: Array.from({ length: columns }).map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-4 w-20" }, i, false, {
					fileName: _jsxFileName,
					lineNumber: 12,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 10,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 9,
			columnNumber: 7
		}, this), Array.from({ length: rows }).map((_, rowIdx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "border-b px-4 py-3 last:border-b-0",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid items-center gap-4",
				style: { gridTemplateColumns: `repeat(${columns}, 1fr)` },
				children: Array.from({ length: columns }).map((_, colIdx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: `h-4 ${colIdx === 0 ? "w-32" : "w-20"}` }, colIdx, false, {
					fileName: _jsxFileName,
					lineNumber: 20,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 18,
				columnNumber: 11
			}, this)
		}, rowIdx, false, {
			fileName: _jsxFileName,
			lineNumber: 17,
			columnNumber: 9
		}, this))]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 8,
		columnNumber: 5
	}, this);
}
function CardGridSkeleton({ count = 6 }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
		children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
			className: "border-border/60 bg-gradient-card",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-12 w-12 rounded-xl" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 41,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex-1 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-5 w-32" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 43,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-3 w-20" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 44,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 42,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 40,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-4 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-3 w-full" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 48,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-3 w-3/4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 49,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-3 w-1/2" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 50,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 47,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-4 flex items-center justify-between border-t pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-5 w-16 rounded-full" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 53,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-8 w-14" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 54,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 52,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 39,
				columnNumber: 11
			}, this)
		}, i, false, {
			fileName: _jsxFileName,
			lineNumber: 38,
			columnNumber: 9
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 36,
		columnNumber: 5
	}, this);
}
function StatCardSkeleton({ count = 4 }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
		children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
			className: "border-border/60 bg-gradient-card",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
				className: "p-5",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-3 w-24" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 73,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-8 w-16" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 74,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-3 w-20" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 75,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 72,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-10 w-10 rounded-lg" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 77,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 70,
				columnNumber: 11
			}, this)
		}, i, false, {
			fileName: _jsxFileName,
			lineNumber: 69,
			columnNumber: 9
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 67,
		columnNumber: 5
	}, this);
}
function ChartSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
		className: "border-border/60 bg-gradient-card",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, {
			className: "flex flex-row items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-5 w-32" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 92,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-5 w-24 rounded-full" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 93,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 91,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
			className: "h-64",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex h-full items-end gap-2 px-4 pb-4",
				children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, {
					className: "flex-1 rounded-t-md",
					style: { height: `${20 + Math.random() * 60}%` }
				}, i, false, {
					fileName: _jsxFileName,
					lineNumber: 98,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 96,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 95,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 90,
		columnNumber: 5
	}, this);
}
function ProfileSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
		className: "overflow-hidden border-border/60 bg-gradient-card",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-24 bg-gradient-hero" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 115,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
			className: "-mt-12 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-24 w-24 rounded-full" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 118,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex-1 space-y-2 pt-12",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-6 w-48" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 120,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-4 w-64" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 121,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 119,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 117,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-16 rounded-lg" }, i, false, {
					fileName: _jsxFileName,
					lineNumber: 126,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 124,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 116,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 114,
		columnNumber: 5
	}, this);
}
function ListSkeleton({ count = 6 }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-3",
		children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-3 rounded-lg border p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-10 w-10 rounded-lg" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 141,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex-1 space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-4 w-32" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 143,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-3 w-48" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 144,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 142,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, { className: "h-8 w-20" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 146,
					columnNumber: 11
				}, this)
			]
		}, i, true, {
			fileName: _jsxFileName,
			lineNumber: 140,
			columnNumber: 9
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 138,
		columnNumber: 5
	}, this);
}
//#endregion
export { StatCardSkeleton as a, ProfileSkeleton as i, ChartSkeleton as n, TableSkeleton as o, ListSkeleton as r, CardGridSkeleton as t };
