import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useAuth } from "@/components/auth-provider";
import {
  Search,
  Plus,
  BadgeCheck,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Building2,
  User,
  ShieldCheck,
  ShieldAlert,
  Star,
  CalendarDays,
  Briefcase,
  AlertTriangle,
  RefreshCw,
  X,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listVerificationRequests,
  createVerificationRequest,
  searchEmployeesGlobal,
} from "@/lib/api/verification.functions";
import { ListSkeleton } from "@/components/loading-skeleton";
import { EmptyState } from "@/components/empty-state";
import type { VerificationRequest } from "@/lib/types";

// ── Route ────────────────────────────────────────────────────────────
export const Route = createFileRoute("/app/verification")({
  component: VerificationPage,
});

// ── Animation variants ───────────────────────────────────────────────
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const slideUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

// ── Status helpers ───────────────────────────────────────────────────
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function isExpired(req: VerificationRequest) {
  return req.status === "pending" && Date.now() - new Date(req.createdAt).getTime() > SEVEN_DAYS_MS;
}

function getEffectiveStatus(req: VerificationRequest): string {
  if (isExpired(req)) return "expired";
  return req.status;
}

function StatusBadge({ req }: { req: VerificationRequest }) {
  const status = getEffectiveStatus(req);
  if (status === "approved")
    return (
      <Badge className="bg-emerald-500/12 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/12 flex items-center gap-1">
        <CheckCircle2 className="h-3 w-3" /> Approved
      </Badge>
    );
  if (status === "denied")
    return (
      <Badge className="bg-rose-500/12 text-rose-400 border-rose-500/25 hover:bg-rose-500/12 flex items-center gap-1">
        <XCircle className="h-3 w-3" /> Denied
      </Badge>
    );
  if (status === "expired")
    return (
      <Badge variant="outline" className="border-slate-500/30 bg-slate-500/8 text-slate-400 flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" /> Expired
      </Badge>
    );
  return (
    <Badge variant="outline" className="border-amber-400/35 bg-amber-400/8 text-amber-400 flex items-center gap-1">
      <Clock className="h-3 w-3" /> Pending
    </Badge>
  );
}

