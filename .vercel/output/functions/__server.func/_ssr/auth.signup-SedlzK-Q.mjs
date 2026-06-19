import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as stringType, o as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.signup-SedlzK-Q.js
var $$splitComponentImporter = () => import("./auth.signup-C1OZW6IF.mjs");
var signupSearchSchema = objectType({
	email: stringType().optional(),
	inviteId: stringType().optional()
});
var Route = createFileRoute("/auth/signup")({
	validateSearch: (search) => signupSearchSchema.parse(search),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
