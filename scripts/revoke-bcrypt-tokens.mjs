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
  console.log("Connecting to DB and revoking bcrypt refresh tokens...");
  const result = await sql`
    UPDATE refresh_tokens 
    SET revoked = true 
    WHERE token_hash LIKE '$2a$%' OR token_hash LIKE '$2b$%'
  `;
  console.log(`✅ Successfully revoked bcrypt refresh tokens. Count: ${result.count}`);
} catch (err) {
  console.error("❌ Failed to revoke bcrypt refresh tokens:", err);
} finally {
  await sql.end();
}
