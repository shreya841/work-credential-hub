import { readFileSync } from "fs";
import postgres from "postgres";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env") });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL not found in .env");
  process.exit(1);
}

const sql = postgres(connectionString, { ssl: "require", max: 1 });

async function run() {
  console.log("🔍 Checking current DB state...");

  // 1. Check which tables exist
  const tables = await sql`
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  `;
  const tableNames = tables.map((t) => t.tablename);
  console.log("Existing tables:", tableNames.join(", "));

  // 2. Check existing enum values for company_status
  const enumValues = await sql`
    SELECT enumlabel FROM pg_enum
    JOIN pg_type ON pg_enum.enumtypid = pg_type.oid
    WHERE pg_type.typname = 'company_status'
    ORDER BY enumsortorder
  `;
  const existingStatuses = enumValues.map((e) => e.enumlabel);
  console.log("Current company_status enum values:", existingStatuses.join(", "));

  // 3. Add missing enum values for company_status
  const neededStatuses = ["pending", "approved", "rejected", "suspended", "archived", "deleted"];
  for (const status of neededStatuses) {
    if (!existingStatuses.includes(status)) {
      console.log(`Adding enum value '${status}' to company_status...`);
      await sql.unsafe(`ALTER TYPE company_status ADD VALUE IF NOT EXISTS '${status}'`);
    }
  }

  // 4. Create notifications table if missing
  if (!tableNames.includes("notifications")) {
    console.log("Creating notifications table...");
    await sql`
      CREATE TABLE "notifications" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
        "title" varchar(255) NOT NULL,
        "message" text NOT NULL,
        "read" boolean DEFAULT false NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL
      )
    `;
    console.log("✅ notifications table created");
  } else {
    console.log("✓ notifications table already exists");
  }

  // 5. Create employment_history table if missing
  if (!tableNames.includes("employment_history")) {
    console.log("Creating employment_history table...");
    await sql`
      CREATE TABLE "employment_history" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "employee_id" uuid NOT NULL REFERENCES "employees"("id"),
        "company_id" uuid REFERENCES "companies"("id"),
        "company_name" varchar(255) NOT NULL,
        "designation" varchar(100) NOT NULL,
        "department" varchar(100),
        "joining_date" timestamp NOT NULL,
        "exit_date" timestamp,
        "experience" integer DEFAULT 0 NOT NULL,
        "salary" integer,
        "verification_status" varchar(50) DEFAULT 'pending' NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      )
    `;
    console.log("✅ employment_history table created");
  } else {
    console.log("✓ employment_history table already exists");
  }

  // 6. Create invitations table if missing
  if (!tableNames.includes("invitations")) {
    console.log("Creating invitations table...");
    await sql`
      CREATE TABLE "invitations" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "email" varchar(255) NOT NULL UNIQUE,
        "company_id" uuid NOT NULL REFERENCES "companies"("id"),
        "employee_id" uuid NOT NULL REFERENCES "employees"("id"),
        "status" varchar(50) DEFAULT 'pending' NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL
      )
    `;
    console.log("✅ invitations table created");
  } else {
    console.log("✓ invitations table already exists");
  }

  // 7. Add missing columns to employees table if needed
  const empCols = await sql`
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'employees' AND table_schema = 'public'
  `;
  const empColNames = empCols.map((c) => c.column_name);
  console.log("Employee columns:", empColNames.join(", "));

  if (!empColNames.includes("certifications")) {
    console.log("Adding certifications column to employees...");
    await sql`ALTER TABLE employees ADD COLUMN certifications jsonb DEFAULT '[]'::jsonb NOT NULL`;
    console.log("✅ Added certifications column");
  }
  if (!empColNames.includes("portfolio_links")) {
    console.log("Adding portfolio_links column to employees...");
    await sql`ALTER TABLE employees ADD COLUMN portfolio_links jsonb DEFAULT '[]'::jsonb NOT NULL`;
    console.log("✅ Added portfolio_links column");
  }
  if (!empColNames.includes("claim_status")) {
    console.log("Adding claim_status column to employees...");
    await sql`ALTER TABLE employees ADD COLUMN claim_status varchar(50) DEFAULT 'unclaimed' NOT NULL`;
    console.log("✅ Added claim_status column");
  }

  // 8. Add unique constraint on employees (company_id, employee_id) if missing
  const constraints = await sql`
    SELECT constraint_name FROM information_schema.table_constraints
    WHERE table_name = 'employees' AND constraint_type = 'UNIQUE'
    AND table_schema = 'public'
  `;
  const constraintNames = constraints.map((c) => c.constraint_name);
  if (!constraintNames.includes("employees_company_id_employee_id_unique")) {
    console.log("Checking for duplicate (company_id, employee_id) pairs before adding unique constraint...");
    const dupes = await sql`
      SELECT company_id, employee_id, COUNT(*) 
      FROM employees 
      GROUP BY company_id, employee_id 
      HAVING COUNT(*) > 1
    `;
    if (dupes.length > 0) {
      console.log(`Found ${dupes.length} duplicate combinations, skipping unique constraint`);
    } else {
      await sql`ALTER TABLE employees ADD CONSTRAINT employees_company_id_employee_id_unique UNIQUE (company_id, employee_id)`;
      console.log("✅ Added unique constraint on employees (company_id, employee_id)");
    }
  } else {
    console.log("✓ employees unique constraint already exists");
  }

  // 9. Add missing indexes if needed
  const indexes = await sql`
    SELECT indexname FROM pg_indexes WHERE tablename = 'employees' AND schemaname = 'public'
  `;
  const indexNames = indexes.map((i) => i.indexname);
  
  if (!indexNames.includes("idx_employees_email")) {
    await sql`CREATE INDEX idx_employees_email ON employees USING btree (email)`;
    console.log("✅ Added idx_employees_email index");
  }

  // 10. Verify users table is accessible
  console.log("\n🔍 Testing users table query...");
  const userTest = await sql`SELECT COUNT(*) FROM users LIMIT 1`;
  console.log(`✅ users table accessible, row count: ${userTest[0].count}`);

  console.log("\n✅ Migration complete!");
  await sql.end();
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