// ── Main page ────────────────────────────────────────────────────────
function VerificationPage() {
  const { user } = useAuth();
  const isApproved = user.role === "super_admin" || user.companyStatus === "approved";
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [requestType, setRequestType] = useState("Full Background Check");
  const [requestOpen, setRequestOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved" | "denied" | "expired">("all");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced search
  const handleSearchInput = (val: string) => {
    setSearchQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQuery(val), 400);
  };

  // Search employees globally (cross-company)
  const { data: searchResults, isFetching: searching } = useQuery({
    queryKey: ["global-employee-search", debouncedQuery],
    queryFn: () => searchEmployeesGlobal({ data: { query: debouncedQuery } }),
    enabled: debouncedQuery.trim().length >= 2,
    staleTime: 10_000,
  });

  // List all verification requests
  const { data: requestData, isLoading: requestsLoading } = useQuery({
    queryKey: ["verification-requests"],
    queryFn: () => listVerificationRequests({ data: { page: 1, pageSize: 100 } }),
    refetchInterval: 30_000,
  });

  const createMutation = useMutation({
    mutationFn: (d: { employeeId: string; requestType: string }) =>
      createVerificationRequest({ data: d }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verification-requests"] });
      toast.success("Verification request sent successfully!");
      setRequestOpen(false);
      setSelectedEmployee(null);
      setSearchQuery("");
      setDebouncedQuery("");
    },
    onError: (err: any) =>
      toast.error(err.message || "Failed to send verification request"),
  });

  const allRequests = (requestData as any)?.data ?? [];

  const filtered = useMemo(() => {
    if (activeTab === "all") return allRequests;
    return allRequests.filter((r: any) => getEffectiveStatus(r) === activeTab);
  }, [allRequests, activeTab]);

  const counts = useMemo(() => ({
    all: allRequests.length,
    pending: allRequests.filter((r: any) => getEffectiveStatus(r) === "pending").length,
    approved: allRequests.filter((r: any) => r.status === "approved").length,
    denied: allRequests.filter((r: any) => r.status === "denied").length,
    expired: allRequests.filter((r: any) => isExpired(r)).length,
  }), [allRequests]);

  const showSearchPanel = debouncedQuery.length >= 2;

  return (
    <div className="space-y-6">
      {/* ── Page Header ────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <PageHeader
          title="Verification Requests"
          description="Search any employee platform-wide and send consent-based background check requests."
          actions={
            <Badge variant="outline" className="border-primary/30 bg-primary/8 text-primary text-xs">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-primary inline-block animate-pulse" />
              Auto-refresh 30s
            </Badge>
          }
        />
      </motion.div>

      {/* ── Cross-Company Employee Search ──────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}>
        <Card className="border-border/60 bg-card/85 backdrop-blur-sm overflow-hidden">
          <div className="h-0.5 w-full bg-gradient-to-r from-primary via-accent to-transparent" />
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/12 text-primary">
                <Search className="h-4 w-4" />
              </div>
              Search Employee Platform-Wide
            </CardTitle>
            <CardDescription>
              Find any professional by name, email, employee ID, or designation across all verified companies.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => handleSearchInput(e.target.value)}
                placeholder="Search by name, email, employee ID, or designation…"
                className="pl-10 bg-background/50 border-border/60 focus:border-primary/50 transition-colors"
                disabled={!isApproved}
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); setDebouncedQuery(""); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Search Results */}
            <AnimatePresence>
              {showSearchPanel && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  {searching ? (
                    <div className="space-y-2 pt-1">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3 rounded-xl border border-border/40 p-3 animate-pulse">
                          <div className="h-10 w-10 rounded-full bg-muted" />
                          <div className="flex-1 space-y-1.5">
                            <div className="h-3.5 w-32 rounded bg-muted" />
                            <div className="h-3 w-48 rounded bg-muted" />
                          </div>
                          <div className="h-8 w-24 rounded-lg bg-muted" />
                        </div>
                      ))}
                    </div>
                  ) : !searchResults || searchResults.length === 0 ? (
                    <div className="py-8 text-center text-sm text-muted-foreground border border-dashed border-border/50 rounded-xl">
                      No employees found matching &quot;{debouncedQuery}&quot;
                    </div>
                  ) : (
                    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-2">
                      {searchResults.map((emp) => (
                        <motion.div
                          key={emp.id}
                          variants={slideUp}
                          className="group flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-3 transition-all duration-200 hover:border-primary/30 hover:bg-primary/4 hover:shadow-elegant cursor-pointer"
                          onClick={() => { setSelectedEmployee(emp); setRequestOpen(true); }}
                        >
                          <Avatar className="h-10 w-10 ring-1 ring-border/40 group-hover:ring-primary/30 transition-all shrink-0">
                            {emp.photoUrl && <AvatarImage src={emp.photoUrl} />}
                            <AvatarFallback className="text-sm font-semibold">{emp.fullName[0]}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-sm text-foreground truncate">{emp.fullName}</span>
                              {emp.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary shrink-0" />}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {emp.designation} · {emp.department} · {emp.companyName}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="hidden sm:block text-xs text-muted-foreground font-mono">{emp.employeeId}</span>
                            <Button size="sm" className="h-7 px-3 text-xs bg-primary/90 hover:bg-primary">
                              <Plus className="h-3 w-3 mr-1" /> Request
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Request List with Status Tabs ─────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.2 }}>
        <Card className="border-border/60 bg-card/85 backdrop-blur-sm overflow-hidden">
          <div className="h-0.5 w-full bg-gradient-to-r from-accent via-primary to-transparent" />
          <CardHeader className="pb-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Request History</CardTitle>
                <CardDescription className="mt-0.5">
                  {(requestData as any)?.total ?? 0} total requests · Consent-gated access
                </CardDescription>
              </div>
            </div>

            {/* Tab strip */}
            <div className="flex gap-1 mt-4 overflow-x-auto pb-1 scrollbar-none">
              {(["all", "pending", "approved", "denied", "expired"] as const).map((tab) => {
                const isActive = activeTab === tab;
                const tabColors: Record<string, string> = {
                  all: "primary",
                  pending: "amber",
                  approved: "emerald",
                  denied: "rose",
                  expired: "slate",
                };
                return (
                  <motion.button
                    key={tab}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveTab(tab)}
                    className={`relative flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 capitalize ${
                      isActive
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {tab}
                    <span className={`inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                      isActive ? "bg-primary/25 text-primary" : "bg-muted text-muted-foreground"
                    }`}>
                      {counts[tab]}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute inset-0 rounded-lg border border-primary/25 bg-primary/8"
                        style={{ zIndex: -1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            {requestsLoading ? (
              <ListSkeleton count={4} />
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={FileText}
                title={activeTab === "all" ? "No verification requests" : `No ${activeTab} requests`}
                description={
                  activeTab === "all"
                    ? "Search and select an employee above to send your first verification request."
                    : `No requests with status "${activeTab}" found.`
                }
              />
            ) : (
              <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {filtered.map((req: any) => (
                    <RequestCard
                      key={req.id}
                      req={req}
                      onViewReport={() => setSelectedRequest(req)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Send Request Dialog ────────────────────────────────── */}
      <Dialog open={requestOpen} onOpenChange={(open) => { setRequestOpen(open); if (!open) setSelectedEmployee(null); }}>
        <DialogContent className="max-w-md border-border/60 bg-card/95 backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl bg-gradient-to-r from-primary via-accent to-transparent" />
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Send Verification Request
            </DialogTitle>
          </DialogHeader>

          {selectedEmployee && (
            <div className="space-y-5 py-2">
              {/* Employee preview card */}
              <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <Avatar className="h-12 w-12 ring-2 ring-primary/25 shrink-0">
                  {selectedEmployee.photoUrl && <AvatarImage src={selectedEmployee.photoUrl} />}
                  <AvatarFallback className="font-bold">{selectedEmployee.fullName[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-foreground">{selectedEmployee.fullName}</span>
                    {selectedEmployee.verified && <BadgeCheck className="h-4 w-4 text-primary shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {selectedEmployee.designation} · {selectedEmployee.companyName}
                  </p>
                  <p className="text-xs text-muted-foreground/70 font-mono mt-0.5">{selectedEmployee.email}</p>
                </div>
              </div>

              {/* Request type */}
              <div className="space-y-2">
                <Label>Verification Scope</Label>
                <Select value={requestType} onValueChange={setRequestType}>
                  <SelectTrigger className="border-border/60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full Background Check">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        Full Background Check
                      </div>
                    </SelectItem>
                    <SelectItem value="Employment Tenure Verification">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-accent" />
                        Employment Tenure Verification
                      </div>
                    </SelectItem>
                    <SelectItem value="Performance Review Audit">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-warning" />
                        Performance Review Audit
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-xs text-amber-400/90">
                <div className="flex gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>The employee must approve this request. Salary and private notes are never shared. Requests expire after 7 days.</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => selectedEmployee && createMutation.mutate({ employeeId: selectedEmployee.id, requestType })}
              disabled={createMutation.isPending || !selectedEmployee}
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-elegant"
            >
              {createMutation.isPending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-1 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4 mr-1" /> Send Request
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Verification Report Modal ──────────────────────────── */}
      <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto border-border/60 bg-card/95 backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl bg-gradient-to-r from-emerald-500 via-primary to-transparent" />
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <BadgeCheck className="h-6 w-6 text-emerald-400" />
              Verified Employment Report
            </DialogTitle>
          </DialogHeader>

          {selectedRequest?.responseData && (
            <VerificationReport req={selectedRequest} />
          )}

          <DialogFooter className="border-t border-border/50 pt-4 mt-2">
            <DialogClose asChild>
              <Button variant="outline">Close Report</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ── Request Card ─────────────────────────────────────────────────────
function RequestCard({ req, onViewReport }: { req: VerificationRequest; onViewReport: () => void }) {
  const status = getEffectiveStatus(req);
  const daysAgo = Math.floor((Date.now() - new Date(req.createdAt).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      variants={slideUp}
      layout
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-xl border border-border/50 bg-background/50 p-4 backdrop-blur-sm transition-all duration-200 hover:border-primary/25 hover:shadow-elegant"
    >
      {/* Gradient left accent */}
      <div className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl ${
        status === "approved" ? "bg-emerald-500" :
        status === "denied" ? "bg-rose-500" :
        status === "expired" ? "bg-slate-500" :
        "bg-amber-400"
      }`} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pl-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
            status === "approved" ? "bg-emerald-500/12 text-emerald-400" :
            status === "denied" ? "bg-rose-500/12 text-rose-400" :
            status === "expired" ? "bg-slate-500/12 text-slate-400" :
            "bg-amber-400/12 text-amber-400"
          }`}>
            {status === "approved" ? <CheckCircle2 className="h-5 w-5" /> :
             status === "denied" ? <XCircle className="h-5 w-5" /> :
             status === "expired" ? <AlertTriangle className="h-5 w-5" /> :
             <Clock className="h-5 w-5" />}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-sm text-foreground">{req.employeeName}</span>
              <StatusBadge req={req} />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              <span className="font-medium text-foreground/70">{req.requestedByCompany}</span>
              {" · "}
              {req.requestType}
            </p>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground/70">
              <CalendarDays className="h-3 w-3" />
              {new Date(req.createdAt).toLocaleDateString()} · {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
              {req.resolvedAt && (
                <span className="ml-1 text-success">
                  · Resolved {new Date(req.resolvedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {status === "approved" && req.responseData ? (
            <Button
              size="sm"
              variant="outline"
              onClick={onViewReport}
              className="gap-1 border-primary/30 text-primary hover:bg-primary/8 hover:border-primary/50 h-8"
            >
              <Eye className="h-3.5 w-3.5" /> View Report
            </Button>
          ) : status === "pending" ? (
            <span className="text-xs text-muted-foreground italic">Awaiting employee response…</span>
          ) : status === "expired" ? (
            <span className="text-xs text-muted-foreground italic">Timed out after 7 days</span>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

// ── Verification Report ──────────────────────────────────────────────
function VerificationReport({ req }: { req: VerificationRequest }) {
  const d = req.responseData as any;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const rating = Number(d.rating ?? 0);
  const ratingPct = (rating / 5) * 100;

  return (
    <div ref={ref} className="space-y-5 mt-2">
      {/* Header strip */}
      <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-500/12 text-emerald-400">
          <BadgeCheck className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold text-foreground">{d.fullName}</h3>
          <p className="text-xs text-muted-foreground">{d.designation} · {d.department}</p>
          <Badge className="mt-1.5 bg-emerald-500/12 text-emerald-400 border-emerald-500/20 text-[10px]">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Consent Granted & Verified
          </Badge>
        </div>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { icon: CalendarDays, label: "Joined", value: new Date(d.joiningDate).toLocaleDateString() },
          { icon: CalendarDays, label: "Left", value: d.exitDate ? new Date(d.exitDate).toLocaleDateString() : "Active / Present" },
          { icon: Briefcase, label: "Experience", value: `${d.experience} years` },
          { icon: User, label: "Status", value: d.status ?? "—" },
          { icon: FileText, label: "Total Reviews", value: `${d.reviewsCount ?? 0} reviews` },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl border border-border/50 bg-muted/20 p-3">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
              <Icon className="h-3.5 w-3.5" />
              <span className="text-[10px] uppercase tracking-widest font-semibold">{label}</span>
            </div>
            <p className="text-sm font-semibold text-foreground capitalize">{value}</p>
          </div>
        ))}

        {/* Rating widget */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
            <Star className="h-3.5 w-3.5" />
            <span className="text-[10px] uppercase tracking-widest font-semibold">Avg Rating</span>
          </div>
          <p className="text-2xl font-bold text-primary">{rating > 0 ? rating.toFixed(1) : "N/A"}<span className="text-sm ml-0.5">★</span></p>
          {rating > 0 && (
            <div className="mt-2 h-1.5 w-full rounded-full bg-border/60 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={inView ? { width: `${ratingPct}%` } : {}}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Salary is NEVER shown — consent-safe */}
      <div className="rounded-xl border border-border/40 bg-muted/10 p-3 flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldAlert className="h-4 w-4 text-primary shrink-0" />
        <span>Salary, private HR notes, and confidential reviews are never disclosed in this report.</span>
      </div>

      {/* Review logs */}
      {d.reviews && d.reviews.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Performance Review Logs ({d.reviewsCount})
          </h4>
          <div className="space-y-2">
            {d.reviews.map((rev: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: idx * 0.08 }}
                className="rounded-xl border border-border/50 bg-muted/20 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-foreground">{rev.period}</span>
                  <Badge variant="outline" className="text-xs font-bold">
                    {Number(rev.overall).toFixed(1)} ★
                  </Badge>
                </div>
                {rev.feedback && (
                  <p className="text-xs text-muted-foreground italic leading-relaxed">&ldquo;{rev.feedback}&rdquo;</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
