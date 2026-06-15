import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, ShieldOff } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { companies, employees } from "@/lib/mock";

export const Route = createFileRoute("/app/consent")({ component: Consent });

function Consent() {
  const me = employees[0];
  const [visible, setVisible] = useState(me.consentEnabled);
  const [approved, setApproved] = useState<string[]>(me.approvedCompanies);

  const toggle = (id: string) => {
    setApproved((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      toast.success(prev.includes(id) ? "Access revoked" : "Access granted");
      return next;
    });
  };

  return (
    <div>
      <PageHeader title="Consent Management" description="Control who can view your verified work history." />

      <Card className="border-border/60 bg-gradient-card">
        <CardContent className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-6">
          <div className={`grid h-12 w-12 place-items-center rounded-xl ${visible ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
            {visible ? <ShieldCheck className="h-6 w-6" /> : <ShieldOff className="h-6 w-6" />}
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-lg font-semibold">Profile visibility</h3>
            <p className="text-sm text-muted-foreground">{visible ? "Your verified profile is visible to approved companies." : "Your profile is private. No company can view it."}</p>
          </div>
          <Switch checked={visible} onCheckedChange={(v) => { setVisible(v); toast.success(v ? "Profile visible" : "Profile hidden"); }} />
        </CardContent>
      </Card>

      <Card className="mt-6 border-border/60">
        <CardHeader><CardTitle>Approved companies</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {companies.map((c) => {
            const allowed = approved.includes(c.id);
            return (
              <div key={c.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border p-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-hero font-display text-sm font-bold text-primary-foreground">{c.logo}</div>
                <div className="min-w-0"><div className="truncate font-medium">{c.name}</div><div className="truncate text-xs text-muted-foreground">{c.industry} · {c.location}</div></div>
                <div className="flex items-center gap-2">
                  {allowed ? <Badge className="bg-success/15 text-success hover:bg-success/15">Granted</Badge> : <Badge variant="outline">Not granted</Badge>}
                  <Button variant={allowed ? "outline" : "default"} size="sm" onClick={() => toggle(c.id)} className={!allowed ? "bg-gradient-hero text-primary-foreground" : ""}>
                    {allowed ? "Revoke" : "Grant access"}
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
