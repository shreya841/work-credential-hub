import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as stringType, o as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.reset-X8ZSYJkz.js
var $$splitComponentImporter = () => import("./auth.reset-BfNgz5km.mjs");
var searchSchema = objectType({
	token: stringType().catch(""),
	userId: stringType().catch("")
});
var Route = createFileRoute("/auth/reset")({
	validateSearch: searchSchema,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
