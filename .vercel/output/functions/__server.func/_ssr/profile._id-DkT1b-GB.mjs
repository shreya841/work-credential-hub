import { P as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-a-evWZ4r.mjs";
import { c as stringType, o as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile._id-DkT1b-GB.js
var $$splitNotFoundComponentImporter = () => import("./profile._id-CQafHMxu.mjs");
var $$splitComponentImporter = () => import("./profile._id-dUAS1UlG.mjs");
var fetchPublicProfile = createServerFn({ method: "GET" }).validator(objectType({ id: stringType().uuid() })).handler(createSsrRpc("5f1330871839ac8ebe579c30af805b841a9848d5232310cd2289a74286ac8342"));
var Route = createFileRoute("/profile/$id")({
	loader: async ({ params }) => {
		try {
			const data = await fetchPublicProfile({ data: { id: params.id } });
			if (!data) throw notFound();
			return { data };
		} catch (err) {
			console.error("Profile loader error:", err);
			throw notFound();
		}
	},
	head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.data?.employee?.fullName || "Employee"} — Verified profile · WorkCred` }, {
		name: "description",
		content: `Verified work history for ${loaderData?.data?.employee?.fullName || "Employee"}.`
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
