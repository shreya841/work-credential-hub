import postgres from "postgres";
import * as dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env") });

const url = process.env.DATABASE_URL;
console.log("Connecting to DB...");

const sql = postgres(url, { ssl: "require", max: 1 });

try {
  // Test login query
  const result = await sql`
    SELECT id, email, full_name, role, company_id, status, login_attempts, lockout_until
    FROM users
    WHERE email = ${"shreya.orbitengineering.group@gmail.com"}
    LIMIT 1
  `;
  if (result.length === 0) {
    console.log("❌ User not found in DB: shreya.orbitengineering.group@gmail.com");
    console.log("This means login will return 'Invalid email or password' which is CORRECT behavior.");
    console.log("\nAll users in DB:");
    const all = await sql`SELECT email, role, status FROM users ORDER BY created_at DESC LIMIT 10`;
    for (const u of all) {
      console.log(`  - ${u.email} [${u.role}] status:${u.status}`);
    }
  } else {
    const u = result[0];
    console.log(`✅ User FOUND: ${u.email} [${u.role}] status:${u.status}`);
    if (u.status !== "active") {
      console.log(`⚠️  User status is '${u.status}' - login will fail with suspension error`);
    }
  }
} catch (err) {
  console.error("🔴 Query failed:", err.message);
  console.error("Full error:", err);
} finally {
  await sql.end();
}
