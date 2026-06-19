import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DnxMo53r.mjs";
import { t as Badge } from "./badge-GBPLA4QD.mjs";
import { t as Input } from "./input-C8wv43d_.mjs";
import { n as useAuth } from "./auth-provider-CtLo-iYA.mjs";
import { C as Plus, D as MapPin, N as Globe, S as RefreshCw, nt as Building2, ot as BadgeCheck, r as Users, s as TriangleAlert } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as CardContent, t as Card } from "./card-CCXaAbeo.mjs";
import { t as PageHeader } from "./page-header-CDeKwgJG.mjs";
import { a as PaginationNext, i as PaginationLink, n as PaginationContent, o as PaginationPrevious, r as PaginationItem, t as Pagination } from "./pagination-ulKYo7ZP.mjs";
import { t as CardGridSkeleton } from "./loading-skeleton-BkAGb6P9.mjs";
import { t as EmptyState } from "./empty-state-DmMIw0uj.mjs";
import { t as Label } from "./label-ZItyyoZm.mjs";
import { a as DialogFooter, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-BgWFhrxr.mjs";
import { a as listCompanies, i as getCompanyDeleteImpact, n as deleteCompany, o as updateCompany, t as createCompany } from "./companies.functions-D13kaRIC.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.companies-uuw4erVq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/routes/app.companies.tsx?tsr-split=component";
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
			title: "Companies",
			description: "Manage partner companies and their verification status.",
			actions: isSuperAdmin ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						className: "bg-gradient-hero text-primary-foreground shadow-elegant",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "mr-1 h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 205,
							columnNumber: 19
						}, this), " Add company"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 204,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 203,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, { children: "Add company" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 210,
					columnNumber: 19
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 209,
					columnNumber: 17
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					className: "space-y-3",
					onSubmit: handleCreate,
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "name",
								children: "Company Name"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 214,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								id: "name",
								required: true,
								value: name,
								onChange: (e) => setName(e.target.value)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 215,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 213,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "industry",
									children: "Industry"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 219,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "industry",
									required: true,
									value: industry,
									onChange: (e) => setIndustry(e.target.value)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 220,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 218,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "size",
									children: "Size (employees)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 223,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "size",
									required: true,
									placeholder: "e.g. 10-50, 100-500",
									value: size,
									onChange: (e) => setSize(e.target.value)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 224,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 222,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 217,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "location",
								children: "Location"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 228,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								id: "location",
								required: true,
								value: location,
								onChange: (e) => setLocation(e.target.value)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 229,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 227,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "website",
								children: "Website URL"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 232,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								id: "website",
								type: "text",
								placeholder: "https://example.com",
								value: website,
								onChange: (e) => setWebsite(e.target.value)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 233,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 231,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								type: "submit",
								className: "bg-gradient-hero text-primary-foreground shadow-elegant",
								disabled: mutation.isPending,
								children: mutation.isPending ? "Adding..." : "Add company"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 236,
								columnNumber: 21
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 235,
							columnNumber: 19
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 212,
					columnNumber: 17
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 208,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 202,
				columnNumber: 131
			}, this) : void 0
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 202,
			columnNumber: 7
		}, this),
		isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardGridSkeleton, { count: 6 }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 244,
			columnNumber: 20
		}, this) : companiesList.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EmptyState, {
			icon: Building2,
			title: "No companies registered yet",
			description: isSuperAdmin ? "Register your first company to get started." : "Your company is not registered.",
			actionLabel: isSuperAdmin ? "Add Company" : void 0,
			onAction: isSuperAdmin ? () => setOpen(true) : void 0
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 244,
			columnNumber: 82
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: companiesList.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
					className: "group border-border/60 bg-gradient-card transition hover:-translate-y-0.5 hover:shadow-elegant cursor-pointer",
					onClick: () => setSelectedCompany(c),
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-hero font-display text-lg font-bold text-primary-foreground shadow-elegant",
									children: c.name.substring(0, 2).toUpperCase()
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 249,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
											className: "truncate font-display text-lg font-semibold",
											children: c.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 254,
											columnNumber: 25
										}, this), c.verified && /* @__PURE__ */ (void 0)(BadgeCheck, { className: "h-4 w-4 shrink-0 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 255,
											columnNumber: 40
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 253,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "truncate text-xs text-muted-foreground",
										children: c.industry
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 257,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 252,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 248,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4 space-y-1.5 text-sm text-muted-foreground border-t border-border/30 pt-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground/70" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 262,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Location:" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 263,
												columnNumber: 29
											}, this),
											" ",
											c.location || "N/A"
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 263,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 261,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground/70" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 266,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Website:" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 267,
												columnNumber: 23
											}, this),
											" ",
											c.website ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
												href: c.website,
												target: "_blank",
												rel: "noreferrer",
												className: "hover:underline text-primary",
												children: c.website.replace(/^https?:\/\/(www\.)?/, "")
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 268,
												columnNumber: 36
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-muted-foreground/60",
												children: "N/A"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 270,
												columnNumber: 32
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 265,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground/70" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 273,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Declared Size:" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 274,
												columnNumber: 29
											}, this),
											" ",
											c.size || "1-10"
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 274,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 272,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building2, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground/70" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 277,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Registered Users:" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 278,
												columnNumber: 29
											}, this),
											" ",
											c.employeeCount.toLocaleString()
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 278,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 276,
										columnNumber: 21
									}, this),
									(c.creatorName || c.creatorEmail) && /* @__PURE__ */ (void 0)("div", {
										className: "mt-3 border-t border-dashed border-border/50 pt-2 text-xs",
										children: [
											/* @__PURE__ */ (void 0)("div", {
												className: "font-semibold text-muted-foreground/80",
												children: "Registered By:"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 281,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "truncate text-foreground/90 font-medium",
												children: c.creatorName || "Unknown Admin"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 282,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "truncate text-muted-foreground/70",
												children: c.creatorEmail
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 283,
												columnNumber: 25
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 280,
										columnNumber: 59
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 260,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4 flex items-center justify-between border-t border-border/60 pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
									variant: c.status === "approved" ? "default" : c.status === "pending" ? "outline" : "destructive",
									className: c.status === "approved" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/20 capitalize font-medium" : c.status === "rejected" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border-rose-500/20 capitalize font-medium" : c.status === "suspended" ? "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/10 border-red-500/20 capitalize font-medium" : c.status === "archived" ? "bg-slate-500/10 text-slate-600 dark:text-slate-400 hover:bg-slate-500/10 border-slate-500/20 capitalize font-medium" : c.status === "deleted" ? "bg-red-950/15 text-red-500 dark:text-red-400 hover:bg-red-950/15 border-red-500/30 capitalize font-medium line-through" : "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 border-amber-500/20 capitalize font-medium",
									children: c.status || "Pending"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 287,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "ghost",
									size: "sm",
									className: "h-7 px-2 text-xs text-primary font-medium cursor-pointer",
									onClick: (e) => {
										e.stopPropagation();
										setSelectedCompany(c);
									},
									children: "View Profile"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 290,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 286,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 247,
						columnNumber: 17
					}, this)
				}, c.id, false, {
					fileName: _jsxFileName,
					lineNumber: 246,
					columnNumber: 37
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 245,
				columnNumber: 11
			}, this), !isLoading && (data?.totalPages ?? 0) > 1 && /* @__PURE__ */ (void 0)(Pagination, {
				className: "mt-4",
				children: /* @__PURE__ */ (void 0)(PaginationContent, { children: [
					/* @__PURE__ */ (void 0)(PaginationItem, { children: /* @__PURE__ */ (void 0)(PaginationPrevious, {
						onClick: () => setPage((p) => Math.max(1, p - 1)),
						className: page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 304,
						columnNumber: 19
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 303,
						columnNumber: 17
					}, this),
					Array.from({ length: data?.totalPages ?? 0 }).map((_, i) => /* @__PURE__ */ (void 0)(PaginationItem, { children: /* @__PURE__ */ (void 0)(PaginationLink, {
						isActive: page === i + 1,
						onClick: () => setPage(i + 1),
						className: "cursor-pointer",
						children: i + 1
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 309,
						columnNumber: 21
					}, this) }, i, false, {
						fileName: _jsxFileName,
						lineNumber: 308,
						columnNumber: 28
					}, this)),
					/* @__PURE__ */ (void 0)(PaginationItem, { children: /* @__PURE__ */ (void 0)(PaginationNext, {
						onClick: () => setPage((p) => Math.min(data?.totalPages ?? 1, p + 1)),
						className: page === (data?.totalPages ?? 1) ? "pointer-events-none opacity-50" : "cursor-pointer"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 314,
						columnNumber: 19
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 313,
						columnNumber: 17
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 302,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 301,
				columnNumber: 57
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 244,
			columnNumber: 376
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
			open: !!selectedCompany,
			onOpenChange: (open) => !open && setSelectedCompany(null),
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
				className: "max-w-md bg-background border border-border",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
					className: "flex items-center gap-2 font-display text-lg font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building2, { className: "h-5 w-5 text-primary" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 325,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Company Profile" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 326,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 324,
					columnNumber: 13
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 323,
					columnNumber: 11
				}, this), selectedCompany && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("div", {
					className: "space-y-4 py-2",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-start gap-3 pb-3 border-b border-border/50",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-hero font-display text-lg font-bold text-primary-foreground shadow-elegant",
							children: selectedCompany.name.substring(0, 2).toUpperCase()
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 332,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (void 0)("h3", {
								className: "font-display text-lg font-bold flex items-center gap-1.5 truncate",
								children: [selectedCompany.name, selectedCompany.verified && /* @__PURE__ */ (void 0)(BadgeCheck, { className: "h-4 w-4 text-primary shrink-0" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 338,
									columnNumber: 50
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 336,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2 mt-0.5",
								children: [/* @__PURE__ */ (void 0)(Badge, {
									variant: selectedCompany.status === "approved" ? "default" : selectedCompany.status === "pending" ? "outline" : "destructive",
									className: selectedCompany.status === "approved" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/20 mt-1 capitalize font-medium" : selectedCompany.status === "rejected" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border-rose-500/20 mt-1 capitalize font-medium" : selectedCompany.status === "suspended" ? "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/10 border-red-500/20 mt-1 capitalize font-medium" : selectedCompany.status === "archived" ? "bg-slate-500/10 text-slate-600 dark:text-slate-400 hover:bg-slate-500/10 border-slate-500/20 mt-1 capitalize font-medium" : selectedCompany.status === "deleted" ? "bg-red-950/15 text-red-500 dark:text-red-400 hover:bg-red-950/15 border-red-500/30 mt-1 capitalize font-medium line-through" : "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 border-amber-500/20 mt-1 capitalize font-medium",
									children: selectedCompany.status || "Pending"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 341,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-xs text-muted-foreground",
									children: [
										"· ",
										selectedCompany.industry,
										" Industry"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 344,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 340,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 335,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 331,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "space-y-3 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-[110px_1fr] gap-1",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "font-medium text-foreground",
									children: "Location:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 351,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-foreground/90",
									children: selectedCompany.location || "N/A"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 352,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 350,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-[110px_1fr] gap-1",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "font-medium text-foreground",
									children: "Website:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 355,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "truncate",
									children: selectedCompany.website ? /* @__PURE__ */ (void 0)("a", {
										href: selectedCompany.website,
										target: "_blank",
										rel: "noreferrer",
										className: "text-primary hover:underline font-medium break-all",
										children: selectedCompany.website
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 357,
										columnNumber: 48
									}, this) : "N/A"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 356,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 354,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-[110px_1fr] gap-1",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "font-medium text-foreground",
									children: "Company Size:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 363,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-foreground/90",
									children: [selectedCompany.size || "1-10", " employees"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 364,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 362,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-[110px_1fr] gap-1",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "font-medium text-foreground",
									children: "Active Employees:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 367,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-foreground/90",
									children: [selectedCompany.employeeCount, " users"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 368,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 366,
								columnNumber: 17
							}, this),
							(selectedCompany.creatorName || selectedCompany.creatorEmail) && /* @__PURE__ */ (void 0)("div", {
								className: "mt-4 border-t border-border/50 pt-3 space-y-2",
								children: [/* @__PURE__ */ (void 0)("h4", {
									className: "text-xs font-semibold text-foreground uppercase tracking-wider",
									children: "Registered Administrator"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 372,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "bg-muted/40 p-2.5 rounded-lg space-y-0.5 border border-border/40",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "font-semibold text-foreground/90",
										children: selectedCompany.creatorName || "Unknown Admin"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 374,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "text-xs text-muted-foreground",
										children: selectedCompany.creatorEmail
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 375,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 373,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 371,
								columnNumber: 83
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 349,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 330,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)(DialogFooter, {
					className: "flex flex-wrap gap-2 justify-end sm:gap-2 border-t pt-4",
					children: [/* @__PURE__ */ (void 0)(DialogClose, {
						asChild: true,
						children: /* @__PURE__ */ (void 0)(Button, {
							variant: "outline",
							size: "sm",
							children: "Close"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 382,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 381,
						columnNumber: 15
					}, this), isSuperAdmin && selectedCompany.status !== "deleted" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
						selectedCompany.status !== "approved" && /* @__PURE__ */ (void 0)(Button, {
							size: "sm",
							className: "bg-emerald-600 hover:bg-emerald-700 text-white font-medium cursor-pointer",
							onClick: () => verifyMutation.mutate({
								id: selectedCompany.id,
								verified: true,
								status: "approved"
							}),
							disabled: verifyMutation.isPending,
							children: "Approve"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 385,
							columnNumber: 61
						}, this),
						selectedCompany.status !== "rejected" && selectedCompany.status !== "approved" && /* @__PURE__ */ (void 0)(Button, {
							size: "sm",
							variant: "destructive",
							className: "font-medium cursor-pointer",
							onClick: () => {
								if (confirm(`Are you sure you want to reject "${selectedCompany.name}"?`)) rejectMutation.mutate({ id: selectedCompany.id });
							},
							disabled: rejectMutation.isPending,
							children: "Reject"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 392,
							columnNumber: 102
						}, this),
						selectedCompany.status === "approved" && /* @__PURE__ */ (void 0)(Button, {
							size: "sm",
							variant: "outline",
							className: "border-amber-500/30 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/10 font-medium cursor-pointer",
							onClick: () => suspendMutation.mutate({ id: selectedCompany.id }),
							disabled: suspendMutation.isPending,
							children: "Suspend"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 399,
							columnNumber: 61
						}, this),
						selectedCompany.status !== "archived" && /* @__PURE__ */ (void 0)(Button, {
							size: "sm",
							variant: "outline",
							className: "border-slate-500/30 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-950/10 font-medium cursor-pointer",
							onClick: () => archiveMutation.mutate({ id: selectedCompany.id }),
							disabled: archiveMutation.isPending,
							children: "Archive"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 404,
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
							lineNumber: 409,
							columnNumber: 19
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 384,
						columnNumber: 72
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 380,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 329,
					columnNumber: 31
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 322,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 321,
			columnNumber: 7
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
							lineNumber: 426,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("span", { children: "Confirm Company Deletion" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 427,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 425,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)(DialogDescription, { children: "Review the cascading impact of soft-deleting this company." }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 429,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 424,
						columnNumber: 13
					}, this),
					isLoadingImpact ? /* @__PURE__ */ (void 0)("div", {
						className: "py-6 flex justify-center",
						children: /* @__PURE__ */ (void 0)(RefreshCw, { className: "h-6 w-6 animate-spin text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 435,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 434,
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
										lineNumber: 438,
										columnNumber: 56
									}, this),
									"? This action will archive active relationships but preserve individual career history."
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 437,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "space-y-2.5",
								children: [/* @__PURE__ */ (void 0)("h4", {
									className: "font-semibold text-foreground text-xs uppercase tracking-wider",
									children: "Cascading Impact Summary:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 442,
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
												lineNumber: 446,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)(Badge, {
												variant: "destructive",
												className: "bg-rose-500/10 text-rose-600 border-rose-500/20 font-medium",
												children: "Status to DELETED"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 447,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 445,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "flex justify-between items-center py-1",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground font-medium",
												children: "HR / Admin Accounts:"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 450,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "font-bold text-foreground",
												children: [deleteImpact.hrCount, " unlinked (set to null)"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 451,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 449,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "flex justify-between items-center py-1",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground font-medium",
												children: "Active Employee Profiles:"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 454,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "font-bold text-foreground",
												children: [deleteImpact.employeeCount, " unlinked & profiles survive"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 455,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 453,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "flex justify-between items-center py-1",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground font-medium",
												children: "Employment Records:"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 458,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "font-bold text-emerald-600 dark:text-emerald-400",
												children: [deleteImpact.employeeCount, " archived in career history"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 459,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 457,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "flex justify-between items-center py-1",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground font-medium",
												children: "Verification Requests:"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 462,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "font-bold text-foreground",
												children: [deleteImpact.requestCount, " historical records kept"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 463,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 461,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "flex justify-between items-center pt-1.5 border-t border-border/40",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground font-medium",
												children: "Performance Reviews:"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 466,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "font-bold text-foreground",
												children: [deleteImpact.reviewCount, " preserved on employees"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 467,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 465,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 444,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 441,
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
											lineNumber: 474,
											columnNumber: 26
										}, this),
										" to confirm deletion:"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 473,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)(Input, {
									id: "confirm-name-input",
									value: confirmNameInput,
									onChange: (e) => setConfirmNameInput(e.target.value),
									placeholder: "Enter company name",
									className: "border-rose-500/30 focus-visible:ring-rose-500/30 w-full"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 476,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 472,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 436,
						columnNumber: 39
					}, this) : /* @__PURE__ */ (void 0)("div", {
						className: "py-4 text-center text-muted-foreground",
						children: "Failed to load impact details."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 478,
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
							lineNumber: 481,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)(Button, {
							variant: "destructive",
							disabled: isLoadingImpact || !deleteImpact || confirmNameInput !== deleteImpact.companyName || deleteMutation.isPending,
							onClick: () => deleteMutation.mutate(companyToDelete.id),
							className: "bg-rose-600 hover:bg-rose-700 text-white font-semibold cursor-pointer",
							children: deleteMutation.isPending ? "Deleting..." : "Confirm Deletion"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 484,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 480,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 423,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 422,
			columnNumber: 48
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 201,
		columnNumber: 10
	}, this);
}
//#endregion
export { Companies as component };
