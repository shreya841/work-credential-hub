import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  integer,
  real,
  timestamp,
  jsonb,
  pgEnum,
  unique,
  index,
} from "drizzle-orm/pg-core";

// ── Enums ───────────────────────────────────────────────────────────

export const roleEnum = pgEnum("role", [
  "super_admin",
  "company_admin",
  "hr",
  "employee",
]);

export const companyStatusEnum = pgEnum("company_status", [
  "pending",
  "approved",
  "rejected",
  "suspended",
  "archived",
  "deleted",
]);

export const employmentStatusEnum = pgEnum("employment_status", [
  "active",
  "on_leave",
  "exited",
]);

export const verificationStatusEnum = pgEnum("verification_status", [
  "pending",
  "approved",
  "denied",
  "expired",
]);

export const auditActionEnum = pgEnum("audit_action", [
  "login",
  "logout",
  "access",
  "create",
  "update",
  "delete",
  "verification_request",
  "consent_change",
]);

// ── Users ───────────────────────────────────────────────────────────

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  role: roleEnum("role").notNull().default("employee"),
  companyId: uuid("company_id").references(() => companies.id, { onDelete: "set null" }),
  avatarUrl: text("avatar_url"),
  status: varchar("status", { length: 50 }).notNull().default("active"),
  loginAttempts: integer("login_attempts").default(0).notNull(),
  lockoutUntil: timestamp("lockout_until"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("idx_users_company_id").on(table.companyId),
  index("idx_users_email").on(table.email),
  index("idx_users_status").on(table.status),
  index("idx_users_created_at").on(table.createdAt),
]);

// ── Companies ───────────────────────────────────────────────────────

export const companies = pgTable("companies", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  industry: varchar("industry", { length: 100 }).notNull(),
  size: varchar("size", { length: 50 }).default(""),
  location: varchar("location", { length: 255 }).default(""),
  website: varchar("website", { length: 255 }).default(""),
  logoUrl: text("logo_url"),
  verified: boolean("verified").default(false).notNull(),
  status: companyStatusEnum("status").default("pending").notNull(),
  employeeCount: integer("employee_count").default(0).notNull(),
  createdById: uuid("created_by_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("idx_companies_status").on(table.status),
  index("idx_companies_created_by_id").on(table.createdById),
  index("idx_companies_created_at").on(table.createdAt),
]);

// ── Employees ───────────────────────────────────────────────────────

export const employees = pgTable(
  "employees",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    employeeId: varchar("employee_id", { length: 50 }).notNull(),
    userId: uuid("user_id").references(() => users.id),
    companyId: uuid("company_id").references(() => companies.id),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }).default(""),
    designation: varchar("designation", { length: 100 }).default(""),
    department: varchar("department", { length: 100 }).default(""),
    skills: jsonb("skills").default([]).notNull(),
    joiningDate: timestamp("joining_date").notNull(),
    exitDate: timestamp("exit_date"),
    experience: integer("experience").default(0).notNull(),
    status: employmentStatusEnum("status").notNull().default("active"),
    photoUrl: text("photo_url"),
    resumeUrl: text("resume_url"),
    certifications: jsonb("certifications").default([]).notNull(),
    portfolioLinks: jsonb("portfolio_links").default([]).notNull(),
    verified: boolean("verified").default(false).notNull(),
    claimStatus: varchar("claim_status", { length: 50 }).default("unclaimed").notNull(),
    rating: real("rating").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    unique("employees_company_id_employee_id_unique").on(table.companyId, table.employeeId),
    index("idx_employees_company_id").on(table.companyId),
    index("idx_employees_user_id").on(table.userId),
    index("idx_employees_employee_id").on(table.employeeId),
    index("idx_employees_email").on(table.email),
    index("idx_employees_status").on(table.status),
    index("idx_employees_created_at").on(table.createdAt),
  ]
);

// ── Performance Reviews ─────────────────────────────────────────────

