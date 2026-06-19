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
import { b as Search, ot as BadgeCheck, r as Users } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as CardContent, t as Card } from "./card-CCXaAbeo.mjs";
import { t as PageHeader } from "./page-header-CDeKwgJG.mjs";
import { r as ListSkeleton } from "./loading-skeleton-BkAGb6P9.mjs";
import { t as EmptyState } from "./empty-state-DmMIw0uj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.search-4N6SmdfF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var searchEmployees = createServerFn({ method: "POST" }).validator(objectType({ query: stringType().min(1, "Search query is required") })).handler(createSsrRpc("dca39a83d994db6d76f1c1be4ee749d7805df76d76072425abb1f563fa26be59"));
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/routes/app.search.tsx?tsr-split=component";
function HrSearch() {
	const { user } = useAuth();
	const isApproved = user.role === "super_admin" || user.companyStatus === "approved";
	const [q, setQ] = (0, import_react.useState)("");
	const [debouncedQuery, setDebouncedQuery] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(q);
		}, 350);
		return () => clearTimeout(handler);
	}, [q]);
	const { data: results = [], isLoading } = useQuery({
		queryKey: ["search-employees", debouncedQuery],
		queryFn: () => searchEmployees({ data: { query: debouncedQuery } }),
		enabled: debouncedQuery.trim().length > 0
	});
	const hasQuery = q.trim().length > 0;
	const hasDebouncedQuery = debouncedQuery.trim().length > 0;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
			title: "HR Search",
			description: "Verify a candidate by name, email, employee ID or skills."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 43,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
			className: "border-border/60 bg-gradient-card",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
				className: "p-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 47,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search by name, email, employee ID, or skills…",
						className: "h-14 pl-12 text-base",
						disabled: !isApproved
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 48,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 46,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: "Searches are logged in the audit trail and only return profiles with active consent."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 50,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 45,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 44,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-6 space-y-3",
			children: [
				!hasQuery && /* @__PURE__ */ (void 0)(Card, {
					className: "border-dashed border-border/60",
					children: /* @__PURE__ */ (void 0)(CardContent, {
						className: "grid place-items-center py-16 text-sm text-muted-foreground",
						children: "Start typing to search verified employee candidates."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 58,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 57,
					columnNumber: 23
				}, this),
				hasQuery && !hasDebouncedQuery && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-3",
					children: /* @__PURE__ */ (void 0)(ListSkeleton, { count: 3 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 64,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 63,
					columnNumber: 44
				}, this),
				hasDebouncedQuery && isLoading && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-3",
					children: /* @__PURE__ */ (void 0)(ListSkeleton, { count: 3 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 68,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 67,
					columnNumber: 44
				}, this),
				hasDebouncedQuery && !isLoading && results.length === 0 && /* @__PURE__ */ (void 0)(EmptyState, {
					icon: Users,
					title: "No matches found",
					description: `We couldn't find any verified employees matching "${debouncedQuery}" with consent granted to your company.`
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 69
				}, this),
				hasDebouncedQuery && !isLoading && results.map((e) => /* @__PURE__ */ (void 0)(Card, {
					className: "border-border/60 transition hover:shadow-elegant",
					children: /* @__PURE__ */ (void 0)(CardContent, {
						className: "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-4",
						children: [
							/* @__PURE__ */ (void 0)(Avatar, {
								className: "h-12 w-12",
								children: [e.photoUrl && /* @__PURE__ */ (void 0)(AvatarImage, {
									src: e.photoUrl,
									alt: e.fullName
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 76,
									columnNumber: 34
								}, this), /* @__PURE__ */ (void 0)(AvatarFallback, { children: e.fullName[0] }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 77,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 75,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "truncate font-semibold",
											children: e.fullName
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 81,
											columnNumber: 21
										}, this), e.verified && /* @__PURE__ */ (void 0)(BadgeCheck, { className: "h-3.5 w-3.5 text-primary shrink-0" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 82,
											columnNumber: 36
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 80,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "truncate text-xs text-muted-foreground",
										children: [
											e.employeeId,
											" · ",
											e.designation,
											" · ",
											e.email
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 84,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "mt-1.5 flex flex-wrap gap-1",
										children: e.skills.map((s) => /* @__PURE__ */ (void 0)(Badge, {
											variant: "outline",
											className: "text-[10px]",
											children: s
										}, s, false, {
											fileName: _jsxFileName,
											lineNumber: 88,
											columnNumber: 40
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 87,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 79,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex shrink-0 flex-col items-end gap-1.5",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "text-sm",
									children: [
										/* @__PURE__ */ (void 0)("span", {
											className: "font-semibold",
											children: e.rating > 0 ? e.rating.toFixed(1) : "N/A"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 95,
											columnNumber: 21
										}, this),
										" ",
										e.rating > 0 && /* @__PURE__ */ (void 0)("span", {
											className: "text-muted-foreground",
											children: "★"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 96,
											columnNumber: 38
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 94,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)(Button, {
									asChild: true,
									size: "sm",
									variant: "outline",
									children: /* @__PURE__ */ (void 0)(Link, {
										to: "/profile/$id",
										params: { id: e.id },
										children: "View profile"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 99,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 98,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 93,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 74,
						columnNumber: 15
					}, this)
				}, e.id, false, {
					fileName: _jsxFileName,
					lineNumber: 73,
					columnNumber: 62
				}, this))
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 56,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 42,
		columnNumber: 10
	}, this);
}
//#endregion
export { HrSearch as component };
