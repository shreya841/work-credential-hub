import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ShieldOff,
  Building2,
  Clock,
  CheckCircle2,
  XCircle,
  Globe,
  Lock,
  RefreshCw,
  BadgeCheck,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getConsentSettings,
  updateConsentVisibility,
  listConsentGrants,
  grantAccess,
  revokeAccess,
} from "@/lib/api/consent.functions";
import {
  listVerificationRequests,
  resolveVerificationRequest,
} from "@/lib/api/verification.functions";
import { ListSkeleton } from "@/components/loading-skeleton";
import { EmptyState } from "@/components/empty-state";

export const Route = createFileRoute("/app/consent")({ component: Consent });

// ── Animation variants ───────────────────────────────────────────────
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const slideUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" as const } },
};

function Consent() {
  const queryClient = useQueryClient();

  const { data: settings, isLoading: settingsLoading } = useQuery({
    queryKey: ["consent-settings"],
    queryFn: () => getConsentSettings(),
  });

  const { data: grants = [], isLoading: grantsLoading } = useQuery({
    queryKey: ["consent-grants"],
    queryFn: () => listConsentGrants(),
  });

  const { data: requestData, isLoading: requestsLoading } = useQuery({
    queryKey: ["employee-verification-requests"],
    queryFn: () => listVerificationRequests({ data: { page: 1, pageSize: 50 } }),
    refetchInterval: 30_000,
  });

  const resolveMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "approved" | "denied" }) =>
      resolveVerificationRequest({ data: { id, status } }),
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ["employee-verification-requests"] });
      queryClient.invalidateQueries({ queryKey: ["verification-requests"] });
      toast.success(`Request ${status === "approved" ? "approved" : "denied"} successfully`);
    },
    onError: (err: any) => toast.error(err.message || "Failed to resolve request"),
  });

  const visibilityMutation = useMutation({
    mutationFn: (visible: boolean) =>
      updateConsentVisibility({ data: { publicVisible: visible } }),
    onSuccess: (updated) => {
      queryClient.setQueryData(["consent-settings"], updated);
      toast.success(updated.publicVisible ? "Profile is now public" : "Profile is now private");
    },
    onError: (err: any) => toast.error(err.message || "Failed to update visibility"),
  });

  const toggleAccessMutation = useMutation({
    mutationFn: async ({ companyId, currentlyGranted }: { companyId: string; currentlyGranted: boolean }) =>
      currentlyGranted
        ? revokeAccess({ data: { companyId } })
        : grantAccess({ data: { companyId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consent-grants"] });
      toast.success("Company access updated");
    },
    onError: (err: any) => toast.error(err.message || "Failed to update access"),
  });

  const visible = settings?.publicVisible ?? false;
  const requests = (requestData as any)?.data ?? [];
  const pendingCount = requests.filter((r: any) => r.status === "pending").length;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <PageHeader
          title="Consent Management"
          description="Control who can view your verified work history and approve background checks."
          actions={
            pendingCount > 0 ? (
              <Badge className="bg-amber-400/12 text-amber-400 border-amber-400/25 animate-pulse">
                <Clock className="h-3 w-3 mr-1" />
                {pendingCount} pending request{pendingCount > 1 ? "s" : ""}
              </Badge>
            ) : undefined
          }
        />
      </motion.div>

      {/* ── 1. Profile Visibility Toggle ───────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <Card className="border-border/60 bg-card/85 backdrop-blur-sm overflow-hidden">
          <div className={`h-0.5 w-full transition-all duration-500 ${visible ? "bg-gradient-to-r from-emerald-500 via-primary to-transparent" : "bg-gradient-to-r from-muted to-transparent"}`} />
          <CardContent className="p-5">
            {settingsLoading ? (
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-5 w-36 bg-muted animate-pulse rounded" />
                  <div className="h-3.5 w-64 bg-muted animate-pulse rounded" />
                </div>
                <div className="h-6 w-11 bg-muted animate-pulse rounded-full" />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ scale: visible ? 1.05 : 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl transition-all duration-300 ${
                    visible
                      ? "bg-emerald-500/12 text-emerald-400 ring-1 ring-emerald-500/25"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {visible ? <Globe className="h-7 w-7" /> : <Lock className="h-7 w-7" />}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-semibold">
                    {visible ? "Profile is Public" : "Profile is Private"}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {visible
                      ? "Approved companies can view your verified work history and trust score."
                      : "Your profile is hidden. No company can access it unless you specifically grant them access."}
                  </p>
                </div>
                <Switch
                  checked={visible}
                  onCheckedChange={(v) => visibilityMutation.mutate(v)}
                  disabled={visibilityMutation.isPending}
                  className="shrink-0"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* ── 2. Verification Requests from HR ───────────────────── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.18 }}>
        <Card className="border-border/60 bg-card/85 backdrop-blur-sm overflow-hidden">
          <div className="h-0.5 w-full bg-gradient-to-r from-amber-400 via-primary to-transparent" />
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Background Check Requests
                  {pendingCount > 0 && (
                    <motion.span
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400/15 px-1 text-[10px] font-bold text-amber-400"
                    >
                      {pendingCount}
                    </motion.span>
                  )}
                </CardTitle>
                <CardDescription>
                  Review and approve background verification requests from HR managers.
                  Auto-refreshes every 30 seconds.
                </CardDescription>
              </div>
              <Badge variant="outline" className="shrink-0 border-success/30 bg-success/8 text-success text-[10px]">
                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-success inline-block animate-pulse" />
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {requestsLoading ? (
              <ListSkeleton count={3} />
            ) : requests.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                <ShieldCheck className="h-10 w-10 mx-auto mb-3 text-muted-foreground/40" />
                No verification requests received yet.
              </div>
            ) : (
              <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3">
                <AnimatePresence>
                  {requests.map((r: any) => (
                    <motion.div
                      key={r.id}
                      variants={slideUp}
                      layout
                      whileHover={{ y: -2 }}
                      className="group overflow-hidden rounded-xl border border-border/50 bg-background/40 p-4 backdrop-blur-sm transition-all duration-200 hover:border-primary/25 hover:shadow-elegant"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        {/* Company avatar */}
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 font-display text-sm font-bold text-primary ring-1 ring-primary/20">
                          {r.requestedByCompany.substring(0, 2).toUpperCase()}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-semibold text-sm text-foreground">{r.requestedByCompany}</span>
                            <Badge variant="outline" className="text-[10px] capitalize">
                              {r.requestType}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Requested by <span className="font-medium text-foreground/80">{r.requestedByName}</span>
                            {" · "}
                            {new Date(r.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          {r.status === "pending" ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-rose-500/30 text-rose-400 hover:bg-rose-500/8 hover:border-rose-500/50 h-8 gap-1"
                                onClick={() => resolveMutation.mutate({ id: r.id, status: "denied" })}
                                disabled={resolveMutation.isPending}
                              >
                                <XCircle className="h-3.5 w-3.5" /> Deny
                              </Button>
                              <Button
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 gap-1"
                                onClick={() => resolveMutation.mutate({ id: r.id, status: "approved" })}
                                disabled={resolveMutation.isPending}
                              >
                                {resolveMutation.isPending
                                  ? <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                  : <CheckCircle2 className="h-3.5 w-3.5" />}
                                Approve
                              </Button>
                            </>
                          ) : r.status === "approved" ? (
                            <Badge className="bg-emerald-500/12 text-emerald-400 border-emerald-500/20 gap-1">
                              <CheckCircle2 className="h-3 w-3" /> Approved
                            </Badge>
                          ) : (
                            <Badge className="bg-rose-500/12 text-rose-400 border-rose-500/20 gap-1">
                              <XCircle className="h-3 w-3" /> Denied
                            </Badge>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* ── 3. Approved Companies Access Manager ───────────────── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.26 }}>
        <Card className="border-border/60 bg-card/85 backdrop-blur-sm overflow-hidden">
          <div className="h-0.5 w-full bg-gradient-to-r from-accent via-emerald-500 to-transparent" />
          <CardHeader>
            <CardTitle>Company Access Manager</CardTitle>
            <CardDescription>
              Manually grant or revoke access to your verified profile for specific companies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {grantsLoading ? (
              <ListSkeleton count={4} />
            ) : grants.length === 0 ? (
              <EmptyState
                icon={Building2}
                title="No companies available"
                description="There are no other verified companies on the platform yet."
              />
            ) : (
              <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-2">
                {grants.map((c) => {
                  const allowed = c.granted;
                  return (
                    <motion.div
                      key={c.companyId}
                      variants={slideUp}
                      whileHover={{ y: -1 }}
                      className="group flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-3 transition-all duration-200 hover:border-primary/20 hover:shadow-elegant"
                    >
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 font-display text-sm font-bold text-primary">
                        {c.companyName.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-sm text-foreground truncate flex items-center gap-1.5">
                          {c.companyName}
                          {allowed && <BadgeCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {c.companyIndustry} · {c.companyLocation || "No location"}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {allowed ? (
                          <Badge className="bg-emerald-500/12 text-emerald-400 border-emerald-500/20 text-xs">
                            Granted
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs text-muted-foreground">
                            No access
                          </Badge>
                        )}
                        <Button
                          variant={allowed ? "outline" : "default"}
                          size="sm"
                          onClick={() =>
                            toggleAccessMutation.mutate({ companyId: c.companyId, currentlyGranted: allowed })
                          }
                          className={`h-8 text-xs ${!allowed ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-elegant" : "border-border/60 hover:border-rose-500/30 hover:text-rose-400"}`}
                          disabled={toggleAccessMutation.isPending}
                        >
                          {allowed ? "Revoke" : "Grant Access"}
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
