import { j as redirect, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getCurrentUser } from "./auth.functions-7eFT9ROn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-s03e--Ea.js
var $$splitComponentImporter = () => import("./app-8ivBEoTB.mjs");
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
