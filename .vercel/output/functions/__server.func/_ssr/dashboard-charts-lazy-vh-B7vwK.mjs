import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { r as cn } from "./button-BPK1zgJN.mjs";
import { t as Badge } from "./badge-KS2SooOw.mjs";
import { c as TrendingUp, f as Sparkles, h as ShieldCheck, nt as Building2 } from "../_libs/lucide-react.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-DRtcuf8H.mjs";
import { r as motion } from "../_libs/framer-motion.mjs";
import { _ as ResponsiveContainer, a as YAxis, c as CartesianGrid, d as Pie, g as Cell, h as Label, i as BarChart, l as Bar, o as XAxis, r as PieChart, s as Area, t as AreaChart, v as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-charts-lazy-vh-B7vwK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContext.Provider, {
		value: { config },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-chart": chartId,
			ref,
			className: cn("flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none", className),
			...props,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartStyle, {
				id: chartId,
				config
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children })]
		})
	});
});
ChartContainer.displayName = "Chart";
var ChartStyle = ({ id, config }) => {
	const colorConfig = Object.entries(config).filter(([, config]) => config.theme || config.color);
	if (!colorConfig.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { dangerouslySetInnerHTML: { __html: Object.entries(THEMES).map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
		const color = itemConfig.theme?.[theme] || itemConfig.color;
		return color ? `  --color-${key}: ${color};` : null;
	}).join("\n")}
}
`).join("\n") } });
};
var ChartTooltip = Tooltip;
var ChartTooltipContent = import_react.forwardRef(({ active, payload, className, indicator = "dot", hideLabel = false, hideIndicator = false, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey }, ref) => {
	const { config } = useChart();
	const tooltipLabel = import_react.useMemo(() => {
		if (hideLabel || !payload?.length) return null;
		const [item] = payload;
		const itemConfig = getPayloadConfigFromPayload(config, item, `${labelKey || item?.dataKey || item?.name || "value"}`);
		const value = !labelKey && typeof label === "string" ? config[label]?.label || label : itemConfig?.label;
		if (labelFormatter) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("font-medium", labelClassName),
			children: labelFormatter(value, payload)
		});
		if (!value) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("font-medium", labelClassName),
			children: value
		});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: cn("grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl", className),
		children: [!nestLabel ? tooltipLabel : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-1.5",
			children: payload.filter((item) => item.type !== "none").map((item, index) => {
				const itemConfig = getPayloadConfigFromPayload(config, item, `${nameKey || item.name || item.dataKey || "value"}`);
				const indicatorColor = color || item.payload.fill || item.color;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground", indicator === "dot" && "items-center"),
					children: formatter && item?.value !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [itemConfig?.icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [nestLabel ? tooltipLabel : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: itemConfig?.label || item.name
							})]
						}), item.value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono font-medium tabular-nums text-foreground",
							children: item.value.toLocaleString()
						})]
					})] })
				}, item.dataKey);
			})
		})]
	});
});
ChartTooltipContent.displayName = "ChartTooltip";
var ChartLegendContent = import_react.forwardRef(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
	const { config } = useChart();
	if (!payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className),
		children: payload.filter((item) => item.type !== "none").map((item) => {
			const itemConfig = getPayloadConfigFromPayload(config, item, `${nameKey || item.dataKey || "value"}`);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"),
				children: [itemConfig?.icon && !hideIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(itemConfig.icon, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-2 w-2 shrink-0 rounded-[2px]",
					style: { backgroundColor: item.color }
				}), itemConfig?.label]
			}, item.value);
		})
	});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-12 text-center h-[280px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-sm font-semibold text-foreground",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-xs text-xs text-muted-foreground",
				children: description
			})
		]
	});
}
function DashboardCharts({ hiringTrend, departmentAnalytics, verificationStats, ratingDist }) {
	const [activePieIndex, setActivePieIndex] = (0, import_react.useState)(null);
	const hasHiringData = (0, import_react.useMemo)(() => hiringTrend && hiringTrend.some((t) => t.hires > 0 || t.exits > 0), [hiringTrend]);
	const hasDepartmentData = (0, import_react.useMemo)(() => departmentAnalytics && departmentAnalytics.some((d) => d.total > 0), [departmentAnalytics]);
	const hasVerificationData = (0, import_react.useMemo)(() => verificationStats && verificationStats.some((v) => v.count > 0), [verificationStats]);
	const hasRatingData = (0, import_react.useMemo)(() => ratingDist && ratingDist.some((r) => r.count > 0), [ratingDist]);
	const totalVerifications = (0, import_react.useMemo)(() => verificationStats?.reduce((s, v) => s + v.count, 0) ?? 0, [verificationStats]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5 xl:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-border/60 bg-card/80 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex flex-row items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Employee Growth" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Hires and exits over the last 6 months" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "shrink-0 border-success/30 bg-success/8 text-success",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mr-1.5 h-1.5 w-1.5 rounded-full bg-success inline-block animate-pulse" }), "Live"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: !hasHiringData ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartEmptyState, {
					icon: TrendingUp,
					title: "No employee growth yet",
					description: "Hiring and exit trends will appear once employee dates are recorded."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
					config: employeeGrowthConfig,
					className: "h-[300px] w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data: hiringTrend,
						margin: {
							left: 0,
							right: 16,
							top: 12
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "hiresGradient",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "5%",
									stopColor: "var(--color-hires)",
									stopOpacity: .4
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "95%",
									stopColor: "var(--color-hires)",
									stopOpacity: .02
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "exitsGradient",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "5%",
									stopColor: "var(--color-exits)",
									stopOpacity: .4
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "95%",
									stopColor: "var(--color-exits)",
									stopOpacity: .02
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								vertical: false,
								strokeDasharray: "3 3",
								stroke: "currentColor",
								strokeOpacity: .06
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "month",
								tickLine: false,
								axisLine: false,
								tickMargin: 10,
								tick: { fontSize: 11 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tickLine: false,
								axisLine: false,
								tickMargin: 10,
								tick: { fontSize: 11 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								name: "Hires",
								type: "monotone",
								dataKey: "hires",
								stroke: "var(--color-hires)",
								strokeWidth: 2,
								fill: "url(#hiresGradient)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								name: "Exits",
								type: "monotone",
								dataKey: "exits",
								stroke: "var(--color-exits)",
								strokeWidth: 2,
								fill: "url(#exitsGradient)"
							})
						]
					})
				}) })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-border/60 bg-card/80 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Department Analytics" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Total vs verified employees by department" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: !hasDepartmentData ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartEmptyState, {
					icon: Building2,
					title: "No department data",
					description: "Department analytics will appear once employees are registered with departments."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
					config: departmentConfig,
					className: "h-[300px] w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: departmentAnalytics,
						margin: {
							left: 0,
							right: 16,
							top: 12
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								vertical: false,
								strokeDasharray: "3 3",
								stroke: "currentColor",
								strokeOpacity: .06
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "department",
								tickLine: false,
								axisLine: false,
								tickMargin: 10,
								tick: { fontSize: 11 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tickLine: false,
								axisLine: false,
								tickMargin: 10,
								tick: { fontSize: 11 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								name: "Total employees",
								dataKey: "total",
								fill: "var(--color-total)",
								radius: [
									4,
									4,
									0,
									0
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								name: "Verified employees",
								dataKey: "verified",
								fill: "var(--color-verified)",
								radius: [
									4,
									4,
									0,
									0
								]
							})
						]
					})
				}) })]
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5 xl:grid-cols-2 mt-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-border/60 bg-card/80 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Verification statistics" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Status of background check requests" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: !hasVerificationData ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartEmptyState, {
					icon: ShieldCheck,
					title: "No verification data",
					description: "Verification statistics will appear once requests are initiated."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row items-center gap-6 justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
						config: verificationConfig,
						className: "mx-auto aspect-square h-[200px] w-[200px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
							cursor: false,
							content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, { hideLabel: true })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pie, {
							data: verificationStats,
							dataKey: "count",
							nameKey: "status",
							innerRadius: 60,
							strokeWidth: 5,
							children: [verificationStats?.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: `var(--color-${entry.status})` }, entry.status)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { content: ({ viewBox }) => {
								if (viewBox && "cx" in viewBox && "cy" in viewBox) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
									x: viewBox.cx,
									y: viewBox.cy,
									textAnchor: "middle",
									dominantBaseline: "middle",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tspan", {
										x: viewBox.cx,
										y: viewBox.cy,
										className: "fill-foreground text-3xl font-bold",
										children: totalVerifications
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tspan", {
										x: viewBox.cx,
										y: (viewBox.cy || 0) + 24,
										className: "fill-muted-foreground text-xs",
										children: "Requests"
									})]
								});
							} })]
						})] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 space-y-3 w-full",
						children: verificationStats?.map((entry) => {
							const pct = totalVerifications > 0 ? Math.round(entry.count / totalVerifications * 100) : 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "capitalize font-medium text-foreground",
										children: entry.status
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground tabular-nums",
										children: [
											entry.count,
											" (",
											pct,
											"%)"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-1.5 w-full rounded-full bg-border/60 overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										className: "h-full rounded-full",
										style: { backgroundColor: `var(--color-${entry.status})` },
										initial: { width: 0 },
										animate: { width: `${pct}%` },
										transition: {
											duration: .9,
											ease: "easeOut",
											delay: .3
										}
									})
								})]
							}, entry.status);
						})
					})]
				}) })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-border/60 bg-card/80 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Rating Distribution" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Performance review spread across rating buckets" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: !hasRatingData ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartEmptyState, {
					icon: Sparkles,
					title: "No ratings yet",
					description: "Rating distribution will appear once performance reviews are submitted."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
					config: ratingConfig,
					className: "h-[300px] w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: ratingDist,
						margin: {
							left: 0,
							right: 16,
							top: 12
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								vertical: false,
								strokeDasharray: "3 3",
								stroke: "currentColor",
								strokeOpacity: .06
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "rating",
								tickLine: false,
								axisLine: false,
								tickMargin: 10,
								tick: { fontSize: 11 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tickLine: false,
								axisLine: false,
								tickMargin: 10,
								allowDecimals: false,
								tick: { fontSize: 11 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
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
								children: ratingDist?.map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									fill: RATING_COLORS[idx % RATING_COLORS.length],
									fillOpacity: .85
								}, idx))
							})
						]
					})
				}) })]
			})
		})]
	})] });
}
//#endregion
export { DashboardCharts as default };
