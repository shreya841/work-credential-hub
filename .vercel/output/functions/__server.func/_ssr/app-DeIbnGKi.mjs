import { j as redirect, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getCurrentUser } from "./auth.functions-D6X1b0I_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-DeIbnGKi.js
var $$splitComponentImporter = () => import("./app-CtDYD2H9.mjs");
var Route = createFileRoute("/app")({
	beforeLoad: async ({ location, context }) => {
		if (location.pathname === "/app" || location.pathname === "/app/") throw redirect({ to: "/app/dashboard" });
		const { queryClient } = context;
		const { user } = await queryClient.ensureQueryData({
			queryKey: ["current-user"],
			queryFn: () => getCurrentUser()
		});
		if (!user) throw redirect({ to: "/auth/login" });
		return { user };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
