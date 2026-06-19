import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BPK1zgJN.mjs";
import { t as Badge } from "./badge-KS2SooOw.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-BbAAdpLg.mjs";
import { c as TrendingUp, d as Star, ot as BadgeCheck } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-DRtcuf8H.mjs";
import { t as PageHeader } from "./page-header-DHJUr0Vr.mjs";
import { n as ChartSkeleton, r as ListSkeleton } from "./loading-skeleton-BKYH7Wpk.mjs";
import { t as EmptyState } from "./empty-state-B-onYlus.mjs";
import { i as listReviews, n as getPerformanceBreakdown, r as getPerformanceRanking } from "./performance.functions-bbiyboZ8.mjs";
import { _ as ResponsiveContainer, a as YAxis, c as CartesianGrid, i as BarChart, l as Bar, o as XAxis, v as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.performance-BIY5frhC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Performance",
		description: "Track ratings, reviews, and trends across your workforce."
	}), rankingLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartSkeleton, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "border-border/60 p-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 5 })
		})]
	}) : !hasRanking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: TrendingUp,
		title: "No performance data yet",
		description: "Performance reviews and rankings will appear here once employee reviews are submitted."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "border-border/60",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex flex-row items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, { children: [selectedEmp?.fullName, " — performance snapshot"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "outline",
					children: [(selectedEmp?.rating ?? 0).toFixed(1), " ★ avg"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "h-72",
				children: breakdownLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted-foreground",
						children: "Loading snapshot..."
					})
				}) : breakdown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center text-sm text-muted-foreground",
					children: "No review details available for this employee."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: breakdown,
						margin: {
							left: -20,
							right: 12
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--color-border)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "m",
								stroke: "var(--color-muted-foreground)",
								fontSize: 12
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								domain: [0, 5],
								stroke: "var(--color-muted-foreground)",
								fontSize: 12
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								background: "var(--color-popover)",
								border: "1px solid var(--color-border)",
								borderRadius: 8
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								name: "Score",
								dataKey: "v",
								fill: "var(--color-chart-1)",
								radius: [
									6,
									6,
									0,
									0
								]
							})
						]
					})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "border-border/60",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Top performers" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "space-y-2 max-h-[320px] overflow-y-auto pr-1",
				children: ranking.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setSelectedId(e.id),
					className: `flex w-full items-center gap-3 rounded-lg border p-2 text-left transition hover:bg-muted/50 ${currentId === e.id ? "border-primary/40 bg-primary/5" : "border-transparent"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "w-5 text-center text-xs text-muted-foreground",
							children: ["#", i + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
							className: "h-8 w-8",
							children: [e.photoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
								src: e.photoUrl,
								alt: e.fullName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: e.fullName[0] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 truncate text-sm font-medium",
								children: [e.fullName, e.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-3 w-3 text-primary shrink-0" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-xs text-muted-foreground",
								children: e.designation
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 text-sm font-semibold shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-warning text-warning" }), e.rating.toFixed(1)]
						})
					]
				}, e.id))
			})]
		})]
	}), selectedEmp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "mt-6 border-border/60",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, { children: ["Review history — ", selectedEmp.fullName] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [reviewsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 3 }) : selReviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "py-6 text-center text-sm text-muted-foreground",
			children: "No reviews submitted yet for this employee."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative space-y-5 border-l border-border/60 pl-6",
			children: selReviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-[27px] top-1 h-4 w-4 rounded-full bg-gradient-hero shadow-elegant" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: new Date(r.createdAt).toLocaleDateString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								children: [r.overall.toFixed(1), " ★"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: ["by ", r.reviewerName]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: r.feedback
					})
				]
			}, r.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 text-right",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				size: "sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/employees/$id",
					params: { id: selectedEmp.id },
					children: "Open profile"
				})
			})
		})] })]
	})] })] });
}
//#endregion
export { PerformancePage as component };
