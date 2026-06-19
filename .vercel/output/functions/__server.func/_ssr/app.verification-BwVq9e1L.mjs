import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BPK1zgJN.mjs";
import { t as Badge } from "./badge-KS2SooOw.mjs";
import { t as Input } from "./input-BYcV5Phs.mjs";
import { n as useAuth } from "./auth-provider-DIoK8pn-.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-BbAAdpLg.mjs";
import { C as Plus, F as FileText, I as Eye, K as CircleX, S as RefreshCw, U as Clock, b as Search, c as TrendingUp, d as Star, g as ShieldAlert, h as ShieldCheck, i as User, n as X, ot as BadgeCheck, q as CircleCheck, rt as Briefcase, s as TriangleAlert, tt as CalendarDays } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-DRtcuf8H.mjs";
import { t as PageHeader } from "./page-header-DHJUr0Vr.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-C9T31-X3.mjs";
import { r as ListSkeleton } from "./loading-skeleton-BKYH7Wpk.mjs";
import { t as EmptyState } from "./empty-state-B-onYlus.mjs";
import { t as Label } from "./label-qle7VSy6.mjs";
import { a as DialogFooter, n as DialogClose, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-OO5XYV91.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as searchEmployeesGlobal, n as listVerificationRequests, t as createVerificationRequest } from "./verification2.functions-DVHevb61.mjs";
import { i as AnimatePresence, r as motion, t as useInView } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.verification-BwVq9e1L.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	if (status === "approved") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		className: "bg-emerald-500/12 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/12 flex items-center gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }), " Approved"]
	});
	if (status === "denied") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		className: "bg-rose-500/12 text-rose-400 border-rose-500/25 hover:bg-rose-500/12 flex items-center gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3 w-3" }), " Denied"]
	});
	if (status === "expired") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		variant: "outline",
		className: "border-slate-500/30 bg-slate-500/8 text-slate-400 flex items-center gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3 w-3" }), " Expired"]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		variant: "outline",
		className: "border-amber-400/35 bg-amber-400/8 text-amber-400 flex items-center gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), " Pending"]
	});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
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
					title: "Verification Requests",
					description: "Search any employee platform-wide and send consent-based background check requests.",
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "border-primary/30 bg-primary/8 text-primary text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mr-1.5 h-1.5 w-1.5 rounded-full bg-primary inline-block animate-pulse" }), "Auto-refresh 30s"]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-border/60 bg-card/85 backdrop-blur-sm overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-0.5 w-full bg-gradient-to-r from-primary via-accent to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							className: "pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-8 w-8 place-items-center rounded-lg bg-primary/12 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" })
								}), "Search Employee Platform-Wide"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Find any professional by name, email, employee ID, or designation across all verified companies." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: searchQuery,
										onChange: (e) => handleSearchInput(e.target.value),
										placeholder: "Search by name, email, employee ID, or designation…",
										className: "pl-10 bg-background/50 border-border/60 focus:border-primary/50 transition-colors",
										disabled: !isApproved
									}),
									searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setSearchQuery("");
											setDebouncedQuery("");
										},
										className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showSearchPanel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
								children: searching ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2 pt-1",
									children: [
										1,
										2,
										3
									].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 rounded-xl border border-border/40 p-3 animate-pulse",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-10 rounded-full bg-muted" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1 space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3.5 w-32 rounded bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-48 rounded bg-muted" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-24 rounded-lg bg-muted" })
										]
									}, i))
								}) : !searchResults || searchResults.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "py-8 text-center text-sm text-muted-foreground border border-dashed border-border/50 rounded-xl",
									children: [
										"No employees found matching \"",
										debouncedQuery,
										"\""
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									variants: stagger,
									initial: "hidden",
									animate: "visible",
									className: "space-y-2",
									children: searchResults.map((emp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
										variants: slideUp,
										className: "group flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-3 transition-all duration-200 hover:border-primary/30 hover:bg-primary/4 hover:shadow-elegant cursor-pointer",
										onClick: () => {
											setSelectedEmployee(emp);
											setRequestOpen(true);
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
												className: "h-10 w-10 ring-1 ring-border/40 group-hover:ring-primary/30 transition-all shrink-0",
												children: [emp.photoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: emp.photoUrl }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
													className: "text-sm font-semibold",
													children: emp.fullName[0]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-sm text-foreground truncate",
														children: emp.fullName
													}), emp.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-3.5 w-3.5 text-primary shrink-0" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-muted-foreground truncate",
													children: [
														emp.designation,
														" · ",
														emp.department,
														" · ",
														emp.companyName
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 shrink-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "hidden sm:block text-xs text-muted-foreground font-mono",
													children: emp.employeeId
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													className: "h-7 px-3 text-xs bg-primary/90 hover:bg-primary",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3 mr-1" }), " Request"]
												})]
											})
										]
									}, emp.id))
								})
							}) })]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-border/60 bg-card/85 backdrop-blur-sm overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-0.5 w-full bg-gradient-to-r from-accent via-primary to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							className: "pb-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Request History" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, {
									className: "mt-0.5",
									children: [requestData?.total ?? 0, " total requests · Consent-gated access"]
								})] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1 mt-4 overflow-x-auto pb-1 scrollbar-none",
								children: [
									"all",
									"pending",
									"approved",
									"denied",
									"expired"
								].map((tab) => {
									const isActive = activeTab === tab;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
										whileHover: { scale: 1.03 },
										whileTap: { scale: .97 },
										onClick: () => setActiveTab(tab),
										className: `relative flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 capitalize ${isActive ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`,
										children: [
											tab,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold ${isActive ? "bg-primary/25 text-primary" : "bg-muted text-muted-foreground"}`,
												children: counts[tab]
											}),
											isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
												layoutId: "tab-indicator",
												className: "absolute inset-0 rounded-lg border border-primary/25 bg-primary/8",
												style: { zIndex: -1 },
												transition: {
													type: "spring",
													stiffness: 400,
													damping: 30
												}
											})
										]
									}, tab);
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "pt-4",
							children: requestsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 4 }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
								icon: FileText,
								title: activeTab === "all" ? "No verification requests" : `No ${activeTab} requests`,
								description: activeTab === "all" ? "Search and select an employee above to send your first verification request." : `No requests with status "${activeTab}" found.`
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								variants: stagger,
								initial: "hidden",
								animate: "visible",
								className: "space-y-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									mode: "popLayout",
									children: filtered.map((req) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestCard, {
										req,
										onViewReport: () => setSelectedRequest(req)
									}, req.id))
								})
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: requestOpen,
				onOpenChange: (open) => {
					setRequestOpen(open);
					if (!open) setSelectedEmployee(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md border-border/60 bg-card/95 backdrop-blur-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-0.5 rounded-t-xl bg-gradient-to-r from-primary via-accent to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-primary" }), "Send Verification Request"]
						}) }),
						selectedEmployee && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
										className: "h-12 w-12 ring-2 ring-primary/25 shrink-0",
										children: [selectedEmployee.photoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: selectedEmployee.photoUrl }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
											className: "font-bold",
											children: selectedEmployee.fullName[0]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-foreground",
													children: selectedEmployee.fullName
												}), selectedEmployee.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-4 w-4 text-primary shrink-0" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground truncate",
												children: [
													selectedEmployee.designation,
													" · ",
													selectedEmployee.companyName
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground/70 font-mono mt-0.5",
												children: selectedEmployee.email
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Verification Scope" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: requestType,
										onValueChange: setRequestType,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											className: "border-border/60",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "Full Background Check",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-primary" }), "Full Background Check"]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "Employment Tenure Verification",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-4 w-4 text-accent" }), "Employment Tenure Verification"]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "Performance Review Audit",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 text-warning" }), "Performance Review Audit"]
												})
											})
										] })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-xs text-amber-400/90",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "The employee must approve this request. Salary and private notes are never shared. Requests expire after 7 days." })]
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									children: "Cancel"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => selectedEmployee && createMutation.mutate({
									employeeId: selectedEmployee.id,
									requestType
								}),
								disabled: createMutation.isPending || !selectedEmployee,
								className: "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-elegant",
								children: createMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4 mr-1 animate-spin" }), " Sending…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 mr-1" }), " Send Request"] })
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!selectedRequest,
				onOpenChange: (open) => !open && setSelectedRequest(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-2xl max-h-[85vh] overflow-y-auto border-border/60 bg-card/95 backdrop-blur-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-0.5 rounded-t-xl bg-gradient-to-r from-emerald-500 via-primary to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "flex items-center gap-2 text-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-6 w-6 text-emerald-400" }), "Verified Employment Report"]
						}) }),
						selectedRequest?.responseData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationReport, { req: selectedRequest }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
							className: "border-t border-border/50 pt-4 mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									children: "Close Report"
								})
							})
						})
					]
				})
			})
		]
	});
}
function RequestCard({ req, onViewReport }) {
	const status = getEffectiveStatus(req);
	const daysAgo = Math.floor((Date.now() - new Date(req.createdAt).getTime()) / (1e3 * 60 * 60 * 24));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		variants: slideUp,
		layout: true,
		whileHover: { y: -2 },
		transition: { duration: .2 },
		className: "group relative overflow-hidden rounded-xl border border-border/50 bg-background/50 p-4 backdrop-blur-sm transition-all duration-200 hover:border-primary/25 hover:shadow-elegant",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl ${status === "approved" ? "bg-emerald-500" : status === "denied" ? "bg-rose-500" : status === "expired" ? "bg-slate-500" : "bg-amber-400"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 pl-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `grid h-10 w-10 shrink-0 place-items-center rounded-xl ${status === "approved" ? "bg-emerald-500/12 text-emerald-400" : status === "denied" ? "bg-rose-500/12 text-rose-400" : status === "expired" ? "bg-slate-500/12 text-slate-400" : "bg-amber-400/12 text-amber-400"}`,
					children: status === "approved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5" }) : status === "denied" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-5 w-5" }) : status === "expired" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 flex-wrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-sm text-foreground",
								children: req.employeeName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { req })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground mt-0.5 truncate",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground/70",
									children: req.requestedByCompany
								}),
								" · ",
								req.requestType
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mt-1 text-[11px] text-muted-foreground/70",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-3 w-3" }),
								new Date(req.createdAt).toLocaleDateString(),
								" · ",
								daysAgo === 0 ? "Today" : `${daysAgo}d ago`,
								req.resolvedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-1 text-success",
									children: ["· Resolved ", new Date(req.resolvedAt).toLocaleDateString()]
								})
							]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2 shrink-0",
				children: status === "approved" && req.responseData ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: onViewReport,
					className: "gap-1 border-primary/30 text-primary hover:bg-primary/8 hover:border-primary/50 h-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }), " View Report"]
				}) : status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground italic",
					children: "Awaiting employee response…"
				}) : status === "expired" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground italic",
					children: "Timed out after 7 days"
				}) : null
			})]
		})]
	});
}
function VerificationReport({ req }) {
	const d = req.responseData;
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, { once: true });
	const rating = Number(d.rating ?? 0);
	const ratingPct = rating / 5 * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "space-y-5 mt-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-500/12 text-emerald-400",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-6 w-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-foreground",
						children: d.fullName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							d.designation,
							" · ",
							d.department
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						className: "mt-1.5 bg-emerald-500/12 text-emerald-400 border-emerald-500/20 text-[10px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3 mr-1" }), " Consent Granted & Verified"]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
				].map(({ icon: Icon, label, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border/50 bg-muted/20 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 text-muted-foreground mb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-widest font-semibold",
							children: label
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-foreground capitalize",
						children: value
					})]
				}, label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-primary/20 bg-primary/5 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-muted-foreground mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-widest font-semibold",
								children: "Avg Rating"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-2xl font-bold text-primary",
							children: [rating > 0 ? rating.toFixed(1) : "N/A", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm ml-0.5",
								children: "★"
							})]
						}),
						rating > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 h-1.5 w-full rounded-full bg-border/60 overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								className: "h-full rounded-full bg-gradient-to-r from-primary to-accent",
								initial: { width: 0 },
								animate: inView ? { width: `${ratingPct}%` } : {},
								transition: {
									duration: 1,
									ease: "easeOut",
									delay: .3
								}
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border/40 bg-muted/10 p-3 flex items-center gap-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-4 w-4 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Salary, private HR notes, and confidential reviews are never disclosed in this report." })]
			}),
			d.reviews && d.reviews.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
					className: "font-semibold text-sm flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-primary" }),
						"Performance Review Logs (",
						d.reviewsCount,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: d.reviews.map((rev, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-foreground",
								children: rev.period
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								className: "text-xs font-bold",
								children: [Number(rev.overall).toFixed(1), " ★"]
							})]
						}), rev.feedback && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground italic leading-relaxed",
							children: [
								"“",
								rev.feedback,
								"”"
							]
						})]
					}, idx))
				})]
			})
		]
	});
}
//#endregion
export { VerificationPage as component };
