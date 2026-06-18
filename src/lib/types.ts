// ── Role & Permission Types ─────────────────────────────────────────

export type Role = "super_admin" | "company_admin" | "hr" | "employee";

export type EmploymentStatus = "active" | "on_leave" | "exited";

export type AuditActionType = "login" | "logout" | "access" | "create" | "update" | "delete" | "verification_request" | "consent_change";

export type VerificationStatus = "pending" | "approved" | "denied";

// ── User ────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  companyId: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  companyId: string | null;
  avatarUrl: string | null;
  companyStatus?: "pending" | "approved" | "rejected" | "suspended" | "archived" | "deleted" | null;
}

// ── Company ─────────────────────────────────────────────────────────

export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  logoUrl: string | null;
  verified: boolean;
  status: "pending" | "approved" | "rejected" | "suspended" | "archived" | "deleted";
  employeeCount: number;
  creatorName?: string | null;
  creatorEmail?: string | null;
  createdAt: string;
  updatedAt: string;
}

// ── Employee ────────────────────────────────────────────────────────

export interface Employee {
  id: string;
  employeeId: string;
  userId: string | null;
  companyId: string | null;
  fullName: string;
  email: string;
  phone: string | null;
  designation: string | null;
  department: string | null;
  skills: string[];
  joiningDate: string;
  exitDate: string | null;
  experience: number;
  status: EmploymentStatus;
  photoUrl: string | null;
  resumeUrl: string | null;
  certifications?: string[];
  portfolioLinks?: string[];
  trustScore?: number;
  verified: boolean;
  claimStatus?: "unclaimed" | "claimed";
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeWithCompany extends Employee {
  company: Company | null;
}

// ── Performance Review ──────────────────────────────────────────────

export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewerId: string;
  reviewerName: string;
  period: string;
  productivity: number;
  teamwork: number;
  communication: number;
  leadership: number;
  attendance: number;
  overall: number;
  feedback: string | null;
  createdAt: string;
}

// ── Consent ─────────────────────────────────────────────────────────

export interface ConsentSettings {
  id: string;
  employeeId: string;
  publicVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ConsentGrant {
  id: string;
  employeeId: string;
  companyId: string;
  companyName: string;
  companyIndustry: string;
  companyLocation: string;
  companyLogoUrl: string | null;
  granted: boolean;
  grantedAt: string | null;
  revokedAt: string | null;
}

// ── Verification ────────────────────────────────────────────────────

export interface VerificationRequest {
  id: string;
  requestedById: string;
  requestedByName: string;
  requestedByCompany: string;
  employeeId: string;
  employeeName: string;
  status: VerificationStatus;
  requestType: string;
  responseData: any;
  createdAt: string;
  resolvedAt: string | null;
}

// ── Audit Log ───────────────────────────────────────────────────────

export interface AuditEntry {
  id: string;
  userId: string | null;
  userName: string;
  action: string;
  targetType: string | null;
  targetId: string | null;
  metadata: any;
  ipAddress: string | null;
  timestamp: string;
  type: AuditActionType;
}

// ── Dashboard ───────────────────────────────────────────────────────

export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  totalReviews: number;
  verifiedEmployees: number;
}

export interface HiringTrendPoint {
  month: string;
  hires: number;
  exits: number;
}

export interface RatingDistPoint {
  rating: string;
  count: number;
}

export interface DepartmentAnalyticsPoint {
  department: string;
  total: number;
  verified: number;
}

export interface VerificationStatsPoint {
  status: "pending" | "approved" | "denied";
  count: number;
}

// ── Pagination ──────────────────────────────────────────────────────

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  search?: string;
}
