import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { r as cn } from "./button-DnxMo53r.mjs";
import { t as Badge } from "./badge-GBPLA4QD.mjs";
import { c as TrendingUp, f as Sparkles, h as ShieldCheck, nt as Building2 } from "../_libs/lucide-react.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CCXaAbeo.mjs";
import { r as motion } from "../_libs/framer-motion.mjs";
import { _ as ResponsiveContainer, a as YAxis, c as CartesianGrid, d as Pie, g as Cell, h as Label, i as BarChart, l as Bar, o as XAxis, r as PieChart, s as Area, t as AreaChart, v as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-charts-lazy-BQ9wY-hE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/components/ui/chart.tsx";
var THEMES = {
	light: "",
	dark: ".dark"
};
var ChartContext = import_react.createContext(null);
function useChart() {
	const context = import_react.useContext(ChartContext);
	if (!context) throw new Error("useChart must be used within a <ChartContainer />");
	return context;
}
var ChartContainer = import_react.forwardRef(({ id, className, children, config, ...props }, ref) => {
	const uniqueId = import_react.useId();
	const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartContext.Provider, {
		value: { config },
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			"data-chart": chartId,
			ref,
			className: cn("flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none", className),
			...props,
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartStyle, {
				id: chartId,
				config
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 56,
				columnNumber: 9
			}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResponsiveContainer, { children }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 57,
				columnNumber: 9
			}, void 0)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 47,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 46,
		columnNumber: 5
	}, void 0);
});
ChartContainer.displayName = "Chart";
var ChartStyle = ({ id, config }) => {
	const colorConfig = Object.entries(config).filter(([, config]) => config.theme || config.color);
	if (!colorConfig.length) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("style", { dangerouslySetInnerHTML: { __html: Object.entries(THEMES).map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
		const color = itemConfig.theme?.[theme] || itemConfig.color;
		return color ? `  --color-${key}: ${color};` : null;
	}).join("\n")}
}
`).join("\n") } }, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 72,
		columnNumber: 5
	}, void 0);
};
var ChartTooltip = Tooltip;
var ChartTooltipContent = import_react.forwardRef(({ active, payload, className, indicator = "dot", hideLabel = false, hideIndicator = false, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey }, ref) => {
	const { config } = useChart();
	const tooltipLabel = import_react.useMemo(() => {
		if (hideLabel || !payload?.length) return null;
		const [item] = payload;
		const itemConfig = getPayloadConfigFromPayload(config, item, `${labelKey || item?.dataKey || item?.name || "value"}`);
		const value = !labelKey && typeof label === "string" ? config[label]?.label || label : itemConfig?.label;
		if (labelFormatter) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: cn("font-medium", labelClassName),
			children: labelFormatter(value, payload)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 141,
			columnNumber: 11
		}, void 0);
		if (!value) return null;
		return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: cn("font-medium", labelClassName),
			children: value
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 149,
			columnNumber: 14
		}, void 0);
	}, [
		label,
		labelFormatter,
		payload,
		hideLabel,
		labelClassName,
		config,
		labelKey
	]);
	if (!active || !payload?.length) return null;
	const nestLabel = payload.length === 1 && indicator !== "dot";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref,
		className: cn("grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl", className),
		children: [!nestLabel ? tooltipLabel : null, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-1.5",
			children: payload.filter((item) => item.type !== "none").map((item, index) => {
				const itemConfig = getPayloadConfigFromPayload(config, item, `${nameKey || item.name || item.dataKey || "value"}`);
				const indicatorColor = color || item.payload.fill || item.color;
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: cn("flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground", indicator === "dot" && "items-center"),
					children: formatter && item?.value !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [itemConfig?.icon ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(itemConfig.icon, {}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 188,
						columnNumber: 25
					}, void 0) : !hideIndicator && /* @__PURE__ */ (void 0)("div", {
						className: cn("shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)", {
							"h-2.5 w-2.5": indicator === "dot",
							"w-1": indicator === "line",
							"w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
							"my-0.5": nestLabel && indicator === "dashed"
						}),
						style: {
							"--color-bg": indicatorColor,
							"--color-border": indicatorColor
						}
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 191,
						columnNumber: 27
					}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: cn("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [nestLabel ? tooltipLabel : null, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: itemConfig?.label || item.name
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 219,
								columnNumber: 27
							}, void 0)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 217,
							columnNumber: 25
						}, void 0), item.value && /* @__PURE__ */ (void 0)("span", {
							className: "font-mono font-medium tabular-nums text-foreground",
							children: item.value.toLocaleString()
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 224,
							columnNumber: 27
						}, void 0)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 211,
						columnNumber: 23
					}, void 0)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 186,
						columnNumber: 21
					}, void 0)
				}, item.dataKey, false, {
					fileName: _jsxFileName$1,
					lineNumber: 176,
					columnNumber: 17
				}, void 0);
			})
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 167,
			columnNumber: 9
		}, void 0)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 159,
		columnNumber: 7
	}, void 0);
});
ChartTooltipContent.displayName = "ChartTooltip";
var ChartLegendContent = import_react.forwardRef(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
	const { config } = useChart();
	if (!payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref,
		className: cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className),
		children: payload.filter((item) => item.type !== "none").map((item) => {
			const itemConfig = getPayloadConfigFromPayload(config, item, `${nameKey || item.dataKey || "value"}`);
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"),
				children: [itemConfig?.icon && !hideIcon ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(itemConfig.icon, {}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 280,
					columnNumber: 17
				}, void 0) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "h-2 w-2 shrink-0 rounded-[2px]",
					style: { backgroundColor: item.color }
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 282,
					columnNumber: 17
				}, void 0), itemConfig?.label]
			}, item.value, true, {
				fileName: _jsxFileName$1,
				lineNumber: 273,
				columnNumber: 13
			}, void 0);
		})
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 258,
		columnNumber: 5
	}, void 0);
});
ChartLegendContent.displayName = "ChartLegend";
function getPayloadConfigFromPayload(config, payload, key) {
	if (typeof payload !== "object" || payload === null) return;
	const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
	let configLabelKey = key;
	if (key in payload && typeof payload[key] === "string") configLabelKey = payload[key];
	else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") configLabelKey = payloadPayload[key];
	return configLabelKey in config ? config[configLabelKey] : config[key];
}
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/components/dashboard-charts-lazy.tsx";
var employeeGrowthConfig = {
	hires: {
		label: "Hires",
		color: "var(--color-chart-1)"
	},
	exits: {
		label: "Exits",
		color: "var(--color-chart-4)"
	}
};
var departmentConfig = {
	total: {
		label: "Total employees",
		color: "var(--color-chart-2)"
	},
	verified: {
		label: "Verified employees",
		color: "var(--color-chart-3)"
	}
};
var verificationConfig = {
	pending: {
		label: "Pending",
		color: "var(--color-chart-4)"
	},
	approved: {
		label: "Approved",
		color: "var(--color-chart-3)"
	},
	denied: {
		label: "Denied",
		color: "var(--color-chart-5)"
	}
};
var ratingConfig = { count: {
	label: "Reviews",
	color: "var(--color-chart-1)"
} };
var RATING_COLORS = [
	"oklch(0.65 0.22 22)",
	"oklch(0.72 0.18 45)",
	"oklch(0.78 0.16 80)",
	"oklch(0.70 0.17 155)",
	"oklch(0.70 0.17 220)"
];
function ChartEmptyState({ icon: Icon, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col items-center justify-center py-12 text-center h-[280px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground mb-3",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-6 w-6" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 70,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
				className: "font-display text-sm font-semibold text-foreground",
				children: title
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 73,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-1 max-w-xs text-xs text-muted-foreground",
				children: description
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 74,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 69,
		columnNumber: 5
	}, this);
}
function DashboardCharts({ hiringTrend, departmentAnalytics, verificationStats, ratingDist }) {
	const [activePieIndex, setActivePieIndex] = (0, import_react.useState)(null);
	const hasHiringData = (0, import_react.useMemo)(() => hiringTrend && hiringTrend.some((t) => t.hires > 0 || t.exits > 0), [hiringTrend]);
	const hasDepartmentData = (0, import_react.useMemo)(() => departmentAnalytics && departmentAnalytics.some((d) => d.total > 0), [departmentAnalytics]);
	const hasVerificationData = (0, import_react.useMemo)(() => verificationStats && verificationStats.some((v) => v.count > 0), [verificationStats]);
	const hasRatingData = (0, import_react.useMemo)(() => ratingDist && ratingDist.some((r) => r.count > 0), [ratingDist]);
	const totalVerifications = (0, import_react.useMemo)(() => verificationStats?.reduce((s, v) => s + v.count, 0) ?? 0, [verificationStats]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid gap-5 xl:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
			initial: {
				opacity: 0,
				y: 24
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: {
				duration: .5,
				delay: .25
			},
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
				className: "border-border/60 bg-card/80 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, {
					className: "flex flex-row items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Employee Growth" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 117,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, { children: "Hires and exits over the last 6 months" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 118,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 116,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
						variant: "outline",
						className: "shrink-0 border-success/30 bg-success/8 text-success",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mr-1.5 h-1.5 w-1.5 rounded-full bg-success inline-block animate-pulse" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 121,
							columnNumber: 17
						}, this), "Live"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 120,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 115,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, { children: !hasHiringData ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartEmptyState, {
					icon: TrendingUp,
					title: "No employee growth yet",
					description: "Hiring and exit trends will appear once employee dates are recorded."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 127,
					columnNumber: 17
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartContainer, {
					config: employeeGrowthConfig,
					className: "h-[300px] w-full",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AreaChart, {
						data: hiringTrend,
						margin: {
							left: 0,
							right: 16,
							top: 12
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("defs", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("linearGradient", {
								id: "hiresGradient",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
									offset: "5%",
									stopColor: "var(--color-hires)",
									stopOpacity: .4
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 137,
									columnNumber: 25
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
									offset: "95%",
									stopColor: "var(--color-hires)",
									stopOpacity: .02
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 138,
									columnNumber: 25
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 136,
								columnNumber: 23
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("linearGradient", {
								id: "exitsGradient",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
									offset: "5%",
									stopColor: "var(--color-exits)",
									stopOpacity: .4
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 141,
									columnNumber: 25
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
									offset: "95%",
									stopColor: "var(--color-exits)",
									stopOpacity: .02
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 142,
									columnNumber: 25
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 140,
								columnNumber: 23
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 135,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartesianGrid, {
								vertical: false,
								strokeDasharray: "3 3",
								stroke: "currentColor",
								strokeOpacity: .06
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 145,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(XAxis, {
								dataKey: "month",
								tickLine: false,
								axisLine: false,
								tickMargin: 10,
								tick: { fontSize: 11 }
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 146,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(YAxis, {
								tickLine: false,
								axisLine: false,
								tickMargin: 10,
								tick: { fontSize: 11 }
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 147,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartTooltip, { content: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartTooltipContent, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 148,
								columnNumber: 44
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 148,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Area, {
								name: "Hires",
								type: "monotone",
								dataKey: "hires",
								stroke: "var(--color-hires)",
								strokeWidth: 2,
								fill: "url(#hiresGradient)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 149,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Area, {
								name: "Exits",
								type: "monotone",
								dataKey: "exits",
								stroke: "var(--color-exits)",
								strokeWidth: 2,
								fill: "url(#exitsGradient)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 150,
								columnNumber: 21
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 134,
						columnNumber: 19
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 133,
					columnNumber: 17
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 125,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 114,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 109,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
			initial: {
				opacity: 0,
				y: 24
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: {
				duration: .5,
				delay: .3
			},
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
				className: "border-border/60 bg-card/80 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Department Analytics" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 166,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, { children: "Total vs verified employees by department" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 167,
					columnNumber: 15
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 165,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, { children: !hasDepartmentData ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartEmptyState, {
					icon: Building2,
					title: "No department data",
					description: "Department analytics will appear once employees are registered with departments."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 171,
					columnNumber: 17
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartContainer, {
					config: departmentConfig,
					className: "h-[300px] w-full",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BarChart, {
						data: departmentAnalytics,
						margin: {
							left: 0,
							right: 16,
							top: 12
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartesianGrid, {
								vertical: false,
								strokeDasharray: "3 3",
								stroke: "currentColor",
								strokeOpacity: .06
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 179,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(XAxis, {
								dataKey: "department",
								tickLine: false,
								axisLine: false,
								tickMargin: 10,
								tick: { fontSize: 11 }
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 180,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(YAxis, {
								tickLine: false,
								axisLine: false,
								tickMargin: 10,
								tick: { fontSize: 11 }
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 181,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartTooltip, { content: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartTooltipContent, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 182,
								columnNumber: 44
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 182,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bar, {
								name: "Total employees",
								dataKey: "total",
								fill: "var(--color-total)",
								radius: [
									4,
									4,
									0,
									0
								]
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 183,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bar, {
								name: "Verified employees",
								dataKey: "verified",
								fill: "var(--color-verified)",
								radius: [
									4,
									4,
									0,
									0
								]
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 184,
								columnNumber: 21
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 178,
						columnNumber: 19
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 177,
					columnNumber: 17
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 169,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 164,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 159,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 107,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid gap-5 xl:grid-cols-2 mt-5",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
			initial: {
				opacity: 0,
				y: 24
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: {
				duration: .5,
				delay: .35
			},
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
				className: "border-border/60 bg-card/80 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Verification statistics" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 203,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, { children: "Status of background check requests" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 204,
					columnNumber: 15
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 202,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, { children: !hasVerificationData ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartEmptyState, {
					icon: ShieldCheck,
					title: "No verification data",
					description: "Verification statistics will appear once requests are initiated."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 208,
					columnNumber: 17
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col sm:flex-row items-center gap-6 justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartContainer, {
						config: verificationConfig,
						className: "mx-auto aspect-square h-[200px] w-[200px]",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartTooltip, {
							cursor: false,
							content: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartTooltipContent, { hideLabel: true }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 217,
								columnNumber: 61
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 217,
							columnNumber: 23
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pie, {
							data: verificationStats,
							dataKey: "count",
							nameKey: "status",
							innerRadius: 60,
							strokeWidth: 5,
							children: [verificationStats?.map((entry) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Cell, { fill: `var(--color-${entry.status})` }, entry.status, false, {
								fileName: _jsxFileName,
								lineNumber: 226,
								columnNumber: 27
							}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { content: ({ viewBox }) => {
								if (viewBox && "cx" in viewBox && "cy" in viewBox) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
									x: viewBox.cx,
									y: viewBox.cy,
									textAnchor: "middle",
									dominantBaseline: "middle",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tspan", {
										x: viewBox.cx,
										y: viewBox.cy,
										className: "fill-foreground text-3xl font-bold",
										children: totalVerifications
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 238,
										columnNumber: 35
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tspan", {
										x: viewBox.cx,
										y: (viewBox.cy || 0) + 24,
										className: "fill-muted-foreground text-xs",
										children: "Requests"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 245,
										columnNumber: 35
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 232,
									columnNumber: 33
								}, this);
							} }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 228,
								columnNumber: 25
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 218,
							columnNumber: 23
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 216,
							columnNumber: 21
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 215,
						columnNumber: 19
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex-1 space-y-3 w-full",
						children: verificationStats?.map((entry) => {
							const pct = totalVerifications > 0 ? Math.round(entry.count / totalVerifications * 100) : 0;
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "capitalize font-medium text-foreground",
										children: entry.status
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 267,
										columnNumber: 29
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground tabular-nums",
										children: [
											entry.count,
											" (",
											pct,
											"%)"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 268,
										columnNumber: 29
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 266,
									columnNumber: 27
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "h-1.5 w-full rounded-full bg-border/60 overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
										className: "h-full rounded-full",
										style: { backgroundColor: `var(--color-${entry.status})` },
										initial: { width: 0 },
										animate: { width: `${pct}%` },
										transition: {
											duration: .9,
											ease: "easeOut",
											delay: .3
										}
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 271,
										columnNumber: 29
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 270,
									columnNumber: 27
								}, this)]
							}, entry.status, true, {
								fileName: _jsxFileName,
								lineNumber: 265,
								columnNumber: 25
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 261,
						columnNumber: 19
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 214,
					columnNumber: 17
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 206,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 201,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 196,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
			initial: {
				opacity: 0,
				y: 24
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: {
				duration: .5,
				delay: .44
			},
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
				className: "border-border/60 bg-card/80 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Rating Distribution" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 297,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, { children: "Performance review spread across rating buckets" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 298,
					columnNumber: 15
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 296,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, { children: !hasRatingData ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartEmptyState, {
					icon: Sparkles,
					title: "No ratings yet",
					description: "Rating distribution will appear once performance reviews are submitted."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 302,
					columnNumber: 17
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartContainer, {
					config: ratingConfig,
					className: "h-[300px] w-full",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BarChart, {
						data: ratingDist,
						margin: {
							left: 0,
							right: 16,
							top: 12
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartesianGrid, {
								vertical: false,
								strokeDasharray: "3 3",
								stroke: "currentColor",
								strokeOpacity: .06
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 310,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(XAxis, {
								dataKey: "rating",
								tickLine: false,
								axisLine: false,
								tickMargin: 10,
								tick: { fontSize: 11 }
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 311,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(YAxis, {
								tickLine: false,
								axisLine: false,
								tickMargin: 10,
								allowDecimals: false,
								tick: { fontSize: 11 }
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 312,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartTooltip, { content: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartTooltipContent, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 313,
								columnNumber: 44
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 313,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bar, {
								name: "Reviews",
								dataKey: "count",
								radius: [
									8,
									8,
									0,
									0
								],
								isAnimationActive: true,
								animationDuration: 900,
								children: ratingDist?.map((_, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Cell, {
									fill: RATING_COLORS[idx % RATING_COLORS.length],
									fillOpacity: .85
								}, idx, false, {
									fileName: _jsxFileName,
									lineNumber: 316,
									columnNumber: 25
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 314,
								columnNumber: 21
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 309,
						columnNumber: 19
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 308,
					columnNumber: 17
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 300,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 295,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 290,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 194,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 105,
		columnNumber: 5
	}, this);
}
//#endregion
export { DashboardCharts as default };
