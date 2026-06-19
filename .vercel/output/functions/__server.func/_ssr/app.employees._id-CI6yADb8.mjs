import { P as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as getEmployeeById } from "./employees.functions-DNhepElv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.employees._id-CI6yADb8.js
var $$splitNotFoundComponentImporter = () => import("./app2.employees._id-DXHxYEG2.mjs");
var $$splitComponentImporter = () => import("./app.employees._id-CUVMLd3p.mjs");
var Route = createFileRoute("/app/employees/$id")({
	loader: async ({ params }) => {
		try {
			return { employee: await getEmployeeById({ data: { id: params.id } }) };
		} catch (err) {
			console.error("Employee loader error:", err);
			throw notFound();
		}
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
