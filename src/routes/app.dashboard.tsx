import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useMemo, useRef, useState, lazy, Suspense } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Users,
  UserCheck,
  TrendingUp,
  BadgeCheck,
  ArrowUpRight,
  Clock,
  Building2,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Plus,
  X,
  Briefcase,
  Calendar,
  DollarSign,
  Sparkles,
  ExternalLink,
  FileText,
  Mail,
  Phone,
  Activity,
  Star,
  Zap,
  UserPlus,
  CheckCircle2,
  RefreshCw,
  Globe,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label as FormLabel } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/components/auth-provider";
import {
  StatCardSkeleton,
  ChartSkeleton,
  ListSkeleton,
} from "@/components/loading-skeleton";
import { EmptyState } from "@/components/empty-state";

const DashboardCharts = lazy(() => import("@/components/dashboard-charts-lazy"));
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2, Archive, Ban, Check } from "lucide-react";

// API imports
import {
  getDashboardStats,
  getDepartmentAnalytics,
  getHiringTrend,
  getRatingDistribution,
  getRecentEmployees,
  getRecentActivity,
  getVerificationStatistics,
  seedCompanyDemoData,
  getDashboardData,
} from "@/lib/api/dashboard.functions";
import {
  listCompanies,
  updateCompany,
  getCompanyById,
  deleteCompany,
  getCompanyDeleteImpact,
} from "@/lib/api/companies.functions";
import {
  getEmployeeByUserId,
  getEmploymentHistory,
  addEmploymentHistory,
} from "@/lib/api/employees.functions";
import {
  listVerificationRequests,
  resolveVerificationRequest,
} from "@/lib/api/verification.functions";
import { listReviews } from "@/lib/api/performance.functions";


// ── Radial gauge color palette (matches crime-stats reference image) ─
const RADIAL_PALETTE = [
  "#00C2FF", // electric cyan (primary)
  "#EE2439", // vivid red
  "#911A79", // deep purple
  "#40C1C0", // teal
  "#F69336", // orange
];

// ── Mini spark bar (SVG) ─────────────────────────────────────────────
function MiniSparkBar({ values, color }: { values: number[]; color: string }) {
  if (!values || values.length === 0) return null;
  const max = Math.max(...values, 1);
  const W = 80;
  const H = 28;
  const gap = 2;
  const barW = Math.max((W - gap * (values.length - 1)) / values.length, 2);
  return (
    <svg width={W} height={H} className="mx-auto mt-1">
      {values.map((v, i) => {
        const bH = Math.max((v / max) * (H - 4), 2);
        const x = i * (barW + gap);
        const y = H - bH;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={bH}
            fill={color}
            fillOpacity={0.75}
            rx={1.5}
          />
        );
      })}
      {/* x-axis line */}
      <line x1={0} y1={H} x2={W} y2={H} stroke={color} strokeOpacity={0.25} strokeWidth={1} />
    </svg>
  );
}

