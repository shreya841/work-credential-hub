export type Role = "super_admin" | "company_admin" | "hr" | "employee";

export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  verified: boolean;
  logo: string;
  website: string;
  employees: number;
}

export interface Employee {
  id: string;
  employeeId: string;
  fullName: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  skills: string[];
  joiningDate: string;
  exitDate?: string;
  experience: number;
  status: "active" | "on_leave" | "exited";
  photo: string;
  companyId: string;
  verified: boolean;
  rating: number;
  consentEnabled: boolean;
  approvedCompanies: string[];
}

export interface Review {
  id: string;
  employeeId: string;
  date: string;
  productivity: number;
  teamwork: number;
  communication: number;
  attendance: number;
  leadership: number;
  overall: number;
  feedback: string;
  reviewer: string;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  target: string;
  type: "update" | "login" | "access" | "create" | "delete";
}

export const companies: Company[] = [
  { id: "c1", name: "Acme Technologies", industry: "Software", size: "500-1000", location: "San Francisco, CA", verified: true, logo: "AT", website: "acme.tech", employees: 642 },
  { id: "c2", name: "Northwind Logistics", industry: "Logistics", size: "1000+", location: "Chicago, IL", verified: true, logo: "NL", website: "northwind.co", employees: 1280 },
  { id: "c3", name: "Lumen Health", industry: "Healthcare", size: "200-500", location: "Boston, MA", verified: true, logo: "LH", website: "lumen.health", employees: 318 },
  { id: "c4", name: "Vega Finance", industry: "FinTech", size: "100-200", location: "New York, NY", verified: false, logo: "VF", website: "vega.fin", employees: 156 },
  { id: "c5", name: "Orbit Studios", industry: "Design", size: "50-100", location: "Austin, TX", verified: true, logo: "OS", website: "orbit.studio", employees: 72 },
];

const skills = ["React", "TypeScript", "Python", "AWS", "Leadership", "Product Strategy", "SQL", "Figma", "GoLang", "Kubernetes", "Communication", "Agile", "Data Analysis", "Sales"];
const departments = ["Engineering", "Product", "Design", "Sales", "Marketing", "HR", "Finance", "Operations"];
const designations = ["Senior Engineer", "Engineering Manager", "Product Manager", "Designer", "Sales Lead", "Marketing Specialist", "HR Partner", "Finance Analyst", "Director", "VP"];

const firstNames = ["Aiden", "Maya", "Rohan", "Priya", "Sara", "Liam", "Noah", "Olivia", "Ethan", "Ava", "Lucas", "Emma", "Kavya", "Arjun", "Zara", "Ravi", "Diya", "Vikram", "Lina", "Marcus"];
const lastNames = ["Patel", "Sharma", "Cohen", "Garcia", "Smith", "Chen", "Müller", "Khan", "Okafor", "Singh", "Nakamura", "Brown", "Reyes", "Iqbal", "Murphy"];

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function seed(i: number) { return ((i * 9301 + 49297) % 233280) / 233280; }

export const employees: Employee[] = Array.from({ length: 28 }, (_, i) => {
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[(i * 3) % lastNames.length];
  const name = `${fn} ${ln}`;
  const sk = [skills[i % skills.length], skills[(i + 3) % skills.length], skills[(i + 7) % skills.length]];
  return {
    id: `e${i + 1}`,
    employeeId: `EMP-${1000 + i}`,
    fullName: name,
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}@${companies[i % companies.length].website}`,
    phone: `+1 (555) ${String(100 + i).padStart(3, "0")}-${String(2000 + i * 7).slice(-4)}`,
    designation: designations[i % designations.length],
    department: departments[i % departments.length],
    skills: sk,
    joiningDate: `202${(i % 5)}-0${(i % 9) + 1}-15`,
    exitDate: i % 7 === 0 ? `2024-0${(i % 6) + 1}-20` : undefined,
    experience: 2 + (i % 12),
    status: i % 7 === 0 ? "exited" : i % 11 === 0 ? "on_leave" : "active",
    photo: `https://i.pravatar.cc/120?img=${(i % 70) + 1}`,
    companyId: companies[i % companies.length].id,
    verified: i % 4 !== 0,
    rating: 3 + Math.round(seed(i) * 20) / 10,
    consentEnabled: i % 3 !== 0,
    approvedCompanies: i % 2 === 0 ? ["c1", "c3"] : ["c2"],
  };
});

export const reviews: Review[] = employees.flatMap((e, idx) =>
  Array.from({ length: 3 }, (_, j) => {
    const base = 3 + ((idx + j) % 3) * 0.5;
    const r = (off: number) => Math.min(5, Math.max(1, Math.round((base + ((idx * 7 + j * 3 + off) % 5) * 0.3) * 10) / 10));
    const productivity = r(1), teamwork = r(2), communication = r(3), attendance = r(4), leadership = r(5);
    return {
      id: `r-${e.id}-${j}`,
      employeeId: e.id,
      date: `202${4 - j}-${String(((idx + j) % 12) + 1).padStart(2, "0")}-12`,
      productivity, teamwork, communication, attendance, leadership,
      overall: Math.round(((productivity + teamwork + communication + attendance + leadership) / 5) * 10) / 10,
      feedback: [
        "Consistently delivers high-impact work and mentors juniors with care.",
        "Strong technical contributor; could improve cross-team communication cadence.",
        "Exceptional ownership during the Q3 release. Promoted scope leadership.",
      ][j],
      reviewer: ["Sara Cohen", "Marcus Okafor", "Priya Sharma"][j],
    };
  })
);

export const auditLogs: AuditEntry[] = Array.from({ length: 24 }, (_, i) => ({
  id: `a${i}`,
  timestamp: new Date(Date.now() - i * 3600_000 * 3).toISOString(),
  user: ["admin@acme.tech", "hr@northwind.co", "ceo@lumen.health", "aiden.patel@acme.tech"][i % 4],
  action: ["Updated employee record", "Logged in", "Viewed employee profile", "Created performance review", "Exported employee data"][i % 5],
  target: employees[i % employees.length].fullName,
  type: (["update", "login", "access", "create", "update"] as const)[i % 5],
}));

export const stats = {
  totalEmployees: employees.length,
  activeEmployees: employees.filter((e) => e.status === "active").length,
  reviews: reviews.length,
  verified: employees.filter((e) => e.verified).length,
};
