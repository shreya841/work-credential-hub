import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DnxMo53r.mjs";
import { t as Badge } from "./badge-GBPLA4QD.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-Cj2KU_kF.mjs";
import { c as stringType, o as objectType } from "../_libs/zod.mjs";
import { t as Input } from "./input-C8wv43d_.mjs";
import { n as useAuth } from "./auth-provider-CtLo-iYA.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-B-3oHQMO.mjs";
import { $ as Check, B as EllipsisVertical, C as Plus, F as FileText, N as Globe, O as Mail, R as ExternalLink, S as RefreshCw, T as Phone, U as Clock, a as UserPlus, at as Ban, c as TrendingUp, ct as ArrowUpRight, d as Star, dt as Archive, et as Calendar, f as Sparkles, ft as Activity, g as ShieldAlert, h as ShieldCheck, l as TrendingDown, n as X, nt as Building2, o as UserCheck, ot as BadgeCheck, q as CircleCheck, r as Users, rt as Briefcase, s as TriangleAlert, t as Zap, u as Trash2 } from "../_libs/lucide-react.mjs";
import { a as DropdownMenuSeparator, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-D50QXS9o.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CCXaAbeo.mjs";
import { t as PageHeader } from "./page-header-CDeKwgJG.mjs";
import { a as StatCardSkeleton, n as ChartSkeleton, r as ListSkeleton } from "./loading-skeleton-BkAGb6P9.mjs";
import { t as EmptyState } from "./empty-state-DmMIw0uj.mjs";
import { t as Label$1 } from "./label-ZItyyoZm.mjs";
import { a as DialogFooter, i as DialogDescription, n as DialogClose, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-BgWFhrxr.mjs";
import { a as listCompanies, i as getCompanyDeleteImpact, n as deleteCompany, o as updateCompany, r as getCompanyById } from "./companies.functions-D13kaRIC.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as listVerificationRequests, r as resolveVerificationRequest } from "./verification2.functions-Cb33ooCo.mjs";
import { i as AnimatePresence, r as motion, t as useInView } from "../_libs/framer-motion.mjs";
import { a as getEmployeeByUserId, s as getEmploymentHistory, t as addEmploymentHistory } from "./employees.functions-DNhepElv.mjs";
import { i as listReviews } from "./performance.functions-Ct0qpQiJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.dashboard-DJdzQqVo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/components/stat-card.tsx";
function useCountUp(target, duration = 1100) {
	const [value, setValue] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (target === 0) {
			setValue(0);
			return;
		}
		let start = null;
		let id;
		const step = (ts) => {
			if (!start) start = ts;
			const progress = Math.min((ts - start) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			setValue(Math.round(eased * target));
			if (progress < 1) id = requestAnimationFrame(step);
		};
		id = requestAnimationFrame(step);
		return () => cancelAnimationFrame(id);
	}, [target, duration]);
	return value;
}
var TONE = {
	primary: {
		gradient: "from-primary/18 via-primary/6 to-transparent",
		text: "text-primary",
		iconBg: "bg-primary/12",
		glowBg: "bg-primary/20",
		borderGlow: "from-primary/50 via-primary/20 to-transparent"
	},
	success: {
		gradient: "from-success/18 via-success/6 to-transparent",
		text: "text-success",
		iconBg: "bg-success/12",
		glowBg: "bg-success/18",
		borderGlow: "from-success/50 via-success/20 to-transparent"
	},
	accent: {
		gradient: "from-accent/18 via-accent/6 to-transparent",
		text: "text-accent",
		iconBg: "bg-accent/12",
		glowBg: "bg-accent/18",
		borderGlow: "from-accent/50 via-accent/20 to-transparent"
	},
	warning: {
		gradient: "from-warning/18 via-warning/6 to-transparent",
		text: "text-warning",
		iconBg: "bg-warning/12",
		glowBg: "bg-warning/18",
		borderGlow: "from-warning/50 via-warning/20 to-transparent"
	},
	destructive: {
		gradient: "from-destructive/18 via-destructive/6 to-transparent",
		text: "text-destructive",
		iconBg: "bg-destructive/12",
		glowBg: "bg-destructive/18",
		borderGlow: "from-destructive/50 via-destructive/20 to-transparent"
	}
};
function StatCard({ label, value, icon: Icon, trend, tone = "primary" }) {
	const numericVal = typeof value === "number" ? value : Number(value) || 0;
	const isNumeric = typeof value === "number" || !isNaN(Number(value)) && String(value).trim() !== "";
	const animated = useCountUp(numericVal);
	const display = isNumeric ? animated : value;
	const trendUp = trend?.includes("+") || trend?.startsWith("↑");
	const trendDown = !trendUp && (trend?.includes("-") || trend?.startsWith("↓"));
	const s = TONE[tone];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
		whileHover: {
			y: -6,
			scale: 1.025
		},
		whileTap: { scale: .975 },
		transition: {
			type: "spring",
			stiffness: 380,
			damping: 22
		},
		className: "group relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `pointer-events-none absolute -inset-3 rounded-2xl ${s.glowBg} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-80` }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 96,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-br ${s.borderGlow} opacity-0 transition-opacity duration-300 group-hover:opacity-100` }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 100,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative overflow-hidden rounded-xl border border-border/60 bg-card/90 p-5 backdrop-blur-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `pointer-events-none absolute inset-0 bg-gradient-to-br ${s.gradient}` }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 107,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 109,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[11px] font-semibold uppercase tracking-widest text-muted-foreground",
									children: label
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 113,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-2 font-display text-3xl font-bold tracking-tight tabular-nums",
									children: display
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 116,
									columnNumber: 13
								}, this),
								trend && /* @__PURE__ */ (void 0)("p", {
									className: `mt-1.5 inline-flex items-center gap-1 text-xs font-semibold ${trendUp ? "text-success" : trendDown ? "text-destructive" : "text-muted-foreground"}`,
									children: [trendUp ? /* @__PURE__ */ (void 0)(TrendingUp, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 130,
										columnNumber: 19
									}, this) : trendDown ? /* @__PURE__ */ (void 0)(TrendingDown, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 132,
										columnNumber: 19
									}, this) : null, trend]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 120,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 112,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
							whileHover: {
								rotate: 10,
								scale: 1.18
							},
							transition: {
								type: "spring",
								stiffness: 300,
								damping: 14
							},
							className: `grid h-12 w-12 shrink-0 place-items-center rounded-xl ${s.iconBg} ${s.text} ring-1 ring-border/30 transition-shadow duration-300 group-hover:shadow-elegant`,
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 144,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 139,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 111,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 105,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 89,
		columnNumber: 5
	}, this);
}
var getDashboardData = createServerFn({ method: "GET" }).handler(createSsrRpc("b6fc71d242071d137840a72f04ba960c612aa824c43b4cfe38cfc23bbd85efa6"));
createServerFn({ method: "GET" }).handler(createSsrRpc("ef21b06479268871cc4e7e459f6137b9840ddddb3d146fa9773ea638f11e3575"));
createServerFn({ method: "GET" }).handler(createSsrRpc("c3be863bd11c1e4d9b7b69eae22011fdd3a3e20c54da3ba5d1cb95828f52f4e9"));
createServerFn({ method: "GET" }).handler(createSsrRpc("fba27a3b571a8021c0bb3035cf4a15ae837cb672619ff16bd1ca0c6dd487d531"));
createServerFn({ method: "GET" }).handler(createSsrRpc("a8a5cb0f357ad168109cfd842934d2116142c72593b26a602d230a02dbd6af5e"));
createServerFn({ method: "GET" }).handler(createSsrRpc("e6e18f562728d0bfab4008c6843e4c799938baa679149ad74c66fd48c880236f"));
createServerFn({ method: "GET" }).handler(createSsrRpc("3293efc06e67d6a705f219868153ba7786762c2d2fc81f3083b67f5227717851"));
var getRecentActivity = createServerFn({ method: "GET" }).handler(createSsrRpc("6d120a8e7b8253c5bc8b0b79f091b14936d9eee15650bc736a29d59e5cba983b"));
createServerFn({ method: "POST" }).validator(objectType({
	companyId: stringType(),
	reviewerId: stringType()
})).handler(createSsrRpc("6c8786950acc351e0a4d2be279fedbde63f28b3ab0ce8e16890348d0e40b4f26"));
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/routes/app.dashboard.tsx?tsr-split=component";
var DashboardCharts = (0, import_react.lazy)(() => import("./dashboard-charts-lazy-BQ9wY-hE.mjs"));
var RADIAL_PALETTE = [
	"#00C2FF",
	"#EE2439",
	"#911A79",
	"#40C1C0",
	"#F69336"
];
function MiniSparkBar({ values, color }) {
	if (!values || values.length === 0) return null;
	const max = Math.max(...values, 1);
	const W = 80;
	const H = 28;
	const gap = 2;
	const barW = Math.max((W - gap * (values.length - 1)) / values.length, 2);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		width: W,
		height: H,
		className: "mx-auto mt-1",
		children: [values.map((v, i) => {
			const bH = Math.max(v / max * (H - 4), 2);
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("rect", {
				x: i * (barW + gap),
				y: H - bH,
				width: barW,
				height: bH,
				fill: color,
				fillOpacity: .75,
				rx: 1.5
			}, i, false, {
				fileName: _jsxFileName,
				lineNumber: 62,
				columnNumber: 14
			}, this);
		}), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("line", {
			x1: 0,
			y1: H,
			x2: W,
			y2: H,
			stroke: color,
			strokeOpacity: .25,
			strokeWidth: 1
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 65,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 57,
		columnNumber: 10
	}, this);
}
function RadialGaugeCard({ label, value, total, color, sparkValues, isLoading = false }) {
	const pct = total > 0 ? Math.min(value / total * 100, 100) : 0;
	const r = 40;
	const cx = 52;
	const cy = 54;
	const MAX_DEG = 270;
	const START_DEG = 135;
	const toRad = (d) => d * Math.PI / 180;
	const arc = (startD, endD) => {
		const s = {
			x: cx + r * Math.cos(toRad(startD)),
			y: cy + r * Math.sin(toRad(startD))
		};
		const e = {
			x: cx + r * Math.cos(toRad(endD)),
			y: cy + r * Math.sin(toRad(endD))
		};
		const largeArc = endD - startD > 180 ? 1 : 0;
		return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
	};
	const totalArcLen = MAX_DEG / 360 * 2 * Math.PI * r;
	const fillLen = pct / 100 * totalArcLen;
	const trackPath = arc(START_DEG, 405);
	const fillPath = arc(START_DEG, START_DEG + pct / 100 * MAX_DEG);
	const displayVal = value >= 1e3 ? `${(value / 1e3).toFixed(0)}k` : `${value}`;
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-28 w-28 rounded-full bg-muted animate-pulse" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 111,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-3 w-20 rounded bg-muted animate-pulse" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 112,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-7 w-20 rounded bg-muted animate-pulse" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 113,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 110,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
		whileHover: {
			y: -5,
			scale: 1.04
		},
		whileTap: { scale: .97 },
		transition: {
			type: "spring",
			stiffness: 350,
			damping: 22
		},
		className: "group flex flex-col items-center gap-1 cursor-default",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500",
					style: { backgroundColor: color }
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 129,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
					width: "104",
					height: "110",
					viewBox: "0 0 104 110",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
							d: trackPath,
							fill: "none",
							stroke: "currentColor",
							strokeOpacity: .1,
							strokeWidth: "7",
							strokeLinecap: "round",
							className: "text-foreground"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 134,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.path, {
							d: fillPath,
							fill: "none",
							stroke: color,
							strokeWidth: "7",
							strokeLinecap: "round",
							initial: { strokeDasharray: `0 ${totalArcLen}` },
							animate: { strokeDasharray: `${fillLen} ${totalArcLen}` },
							transition: {
								duration: 1.3,
								ease: "easeOut",
								delay: .2
							}
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 136,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
							x: cx,
							y: cy - 6,
							textAnchor: "middle",
							dominantBaseline: "middle",
							fill: color,
							style: {
								fontSize: 18,
								fontWeight: 700,
								fontFamily: "Space Grotesk"
							},
							children: displayVal
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 146,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
							x: cx,
							y: 66,
							textAnchor: "middle",
							dominantBaseline: "middle",
							style: {
								fontSize: 9,
								fontFamily: "Inter"
							},
							className: "fill-muted-foreground",
							children: total > 0 ? `${pct.toFixed(0)}%` : "—"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 154,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 132,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 127,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-[11px] font-semibold text-center text-muted-foreground leading-tight px-1",
				children: label
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 164,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MiniSparkBar, {
				values: sparkValues,
				color
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 169,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 116,
		columnNumber: 10
	}, this);
}
var staggerContainer = {
	hidden: {},
	visible: { transition: { staggerChildren: .07 } }
};
var fadeSlideUp = {
	hidden: {
		opacity: 0,
		y: 22
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .45,
			ease: "easeOut"
		}
	}
};
var fadeSlideLeft = {
	hidden: {
		opacity: 0,
		x: -16
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: .4,
			ease: "easeOut"
		}
	}
};
function getActivityMeta(type, action) {
	const t = (type ?? "").toLowerCase();
	const a = (action ?? "").toLowerCase();
	if (t === "employee" || a.includes("employee")) return {
		icon: Users,
		color: "text-blue-500",
		bg: "bg-blue-500/10"
	};
	if (t === "verification" || a.includes("verif")) return {
		icon: ShieldCheck,
		color: "text-violet-500",
		bg: "bg-violet-500/10"
	};
	if (t === "company" || a.includes("compan")) return {
		icon: Building2,
		color: "text-orange-500",
		bg: "bg-orange-500/10"
	};
	if (t === "performance" || a.includes("review") || a.includes("rating")) return {
		icon: Star,
		color: "text-amber-500",
		bg: "bg-amber-500/10"
	};
	if (a.includes("creat") || a.includes("add") || a.includes("register")) return {
		icon: UserPlus,
		color: "text-emerald-500",
		bg: "bg-emerald-500/10"
	};
	return {
		icon: Activity,
		color: "text-primary",
		bg: "bg-primary/10"
	};
}
function Dashboard() {
	const { user } = useAuth();
	if (user?.role === "super_admin") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SuperAdminDashboard, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 250,
		columnNumber: 44
	}, this);
	if (user?.role === "company_admin" || user?.role === "hr") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HrDashboard, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 251,
		columnNumber: 69
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EmployeeDashboard, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 252,
		columnNumber: 10
	}, this);
}
function SuperAdminDashboard() {
	const queryClient = useQueryClient();
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedCompany, setSelectedCompany] = (0, import_react.useState)(null);
	const { data: companiesData, isLoading } = useQuery({
		queryKey: ["super-companies", search],
		queryFn: () => listCompanies({ data: {
			page: 1,
			pageSize: 100,
			search
		} })
	});
	const companies = companiesData?.data || [];
	const totalCompanies = companies.length;
	const pendingCompanies = companies.filter((c) => c.status === "pending").length;
	const verifiedCompanies = companies.filter((c) => c.status === "approved").length;
	const suspendedCompanies = companies.filter((c) => c.status === "suspended" || c.status === "rejected").length;
	const verifyMutation = useMutation({
		mutationFn: (id) => updateCompany({ data: {
			id,
			status: "approved",
			verified: true
		} }),
		onMutate: async (id) => {
			await queryClient.cancelQueries({ queryKey: ["super-companies", search] });
			const previousCompanies = queryClient.getQueryData(["super-companies", search]);
			queryClient.setQueryData(["super-companies", search], (old) => {
				if (!old) return old;
				return {
					...old,
					data: old.data.map((c) => c.id === id ? {
						...c,
						status: "approved",
						verified: true
					} : c)
				};
			});
			return { previousCompanies };
		},
		onError: (err, id, context) => {
			if (context?.previousCompanies) queryClient.setQueryData(["super-companies", search], context.previousCompanies);
			toast.error(err.message || "Failed to approve company");
		},
		onSuccess: () => {
			toast.success("Company approved successfully");
			setSelectedCompany(null);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["super-companies"] });
		}
	});
	const suspendMutation = useMutation({
		mutationFn: (id) => updateCompany({ data: {
			id,
			status: "suspended",
			verified: false
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["super-companies"] });
			toast.success("Company suspended");
			setSelectedCompany(null);
		},
		onError: (err) => toast.error(err.message || "Failed to suspend company")
	});
	const rejectMutation = useMutation({
		mutationFn: (id) => updateCompany({ data: {
			id,
			status: "rejected",
			verified: false
		} }),
		onMutate: async (id) => {
			await queryClient.cancelQueries({ queryKey: ["super-companies", search] });
			const previousCompanies = queryClient.getQueryData(["super-companies", search]);
			queryClient.setQueryData(["super-companies", search], (old) => {
				if (!old) return old;
				return {
					...old,
					data: old.data.map((c) => c.id === id ? {
						...c,
						status: "rejected",
						verified: false
					} : c)
				};
			});
			return { previousCompanies };
		},
		onError: (err, id, context) => {
			if (context?.previousCompanies) queryClient.setQueryData(["super-companies", search], context.previousCompanies);
			toast.error(err.message || "Failed to reject company");
		},
		onSuccess: () => {
			toast.success("Company registration rejected");
			setSelectedCompany(null);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["super-companies"] });
		}
	});
	const archiveMutation = useMutation({
		mutationFn: (id) => updateCompany({ data: {
			id,
			status: "archived",
			verified: false
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["super-companies"] });
			toast.success("Company archived successfully");
			setSelectedCompany(null);
		},
		onError: (err) => toast.error(err.message || "Failed to archive company")
	});
	const [deleteConfirmOpen, setDeleteConfirmOpen] = (0, import_react.useState)(false);
	const [companyToDelete, setCompanyToDelete] = (0, import_react.useState)(null);
	const [confirmNameInput, setConfirmNameInput] = (0, import_react.useState)("");
	const { data: deleteImpact, isLoading: isLoadingImpact } = useQuery({
		queryKey: ["delete-impact", companyToDelete?.id],
		queryFn: () => getCompanyDeleteImpact({ data: { id: companyToDelete.id } }),
		enabled: !!companyToDelete?.id
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => deleteCompany({ data: { id } }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["super-companies"] });
			queryClient.invalidateQueries({ queryKey: ["companies"] });
			toast.success("Company deleted successfully");
			setSelectedCompany(null);
			setDeleteConfirmOpen(false);
			setConfirmNameInput("");
		},
		onError: (err) => toast.error(err.message || "Failed to delete company")
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
				title: "Super Admin Controls",
				description: "System-wide metrics and company verification requests."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 439,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
				variants: staggerContainer,
				initial: "hidden",
				animate: "visible",
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					{
						label: "Total Companies",
						value: totalCompanies,
						icon: Building2,
						tone: "primary"
					},
					{
						label: "Pending Approval",
						value: pendingCompanies,
						icon: Clock,
						tone: "warning"
					},
					{
						label: "Verified Companies",
						value: verifiedCompanies,
						icon: ShieldCheck,
						tone: "success"
					},
					{
						label: "Suspended",
						value: suspendedCompanies,
						icon: ShieldAlert,
						tone: "destructive"
					}
				].map((card) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
					variants: fadeSlideUp,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, { ...card }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 464,
						columnNumber: 13
					}, this)
				}, card.label, false, {
					fileName: _jsxFileName,
					lineNumber: 463,
					columnNumber: 22
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 442,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
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
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, {
						className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Company Registration Requests" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 482,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, { children: "Review and verify new company registrations" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 483,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 481,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							placeholder: "Search companies...",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							className: "w-full sm:max-w-xs"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 485,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 480,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, { children: isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ListSkeleton, { count: 5 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 488,
						columnNumber: 26
					}, this) : companies.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EmptyState, {
						icon: Building2,
						title: "No companies found",
						description: "No company registrations match your filter criteria."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 488,
						columnNumber: 80
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
							className: "w-full text-sm text-left text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", {
								className: "text-xs uppercase bg-muted/50 text-foreground border-b border-border",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
										className: "px-4 py-3",
										children: "Company Details"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 492,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
										className: "px-4 py-3",
										children: "Industry"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 493,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
										className: "px-4 py-3",
										children: "Website"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 494,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
										className: "px-4 py-3",
										children: "Status"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 495,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
										className: "px-4 py-3 text-right",
										children: "Actions"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 496,
										columnNumber: 23
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 491,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 490,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
								className: "divide-y divide-border",
								children: companies.map((c, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.tr, {
									initial: {
										opacity: 0,
										x: -10
									},
									animate: {
										opacity: 1,
										x: 0
									},
									transition: { delay: i * .04 },
									className: "hover:bg-primary/5 transition-colors group",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, {
													className: "h-9 w-9 border ring-1 ring-border/40",
													children: [c.logoUrl && /* @__PURE__ */ (void 0)(AvatarImage, { src: c.logoUrl }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 512,
														columnNumber: 45
													}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AvatarFallback, {
														className: "font-semibold",
														children: c.name[0]
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 513,
														columnNumber: 31
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 511,
													columnNumber: 29
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "font-medium text-foreground block",
													children: c.name
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 516,
													columnNumber: 31
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "text-xs text-muted-foreground block",
													children: c.location || "No Location"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 517,
													columnNumber: 31
												}, this)] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 515,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 510,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 509,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "px-4 py-3",
											children: c.industry
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 521,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "px-4 py-3",
											children: c.website ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
												href: c.website,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "text-primary hover:underline inline-flex items-center gap-1",
												children: ["Visit ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "h-3 w-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 524,
													columnNumber: 37
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 523,
												columnNumber: 40
											}, this) : "None"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 522,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
												variant: c.status === "approved" ? "default" : c.status === "pending" ? "outline" : "destructive",
												className: c.status === "approved" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/20 capitalize font-medium" : c.status === "rejected" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border-rose-500/20 capitalize font-medium" : c.status === "suspended" ? "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/10 border-red-500/20 capitalize font-medium" : c.status === "archived" ? "bg-slate-500/10 text-slate-600 dark:text-slate-400 hover:bg-slate-500/10 border-slate-500/20 capitalize font-medium" : c.status === "deleted" ? "bg-red-950/15 text-red-500 dark:text-red-400 hover:bg-red-950/15 border-red-500/30 capitalize font-medium line-through" : "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 border-amber-500/20 capitalize font-medium",
												children: c.status || "Pending"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 528,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 527,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "px-4 py-3 text-right",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex justify-end gap-2 items-center",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
													size: "sm",
													variant: "outline",
													onClick: () => setSelectedCompany(c),
													children: "View Profile"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 534,
													columnNumber: 29
												}, this), c.status !== "deleted" && /* @__PURE__ */ (void 0)(DropdownMenu, { children: [/* @__PURE__ */ (void 0)(DropdownMenuTrigger, {
													asChild: true,
													children: /* @__PURE__ */ (void 0)(Button, {
														variant: "ghost",
														size: "sm",
														className: "h-8 w-8 p-0 cursor-pointer",
														children: [/* @__PURE__ */ (void 0)("span", {
															className: "sr-only",
															children: "Open actions"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 540,
															columnNumber: 37
														}, this), /* @__PURE__ */ (void 0)(EllipsisVertical, { className: "h-4 w-4" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 541,
															columnNumber: 37
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 539,
														columnNumber: 35
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 538,
													columnNumber: 33
												}, this), /* @__PURE__ */ (void 0)(DropdownMenuContent, {
													align: "end",
													children: [
														/* @__PURE__ */ (void 0)(DropdownMenuLabel, { children: "Actions" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 545,
															columnNumber: 35
														}, this),
														/* @__PURE__ */ (void 0)(DropdownMenuSeparator, {}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 546,
															columnNumber: 35
														}, this),
														c.status !== "approved" && /* @__PURE__ */ (void 0)(DropdownMenuItem, {
															onClick: () => verifyMutation.mutate(c.id),
															className: "text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50 dark:focus:bg-emerald-950/20 cursor-pointer",
															children: [/* @__PURE__ */ (void 0)(Check, { className: "mr-2 h-4 w-4" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 549,
																columnNumber: 39
															}, this), " Approve"]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 548,
															columnNumber: 63
														}, this),
														c.status !== "rejected" && c.status !== "approved" && /* @__PURE__ */ (void 0)(DropdownMenuItem, {
															onClick: () => {
																if (confirm(`Are you sure you want to reject "${c.name}"?`)) rejectMutation.mutate(c.id);
															},
															className: "text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/20 cursor-pointer",
															children: [/* @__PURE__ */ (void 0)(Ban, { className: "mr-2 h-4 w-4" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 555,
																columnNumber: 39
															}, this), " Reject"]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 552,
															columnNumber: 90
														}, this),
														c.status === "approved" && /* @__PURE__ */ (void 0)(DropdownMenuItem, {
															onClick: () => suspendMutation.mutate(c.id),
															className: "text-amber-600 focus:text-amber-600 focus:bg-amber-50 dark:focus:bg-amber-950/20 cursor-pointer",
															children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "mr-2 h-4 w-4" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 559,
																columnNumber: 39
															}, this), " Suspend"]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 558,
															columnNumber: 63
														}, this),
														c.status !== "archived" && /* @__PURE__ */ (void 0)(DropdownMenuItem, {
															onClick: () => archiveMutation.mutate(c.id),
															className: "text-slate-600 focus:text-slate-600 focus:bg-slate-50 dark:focus:bg-slate-950/20 cursor-pointer",
															children: [/* @__PURE__ */ (void 0)(Archive, { className: "mr-2 h-4 w-4" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 563,
																columnNumber: 39
															}, this), " Archive"]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 562,
															columnNumber: 63
														}, this),
														/* @__PURE__ */ (void 0)(DropdownMenuSeparator, {}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 566,
															columnNumber: 35
														}, this),
														/* @__PURE__ */ (void 0)(DropdownMenuItem, {
															onClick: () => {
																setCompanyToDelete(c);
																setDeleteConfirmOpen(true);
																setConfirmNameInput("");
															},
															className: "text-rose-600 font-semibold focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/20 cursor-pointer",
															children: [/* @__PURE__ */ (void 0)(Trash2, { className: "mr-2 h-4 w-4" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 573,
																columnNumber: 37
															}, this), " Delete Company"]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 568,
															columnNumber: 35
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 544,
													columnNumber: 33
												}, this)] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 537,
													columnNumber: 56
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 533,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 532,
											columnNumber: 25
										}, this)
									]
								}, c.id, true, {
									fileName: _jsxFileName,
									lineNumber: 500,
									columnNumber: 46
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 499,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 489,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 488,
						columnNumber: 208
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 487,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 479,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 469,
				columnNumber: 7
			}, this),
			selectedCompany && /* @__PURE__ */ (void 0)(Dialog, {
				open: !!selectedCompany,
				onOpenChange: (open) => !open && setSelectedCompany(null),
				children: /* @__PURE__ */ (void 0)(DialogContent, {
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (void 0)(DialogHeader, { children: [/* @__PURE__ */ (void 0)(DialogTitle, { children: "Company General Profile" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 590,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)(DialogDescription, { children: "General overview details of the registered company." }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 591,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 589,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "space-y-4 py-4",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-4 border-b pb-4",
								children: [/* @__PURE__ */ (void 0)(Avatar, {
									className: "h-16 w-16 border",
									children: [selectedCompany.logoUrl && /* @__PURE__ */ (void 0)(AvatarImage, { src: selectedCompany.logoUrl }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 596,
										columnNumber: 47
									}, this), /* @__PURE__ */ (void 0)(AvatarFallback, {
										className: "text-xl font-bold",
										children: selectedCompany.name[0]
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 597,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 595,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
									className: "text-lg font-bold text-foreground",
									children: selectedCompany.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 600,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)(Badge, {
									variant: selectedCompany.status === "approved" ? "default" : selectedCompany.status === "pending" ? "outline" : "destructive",
									className: selectedCompany.status === "approved" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/20 mt-1 capitalize font-medium" : selectedCompany.status === "rejected" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border-rose-500/20 mt-1 capitalize font-medium" : selectedCompany.status === "suspended" ? "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/10 border-red-500/20 mt-1 capitalize font-medium" : selectedCompany.status === "archived" ? "bg-slate-500/10 text-slate-600 dark:text-slate-400 hover:bg-slate-500/10 border-slate-500/20 mt-1 capitalize font-medium" : selectedCompany.status === "deleted" ? "bg-red-950/15 text-red-500 dark:text-red-400 hover:bg-red-950/15 border-red-500/30 mt-1 capitalize font-medium line-through" : "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 border-amber-500/20 mt-1 capitalize font-medium",
									children: selectedCompany.status || "Pending"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 601,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 599,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 594,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-2 gap-4 text-sm",
								children: [
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground block text-xs",
										children: "Industry"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 608,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "font-medium text-foreground",
										children: selectedCompany.industry
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 609,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 607,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground block text-xs",
										children: "Company Size"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 612,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "font-medium text-foreground",
										children: selectedCompany.size || "Not provided"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 613,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 611,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground block text-xs",
										children: "Location"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 616,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "font-medium text-foreground",
										children: selectedCompany.location || "Not provided"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 617,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 615,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground block text-xs",
										children: "Website"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 620,
										columnNumber: 19
									}, this), selectedCompany.website ? /* @__PURE__ */ (void 0)("a", {
										href: selectedCompany.website,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "font-medium text-primary hover:underline inline-flex items-center gap-1",
										children: [selectedCompany.website.replace("https://", "").replace("http://", ""), /* @__PURE__ */ (void 0)(ExternalLink, { className: "h-3 w-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 623,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 621,
										columnNumber: 46
									}, this) : /* @__PURE__ */ (void 0)("span", {
										className: "text-foreground",
										children: "Not provided"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 624,
										columnNumber: 28
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 619,
										columnNumber: 17
									}, this),
									selectedCompany.creatorName && /* @__PURE__ */ (void 0)("div", {
										className: "col-span-2 border-t pt-3 mt-1",
										children: [
											/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground block text-xs",
												children: "Registered By"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 627,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("span", {
												className: "font-medium text-foreground block",
												children: selectedCompany.creatorName
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 628,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("span", {
												className: "text-xs text-muted-foreground",
												children: selectedCompany.creatorEmail
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 629,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 626,
										columnNumber: 49
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 606,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 593,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(DialogFooter, {
							className: "flex flex-wrap gap-2 justify-end sm:gap-2 border-t pt-4",
							children: [/* @__PURE__ */ (void 0)(DialogClose, {
								asChild: true,
								children: /* @__PURE__ */ (void 0)(Button, {
									variant: "outline",
									size: "sm",
									children: "Close"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 635,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 634,
								columnNumber: 15
							}, this), selectedCompany.status !== "deleted" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
								selectedCompany.status !== "approved" && /* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									className: "bg-emerald-600 hover:bg-emerald-700 text-white font-medium cursor-pointer",
									onClick: () => verifyMutation.mutate(selectedCompany.id),
									disabled: verifyMutation.isPending,
									children: "Approve"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 638,
									columnNumber: 61
								}, this),
								selectedCompany.status !== "rejected" && selectedCompany.status !== "approved" && /* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "destructive",
									className: "font-medium cursor-pointer",
									onClick: () => {
										if (confirm(`Are you sure you want to reject "${selectedCompany.name}"?`)) rejectMutation.mutate(selectedCompany.id);
									},
									disabled: rejectMutation.isPending,
									children: "Reject"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 641,
									columnNumber: 102
								}, this),
								selectedCompany.status === "approved" && /* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "outline",
									className: "border-amber-500/30 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/10 font-medium cursor-pointer",
									onClick: () => suspendMutation.mutate(selectedCompany.id),
									disabled: suspendMutation.isPending,
									children: "Suspend"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 646,
									columnNumber: 61
								}, this),
								selectedCompany.status !== "archived" && /* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "outline",
									className: "border-slate-500/30 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-950/10 font-medium cursor-pointer",
									onClick: () => archiveMutation.mutate(selectedCompany.id),
									disabled: archiveMutation.isPending,
									children: "Archive"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 649,
									columnNumber: 61
								}, this),
								/* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "destructive",
									className: "font-semibold bg-rose-600 hover:bg-rose-700 cursor-pointer",
									onClick: () => {
										setCompanyToDelete(selectedCompany);
										setDeleteConfirmOpen(true);
										setConfirmNameInput("");
									},
									children: "Delete Company"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 652,
									columnNumber: 19
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 637,
								columnNumber: 56
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 633,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 588,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 587,
				columnNumber: 27
			}, this),
			deleteConfirmOpen && companyToDelete && /* @__PURE__ */ (void 0)(Dialog, {
				open: deleteConfirmOpen,
				onOpenChange: (open) => !open && setDeleteConfirmOpen(false),
				children: /* @__PURE__ */ (void 0)(DialogContent, {
					className: "max-w-md bg-background border border-border",
					children: [
						/* @__PURE__ */ (void 0)(DialogHeader, { children: [/* @__PURE__ */ (void 0)(DialogTitle, {
							className: "flex items-center gap-2 text-rose-600 font-display text-lg font-bold",
							children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "h-5 w-5 text-rose-600" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 668,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("span", { children: "Confirm Company Deletion" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 669,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 667,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)(DialogDescription, { children: "Review the cascading impact of soft-deleting this company." }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 671,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 666,
							columnNumber: 13
						}, this),
						isLoadingImpact ? /* @__PURE__ */ (void 0)("div", {
							className: "py-6 flex justify-center",
							children: /* @__PURE__ */ (void 0)(RefreshCw, { className: "h-6 w-6 animate-spin text-muted-foreground" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 677,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 676,
							columnNumber: 32
						}, this) : deleteImpact ? /* @__PURE__ */ (void 0)("div", {
							className: "space-y-4 py-2 text-sm",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "bg-rose-500/10 dark:bg-rose-950/20 border border-rose-500/20 p-3.5 rounded-xl text-rose-700 dark:text-rose-300",
									children: [
										"Are you sure you want to soft-delete ",
										/* @__PURE__ */ (void 0)("strong", { children: deleteImpact.companyName }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 680,
											columnNumber: 56
										}, this),
										"? This action will archive active relationships but preserve individual career history."
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 679,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-2.5",
									children: [/* @__PURE__ */ (void 0)("h4", {
										className: "font-semibold text-foreground text-xs uppercase tracking-wider",
										children: "Cascading Impact Summary:"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 684,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "space-y-2 border border-border/60 rounded-xl p-3 bg-muted/20",
										children: [
											/* @__PURE__ */ (void 0)("div", {
												className: "flex justify-between items-center pb-1.5 border-b border-border/40",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-muted-foreground font-medium",
													children: "Company Record:"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 688,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)(Badge, {
													variant: "destructive",
													className: "bg-rose-500/10 text-rose-600 border-rose-500/20 font-medium",
													children: "Status to DELETED"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 689,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 687,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "flex justify-between items-center py-1",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-muted-foreground font-medium",
													children: "HR / Admin Accounts:"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 692,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "font-bold text-foreground",
													children: [deleteImpact.hrCount, " unlinked (set to null)"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 693,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 691,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "flex justify-between items-center py-1",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-muted-foreground font-medium",
													children: "Active Employee Profiles:"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 696,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "font-bold text-foreground",
													children: [deleteImpact.employeeCount, " unlinked & profiles survive"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 697,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 695,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "flex justify-between items-center py-1",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-muted-foreground font-medium",
													children: "Employment Records:"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 700,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "font-bold text-emerald-600 dark:text-emerald-400",
													children: [deleteImpact.employeeCount, " archived in career history"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 701,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 699,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "flex justify-between items-center py-1",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-muted-foreground font-medium",
													children: "Verification Requests:"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 704,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "font-bold text-foreground",
													children: [deleteImpact.requestCount, " historical records kept"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 705,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 703,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "flex justify-between items-center pt-1.5 border-t border-border/40",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-muted-foreground font-medium",
													children: "Performance Reviews:"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 708,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "font-bold text-foreground",
													children: [deleteImpact.reviewCount, " preserved on employees"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 709,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 707,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 686,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 683,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-2 mt-4 pt-2 border-t border-border/50",
									children: [/* @__PURE__ */ (void 0)(Label, {
										className: "text-foreground font-medium block",
										children: [
											"Type ",
											/* @__PURE__ */ (void 0)("strong", { children: deleteImpact.companyName }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 716,
												columnNumber: 26
											}, this),
											" to confirm deletion:"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 715,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)(Input, {
										id: "confirm-name-input",
										value: confirmNameInput,
										onChange: (e) => setConfirmNameInput(e.target.value),
										placeholder: "Enter company name",
										className: "border-rose-500/30 focus-visible:ring-rose-500/30 w-full"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 718,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 714,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 678,
							columnNumber: 39
						}, this) : /* @__PURE__ */ (void 0)("div", {
							className: "py-4 text-center text-muted-foreground",
							children: "Failed to load impact details."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 720,
							columnNumber: 24
						}, this),
						/* @__PURE__ */ (void 0)(DialogFooter, {
							className: "gap-2 sm:gap-0 mt-2",
							children: [/* @__PURE__ */ (void 0)(Button, {
								variant: "outline",
								onClick: () => setDeleteConfirmOpen(false),
								children: "Cancel"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 723,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)(Button, {
								variant: "destructive",
								disabled: isLoadingImpact || !deleteImpact || confirmNameInput !== deleteImpact.companyName || deleteMutation.isPending,
								onClick: () => deleteMutation.mutate(companyToDelete.id),
								className: "bg-rose-600 hover:bg-rose-700 text-white font-semibold cursor-pointer",
								children: deleteMutation.isPending ? "Deleting..." : "Confirm Deletion"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 726,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 722,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 665,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 664,
				columnNumber: 48
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 438,
		columnNumber: 10
	}, this);
}
function HrDashboard() {
	const { user } = useAuth();
	const [activePieIndex, setActivePieIndex] = (0, import_react.useState)(null);
	const { data: company, isLoading: companyLoading } = useQuery({
		queryKey: ["my-company", user?.companyId],
		queryFn: () => getCompanyById({ data: { id: user.companyId } }),
		enabled: !!user?.companyId
	});
	const isApproved = company?.status === "approved";
	const isSuspended = company?.status === "suspended";
	const isRejected = company?.status === "rejected";
	const { data: dashboardData, isLoading: dashboardDataLoading } = useQuery({
		queryKey: ["dashboard-data"],
		queryFn: () => getDashboardData(),
		enabled: isApproved
	});
	const stats = dashboardData?.stats;
	const hiringTrend = dashboardData?.hiringTrend;
	const ratingDist = dashboardData?.ratingDist;
	const departmentAnalytics = dashboardData?.departmentAnalytics;
	const verificationStats = dashboardData?.verificationStats;
	const recentEmployees = dashboardData?.recentEmployees;
	const statsLoading = dashboardDataLoading;
	const trendLoading = dashboardDataLoading;
	const ratingLoading = dashboardDataLoading;
	const verificationStatsLoading = dashboardDataLoading;
	const recentLoading = dashboardDataLoading;
	const { data: recentActivity, isLoading: activityLoading } = useQuery({
		queryKey: ["dashboard-recent-activity"],
		queryFn: () => getRecentActivity(),
		enabled: isApproved,
		refetchInterval: 3e4
	});
	hiringTrend && hiringTrend.some((t) => t.hires > 0 || t.exits > 0);
	ratingDist && ratingDist.some((r) => r.count > 0);
	departmentAnalytics && departmentAnalytics.some((d) => d.total > 0);
	verificationStats && verificationStats.some((v) => v.count > 0);
	(0, import_react.useMemo)(() => verificationStats?.reduce((s, v) => s + v.count, 0) ?? 0, [verificationStats]);
	const trendData = (0, import_react.useMemo)(() => {
		if (!stats) return {};
		const verifiedPct = stats.totalEmployees > 0 ? Math.round(stats.verifiedEmployees / stats.totalEmployees * 100) : 0;
		const activePct = stats.totalEmployees > 0 ? Math.round(stats.activeEmployees / stats.totalEmployees * 100) : 0;
		let hiresTrend;
		if (hiringTrend && hiringTrend.length >= 2) {
			const last = hiringTrend[hiringTrend.length - 1];
			const prev = hiringTrend[hiringTrend.length - 2];
			if (prev.hires > 0) {
				const change = (last.hires - prev.hires) / prev.hires * 100;
				hiresTrend = change >= 0 ? `+${change.toFixed(0)}% vs prev month` : `${change.toFixed(0)}% vs prev month`;
			}
		}
		return {
			employees: hiresTrend,
			verified: verifiedPct > 0 ? `${verifiedPct}% of workforce` : void 0,
			active: activePct > 0 ? `${activePct}% active rate` : void 0
		};
	}, [stats, hiringTrend]);
	if (companyLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center justify-center p-16",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
			animate: { rotate: 360 },
			transition: {
				duration: 1,
				repeat: Infinity,
				ease: "linear"
			},
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "h-6 w-6 text-primary" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 823,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 816,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 815,
		columnNumber: 12
	}, this);
	if (!isApproved) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
			title: "Company Workspace",
			description: "Your company workspace status page."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 829,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
				className: "border-amber-200/50 bg-amber-50/10 p-6 md:p-8",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col items-center text-center max-w-lg mx-auto space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-full bg-amber-100 p-4 text-amber-600",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TriangleAlert, { className: "h-12 w-12" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 840,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 839,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-2xl font-bold text-foreground",
							children: isSuspended ? "Workspace Suspended" : isRejected ? "Registration Rejected" : "Verification Pending"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 842,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-muted-foreground text-sm",
							children: isSuspended ? "Your company workspace has been suspended by the platform administrator. Access to verification features, performance reviews, and employee claims is restricted." : isRejected ? "Your company registration request was rejected by the platform administrator. Access to company workspace features is restricted." : "Your company registration is awaiting verification approval. Access to adding employees and performing employee background checks is restricted until verified by the platform admin."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 845,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "pt-2",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								asChild: true,
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/app/settings",
									children: "View System Info"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 850,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 849,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 848,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 838,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 837,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 830,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 828,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
				initial: {
					opacity: 0,
					y: -12
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { duration: .4 },
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
					title: "Dashboard",
					description: "Overview of your workforce reputation and performance.",
					actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							className: "bg-gradient-hero text-primary-foreground shadow-elegant",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/app/employees",
								children: "View Employees"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 871,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 870,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/app/verification",
								children: "Verification Requests"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 874,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 873,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 869,
						columnNumber: 117
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 869,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 860,
				columnNumber: 7
			}, this),
			statsLoading || !stats ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCardSkeleton, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 880,
				columnNumber: 33
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
				variants: staggerContainer,
				initial: "hidden",
				animate: "visible",
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
						variants: fadeSlideUp,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
							label: "Total Employees",
							value: stats.totalEmployees,
							icon: Users,
							tone: "primary",
							trend: trendData.employees
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 882,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 881,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
						variants: fadeSlideUp,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
							label: "Active Employees",
							value: stats.activeEmployees,
							icon: UserCheck,
							tone: "success",
							trend: trendData.active
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 885,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 884,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
						variants: fadeSlideUp,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
							label: "Performance Reviews",
							value: stats.totalReviews,
							icon: TrendingUp,
							tone: "accent"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 888,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 887,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
						variants: fadeSlideUp,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
							label: "Verified Employees",
							value: stats.verifiedEmployees,
							icon: BadgeCheck,
							tone: "warning",
							trend: trendData.verified
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 891,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 890,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 880,
				columnNumber: 56
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
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
					className: "border-border/60 bg-card/85 backdrop-blur-sm overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-0.5 w-full bg-gradient-to-r from-[#00C2FF] via-[#40C1C0] to-[#F69336]" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 907,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
						className: "py-5 px-4",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
									initial: {
										opacity: 0,
										scale: .9
									},
									animate: {
										opacity: 1,
										scale: 1
									},
									transition: {
										duration: .5,
										delay: .15
									},
									className: "flex flex-col justify-center",
									children: statsLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-10 w-24 bg-muted animate-pulse rounded" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 922,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-3 w-20 bg-muted animate-pulse rounded" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 923,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-3 w-16 bg-muted animate-pulse rounded" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 924,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 921,
										columnNumber: 33
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.p, {
											className: "font-display text-5xl font-bold tabular-nums",
											style: { color: RADIAL_PALETTE[0] },
											initial: {
												opacity: 0,
												y: 10
											},
											animate: {
												opacity: 1,
												y: 0
											},
											transition: {
												duration: .6,
												delay: .2
											},
											children: (stats?.totalEmployees ?? 0) >= 1e3 ? `${((stats?.totalEmployees ?? 0) / 1e3).toFixed(0)}k` : stats?.totalEmployees ?? 0
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 926,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "mt-1 text-[10px] text-muted-foreground uppercase tracking-widest",
											children: "Last 12 months"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 940,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-xs font-bold text-foreground",
											children: "Total Employees"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 941,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MiniSparkBar, {
											values: hiringTrend?.map((t) => t.hires) ?? [],
											color: RADIAL_PALETTE[0]
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 942,
											columnNumber: 21
										}, this)
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 925,
										columnNumber: 28
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 911,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RadialGaugeCard, {
									label: "Verified",
									value: stats?.verifiedEmployees ?? 0,
									total: stats?.totalEmployees ?? 0,
									color: RADIAL_PALETTE[1],
									sparkValues: hiringTrend?.map((t) => t.hires) ?? [],
									isLoading: statsLoading
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 947,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RadialGaugeCard, {
									label: "Active",
									value: stats?.activeEmployees ?? 0,
									total: stats?.totalEmployees ?? 0,
									color: RADIAL_PALETTE[2],
									sparkValues: hiringTrend?.map((t) => Math.max(t.hires - t.exits, 0)) ?? [],
									isLoading: statsLoading || trendLoading
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 950,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RadialGaugeCard, {
									label: "Approved",
									value: verificationStats?.find((v) => v.status === "approved")?.count ?? 0,
									total: verificationStats?.reduce((s, v) => s + v.count, 0) ?? 0,
									color: RADIAL_PALETTE[3],
									sparkValues: verificationStats?.map((v) => v.count) ?? [],
									isLoading: verificationStatsLoading
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 953,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RadialGaugeCard, {
									label: "Reviews",
									value: stats?.totalReviews ?? 0,
									total: Math.max(stats?.totalReviews ?? 0, 1),
									color: RADIAL_PALETTE[4],
									sparkValues: ratingDist?.map((r) => r.count) ?? [],
									isLoading: statsLoading || ratingLoading
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 956,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 909,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 908,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 906,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 896,
				columnNumber: 7
			}, this),
			dashboardDataLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-5 xl:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartSkeleton, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 964,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartSkeleton, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 965,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 963,
				columnNumber: 31
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.Suspense, {
				fallback: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-5 xl:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartSkeleton, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 966,
						columnNumber: 81
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartSkeleton, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 966,
						columnNumber: 98
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 966,
					columnNumber: 38
				}, this),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DashboardCharts, {
					hiringTrend,
					departmentAnalytics,
					verificationStats,
					ratingDist
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 967,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 966,
				columnNumber: 18
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-5 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
					className: "lg:col-span-2",
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
						delay: .5
					},
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
						className: "border-border/60 bg-card/80 backdrop-blur-sm h-full",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, {
							className: "flex flex-row items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Recent Employees" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 985,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								asChild: true,
								variant: "ghost",
								size: "sm",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/app/employees",
									children: ["View all ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowUpRight, { className: "ml-1 h-3 w-3" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 988,
										columnNumber: 28
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 987,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 986,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 984,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
							className: "space-y-2",
							children: recentLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ListSkeleton, { count: 4 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 993,
								columnNumber: 32
							}, this) : !recentEmployees || recentEmployees.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EmptyState, {
								icon: Users,
								title: "No employees yet",
								description: "Get started by registering your first employee record."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 993,
								columnNumber: 112
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
								variants: staggerContainer,
								initial: "hidden",
								animate: "visible",
								className: "space-y-2",
								children: recentEmployees.map((e) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
									variants: fadeSlideLeft,
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/app/employees/$id",
										params: { id: e.id },
										className: "group flex items-center gap-3 rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-primary/20 hover:bg-primary/5 hover:shadow-elegant",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, {
												className: "h-10 w-10 ring-1 ring-border/40 group-hover:ring-primary/30 transition-all",
												children: [e.photoUrl && /* @__PURE__ */ (void 0)(AvatarImage, { src: e.photoUrl }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 999,
													columnNumber: 42
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AvatarFallback, {
													className: "font-semibold text-sm",
													children: e.fullName[0]
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1e3,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 998,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "truncate font-semibold text-sm",
														children: e.fullName
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1004,
														columnNumber: 29
													}, this), e.verified && /* @__PURE__ */ (void 0)(BadgeCheck, { className: "h-3.5 w-3.5 text-primary shrink-0" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1005,
														columnNumber: 44
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1003,
													columnNumber: 27
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "truncate text-xs text-muted-foreground",
													children: [
														e.designation,
														" · ",
														e.department
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1007,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1002,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
												variant: e.status === "active" ? "default" : "outline",
												className: `shrink-0 capitalize text-xs ${e.status === "active" ? "bg-success/15 text-success border-success/20" : ""}`,
												children: e.status.replace("_", " ")
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1011,
												columnNumber: 25
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 995,
										columnNumber: 23
									}, this)
								}, e.id, false, {
									fileName: _jsxFileName,
									lineNumber: 994,
									columnNumber: 45
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 993,
								columnNumber: 236
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 992,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 983,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 973,
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
						delay: .56
					},
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
						className: "border-border/60 bg-card/80 backdrop-blur-sm h-full",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Live Activity" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1035,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "outline",
								className: "border-success/30 bg-success/8 text-success text-[10px]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mr-1 h-1.5 w-1.5 rounded-full bg-success inline-block animate-pulse" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1037,
									columnNumber: 19
								}, this), "Auto-refresh"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1036,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1034,
							columnNumber: 15
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1033,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, { children: activityLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ListSkeleton, { count: 4 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1043,
							columnNumber: 34
						}, this) : !recentActivity || recentActivity.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "py-12 text-center text-sm text-muted-foreground",
							children: "No activity logs recorded."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1043,
							columnNumber: 112
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute left-[22px] top-3 bottom-3 w-px bg-gradient-to-b from-primary/30 via-border/40 to-transparent" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1045,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatePresence, { children: recentActivity.map((a, i) => {
								const meta = getActivityMeta(a.targetType ?? "", a.action);
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
									variants: fadeSlideLeft,
									initial: "hidden",
									animate: "visible",
									transition: { delay: i * .06 },
									className: "flex items-start gap-3 pl-1 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: `relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${meta.bg} ring-2 ring-background`,
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(meta.icon, { className: `h-3.5 w-3.5 ${meta.color}` }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1054,
											columnNumber: 29
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1053,
										columnNumber: 27
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "min-w-0 flex-1 pt-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-sm text-foreground font-medium leading-tight truncate",
											children: a.action
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1057,
											columnNumber: 29
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("time", {
											className: "text-xs text-muted-foreground mt-0.5 block",
											children: new Date(a.timestamp).toLocaleString()
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1060,
											columnNumber: 29
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1056,
										columnNumber: 27
									}, this)]
								}, a.id, true, {
									fileName: _jsxFileName,
									lineNumber: 1049,
									columnNumber: 26
								}, this);
							}) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1046,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1043,
							columnNumber: 212
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1042,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1032,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1022,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 971,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 858,
		columnNumber: 10
	}, this);
}
function EmployeeDashboard() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [isAddHistoryOpen, setIsAddHistoryOpen] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("overview");
	const scoreRef = (0, import_react.useRef)(null);
	const scoreInView = useInView(scoreRef, { once: true });
	const { data: employee, isLoading: employeeLoading } = useQuery({
		queryKey: ["employee-profile", user?.id],
		queryFn: () => getEmployeeByUserId({ data: { userId: user.id } })
	});
	const { data: history, isLoading: historyLoading } = useQuery({
		queryKey: ["employee-history", employee?.id],
		queryFn: () => getEmploymentHistory({ data: { employeeId: employee.id } }),
		enabled: !!employee?.id
	});
	const { data: verificationRequestsData, isLoading: requestsLoading } = useQuery({
		queryKey: ["employee-verification-requests"],
		queryFn: () => listVerificationRequests({ data: {
			page: 1,
			pageSize: 20
		} }),
		refetchInterval: 3e4
	});
	const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
		queryKey: ["employee-reviews", employee?.id],
		queryFn: () => listReviews({ data: { employeeId: employee.id } }),
		enabled: !!employee?.id
	});
	const verificationRequests = verificationRequestsData?.data || [];
	verificationRequests.filter((r) => r.status === "pending").length;
	const resolveRequestMutation = useMutation({
		mutationFn: ({ id, status }) => resolveVerificationRequest({ data: {
			id,
			status
		} }),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["employee-verification-requests"] });
			queryClient.invalidateQueries({ queryKey: ["employee-profile"] });
			toast.success(`Request ${variables.status === "approved" ? "approved" : "denied"} successfully`);
		},
		onError: (err) => toast.error(err.message || "Failed to resolve request")
	});
	const addHistoryMutation = useMutation({
		mutationFn: (data) => addEmploymentHistory({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["employee-history"] });
			queryClient.invalidateQueries({ queryKey: ["employee-profile"] });
			toast.success("Career history added. Awaiting verification.");
			setIsAddHistoryOpen(false);
		},
		onError: (err) => toast.error(err.message || "Failed to add history")
	});
	if (employeeLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center justify-center p-16",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
			animate: { rotate: 360 },
			transition: {
				duration: 1,
				repeat: Infinity,
				ease: "linear"
			},
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "h-6 w-6 text-primary" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1189,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 1182,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 1181,
		columnNumber: 12
	}, this);
	if (!employee) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-8 text-center text-red-500",
		children: "Professional profile not found. Please contact support."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 1194,
		columnNumber: 12
	}, this);
	const score = employee.trustScore ?? 0;
	let trustRating = "Standard";
	let trustGradient = "from-amber-500 to-orange-500";
	let trustTextColor = "text-amber-500";
	if (score >= 80) {
		trustRating = "Excellent";
		trustGradient = "from-emerald-500 to-teal-500";
		trustTextColor = "text-emerald-500";
	} else if (score >= 50) {
		trustRating = "Good";
		trustGradient = "from-blue-500 to-cyan-500";
		trustTextColor = "text-blue-500";
	} else if (score < 35) {
		trustRating = "Needs Improvement";
		trustGradient = "from-rose-500 to-red-500";
		trustTextColor = "text-rose-500";
	}
	const scoreBreakdown = [
		{
			label: "Performance Reviews",
			weight: 40,
			points: employee.rating ? Math.round(employee.rating / 5 * 40) : 40,
			icon: Star
		},
		{
			label: "Verification Bonus",
			weight: 20,
			points: employee.verified ? 20 : 0,
			icon: ShieldCheck
		},
		{
			label: "Experience Cap",
			weight: 20,
			points: Math.min(Math.round(Math.min(employee.experience, 10) / 10 * 20), 20),
			icon: Briefcase
		},
		{
			label: "Attendance Rating",
			weight: 20,
			points: 20,
			icon: CircleCheck
		}
	];
	const reviewsCount = reviews.length;
	const avgProductivity = reviewsCount > 0 ? (reviews.reduce((sum, r) => sum + r.productivity, 0) / reviewsCount).toFixed(1) : "0.0";
	const avgTeamwork = reviewsCount > 0 ? (reviews.reduce((sum, r) => sum + r.teamwork, 0) / reviewsCount).toFixed(1) : "0.0";
	const avgCommunication = reviewsCount > 0 ? (reviews.reduce((sum, r) => sum + r.communication, 0) / reviewsCount).toFixed(1) : "0.0";
	const avgLeadership = reviewsCount > 0 ? (reviews.reduce((sum, r) => sum + r.leadership, 0) / reviewsCount).toFixed(1) : "0.0";
	const avgAttendance = reviewsCount > 0 ? (reviews.reduce((sum, r) => sum + r.attendance, 0) / reviewsCount).toFixed(1) : "0.0";
	const avgOverall = reviewsCount > 0 ? (reviews.reduce((sum, r) => sum + r.overall, 0) / reviewsCount).toFixed(1) : "0.0";
	const handleAddHistorySubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const companyName = formData.get("companyName");
		const designation = formData.get("designation");
		const department = formData.get("department");
		const joiningDate = formData.get("joiningDate");
		const exitDate = formData.get("exitDate") || null;
		const experience = Number(formData.get("experience") || 0);
		const salary = formData.get("salary") ? Number(formData.get("salary")) : null;
		addHistoryMutation.mutate({
			employeeId: employee.id,
			companyName,
			designation,
			department,
			joiningDate,
			exitDate,
			experience,
			salary
		});
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
				initial: {
					opacity: 0,
					y: -12
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { duration: .4 },
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
					title: `Welcome, ${employee.fullName}`,
					description: "Manage your professional workforce identity, verification requests, and reputation.",
					actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							className: "bg-gradient-hero text-primary-foreground shadow-elegant",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/app/profile",
								children: "Edit Profile"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1282,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1281,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/app/consent",
								children: "Consent Manager"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1285,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1284,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1280,
						columnNumber: 168
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1280,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1271,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex border-b border-border/50 pb-px gap-2 overflow-x-auto no-scrollbar",
				children: [
					{
						id: "overview",
						label: "Overview & Trust",
						icon: Sparkles
					},
					{
						id: "career",
						label: "Career History",
						icon: Briefcase,
						count: history?.length
					},
					{
						id: "performance",
						label: "Performance Summary",
						icon: Star,
						count: reviewsCount
					},
					{
						id: "documents",
						label: "Documents & Credentials",
						icon: FileText
					}
				].map((tab) => {
					const Icon = tab.icon;
					const isActive = activeTab === tab.id;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setActiveTab(tab.id),
						className: `flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${isActive ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1314,
								columnNumber: 15
							}, this),
							tab.label,
							tab.count !== void 0 && tab.count > 0 && /* @__PURE__ */ (void 0)("span", {
								className: `text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`,
								children: tab.count
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1316,
								columnNumber: 60
							}, this)
						]
					}, tab.id, true, {
						fileName: _jsxFileName,
						lineNumber: 1313,
						columnNumber: 16
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1291,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatePresence, {
				mode: "wait",
				children: [
					activeTab === "overview" && /* @__PURE__ */ (void 0)(motion.div, {
						initial: {
							opacity: 0,
							y: 15
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -15
						},
						transition: { duration: .25 },
						className: "grid gap-6 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								ref: scoreRef,
								children: /* @__PURE__ */ (void 0)(Card, {
									className: "border-border/60 bg-card/90 backdrop-blur-sm overflow-hidden h-full",
									children: [
										/* @__PURE__ */ (void 0)("div", { className: `h-1 w-full bg-gradient-to-r ${trustGradient}` }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1339,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)(CardHeader, { children: [/* @__PURE__ */ (void 0)(CardTitle, {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "h-5 w-5 text-primary" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1342,
												columnNumber: 21
											}, this), "Dynamic Trust Score"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1341,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)(CardDescription, { children: "Real-time integrity & performance ranking" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1345,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1340,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)(CardContent, {
											className: "flex flex-col items-center space-y-5",
											children: [
												/* @__PURE__ */ (void 0)("div", {
													className: "relative flex items-center justify-center h-36 w-36",
													children: [
														/* @__PURE__ */ (void 0)("div", { className: `absolute inset-0 rounded-full bg-gradient-to-br ${trustGradient} opacity-10 blur-lg` }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1349,
															columnNumber: 21
														}, this),
														/* @__PURE__ */ (void 0)("svg", {
															className: "w-full h-full transform -rotate-90",
															children: [
																/* @__PURE__ */ (void 0)("circle", {
																	cx: "72",
																	cy: "72",
																	r: "56",
																	className: "stroke-border/30",
																	strokeWidth: "8",
																	fill: "transparent"
																}, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 1351,
																	columnNumber: 23
																}, this),
																/* @__PURE__ */ (void 0)(motion.circle, {
																	cx: "72",
																	cy: "72",
																	r: "56",
																	strokeWidth: "8",
																	fill: "transparent",
																	stroke: `url(#scoreGradient-${employee.id})`,
																	strokeLinecap: "round",
																	strokeDasharray: `${2 * Math.PI * 56}`,
																	initial: { strokeDashoffset: 2 * Math.PI * 56 },
																	animate: scoreInView ? { strokeDashoffset: 2 * Math.PI * 56 * (1 - score / 100) } : {},
																	transition: {
																		duration: 1.5,
																		ease: "easeOut",
																		delay: .4
																	}
																}, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 1352,
																	columnNumber: 23
																}, this),
																/* @__PURE__ */ (void 0)("defs", { children: /* @__PURE__ */ (void 0)("linearGradient", {
																	id: `scoreGradient-${employee.id}`,
																	x1: "0",
																	y1: "0",
																	x2: "1",
																	y2: "1",
																	children: [/* @__PURE__ */ (void 0)("stop", {
																		offset: "0%",
																		stopColor: "var(--color-primary)"
																	}, void 0, false, {
																		fileName: _jsxFileName,
																		lineNumber: 1363,
																		columnNumber: 27
																	}, this), /* @__PURE__ */ (void 0)("stop", {
																		offset: "100%",
																		stopColor: "var(--color-accent)"
																	}, void 0, false, {
																		fileName: _jsxFileName,
																		lineNumber: 1364,
																		columnNumber: 27
																	}, this)]
																}, void 0, true, {
																	fileName: _jsxFileName,
																	lineNumber: 1362,
																	columnNumber: 25
																}, this) }, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 1361,
																	columnNumber: 23
																}, this)
															]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 1350,
															columnNumber: 21
														}, this),
														/* @__PURE__ */ (void 0)("div", {
															className: "absolute flex flex-col items-center justify-center",
															children: [/* @__PURE__ */ (void 0)(motion.span, {
																className: "font-display text-4xl font-bold",
																initial: { opacity: 0 },
																animate: scoreInView ? { opacity: 1 } : {},
																transition: { delay: .6 },
																children: score
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 1369,
																columnNumber: 23
															}, this), /* @__PURE__ */ (void 0)("span", {
																className: "text-[10px] text-muted-foreground uppercase tracking-widest",
																children: "Points"
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 1378,
																columnNumber: 23
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 1368,
															columnNumber: 21
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1348,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: `inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${trustTextColor} border-current/20 bg-current/5`,
													children: [
														/* @__PURE__ */ (void 0)(Zap, { className: "h-3.5 w-3.5" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1383,
															columnNumber: 21
														}, this),
														trustRating,
														" Trust Status"
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1382,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "w-full space-y-3",
													children: [/* @__PURE__ */ (void 0)("p", {
														className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground border-b pb-1.5",
														children: "Score Breakdown"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1388,
														columnNumber: 21
													}, this), scoreBreakdown.map((item, i) => /* @__PURE__ */ (void 0)("div", {
														className: "space-y-1",
														children: [/* @__PURE__ */ (void 0)("div", {
															className: "flex items-center justify-between text-[11px]",
															children: [/* @__PURE__ */ (void 0)("div", {
																className: "flex items-center gap-1.5 text-muted-foreground",
																children: [/* @__PURE__ */ (void 0)(item.icon, { className: "h-3 w-3" }, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 1394,
																	columnNumber: 29
																}, this), item.label]
															}, void 0, true, {
																fileName: _jsxFileName,
																lineNumber: 1393,
																columnNumber: 27
															}, this), /* @__PURE__ */ (void 0)("span", {
																className: "font-semibold text-foreground tabular-nums",
																children: [
																	item.points,
																	"/",
																	item.weight,
																	" pts"
																]
															}, void 0, true, {
																fileName: _jsxFileName,
																lineNumber: 1397,
																columnNumber: 27
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 1392,
															columnNumber: 25
														}, this), /* @__PURE__ */ (void 0)("div", {
															className: "h-1.5 w-full rounded-full bg-border/50 overflow-hidden",
															children: /* @__PURE__ */ (void 0)(motion.div, {
																className: `h-full rounded-full bg-gradient-to-r ${trustGradient}`,
																initial: { width: 0 },
																animate: scoreInView ? { width: `${item.points / item.weight * 100}%` } : {},
																transition: {
																	duration: .9,
																	ease: "easeOut",
																	delay: .3 + i * .1
																}
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 1402,
																columnNumber: 27
															}, this)
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1401,
															columnNumber: 25
														}, this)]
													}, item.label, true, {
														fileName: _jsxFileName,
														lineNumber: 1391,
														columnNumber: 54
													}, this))]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1387,
													columnNumber: 19
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1347,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1338,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1337,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "md:col-span-2 space-y-6",
								children: /* @__PURE__ */ (void 0)(Card, {
									className: "border-border/60 bg-card/90 backdrop-blur-sm h-full",
									children: [/* @__PURE__ */ (void 0)(CardHeader, { children: [/* @__PURE__ */ (void 0)(CardTitle, { children: "Professional Profile Summary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1422,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)(CardDescription, { children: "General information visible to hiring managers" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1423,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1421,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)(CardContent, {
										className: "space-y-5",
										children: [
											/* @__PURE__ */ (void 0)("div", {
												className: "flex flex-col sm:flex-row gap-4 items-start border-b pb-5",
												children: [/* @__PURE__ */ (void 0)(Avatar, {
													className: "h-18 w-18 border-2 ring-2 ring-primary/20 shrink-0",
													style: {
														height: 72,
														width: 72
													},
													children: [employee.photoUrl && /* @__PURE__ */ (void 0)(AvatarImage, { src: employee.photoUrl }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1431,
														columnNumber: 45
													}, this), /* @__PURE__ */ (void 0)(AvatarFallback, {
														className: "text-2xl font-bold",
														children: employee.fullName[0]
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1432,
														columnNumber: 23
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1427,
													columnNumber: 21
												}, this), /* @__PURE__ */ (void 0)("div", {
													className: "space-y-1.5",
													children: [
														/* @__PURE__ */ (void 0)("h3", {
															className: "text-xl font-bold text-foreground flex items-center gap-2",
															children: [employee.fullName, employee.verified && /* @__PURE__ */ (void 0)(BadgeCheck, { className: "h-5 w-5 text-primary" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 1437,
																columnNumber: 47
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 1435,
															columnNumber: 23
														}, this),
														/* @__PURE__ */ (void 0)("div", {
															className: "text-sm font-semibold text-muted-foreground flex items-center gap-1.5",
															children: [
																/* @__PURE__ */ (void 0)("span", { children: employee.designation }, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 1440,
																	columnNumber: 25
																}, this),
																/* @__PURE__ */ (void 0)("span", { children: "·" }, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 1441,
																	columnNumber: 25
																}, this),
																/* @__PURE__ */ (void 0)("span", {
																	className: "text-xs text-primary font-mono bg-primary/5 px-2 py-0.5 rounded border border-primary/10",
																	children: ["ID: ", employee.employeeId]
																}, void 0, true, {
																	fileName: _jsxFileName,
																	lineNumber: 1442,
																	columnNumber: 25
																}, this)
															]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 1439,
															columnNumber: 23
														}, this),
														/* @__PURE__ */ (void 0)("div", {
															className: "flex flex-wrap gap-1.5 mt-2",
															children: [
																/* @__PURE__ */ (void 0)(Badge, {
																	variant: "outline",
																	className: employee.claimStatus === "claimed" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs" : "border-amber-500/30 bg-amber-50/10 text-amber-400 text-xs",
																	children: employee.claimStatus === "claimed" ? "Verified Employee" : "Profile Not Claimed"
																}, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 1445,
																	columnNumber: 25
																}, this),
																employee.department && /* @__PURE__ */ (void 0)(Badge, {
																	variant: "secondary",
																	className: "text-xs",
																	children: employee.department
																}, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 1448,
																	columnNumber: 49
																}, this),
																employee.verified && /* @__PURE__ */ (void 0)(Badge, {
																	className: "text-xs bg-success/15 text-success border-success/20",
																	children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "h-3 w-3 mr-1" }, void 0, false, {
																		fileName: _jsxFileName,
																		lineNumber: 1450,
																		columnNumber: 29
																	}, this), " Verified"]
																}, void 0, true, {
																	fileName: _jsxFileName,
																	lineNumber: 1449,
																	columnNumber: 47
																}, this)
															]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 1444,
															columnNumber: 23
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1434,
													columnNumber: 21
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1426,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm",
												children: [
													/* @__PURE__ */ (void 0)("div", {
														className: "flex items-center gap-2 text-muted-foreground",
														children: [/* @__PURE__ */ (void 0)(Mail, { className: "h-4 w-4 shrink-0" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1458,
															columnNumber: 23
														}, this), /* @__PURE__ */ (void 0)("span", {
															className: "truncate",
															children: employee.email
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1459,
															columnNumber: 23
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1457,
														columnNumber: 21
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: "flex items-center gap-2 text-muted-foreground",
														children: [/* @__PURE__ */ (void 0)(Phone, { className: "h-4 w-4 shrink-0" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1462,
															columnNumber: 23
														}, this), /* @__PURE__ */ (void 0)("span", { children: employee.phone || "No phone added" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1463,
															columnNumber: 23
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1461,
														columnNumber: 21
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: "flex items-center gap-2 text-muted-foreground",
														children: [/* @__PURE__ */ (void 0)(Briefcase, { className: "h-4 w-4 shrink-0" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1466,
															columnNumber: 23
														}, this), /* @__PURE__ */ (void 0)("span", { children: [employee.experience, " years experience"] }, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 1467,
															columnNumber: 23
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1465,
														columnNumber: 21
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: "flex items-center gap-2 text-muted-foreground",
														children: [/* @__PURE__ */ (void 0)(Calendar, { className: "h-4 w-4 shrink-0" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1470,
															columnNumber: 23
														}, this), /* @__PURE__ */ (void 0)("span", { children: ["Joined ", new Date(employee.joiningDate).toLocaleDateString()] }, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 1471,
															columnNumber: 23
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1469,
														columnNumber: 21
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1456,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "flex gap-4 pt-4 border-t",
												children: [/* @__PURE__ */ (void 0)("div", {
													className: "flex-1 space-y-1",
													children: [/* @__PURE__ */ (void 0)("span", {
														className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-widest block",
														children: "Skills Summary"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1477,
														columnNumber: 23
													}, this), /* @__PURE__ */ (void 0)("div", {
														className: "flex flex-wrap gap-1",
														children: [employee.skills.slice(0, 5).map((skill) => /* @__PURE__ */ (void 0)(Badge, {
															variant: "secondary",
															className: "text-[10px]",
															children: skill
														}, skill, false, {
															fileName: _jsxFileName,
															lineNumber: 1479,
															columnNumber: 67
														}, this)), employee.skills.length > 5 && /* @__PURE__ */ (void 0)(Badge, {
															variant: "outline",
															className: "text-[10px]",
															children: `+${employee.skills.length - 5} more`
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1480,
															columnNumber: 56
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1478,
														columnNumber: 23
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1476,
													columnNumber: 21
												}, this), /* @__PURE__ */ (void 0)("div", {
													className: "flex-1 space-y-1",
													children: [/* @__PURE__ */ (void 0)("span", {
														className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-widest block",
														children: "Verification Status"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1484,
														columnNumber: 23
													}, this), /* @__PURE__ */ (void 0)("div", {
														className: "flex items-center gap-1.5 text-xs",
														children: employee.verified ? /* @__PURE__ */ (void 0)("span", {
															className: "text-emerald-500 flex items-center font-semibold",
															children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "h-4 w-4 mr-1 shrink-0" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 1486,
																columnNumber: 113
															}, this), " Credential Verified"]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 1486,
															columnNumber: 46
														}, this) : /* @__PURE__ */ (void 0)("span", {
															className: "text-amber-500 flex items-center font-semibold",
															children: [/* @__PURE__ */ (void 0)(Clock, { className: "h-4 w-4 mr-1 shrink-0" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 1486,
																columnNumber: 258
															}, this), " Verification Pending"]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 1486,
															columnNumber: 193
														}, this)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1485,
														columnNumber: 23
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1483,
													columnNumber: 21
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1475,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1425,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1420,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1419,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "md:col-span-3",
								children: /* @__PURE__ */ (void 0)(Card, {
									className: "border-border/60 bg-card/90 backdrop-blur-sm",
									children: [/* @__PURE__ */ (void 0)(CardHeader, { children: [/* @__PURE__ */ (void 0)(CardTitle, {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (void 0)(Clock, { className: "h-5 w-5 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1499,
											columnNumber: 21
										}, this), "Incoming Consent & Verification Requests"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1498,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)(CardDescription, { children: "Authorize background checks from external company HR managers" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1502,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1497,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)(CardContent, { children: requestsLoading ? /* @__PURE__ */ (void 0)(ListSkeleton, { count: 2 }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1505,
										columnNumber: 38
									}, this) : verificationRequests.length === 0 ? /* @__PURE__ */ (void 0)("div", {
										className: "py-8 text-center text-sm text-muted-foreground",
										children: "No active consent or background check verification requests."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1505,
										columnNumber: 103
									}, this) : /* @__PURE__ */ (void 0)("div", {
										className: "grid gap-3 sm:grid-cols-2",
										children: verificationRequests.map((req) => /* @__PURE__ */ (void 0)("div", {
											className: "rounded-xl border border-border/60 bg-muted/10 p-4 flex flex-col justify-between gap-3",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "flex justify-between items-start",
												children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
													className: "font-semibold text-sm text-foreground block",
													children: req.requestedByCompany
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1511,
													columnNumber: 31
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "text-[10px] text-muted-foreground capitalize",
													children: req.requestType
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1512,
													columnNumber: 31
												}, this)] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1510,
													columnNumber: 29
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "text-[10px] text-muted-foreground",
													children: new Date(req.createdAt).toLocaleDateString()
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1514,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1509,
												columnNumber: 27
											}, this), req.status === "pending" ? /* @__PURE__ */ (void 0)("div", {
												className: "flex gap-2 mt-2",
												children: [/* @__PURE__ */ (void 0)(Button, {
													size: "sm",
													className: "flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8",
													onClick: () => resolveRequestMutation.mutate({
														id: req.id,
														status: "approved"
													}),
													children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "h-3.5 w-3.5 mr-1" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1521,
														columnNumber: 33
													}, this), " Grant Access"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1517,
													columnNumber: 31
												}, this), /* @__PURE__ */ (void 0)(Button, {
													size: "sm",
													variant: "outline",
													className: "flex-1 text-destructive border-destructive/30 hover:bg-destructive/8 text-xs h-8",
													onClick: () => resolveRequestMutation.mutate({
														id: req.id,
														status: "denied"
													}),
													children: [/* @__PURE__ */ (void 0)(X, { className: "h-3.5 w-3.5 mr-1" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1527,
														columnNumber: 33
													}, this), " Deny"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1523,
													columnNumber: 31
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1516,
												columnNumber: 55
											}, this) : /* @__PURE__ */ (void 0)(Badge, {
												variant: req.status === "approved" ? "default" : "destructive",
												className: "w-full capitalize justify-center text-center mt-2",
												children: req.status === "approved" ? "Approved" : "Denied"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1529,
												columnNumber: 38
											}, this)]
										}, req.id, true, {
											fileName: _jsxFileName,
											lineNumber: 1508,
											columnNumber: 63
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1507,
										columnNumber: 30
									}, this) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1504,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1496,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1495,
								columnNumber: 13
							}, this)
						]
					}, "overview", true, {
						fileName: _jsxFileName,
						lineNumber: 1324,
						columnNumber: 38
					}, this),
					activeTab === "career" && /* @__PURE__ */ (void 0)(motion.div, {
						initial: {
							opacity: 0,
							y: 15
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -15
						},
						transition: { duration: .25 },
						className: "space-y-6",
						children: /* @__PURE__ */ (void 0)(Card, {
							className: "border-border/60 bg-card/90 backdrop-blur-sm",
							children: [/* @__PURE__ */ (void 0)(CardHeader, {
								className: "flex flex-row items-center justify-between flex-wrap gap-4",
								children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)(CardTitle, { children: "Verified Career History" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1554,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)(CardDescription, { children: "A complete timeline of your employment history. Previous records remain preserved when joining new companies." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1555,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1553,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									onClick: () => setIsAddHistoryOpen(true),
									children: [/* @__PURE__ */ (void 0)(Plus, { className: "h-4 w-4 mr-1" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1558,
										columnNumber: 19
									}, this), " Add Tenure"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1557,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1552,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)(CardContent, { children: historyLoading ? /* @__PURE__ */ (void 0)(ListSkeleton, { count: 3 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1562,
								columnNumber: 35
							}, this) : !history || history.length === 0 ? /* @__PURE__ */ (void 0)(EmptyState, {
								icon: Briefcase,
								title: "No Career Records Logged",
								description: "You can add past companies manually to populate your verified employment timeline."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1562,
								columnNumber: 99
							}, this) : /* @__PURE__ */ (void 0)("div", {
								className: "relative pl-6 space-y-6",
								children: [/* @__PURE__ */ (void 0)("div", { className: "absolute left-[9px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary/50 via-border/40 to-transparent" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1563,
									columnNumber: 21
								}, this), history.map((item, i) => /* @__PURE__ */ (void 0)("div", {
									className: "relative pl-8 group",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: `absolute left-[-2px] top-1.5 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${item.verificationStatus === "verified" ? "border-success bg-success/15" : item.verificationStatus === "rejected" ? "border-destructive bg-destructive/15" : "border-primary bg-primary/10"}`,
										children: item.verificationStatus === "verified" ? /* @__PURE__ */ (void 0)(CircleCheck, { className: "h-3.5 w-3.5 text-success" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1567,
											columnNumber: 69
										}, this) : item.verificationStatus === "rejected" ? /* @__PURE__ */ (void 0)(X, { className: "h-3.5 w-3.5 text-destructive" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1567,
											columnNumber: 166
										}, this) : /* @__PURE__ */ (void 0)(Clock, { className: "h-3.5 w-3.5 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1567,
											columnNumber: 215
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1566,
										columnNumber: 25
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "rounded-xl border border-border/60 bg-muted/10 p-5 transition-all duration-200 hover:border-primary/20 hover:bg-primary/5",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3",
											children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
												className: "font-bold text-foreground text-base flex items-center gap-1.5",
												children: [item.companyName, item.verificationStatus === "verified" && /* @__PURE__ */ (void 0)(BadgeCheck, { className: "h-4 w-4 text-emerald-500" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1576,
													columnNumber: 76
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1574,
												columnNumber: 31
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "text-sm text-muted-foreground font-medium",
												children: item.designation
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1578,
												columnNumber: 31
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1573,
												columnNumber: 29
											}, this), /* @__PURE__ */ (void 0)(Badge, {
												variant: item.verificationStatus === "verified" ? "default" : item.verificationStatus === "rejected" ? "destructive" : "outline",
												className: `capitalize text-xs w-fit ${item.verificationStatus === "verified" ? "bg-success/15 text-success border-success/20" : ""}`,
												children: item.verificationStatus
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1580,
												columnNumber: 29
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1572,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-muted-foreground pt-3 border-t border-border/40",
											children: [
												/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (void 0)(Calendar, { className: "h-4 w-4 shrink-0" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1587,
														columnNumber: 31
													}, this), /* @__PURE__ */ (void 0)("span", { children: [
														new Date(item.joiningDate).toLocaleDateString(),
														" –",
														" ",
														item.exitDate ? new Date(item.exitDate).toLocaleDateString() : "Present (Active)"
													] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1588,
														columnNumber: 31
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1586,
													columnNumber: 29
												}, this),
												item.department && /* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (void 0)(Building2, { className: "h-4 w-4 shrink-0" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1594,
														columnNumber: 33
													}, this), /* @__PURE__ */ (void 0)("span", { children: [item.department, " Department"] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1595,
														columnNumber: 33
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1593,
													columnNumber: 49
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (void 0)(Briefcase, { className: "h-4 w-4 shrink-0" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1598,
														columnNumber: 31
													}, this), /* @__PURE__ */ (void 0)("span", { children: [item.experience, " yrs tenure experience"] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1599,
														columnNumber: 31
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1597,
													columnNumber: 29
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1585,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1571,
										columnNumber: 25
									}, this)]
								}, item.id, true, {
									fileName: _jsxFileName,
									lineNumber: 1564,
									columnNumber: 47
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1562,
								columnNumber: 263
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1561,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1551,
							columnNumber: 13
						}, this)
					}, "career", false, {
						fileName: _jsxFileName,
						lineNumber: 1539,
						columnNumber: 36
					}, this),
					activeTab === "performance" && /* @__PURE__ */ (void 0)(motion.div, {
						initial: {
							opacity: 0,
							y: 15
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -15
						},
						transition: { duration: .25 },
						className: "grid gap-6 md:grid-cols-3",
						children: [/* @__PURE__ */ (void 0)("div", { children: /* @__PURE__ */ (void 0)(Card, {
							className: "border-border/60 bg-card/90 backdrop-blur-sm h-full",
							children: [/* @__PURE__ */ (void 0)(CardHeader, { children: [/* @__PURE__ */ (void 0)(CardTitle, { children: "Tenure Rating Summary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1625,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)(CardDescription, { children: "Aggregated metric scores based on company performance reviews" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1626,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1624,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(CardContent, {
								className: "flex flex-col items-center space-y-6",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "text-center space-y-1.5",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-5xl font-display font-extrabold text-primary",
										children: avgOverall
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1630,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "text-sm font-semibold text-muted-foreground flex items-center gap-1 justify-center",
										children: [/* @__PURE__ */ (void 0)("span", { children: "Out of 5.0" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1632,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)(Star, { className: "h-4 w-4 text-amber-400 fill-amber-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1633,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1631,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1629,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "w-full space-y-4 pt-3 border-t",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-widest block mb-2",
										children: "Metrics Breakdown"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1638,
										columnNumber: 21
									}, this), [
										{
											label: "Productivity",
											value: avgProductivity
										},
										{
											label: "Teamwork",
											value: avgTeamwork
										},
										{
											label: "Communication",
											value: avgCommunication
										},
										{
											label: "Leadership",
											value: avgLeadership
										},
										{
											label: "Attendance",
											value: avgAttendance
										}
									].map((item) => /* @__PURE__ */ (void 0)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex justify-between text-xs font-semibold",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground",
												children: item.label
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1656,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("span", { children: [item.value, " / 5.0"] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1657,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1655,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "h-1.5 w-full rounded-full bg-border/40 overflow-hidden",
											children: /* @__PURE__ */ (void 0)("div", {
												className: "h-full rounded-full bg-gradient-to-r from-primary to-accent",
												style: { width: `${Number(item.value) / 5 * 100}%` }
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1660,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1659,
											columnNumber: 25
										}, this)]
									}, item.label, true, {
										fileName: _jsxFileName,
										lineNumber: 1654,
										columnNumber: 32
									}, this))]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1637,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1628,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1623,
							columnNumber: 15
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1622,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "md:col-span-2",
							children: /* @__PURE__ */ (void 0)(Card, {
								className: "border-border/60 bg-card/90 backdrop-blur-sm h-full",
								children: [/* @__PURE__ */ (void 0)(CardHeader, { children: [/* @__PURE__ */ (void 0)(CardTitle, { children: "Performance Reviews Summary" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1674,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)(CardDescription, { children: "Detailed evaluations submitted by HR managers and company reviews" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1675,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1673,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)(CardContent, { children: reviewsLoading ? /* @__PURE__ */ (void 0)(ListSkeleton, { count: 2 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1678,
									columnNumber: 37
								}, this) : reviews.length === 0 ? /* @__PURE__ */ (void 0)("div", {
									className: "py-12 text-center text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (void 0)(Star, { className: "h-10 w-10 mx-auto mb-3 text-muted-foreground/30" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1679,
										columnNumber: 23
									}, this), "No performance evaluations have been logged for your profile yet."]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1678,
									columnNumber: 89
								}, this) : /* @__PURE__ */ (void 0)("div", {
									className: "space-y-4",
									children: reviews.map((rev) => /* @__PURE__ */ (void 0)("div", {
										className: "rounded-xl border border-border/60 bg-muted/10 p-5 space-y-3",
										children: [
											/* @__PURE__ */ (void 0)("div", {
												className: "flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-border/40",
												children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
													className: "font-bold text-sm text-foreground block",
													children: [rev.period, " Review"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1685,
													columnNumber: 31
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "text-xs text-muted-foreground",
													children: ["Evaluated by: ", /* @__PURE__ */ (void 0)("span", {
														className: "text-foreground/80 font-medium",
														children: rev.reviewerName
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1686,
														columnNumber: 93
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1686,
													columnNumber: 31
												}, this)] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1684,
													columnNumber: 29
												}, this), /* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold",
													children: [/* @__PURE__ */ (void 0)(Star, { className: "h-3.5 w-3.5 fill-current" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1689,
														columnNumber: 31
													}, this), /* @__PURE__ */ (void 0)("span", { children: [rev.overall.toFixed(2), " Rating"] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1690,
														columnNumber: 31
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1688,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1683,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "text-sm text-muted-foreground italic bg-background/50 border rounded-lg p-3",
												children: [
													"\"",
													rev.feedback,
													"\""
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1694,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-[10px] text-muted-foreground font-semibold",
												children: [
													/* @__PURE__ */ (void 0)("div", { children: ["Productivity: ", /* @__PURE__ */ (void 0)("span", {
														className: "text-foreground font-bold",
														children: [rev.productivity, "/5"]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1699,
														columnNumber: 48
													}, this)] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1699,
														columnNumber: 29
													}, this),
													/* @__PURE__ */ (void 0)("div", { children: ["Teamwork: ", /* @__PURE__ */ (void 0)("span", {
														className: "text-foreground font-bold",
														children: [rev.teamwork, "/5"]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1700,
														columnNumber: 44
													}, this)] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1700,
														columnNumber: 29
													}, this),
													/* @__PURE__ */ (void 0)("div", { children: ["Comm: ", /* @__PURE__ */ (void 0)("span", {
														className: "text-foreground font-bold",
														children: [rev.communication, "/5"]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1701,
														columnNumber: 40
													}, this)] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1701,
														columnNumber: 29
													}, this),
													/* @__PURE__ */ (void 0)("div", { children: ["Leadership: ", /* @__PURE__ */ (void 0)("span", {
														className: "text-foreground font-bold",
														children: [rev.leadership, "/5"]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1702,
														columnNumber: 46
													}, this)] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1702,
														columnNumber: 29
													}, this),
													/* @__PURE__ */ (void 0)("div", { children: ["Attendance: ", /* @__PURE__ */ (void 0)("span", {
														className: "text-foreground font-bold",
														children: [rev.attendance, "/5"]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1703,
														columnNumber: 46
													}, this)] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1703,
														columnNumber: 29
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1698,
												columnNumber: 27
											}, this)
										]
									}, rev.id, true, {
										fileName: _jsxFileName,
										lineNumber: 1682,
										columnNumber: 43
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1681,
									columnNumber: 30
								}, this) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1677,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1672,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1671,
							columnNumber: 13
						}, this)]
					}, "performance", true, {
						fileName: _jsxFileName,
						lineNumber: 1609,
						columnNumber: 41
					}, this),
					activeTab === "documents" && /* @__PURE__ */ (void 0)(motion.div, {
						initial: {
							opacity: 0,
							y: 15
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -15
						},
						transition: { duration: .25 },
						className: "grid gap-6 md:grid-cols-3",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "space-y-6",
							children: /* @__PURE__ */ (void 0)(Card, {
								className: "border-border/60 bg-card/90 backdrop-blur-sm",
								children: [/* @__PURE__ */ (void 0)(CardHeader, { children: [/* @__PURE__ */ (void 0)(CardTitle, { children: "Documents & Resumes" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1728,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)(CardDescription, { children: "Verified file uploads associated with your credentials" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1729,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1727,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)(CardContent, {
									className: "space-y-4",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-3 rounded-lg border p-4 bg-muted/10",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "grid h-10 w-10 place-items-center rounded bg-primary/15 text-primary",
											children: /* @__PURE__ */ (void 0)(FileText, { className: "h-5 w-5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1734,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1733,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "font-bold text-xs block text-foreground",
												children: "Curriculum Vitae (CV)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1737,
												columnNumber: 23
											}, this), employee.resumeUrl ? /* @__PURE__ */ (void 0)("a", {
												href: employee.resumeUrl,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "text-xs text-primary hover:underline flex items-center gap-1 mt-0.5",
												children: ["View Resume ", /* @__PURE__ */ (void 0)(ExternalLink, { className: "h-3 w-3 shrink-0" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1739,
													columnNumber: 39
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1738,
												columnNumber: 45
											}, this) : /* @__PURE__ */ (void 0)("span", {
												className: "text-xs text-muted-foreground mt-0.5 block",
												children: "No resume document uploaded"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1740,
												columnNumber: 32
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1736,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1732,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-3 rounded-lg border p-4 bg-muted/10",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "grid h-10 w-10 place-items-center rounded bg-accent/15 text-accent",
											children: /* @__PURE__ */ (void 0)(Users, { className: "h-5 w-5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1746,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1745,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "font-bold text-xs block text-foreground",
												children: "Profile Photo"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1749,
												columnNumber: 23
											}, this), employee.photoUrl ? /* @__PURE__ */ (void 0)("a", {
												href: employee.photoUrl,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "text-xs text-accent hover:underline flex items-center gap-1 mt-0.5",
												children: ["View Image ", /* @__PURE__ */ (void 0)(ExternalLink, { className: "h-3 w-3 shrink-0" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1751,
													columnNumber: 38
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1750,
												columnNumber: 44
											}, this) : /* @__PURE__ */ (void 0)("span", {
												className: "text-xs text-muted-foreground mt-0.5 block",
												children: "No photo uploaded"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1752,
												columnNumber: 32
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1748,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1744,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1731,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1726,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1725,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "md:col-span-2 space-y-6",
							children: /* @__PURE__ */ (void 0)(Card, {
								className: "border-border/60 bg-card/90 backdrop-blur-sm h-full",
								children: [/* @__PURE__ */ (void 0)(CardHeader, { children: [/* @__PURE__ */ (void 0)(CardTitle, { children: "Certifications & Credentials" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1763,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)(CardDescription, { children: "Verified academic and professional certifications" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1764,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1762,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)(CardContent, {
									className: "space-y-4",
									children: [(employee.certifications ?? []).length === 0 ? /* @__PURE__ */ (void 0)("div", {
										className: "py-8 text-center text-sm text-muted-foreground",
										children: "No certificates recorded on your profile."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1767,
										columnNumber: 67
									}, this) : /* @__PURE__ */ (void 0)("div", {
										className: "grid gap-3 sm:grid-cols-2",
										children: (employee.certifications ?? []).map((cert) => /* @__PURE__ */ (void 0)("div", {
											className: "rounded-xl border border-border/60 bg-muted/10 p-4 flex items-center gap-3",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "h-8 w-8 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0",
												children: /* @__PURE__ */ (void 0)(BadgeCheck, { className: "h-5 w-5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1772,
													columnNumber: 29
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1771,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "font-bold text-xs text-foreground block truncate",
													children: cert
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1775,
													columnNumber: 29
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "text-[10px] text-muted-foreground",
													children: "Verified Certificate"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1776,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1774,
												columnNumber: 27
											}, this)]
										}, cert, true, {
											fileName: _jsxFileName,
											lineNumber: 1770,
											columnNumber: 78
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1769,
										columnNumber: 30
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "space-y-2 pt-4 border-t",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-widest block",
											children: "Portfolio Links"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1782,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "space-y-2",
											children: (employee.portfolioLinks ?? []).length === 0 ? /* @__PURE__ */ (void 0)("span", {
												className: "text-xs text-muted-foreground",
												children: "No portfolio links added."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1784,
												columnNumber: 71
											}, this) : (employee.portfolioLinks ?? []).map((link) => /* @__PURE__ */ (void 0)("a", {
												href: link,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "text-xs text-primary hover:underline flex items-center gap-1.5 truncate",
												children: [
													/* @__PURE__ */ (void 0)(Globe, { className: "h-3.5 w-3.5 shrink-0" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1785,
														columnNumber: 29
													}, this),
													/* @__PURE__ */ (void 0)("span", {
														className: "truncate",
														children: link
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1786,
														columnNumber: 29
													}, this),
													/* @__PURE__ */ (void 0)(ExternalLink, { className: "h-3 w-3 shrink-0 ml-auto" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1787,
														columnNumber: 29
													}, this)
												]
											}, link, true, {
												fileName: _jsxFileName,
												lineNumber: 1784,
												columnNumber: 208
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1783,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1781,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1766,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1761,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1760,
							columnNumber: 13
						}, this)]
					}, "documents", true, {
						fileName: _jsxFileName,
						lineNumber: 1712,
						columnNumber: 39
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1323,
				columnNumber: 7
			}, this),
			isAddHistoryOpen && /* @__PURE__ */ (void 0)(Dialog, {
				open: isAddHistoryOpen,
				onOpenChange: setIsAddHistoryOpen,
				children: /* @__PURE__ */ (void 0)(DialogContent, {
					className: "max-w-md",
					children: [/* @__PURE__ */ (void 0)(DialogHeader, { children: [/* @__PURE__ */ (void 0)(DialogTitle, { children: "Add Career History Entry" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1801,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)(DialogDescription, { children: "Manually record a previous employment. The company admin can verify this record." }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1802,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1800,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("form", {
						onSubmit: handleAddHistorySubmit,
						className: "space-y-4 py-2",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (void 0)(Label$1, {
									htmlFor: "companyName",
									children: "Company Name"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1808,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)(Input, {
									id: "companyName",
									name: "companyName",
									required: true
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1809,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1807,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (void 0)(Label$1, {
										htmlFor: "designation",
										children: "Designation"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1813,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)(Input, {
										id: "designation",
										name: "designation",
										required: true
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1814,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1812,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (void 0)(Label$1, {
										htmlFor: "department",
										children: "Department"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1817,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)(Input, {
										id: "department",
										name: "department"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1818,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1816,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1811,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (void 0)(Label$1, {
										htmlFor: "joiningDate",
										children: "Joining Date"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1823,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)(Input, {
										id: "joiningDate",
										name: "joiningDate",
										type: "date",
										required: true
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1824,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1822,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (void 0)(Label$1, {
										htmlFor: "exitDate",
										children: "Exit Date (Optional)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1827,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)(Input, {
										id: "exitDate",
										name: "exitDate",
										type: "date"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1828,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1826,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1821,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (void 0)(Label$1, {
										htmlFor: "experience",
										children: "Years of Experience"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1833,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)(Input, {
										id: "experience",
										name: "experience",
										type: "number",
										min: "0",
										defaultValue: "0",
										required: true
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1834,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1832,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (void 0)(Label$1, {
										htmlFor: "salary",
										children: "Salary (Optional & Confidential)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1837,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)(Input, {
										id: "salary",
										name: "salary",
										type: "number",
										min: "0",
										placeholder: "Monthly Salary"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1838,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1836,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1831,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(DialogFooter, {
								className: "pt-4 gap-2 sm:gap-0",
								children: [/* @__PURE__ */ (void 0)(DialogClose, {
									asChild: true,
									children: /* @__PURE__ */ (void 0)(Button, {
										type: "button",
										variant: "outline",
										children: "Cancel"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1843,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1842,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)(Button, {
									type: "submit",
									disabled: addHistoryMutation.isPending,
									children: addHistoryMutation.isPending ? "Adding..." : "Add to Timeline"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1845,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1841,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1806,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1799,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1798,
				columnNumber: 28
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 1270,
		columnNumber: 10
	}, this);
}
//#endregion
export { Dashboard as component };
