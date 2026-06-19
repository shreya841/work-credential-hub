import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DnxMo53r.mjs";
import { t as Badge } from "./badge-GBPLA4QD.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-B-3oHQMO.mjs";
import { c as TrendingUp, d as Star, ot as BadgeCheck } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CCXaAbeo.mjs";
import { t as PageHeader } from "./page-header-CDeKwgJG.mjs";
import { n as ChartSkeleton, r as ListSkeleton } from "./loading-skeleton-BkAGb6P9.mjs";
import { t as EmptyState } from "./empty-state-DmMIw0uj.mjs";
import { i as listReviews, n as getPerformanceBreakdown, r as getPerformanceRanking } from "./performance.functions-Ct0qpQiJ.mjs";
import { _ as ResponsiveContainer, a as YAxis, c as CartesianGrid, i as BarChart, l as Bar, o as XAxis, v as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.performance-BZNOa7TV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/routes/app.performance.tsx?tsr-split=component";
function PerformancePage() {
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const { data: ranking = [], isLoading: rankingLoading } = useQuery({
		queryKey: ["performance-ranking"],
		queryFn: () => getPerformanceRanking()
	});
	const currentId = selectedId || ranking[0]?.id || null;
	const { data: breakdownData, isLoading: breakdownLoading } = useQuery({
		queryKey: ["performance-breakdown", currentId],
		queryFn: () => getPerformanceBreakdown({ data: { employeeId: currentId } }),
		enabled: !!currentId
	});
	const { data: selReviews = [], isLoading: reviewsLoading } = useQuery({
		queryKey: ["performance-history", currentId],
		queryFn: () => listReviews({ data: { employeeId: currentId } }),
		enabled: !!currentId
	});
	const selectedEmp = ranking.find((r) => r.id === currentId) || ranking[0];
	const breakdown = breakdownData?.metrics ? [
		{
			m: "Productivity",
			v: breakdownData.metrics.productivity
		},
		{
			m: "Teamwork",
			v: breakdownData.metrics.teamwork
		},
		{
			m: "Comm.",
			v: breakdownData.metrics.communication
		},
		{
			m: "Attendance",
			v: breakdownData.metrics.attendance
		},
		{
			m: "Leadership",
			v: breakdownData.metrics.leadership
		}
	] : [];
	const hasRanking = ranking.length > 0;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
		title: "Performance",
		description: "Track ratings, reviews, and trends across your workforce."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 73,
		columnNumber: 7
	}, this), rankingLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartSkeleton, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 76,
			columnNumber: 11
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
			className: "border-border/60 p-5",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ListSkeleton, { count: 5 }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 78,
				columnNumber: 13
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 77,
			columnNumber: 11
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 75,
		columnNumber: 25
	}, this) : !hasRanking ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EmptyState, {
		icon: TrendingUp,
		title: "No performance data yet",
		description: "Performance reviews and rankings will appear here once employee reviews are submitted."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 80,
		columnNumber: 32
	}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
			className: "border-border/60",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, {
				className: "flex flex-row items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: [selectedEmp?.fullName, " — performance snapshot"] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 85,
					columnNumber: 17
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
					variant: "outline",
					children: [(selectedEmp?.rating ?? 0).toFixed(1), " ★ avg"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 86,
					columnNumber: 17
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 84,
				columnNumber: 15
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
				className: "h-72",
				children: breakdownLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex h-full items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-sm text-muted-foreground",
						children: "Loading snapshot..."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 90,
						columnNumber: 21
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 89,
					columnNumber: 37
				}, this) : breakdown.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex h-full items-center justify-center text-sm text-muted-foreground",
					children: "No review details available for this employee."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 91,
					columnNumber: 53
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BarChart, {
						data: breakdown,
						margin: {
							left: -20,
							right: 12
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--color-border)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 98,
								columnNumber: 23
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(XAxis, {
								dataKey: "m",
								stroke: "var(--color-muted-foreground)",
								fontSize: 12
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 99,
								columnNumber: 23
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(YAxis, {
								domain: [0, 5],
								stroke: "var(--color-muted-foreground)",
								fontSize: 12
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 100,
								columnNumber: 23
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tooltip, { contentStyle: {
								background: "var(--color-popover)",
								border: "1px solid var(--color-border)",
								borderRadius: 8
							} }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 101,
								columnNumber: 23
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bar, {
								name: "Score",
								dataKey: "v",
								fill: "var(--color-chart-1)",
								radius: [
									6,
									6,
									0,
									0
								]
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 106,
								columnNumber: 23
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 94,
						columnNumber: 21
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 93,
					columnNumber: 28
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 88,
				columnNumber: 15
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 83,
			columnNumber: 13
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
			className: "border-border/60",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Top performers" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 115,
				columnNumber: 17
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 114,
				columnNumber: 15
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
				className: "space-y-2 max-h-[320px] overflow-y-auto pr-1",
				children: ranking.map((e, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => setSelectedId(e.id),
					className: `flex w-full items-center gap-3 rounded-lg border p-2 text-left transition hover:bg-muted/50 ${currentId === e.id ? "border-primary/40 bg-primary/5" : "border-transparent"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "w-5 text-center text-xs text-muted-foreground",
							children: ["#", i + 1]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 119,
							columnNumber: 21
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, {
							className: "h-8 w-8",
							children: [e.photoUrl && /* @__PURE__ */ (void 0)(AvatarImage, {
								src: e.photoUrl,
								alt: e.fullName
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 121,
								columnNumber: 38
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AvatarFallback, { children: e.fullName[0] }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 122,
								columnNumber: 23
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 120,
							columnNumber: 21
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1 truncate text-sm font-medium",
								children: [e.fullName, e.verified && /* @__PURE__ */ (void 0)(BadgeCheck, { className: "h-3 w-3 text-primary shrink-0" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 127,
									columnNumber: 40
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 125,
								columnNumber: 23
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "truncate text-xs text-muted-foreground",
								children: e.designation
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 129,
								columnNumber: 23
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 124,
							columnNumber: 21
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1 text-sm font-semibold shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "h-3.5 w-3.5 fill-warning text-warning" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 132,
								columnNumber: 23
							}, this), e.rating.toFixed(1)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 131,
							columnNumber: 21
						}, this)
					]
				}, e.id, true, {
					fileName: _jsxFileName,
					lineNumber: 118,
					columnNumber: 40
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 117,
				columnNumber: 15
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 113,
			columnNumber: 13
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 81,
		columnNumber: 11
	}, this), selectedEmp && /* @__PURE__ */ (void 0)(Card, {
		className: "mt-6 border-border/60",
		children: [/* @__PURE__ */ (void 0)(CardHeader, { children: /* @__PURE__ */ (void 0)(CardTitle, { children: ["Review history — ", selectedEmp.fullName] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 143,
			columnNumber: 17
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 142,
			columnNumber: 15
		}, this), /* @__PURE__ */ (void 0)(CardContent, { children: [reviewsLoading ? /* @__PURE__ */ (void 0)(ListSkeleton, { count: 3 }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 146,
			columnNumber: 35
		}, this) : selReviews.length === 0 ? /* @__PURE__ */ (void 0)("div", {
			className: "py-6 text-center text-sm text-muted-foreground",
			children: "No reviews submitted yet for this employee."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 146,
			columnNumber: 90
		}, this) : /* @__PURE__ */ (void 0)("div", {
			className: "relative space-y-5 border-l border-border/60 pl-6",
			children: selReviews.map((r) => /* @__PURE__ */ (void 0)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (void 0)("div", { className: "absolute -left-[27px] top-1 h-4 w-4 rounded-full bg-gradient-hero shadow-elegant" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 150,
						columnNumber: 25
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (void 0)("span", {
								className: "font-semibold",
								children: new Date(r.createdAt).toLocaleDateString()
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 152,
								columnNumber: 27
							}, this),
							/* @__PURE__ */ (void 0)(Badge, {
								variant: "outline",
								children: [r.overall.toFixed(1), " ★"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 153,
								columnNumber: 27
							}, this),
							/* @__PURE__ */ (void 0)("span", {
								className: "text-xs text-muted-foreground",
								children: ["by ", r.reviewerName]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 154,
								columnNumber: 27
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 151,
						columnNumber: 25
					}, this),
					/* @__PURE__ */ (void 0)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: r.feedback
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 156,
						columnNumber: 25
					}, this)
				]
			}, r.id, true, {
				fileName: _jsxFileName,
				lineNumber: 149,
				columnNumber: 42
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 148,
			columnNumber: 28
		}, this), /* @__PURE__ */ (void 0)("div", {
			className: "mt-4 text-right",
			children: /* @__PURE__ */ (void 0)(Button, {
				asChild: true,
				variant: "outline",
				size: "sm",
				children: /* @__PURE__ */ (void 0)(Link, {
					to: "/app/employees/$id",
					params: { id: selectedEmp.id },
					children: "Open profile"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 161,
					columnNumber: 21
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 160,
				columnNumber: 19
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 159,
			columnNumber: 17
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 145,
			columnNumber: 15
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 141,
		columnNumber: 27
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 80,
		columnNumber: 200
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 72,
		columnNumber: 10
	}, this);
}
//#endregion
export { PerformancePage as component };
