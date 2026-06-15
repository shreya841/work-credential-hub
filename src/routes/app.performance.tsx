import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Star, BadgeCheck } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { employees, reviews } from "@/lib/mock";

export const Route = createFileRoute("/app/performance")({ component: PerformancePage });

function PerformancePage() {
  const ranked = employees.map((e) => {
    const r = reviews.filter((x) => x.employeeId === e.id);
    const avg = r.reduce((s, x) => s + x.overall, 0) / (r.length || 1);
    return { ...e, avg: Math.round(avg * 10) / 10 };
  }).sort((a, b) => b.avg - a.avg);

  const [selected, setSelected] = useState(ranked[0]);
  const sel = ranked.find((r) => r.id === selected.id) ?? ranked[0];
  const selReviews = reviews.filter((r) => r.employeeId === sel.id);
  const breakdown = selReviews[0] ? [
    { m: "Productivity", v: selReviews[0].productivity },
    { m: "Teamwork", v: selReviews[0].teamwork },
    { m: "Comm.", v: selReviews[0].communication },
    { m: "Attendance", v: selReviews[0].attendance },
    { m: "Leadership", v: selReviews[0].leadership },
  ] : [];

  return (
    <div>
      <PageHeader title="Performance" description="Track ratings, reviews, and trends across your workforce." />
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="border-border/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{sel.fullName} — performance snapshot</CardTitle>
            <Badge variant="outline">{sel.avg.toFixed(1)} ★ avg</Badge>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={breakdown} margin={{ left: -20, right: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis domain={[0, 5]} stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Bar dataKey="v" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardHeader><CardTitle>Top performers</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {ranked.slice(0, 8).map((e, i) => (
              <button key={e.id} onClick={() => setSelected(e)} className={`flex w-full items-center gap-3 rounded-lg border p-2 text-left transition hover:bg-muted/50 ${sel.id === e.id ? "border-primary/40 bg-primary/5" : "border-transparent"}`}>
                <span className="w-5 text-center text-xs text-muted-foreground">#{i + 1}</span>
                <Avatar className="h-8 w-8"><AvatarImage src={e.photo} /><AvatarFallback>{e.fullName[0]}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 truncate text-sm font-medium">{e.fullName}{e.verified && <BadgeCheck className="h-3 w-3 text-primary" />}</div>
                  <div className="truncate text-xs text-muted-foreground">{e.designation}</div>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold"><Star className="h-3.5 w-3.5 fill-warning text-warning" />{e.avg.toFixed(1)}</div>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-border/60">
        <CardHeader><CardTitle>Review history — {sel.fullName}</CardTitle></CardHeader>
        <CardContent>
          <div className="relative space-y-5 border-l border-border/60 pl-6">
            {selReviews.map((r) => (
              <div key={r.id} className="relative">
                <div className="absolute -left-[27px] top-1 h-4 w-4 rounded-full bg-gradient-hero shadow-elegant" />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{r.date}</span>
                  <Badge variant="outline">{r.overall.toFixed(1)} ★</Badge>
                  <span className="text-xs text-muted-foreground">by {r.reviewer}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{r.feedback}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <Button asChild variant="outline" size="sm"><Link to="/app/employees/$id" params={{ id: sel.id }}>Open profile</Link></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
