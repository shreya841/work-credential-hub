import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Badge } from "./badge-GBPLA4QD.mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-Cj2KU_kF.mjs";
import { a as numberType, c as stringType, l as unknownType, o as objectType, r as enumType, s as recordType } from "../_libs/zod.mjs";
import { t as Input } from "./input-C8wv43d_.mjs";
import { P as Funnel, x as ScrollText } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Card } from "./card-CCXaAbeo.mjs";
import { t as PageHeader } from "./page-header-CDeKwgJG.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-mLrJhqIt.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-cNCVehGV.mjs";
import { a as PaginationNext, i as PaginationLink, n as PaginationContent, o as PaginationPrevious, r as PaginationItem, t as Pagination } from "./pagination-ulKYo7ZP.mjs";
import { o as TableSkeleton } from "./loading-skeleton-BkAGb6P9.mjs";
import { t as EmptyState } from "./empty-state-DmMIw0uj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.audit-CmGyImxL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
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
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/routes/app.audit.tsx?tsr-split=component";
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
		title: "Audit Logs",
		description: "Immutable trail of all access, updates, and authentication events."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 47,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
		className: "border-border/60 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
					value: q,
					onChange: (e) => {
						setQ(e.target.value);
						setPage(1);
					},
					placeholder: "Search by user, action, or target…"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 50,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
					value: type,
					onValueChange: (v) => {
						setType(v);
						setPage(1);
					},
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
						className: "w-44",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Funnel, { className: "mr-2 h-4 w-4 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 59,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 60,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 58,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value: "all",
							children: "All events"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 63,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value: "login",
							children: "Login"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 64,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value: "logout",
							children: "Logout"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 65,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value: "access",
							children: "Access"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 66,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value: "update",
							children: "Update"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 67,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value: "create",
							children: "Create"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 68,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value: "delete",
							children: "Delete"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 69,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value: "verification_request",
							children: "Verification Request"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 70,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value: "consent_change",
							children: "Consent Change"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 71,
							columnNumber: 15
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 62,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 54,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 49,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 overflow-hidden rounded-lg border",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableSkeleton, {
					rows: PER_PAGE,
					columns: 5
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 77,
					columnNumber: 24
				}, this) : logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EmptyState, {
						icon: ScrollText,
						title: "No audit logs found",
						description: "We couldn't find any audit event entries matching your search."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 78,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 77,
					columnNumber: 92
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, { children: "Time" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 82,
						columnNumber: 19
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, { children: "User" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 83,
						columnNumber: 19
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, { children: "Action" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 84,
						columnNumber: 19
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, { children: "Target" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 85,
						columnNumber: 19
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, { children: "Type" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 86,
						columnNumber: 19
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 81,
					columnNumber: 17
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 80,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableBody, { children: logs.map((a) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
						className: "text-xs text-muted-foreground",
						children: new Date(a.timestamp).toLocaleString()
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 91,
						columnNumber: 21
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
						className: "font-medium text-sm",
						children: a.userName
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 94,
						columnNumber: 21
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
						className: "text-sm",
						children: a.action
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 95,
						columnNumber: 21
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
						className: "text-xs font-mono text-muted-foreground",
						children: a.targetType ? `${a.targetType}:${a.targetId.substring(0, 8)}` : "N/A"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 96,
						columnNumber: 21
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
						variant: "outline",
						className: `${typeColor[a.type] || ""} capitalize text-[10px]`,
						children: a.type.replace("_", " ")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 100,
						columnNumber: 23
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 99,
						columnNumber: 21
					}, this)
				] }, a.id, true, {
					fileName: _jsxFileName,
					lineNumber: 90,
					columnNumber: 39
				}, this)) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 89,
					columnNumber: 15
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 79,
					columnNumber: 22
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 76,
				columnNumber: 9
			}, this),
			!isLoading && pages > 1 && /* @__PURE__ */ (void 0)(Pagination, {
				className: "mt-4",
				children: /* @__PURE__ */ (void 0)(PaginationContent, { children: [
					/* @__PURE__ */ (void 0)(PaginationItem, { children: /* @__PURE__ */ (void 0)(PaginationPrevious, {
						onClick: () => setPage((p) => Math.max(1, p - 1)),
						className: page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 112,
						columnNumber: 17
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 111,
						columnNumber: 15
					}, this),
					Array.from({ length: pages }).map((_, i) => /* @__PURE__ */ (void 0)(PaginationItem, { children: /* @__PURE__ */ (void 0)(PaginationLink, {
						isActive: page === i + 1,
						onClick: () => setPage(i + 1),
						className: "cursor-pointer",
						children: i + 1
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 117,
						columnNumber: 19
					}, this) }, i, false, {
						fileName: _jsxFileName,
						lineNumber: 116,
						columnNumber: 28
					}, this)),
					/* @__PURE__ */ (void 0)(PaginationItem, { children: /* @__PURE__ */ (void 0)(PaginationNext, {
						onClick: () => setPage((p) => Math.min(pages, p + 1)),
						className: page === pages ? "pointer-events-none opacity-50" : "cursor-pointer"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 122,
						columnNumber: 17
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 121,
						columnNumber: 15
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 110,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 109,
				columnNumber: 37
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 48,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 46,
		columnNumber: 10
	}, this);
}
//#endregion
export { Audit as component };
