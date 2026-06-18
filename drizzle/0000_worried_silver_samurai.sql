CREATE TYPE "public"."audit_action" AS ENUM('login', 'logout', 'access', 'create', 'update', 'delete', 'verification_request', 'consent_change');--> statement-breakpoint
CREATE TYPE "public"."company_status" AS ENUM('pending', 'approved', 'rejected', 'suspended', 'archived', 'deleted');--> statement-breakpoint
CREATE TYPE "public"."employment_status" AS ENUM('active', 'on_leave', 'exited');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('super_admin', 'company_admin', 'hr', 'employee');--> statement-breakpoint
CREATE TYPE "public"."verification_status" AS ENUM('pending', 'approved', 'denied', 'expired');--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"action" varchar(255) NOT NULL,
	"target_type" varchar(100) DEFAULT '',
	"target_id" varchar(255) DEFAULT '',
	"metadata" jsonb,
	"ip_address" varchar(45),
	"type" "audit_action" DEFAULT 'access' NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"industry" varchar(100) NOT NULL,
	"size" varchar(50) DEFAULT '',
	"location" varchar(255) DEFAULT '',
	"website" varchar(255) DEFAULT '',
	"logo_url" text,
	"verified" boolean DEFAULT false NOT NULL,
	"status" "company_status" DEFAULT 'pending' NOT NULL,
	"employee_count" integer DEFAULT 0 NOT NULL,
	"created_by_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consent_grants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_id" uuid NOT NULL,
	"company_id" uuid NOT NULL,
	"granted" boolean DEFAULT false NOT NULL,
	"granted_at" timestamp,
	"revoked_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "consent_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_id" uuid NOT NULL,
	"public_visible" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "consent_settings_employee_id_unique" UNIQUE("employee_id")
);
--> statement-breakpoint
CREATE TABLE "employees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_id" varchar(50) NOT NULL,
	"user_id" uuid,
	"company_id" uuid,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50) DEFAULT '',
	"designation" varchar(100) DEFAULT '',
	"department" varchar(100) DEFAULT '',
	"skills" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"joining_date" timestamp NOT NULL,
	"exit_date" timestamp,
	"experience" integer DEFAULT 0 NOT NULL,
	"status" "employment_status" DEFAULT 'active' NOT NULL,
	"photo_url" text,
	"resume_url" text,
	"certifications" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"portfolio_links" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"claim_status" varchar(50) DEFAULT 'unclaimed' NOT NULL,
	"rating" real DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "employees_company_id_employee_id_unique" UNIQUE("company_id","employee_id")
);
--> statement-breakpoint
CREATE TABLE "employment_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_id" uuid NOT NULL,
	"company_id" uuid,
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
);
--> statement-breakpoint
CREATE TABLE "invitations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"company_id" uuid NOT NULL,
	"employee_id" uuid NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "invitations_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "performance_reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_id" uuid NOT NULL,
	"reviewer_id" uuid,
	"reviewer_name" varchar(255),
	"period" varchar(50) NOT NULL,
	"productivity" real NOT NULL,
	"teamwork" real NOT NULL,
	"communication" real NOT NULL,
	"leadership" real NOT NULL,
	"attendance" real NOT NULL,
	"overall" real NOT NULL,
	"feedback" text DEFAULT '',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "refresh_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token_hash" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"revoked" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'employee' NOT NULL,
	"company_id" uuid,
	"avatar_url" text,
	"status" varchar(50) DEFAULT 'active' NOT NULL,
	"login_attempts" integer DEFAULT 0 NOT NULL,
	"lockout_until" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"requested_by_id" uuid,
	"employee_id" uuid NOT NULL,
	"status" "verification_status" DEFAULT 'pending' NOT NULL,
	"request_type" varchar(100) NOT NULL,
	"response_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"resolved_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consent_grants" ADD CONSTRAINT "consent_grants_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consent_grants" ADD CONSTRAINT "consent_grants_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consent_settings" ADD CONSTRAINT "consent_settings_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employment_history" ADD CONSTRAINT "employment_history_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employment_history" ADD CONSTRAINT "employment_history_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "performance_reviews" ADD CONSTRAINT "performance_reviews_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "performance_reviews" ADD CONSTRAINT "performance_reviews_reviewer_id_users_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verification_requests" ADD CONSTRAINT "verification_requests_requested_by_id_users_id_fk" FOREIGN KEY ("requested_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verification_requests" ADD CONSTRAINT "verification_requests_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_audit_logs_user_id" ON "audit_logs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_audit_logs_type" ON "audit_logs" USING btree ("type");--> statement-breakpoint
CREATE INDEX "idx_audit_logs_timestamp" ON "audit_logs" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX "idx_companies_status" ON "companies" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_companies_created_at" ON "companies" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_consent_grants_employee_id" ON "consent_grants" USING btree ("employee_id");--> statement-breakpoint
CREATE INDEX "idx_consent_grants_company_id" ON "consent_grants" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "idx_employees_company_id" ON "employees" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "idx_employees_user_id" ON "employees" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_employees_employee_id" ON "employees" USING btree ("employee_id");--> statement-breakpoint
CREATE INDEX "idx_employees_email" ON "employees" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_employees_status" ON "employees" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_employees_created_at" ON "employees" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_employment_history_employee_id" ON "employment_history" USING btree ("employee_id");--> statement-breakpoint
CREATE INDEX "idx_employment_history_company_id" ON "employment_history" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "idx_employment_history_created_at" ON "employment_history" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_invitations_company_id" ON "invitations" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "idx_invitations_employee_id" ON "invitations" USING btree ("employee_id");--> statement-breakpoint
CREATE INDEX "idx_invitations_created_at" ON "invitations" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_performance_reviews_employee_id" ON "performance_reviews" USING btree ("employee_id");--> statement-breakpoint
CREATE INDEX "idx_performance_reviews_reviewer_id" ON "performance_reviews" USING btree ("reviewer_id");--> statement-breakpoint
CREATE INDEX "idx_performance_reviews_created_at" ON "performance_reviews" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_refresh_tokens_user_id" ON "refresh_tokens" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_users_company_id" ON "users" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "idx_users_email" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_users_created_at" ON "users" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_verification_requests_employee_id" ON "verification_requests" USING btree ("employee_id");--> statement-breakpoint
CREATE INDEX "idx_verification_requests_requested_by_id" ON "verification_requests" USING btree ("requested_by_id");--> statement-breakpoint
CREATE INDEX "idx_verification_requests_status" ON "verification_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_verification_requests_created_at" ON "verification_requests" USING btree ("created_at");