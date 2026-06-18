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
} from "drizzle-orm/pg-core";

// ── Enums ───────────────────────────────────────────────────────────

export const roleEnum = pgEnum("role", [
  "super_admin",
  "company_admin",
  "hr",
  "employee",
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
  companyId: uuid("company_id").references(() => companies.id),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

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
  employeeCount: integer("employee_count").default(0).notNull(),
  createdById: uuid("created_by_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Employees ───────────────────────────────────────────────────────

export const employees = pgTable("employees", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: varchar("employee_id", { length: 50 }).notNull().unique(),
  userId: uuid("user_id").references(() => users.id),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id),
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
  verified: boolean("verified").default(false).notNull(),
  rating: real("rating").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Performance Reviews ─────────────────────────────────────────────

export const performanceReviews = pgTable("performance_reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id),
  reviewerId: uuid("reviewer_id")
    .notNull()
    .references(() => users.id),
  period: varchar("period", { length: 50 }).notNull(),
  productivity: real("productivity").notNull(),
  teamwork: real("teamwork").notNull(),
  communication: real("communication").notNull(),
  leadership: real("leadership").notNull(),
  attendance: real("attendance").notNull(),
  overall: real("overall").notNull(),
  feedback: text("feedback").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Consent Settings ────────────────────────────────────────────────

export const consentSettings = pgTable("consent_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id")
    .notNull()
    .unique()
    .references(() => employees.id),
  publicVisible: boolean("public_visible").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Consent Grants ──────────────────────────────────────────────────

export const consentGrants = pgTable("consent_grants", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id),
  granted: boolean("granted").default(false).notNull(),
  grantedAt: timestamp("granted_at"),
  revokedAt: timestamp("revoked_at"),
});

// ── Verification Requests ───────────────────────────────────────────

export const verificationRequests = pgTable("verification_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  requestedById: uuid("requested_by_id")
    .notNull()
    .references(() => users.id),
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id),
  status: verificationStatusEnum("status").notNull().default("pending"),
  requestType: varchar("request_type", { length: 100 }).notNull(),
  responseData: jsonb("response_data"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  resolvedAt: timestamp("resolved_at"),
});

// ── Audit Logs ──────────────────────────────────────────────────────

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  action: varchar("action", { length: 255 }).notNull(),
  targetType: varchar("target_type", { length: 100 }).default(""),
  targetId: varchar("target_id", { length: 255 }).default(""),
  metadata: jsonb("metadata"),
  ipAddress: varchar("ip_address", { length: 45 }),
  type: auditActionEnum("type").notNull().default("access"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// ── Refresh Tokens ──────────────────────────────────────────────────

export const refreshTokens = pgTable("refresh_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  tokenHash: varchar("token_hash", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  revoked: boolean("revoked").default(false).notNull(),
});