// ── Radial Gauge Card ────────────────────────────────────────────────
function RadialGaugeCard({
  label,
  value,
  total,
  color,
  sparkValues,
  isLoading = false,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
  sparkValues: number[];
  isLoading?: boolean;
}) {
  const pct = total > 0 ? Math.min((value / total) * 100, 100) : 0;
  const r = 40;
  const cx = 52;
  const cy = 54;
  const MAX_DEG = 270;
  const START_DEG = 135;
  const toRad = (d: number) => (d * Math.PI) / 180;

  const arc = (startD: number, endD: number) => {
    const s = { x: cx + r * Math.cos(toRad(startD)), y: cy + r * Math.sin(toRad(startD)) };
    const e = { x: cx + r * Math.cos(toRad(endD)), y: cy + r * Math.sin(toRad(endD)) };
    const largeArc = endD - startD > 180 ? 1 : 0;
    return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
  };

  const totalArcLen = (MAX_DEG / 360) * 2 * Math.PI * r;
  const fillLen = (pct / 100) * totalArcLen;
  const trackPath = arc(START_DEG, START_DEG + MAX_DEG);
  const fillPath = arc(START_DEG, START_DEG + (pct / 100) * MAX_DEG);

  const displayVal = value >= 1000 ? `${(value / 1000).toFixed(0)}k` : `${value}`;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="h-28 w-28 rounded-full bg-muted animate-pulse" />
        <div className="h-3 w-20 rounded bg-muted animate-pulse" />
        <div className="h-7 w-20 rounded bg-muted animate-pulse" />
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className="group flex flex-col items-center gap-1 cursor-default"
    >
      {/* Radial SVG */}
      <div className="relative">
        {/* Glow on hover */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500"
          style={{ backgroundColor: color }}
        />
        <svg width="104" height="110" viewBox="0 0 104 110">
          {/* Track arc */}
          <path
            d={trackPath}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.1}
            strokeWidth="7"
            strokeLinecap="round"
            className="text-foreground"
          />
          {/* Animated fill arc */}
          <motion.path
            d={fillPath}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${totalArcLen}` }}
            animate={{ strokeDasharray: `${fillLen} ${totalArcLen}` }}
            transition={{ duration: 1.3, ease: "easeOut", delay: 0.2 }}
          />
          {/* Center value */}
          <text
            x={cx}
            y={cy - 6}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={color}
            style={{ fontSize: 18, fontWeight: 700, fontFamily: "Space Grotesk" }}
          >
            {displayVal}
          </text>
          {/* Percentage below */}
          <text
            x={cx}
            y={cy + 12}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: 9, fontFamily: "Inter" }}
            className="fill-muted-foreground"
          >
            {total > 0 ? `${pct.toFixed(0)}%` : "—"}
          </text>
        </svg>
      </div>

      {/* Label */}
      <p className="text-[11px] font-semibold text-center text-muted-foreground leading-tight px-1">
        {label}
      </p>

      {/* Mini sparkline */}
      <MiniSparkBar values={sparkValues} color={color} />
    </motion.div>
  );
}

// ── Animation variants ───────────────────────────────────────────────
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const fadeSlideUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};
const fadeSlideLeft = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

// ── Activity feed helper ─────────────────────────────────────────────
function getActivityMeta(type: string, action: string) {
  const t = (type ?? "").toLowerCase();
  const a = (action ?? "").toLowerCase();
  if (t === "employee" || a.includes("employee"))
    return { icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" };
  if (t === "verification" || a.includes("verif"))
    return { icon: ShieldCheck, color: "text-violet-500", bg: "bg-violet-500/10" };
  if (t === "company" || a.includes("compan"))
    return { icon: Building2, color: "text-orange-500", bg: "bg-orange-500/10" };
  if (t === "performance" || a.includes("review") || a.includes("rating"))
    return { icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" };
  if (a.includes("creat") || a.includes("add") || a.includes("register"))
    return { icon: UserPlus, color: "text-emerald-500", bg: "bg-emerald-500/10" };
  return { icon: Activity, color: "text-primary", bg: "bg-primary/10" };
}

export const Route = createFileRoute("/app/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();
  if (user?.role === "super_admin") return <SuperAdminDashboard />;
  if (user?.role === "company_admin" || user?.role === "hr") return <HrDashboard />;
  return <EmployeeDashboard />;
}

// ─────────────────────────────────────────────────────────────────────
// ── SUPER ADMIN DASHBOARD ────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────

function SuperAdminDashboard() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  const { data: companiesData, isLoading } = useQuery({
    queryKey: ["super-companies", search],
    queryFn: () => listCompanies({ data: { page: 1, pageSize: 100, search } }),
  });

  const companies = companiesData?.data || [];
  const totalCompanies = companies.length;
  const pendingCompanies = companies.filter((c) => c.status === "pending").length;
  const verifiedCompanies = companies.filter((c) => c.status === "approved").length;
  const suspendedCompanies = companies.filter((c) => c.status === "suspended" || c.status === "rejected").length;

  const verifyMutation = useMutation({
    mutationFn: (id: string) =>
      updateCompany({ data: { id, status: "approved", verified: true } }),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["super-companies", search] });
      const previousCompanies = queryClient.getQueryData(["super-companies", search]);
      queryClient.setQueryData(["super-companies", search], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((c: any) =>
            c.id === id ? { ...c, status: "approved", verified: true } : c
          ),
        };
      });
      return { previousCompanies };
    },
    onError: (err: any, id, context: any) => {
      if (context?.previousCompanies) {
        queryClient.setQueryData(["super-companies", search], context.previousCompanies);
      }
      toast.error(err.message || "Failed to approve company");
    },
    onSuccess: () => {
      toast.success("Company approved successfully");
      setSelectedCompany(null);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["super-companies"] });
    },
  });

  const suspendMutation = useMutation({
    mutationFn: (id: string) =>
      updateCompany({ data: { id, status: "suspended", verified: false } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-companies"] });
      toast.success("Company suspended");
      setSelectedCompany(null);
    },
    onError: (err: any) => toast.error(err.message || "Failed to suspend company"),
  });

  const rejectMutation = useMutation({
    mutationFn: (id: string) =>
      updateCompany({ data: { id, status: "rejected", verified: false } }),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["super-companies", search] });
      const previousCompanies = queryClient.getQueryData(["super-companies", search]);
      queryClient.setQueryData(["super-companies", search], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((c: any) =>
            c.id === id ? { ...c, status: "rejected", verified: false } : c
          ),
        };
      });
      return { previousCompanies };
    },
    onError: (err: any, id, context: any) => {
      if (context?.previousCompanies) {
        queryClient.setQueryData(["super-companies", search], context.previousCompanies);
      }
      toast.error(err.message || "Failed to reject company");
    },
    onSuccess: () => {
      toast.success("Company registration rejected");
      setSelectedCompany(null);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["super-companies"] });
    },
  });

  const archiveMutation = useMutation({
    mutationFn: (id: string) =>
      updateCompany({ data: { id, status: "archived", verified: false } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-companies"] });
      toast.success("Company archived successfully");
      setSelectedCompany(null);
    },
    onError: (err: any) => toast.error(err.message || "Failed to archive company"),
  });

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<any>(null);
  const [confirmNameInput, setConfirmNameInput] = useState("");

  const { data: deleteImpact, isLoading: isLoadingImpact } = useQuery({
    queryKey: ["delete-impact", companyToDelete?.id],
    queryFn: () => getCompanyDeleteImpact({ data: { id: companyToDelete!.id } }),
    enabled: !!companyToDelete?.id,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCompany({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["super-companies"] });
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success("Company deleted successfully");
      setSelectedCompany(null);
      setDeleteConfirmOpen(false);
      setConfirmNameInput("");
    },
    onError: (err: any) => toast.error(err.message || "Failed to delete company"),
  });

  return (
    <div className="space-y-7">
      <PageHeader
        title="Super Admin Controls"
        description="System-wide metrics and company verification requests."
      />

      {/* Premium stat cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {[
          { label: "Total Companies", value: totalCompanies, icon: Building2, tone: "primary" as const },
          { label: "Pending Approval", value: pendingCompanies, icon: Clock, tone: "warning" as const },
          { label: "Verified Companies", value: verifiedCompanies, icon: ShieldCheck, tone: "success" as const },
          { label: "Suspended", value: suspendedCompanies, icon: ShieldAlert, tone: "destructive" as const },
        ].map((card) => (
          <motion.div key={card.label} variants={fadeSlideUp}>
            <StatCard {...card} />
          </motion.div>
        ))}
      </motion.div>

      {/* Company table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="border-border/60 bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Company Registration Requests</CardTitle>
              <CardDescription>Review and verify new company registrations</CardDescription>
            </div>
            <Input
              placeholder="Search companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:max-w-xs"
            />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ListSkeleton count={5} />
            ) : companies.length === 0 ? (
              <EmptyState
                icon={Building2}
                title="No companies found"
                description="No company registrations match your filter criteria."
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-muted-foreground">
                  <thead className="text-xs uppercase bg-muted/50 text-foreground border-b border-border">
                    <tr>
                      <th className="px-4 py-3">Company Details</th>
                      <th className="px-4 py-3">Industry</th>
                      <th className="px-4 py-3">Website</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {companies.map((c, i) => (
                      <motion.tr
                        key={c.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="hover:bg-primary/5 transition-colors group"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border ring-1 ring-border/40">
                              {c.logoUrl && <AvatarImage src={c.logoUrl} />}
                              <AvatarFallback className="font-semibold">{c.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <span className="font-medium text-foreground block">{c.name}</span>
                              <span className="text-xs text-muted-foreground block">{c.location || "No Location"}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">{c.industry}</td>
                        <td className="px-4 py-3">
                          {c.website ? (
                            <a
                              href={c.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline inline-flex items-center gap-1"
                            >
                              Visit <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : "None"}
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant={
                              c.status === "approved"
                                ? "default"
                                : c.status === "pending"
                                ? "outline"
                                : "destructive"
                            }
                            className={
                              c.status === "approved"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/20 capitalize font-medium"
                                : c.status === "rejected"
                                ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border-rose-500/20 capitalize font-medium"
                                : c.status === "suspended"
                                ? "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/10 border-red-500/20 capitalize font-medium"
                                : c.status === "archived"
                                ? "bg-slate-500/10 text-slate-600 dark:text-slate-400 hover:bg-slate-500/10 border-slate-500/20 capitalize font-medium"
                                : c.status === "deleted"
                                ? "bg-red-950/15 text-red-500 dark:text-red-400 hover:bg-red-950/15 border-red-500/30 capitalize font-medium line-through"
                                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 border-amber-500/20 capitalize font-medium"
                            }
                          >
                            {c.status || "Pending"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2 items-center">
                            <Button size="sm" variant="outline" onClick={() => setSelectedCompany(c)}>
                              View Profile
                            </Button>
                            {c.status !== "deleted" && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer">
                                    <span className="sr-only">Open actions</span>
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  
                                  {c.status !== "approved" && (
                                    <DropdownMenuItem
                                      onClick={() => verifyMutation.mutate(c.id)}
                                      className="text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50 dark:focus:bg-emerald-950/20 cursor-pointer"
                                    >
                                      <Check className="mr-2 h-4 w-4" /> Approve
                                    </DropdownMenuItem>
                                  )}
                                  
                                  {c.status !== "rejected" && c.status !== "approved" && (
                                    <DropdownMenuItem
                                      onClick={() => {
                                        if (confirm(`Are you sure you want to reject "${c.name}"?`))
                                          rejectMutation.mutate(c.id);
                                      }}
                                      className="text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/20 cursor-pointer"
                                    >
                                      <Ban className="mr-2 h-4 w-4" /> Reject
                                    </DropdownMenuItem>
                                  )}
                                  
                                  {c.status === "approved" && (
                                    <DropdownMenuItem
                                      onClick={() => suspendMutation.mutate(c.id)}
                                      className="text-amber-600 focus:text-amber-600 focus:bg-amber-50 dark:focus:bg-amber-950/20 cursor-pointer"
                                    >
                                      <AlertTriangle className="mr-2 h-4 w-4" /> Suspend
                                    </DropdownMenuItem>
                                  )}
                                  
                                  {c.status !== "archived" && (
                                    <DropdownMenuItem
                                      onClick={() => archiveMutation.mutate(c.id)}
                                      className="text-slate-600 focus:text-slate-600 focus:bg-slate-50 dark:focus:bg-slate-950/20 cursor-pointer"
                                    >
                                      <Archive className="mr-2 h-4 w-4" /> Archive
                                    </DropdownMenuItem>
                                  )}
                                  
                                  <DropdownMenuSeparator />
                                  
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setCompanyToDelete(c);
                                      setDeleteConfirmOpen(true);
                                      setConfirmNameInput("");
                                    }}
                                    className="text-rose-600 font-semibold focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/20 cursor-pointer"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete Company
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {selectedCompany && (
        <Dialog open={!!selectedCompany} onOpenChange={(open) => !open && setSelectedCompany(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Company General Profile</DialogTitle>
              <DialogDescription>General overview details of the registered company.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4 border-b pb-4">
                <Avatar className="h-16 w-16 border">
                  {selectedCompany.logoUrl && <AvatarImage src={selectedCompany.logoUrl} />}
                  <AvatarFallback className="text-xl font-bold">{selectedCompany.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{selectedCompany.name}</h3>
                  <Badge
                    variant={
                      selectedCompany.status === "approved"
                        ? "default"
                        : selectedCompany.status === "pending"
                        ? "outline"
                        : "destructive"
                    }
                    className={
                      selectedCompany.status === "approved"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/20 mt-1 capitalize font-medium"
                        : selectedCompany.status === "rejected"
                        ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border-rose-500/20 mt-1 capitalize font-medium"
                        : selectedCompany.status === "suspended"
                        ? "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/10 border-red-500/20 mt-1 capitalize font-medium"
                        : selectedCompany.status === "archived"
                        ? "bg-slate-500/10 text-slate-600 dark:text-slate-400 hover:bg-slate-500/10 border-slate-500/20 mt-1 capitalize font-medium"
                        : selectedCompany.status === "deleted"
                        ? "bg-red-950/15 text-red-500 dark:text-red-400 hover:bg-red-950/15 border-red-500/30 mt-1 capitalize font-medium line-through"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 border-amber-500/20 mt-1 capitalize font-medium"
                    }
                  >
                    {selectedCompany.status || "Pending"}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground block text-xs">Industry</span>
                  <span className="font-medium text-foreground">{selectedCompany.industry}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">Company Size</span>
                  <span className="font-medium text-foreground">{selectedCompany.size || "Not provided"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">Location</span>
                  <span className="font-medium text-foreground">{selectedCompany.location || "Not provided"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">Website</span>
                  {selectedCompany.website ? (
                    <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline inline-flex items-center gap-1">
                      {selectedCompany.website.replace("https://", "").replace("http://", "")}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-foreground">Not provided</span>
                  )}
                </div>
                {selectedCompany.creatorName && (
                  <div className="col-span-2 border-t pt-3 mt-1">
                    <span className="text-muted-foreground block text-xs">Registered By</span>
                    <span className="font-medium text-foreground block">{selectedCompany.creatorName}</span>
                    <span className="text-xs text-muted-foreground">{selectedCompany.creatorEmail}</span>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter className="flex flex-wrap gap-2 justify-end sm:gap-2 border-t pt-4">
              <DialogClose asChild>
                <Button variant="outline" size="sm">Close</Button>
              </DialogClose>
              {selectedCompany.status !== "deleted" && (
                <>
                  {selectedCompany.status !== "approved" && (
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium cursor-pointer"
                      onClick={() => verifyMutation.mutate(selectedCompany.id)}
                      disabled={verifyMutation.isPending}
                    >
                      Approve
                    </Button>
                  )}
                  {selectedCompany.status !== "rejected" && selectedCompany.status !== "approved" && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="font-medium cursor-pointer"
                      onClick={() => {
                        if (confirm(`Are you sure you want to reject "${selectedCompany.name}"?`))
                          rejectMutation.mutate(selectedCompany.id);
                      }}
                      disabled={rejectMutation.isPending}
                    >
                      Reject
                    </Button>
                  )}
                  {selectedCompany.status === "approved" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-500/30 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/10 font-medium cursor-pointer"
                      onClick={() => suspendMutation.mutate(selectedCompany.id)}
                      disabled={suspendMutation.isPending}
                    >
                      Suspend
                    </Button>
                  )}
                  {selectedCompany.status !== "archived" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-500/30 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-950/10 font-medium cursor-pointer"
                      onClick={() => archiveMutation.mutate(selectedCompany.id)}
                      disabled={archiveMutation.isPending}
                    >
                      Archive
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    className="font-semibold bg-rose-600 hover:bg-rose-700 cursor-pointer"
                    onClick={() => {
                      setCompanyToDelete(selectedCompany);
                      setDeleteConfirmOpen(true);
                      setConfirmNameInput("");
                    }}
                  >
                    Delete Company
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {deleteConfirmOpen && companyToDelete && (
        <Dialog open={deleteConfirmOpen} onOpenChange={(open) => !open && setDeleteConfirmOpen(false)}>
          <DialogContent className="max-w-md bg-background border border-border">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-rose-600 font-display text-lg font-bold">
                <AlertTriangle className="h-5 w-5 text-rose-600" />
                <span>Confirm Company Deletion</span>
              </DialogTitle>
              <DialogDescription>
                Review the cascading impact of soft-deleting this company.
              </DialogDescription>
            </DialogHeader>

            {isLoadingImpact ? (
              <div className="py-6 flex justify-center">
                <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : deleteImpact ? (
              <div className="space-y-4 py-2 text-sm">
                <div className="bg-rose-500/10 dark:bg-rose-950/20 border border-rose-500/20 p-3.5 rounded-xl text-rose-700 dark:text-rose-300">
                  Are you sure you want to soft-delete <strong>{deleteImpact.companyName}</strong>? This action will archive active relationships but preserve individual career history.
                </div>

                <div className="space-y-2.5">
                  <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">Cascading Impact Summary:</h4>
                  
                  <div className="space-y-2 border border-border/60 rounded-xl p-3 bg-muted/20">
                    <div className="flex justify-between items-center pb-1.5 border-b border-border/40">
                      <span className="text-muted-foreground font-medium">Company Record:</span>
                      <Badge variant="destructive" className="bg-rose-500/10 text-rose-600 border-rose-500/20 font-medium">Status to DELETED</Badge>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-muted-foreground font-medium">HR / Admin Accounts:</span>
                      <span className="font-bold text-foreground">{deleteImpact.hrCount} unlinked (set to null)</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-muted-foreground font-medium">Active Employee Profiles:</span>
                      <span className="font-bold text-foreground">{deleteImpact.employeeCount} unlinked & profiles survive</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-muted-foreground font-medium">Employment Records:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{deleteImpact.employeeCount} archived in career history</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-muted-foreground font-medium">Verification Requests:</span>
                      <span className="font-bold text-foreground">{deleteImpact.requestCount} historical records kept</span>
                    </div>
                    <div className="flex justify-between items-center pt-1.5 border-t border-border/40">
                      <span className="text-muted-foreground font-medium">Performance Reviews:</span>
                      <span className="font-bold text-foreground">{deleteImpact.reviewCount} preserved on employees</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-4 pt-2 border-t border-border/50">
                  <Label className="text-foreground font-medium block">
                    Type <strong>{deleteImpact.companyName}</strong> to confirm deletion:
                  </Label>
                  <Input
                    id="confirm-name-input"
                    value={confirmNameInput}
                    onChange={(e) => setConfirmNameInput(e.target.value)}
                    placeholder="Enter company name"
                    className="border-rose-500/30 focus-visible:ring-rose-500/30 w-full"
                  />
                </div>
              </div>
            ) : (
              <div className="py-4 text-center text-muted-foreground">Failed to load impact details.</div>
            )}

            <DialogFooter className="gap-2 sm:gap-0 mt-2">
              <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={
                  isLoadingImpact || 
                  !deleteImpact || 
                  confirmNameInput !== deleteImpact.companyName || 
                  deleteMutation.isPending
                }
                onClick={() => deleteMutation.mutate(companyToDelete.id)}
                className="bg-rose-600 hover:bg-rose-700 text-white font-semibold cursor-pointer"
              >
                {deleteMutation.isPending ? "Deleting..." : "Confirm Deletion"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// ── HR / COMPANY ADMIN DASHBOARD ─────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────

function HrDashboard() {
  const { user } = useAuth();
  const [activePieIndex, setActivePieIndex] = useState<number | null>(null);

  const { data: company, isLoading: companyLoading } = useQuery({
    queryKey: ["my-company", user?.companyId],
    queryFn: () => getCompanyById({ data: { id: user!.companyId! } }),
    enabled: !!user?.companyId,
  });

  const isApproved = company?.status === "approved";
  const isSuspended = company?.status === "suspended";
  const isRejected = company?.status === "rejected";

  const { data: dashboardData, isLoading: dashboardDataLoading } = useQuery({
    queryKey: ["dashboard-data"],
    queryFn: () => getDashboardData(),
    enabled: isApproved,
  });

  const stats = dashboardData?.stats;
  const hiringTrend = dashboardData?.hiringTrend;
  const ratingDist = dashboardData?.ratingDist;
  const departmentAnalytics = dashboardData?.departmentAnalytics;
  const verificationStats = dashboardData?.verificationStats;
  const recentEmployees = dashboardData?.recentEmployees;

  const statsLoading = dashboardDataLoading;
  const trendLoading = dashboardDataLoading;
  const ratingLoading = dashboardDataLoading;
  const departmentLoading = dashboardDataLoading;
  const verificationStatsLoading = dashboardDataLoading;
  const recentLoading = dashboardDataLoading;

  const { data: recentActivity, isLoading: activityLoading } = useQuery({
    queryKey: ["dashboard-recent-activity"],
    queryFn: () => getRecentActivity(),
    enabled: isApproved,
    refetchInterval: 30_000,
  });

  const hasHiringData = hiringTrend && hiringTrend.some((t) => t.hires > 0 || t.exits > 0);
  const hasRatingData = ratingDist && ratingDist.some((r) => r.count > 0);
  const hasDepartmentData = departmentAnalytics && departmentAnalytics.some((d) => d.total > 0);
  const hasVerificationData = verificationStats && verificationStats.some((v) => v.count > 0);

  const totalVerifications = useMemo(
    () => verificationStats?.reduce((s, v) => s + v.count, 0) ?? 0,
    [verificationStats]
  );

  // Derive stat trends from real data
  const trendData = useMemo(() => {
    if (!stats) return {};
    const verifiedPct =
      stats.totalEmployees > 0
        ? Math.round((stats.verifiedEmployees / stats.totalEmployees) * 100)
        : 0;
    const activePct =
      stats.totalEmployees > 0
        ? Math.round((stats.activeEmployees / stats.totalEmployees) * 100)
        : 0;

    let hiresTrend: string | undefined;
    if (hiringTrend && hiringTrend.length >= 2) {
      const last = hiringTrend[hiringTrend.length - 1];
      const prev = hiringTrend[hiringTrend.length - 2];
      if (prev.hires > 0) {
        const change = ((last.hires - prev.hires) / prev.hires) * 100;
        hiresTrend =
          change >= 0 ? `+${change.toFixed(0)}% vs prev month` : `${change.toFixed(0)}% vs prev month`;
      }
    }

    return {
      employees: hiresTrend,
      verified: verifiedPct > 0 ? `${verifiedPct}% of workforce` : undefined,
      active: activePct > 0 ? `${activePct}% active rate` : undefined,
    };
  }, [stats, hiringTrend]);

  if (companyLoading) {
    return (
      <div className="flex items-center justify-center p-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw className="h-6 w-6 text-primary" />
        </motion.div>
      </div>
    );
  }

  if (!isApproved) {
    return (
      <div className="space-y-6">
        <PageHeader title="Company Workspace" description="Your company workspace status page." />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-amber-200/50 bg-amber-50/10 p-6 md:p-8">
            <div className="flex flex-col items-center text-center max-w-lg mx-auto space-y-4">
              <div className="rounded-full bg-amber-100 p-4 text-amber-600">
                <AlertTriangle className="h-12 w-12" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                {isSuspended ? "Workspace Suspended" : isRejected ? "Registration Rejected" : "Verification Pending"}
              </h2>
              <p className="text-muted-foreground text-sm">
                {isSuspended
                  ? "Your company workspace has been suspended by the platform administrator. Access to verification features, performance reviews, and employee claims is restricted."
                  : isRejected
                    ? "Your company registration request was rejected by the platform administrator. Access to company workspace features is restricted."
                    : "Your company registration is awaiting verification approval. Access to adding employees and performing employee background checks is restricted until verified by the platform admin."}
              </p>
              <div className="pt-2">
                <Button asChild variant="outline">
                  <Link to="/app/settings">View System Info</Link>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <PageHeader
          title="Dashboard"
          description="Overview of your workforce reputation and performance."
          actions={
            <div className="flex gap-2">
              <Button asChild className="bg-gradient-hero text-primary-foreground shadow-elegant">
                <Link to="/app/employees">View Employees</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/app/verification">Verification Requests</Link>
              </Button>
            </div>
          }
        />
      </motion.div>

      {/* ── Premium Stat Cards ───────────────────────────────────── */}
      {statsLoading || !stats ? (
        <StatCardSkeleton />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div variants={fadeSlideUp}>
            <StatCard
              label="Total Employees"
              value={stats.totalEmployees}
              icon={Users}
              tone="primary"
              trend={trendData.employees}
            />
          </motion.div>
          <motion.div variants={fadeSlideUp}>
            <StatCard
              label="Active Employees"
              value={stats.activeEmployees}
              icon={UserCheck}
              tone="success"
              trend={trendData.active}
            />
          </motion.div>
          <motion.div variants={fadeSlideUp}>
            <StatCard
              label="Performance Reviews"
              value={stats.totalReviews}
              icon={TrendingUp}
              tone="accent"
            />
          </motion.div>
          <motion.div variants={fadeSlideUp}>
            <StatCard
              label="Verified Employees"
              value={stats.verifiedEmployees}
              icon={BadgeCheck}
              tone="warning"
              trend={trendData.verified}
            />
          </motion.div>
        </motion.div>
      )}

      {/* ── Radial Gauge Row (crime-stats style) ──────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="border-border/60 bg-card/85 backdrop-blur-sm overflow-hidden">
          <div className="h-0.5 w-full bg-gradient-to-r from-[#00C2FF] via-[#40C1C0] to-[#F69336]" />
          <CardContent className="py-5 px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center">
              {/* Total — large number left like the image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex flex-col justify-center"
              >
                {statsLoading ? (
                  <div className="space-y-2">
                    <div className="h-10 w-24 bg-muted animate-pulse rounded" />
                    <div className="h-3 w-20 bg-muted animate-pulse rounded" />
                    <div className="h-3 w-16 bg-muted animate-pulse rounded" />
                  </div>
                ) : (
                  <>
                    <motion.p
                      className="font-display text-5xl font-bold tabular-nums"
                      style={{ color: RADIAL_PALETTE[0] }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {(stats?.totalEmployees ?? 0) >= 1000
                        ? `${((stats?.totalEmployees ?? 0) / 1000).toFixed(0)}k`
                        : stats?.totalEmployees ?? 0}
                    </motion.p>
                    <p className="mt-1 text-[10px] text-muted-foreground uppercase tracking-widest">Last 12 months</p>
                    <p className="text-xs font-bold text-foreground">Total Employees</p>
                    <MiniSparkBar values={hiringTrend?.map((t) => t.hires) ?? []} color={RADIAL_PALETTE[0]} />
                  </>
                )}
              </motion.div>

              {/* Radial 1 — Verified */}
              <RadialGaugeCard
                label="Verified"
                value={stats?.verifiedEmployees ?? 0}
                total={stats?.totalEmployees ?? 0}
                color={RADIAL_PALETTE[1]}
                sparkValues={hiringTrend?.map((t) => t.hires) ?? []}
                isLoading={statsLoading}
              />

              {/* Radial 2 — Active */}
              <RadialGaugeCard
                label="Active"
                value={stats?.activeEmployees ?? 0}
                total={stats?.totalEmployees ?? 0}
                color={RADIAL_PALETTE[2]}
                sparkValues={hiringTrend?.map((t) => Math.max(t.hires - t.exits, 0)) ?? []}
                isLoading={statsLoading || trendLoading}
              />

              {/* Radial 3 — Approved Verifs */}
              <RadialGaugeCard
                label="Approved"
                value={verificationStats?.find((v) => v.status === "approved")?.count ?? 0}
                total={(verificationStats?.reduce((s, v) => s + v.count, 0)) ?? 0}
                color={RADIAL_PALETTE[3]}
                sparkValues={verificationStats?.map((v) => v.count) ?? []}
                isLoading={verificationStatsLoading}
              />

              {/* Radial 4 — Reviews */}
              <RadialGaugeCard
                label="Reviews"
                value={stats?.totalReviews ?? 0}
                total={Math.max(stats?.totalReviews ?? 0, 1)}
                color={RADIAL_PALETTE[4]}
                sparkValues={ratingDist?.map((r) => r.count) ?? []}
                isLoading={statsLoading || ratingLoading}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Charts Row ───────────────────────────────────────────── */}
      {dashboardDataLoading ? (
        <div className="grid gap-5 xl:grid-cols-2">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      ) : (
        <Suspense fallback={<div className="grid gap-5 xl:grid-cols-2"><ChartSkeleton /><ChartSkeleton /></div>}>
          <DashboardCharts
            hiringTrend={hiringTrend}
            departmentAnalytics={departmentAnalytics}
            verificationStats={verificationStats}
            ratingDist={ratingDist}
          />
        </Suspense>
      )}

      {/* ── Bottom Row: Recent Employees + Activity Feed ────────── */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Recent Employees */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-border/60 bg-card/80 backdrop-blur-sm h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Employees</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link to="/app/employees">
                  View all <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentLoading ? (
                <ListSkeleton count={4} />
              ) : !recentEmployees || recentEmployees.length === 0 ? (
                <EmptyState
                  icon={Users}
                  title="No employees yet"
                  description="Get started by registering your first employee record."
                />
              ) : (
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-2">
                  {recentEmployees.map((e) => (
                    <motion.div key={e.id} variants={fadeSlideLeft}>
                      <Link
                        to="/app/employees/$id"
                        params={{ id: e.id }}
                        className="group flex items-center gap-3 rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-primary/20 hover:bg-primary/5 hover:shadow-elegant"
                      >
                        <Avatar className="h-10 w-10 ring-1 ring-border/40 group-hover:ring-primary/30 transition-all">
                          {e.photoUrl && <AvatarImage src={e.photoUrl} />}
                          <AvatarFallback className="font-semibold text-sm">{e.fullName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="truncate font-semibold text-sm">{e.fullName}</span>
                            {e.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary shrink-0" />}
                          </div>
                          <div className="truncate text-xs text-muted-foreground">
                            {e.designation} · {e.department}
                          </div>
                        </div>
                        <Badge
                          variant={e.status === "active" ? "default" : "outline"}
                          className={`shrink-0 capitalize text-xs ${e.status === "active" ? "bg-success/15 text-success border-success/20" : ""}`}
                        >
                          {e.status.replace("_", " ")}
                        </Badge>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Live Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.56 }}
        >
          <Card className="border-border/60 bg-card/80 backdrop-blur-sm h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Live Activity</CardTitle>
                <Badge variant="outline" className="border-success/30 bg-success/8 text-success text-[10px]">
                  <span className="mr-1 h-1.5 w-1.5 rounded-full bg-success inline-block animate-pulse" />
                  Auto-refresh
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {activityLoading ? (
                <ListSkeleton count={4} />
              ) : !recentActivity || recentActivity.length === 0 ? (
                <div className="py-12 text-center text-sm text-muted-foreground">No activity logs recorded.</div>
              ) : (
                <div className="relative space-y-1">
                  {/* Vertical timeline line */}
                  <div className="absolute left-[22px] top-3 bottom-3 w-px bg-gradient-to-b from-primary/30 via-border/40 to-transparent" />
                  <AnimatePresence>
                    {recentActivity.map((a, i) => {
                      const meta = getActivityMeta(a.targetType ?? "", a.action);
                      return (
                        <motion.div
                          key={a.id}
                          variants={fadeSlideLeft}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: i * 0.06 }}
                          className="flex items-start gap-3 pl-1 py-2"
                        >
                          {/* Icon bubble */}
                          <div className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${meta.bg} ring-2 ring-background`}>
                            <meta.icon className={`h-3.5 w-3.5 ${meta.color}`} />
                          </div>
                          <div className="min-w-0 flex-1 pt-0.5">
                            <p className="text-sm text-foreground font-medium leading-tight truncate">
                              {a.action}
                            </p>
                            <time className="text-xs text-muted-foreground mt-0.5 block">
                              {new Date(a.timestamp).toLocaleString()}
                            </time>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// ── EMPLOYEE DASHBOARD ────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────

