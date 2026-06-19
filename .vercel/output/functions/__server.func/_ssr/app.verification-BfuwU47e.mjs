import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DnxMo53r.mjs";
import { t as Badge } from "./badge-GBPLA4QD.mjs";
import { t as Input } from "./input-C8wv43d_.mjs";
import { n as useAuth } from "./auth-provider-CtLo-iYA.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-B-3oHQMO.mjs";
import { C as Plus, F as FileText, I as Eye, K as CircleX, S as RefreshCw, U as Clock, b as Search, c as TrendingUp, d as Star, g as ShieldAlert, h as ShieldCheck, i as User, n as X, ot as BadgeCheck, q as CircleCheck, rt as Briefcase, s as TriangleAlert, tt as CalendarDays } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CCXaAbeo.mjs";
import { t as PageHeader } from "./page-header-CDeKwgJG.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-cNCVehGV.mjs";
import { r as ListSkeleton } from "./loading-skeleton-BkAGb6P9.mjs";
import { t as EmptyState } from "./empty-state-DmMIw0uj.mjs";
import { t as Label } from "./label-ZItyyoZm.mjs";
import { a as DialogFooter, n as DialogClose, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-BgWFhrxr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as searchEmployeesGlobal, n as listVerificationRequests, t as createVerificationRequest } from "./verification2.functions-Cb33ooCo.mjs";
import { i as AnimatePresence, r as motion, t as useInView } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.verification-BfuwU47e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/routes/app.verification.tsx?tsr-split=component";
var stagger = {
	hidden: {},
	visible: { transition: { staggerChildren: .07 } }
};
var slideUp = {
	hidden: {
		opacity: 0,
		y: 18
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .4,
			ease: "easeOut"
		}
	}
};
var SEVEN_DAYS_MS = 10080 * 60 * 1e3;
function isExpired(req) {
	return req.status === "pending" && Date.now() - new Date(req.createdAt).getTime() > SEVEN_DAYS_MS;
}
function getEffectiveStatus(req) {
	if (isExpired(req)) return "expired";
	return req.status;
}
function StatusBadge({ req }) {
	const status = getEffectiveStatus(req);
	if (status === "approved") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
		className: "bg-emerald-500/12 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/12 flex items-center gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-3 w-3" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 63,
			columnNumber: 9
		}, this), " Approved"]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 62,
		columnNumber: 37
	}, this);
	if (status === "denied") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
		className: "bg-rose-500/12 text-rose-400 border-rose-500/25 hover:bg-rose-500/12 flex items-center gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleX, { className: "h-3 w-3" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 66,
			columnNumber: 9
		}, this), " Denied"]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 65,
		columnNumber: 35
	}, this);
	if (status === "expired") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
		variant: "outline",
		className: "border-slate-500/30 bg-slate-500/8 text-slate-400 flex items-center gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TriangleAlert, { className: "h-3 w-3" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 69,
			columnNumber: 9
		}, this), " Expired"]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 68,
		columnNumber: 36
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
		variant: "outline",
		className: "border-amber-400/35 bg-amber-400/8 text-amber-400 flex items-center gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "h-3 w-3" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 72,
			columnNumber: 7
		}, this), " Pending"]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 71,
		columnNumber: 10
	}, this);
}
function VerificationPage() {
	const { user } = useAuth();
	const isApproved = user.role === "super_admin" || user.companyStatus === "approved";
	const queryClient = useQueryClient();
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [debouncedQuery, setDebouncedQuery] = (0, import_react.useState)("");
	const [selectedEmployee, setSelectedEmployee] = (0, import_react.useState)(null);
	const [requestType, setRequestType] = (0, import_react.useState)("Full Background Check");
	const [requestOpen, setRequestOpen] = (0, import_react.useState)(false);
	const [selectedRequest, setSelectedRequest] = (0, import_react.useState)(null);
	const [activeTab, setActiveTab] = (0, import_react.useState)("all");
	const debounceRef = (0, import_react.useRef)(null);
	const handleSearchInput = (val) => {
		setSearchQuery(val);
		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => setDebouncedQuery(val), 400);
	};
	const { data: searchResults, isFetching: searching } = useQuery({
		queryKey: ["global-employee-search", debouncedQuery],
		queryFn: () => searchEmployeesGlobal({ data: { query: debouncedQuery } }),
		enabled: debouncedQuery.trim().length >= 2,
		staleTime: 1e4
	});
	const { data: requestData, isLoading: requestsLoading } = useQuery({
		queryKey: ["verification-requests"],
		queryFn: () => listVerificationRequests({ data: {
			page: 1,
			pageSize: 100
		} }),
		refetchInterval: 3e4
	});
	const createMutation = useMutation({
		mutationFn: (d) => createVerificationRequest({ data: d }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["verification-requests"] });
			toast.success("Verification request sent successfully!");
			setRequestOpen(false);
			setSelectedEmployee(null);
			setSearchQuery("");
			setDebouncedQuery("");
		},
		onError: (err) => toast.error(err.message || "Failed to send verification request")
	});
	const allRequests = requestData?.data ?? [];
	const filtered = (0, import_react.useMemo)(() => {
		if (activeTab === "all") return allRequests;
		return allRequests.filter((r) => getEffectiveStatus(r) === activeTab);
	}, [allRequests, activeTab]);
	const counts = (0, import_react.useMemo)(() => ({
		all: allRequests.length,
		pending: allRequests.filter((r) => getEffectiveStatus(r) === "pending").length,
		approved: allRequests.filter((r) => r.status === "approved").length,
		denied: allRequests.filter((r) => r.status === "denied").length,
		expired: allRequests.filter((r) => isExpired(r)).length
	}), [allRequests]);
	const showSearchPanel = debouncedQuery.length >= 2;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
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
					title: "Verification Requests",
					description: "Search any employee platform-wide and send consent-based background check requests.",
					actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
						variant: "outline",
						className: "border-primary/30 bg-primary/8 text-primary text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mr-1.5 h-1.5 w-1.5 rounded-full bg-primary inline-block animate-pulse" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 172,
							columnNumber: 15
						}, this), "Auto-refresh 30s"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 171,
						columnNumber: 158
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 171,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 162,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .45,
					delay: .1
				},
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
					className: "border-border/60 bg-card/85 backdrop-blur-sm overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-0.5 w-full bg-gradient-to-r from-primary via-accent to-transparent" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 189,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, {
							className: "pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, {
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid h-8 w-8 place-items-center rounded-lg bg-primary/12 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 193,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 192,
									columnNumber: 15
								}, this), "Search Employee Platform-Wide"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 191,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, { children: "Find any professional by name, email, employee ID, or designation across all verified companies." }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 197,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 190,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 203,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: searchQuery,
										onChange: (e) => handleSearchInput(e.target.value),
										placeholder: "Search by name, email, employee ID, or designation…",
										className: "pl-10 bg-background/50 border-border/60 focus:border-primary/50 transition-colors",
										disabled: !isApproved
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 204,
										columnNumber: 15
									}, this),
									searchQuery && /* @__PURE__ */ (void 0)("button", {
										onClick: () => {
											setSearchQuery("");
											setDebouncedQuery("");
										},
										className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
										children: /* @__PURE__ */ (void 0)(X, { className: "h-4 w-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 209,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 205,
										columnNumber: 31
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 202,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatePresence, { children: showSearchPanel && /* @__PURE__ */ (void 0)(motion.div, {
								initial: {
									opacity: 0,
									height: 0
								},
								animate: {
									opacity: 1,
									height: "auto"
								},
								exit: {
									opacity: 0,
									height: 0
								},
								transition: { duration: .25 },
								className: "overflow-hidden",
								children: searching ? /* @__PURE__ */ (void 0)("div", {
									className: "space-y-2 pt-1",
									children: [
										1,
										2,
										3
									].map((i) => /* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-3 rounded-xl border border-border/40 p-3 animate-pulse",
										children: [
											/* @__PURE__ */ (void 0)("div", { className: "h-10 w-10 rounded-full bg-muted" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 229,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "flex-1 space-y-1.5",
												children: [/* @__PURE__ */ (void 0)("div", { className: "h-3.5 w-32 rounded bg-muted" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 231,
													columnNumber: 29
												}, this), /* @__PURE__ */ (void 0)("div", { className: "h-3 w-48 rounded bg-muted" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 232,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 230,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("div", { className: "h-8 w-24 rounded-lg bg-muted" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 234,
												columnNumber: 27
											}, this)
										]
									}, i, true, {
										fileName: _jsxFileName,
										lineNumber: 228,
										columnNumber: 43
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 227,
									columnNumber: 32
								}, this) : !searchResults || searchResults.length === 0 ? /* @__PURE__ */ (void 0)("div", {
									className: "py-8 text-center text-sm text-muted-foreground border border-dashed border-border/50 rounded-xl",
									children: [
										"No employees found matching \"",
										debouncedQuery,
										"\""
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 236,
									columnNumber: 77
								}, this) : /* @__PURE__ */ (void 0)(motion.div, {
									variants: stagger,
									initial: "hidden",
									animate: "visible",
									className: "space-y-2",
									children: searchResults.map((emp) => /* @__PURE__ */ (void 0)(motion.div, {
										variants: slideUp,
										className: "group flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-3 transition-all duration-200 hover:border-primary/30 hover:bg-primary/4 hover:shadow-elegant cursor-pointer",
										onClick: () => {
											setSelectedEmployee(emp);
											setRequestOpen(true);
										},
										children: [
											/* @__PURE__ */ (void 0)(Avatar, {
												className: "h-10 w-10 ring-1 ring-border/40 group-hover:ring-primary/30 transition-all shrink-0",
												children: [emp.photoUrl && /* @__PURE__ */ (void 0)(AvatarImage, { src: emp.photoUrl }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 244,
													columnNumber: 46
												}, this), /* @__PURE__ */ (void 0)(AvatarFallback, {
													className: "text-sm font-semibold",
													children: emp.fullName[0]
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 245,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 243,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (void 0)("span", {
														className: "font-semibold text-sm text-foreground truncate",
														children: emp.fullName
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 249,
														columnNumber: 31
													}, this), emp.verified && /* @__PURE__ */ (void 0)(BadgeCheck, { className: "h-3.5 w-3.5 text-primary shrink-0" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 250,
														columnNumber: 48
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 248,
													columnNumber: 29
												}, this), /* @__PURE__ */ (void 0)("p", {
													className: "text-xs text-muted-foreground truncate",
													children: [
														emp.designation,
														" · ",
														emp.department,
														" · ",
														emp.companyName
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 252,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 247,
												columnNumber: 27
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "flex items-center gap-2 shrink-0",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "hidden sm:block text-xs text-muted-foreground font-mono",
													children: emp.employeeId
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 257,
													columnNumber: 29
												}, this), /* @__PURE__ */ (void 0)(Button, {
													size: "sm",
													className: "h-7 px-3 text-xs bg-primary/90 hover:bg-primary",
													children: [/* @__PURE__ */ (void 0)(Plus, { className: "h-3 w-3 mr-1" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 259,
														columnNumber: 31
													}, this), " Request"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 258,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 256,
												columnNumber: 27
											}, this)
										]
									}, emp.id, true, {
										fileName: _jsxFileName,
										lineNumber: 239,
										columnNumber: 49
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 238,
									columnNumber: 30
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 215,
								columnNumber: 35
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 214,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 201,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 188,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 178,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .45,
					delay: .2
				},
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
					className: "border-border/60 bg-card/85 backdrop-blur-sm overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-0.5 w-full bg-gradient-to-r from-accent via-primary to-transparent" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 282,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, {
							className: "pb-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Request History" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 286,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, {
									className: "mt-0.5",
									children: [requestData?.total ?? 0, " total requests · Consent-gated access"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 287,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 285,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 284,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex gap-1 mt-4 overflow-x-auto pb-1 scrollbar-none",
								children: [
									"all",
									"pending",
									"approved",
									"denied",
									"expired"
								].map((tab) => {
									const isActive = activeTab === tab;
									return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.button, {
										whileHover: { scale: 1.03 },
										whileTap: { scale: .97 },
										onClick: () => setActiveTab(tab),
										className: `relative flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 capitalize ${isActive ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`,
										children: [
											tab,
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: `inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold ${isActive ? "bg-primary/25 text-primary" : "bg-muted text-muted-foreground"}`,
												children: counts[tab]
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 310,
												columnNumber: 21
											}, this),
											isActive && /* @__PURE__ */ (void 0)(motion.div, {
												layoutId: "tab-indicator",
												className: "absolute inset-0 rounded-lg border border-primary/25 bg-primary/8",
												style: { zIndex: -1 },
												transition: {
													type: "spring",
													stiffness: 400,
													damping: 30
												}
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 313,
												columnNumber: 34
											}, this)
										]
									}, tab, true, {
										fileName: _jsxFileName,
										lineNumber: 304,
										columnNumber: 22
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 294,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 283,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
							className: "pt-4",
							children: requestsLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ListSkeleton, { count: 4 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 326,
								columnNumber: 32
							}, this) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EmptyState, {
								icon: FileText,
								title: activeTab === "all" ? "No verification requests" : `No ${activeTab} requests`,
								description: activeTab === "all" ? "Search and select an employee above to send your first verification request." : `No requests with status "${activeTab}" found.`
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 326,
								columnNumber: 85
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
								variants: stagger,
								initial: "hidden",
								animate: "visible",
								className: "space-y-3",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatePresence, {
									mode: "popLayout",
									children: filtered.map((req) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RequestCard, {
										req,
										onViewReport: () => setSelectedRequest(req)
									}, req.id, false, {
										fileName: _jsxFileName,
										lineNumber: 328,
										columnNumber: 47
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 327,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 326,
								columnNumber: 369
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 325,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 281,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 271,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: requestOpen,
				onOpenChange: (open) => {
					setRequestOpen(open);
					if (!open) setSelectedEmployee(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "max-w-md border-border/60 bg-card/95 backdrop-blur-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-x-0 top-0 h-0.5 rounded-t-xl bg-gradient-to-r from-primary via-accent to-transparent" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 341,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-5 w-5 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 344,
								columnNumber: 15
							}, this), "Send Verification Request"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 343,
							columnNumber: 13
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 342,
							columnNumber: 11
						}, this),
						selectedEmployee && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-5 py-2",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4",
									children: [/* @__PURE__ */ (void 0)(Avatar, {
										className: "h-12 w-12 ring-2 ring-primary/25 shrink-0",
										children: [selectedEmployee.photoUrl && /* @__PURE__ */ (void 0)(AvatarImage, { src: selectedEmployee.photoUrl }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 353,
											columnNumber: 49
										}, this), /* @__PURE__ */ (void 0)(AvatarFallback, {
											className: "font-bold",
											children: selectedEmployee.fullName[0]
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 354,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 352,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ (void 0)("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "font-bold text-foreground",
													children: selectedEmployee.fullName
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 358,
													columnNumber: 21
												}, this), selectedEmployee.verified && /* @__PURE__ */ (void 0)(BadgeCheck, { className: "h-4 w-4 text-primary shrink-0" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 359,
													columnNumber: 51
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 357,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("p", {
												className: "text-xs text-muted-foreground truncate",
												children: [
													selectedEmployee.designation,
													" · ",
													selectedEmployee.companyName
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 361,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("p", {
												className: "text-xs text-muted-foreground/70 font-mono mt-0.5",
												children: selectedEmployee.email
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 364,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 356,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 351,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (void 0)(Label, { children: "Verification Scope" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 370,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)(Select, {
										value: requestType,
										onValueChange: setRequestType,
										children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
											className: "border-border/60",
											children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 373,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 372,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: [
											/* @__PURE__ */ (void 0)(SelectItem, {
												value: "Full Background Check",
												children: /* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (void 0)(ShieldCheck, { className: "h-4 w-4 text-primary" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 378,
														columnNumber: 25
													}, this), "Full Background Check"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 377,
													columnNumber: 23
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 376,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)(SelectItem, {
												value: "Employment Tenure Verification",
												children: /* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (void 0)(Briefcase, { className: "h-4 w-4 text-accent" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 384,
														columnNumber: 25
													}, this), "Employment Tenure Verification"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 383,
													columnNumber: 23
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 382,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)(SelectItem, {
												value: "Performance Review Audit",
												children: /* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (void 0)(Star, { className: "h-4 w-4 text-warning" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 390,
														columnNumber: 25
													}, this), "Performance Review Audit"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 389,
													columnNumber: 23
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 388,
												columnNumber: 21
											}, this)
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 375,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 371,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 369,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-xs text-amber-400/90",
									children: /* @__PURE__ */ (void 0)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "h-4 w-4 shrink-0 mt-0.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 400,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("span", { children: "The employee must approve this request. Salary and private notes are never shared. Requests expire after 7 days." }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 401,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 399,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 398,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 349,
							columnNumber: 32
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
							className: "gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogClose, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "outline",
									children: "Cancel"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 408,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 407,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								onClick: () => selectedEmployee && createMutation.mutate({
									employeeId: selectedEmployee.id,
									requestType
								}),
								disabled: createMutation.isPending || !selectedEmployee,
								className: "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-elegant",
								children: createMutation.isPending ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "h-4 w-4 mr-1 animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 415,
									columnNumber: 19
								}, this), " Sending…"] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 414,
									columnNumber: 43
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-4 w-4 mr-1" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 417,
									columnNumber: 19
								}, this), " Send Request"] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 416,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 410,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 406,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 340,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 336,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: !!selectedRequest,
				onOpenChange: (open) => !open && setSelectedRequest(null),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "max-w-2xl max-h-[85vh] overflow-y-auto border-border/60 bg-card/95 backdrop-blur-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-x-0 top-0 h-0.5 rounded-t-xl bg-gradient-to-r from-emerald-500 via-primary to-transparent" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 427,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "flex items-center gap-2 text-xl",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BadgeCheck, { className: "h-6 w-6 text-emerald-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 430,
								columnNumber: 15
							}, this), "Verified Employment Report"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 429,
							columnNumber: 13
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 428,
							columnNumber: 11
						}, this),
						selectedRequest?.responseData && /* @__PURE__ */ (void 0)(VerificationReport, { req: selectedRequest }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 435,
							columnNumber: 45
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
							className: "border-t border-border/50 pt-4 mt-2",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogClose, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "outline",
									children: "Close Report"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 439,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 438,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 437,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 426,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 425,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 160,
		columnNumber: 10
	}, this);
}
function RequestCard({ req, onViewReport }) {
	const status = getEffectiveStatus(req);
	const daysAgo = Math.floor((Date.now() - new Date(req.createdAt).getTime()) / (1e3 * 60 * 60 * 24));
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
		variants: slideUp,
		layout: true,
		whileHover: { y: -2 },
		transition: { duration: .2 },
		className: "group relative overflow-hidden rounded-xl border border-border/50 bg-background/50 p-4 backdrop-blur-sm transition-all duration-200 hover:border-primary/25 hover:shadow-elegant",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl ${status === "approved" ? "bg-emerald-500" : status === "denied" ? "bg-rose-500" : status === "expired" ? "bg-slate-500" : "bg-amber-400"}` }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 463,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 pl-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-3 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: `grid h-10 w-10 shrink-0 place-items-center rounded-xl ${status === "approved" ? "bg-emerald-500/12 text-emerald-400" : status === "denied" ? "bg-rose-500/12 text-rose-400" : status === "expired" ? "bg-slate-500/12 text-slate-400" : "bg-amber-400/12 text-amber-400"}`,
					children: status === "approved" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-5 w-5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 468,
						columnNumber: 38
					}, this) : status === "denied" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleX, { className: "h-5 w-5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 468,
						columnNumber: 99
					}, this) : status === "expired" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TriangleAlert, { className: "h-5 w-5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 468,
						columnNumber: 156
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "h-5 w-5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 468,
						columnNumber: 196
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 467,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1.5 flex-wrap",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-semibold text-sm text-foreground",
								children: req.employeeName
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 472,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatusBadge, { req }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 473,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 471,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground mt-0.5 truncate",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-medium text-foreground/70",
									children: req.requestedByCompany
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 476,
									columnNumber: 15
								}, this),
								" · ",
								req.requestType
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 475,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 mt-1 text-[11px] text-muted-foreground/70",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CalendarDays, { className: "h-3 w-3" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 481,
									columnNumber: 15
								}, this),
								new Date(req.createdAt).toLocaleDateString(),
								" · ",
								daysAgo === 0 ? "Today" : `${daysAgo}d ago`,
								req.resolvedAt && /* @__PURE__ */ (void 0)("span", {
									className: "ml-1 text-success",
									children: ["· Resolved ", new Date(req.resolvedAt).toLocaleDateString()]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 483,
									columnNumber: 34
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 480,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 470,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 466,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2 shrink-0",
				children: status === "approved" && req.responseData ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					variant: "outline",
					onClick: onViewReport,
					className: "gap-1 border-primary/30 text-primary hover:bg-primary/8 hover:border-primary/50 h-8",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "h-3.5 w-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 492,
						columnNumber: 15
					}, this), " View Report"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 491,
					columnNumber: 56
				}, this) : status === "pending" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs text-muted-foreground italic",
					children: "Awaiting employee response…"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 493,
					columnNumber: 48
				}, this) : status === "expired" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs text-muted-foreground italic",
					children: "Timed out after 7 days"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 493,
					columnNumber: 163
				}, this) : null
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 490,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 465,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 457,
		columnNumber: 10
	}, this);
}
function VerificationReport({ req }) {
	const d = req.responseData;
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, { once: true });
	const rating = Number(d.rating ?? 0);
	const ratingPct = rating / 5 * 100;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref,
		className: "space-y-5 mt-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-500/12 text-emerald-400",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BadgeCheck, { className: "h-6 w-6" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 516,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 515,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-bold text-foreground",
						children: d.fullName
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 519,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							d.designation,
							" · ",
							d.department
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 520,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
						className: "mt-1.5 bg-emerald-500/12 text-emerald-400 border-emerald-500/20 text-[10px]",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-3 w-3 mr-1" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 522,
							columnNumber: 13
						}, this), " Consent Granted & Verified"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 521,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 518,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 514,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
				children: [[
					{
						icon: CalendarDays,
						label: "Joined",
						value: new Date(d.joiningDate).toLocaleDateString()
					},
					{
						icon: CalendarDays,
						label: "Left",
						value: d.exitDate ? new Date(d.exitDate).toLocaleDateString() : "Active / Present"
					},
					{
						icon: Briefcase,
						label: "Experience",
						value: `${d.experience} years`
					},
					{
						icon: User,
						label: "Status",
						value: d.status ?? "—"
					},
					{
						icon: FileText,
						label: "Total Reviews",
						value: `${d.reviewsCount ?? 0} reviews`
					}
				].map(({ icon: Icon, label, value }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-xl border border-border/50 bg-muted/20 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-1.5 text-muted-foreground mb-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 555,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[10px] uppercase tracking-widest font-semibold",
							children: label
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 556,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 554,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm font-semibold text-foreground capitalize",
						children: value
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 558,
						columnNumber: 13
					}, this)]
				}, label, true, {
					fileName: _jsxFileName,
					lineNumber: 553,
					columnNumber: 13
				}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-xl border border-primary/20 bg-primary/5 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1.5 text-muted-foreground mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "h-3.5 w-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 564,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[10px] uppercase tracking-widest font-semibold",
								children: "Avg Rating"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 565,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 563,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-2xl font-bold text-primary",
							children: [rating > 0 ? rating.toFixed(1) : "N/A", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-sm ml-0.5",
								children: "★"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 567,
								columnNumber: 98
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 567,
							columnNumber: 11
						}, this),
						rating > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "mt-2 h-1.5 w-full rounded-full bg-border/60 overflow-hidden",
							children: /* @__PURE__ */ (void 0)(motion.div, {
								className: "h-full rounded-full bg-gradient-to-r from-primary to-accent",
								initial: { width: 0 },
								animate: inView ? { width: `${ratingPct}%` } : {},
								transition: {
									duration: 1,
									ease: "easeOut",
									delay: .3
								}
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 569,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 568,
							columnNumber: 26
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 562,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 528,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-xl border border-border/40 bg-muted/10 p-3 flex items-center gap-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldAlert, { className: "h-4 w-4 text-primary shrink-0" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 584,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Salary, private HR notes, and confidential reviews are never disclosed in this report." }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 585,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 583,
				columnNumber: 7
			}, this),
			d.reviews && d.reviews.length > 0 && /* @__PURE__ */ (void 0)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (void 0)("h4", {
					className: "font-semibold text-sm flex items-center gap-2",
					children: [
						/* @__PURE__ */ (void 0)(TrendingUp, { className: "h-4 w-4 text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 591,
							columnNumber: 13
						}, this),
						"Performance Review Logs (",
						d.reviewsCount,
						")"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 590,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "space-y-2",
					children: d.reviews.map((rev, idx) => /* @__PURE__ */ (void 0)(motion.div, {
						initial: {
							opacity: 0,
							x: -12
						},
						animate: inView ? {
							opacity: 1,
							x: 0
						} : {},
						transition: { delay: idx * .08 },
						className: "rounded-xl border border-border/50 bg-muted/20 p-4",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between mb-2",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-xs font-bold text-foreground",
								children: rev.period
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 605,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)(Badge, {
								variant: "outline",
								className: "text-xs font-bold",
								children: [Number(rev.overall).toFixed(1), " ★"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 606,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 604,
							columnNumber: 17
						}, this), rev.feedback && /* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground italic leading-relaxed",
							children: [
								"“",
								rev.feedback,
								"”"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 610,
							columnNumber: 34
						}, this)]
					}, idx, true, {
						fileName: _jsxFileName,
						lineNumber: 595,
						columnNumber: 55
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 594,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 589,
				columnNumber: 45
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 512,
		columnNumber: 10
	}, this);
}
//#endregion
export { VerificationPage as component };
