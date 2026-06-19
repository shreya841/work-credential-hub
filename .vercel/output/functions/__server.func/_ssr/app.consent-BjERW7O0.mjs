import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DnxMo53r.mjs";
import { t as Badge } from "./badge-GBPLA4QD.mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-Cj2KU_kF.mjs";
import { c as stringType, n as booleanType, o as objectType } from "../_libs/zod.mjs";
import { A as Lock, K as CircleX, N as Globe, S as RefreshCw, U as Clock, h as ShieldCheck, nt as Building2, ot as BadgeCheck, q as CircleCheck } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CCXaAbeo.mjs";
import { t as PageHeader } from "./page-header-CDeKwgJG.mjs";
import { r as ListSkeleton } from "./loading-skeleton-BkAGb6P9.mjs";
import { t as EmptyState } from "./empty-state-DmMIw0uj.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Switch } from "./switch-CK12VkhL.mjs";
import { n as listVerificationRequests, r as resolveVerificationRequest } from "./verification2.functions-Cb33ooCo.mjs";
import { i as AnimatePresence, r as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.consent-BjERW7O0.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var getConsentSettings = createServerFn({ method: "GET" }).handler(createSsrRpc("00154c326d5011867d6fbff32acf209216aed3008c56cc344f91197c3a44067e"));
var updateConsentVisibility = createServerFn({ method: "POST" }).validator(objectType({ publicVisible: booleanType() })).handler(createSsrRpc("2087f69dbd8ce238c7a44bc1238bf21712d5619e32cab0353c9c87612b93657a"));
var listConsentGrants = createServerFn({ method: "GET" }).handler(createSsrRpc("d9826fdea6e23705d85b16a9f6434949814c907ccafed5f2bb20b6ec5d6c585a"));
var grantAccess = createServerFn({ method: "POST" }).validator(objectType({ companyId: stringType().uuid() })).handler(createSsrRpc("e27c297b4939adcc11f41364c765d77368e1f789672629fa790107fab3c372bd"));
var revokeAccess = createServerFn({ method: "POST" }).validator(objectType({ companyId: stringType().uuid() })).handler(createSsrRpc("3a39a799af86c4b5120db0a87d016db16b81cadee92430e276a290a0c6bcfb9b"));
createServerFn({ method: "GET" }).handler(createSsrRpc("f813c8ccb45e92e86109d5cb921f0c3a7b4f71feba83df47e4b7e6e608d5c3f6"));
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/routes/app.consent.tsx?tsr-split=component";
var stagger = {
	hidden: {},
	visible: { transition: { staggerChildren: .07 } }
};
var slideUp = {
	hidden: {
		opacity: 0,
		y: 14
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .38,
			ease: "easeOut"
		}
	}
};
function Consent() {
	const queryClient = useQueryClient();
	const { data: settings, isLoading: settingsLoading } = useQuery({
		queryKey: ["consent-settings"],
		queryFn: () => getConsentSettings()
	});
	const { data: grants = [], isLoading: grantsLoading } = useQuery({
		queryKey: ["consent-grants"],
		queryFn: () => listConsentGrants()
	});
	const { data: requestData, isLoading: requestsLoading } = useQuery({
		queryKey: ["employee-verification-requests"],
		queryFn: () => listVerificationRequests({ data: {
			page: 1,
			pageSize: 50
		} }),
		refetchInterval: 3e4
	});
	const resolveMutation = useMutation({
		mutationFn: async ({ id, status }) => resolveVerificationRequest({ data: {
			id,
			status
		} }),
		onSuccess: (_, { status }) => {
			queryClient.invalidateQueries({ queryKey: ["employee-verification-requests"] });
			queryClient.invalidateQueries({ queryKey: ["verification-requests"] });
			toast.success(`Request ${status === "approved" ? "approved" : "denied"} successfully`);
		},
		onError: (err) => toast.error(err.message || "Failed to resolve request")
	});
	const visibilityMutation = useMutation({
		mutationFn: (visible) => updateConsentVisibility({ data: { publicVisible: visible } }),
		onSuccess: (updated) => {
			queryClient.setQueryData(["consent-settings"], updated);
			toast.success(updated.publicVisible ? "Profile is now public" : "Profile is now private");
		},
		onError: (err) => toast.error(err.message || "Failed to update visibility")
	});
	const toggleAccessMutation = useMutation({
		mutationFn: async ({ companyId, currentlyGranted }) => currentlyGranted ? revokeAccess({ data: { companyId } }) : grantAccess({ data: { companyId } }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["consent-grants"] });
			toast.success("Company access updated");
		},
		onError: (err) => toast.error(err.message || "Failed to update access")
	});
	const visible = settings?.publicVisible ?? false;
	const requests = requestData?.data ?? [];
	const pendingCount = requests.filter((r) => r.status === "pending").length;
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
					title: "Consent Management",
					description: "Control who can view your verified work history and approve background checks.",
					actions: pendingCount > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
						className: "bg-amber-400/12 text-amber-400 border-amber-400/25 animate-pulse",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "h-3 w-3 mr-1" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 143,
								columnNumber: 17
							}, this),
							pendingCount,
							" pending request",
							pendingCount > 1 ? "s" : ""
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 142,
						columnNumber: 169
					}, this) : void 0
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 142,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 133,
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
					duration: .4,
					delay: .1
				},
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
					className: "border-border/60 bg-card/85 backdrop-blur-sm overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `h-0.5 w-full transition-all duration-500 ${visible ? "bg-gradient-to-r from-emerald-500 via-primary to-transparent" : "bg-gradient-to-r from-muted to-transparent"}` }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 160,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
						className: "p-5",
						children: settingsLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-5 w-36 bg-muted animate-pulse rounded" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 164,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-3.5 w-64 bg-muted animate-pulse rounded" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 165,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 163,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-6 w-11 bg-muted animate-pulse rounded-full" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 167,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 162,
							columnNumber: 32
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
									animate: { scale: visible ? 1.05 : 1 },
									transition: {
										type: "spring",
										stiffness: 300
									},
									className: `grid h-14 w-14 shrink-0 place-items-center rounded-2xl transition-all duration-300 ${visible ? "bg-emerald-500/12 text-emerald-400 ring-1 ring-emerald-500/25" : "bg-muted text-muted-foreground"}`,
									children: visible ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "h-7 w-7" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 175,
										columnNumber: 30
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "h-7 w-7" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 175,
										columnNumber: 62
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 169,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "font-display text-base font-semibold",
										children: visible ? "Profile is Public" : "Profile is Private"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 178,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-sm text-muted-foreground mt-0.5",
										children: visible ? "Approved companies can view your verified work history and trust score." : "Your profile is hidden. No company can access it unless you specifically grant them access."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 181,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 177,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch, {
									checked: visible,
									onCheckedChange: (v) => visibilityMutation.mutate(v),
									disabled: visibilityMutation.isPending,
									className: "shrink-0"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 185,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 168,
							columnNumber: 24
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 161,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 159,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 149,
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
					duration: .4,
					delay: .18
				},
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
					className: "border-border/60 bg-card/85 backdrop-blur-sm overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-0.5 w-full bg-gradient-to-r from-amber-400 via-primary to-transparent" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 203,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, {
								className: "flex items-center gap-2",
								children: ["Background Check Requests", pendingCount > 0 && /* @__PURE__ */ (void 0)(motion.span, {
									animate: { scale: [
										1,
										1.15,
										1
									] },
									transition: {
										duration: 1.5,
										repeat: Infinity
									},
									className: "inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400/15 px-1 text-[10px] font-bold text-amber-400",
									children: pendingCount
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 209,
									columnNumber: 40
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 207,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, { children: "Review and approve background verification requests from HR managers. Auto-refreshes every 30 seconds." }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 218,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 206,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "outline",
								className: "shrink-0 border-success/30 bg-success/8 text-success text-[10px]",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mr-1 h-1.5 w-1.5 rounded-full bg-success inline-block animate-pulse" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 224,
									columnNumber: 17
								}, this), "Live"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 223,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 205,
							columnNumber: 13
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 204,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, { children: requestsLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ListSkeleton, { count: 3 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 230,
							columnNumber: 32
						}, this) : requests.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "py-10 text-center text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-10 w-10 mx-auto mb-3 text-muted-foreground/40" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 231,
								columnNumber: 17
							}, this), "No verification requests received yet."]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 230,
							columnNumber: 85
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
							variants: stagger,
							initial: "hidden",
							animate: "visible",
							className: "space-y-3",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatePresence, { children: requests.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
								variants: slideUp,
								layout: true,
								whileHover: { y: -2 },
								className: "group overflow-hidden rounded-xl border border-border/50 bg-background/40 p-4 backdrop-blur-sm transition-all duration-200 hover:border-primary/25 hover:shadow-elegant",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-col sm:flex-row sm:items-center gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 font-display text-sm font-bold text-primary ring-1 ring-primary/20",
											children: r.requestedByCompany.substring(0, 2).toUpperCase()
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 240,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center gap-1.5 flex-wrap",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "font-semibold text-sm text-foreground",
													children: r.requestedByCompany
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 246,
													columnNumber: 29
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
													variant: "outline",
													className: "text-[10px] capitalize",
													children: r.requestType
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 247,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 245,
												columnNumber: 27
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "text-xs text-muted-foreground mt-0.5",
												children: [
													"Requested by ",
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "font-medium text-foreground/80",
														children: r.requestedByName
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 252,
														columnNumber: 42
													}, this),
													" · ",
													new Date(r.createdAt).toLocaleDateString()
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 251,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 244,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2 shrink-0",
											children: r.status === "pending" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
												variant: "outline",
												size: "sm",
												className: "border-rose-500/30 text-rose-400 hover:bg-rose-500/8 hover:border-rose-500/50 h-8 gap-1",
												onClick: () => resolveMutation.mutate({
													id: r.id,
													status: "denied"
												}),
												disabled: resolveMutation.isPending,
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleX, { className: "h-3.5 w-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 265,
													columnNumber: 33
												}, this), " Deny"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 261,
												columnNumber: 31
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
												size: "sm",
												className: "bg-emerald-600 hover:bg-emerald-700 text-white h-8 gap-1",
												onClick: () => resolveMutation.mutate({
													id: r.id,
													status: "approved"
												}),
												disabled: resolveMutation.isPending,
												children: [resolveMutation.isPending ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "h-3.5 w-3.5 animate-spin" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 271,
													columnNumber: 62
												}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-3.5 w-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 271,
													columnNumber: 115
												}, this), "Approve"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 267,
												columnNumber: 31
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 260,
												columnNumber: 53
											}, this) : r.status === "approved" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
												className: "bg-emerald-500/12 text-emerald-400 border-emerald-500/20 gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-3 w-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 275,
													columnNumber: 31
												}, this), " Approved"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 274,
												columnNumber: 61
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
												className: "bg-rose-500/12 text-rose-400 border-rose-500/20 gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleX, { className: "h-3 w-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 277,
													columnNumber: 31
												}, this), " Denied"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 276,
												columnNumber: 40
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 259,
											columnNumber: 25
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 238,
									columnNumber: 23
								}, this)
							}, r.id, false, {
								fileName: _jsxFileName,
								lineNumber: 235,
								columnNumber: 45
							}, this)) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 234,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 233,
							columnNumber: 24
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 229,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 202,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 192,
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
					duration: .4,
					delay: .26
				},
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
					className: "border-border/60 bg-card/85 backdrop-blur-sm overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-0.5 w-full bg-gradient-to-r from-accent via-emerald-500 to-transparent" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 300,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Company Access Manager" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 302,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, { children: "Manually grant or revoke access to your verified profile for specific companies." }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 303,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 301,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, { children: grantsLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ListSkeleton, { count: 4 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 308,
							columnNumber: 30
						}, this) : grants.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EmptyState, {
							icon: Building2,
							title: "No companies available",
							description: "There are no other verified companies on the platform yet."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 308,
							columnNumber: 81
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
							variants: stagger,
							initial: "hidden",
							animate: "visible",
							className: "space-y-2",
							children: grants.map((c) => {
								const allowed = c.granted;
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
									variants: slideUp,
									whileHover: { y: -1 },
									className: "group flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-3 transition-all duration-200 hover:border-primary/20 hover:shadow-elegant",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 font-display text-sm font-bold text-primary",
											children: c.companyName.substring(0, 2).toUpperCase()
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 314,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "font-semibold text-sm text-foreground truncate flex items-center gap-1.5",
												children: [c.companyName, allowed && /* @__PURE__ */ (void 0)(BadgeCheck, { className: "h-3.5 w-3.5 text-emerald-400 shrink-0" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 320,
													columnNumber: 39
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 318,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "text-xs text-muted-foreground truncate",
												children: [
													c.companyIndustry,
													" · ",
													c.companyLocation || "No location"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 322,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 317,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2 shrink-0",
											children: [allowed ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
												className: "bg-emerald-500/12 text-emerald-400 border-emerald-500/20 text-xs",
												children: "Granted"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 327,
												columnNumber: 36
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
												variant: "outline",
												className: "text-xs text-muted-foreground",
												children: "No access"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 329,
												columnNumber: 38
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
												variant: allowed ? "outline" : "default",
												size: "sm",
												onClick: () => toggleAccessMutation.mutate({
													companyId: c.companyId,
													currentlyGranted: allowed
												}),
												className: `h-8 text-xs ${!allowed ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-elegant" : "border-border/60 hover:border-rose-500/30 hover:text-rose-400"}`,
												disabled: toggleAccessMutation.isPending,
												children: allowed ? "Revoke" : "Grant Access"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 332,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 326,
											columnNumber: 23
										}, this)
									]
								}, c.companyId, true, {
									fileName: _jsxFileName,
									lineNumber: 311,
									columnNumber: 22
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 308,
							columnNumber: 219
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 307,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 299,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 289,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 132,
		columnNumber: 10
	}, this);
}
//#endregion
export { Consent as component };
