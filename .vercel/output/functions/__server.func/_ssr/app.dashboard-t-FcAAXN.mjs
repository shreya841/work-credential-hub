import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BPK1zgJN.mjs";
import { t as Badge } from "./badge-KS2SooOw.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-a-evWZ4r.mjs";
import { c as stringType, o as objectType } from "../_libs/zod.mjs";
import { t as Input } from "./input-BYcV5Phs.mjs";
import { n as useAuth } from "./auth-provider-DIoK8pn-.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-BbAAdpLg.mjs";
import { $ as Check, B as EllipsisVertical, C as Plus, F as FileText, N as Globe, O as Mail, R as ExternalLink, S as RefreshCw, T as Phone, U as Clock, a as UserPlus, at as Ban, c as TrendingUp, ct as ArrowUpRight, d as Star, dt as Archive, et as Calendar, f as Sparkles, ft as Activity, g as ShieldAlert, h as ShieldCheck, l as TrendingDown, n as X, nt as Building2, o as UserCheck, ot as BadgeCheck, q as CircleCheck, r as Users, rt as Briefcase, s as TriangleAlert, t as Zap, u as Trash2 } from "../_libs/lucide-react.mjs";
import { a as DropdownMenuSeparator, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-BuTtChvS.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-DRtcuf8H.mjs";
import { t as PageHeader } from "./page-header-DHJUr0Vr.mjs";
import { a as StatCardSkeleton, n as ChartSkeleton, r as ListSkeleton } from "./loading-skeleton-BKYH7Wpk.mjs";
import { t as EmptyState } from "./empty-state-B-onYlus.mjs";
import { t as Label$1 } from "./label-qle7VSy6.mjs";
import { a as DialogFooter, i as DialogDescription, n as DialogClose, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-OO5XYV91.mjs";
import { a as listCompanies, i as getCompanyDeleteImpact, n as deleteCompany, o as updateCompany, r as getCompanyById } from "./companies.functions-r1DEM_Ym.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as listVerificationRequests, r as resolveVerificationRequest } from "./verification2.functions-DVHevb61.mjs";
import { i as AnimatePresence, r as motion, t as useInView } from "../_libs/framer-motion.mjs";
import { a as getEmployeeByUserId, s as getEmploymentHistory, t as addEmploymentHistory } from "./employees.functions-BfzS3dm3.mjs";
import { i as listReviews } from "./performance.functions-bbiyboZ8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.dashboard-t-FcAAXN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `pointer-events-none absolute -inset-3 rounded-2xl ${s.glowBg} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-80` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-br ${s.borderGlow} opacity-0 transition-opacity duration-300 group-hover:opacity-100` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-xl border border-border/60 bg-card/90 p-5 backdrop-blur-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `pointer-events-none absolute inset-0 bg-gradient-to-br ${s.gradient}` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-semibold uppercase tracking-widest text-muted-foreground",
									children: label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-display text-3xl font-bold tracking-tight tabular-nums",
									children: display
								}),
								trend && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: `mt-1.5 inline-flex items-center gap-1 text-xs font-semibold ${trendUp ? "text-success" : trendDown ? "text-destructive" : "text-muted-foreground"}`,
									children: [trendUp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3.5 w-3.5" }) : trendDown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-3.5 w-3.5" }) : null, trend]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
						})]
					})
				]
			})
		]
	});
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
var DashboardCharts = (0, import_react.lazy)(() => import("./dashboard-charts-lazy-vh-B7vwK.mjs"));
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: W,
		height: H,
		className: "mx-auto mt-1",
		children: [values.map((v, i) => {
			const bH = Math.max(v / max * (H - 4), 2);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: i * (barW + gap),
				y: H - bH,
				width: barW,
				height: bH,
				fill: color,
				fillOpacity: .75,
				rx: 1.5
			}, i);
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: 0,
			y1: H,
			x2: W,
			y2: H,
			stroke: color,
			strokeOpacity: .25,
			strokeWidth: 1
		})]
	});
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
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-28 w-28 rounded-full bg-muted animate-pulse" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-20 rounded bg-muted animate-pulse" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-7 w-20 rounded bg-muted animate-pulse" })
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500",
					style: { backgroundColor: color }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					width: "104",
					height: "110",
					viewBox: "0 0 104 110",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: trackPath,
							fill: "none",
							stroke: "currentColor",
							strokeOpacity: .1,
							strokeWidth: "7",
							strokeLinecap: "round",
							className: "text-foreground"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
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
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
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
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
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
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-semibold text-center text-muted-foreground leading-tight px-1",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniSparkBar, {
				values: sparkValues,
				color
			})
		]
	});
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
	if (user?.role === "super_admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuperAdminDashboard, {});
	if (user?.role === "company_admin" || user?.role === "hr") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HrDashboard, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeeDashboard, {});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Super Admin Controls",
				description: "System-wide metrics and company verification requests."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
				].map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					variants: fadeSlideUp,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, { ...card })
				}, card.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-border/60 bg-card/80 backdrop-blur-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Company Registration Requests" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Review and verify new company registrations" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Search companies...",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							className: "w-full sm:max-w-xs"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 5 }) : companies.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: Building2,
						title: "No companies found",
						description: "No company registrations match your filter criteria."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm text-left text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "text-xs uppercase bg-muted/50 text-foreground border-b border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3",
										children: "Company Details"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3",
										children: "Industry"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3",
										children: "Website"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 text-right",
										children: "Actions"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border",
								children: companies.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.tr, {
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
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
													className: "h-9 w-9 border ring-1 ring-border/40",
													children: [c.logoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: c.logoUrl }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
														className: "font-semibold",
														children: c.name[0]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium text-foreground block",
													children: c.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-muted-foreground block",
													children: c.location || "No Location"
												})] })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: c.industry
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: c.website ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: c.website,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "text-primary hover:underline inline-flex items-center gap-1",
												children: ["Visit ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })]
											}) : "None"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: c.status === "approved" ? "default" : c.status === "pending" ? "outline" : "destructive",
												className: c.status === "approved" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/20 capitalize font-medium" : c.status === "rejected" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border-rose-500/20 capitalize font-medium" : c.status === "suspended" ? "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/10 border-red-500/20 capitalize font-medium" : c.status === "archived" ? "bg-slate-500/10 text-slate-600 dark:text-slate-400 hover:bg-slate-500/10 border-slate-500/20 capitalize font-medium" : c.status === "deleted" ? "bg-red-950/15 text-red-500 dark:text-red-400 hover:bg-red-950/15 border-red-500/30 capitalize font-medium line-through" : "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 border-amber-500/20 capitalize font-medium",
												children: c.status || "Pending"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-end gap-2 items-center",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													variant: "outline",
													onClick: () => setSelectedCompany(c),
													children: "View Profile"
												}), c.status !== "deleted" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
													asChild: true,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														variant: "ghost",
														size: "sm",
														className: "h-8 w-8 p-0 cursor-pointer",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "sr-only",
															children: "Open actions"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "h-4 w-4" })]
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
													align: "end",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Actions" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
														c.status !== "approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
															onClick: () => verifyMutation.mutate(c.id),
															className: "text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50 dark:focus:bg-emerald-950/20 cursor-pointer",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-2 h-4 w-4" }), " Approve"]
														}),
														c.status !== "rejected" && c.status !== "approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
															onClick: () => {
																if (confirm(`Are you sure you want to reject "${c.name}"?`)) rejectMutation.mutate(c.id);
															},
															className: "text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/20 cursor-pointer",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "mr-2 h-4 w-4" }), " Reject"]
														}),
														c.status === "approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
															onClick: () => suspendMutation.mutate(c.id),
															className: "text-amber-600 focus:text-amber-600 focus:bg-amber-50 dark:focus:bg-amber-950/20 cursor-pointer",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mr-2 h-4 w-4" }), " Suspend"]
														}),
														c.status !== "archived" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
															onClick: () => archiveMutation.mutate(c.id),
															className: "text-slate-600 focus:text-slate-600 focus:bg-slate-50 dark:focus:bg-slate-950/20 cursor-pointer",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "mr-2 h-4 w-4" }), " Archive"]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
															onClick: () => {
																setCompanyToDelete(c);
																setDeleteConfirmOpen(true);
																setConfirmNameInput("");
															},
															className: "text-rose-600 font-semibold focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/20 cursor-pointer",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 h-4 w-4" }), " Delete Company"]
														})
													]
												})] })]
											})
										})
									]
								}, c.id))
							})]
						})
					}) })]
				})
			}),
			selectedCompany && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!selectedCompany,
				onOpenChange: (open) => !open && setSelectedCompany(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Company General Profile" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "General overview details of the registered company." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4 border-b pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
									className: "h-16 w-16 border",
									children: [selectedCompany.logoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: selectedCompany.logoUrl }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
										className: "text-xl font-bold",
										children: selectedCompany.name[0]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-bold text-foreground",
									children: selectedCompany.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: selectedCompany.status === "approved" ? "default" : selectedCompany.status === "pending" ? "outline" : "destructive",
									className: selectedCompany.status === "approved" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/20 mt-1 capitalize font-medium" : selectedCompany.status === "rejected" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border-rose-500/20 mt-1 capitalize font-medium" : selectedCompany.status === "suspended" ? "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/10 border-red-500/20 mt-1 capitalize font-medium" : selectedCompany.status === "archived" ? "bg-slate-500/10 text-slate-600 dark:text-slate-400 hover:bg-slate-500/10 border-slate-500/20 mt-1 capitalize font-medium" : selectedCompany.status === "deleted" ? "bg-red-950/15 text-red-500 dark:text-red-400 hover:bg-red-950/15 border-red-500/30 mt-1 capitalize font-medium line-through" : "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 border-amber-500/20 mt-1 capitalize font-medium",
									children: selectedCompany.status || "Pending"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground block text-xs",
										children: "Industry"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: selectedCompany.industry
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground block text-xs",
										children: "Company Size"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: selectedCompany.size || "Not provided"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground block text-xs",
										children: "Location"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: selectedCompany.location || "Not provided"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground block text-xs",
										children: "Website"
									}), selectedCompany.website ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: selectedCompany.website,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "font-medium text-primary hover:underline inline-flex items-center gap-1",
										children: [selectedCompany.website.replace("https://", "").replace("http://", ""), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground",
										children: "Not provided"
									})] }),
									selectedCompany.creatorName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "col-span-2 border-t pt-3 mt-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground block text-xs",
												children: "Registered By"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-foreground block",
												children: selectedCompany.creatorName
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: selectedCompany.creatorEmail
											})
										]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "flex flex-wrap gap-2 justify-end sm:gap-2 border-t pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									children: "Close"
								})
							}), selectedCompany.status !== "deleted" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								selectedCompany.status !== "approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									className: "bg-emerald-600 hover:bg-emerald-700 text-white font-medium cursor-pointer",
									onClick: () => verifyMutation.mutate(selectedCompany.id),
									disabled: verifyMutation.isPending,
									children: "Approve"
								}),
								selectedCompany.status !== "rejected" && selectedCompany.status !== "approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "destructive",
									className: "font-medium cursor-pointer",
									onClick: () => {
										if (confirm(`Are you sure you want to reject "${selectedCompany.name}"?`)) rejectMutation.mutate(selectedCompany.id);
									},
									disabled: rejectMutation.isPending,
									children: "Reject"
								}),
								selectedCompany.status === "approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									className: "border-amber-500/30 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/10 font-medium cursor-pointer",
									onClick: () => suspendMutation.mutate(selectedCompany.id),
									disabled: suspendMutation.isPending,
									children: "Suspend"
								}),
								selectedCompany.status !== "archived" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									className: "border-slate-500/30 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-950/10 font-medium cursor-pointer",
									onClick: () => archiveMutation.mutate(selectedCompany.id),
									disabled: archiveMutation.isPending,
									children: "Archive"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "destructive",
									className: "font-semibold bg-rose-600 hover:bg-rose-700 cursor-pointer",
									onClick: () => {
										setCompanyToDelete(selectedCompany);
										setDeleteConfirmOpen(true);
										setConfirmNameInput("");
									},
									children: "Delete Company"
								})
							] })]
						})
					]
				})
			}),
			deleteConfirmOpen && companyToDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: deleteConfirmOpen,
				onOpenChange: (open) => !open && setDeleteConfirmOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md bg-background border border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "flex items-center gap-2 text-rose-600 font-display text-lg font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5 text-rose-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Confirm Company Deletion" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Review the cascading impact of soft-deleting this company." })] }),
						isLoadingImpact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-6 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-6 w-6 animate-spin text-muted-foreground" })
						}) : deleteImpact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-rose-500/10 dark:bg-rose-950/20 border border-rose-500/20 p-3.5 rounded-xl text-rose-700 dark:text-rose-300",
									children: [
										"Are you sure you want to soft-delete ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: deleteImpact.companyName }),
										"? This action will archive active relationships but preserve individual career history."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-semibold text-foreground text-xs uppercase tracking-wider",
										children: "Cascading Impact Summary:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2 border border-border/60 rounded-xl p-3 bg-muted/20",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between items-center pb-1.5 border-b border-border/40",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground font-medium",
													children: "Company Record:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "destructive",
													className: "bg-rose-500/10 text-rose-600 border-rose-500/20 font-medium",
													children: "Status to DELETED"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between items-center py-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground font-medium",
													children: "HR / Admin Accounts:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-bold text-foreground",
													children: [deleteImpact.hrCount, " unlinked (set to null)"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between items-center py-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground font-medium",
													children: "Active Employee Profiles:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-bold text-foreground",
													children: [deleteImpact.employeeCount, " unlinked & profiles survive"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between items-center py-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground font-medium",
													children: "Employment Records:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-bold text-emerald-600 dark:text-emerald-400",
													children: [deleteImpact.employeeCount, " archived in career history"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between items-center py-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground font-medium",
													children: "Verification Requests:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-bold text-foreground",
													children: [deleteImpact.requestCount, " historical records kept"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between items-center pt-1.5 border-t border-border/40",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground font-medium",
													children: "Performance Reviews:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-bold text-foreground",
													children: [deleteImpact.reviewCount, " preserved on employees"]
												})]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 mt-4 pt-2 border-t border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										className: "text-foreground font-medium block",
										children: [
											"Type ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: deleteImpact.companyName }),
											" to confirm deletion:"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "confirm-name-input",
										value: confirmNameInput,
										onChange: (e) => setConfirmNameInput(e.target.value),
										placeholder: "Enter company name",
										className: "border-rose-500/30 focus-visible:ring-rose-500/30 w-full"
									})]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-4 text-center text-muted-foreground",
							children: "Failed to load impact details."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:gap-0 mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setDeleteConfirmOpen(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "destructive",
								disabled: isLoadingImpact || !deleteImpact || confirmNameInput !== deleteImpact.companyName || deleteMutation.isPending,
								onClick: () => deleteMutation.mutate(companyToDelete.id),
								className: "bg-rose-600 hover:bg-rose-700 text-white font-semibold cursor-pointer",
								children: deleteMutation.isPending ? "Deleting..." : "Confirm Deletion"
							})]
						})
					]
				})
			})
		]
	});
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
	if (companyLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center p-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			animate: { rotate: 360 },
			transition: {
				duration: 1,
				repeat: Infinity,
				ease: "linear"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-6 w-6 text-primary" })
		})
	});
	if (!isApproved) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Company Workspace",
			description: "Your company workspace status page."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-amber-200/50 bg-amber-50/10 p-6 md:p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center text-center max-w-lg mx-auto space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-full bg-amber-100 p-4 text-amber-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-12 w-12" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold text-foreground",
							children: isSuspended ? "Workspace Suspended" : isRejected ? "Registration Rejected" : "Verification Pending"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-sm",
							children: isSuspended ? "Your company workspace has been suspended by the platform administrator. Access to verification features, performance reviews, and employee claims is restricted." : isRejected ? "Your company registration request was rejected by the platform administrator. Access to company workspace features is restricted." : "Your company registration is awaiting verification approval. Access to adding employees and performing employee background checks is restricted until verified by the platform admin."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/app/settings",
									children: "View System Info"
								})
							})
						})
					]
				})
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: -12
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { duration: .4 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
					title: "Dashboard",
					description: "Overview of your workforce reputation and performance.",
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "bg-gradient-hero text-primary-foreground shadow-elegant",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/app/employees",
								children: "View Employees"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/app/verification",
								children: "Verification Requests"
							})
						})]
					})
				})
			}),
			statsLoading || !stats ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCardSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				variants: staggerContainer,
				initial: "hidden",
				animate: "visible",
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: fadeSlideUp,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Total Employees",
							value: stats.totalEmployees,
							icon: Users,
							tone: "primary",
							trend: trendData.employees
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: fadeSlideUp,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Active Employees",
							value: stats.activeEmployees,
							icon: UserCheck,
							tone: "success",
							trend: trendData.active
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: fadeSlideUp,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Performance Reviews",
							value: stats.totalReviews,
							icon: TrendingUp,
							tone: "accent"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: fadeSlideUp,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Verified Employees",
							value: stats.verifiedEmployees,
							icon: BadgeCheck,
							tone: "warning",
							trend: trendData.verified
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-border/60 bg-card/85 backdrop-blur-sm overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-0.5 w-full bg-gradient-to-r from-[#00C2FF] via-[#40C1C0] to-[#F69336]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "py-5 px-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
									children: statsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-24 bg-muted animate-pulse rounded" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-20 bg-muted animate-pulse rounded" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-16 bg-muted animate-pulse rounded" })
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
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
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[10px] text-muted-foreground uppercase tracking-widest",
											children: "Last 12 months"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-bold text-foreground",
											children: "Total Employees"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniSparkBar, {
											values: hiringTrend?.map((t) => t.hires) ?? [],
											color: RADIAL_PALETTE[0]
										})
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadialGaugeCard, {
									label: "Verified",
									value: stats?.verifiedEmployees ?? 0,
									total: stats?.totalEmployees ?? 0,
									color: RADIAL_PALETTE[1],
									sparkValues: hiringTrend?.map((t) => t.hires) ?? [],
									isLoading: statsLoading
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadialGaugeCard, {
									label: "Active",
									value: stats?.activeEmployees ?? 0,
									total: stats?.totalEmployees ?? 0,
									color: RADIAL_PALETTE[2],
									sparkValues: hiringTrend?.map((t) => Math.max(t.hires - t.exits, 0)) ?? [],
									isLoading: statsLoading || trendLoading
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadialGaugeCard, {
									label: "Approved",
									value: verificationStats?.find((v) => v.status === "approved")?.count ?? 0,
									total: verificationStats?.reduce((s, v) => s + v.count, 0) ?? 0,
									color: RADIAL_PALETTE[3],
									sparkValues: verificationStats?.map((v) => v.count) ?? [],
									isLoading: verificationStatsLoading
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadialGaugeCard, {
									label: "Reviews",
									value: stats?.totalReviews ?? 0,
									total: Math.max(stats?.totalReviews ?? 0, 1),
									color: RADIAL_PALETTE[4],
									sparkValues: ratingDist?.map((r) => r.count) ?? [],
									isLoading: statsLoading || ratingLoading
								})
							]
						})
					})]
				})
			}),
			dashboardDataLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 xl:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartSkeleton, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartSkeleton, {})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 xl:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartSkeleton, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartSkeleton, {})]
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardCharts, {
					hiringTrend,
					departmentAnalytics,
					verificationStats,
					ratingDist
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "border-border/60 bg-card/80 backdrop-blur-sm h-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							className: "flex flex-row items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Recent Employees" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "ghost",
								size: "sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/app/employees",
									children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "ml-1 h-3 w-3" })]
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "space-y-2",
							children: recentLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 4 }) : !recentEmployees || recentEmployees.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
								icon: Users,
								title: "No employees yet",
								description: "Get started by registering your first employee record."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								variants: staggerContainer,
								initial: "hidden",
								animate: "visible",
								className: "space-y-2",
								children: recentEmployees.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									variants: fadeSlideLeft,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/app/employees/$id",
										params: { id: e.id },
										className: "group flex items-center gap-3 rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-primary/20 hover:bg-primary/5 hover:shadow-elegant",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
												className: "h-10 w-10 ring-1 ring-border/40 group-hover:ring-primary/30 transition-all",
												children: [e.photoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: e.photoUrl }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
													className: "font-semibold text-sm",
													children: e.fullName[0]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "truncate font-semibold text-sm",
														children: e.fullName
													}), e.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-3.5 w-3.5 text-primary shrink-0" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "truncate text-xs text-muted-foreground",
													children: [
														e.designation,
														" · ",
														e.department
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: e.status === "active" ? "default" : "outline",
												className: `shrink-0 capitalize text-xs ${e.status === "active" ? "bg-success/15 text-success border-success/20" : ""}`,
												children: e.status.replace("_", " ")
											})
										]
									})
								}, e.id))
							})
						})]
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
						delay: .56
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "border-border/60 bg-card/80 backdrop-blur-sm h-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Live Activity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								className: "border-success/30 bg-success/8 text-success text-[10px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mr-1 h-1.5 w-1.5 rounded-full bg-success inline-block animate-pulse" }), "Auto-refresh"]
							})]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: activityLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 4 }) : !recentActivity || recentActivity.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-12 text-center text-sm text-muted-foreground",
							children: "No activity logs recorded."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[22px] top-3 bottom-3 w-px bg-gradient-to-b from-primary/30 via-border/40 to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: recentActivity.map((a, i) => {
								const meta = getActivityMeta(a.targetType ?? "", a.action);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									variants: fadeSlideLeft,
									initial: "hidden",
									animate: "visible",
									transition: { delay: i * .06 },
									className: "flex items-start gap-3 pl-1 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${meta.bg} ring-2 ring-background`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(meta.icon, { className: `h-3.5 w-3.5 ${meta.color}` })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1 pt-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-foreground font-medium leading-tight truncate",
											children: a.action
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
											className: "text-xs text-muted-foreground mt-0.5 block",
											children: new Date(a.timestamp).toLocaleString()
										})]
									})]
								}, a.id);
							}) })]
						}) })]
					})
				})]
			})
		]
	});
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
	if (employeeLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center p-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			animate: { rotate: 360 },
			transition: {
				duration: 1,
				repeat: Infinity,
				ease: "linear"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-6 w-6 text-primary" })
		})
	});
	if (!employee) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 text-center text-red-500",
		children: "Professional profile not found. Please contact support."
	});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: -12
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { duration: .4 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
					title: `Welcome, ${employee.fullName}`,
					description: "Manage your professional workforce identity, verification requests, and reputation.",
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "bg-gradient-hero text-primary-foreground shadow-elegant",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/app/profile",
								children: "Edit Profile"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/app/consent",
								children: "Consent Manager"
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab(tab.id),
						className: `flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${isActive ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }),
							tab.label,
							tab.count !== void 0 && tab.count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`,
								children: tab.count
							})
						]
					}, tab.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
				mode: "wait",
				children: [
					activeTab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								ref: scoreRef,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
									className: "border-border/60 bg-card/90 backdrop-blur-sm overflow-hidden h-full",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-1 w-full bg-gradient-to-r ${trustGradient}` }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-primary" }), "Dynamic Trust Score"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Real-time integrity & performance ranking" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
											className: "flex flex-col items-center space-y-5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative flex items-center justify-center h-36 w-36",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute inset-0 rounded-full bg-gradient-to-br ${trustGradient} opacity-10 blur-lg` }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
															className: "w-full h-full transform -rotate-90",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
																	cx: "72",
																	cy: "72",
																	r: "56",
																	className: "stroke-border/30",
																	strokeWidth: "8",
																	fill: "transparent"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
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
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
																	id: `scoreGradient-${employee.id}`,
																	x1: "0",
																	y1: "0",
																	x2: "1",
																	y2: "1",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
																		offset: "0%",
																		stopColor: "var(--color-primary)"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
																		offset: "100%",
																		stopColor: "var(--color-accent)"
																	})]
																}) })
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "absolute flex flex-col items-center justify-center",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
																className: "font-display text-4xl font-bold",
																initial: { opacity: 0 },
																animate: scoreInView ? { opacity: 1 } : {},
																transition: { delay: .6 },
																children: score
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] text-muted-foreground uppercase tracking-widest",
																children: "Points"
															})]
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: `inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${trustTextColor} border-current/20 bg-current/5`,
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3.5 w-3.5" }),
														trustRating,
														" Trust Status"
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "w-full space-y-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground border-b pb-1.5",
														children: "Score Breakdown"
													}), scoreBreakdown.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center justify-between text-[11px]",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center gap-1.5 text-muted-foreground",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-3 w-3" }), item.label]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "font-semibold text-foreground tabular-nums",
																children: [
																	item.points,
																	"/",
																	item.weight,
																	" pts"
																]
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "h-1.5 w-full rounded-full bg-border/50 overflow-hidden",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
																className: `h-full rounded-full bg-gradient-to-r ${trustGradient}`,
																initial: { width: 0 },
																animate: scoreInView ? { width: `${item.points / item.weight * 100}%` } : {},
																transition: {
																	duration: .9,
																	ease: "easeOut",
																	delay: .3 + i * .1
																}
															})
														})]
													}, item.label))]
												})
											]
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "md:col-span-2 space-y-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
									className: "border-border/60 bg-card/90 backdrop-blur-sm h-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Professional Profile Summary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "General information visible to hiring managers" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
										className: "space-y-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col sm:flex-row gap-4 items-start border-b pb-5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
													className: "h-18 w-18 border-2 ring-2 ring-primary/20 shrink-0",
													style: {
														height: 72,
														width: 72
													},
													children: [employee.photoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: employee.photoUrl }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
														className: "text-2xl font-bold",
														children: employee.fullName[0]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
															className: "text-xl font-bold text-foreground flex items-center gap-2",
															children: [employee.fullName, employee.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-5 w-5 text-primary" })]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "text-sm font-semibold text-muted-foreground flex items-center gap-1.5",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: employee.designation }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-xs text-primary font-mono bg-primary/5 px-2 py-0.5 rounded border border-primary/10",
																	children: ["ID: ", employee.employeeId]
																})
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex flex-wrap gap-1.5 mt-2",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
																	variant: "outline",
																	className: employee.claimStatus === "claimed" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs" : "border-amber-500/30 bg-amber-50/10 text-amber-400 text-xs",
																	children: employee.claimStatus === "claimed" ? "Verified Employee" : "Profile Not Claimed"
																}),
																employee.department && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
																	variant: "secondary",
																	className: "text-xs",
																	children: employee.department
																}),
																employee.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
																	className: "text-xs bg-success/15 text-success border-success/20",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3 mr-1" }), " Verified"]
																})
															]
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2 text-muted-foreground",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "truncate",
															children: employee.email
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2 text-muted-foreground",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: employee.phone || "No phone added" })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2 text-muted-foreground",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [employee.experience, " years experience"] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2 text-muted-foreground",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Joined ", new Date(employee.joiningDate).toLocaleDateString()] })]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-4 pt-4 border-t",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-1 space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-widest block",
														children: "Skills Summary"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-wrap gap-1",
														children: [employee.skills.slice(0, 5).map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
															variant: "secondary",
															className: "text-[10px]",
															children: skill
														}, skill)), employee.skills.length > 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
															variant: "outline",
															className: "text-[10px]",
															children: `+${employee.skills.length - 5} more`
														})]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-1 space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-widest block",
														children: "Verification Status"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex items-center gap-1.5 text-xs",
														children: employee.verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-emerald-500 flex items-center font-semibold",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 mr-1 shrink-0" }), " Credential Verified"]
														}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-amber-500 flex items-center font-semibold",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 mr-1 shrink-0" }), " Verification Pending"]
														})
													})]
												})]
											})
										]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "md:col-span-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
									className: "border-border/60 bg-card/90 backdrop-blur-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-5 w-5 text-primary" }), "Incoming Consent & Verification Requests"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Authorize background checks from external company HR managers" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: requestsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 2 }) : verificationRequests.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "py-8 text-center text-sm text-muted-foreground",
										children: "No active consent or background check verification requests."
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid gap-3 sm:grid-cols-2",
										children: verificationRequests.map((req) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border/60 bg-muted/10 p-4 flex flex-col justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between items-start",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-sm text-foreground block",
													children: req.requestedByCompany
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] text-muted-foreground capitalize",
													children: req.requestType
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] text-muted-foreground",
													children: new Date(req.createdAt).toLocaleDateString()
												})]
											}), req.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2 mt-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													className: "flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8",
													onClick: () => resolveRequestMutation.mutate({
														id: req.id,
														status: "approved"
													}),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 mr-1" }), " Grant Access"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													variant: "outline",
													className: "flex-1 text-destructive border-destructive/30 hover:bg-destructive/8 text-xs h-8",
													onClick: () => resolveRequestMutation.mutate({
														id: req.id,
														status: "denied"
													}),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5 mr-1" }), " Deny"]
												})]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: req.status === "approved" ? "default" : "destructive",
												className: "w-full capitalize justify-center text-center mt-2",
												children: req.status === "approved" ? "Approved" : "Denied"
											})]
										}, req.id))
									}) })]
								})
							})
						]
					}, "overview"),
					activeTab === "career" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border-border/60 bg-card/90 backdrop-blur-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								className: "flex flex-row items-center justify-between flex-wrap gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Verified Career History" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "A complete timeline of your employment history. Previous records remain preserved when joining new companies." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: () => setIsAddHistoryOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1" }), " Add Tenure"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: historyLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 3 }) : !history || history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
								icon: Briefcase,
								title: "No Career Records Logged",
								description: "You can add past companies manually to populate your verified employment timeline."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative pl-6 space-y-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[9px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary/50 via-border/40 to-transparent" }), history.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative pl-8 group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `absolute left-[-2px] top-1.5 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${item.verificationStatus === "verified" ? "border-success bg-success/15" : item.verificationStatus === "rejected" ? "border-destructive bg-destructive/15" : "border-primary bg-primary/10"}`,
										children: item.verificationStatus === "verified" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-success" }) : item.verificationStatus === "rejected" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5 text-destructive" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5 text-primary" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border/60 bg-muted/10 p-5 transition-all duration-200 hover:border-primary/20 hover:bg-primary/5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
												className: "font-bold text-foreground text-base flex items-center gap-1.5",
												children: [item.companyName, item.verificationStatus === "verified" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-4 w-4 text-emerald-500" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm text-muted-foreground font-medium",
												children: item.designation
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: item.verificationStatus === "verified" ? "default" : item.verificationStatus === "rejected" ? "destructive" : "outline",
												className: `capitalize text-xs w-fit ${item.verificationStatus === "verified" ? "bg-success/15 text-success border-success/20" : ""}`,
												children: item.verificationStatus
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-muted-foreground pt-3 border-t border-border/40",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
														new Date(item.joiningDate).toLocaleDateString(),
														" –",
														" ",
														item.exitDate ? new Date(item.exitDate).toLocaleDateString() : "Present (Active)"
													] })]
												}),
												item.department && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [item.department, " Department"] })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [item.experience, " yrs tenure experience"] })]
												})
											]
										})]
									})]
								}, item.id))]
							}) })]
						})
					}, "career"),
					activeTab === "performance" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border-border/60 bg-card/90 backdrop-blur-sm h-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Tenure Rating Summary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Aggregated metric scores based on company performance reviews" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "flex flex-col items-center space-y-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-5xl font-display font-extrabold text-primary",
										children: avgOverall
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-sm font-semibold text-muted-foreground flex items-center gap-1 justify-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Out of 5.0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 text-amber-400 fill-amber-400" })]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full space-y-4 pt-3 border-t",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-widest block mb-2",
										children: "Metrics Breakdown"
									}), [
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
									].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs font-semibold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: item.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [item.value, " / 5.0"] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-1.5 w-full rounded-full bg-border/40 overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full rounded-full bg-gradient-to-r from-primary to-accent",
												style: { width: `${Number(item.value) / 5 * 100}%` }
											})
										})]
									}, item.label))]
								})]
							})]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "border-border/60 bg-card/90 backdrop-blur-sm h-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Performance Reviews Summary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Detailed evaluations submitted by HR managers and company reviews" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: reviewsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 2 }) : reviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "py-12 text-center text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-10 w-10 mx-auto mb-3 text-muted-foreground/30" }), "No performance evaluations have been logged for your profile yet."]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-4",
									children: reviews.map((rev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-border/60 bg-muted/10 p-5 space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-border/40",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-bold text-sm text-foreground block",
													children: [rev.period, " Review"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs text-muted-foreground",
													children: ["Evaluated by: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-foreground/80 font-medium",
														children: rev.reviewerName
													})]
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [rev.overall.toFixed(2), " Rating"] })]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-sm text-muted-foreground italic bg-background/50 border rounded-lg p-3",
												children: [
													"\"",
													rev.feedback,
													"\""
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-[10px] text-muted-foreground font-semibold",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Productivity: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-foreground font-bold",
														children: [rev.productivity, "/5"]
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Teamwork: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-foreground font-bold",
														children: [rev.teamwork, "/5"]
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Comm: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-foreground font-bold",
														children: [rev.communication, "/5"]
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Leadership: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-foreground font-bold",
														children: [rev.leadership, "/5"]
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Attendance: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-foreground font-bold",
														children: [rev.attendance, "/5"]
													})] })
												]
											})
										]
									}, rev.id))
								}) })]
							})
						})]
					}, "performance"),
					activeTab === "documents" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "border-border/60 bg-card/90 backdrop-blur-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Documents & Resumes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Verified file uploads associated with your credentials" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 rounded-lg border p-4 bg-muted/10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid h-10 w-10 place-items-center rounded bg-primary/15 text-primary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-xs block text-foreground",
												children: "Curriculum Vitae (CV)"
											}), employee.resumeUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: employee.resumeUrl,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "text-xs text-primary hover:underline flex items-center gap-1 mt-0.5",
												children: ["View Resume ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3 shrink-0" })]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground mt-0.5 block",
												children: "No resume document uploaded"
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 rounded-lg border p-4 bg-muted/10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid h-10 w-10 place-items-center rounded bg-accent/15 text-accent",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-xs block text-foreground",
												children: "Profile Photo"
											}), employee.photoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: employee.photoUrl,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "text-xs text-accent hover:underline flex items-center gap-1 mt-0.5",
												children: ["View Image ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3 shrink-0" })]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground mt-0.5 block",
												children: "No photo uploaded"
											})]
										})]
									})]
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-2 space-y-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "border-border/60 bg-card/90 backdrop-blur-sm h-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Certifications & Credentials" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Verified academic and professional certifications" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "space-y-4",
									children: [(employee.certifications ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "py-8 text-center text-sm text-muted-foreground",
										children: "No certificates recorded on your profile."
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid gap-3 sm:grid-cols-2",
										children: (employee.certifications ?? []).map((cert) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border/60 bg-muted/10 p-4 flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-8 w-8 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-5 w-5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-xs text-foreground block truncate",
													children: cert
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] text-muted-foreground",
													children: "Verified Certificate"
												})]
											})]
										}, cert))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2 pt-4 border-t",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-widest block",
											children: "Portfolio Links"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-2",
											children: (employee.portfolioLinks ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "No portfolio links added."
											}) : (employee.portfolioLinks ?? []).map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: link,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "text-xs text-primary hover:underline flex items-center gap-1.5 truncate",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-3.5 w-3.5 shrink-0" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "truncate",
														children: link
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3 shrink-0 ml-auto" })
												]
											}, link))
										})]
									})]
								})]
							})
						})]
					}, "documents")
				]
			}),
			isAddHistoryOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: isAddHistoryOpen,
				onOpenChange: setIsAddHistoryOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add Career History Entry" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Manually record a previous employment. The company admin can verify this record." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleAddHistorySubmit,
						className: "space-y-4 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
									htmlFor: "companyName",
									children: "Company Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "companyName",
									name: "companyName",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
										htmlFor: "designation",
										children: "Designation"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "designation",
										name: "designation",
										required: true
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
										htmlFor: "department",
										children: "Department"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "department",
										name: "department"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
										htmlFor: "joiningDate",
										children: "Joining Date"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "joiningDate",
										name: "joiningDate",
										type: "date",
										required: true
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
										htmlFor: "exitDate",
										children: "Exit Date (Optional)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "exitDate",
										name: "exitDate",
										type: "date"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
										htmlFor: "experience",
										children: "Years of Experience"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "experience",
										name: "experience",
										type: "number",
										min: "0",
										defaultValue: "0",
										required: true
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
										htmlFor: "salary",
										children: "Salary (Optional & Confidential)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "salary",
										name: "salary",
										type: "number",
										min: "0",
										placeholder: "Monthly Salary"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
								className: "pt-4 gap-2 sm:gap-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										children: "Cancel"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									disabled: addHistoryMutation.isPending,
									children: addHistoryMutation.isPending ? "Adding..." : "Add to Timeline"
								})]
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { Dashboard as component };
