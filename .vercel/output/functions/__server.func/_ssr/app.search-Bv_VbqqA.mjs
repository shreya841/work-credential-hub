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
import { b as Search, ot as BadgeCheck, r as Users } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as CardContent, t as Card } from "./card-DRtcuf8H.mjs";
import { t as PageHeader } from "./page-header-DHJUr0Vr.mjs";
import { r as ListSkeleton } from "./loading-skeleton-BKYH7Wpk.mjs";
import { t as EmptyState } from "./empty-state-B-onYlus.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.search-Bv_VbqqA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var searchEmployees = createServerFn({ method: "POST" }).validator(objectType({ query: stringType().min(1, "Search query is required") })).handler(createSsrRpc("dca39a83d994db6d76f1c1be4ee749d7805df76d76072425abb1f563fa26be59"));
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "HR Search",
			description: "Verify a candidate by name, email, employee ID or skills."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "border-border/60 bg-gradient-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search by name, email, employee ID, or skills…",
						className: "h-14 pl-12 text-base",
						disabled: !isApproved
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: "Searches are logged in the audit trail and only return profiles with active consent."
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 space-y-3",
			children: [
				!hasQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-dashed border-border/60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "grid place-items-center py-16 text-sm text-muted-foreground",
						children: "Start typing to search verified employee candidates."
					})
				}),
				hasQuery && !hasDebouncedQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 3 })
				}),
				hasDebouncedQuery && isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 3 })
				}),
				hasDebouncedQuery && !isLoading && results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: Users,
					title: "No matches found",
					description: `We couldn't find any verified employees matching "${debouncedQuery}" with consent granted to your company.`
				}),
				hasDebouncedQuery && !isLoading && results.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-border/60 transition hover:shadow-elegant",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-12 w-12",
								children: [e.photoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
									src: e.photoUrl,
									alt: e.fullName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: e.fullName[0] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate font-semibold",
											children: e.fullName
										}), e.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-3.5 w-3.5 text-primary shrink-0" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "truncate text-xs text-muted-foreground",
										children: [
											e.employeeId,
											" · ",
											e.designation,
											" · ",
											e.email
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1.5 flex flex-wrap gap-1",
										children: e.skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: "text-[10px]",
											children: s
										}, s))
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex shrink-0 flex-col items-end gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: e.rating > 0 ? e.rating.toFixed(1) : "N/A"
										}),
										" ",
										e.rating > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "★"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "sm",
									variant: "outline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/profile/$id",
										params: { id: e.id },
										children: "View profile"
									})
								})]
							})
						]
					})
				}, e.id))
			]
		})
	] });
}
//#endregion
export { HrSearch as component };
