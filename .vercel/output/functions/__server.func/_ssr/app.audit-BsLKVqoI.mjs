import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Badge } from "./badge-KS2SooOw.mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-a-evWZ4r.mjs";
import { a as numberType, c as stringType, l as unknownType, o as objectType, r as enumType, s as recordType } from "../_libs/zod.mjs";
import { t as Input } from "./input-BYcV5Phs.mjs";
import { P as Funnel, x as ScrollText } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Card } from "./card-DRtcuf8H.mjs";
import { t as PageHeader } from "./page-header-DHJUr0Vr.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DdpCoWi7.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-C9T31-X3.mjs";
import { a as PaginationNext, i as PaginationLink, n as PaginationContent, o as PaginationPrevious, r as PaginationItem, t as Pagination } from "./pagination-7DnslzYf.mjs";
import { o as TableSkeleton } from "./loading-skeleton-BKYH7Wpk.mjs";
import { t as EmptyState } from "./empty-state-B-onYlus.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.audit-BsLKVqoI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
createServerFn({ method: "POST" }).validator(objectType({
	userId: stringType().uuid(),
	action: stringType().min(1),
	targetType: stringType().min(1),
	targetId: stringType().min(1),
	type: enumType([
		"login",
		"logout",
		"access",
		"create",
		"update",
		"delete",
		"verification_request",
		"consent_change"
	]),
	metadata: recordType(unknownType()).optional(),
	ipAddress: stringType().optional()
})).handler(createSsrRpc("1c1abf229d9f31801a2a85caa841db9d1369b889d67ce9789510429952f9a5f9"));
var listAuditLogs = createServerFn({ method: "GET" }).validator(objectType({
	page: numberType().int().positive().optional().default(1),
	pageSize: numberType().int().positive().max(100).optional().default(20),
	type: enumType([
		"login",
		"logout",
		"access",
		"create",
		"update",
		"delete",
		"verification_request",
		"consent_change"
	]).optional(),
	search: stringType().optional()
})).handler(createSsrRpc("eaa35f0047882869158ac10fcfdb8ee46905956a415ed8b52c10b5df3abcf06a"));
var typeColor = {
	update: "border-warning/40 bg-warning/10 text-warning",
	login: "border-primary/40 bg-primary/10 text-primary",
	logout: "border-muted/40 bg-muted/10 text-muted-foreground",
	access: "border-accent/40 bg-accent/10 text-accent",
	create: "border-success/40 bg-success/10 text-success",
	delete: "border-destructive/40 bg-destructive/10 text-destructive",
	verification_request: "border-indigo-500/40 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
	consent_change: "border-teal-500/40 bg-teal-500/10 text-teal-600 dark:text-teal-400"
};
var PER_PAGE = 15;
function Audit() {
	const [q, setQ] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("all");
	const [page, setPage] = (0, import_react.useState)(1);
	const { data, isLoading } = useQuery({
		queryKey: [
			"audit-logs",
			q,
			type,
			page
		],
		queryFn: () => listAuditLogs({ data: {
			page,
			pageSize: PER_PAGE,
			type: type === "all" ? void 0 : type,
			search: q || void 0
		} })
	});
	const logs = data?.data ?? [];
	data?.total;
	const pages = data?.totalPages ?? 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Audit Logs",
		description: "Immutable trail of all access, updates, and authentication events."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "border-border/60 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => {
						setQ(e.target.value);
						setPage(1);
					},
					placeholder: "Search by user, action, or target…"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: type,
					onValueChange: (v) => {
						setType(v);
						setPage(1);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
						className: "w-44",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "mr-2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "All events"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "login",
							children: "Login"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "logout",
							children: "Logout"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "access",
							children: "Access"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "update",
							children: "Update"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "create",
							children: "Create"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "delete",
							children: "Delete"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "verification_request",
							children: "Verification Request"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "consent_change",
							children: "Consent Change"
						})
					] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-hidden rounded-lg border",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
					rows: PER_PAGE,
					columns: 5
				}) : logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: ScrollText,
						title: "No audit logs found",
						description: "We couldn't find any audit event entries matching your search."
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Time" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "User" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Action" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Target" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Type" })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: logs.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-xs text-muted-foreground",
						children: new Date(a.timestamp).toLocaleString()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-medium text-sm",
						children: a.userName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-sm",
						children: a.action
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-xs font-mono text-muted-foreground",
						children: a.targetType ? `${a.targetType}:${a.targetId.substring(0, 8)}` : "N/A"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: `${typeColor[a.type] || ""} capitalize text-[10px]`,
						children: a.type.replace("_", " ")
					}) })
				] }, a.id)) })] })
			}),
			!isLoading && pages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationPrevious, {
						onClick: () => setPage((p) => Math.max(1, p - 1)),
						className: page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
					}) }),
					Array.from({ length: pages }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationLink, {
						isActive: page === i + 1,
						onClick: () => setPage(i + 1),
						className: "cursor-pointer",
						children: i + 1
					}) }, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNext, {
						onClick: () => setPage((p) => Math.min(pages, p + 1)),
						className: page === pages ? "pointer-events-none opacity-50" : "cursor-pointer"
					}) })
				] })
			})
		]
	})] });
}
//#endregion
export { Audit as component };