export const performanceReviews = pgTable("performance_reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  reviewerId: uuid("reviewer_id")
    .references(() => users.id, { onDelete: "set null" }),
  reviewerName: varchar("reviewer_name", { length: 255 }),
  period: varchar("period", { length: 50 }).notNull(),
  productivity: real("productivity").notNull(),
  teamwork: real("teamwork").notNull(),
  communication: real("communication").notNull(),
  leadership: real("leadership").notNull(),
  attendance: real("attendance").notNull(),
  overall: real("overall").notNull(),
  feedback: text("feedback").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("idx_performance_reviews_employee_id").on(table.employeeId),
  index("idx_performance_reviews_reviewer_id").on(table.reviewerId),
  index("idx_performance_reviews_created_at").on(table.createdAt),
]);

// ── Consent Settings ────────────────────────────────────────────────

export const consentSettings = pgTable("consent_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id")
    .notNull()
    .unique()
    .references(() => employees.id, { onDelete: "cascade" }),
  publicVisible: boolean("public_visible").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Consent Grants ──────────────────────────────────────────────────

export const consentGrants = pgTable("consent_grants", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  granted: boolean("granted").default(false).notNull(),
  grantedAt: timestamp("granted_at"),
  revokedAt: timestamp("revoked_at"),
}, (table) => [
  index("idx_consent_grants_employee_id").on(table.employeeId),
  index("idx_consent_grants_company_id").on(table.companyId),
]);

// ── Verification Requests ───────────────────────────────────────────

export const verificationRequests = pgTable("verification_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  requestedById: uuid("requested_by_id").references(() => users.id, { onDelete: "set null" }),
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id, { onDelete: "cascade" }),
  status: verificationStatusEnum("status").notNull().default("pending"),
  requestType: varchar("request_type", { length: 100 }).notNull(),
  responseData: jsonb("response_data"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  resolvedAt: timestamp("resolved_at"),
}, (table) => [
  index("idx_verification_requests_employee_id").on(table.employeeId),
  index("idx_verification_requests_requested_by_id").on(table.requestedById),
  index("idx_verification_requests_status").on(table.status),
  index("idx_verification_requests_created_at").on(table.createdAt),
]);

// ── Audit Logs ──────────────────────────────────────────────────────

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  action: varchar("action", { length: 255 }).notNull(),
  targetType: varchar("target_type", { length: 100 }).default(""),
  targetId: varchar("target_id", { length: 255 }).default(""),
  metadata: jsonb("metadata"),
  ipAddress: varchar("ip_address", { length: 45 }),
  type: auditActionEnum("type").notNull().default("access"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
}, (table) => [
  index("idx_audit_logs_user_id").on(table.userId),
  index("idx_audit_logs_type").on(table.type),
  index("idx_audit_logs_timestamp").on(table.timestamp),
]);

// ── Refresh Tokens ──────────────────────────────────────────────────

export const refreshTokens = pgTable("refresh_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tokenHash: varchar("token_hash", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  revoked: boolean("revoked").default(false).notNull(),
}, (table) => [
  index("idx_refresh_tokens_user_id").on(table.userId),
]);

// ── Notifications ───────────────────────────────────────────────────

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("idx_notifications_user_id").on(table.userId),
]);

// ── Invitations ─────────────────────────────────────────────────────

export const invitations = pgTable("invitations", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id),
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id),
  status: varchar("status", { length: 50 }).default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("idx_invitations_company_id").on(table.companyId),
  index("idx_invitations_employee_id").on(table.employeeId),
  index("idx_invitations_status").on(table.status),
  index("idx_invitations_created_at").on(table.createdAt),
]);

// ── Employment History ──────────────────────────────────────────────

export const employmentHistory = pgTable("employment_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id),
  companyId: uuid("company_id").references(() => companies.id),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  designation: varchar("designation", { length: 100 }).notNull(),
  department: varchar("department", { length: 100 }),
  joiningDate: timestamp("joining_date").notNull(),
  exitDate: timestamp("exit_date"),
  experience: integer("experience").default(0).notNull(),
  salary: integer("salary"),
  verificationStatus: varchar("verification_status", { length: 50 }).default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("idx_employment_history_employee_id").on(table.employeeId),
  index("idx_employment_history_company_id").on(table.companyId),
  index("idx_employment_history_verification_status").on(table.verificationStatus),
  index("idx_employment_history_created_at").on(table.createdAt),
]);
