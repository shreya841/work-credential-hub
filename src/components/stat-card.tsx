import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatCard({
  label, value, icon: Icon, trend, tone = "primary",
}: { label: string; value: string | number; icon: LucideIcon; trend?: string; tone?: "primary" | "success" | "accent" | "warning" }) {
  const toneMap = {
    primary: "from-primary/15 to-primary/0 text-primary",
    success: "from-success/15 to-success/0 text-success",
    accent: "from-accent/20 to-accent/0 text-accent",
    warning: "from-warning/20 to-warning/0 text-warning",
  } as const;
  return (
    <Card className="relative overflow-hidden border-border/60 bg-gradient-card transition hover:shadow-elegant">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${toneMap[tone]}`} />
      <CardContent className="relative p-5">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
            <p className="mt-2 font-display text-3xl font-bold tracking-tight">{value}</p>
            {trend && <p className="mt-1 text-xs text-success">{trend}</p>}
          </div>
          <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-background/60 ${toneMap[tone].split(" ").pop()}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
