import type { Role } from "../types";

// ── Role Labels ─────────────────────────────────────────────────────

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  company_admin: "Company Admin",
  hr: "HR",
  employee: "Employee",
};

// ── Sidebar Items Per Role ──────────────────────────────────────────

export const SIDEBAR_ITEMS: Record<Role, string[]> = {
  super_admin: ["dashboard", "companies", "audit", "settings"],
  company_admin: [
    "dashboard",
    "companies",
    "employees",
    "performance",
    "search",
    "verification",
    "audit",
  ],
  hr: [
    "dashboard",
    "employees",
    "performance",
    "search",
    "verification",
    "audit",
  ],
  employee: ["dashboard", "consent", "profile", "audit"],
};

// ── Route Access Control ────────────────────────────────────────────

export const ROUTE_ACCESS: Record<string, Role[]> = {
  "/app/dashboard": ["super_admin", "company_admin", "hr", "employee"],
  "/app/companies": ["super_admin", "company_admin"],
  "/app/employees": ["super_admin", "company_admin", "hr"],
  "/app/performance": ["company_admin", "hr"],
  "/app/search": ["company_admin", "hr"],
  "/app/consent": ["employee"],
  "/app/audit": ["super_admin", "company_admin", "hr", "employee"],
  "/app/verification": ["company_admin", "hr"],
  "/app/settings": ["super_admin"],
  "/app/profile": ["employee"],
};

export function canAccessRoute(role: Role, route: string): boolean {
  const allowedRoles = ROUTE_ACCESS[route];
  if (!allowedRoles) return true;
  return allowedRoles.includes(role);
}

// ── Action Permissions ──────────────────────────────────────────────

const ACTION_PERMISSIONS: Record<string, Role[]> = {
  create_company: ["super_admin"],
  edit_company: ["super_admin", "company_admin"],
  create_employee: ["company_admin", "hr"],
  edit_employee: ["company_admin", "hr"],
  delete_employee: ["company_admin"],
  create_review: ["super_admin", "company_admin", "hr"],
  request_verification: ["company_admin", "hr"],
  manage_consent: ["employee"],
  view_audit_logs: ["super_admin", "company_admin", "hr", "employee"],
  manage_users: ["super_admin", "company_admin"],
};

export function canPerformAction(role: Role, action: string): boolean {
  const allowed = ACTION_PERMISSIONS[action];
  if (!allowed) return false;
  return allowed.includes(role);
}
