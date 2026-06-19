import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as ThemeProvider } from "./theme-provider-Oa6rMQBg.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$16 } from "./app-DeIbnGKi.mjs";
import { a as dehydrate, o as hydrate, t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$17 } from "./app.employees._id-C0mnTRA8.mjs";
import { t as Route$18 } from "./auth.reset-X8ZSYJkz.mjs";
import { t as Route$19 } from "./auth.signup-6gPndGa-.mjs";
import { t as Route$20 } from "./profile._id-DkT1b-GB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CguUKfto.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Ci094L6L.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-gradient font-display text-7xl font-bold",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
					children: "Go home"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong. Try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$15 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "WorkCred — Verified Employee Reputation Platform" },
			{
				name: "description",
				content: "WorkCred is the trusted reputation and verification platform for HR teams to share, view and verify employee histories with consent."
			},
			{
				property: "og:title",
				content: "WorkCred — Verified Employee Reputation Platform"
			},
			{
				property: "og:description",
				content: "Trusted verification & reputation platform for modern HR teams."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$15.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})] })
	});
}
var $$splitComponentImporter$14 = () => import("./auth-ARCyGqfl.mjs");
var Route$14 = createFileRoute("/auth")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./routes-C5UshGOU.mjs");
var Route$13 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "WorkCred - Verify talent. Build trust. Hire smarter." }, {
		name: "description",
		content: "WorkCred helps companies verify employee histories with consent-first workflows, trusted records, and faster hiring decisions."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./auth.login-DF0XKXRY.mjs");
var Route$12 = createFileRoute("/auth/login")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./auth.forgot-CQgKFl0V.mjs");
var Route$11 = createFileRoute("/auth/forgot")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./app.verification-BwVq9e1L.mjs");
var Route$10 = createFileRoute("/app/verification")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./app.settings-DfFG2IDA.mjs");
var Route$9 = createFileRoute("/app/settings")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./app.search-Bv_VbqqA.mjs");
var Route$8 = createFileRoute("/app/search")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./app.profile-B3rCF533.mjs");
var Route$7 = createFileRoute("/app/profile")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./app.performance-BIY5frhC.mjs");
var Route$6 = createFileRoute("/app/performance")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./app.employees-DfkcEA-h.mjs");
var Route$5 = createFileRoute("/app/employees")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./app.dashboard-t-FcAAXN.mjs");
var Route$4 = createFileRoute("/app/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./app.consent-CAy3t-Kx.mjs");
var Route$3 = createFileRoute("/app/consent")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./app.companies-DHPS7Fpc.mjs");
var Route$2 = createFileRoute("/app/companies")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./app.audit-BsLKVqoI.mjs");
var Route$1 = createFileRoute("/app/audit")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./app.employees.index-BWbeppvH.mjs");
var Route = createFileRoute("/app/employees/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var AuthRoute = Route$14.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$15
});
var AppRoute = Route$16.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => Route$15
});
var IndexRoute = Route$13.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$15
});
var ProfileIdRoute = Route$20.update({
	id: "/profile/$id",
	path: "/profile/$id",
	getParentRoute: () => Route$15
});
var AuthSignupRoute = Route$19.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => AuthRoute
});
var AuthResetRoute = Route$18.update({
	id: "/reset",
	path: "/reset",
	getParentRoute: () => AuthRoute
});
var AuthLoginRoute = Route$12.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => AuthRoute
});
var AuthForgotRoute = Route$11.update({
	id: "/forgot",
	path: "/forgot",
	getParentRoute: () => AuthRoute
});
var AppVerificationRoute = Route$10.update({
	id: "/verification",
	path: "/verification",
	getParentRoute: () => AppRoute
});
var AppSettingsRoute = Route$9.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var AppSearchRoute = Route$8.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => AppRoute
});
var AppProfileRoute = Route$7.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AppRoute
});
var AppPerformanceRoute = Route$6.update({
	id: "/performance",
	path: "/performance",
	getParentRoute: () => AppRoute
});
var AppEmployeesRoute = Route$5.update({
	id: "/employees",
	path: "/employees",
	getParentRoute: () => AppRoute
});
var AppDashboardRoute = Route$4.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AppRoute
});
var AppConsentRoute = Route$3.update({
	id: "/consent",
	path: "/consent",
	getParentRoute: () => AppRoute
});
var AppCompaniesRoute = Route$2.update({
	id: "/companies",
	path: "/companies",
	getParentRoute: () => AppRoute
});
var AppAuditRoute = Route$1.update({
	id: "/audit",
	path: "/audit",
	getParentRoute: () => AppRoute
});
var AppEmployeesIndexRoute = Route.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppEmployeesRoute
});
var AppEmployeesRouteChildren = {
	AppEmployeesIdRoute: Route$17.update({
		id: "/$id",
		path: "/$id",
		getParentRoute: () => AppEmployeesRoute
	}),
	AppEmployeesIndexRoute
};
var AppRouteChildren = {
	AppAuditRoute,
	AppCompaniesRoute,
	AppConsentRoute,
	AppDashboardRoute,
	AppEmployeesRoute: AppEmployeesRoute._addFileChildren(AppEmployeesRouteChildren),
	AppPerformanceRoute,
	AppProfileRoute,
	AppSearchRoute,
	AppSettingsRoute,
	AppVerificationRoute
};
var AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
var AuthRouteChildren = {
	AuthForgotRoute,
	AuthLoginRoute,
	AuthResetRoute,
	AuthSignupRoute
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRouteWithChildren,
	AuthRoute: AuthRoute._addFileChildren(AuthRouteChildren),
	ProfileIdRoute
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient({ defaultOptions: { queries: {
		staleTime: 1e3 * 60 * 5,
		gcTime: 1e3 * 60 * 10,
		refetchOnWindowFocus: false,
		retry: 1
	} } });
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 1e3 * 60 * 5,
		dehydrate: () => {
			return { dehydratedState: dehydrate(queryClient) };
		},
		hydrate: (state) => {
			if (state.dehydratedState) hydrate(queryClient, state.dehydratedState);
		}
	});
};
//#endregion
export { getRouter };