function EmployeeDashboard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isAddHistoryOpen, setIsAddHistoryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "career" | "performance" | "documents">("overview");
  const scoreRef = useRef<HTMLDivElement>(null);
  const scoreInView = useInView(scoreRef, { once: true });

  const { data: employee, isLoading: employeeLoading } = useQuery({
    queryKey: ["employee-profile", user?.id],
    queryFn: () => getEmployeeByUserId({ data: { userId: user!.id } }),
  });

  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ["employee-history", employee?.id],
    queryFn: () => getEmploymentHistory({ data: { employeeId: employee!.id } }),
    enabled: !!employee?.id,
  });

  const { data: verificationRequestsData, isLoading: requestsLoading } = useQuery({
    queryKey: ["employee-verification-requests"],
    queryFn: () => listVerificationRequests({ data: { page: 1, pageSize: 20 } }),
    refetchInterval: 30_000,
  });

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["employee-reviews", employee?.id],
    queryFn: () => listReviews({ data: { employeeId: employee!.id } }),
    enabled: !!employee?.id,
  });

  const verificationRequests = (verificationRequestsData as any)?.data || [];
  const pendingRequestsCount = verificationRequests.filter((r: any) => r.status === "pending").length;

  const resolveRequestMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "approved" | "denied" }) =>
      resolveVerificationRequest({ data: { id, status } }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["employee-verification-requests"] });
      queryClient.invalidateQueries({ queryKey: ["employee-profile"] });
      toast.success(`Request ${variables.status === "approved" ? "approved" : "denied"} successfully`);
    },
    onError: (err: any) => toast.error(err.message || "Failed to resolve request"),
  });

  const addHistoryMutation = useMutation({
    mutationFn: (data: any) => addEmploymentHistory({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee-history"] });
      queryClient.invalidateQueries({ queryKey: ["employee-profile"] });
      toast.success("Career history added. Awaiting verification.");
      setIsAddHistoryOpen(false);
    },
    onError: (err: any) => toast.error(err.message || "Failed to add history"),
  });

  if (employeeLoading) {
    return (
      <div className="flex items-center justify-center p-16">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <RefreshCw className="h-6 w-6 text-primary" />
        </motion.div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-8 text-center text-red-500">
        Professional profile not found. Please contact support.
      </div>
    );
  }

  const score = employee.trustScore ?? 0;

  // Trust rating logic
  let trustRating = "Standard";
  let trustGradient = "from-amber-500 to-orange-500";
  let trustTextColor = "text-amber-500";
  if (score >= 80) {
    trustRating = "Excellent";
    trustGradient = "from-emerald-500 to-teal-500";
    trustTextColor = "text-emerald-500";
  } else if (score >= 50) {
    trustRating = "Good";
    trustGradient = "from-blue-500 to-cyan-500";
    trustTextColor = "text-blue-500";
  } else if (score < 35) {
    trustRating = "Needs Improvement";
    trustGradient = "from-rose-500 to-red-500";
    trustTextColor = "text-rose-500";
  }

  // Trust score breakdown data
  const scoreBreakdown = [
    {
      label: "Performance Reviews",
      weight: 40,
      points: employee.rating ? Math.round((employee.rating / 5) * 40) : 40,
      icon: Star,
    },
    {
      label: "Verification Bonus",
      weight: 20,
      points: employee.verified ? 20 : 0,
      icon: ShieldCheck,
    },
    {
      label: "Experience Cap",
      weight: 20,
      points: Math.min(Math.round((Math.min(employee.experience, 10) / 10) * 20), 20),
      icon: Briefcase,
    },
    {
      label: "Attendance Rating",
      weight: 20,
      points: 20,
      icon: CheckCircle2,
    },
  ];

  // Calculate review averages
  const reviewsCount = reviews.length;
  const avgProductivity = reviewsCount > 0 ? (reviews.reduce((sum, r) => sum + r.productivity, 0) / reviewsCount).toFixed(1) : "0.0";
  const avgTeamwork = reviewsCount > 0 ? (reviews.reduce((sum, r) => sum + r.teamwork, 0) / reviewsCount).toFixed(1) : "0.0";
  const avgCommunication = reviewsCount > 0 ? (reviews.reduce((sum, r) => sum + r.communication, 0) / reviewsCount).toFixed(1) : "0.0";
  const avgLeadership = reviewsCount > 0 ? (reviews.reduce((sum, r) => sum + r.leadership, 0) / reviewsCount).toFixed(1) : "0.0";
  const avgAttendance = reviewsCount > 0 ? (reviews.reduce((sum, r) => sum + r.attendance, 0) / reviewsCount).toFixed(1) : "0.0";
  const avgOverall = reviewsCount > 0 ? (reviews.reduce((sum, r) => sum + r.overall, 0) / reviewsCount).toFixed(1) : "0.0";

  const handleAddHistorySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const companyName = formData.get("companyName") as string;
    const designation = formData.get("designation") as string;
    const department = formData.get("department") as string;
    const joiningDate = formData.get("joiningDate") as string;
    const exitDate = (formData.get("exitDate") as string) || null;
    const experience = Number(formData.get("experience") || 0);
    const salary = formData.get("salary") ? Number(formData.get("salary")) : null;

    addHistoryMutation.mutate({
      employeeId: employee.id,
      companyName,
      designation,
      department,
      joiningDate,
      exitDate,
      experience,
      salary,
    });
  };

  return (
    <div className="space-y-7">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <PageHeader
          title={`Welcome, ${employee.fullName}`}
          description="Manage your professional workforce identity, verification requests, and reputation."
          actions={
            <div className="flex gap-2">
              <Button asChild className="bg-gradient-hero text-primary-foreground shadow-elegant">
                <Link to="/app/profile">Edit Profile</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/app/consent">Consent Manager</Link>
              </Button>
            </div>
          }
        />
      </motion.div>

      {/* Modern Glassmorphic Tab Navigation */}
      <div className="flex border-b border-border/50 pb-px gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: "overview", label: "Overview & Trust", icon: Sparkles },
          { id: "career", label: "Career History", icon: Briefcase, count: history?.length },
          { id: "performance", label: "Performance Summary", icon: Star, count: reviewsCount },
          { id: "documents", label: "Documents & Credentials", icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {/* Trust Score Radial Widget */}
            <div ref={scoreRef}>
              <Card className="border-border/60 bg-card/90 backdrop-blur-sm overflow-hidden h-full">
                <div className={`h-1 w-full bg-gradient-to-r ${trustGradient}`} />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Dynamic Trust Score
                  </CardTitle>
                  <CardDescription>Real-time integrity & performance ranking</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-5">
                  <div className="relative flex items-center justify-center h-36 w-36">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${trustGradient} opacity-10 blur-lg`} />
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="72" cy="72" r="56" className="stroke-border/30" strokeWidth="8" fill="transparent" />
                      <motion.circle
                        cx="72"
                        cy="72"
                        r="56"
                        strokeWidth="8"
                        fill="transparent"
                        stroke={`url(#scoreGradient-${employee.id})`}
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                        animate={
                          scoreInView
                            ? { strokeDashoffset: 2 * Math.PI * 56 * (1 - score / 100) }
                            : {}
                        }
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                      />
                      <defs>
                        <linearGradient id={`scoreGradient-${employee.id}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="var(--color-primary)" />
                          <stop offset="100%" stopColor="var(--color-accent)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <motion.span
                        className="font-display text-4xl font-bold"
                        initial={{ opacity: 0 }}
                        animate={scoreInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.6 }}
                      >
                        {score}
                      </motion.span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Points</span>
                    </div>
                  </div>

                  <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${trustTextColor} border-current/20 bg-current/5`}>
                    <Zap className="h-3.5 w-3.5" />
                    {trustRating} Trust Status
                  </div>

                  <div className="w-full space-y-3">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground border-b pb-1.5">
                      Score Breakdown
                    </p>
                    {scoreBreakdown.map((item, i) => (
                      <div key={item.label} className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <item.icon className="h-3 w-3" />
                            {item.label}
                          </div>
                          <span className="font-semibold text-foreground tabular-nums">
                            {item.points}/{item.weight} pts
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-border/50 overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${trustGradient}`}
                            initial={{ width: 0 }}
                            animate={scoreInView ? { width: `${(item.points / item.weight) * 100}%` } : {}}
                            transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 + i * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Summary Card */}
            <div className="md:col-span-2 space-y-6">
              <Card className="border-border/60 bg-card/90 backdrop-blur-sm h-full">
                <CardHeader>
                  <CardTitle>Professional Profile Summary</CardTitle>
                  <CardDescription>General information visible to hiring managers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex flex-col sm:flex-row gap-4 items-start border-b pb-5">
                    <Avatar className="h-18 w-18 border-2 ring-2 ring-primary/20 shrink-0" style={{ height: 72, width: 72 }}>
                      {employee.photoUrl && <AvatarImage src={employee.photoUrl} />}
                      <AvatarFallback className="text-2xl font-bold">{employee.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1.5">
                      <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                        {employee.fullName}
                        {employee.verified && <BadgeCheck className="h-5 w-5 text-primary" />}
                      </h3>
                      <div className="text-sm font-semibold text-muted-foreground flex items-center gap-1.5">
                        <span>{employee.designation}</span>
                        <span>·</span>
                        <span className="text-xs text-primary font-mono bg-primary/5 px-2 py-0.5 rounded border border-primary/10">ID: {employee.employeeId}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <Badge
                          variant="outline"
                          className={
                            employee.claimStatus === "claimed"
                              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs"
                              : "border-amber-500/30 bg-amber-50/10 text-amber-400 text-xs"
                          }
                        >
                          {employee.claimStatus === "claimed" ? "Verified Employee" : "Profile Not Claimed"}
                        </Badge>
                        {employee.department && <Badge variant="secondary" className="text-xs">{employee.department}</Badge>}
                        {employee.verified && (
                          <Badge className="text-xs bg-success/15 text-success border-success/20">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4 shrink-0" />
                      <span className="truncate">{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4 shrink-0" />
                      <span>{employee.phone || "No phone added"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-4 w-4 shrink-0" />
                      <span>{employee.experience} years experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4 shrink-0" />
                      <span>Joined {new Date(employee.joiningDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4 border-t">
                    <div className="flex-1 space-y-1">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest block">Skills Summary</span>
                      <div className="flex flex-wrap gap-1">
                        {employee.skills.slice(0, 5).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-[10px]">{skill}</Badge>
                        ))}
                        {employee.skills.length > 5 && (
                          <Badge variant="outline" className="text-[10px]">{`+${employee.skills.length - 5} more`}</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest block">Verification Status</span>
                      <div className="flex items-center gap-1.5 text-xs">
                        {employee.verified ? (
                          <span className="text-emerald-500 flex items-center font-semibold"><CheckCircle2 className="h-4 w-4 mr-1 shrink-0" /> Credential Verified</span>
                        ) : (
                          <span className="text-amber-500 flex items-center font-semibold"><Clock className="h-4 w-4 mr-1 shrink-0" /> Verification Pending</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pending Consent / Verification Requests on Overview */}
            <div className="md:col-span-3">
              <Card className="border-border/60 bg-card/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Incoming Consent & Verification Requests
                  </CardTitle>
                  <CardDescription>Authorize background checks from external company HR managers</CardDescription>
                </CardHeader>
                <CardContent>
                  {requestsLoading ? (
                    <ListSkeleton count={2} />
                  ) : verificationRequests.length === 0 ? (
                    <div className="py-8 text-center text-sm text-muted-foreground">
                      No active consent or background check verification requests.
                    </div>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {verificationRequests.map((req: any) => (
                        <div key={req.id} className="rounded-xl border border-border/60 bg-muted/10 p-4 flex flex-col justify-between gap-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-semibold text-sm text-foreground block">{req.requestedByCompany}</span>
                              <span className="text-[10px] text-muted-foreground capitalize">{req.requestType}</span>
                            </div>
                            <span className="text-[10px] text-muted-foreground">{new Date(req.createdAt).toLocaleDateString()}</span>
                          </div>
                          {req.status === "pending" ? (
                            <div className="flex gap-2 mt-2">
                              <Button
                                size="sm"
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8"
                                onClick={() => resolveRequestMutation.mutate({ id: req.id, status: "approved" })}
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Grant Access
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 text-destructive border-destructive/30 hover:bg-destructive/8 text-xs h-8"
                                onClick={() => resolveRequestMutation.mutate({ id: req.id, status: "denied" })}
                              >
                                <X className="h-3.5 w-3.5 mr-1" /> Deny
                              </Button>
                            </div>
                          ) : (
                            <Badge
                              variant={req.status === "approved" ? "default" : "destructive"}
                              className="w-full capitalize justify-center text-center mt-2"
                            >
                              {req.status === "approved" ? "Approved" : "Denied"}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {activeTab === "career" && (
          <motion.div
            key="career"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <Card className="border-border/60 bg-card/90 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-4">
                <div>
                  <CardTitle>Verified Career History</CardTitle>
                  <CardDescription>A complete timeline of your employment history. Previous records remain preserved when joining new companies.</CardDescription>
                </div>
                <Button size="sm" onClick={() => setIsAddHistoryOpen(true)}>
                  <Plus className="h-4 w-4 mr-1" /> Add Tenure
                </Button>
              </CardHeader>
              <CardContent>
                {historyLoading ? (
                  <ListSkeleton count={3} />
                ) : !history || history.length === 0 ? (
                  <EmptyState
                    icon={Briefcase}
                    title="No Career Records Logged"
                    description="You can add past companies manually to populate your verified employment timeline."
                  />
                ) : (
                  <div className="relative pl-6 space-y-6">
                    <div className="absolute left-[9px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary/50 via-border/40 to-transparent" />
                    {history.map((item, i) => (
                      <div key={item.id} className="relative pl-8 group">
                        {/* Timeline dot */}
                        <div className={`absolute left-[-2px] top-1.5 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${
                          item.verificationStatus === "verified"
                            ? "border-success bg-success/15"
                            : item.verificationStatus === "rejected"
                            ? "border-destructive bg-destructive/15"
                            : "border-primary bg-primary/10"
                        }`}>
                          {item.verificationStatus === "verified" ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                          ) : item.verificationStatus === "rejected" ? (
                            <X className="h-3.5 w-3.5 text-destructive" />
                          ) : (
                            <Clock className="h-3.5 w-3.5 text-primary" />
                          )}
                        </div>

                        {/* Record details */}
                        <div className="rounded-xl border border-border/60 bg-muted/10 p-5 transition-all duration-200 hover:border-primary/20 hover:bg-primary/5">
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
                            <div>
                              <h4 className="font-bold text-foreground text-base flex items-center gap-1.5">
                                {item.companyName}
                                {item.verificationStatus === "verified" && (
                                  <BadgeCheck className="h-4 w-4 text-emerald-500" />
                                )}
                              </h4>
                              <span className="text-sm text-muted-foreground font-medium">{item.designation}</span>
                            </div>
                            <Badge
                              variant={
                                item.verificationStatus === "verified"
                                  ? "default"
                                  : item.verificationStatus === "rejected"
                                  ? "destructive"
                                  : "outline"
                              }
                              className={`capitalize text-xs w-fit ${
                                item.verificationStatus === "verified"
                                  ? "bg-success/15 text-success border-success/20"
                                  : ""
                              }`}
                            >
                              {item.verificationStatus}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-muted-foreground pt-3 border-t border-border/40">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4 shrink-0" />
                              <span>
                                {new Date(item.joiningDate).toLocaleDateString()} –{" "}
                                {item.exitDate ? new Date(item.exitDate).toLocaleDateString() : "Present (Active)"}
                              </span>
                            </div>
                            {item.department && (
                              <div className="flex items-center gap-1.5">
                                <Building2 className="h-4 w-4 shrink-0" />
                                <span>{item.department} Department</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1.5">
                              <Briefcase className="h-4 w-4 shrink-0" />
                              <span>{item.experience} yrs tenure experience</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "performance" && (
          <motion.div
            key="performance"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {/* Performance metrics dashboard card */}
            <div>
              <Card className="border-border/60 bg-card/90 backdrop-blur-sm h-full">
                <CardHeader>
                  <CardTitle>Tenure Rating Summary</CardTitle>
                  <CardDescription>Aggregated metric scores based on company performance reviews</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-6">
                  <div className="text-center space-y-1.5">
                    <span className="text-5xl font-display font-extrabold text-primary">{avgOverall}</span>
                    <div className="text-sm font-semibold text-muted-foreground flex items-center gap-1 justify-center">
                      <span>Out of 5.0</span>
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    </div>
                  </div>

                  <div className="w-full space-y-4 pt-3 border-t">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest block mb-2">Metrics Breakdown</span>
                    {[
                      { label: "Productivity", value: avgProductivity },
                      { label: "Teamwork", value: avgTeamwork },
                      { label: "Communication", value: avgCommunication },
                      { label: "Leadership", value: avgLeadership },
                      { label: "Attendance", value: avgAttendance },
                    ].map((item) => (
                      <div key={item.label} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span>{item.value} / 5.0</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-border/40 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                            style={{ width: `${(Number(item.value) / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Review details list */}
            <div className="md:col-span-2">
              <Card className="border-border/60 bg-card/90 backdrop-blur-sm h-full">
                <CardHeader>
                  <CardTitle>Performance Reviews Summary</CardTitle>
                  <CardDescription>Detailed evaluations submitted by HR managers and company reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  {reviewsLoading ? (
                    <ListSkeleton count={2} />
                  ) : reviews.length === 0 ? (
                    <div className="py-12 text-center text-sm text-muted-foreground">
                      <Star className="h-10 w-10 mx-auto mb-3 text-muted-foreground/30" />
                      No performance evaluations have been logged for your profile yet.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((rev) => (
                        <div key={rev.id} className="rounded-xl border border-border/60 bg-muted/10 p-5 space-y-3">
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-border/40">
                            <div>
                              <span className="font-bold text-sm text-foreground block">{rev.period} Review</span>
                              <span className="text-xs text-muted-foreground">Evaluated by: <span className="text-foreground/80 font-medium">{rev.reviewerName}</span></span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                              <Star className="h-3.5 w-3.5 fill-current" />
                              <span>{rev.overall.toFixed(2)} Rating</span>
                            </div>
                          </div>

                          <div className="text-sm text-muted-foreground italic bg-background/50 border rounded-lg p-3">
                            "{rev.feedback}"
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-[10px] text-muted-foreground font-semibold">
                            <div>Productivity: <span className="text-foreground font-bold">{rev.productivity}/5</span></div>
                            <div>Teamwork: <span className="text-foreground font-bold">{rev.teamwork}/5</span></div>
                            <div>Comm: <span className="text-foreground font-bold">{rev.communication}/5</span></div>
                            <div>Leadership: <span className="text-foreground font-bold">{rev.leadership}/5</span></div>
                            <div>Attendance: <span className="text-foreground font-bold">{rev.attendance}/5</span></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {activeTab === "documents" && (
          <motion.div
            key="documents"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {/* Resume / Profile Photo Documents */}
            <div className="space-y-6">
              <Card className="border-border/60 bg-card/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Documents & Resumes</CardTitle>
                  <CardDescription>Verified file uploads associated with your credentials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 rounded-lg border p-4 bg-muted/10">
                    <div className="grid h-10 w-10 place-items-center rounded bg-primary/15 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-xs block text-foreground">Curriculum Vitae (CV)</span>
                      {employee.resumeUrl ? (
                        <a
                          href={employee.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-1 mt-0.5"
                        >
                          View Resume <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-xs text-muted-foreground mt-0.5 block">No resume document uploaded</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border p-4 bg-muted/10">
                    <div className="grid h-10 w-10 place-items-center rounded bg-accent/15 text-accent">
                      <Users className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-xs block text-foreground">Profile Photo</span>
                      {employee.photoUrl ? (
                        <a
                          href={employee.photoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-accent hover:underline flex items-center gap-1 mt-0.5"
                        >
                          View Image <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-xs text-muted-foreground mt-0.5 block">No photo uploaded</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Certifications Card */}
            <div className="md:col-span-2 space-y-6">
              <Card className="border-border/60 bg-card/90 backdrop-blur-sm h-full">
                <CardHeader>
                  <CardTitle>Certifications & Credentials</CardTitle>
                  <CardDescription>Verified academic and professional certifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(employee.certifications ?? []).length === 0 ? (
                    <div className="py-8 text-center text-sm text-muted-foreground">
                      No certificates recorded on your profile.
                    </div>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {(employee.certifications ?? []).map((cert: string) => (
                        <div key={cert} className="rounded-xl border border-border/60 bg-muted/10 p-4 flex items-center gap-3">
                          <div className="h-8 w-8 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                            <BadgeCheck className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-xs text-foreground block truncate">{cert}</span>
                            <span className="text-[10px] text-muted-foreground">Verified Certificate</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2 pt-4 border-t">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest block">Portfolio Links</span>
                    <div className="space-y-2">
                      {(employee.portfolioLinks ?? []).length === 0 ? (
                        <span className="text-xs text-muted-foreground">No portfolio links added.</span>
                      ) : (
                        (employee.portfolioLinks ?? []).map((link: string) => (
                          <a
                            key={link}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-1.5 truncate"
                          >
                            <Globe className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">{link}</span>
                            <ExternalLink className="h-3 w-3 shrink-0 ml-auto" />
                          </a>
                        ))
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Employment History Modal */}
      {isAddHistoryOpen && (
        <Dialog open={isAddHistoryOpen} onOpenChange={setIsAddHistoryOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Career History Entry</DialogTitle>
              <DialogDescription>
                Manually record a previous employment. The company admin can verify this record.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddHistorySubmit} className="space-y-4 py-2">
              <div className="space-y-2">
                <FormLabel htmlFor="companyName">Company Name</FormLabel>
                <Input id="companyName" name="companyName" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <FormLabel htmlFor="designation">Designation</FormLabel>
                  <Input id="designation" name="designation" required />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="department">Department</FormLabel>
                  <Input id="department" name="department" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <FormLabel htmlFor="joiningDate">Joining Date</FormLabel>
                  <Input id="joiningDate" name="joiningDate" type="date" required />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="exitDate">Exit Date (Optional)</FormLabel>
                  <Input id="exitDate" name="exitDate" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <FormLabel htmlFor="experience">Years of Experience</FormLabel>
                  <Input id="experience" name="experience" type="number" min="0" defaultValue="0" required />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="salary">Salary (Optional & Confidential)</FormLabel>
                  <Input id="salary" name="salary" type="number" min="0" placeholder="Monthly Salary" />
                </div>
              </div>
              <DialogFooter className="pt-4 gap-2 sm:gap-0">
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={addHistoryMutation.isPending}>
                  {addHistoryMutation.isPending ? "Adding..." : "Add to Timeline"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
