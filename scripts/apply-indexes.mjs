import postgres from "postgres";
import * as dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env") });

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const sql = postgres(url, { ssl: "require", max: 1 });

try {
  console.log("Applying indexes...");
  await sql`CREATE INDEX IF NOT EXISTS "idx_companies_created_by_id" ON "companies" USING btree ("created_by_id");`;
  console.log("✅ Index idx_companies_created_by_id created or already exists");

  await sql`CREATE INDEX IF NOT EXISTS "idx_employment_history_verification_status" ON "employment_history" USING btree ("verification_status");`;
  console.log("✅ Index idx_employment_history_verification_status created or already exists");
} catch (err) {
  console.error("Failed to apply indexes:", err);
} finally {
  await sql.end();
}
