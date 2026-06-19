import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BPK1zgJN.mjs";
import { t as Badge } from "./badge-KS2SooOw.mjs";
import { t as Input } from "./input-BYcV5Phs.mjs";
import { n as useAuth } from "./auth-provider-DIoK8pn-.mjs";
import { C as Plus, D as MapPin, N as Globe, S as RefreshCw, nt as Building2, ot as BadgeCheck, r as Users, s as TriangleAlert } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as CardContent, t as Card } from "./card-DRtcuf8H.mjs";
import { t as PageHeader } from "./page-header-DHJUr0Vr.mjs";
import { a as PaginationNext, i as PaginationLink, n as PaginationContent, o as PaginationPrevious, r as PaginationItem, t as Pagination } from "./pagination-7DnslzYf.mjs";
import { t as CardGridSkeleton } from "./loading-skeleton-BKYH7Wpk.mjs";
import { t as EmptyState } from "./empty-state-B-onYlus.mjs";
import { t as Label } from "./label-qle7VSy6.mjs";
import { a as DialogFooter, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-OO5XYV91.mjs";
import { a as listCompanies, i as getCompanyDeleteImpact, n as deleteCompany, o as updateCompany, t as createCompany } from "./companies.functions-r1DEM_Ym.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.companies-DHPS7Fpc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Companies() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [industry, setIndustry] = (0, import_react.useState)("");
	const [size, setSize] = (0, import_react.useState)("");
	const [location, setLocation] = (0, import_react.useState)("");
	const [website, setWebsite] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const pageSize = 8;
	const { data, isLoading } = useQuery({
		queryKey: ["companies", page],
		queryFn: () => listCompanies({ data: {
			page,
			pageSize
		} })
	});
	const mutation = useMutation({
		mutationFn: (newCompany) => createCompany({ data: newCompany }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["companies"] });
			toast.success("Company added successfully");
			setOpen(false);
			setName("");
			setIndustry("");
			setSize("");
			setLocation("");
			setWebsite("");
		},
		onError: (err) => {
			toast.error(err instanceof Error ? err.message : "Failed to create company");
		}
	});
	const verifyMutation = useMutation({
		mutationFn: ({ id, verified, status }) => updateCompany({ data: {
			id,
			verified,
			status
		} }),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["companies"] });
			toast.success(variables.status === "approved" ? "Company approved successfully" : "Company status updated");
		},
		onError: (err) => {
			toast.error(err instanceof Error ? err.message : "Failed to update status");
		}
	});
	const [selectedCompany, setSelectedCompany] = (0, import_react.useState)(null);
	const rejectMutation = useMutation({
		mutationFn: ({ id }) => updateCompany({ data: {
			id,
			status: "rejected",
			verified: false
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["companies"] });
			toast.success("Company registration rejected successfully");
			setSelectedCompany(null);
		},
		onError: (err) => {
			toast.error(err instanceof Error ? err.message : "Failed to reject company");
		}
	});
	const suspendMutation = useMutation({
		mutationFn: ({ id }) => updateCompany({ data: {
			id,
			status: "suspended",
			verified: false
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["companies"] });
			toast.success("Company suspended successfully");
			setSelectedCompany(null);
		},
		onError: (err) => toast.error(err.message || "Failed to suspend company")
	});
	const archiveMutation = useMutation({
		mutationFn: ({ id }) => updateCompany({ data: {
			id,
			status: "archived",
			verified: false
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["companies"] });
			toast.success("Company archived successfully");
			setSelectedCompany(null);
		},
		onError: (err) => toast.error(err.message || "Failed to archive company")
	});
	const [deleteConfirmOpen, setDeleteConfirmOpen] = (0, import_react.useState)(false);
	const [companyToDelete, setCompanyToDelete] = (0, import_react.useState)(null);
	const [confirmNameInput, setConfirmNameInput] = (0, import_react.useState)("");
	const { data: deleteImpact, isLoading: isLoadingImpact } = useQuery({
		queryKey: ["delete-impact-companies", companyToDelete?.id],
		queryFn: () => getCompanyDeleteImpact({ data: { id: companyToDelete.id } }),
		enabled: !!companyToDelete?.id
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => deleteCompany({ data: { id } }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["companies"] });
			toast.success("Company deleted successfully");
			setSelectedCompany(null);
			setDeleteConfirmOpen(false);
			setConfirmNameInput("");
		},
		onError: (err) => toast.error(err.message || "Failed to delete company")
	});
	const handleCreate = (e) => {
		e.preventDefault();
		mutation.mutate({
			name,
			industry,
			size,
			location,
			website: website || ""
		});
	};
	const isSuperAdmin = user.role === "super_admin";
	const companiesList = data?.data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Companies",
			description: "Manage partner companies and their verification status.",
			actions: isSuperAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "bg-gradient-hero text-primary-foreground shadow-elegant",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add company"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add company" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-3",
					onSubmit: handleCreate,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "name",
								children: "Company Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "name",
								required: true,
								value: name,
								onChange: (e) => setName(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "industry",
									children: "Industry"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "industry",
									required: true,
									value: industry,
									onChange: (e) => setIndustry(e.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "size",
									children: "Size (employees)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "size",
									required: true,
									placeholder: "e.g. 10-50, 100-500",
									value: size,
									onChange: (e) => setSize(e.target.value)
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "location",
								children: "Location"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "location",
								required: true,
								value: location,
								onChange: (e) => setLocation(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "website",
								children: "Website URL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "website",
								type: "text",
								placeholder: "https://example.com",
								value: website,
								onChange: (e) => setWebsite(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "bg-gradient-hero text-primary-foreground shadow-elegant",
								disabled: mutation.isPending,
								children: mutation.isPending ? "Adding..." : "Add company"
							})
						})
					]
				})] })]
			}) : void 0
		}),
		isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardGridSkeleton, { count: 6 }) : companiesList.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Building2,
			title: "No companies registered yet",
			description: isSuperAdmin ? "Register your first company to get started." : "Your company is not registered.",
			actionLabel: isSuperAdmin ? "Add Company" : void 0,
			onAction: isSuperAdmin ? () => setOpen(true) : void 0
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: companiesList.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "group border-border/60 bg-gradient-card transition hover:-translate-y-0.5 hover:shadow-elegant cursor-pointer",
					onClick: () => setSelectedCompany(c),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-hero font-display text-lg font-bold text-primary-foreground shadow-elegant",
									children: c.name.substring(0, 2).toUpperCase()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "truncate font-display text-lg font-semibold",
											children: c.name
										}), c.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-4 w-4 shrink-0 text-primary" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs text-muted-foreground",
										children: c.industry
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-1.5 text-sm text-muted-foreground border-t border-border/30 pt-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Location:" }),
											" ",
											c.location || "N/A"
										] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground/70" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Website:" }),
											" ",
											c.website ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: c.website,
												target: "_blank",
												rel: "noreferrer",
												className: "hover:underline text-primary",
												children: c.website.replace(/^https?:\/\/(www\.)?/, "")
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground/60",
												children: "N/A"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Declared Size:" }),
											" ",
											c.size || "1-10"
										] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Registered Users:" }),
											" ",
											c.employeeCount.toLocaleString()
										] })]
									}),
									(c.creatorName || c.creatorEmail) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 border-t border-dashed border-border/50 pt-2 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-muted-foreground/80",
												children: "Registered By:"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "truncate text-foreground/90 font-medium",
												children: c.creatorName || "Unknown Admin"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "truncate text-muted-foreground/70",
												children: c.creatorEmail
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-center justify-between border-t border-border/60 pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: c.status === "approved" ? "default" : c.status === "pending" ? "outline" : "destructive",
									className: c.status === "approved" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/20 capitalize font-medium" : c.status === "rejected" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border-rose-500/20 capitalize font-medium" : c.status === "suspended" ? "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/10 border-red-500/20 capitalize font-medium" : c.status === "archived" ? "bg-slate-500/10 text-slate-600 dark:text-slate-400 hover:bg-slate-500/10 border-slate-500/20 capitalize font-medium" : c.status === "deleted" ? "bg-red-950/15 text-red-500 dark:text-red-400 hover:bg-red-950/15 border-red-500/30 capitalize font-medium line-through" : "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 border-amber-500/20 capitalize font-medium",
									children: c.status || "Pending"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "sm",
									className: "h-7 px-2 text-xs text-primary font-medium cursor-pointer",
									onClick: (e) => {
										e.stopPropagation();
										setSelectedCompany(c);
									},
									children: "View Profile"
								})]
							})
						]
					})
				}, c.id))
			}), !isLoading && (data?.totalPages ?? 0) > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationPrevious, {
						onClick: () => setPage((p) => Math.max(1, p - 1)),
						className: page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
					}) }),
					Array.from({ length: data?.totalPages ?? 0 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationLink, {
						isActive: page === i + 1,
						onClick: () => setPage(i + 1),
						className: "cursor-pointer",
						children: i + 1
					}) }, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNext, {
						onClick: () => setPage((p) => Math.min(data?.totalPages ?? 1, p + 1)),
						className: page === (data?.totalPages ?? 1) ? "pointer-events-none opacity-50" : "cursor-pointer"
					}) })
				] })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!selectedCompany,
			onOpenChange: (open) => !open && setSelectedCompany(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-md bg-background border border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "flex items-center gap-2 font-display text-lg font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Company Profile" })]
				}) }), selectedCompany && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 pb-3 border-b border-border/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-hero font-display text-lg font-bold text-primary-foreground shadow-elegant",
							children: selectedCompany.name.substring(0, 2).toUpperCase()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-display text-lg font-bold flex items-center gap-1.5 truncate",
								children: [selectedCompany.name, selectedCompany.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-4 w-4 text-primary shrink-0" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mt-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: selectedCompany.status === "approved" ? "default" : selectedCompany.status === "pending" ? "outline" : "destructive",
									className: selectedCompany.status === "approved" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/20 mt-1 capitalize font-medium" : selectedCompany.status === "rejected" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border-rose-500/20 mt-1 capitalize font-medium" : selectedCompany.status === "suspended" ? "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/10 border-red-500/20 mt-1 capitalize font-medium" : selectedCompany.status === "archived" ? "bg-slate-500/10 text-slate-600 dark:text-slate-400 hover:bg-slate-500/10 border-slate-500/20 mt-1 capitalize font-medium" : selectedCompany.status === "deleted" ? "bg-red-950/15 text-red-500 dark:text-red-400 hover:bg-red-950/15 border-red-500/30 mt-1 capitalize font-medium line-through" : "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 border-amber-500/20 mt-1 capitalize font-medium",
									children: selectedCompany.status || "Pending"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [
										"· ",
										selectedCompany.industry,
										" Industry"
									]
								})]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[110px_1fr] gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground",
									children: "Location:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground/90",
									children: selectedCompany.location || "N/A"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[110px_1fr] gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground",
									children: "Website:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: selectedCompany.website ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: selectedCompany.website,
										target: "_blank",
										rel: "noreferrer",
										className: "text-primary hover:underline font-medium break-all",
										children: selectedCompany.website
									}) : "N/A"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[110px_1fr] gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground",
									children: "Company Size:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-foreground/90",
									children: [selectedCompany.size || "1-10", " employees"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[110px_1fr] gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground",
									children: "Active Employees:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-foreground/90",
									children: [selectedCompany.employeeCount, " users"]
								})]
							}),
							(selectedCompany.creatorName || selectedCompany.creatorEmail) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 border-t border-border/50 pt-3 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-xs font-semibold text-foreground uppercase tracking-wider",
									children: "Registered Administrator"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-muted/40 p-2.5 rounded-lg space-y-0.5 border border-border/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-foreground/90",
										children: selectedCompany.creatorName || "Unknown Admin"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: selectedCompany.creatorEmail
									})]
								})]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "flex flex-wrap gap-2 justify-end sm:gap-2 border-t pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							children: "Close"
						})
					}), isSuperAdmin && selectedCompany.status !== "deleted" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						selectedCompany.status !== "approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							className: "bg-emerald-600 hover:bg-emerald-700 text-white font-medium cursor-pointer",
							onClick: () => verifyMutation.mutate({
								id: selectedCompany.id,
								verified: true,
								status: "approved"
							}),
							disabled: verifyMutation.isPending,
							children: "Approve"
						}),
						selectedCompany.status !== "rejected" && selectedCompany.status !== "approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "destructive",
							className: "font-medium cursor-pointer",
							onClick: () => {
								if (confirm(`Are you sure you want to reject "${selectedCompany.name}"?`)) rejectMutation.mutate({ id: selectedCompany.id });
							},
							disabled: rejectMutation.isPending,
							children: "Reject"
						}),
						selectedCompany.status === "approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							className: "border-amber-500/30 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/10 font-medium cursor-pointer",
							onClick: () => suspendMutation.mutate({ id: selectedCompany.id }),
							disabled: suspendMutation.isPending,
							children: "Suspend"
						}),
						selectedCompany.status !== "archived" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							className: "border-slate-500/30 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-950/10 font-medium cursor-pointer",
							onClick: () => archiveMutation.mutate({ id: selectedCompany.id }),
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
				})] })]
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
	] });
}
//#endregion
export { Companies as component };
