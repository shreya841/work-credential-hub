import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { ShieldCheck, ShieldOff, Building2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getConsentSettings,
  updateConsentVisibility,
  listConsentGrants,
  grantAccess,
  revokeAccess,
} from "@/lib/api/consent.functions";
import { ListSkeleton } from "@/components/loading-skeleton";
import { EmptyState } from "@/components/empty-state";

export const Route = createFileRoute("/app/consent-Shreya")({ component: Consent });

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

  const visibilityMutation = useMutation({
    mutationFn: (visible: boolean) => updateConsentVisibility({ data: { publicVisible: visible } }),
    onSuccess: (updated) => {
      queryClient.setQueryData(["consent-settings"], updated);
      toast.success(updated.publicVisible ? "Profile is now visible" : "Profile is now private");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to update profile visibility");
    },
  });

  const toggleAccessMutation = useMutation({
    mutationFn: async ({ companyId, currentlyGranted }: { companyId: string; currentlyGranted: boolean }) => {
      if (currentlyGranted) {
        return revokeAccess({ data: { companyId } });
      } else {
        return grantAccess({ data: { companyId } });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consent-grants"] });
      toast.success("Access updated successfully");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to update access");
    },
  });

  const visible = settings?.publicVisible ?? false;

  return (
    <div>
      <PageHeader title="Consent Management" description="Control who can view your verified work history." />

      {settingsLoading ? (
        <Card className="border-border/60 bg-gradient-card">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-5 w-32 bg-muted animate-pulse rounded" />
              <div className="h-4 w-64 bg-muted animate-pulse rounded" />
            </div>
            <div className="h-6 w-10 bg-muted animate-pulse rounded-full" />
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border/60 bg-gradient-card">
          <CardContent className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-6">
            <div
              className={`grid h-12 w-12 place-items-center rounded-xl transition-colors ${
                visible ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"
              }`}
            >
              {visible ? <ShieldCheck className="h-6 w-6" /> : <ShieldOff className="h-6 w-6" />}
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-lg font-semibold">Profile visibility</h3>
              <p className="text-sm text-muted-foreground">
                {visible
                  ? "Your verified profile is visible to approved companies."
                  : "Your profile is private. No company can view it unless specifically granted."}
              </p>
            </div>
            <Switch
              checked={visible}
              onCheckedChange={(v) => visibilityMutation.mutate(v)}
              disabled={visibilityMutation.isPending}
            />
          </CardContent>
        </Card>
      )}

      <Card className="mt-6 border-border/60">
        <CardHeader>
          <CardTitle>Approved companies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {grantsLoading ? (
            <ListSkeleton count={4} />
          ) : grants.length === 0 ? (
            <EmptyState
              icon={Building2}
              title="No companies available"
              description="There are no other companies registered on the platform to share access with."
            />
          ) : (
            grants.map((c) => {
              const allowed = c.granted;
              return (
                <div
                  key={c.companyId}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border p-3"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-hero font-display text-sm font-bold text-primary-foreground shadow-elegant">
                    {c.companyName.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-medium">{c.companyName}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {c.companyIndustry} · {c.companyLocation || "No location"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {allowed ? (
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 shrink-0">
                        Granted
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="shrink-0">
                        Not granted
                      </Badge>
                    )}
                    <Button
                      variant={allowed ? "outline" : "default"}
                      size="sm"
                      onClick={() =>
                        toggleAccessMutation.mutate({ companyId: c.companyId, currentlyGranted: allowed })
                      }
                      className={!allowed ? "bg-gradient-hero text-primary-foreground shadow-elegant" : ""}
                      disabled={toggleAccessMutation.isPending}
                    >
                      {allowed ? "Revoke" : "Grant access"}
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
