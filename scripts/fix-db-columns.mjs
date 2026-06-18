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
  // Check existing users columns
  const cols = await sql`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'users' AND table_schema = 'public'
    ORDER BY ordinal_position
  `;
  console.log("Current users columns:", cols.map(c => c.column_name).join(", "));

  const colNames = cols.map(c => c.column_name);

  // Add missing columns
  if (!colNames.includes("status")) {
    console.log("Adding 'status' column to users...");
    await sql`ALTER TABLE users ADD COLUMN status varchar(50) NOT NULL DEFAULT 'active'`;
    console.log("✅ Added status column");
  } else {
    console.log("✓ status column already exists");
  }

  if (!colNames.includes("login_attempts")) {
    console.log("Adding 'login_attempts' column to users...");
    await sql`ALTER TABLE users ADD COLUMN login_attempts integer NOT NULL DEFAULT 0`;
    console.log("✅ Added login_attempts column");
  } else {
    console.log("✓ login_attempts column already exists");
  }

  if (!colNames.includes("lockout_until")) {
    console.log("Adding 'lockout_until' column to users...");
    await sql`ALTER TABLE users ADD COLUMN lockout_until timestamp`;
    console.log("✅ Added lockout_until column");
  } else {
    console.log("✓ lockout_until column already exists");
  }

  if (!colNames.includes("avatar_url")) {
    console.log("Adding 'avatar_url' column to users...");
    await sql`ALTER TABLE users ADD COLUMN avatar_url text`;
    console.log("✅ Added avatar_url column");
  } else {
    console.log("✓ avatar_url column already exists");
  }

  // Check companies table for status
  const companyCols = await sql`
    SELECT column_name FROM information_schema.columns 
    WHERE table_name = 'companies' AND table_schema = 'public'
  `;
  const companyColNames = companyCols.map(c => c.column_name);
  console.log("\nCompanies columns:", companyColNames.join(", "));

  // Check if company_status enum has all needed values
  const enumVals = await sql`
    SELECT enumlabel FROM pg_enum
    JOIN pg_type ON pg_enum.enumtypid = pg_type.oid
    WHERE pg_type.typname = 'company_status'
    ORDER BY enumsortorder
  `;
  const statusVals = enumVals.map(e => e.enumlabel);
  console.log("company_status enum values:", statusVals.join(", "));

  // Add any missing enum values
  for (const v of ["pending", "approved", "rejected", "suspended", "archived", "deleted"]) {
    if (!statusVals.includes(v)) {
      console.log(`Adding '${v}' to company_status enum...`);
      await sql.unsafe(`ALTER TYPE company_status ADD VALUE IF NOT EXISTS '${v}'`);
    }
  }

  // Verify the fix by running the login query
  console.log("\n🔍 Testing login query...");
  const result = await sql`
    SELECT id, email, full_name, role, company_id, status, login_attempts, lockout_until
    FROM users 
    WHERE email = ${"shreya.orbitengineering.group@gmail.com"}
    LIMIT 1
  `;
  
  if (result.length === 0) {
    console.log("User not found (email doesn't exist in DB)");
    const allUsers = await sql`SELECT email, role, status FROM users ORDER BY created_at DESC`;
    console.log("\nAll users:");
    for (const u of allUsers) console.log(`  - ${u.email} [${u.role}] status:${u.status}`);
  } else {
    const u = result[0];
    console.log(`✅ Login query works! User: ${u.email} [${u.role}] status:${u.status}`);
  }

  console.log("\n✅ All fixes applied!");
} catch (err) {
  console.error("Error:", err.message);
} finally {
  await sql.end();
}
