import { o as __toESM } from "../_runtime.mjs";
import { n as drizzle, r as src_default } from "../_libs/drizzle-orm+postgres.mjs";
import { p as schema_exports } from "./schema-BhmjnuI8.mjs";
import { t as require_main } from "../_libs/dotenv.mjs";
(/* @__PURE__ */ __toESM(require_main())).config();
var db = null;
function getDb() {
	if (!db) {
		const connectionString = process.env.DATABASE_URL;
		if (!connectionString) throw new Error("DATABASE_URL environment variable is not set. Please configure your database connection.");
		db = drizzle(src_default(connectionString, {
			ssl: "require",
			max: 10,
			idle_timeout: 20,
			connect_timeout: 10
		}), { schema: schema_exports });
	}
	return db;
}
//#endregion
export { getDb };
