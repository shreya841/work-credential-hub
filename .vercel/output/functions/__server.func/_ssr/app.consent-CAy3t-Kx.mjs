import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BPK1zgJN.mjs";
import { t as Badge } from "./badge-KS2SooOw.mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-a-evWZ4r.mjs";
import { c as stringType, n as booleanType, o as objectType } from "../_libs/zod.mjs";
import { A as Lock, K as CircleX, N as Globe, S as RefreshCw, U as Clock, h as ShieldCheck, nt as Building2, ot as BadgeCheck, q as CircleCheck } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-DRtcuf8H.mjs";
import { t as PageHeader } from "./page-header-DHJUr0Vr.mjs";
import { r as ListSkeleton } from "./loading-skeleton-BKYH7Wpk.mjs";
import { t as EmptyState } from "./empty-state-B-onYlus.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Switch } from "./switch-eIbfVW8p.mjs";
import { n as listVerificationRequests, r as resolveVerificationRequest } from "./verification2.functions-DVHevb61.mjs";
import { i as AnimatePresence, r as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.consent-CAy3t-Kx.js
var import_jsx_runtime = require_jsx_runtime();
var getConsentSettings = createServerFn({ method: "GET" }).handler(createSsrRpc("00154c326d5011867d6fbff32acf209216aed3008c56cc344f91197c3a44067e"));
var updateConsentVisibility = createServerFn({ method: "POST" }).validator(objectType({ publicVisible: booleanType() })).handler(createSsrRpc("2087f69dbd8ce238c7a44bc1238bf21712d5619e32cab0353c9c87612b93657a"));
var listConsentGrants = createServerFn({ method: "GET" }).handler(createSsrRpc("d9826fdea6e23705d85b16a9f6434949814c907ccafed5f2bb20b6ec5d6c585a"));
var grantAccess = createServerFn({ method: "POST" }).validator(objectType({ companyId: stringType().uuid() })).handler(createSsrRpc("e27c297b4939adcc11f41364c765d77368e1f789672629fa790107fab3c372bd"));
var revokeAccess = createServerFn({ method: "POST" }).validator(objectType({ companyId: stringType().uuid() })).handler(createSsrRpc("3a39a799af86c4b5120db0a87d016db16b81cadee92430e276a290a0c6bcfb9b"));
createServerFn({ method: "GET" }).handler(createSsrRpc("f813c8ccb45e92e86109d5cb921f0c3a7b4f71feba83df47e4b7e6e608d5c3f6"));
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
					title: "Consent Management",
					description: "Control who can view your verified work history and approve background checks.",
					actions: pendingCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						className: "bg-amber-400/12 text-amber-400 border-amber-400/25 animate-pulse",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3 mr-1" }),
							pendingCount,
							" pending request",
							pendingCount > 1 ? "s" : ""
						]
					}) : void 0
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
					duration: .4,
					delay: .1
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-border/60 bg-card/85 backdrop-blur-sm overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-0.5 w-full transition-all duration-500 ${visible ? "bg-gradient-to-r from-emerald-500 via-primary to-transparent" : "bg-gradient-to-r from-muted to-transparent"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "p-5",
						children: settingsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-36 bg-muted animate-pulse rounded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3.5 w-64 bg-muted animate-pulse rounded" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-11 bg-muted animate-pulse rounded-full" })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									animate: { scale: visible ? 1.05 : 1 },
									transition: {
										type: "spring",
										stiffness: 300
									},
									className: `grid h-14 w-14 shrink-0 place-items-center rounded-2xl transition-all duration-300 ${visible ? "bg-emerald-500/12 text-emerald-400 ring-1 ring-emerald-500/25" : "bg-muted text-muted-foreground"}`,
									children: visible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-7 w-7" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-7 w-7" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-base font-semibold",
										children: visible ? "Profile is Public" : "Profile is Private"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground mt-0.5",
										children: visible ? "Approved companies can view your verified work history and trust score." : "Your profile is hidden. No company can access it unless you specifically grant them access."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: visible,
									onCheckedChange: (v) => visibilityMutation.mutate(v),
									disabled: visibilityMutation.isPending,
									className: "shrink-0"
								})
							]
						})
					})]
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
					duration: .4,
					delay: .18
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-border/60 bg-card/85 backdrop-blur-sm overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-0.5 w-full bg-gradient-to-r from-amber-400 via-primary to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								className: "flex items-center gap-2",
								children: ["Background Check Requests", pendingCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
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
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Review and approve background verification requests from HR managers. Auto-refreshes every 30 seconds." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								className: "shrink-0 border-success/30 bg-success/8 text-success text-[10px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mr-1 h-1.5 w-1.5 rounded-full bg-success inline-block animate-pulse" }), "Live"]
							})]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: requestsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 3 }) : requests.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-10 text-center text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-10 w-10 mx-auto mb-3 text-muted-foreground/40" }), "No verification requests received yet."]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							variants: stagger,
							initial: "hidden",
							animate: "visible",
							className: "space-y-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: requests.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								variants: slideUp,
								layout: true,
								whileHover: { y: -2 },
								className: "group overflow-hidden rounded-xl border border-border/50 bg-background/40 p-4 backdrop-blur-sm transition-all duration-200 hover:border-primary/25 hover:shadow-elegant",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row sm:items-center gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 font-display text-sm font-bold text-primary ring-1 ring-primary/20",
											children: r.requestedByCompany.substring(0, 2).toUpperCase()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5 flex-wrap",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-sm text-foreground",
													children: r.requestedByCompany
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "outline",
													className: "text-[10px] capitalize",
													children: r.requestType
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground mt-0.5",
												children: [
													"Requested by ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-foreground/80",
														children: r.requestedByName
													}),
													" · ",
													new Date(r.createdAt).toLocaleDateString()
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-2 shrink-0",
											children: r.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: "outline",
												size: "sm",
												className: "border-rose-500/30 text-rose-400 hover:bg-rose-500/8 hover:border-rose-500/50 h-8 gap-1",
												onClick: () => resolveMutation.mutate({
													id: r.id,
													status: "denied"
												}),
												disabled: resolveMutation.isPending,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3.5 w-3.5" }), " Deny"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												className: "bg-emerald-600 hover:bg-emerald-700 text-white h-8 gap-1",
												onClick: () => resolveMutation.mutate({
													id: r.id,
													status: "approved"
												}),
												disabled: resolveMutation.isPending,
												children: [resolveMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), "Approve"]
											})] }) : r.status === "approved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												className: "bg-emerald-500/12 text-emerald-400 border-emerald-500/20 gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }), " Approved"]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												className: "bg-rose-500/12 text-rose-400 border-rose-500/20 gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3 w-3" }), " Denied"]
											})
										})
									]
								})
							}, r.id)) })
						}) })
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
					duration: .4,
					delay: .26
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-border/60 bg-card/85 backdrop-blur-sm overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-0.5 w-full bg-gradient-to-r from-accent via-emerald-500 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Company Access Manager" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Manually grant or revoke access to your verified profile for specific companies." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: grantsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 4 }) : grants.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: Building2,
							title: "No companies available",
							description: "There are no other verified companies on the platform yet."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							variants: stagger,
							initial: "hidden",
							animate: "visible",
							className: "space-y-2",
							children: grants.map((c) => {
								const allowed = c.granted;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									variants: slideUp,
									whileHover: { y: -1 },
									className: "group flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-3 transition-all duration-200 hover:border-primary/20 hover:shadow-elegant",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 font-display text-sm font-bold text-primary",
											children: c.companyName.substring(0, 2).toUpperCase()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-semibold text-sm text-foreground truncate flex items-center gap-1.5",
												children: [c.companyName, allowed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-3.5 w-3.5 text-emerald-400 shrink-0" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xs text-muted-foreground truncate",
												children: [
													c.companyIndustry,
													" · ",
													c.companyLocation || "No location"
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 shrink-0",
											children: [allowed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												className: "bg-emerald-500/12 text-emerald-400 border-emerald-500/20 text-xs",
												children: "Granted"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "outline",
												className: "text-xs text-muted-foreground",
												children: "No access"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: allowed ? "outline" : "default",
												size: "sm",
												onClick: () => toggleAccessMutation.mutate({
													companyId: c.companyId,
													currentlyGranted: allowed
												}),
												className: `h-8 text-xs ${!allowed ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-elegant" : "border-border/60 hover:border-rose-500/30 hover:text-rose-400"}`,
												disabled: toggleAccessMutation.isPending,
												children: allowed ? "Revoke" : "Grant Access"
											})]
										})
									]
								}, c.companyId);
							})
						}) })
					]
				})
			})
		]
	});
}
//#endregion
export { Consent as component };
