import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, UserCheck, TrendingUp, BadgeCheck, ArrowUpRight } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { stats, employees, auditLogs } from "@/lib/mock";

export const Route = createFileRoute("/app/dashboard")({
  component: Dashboard,
});

const hiringTrend = [
  { m: "Jan", hires: 12, exits: 4 }, { m: "Feb", hires: 18, exits: 6 },
  { m: "Mar", hires: 15, exits: 8 }, { m: "Apr", hires: 22, exits: 5 },
  { m: "May", hires: 28, exits: 9 }, { m: "Jun", hires: 24, exits: 7 },
];
const ratingDist = [
  { r: "5★", c: 32 }, { r: "4★", c: 64 }, { r: "3★", c: 38 }, { r: "2★", c: 11 }, { r: "1★", c: 3 },
];

function Dashboard() {
  const recent = employees.slice(0, 6);
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your workforce reputation and performance."
        actions={<Button asChild className="bg-gradient-hero text-primary-foreground"><Link to="/app/employees">View employees</Link></Button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Employees" value={stats.totalEmployees} icon={Users} trend="+12% this quarter" tone="primary" />
        <StatCard label="Active Employees" value={stats.activeEmployees} icon={UserCheck} trend="+4 this month" tone="success" />
        <StatCard label="Performance Reviews" value={stats.reviews} icon={TrendingUp} trend="86% on time" tone="accent" />
        <StatCard label="Verified Employees" value={stats.verified} icon={BadgeCheck} trend="98% verification rate" tone="warning" />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/60 bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Hiring trend</CardTitle><Badge variant="outline">Last 6 months</Badge></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hiringTrend} margin={{ left: -20, right: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="hires" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="exits" stroke="var(--color-chart-4)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-gradient-card">
          <CardHeader><CardTitle>Performance distribution</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingDist} margin={{ left: -20, right: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="r" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Bar dataKey="c" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/60">
          <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Recent employees</CardTitle><Button asChild variant="ghost" size="sm"><Link to="/app/employees">View all <ArrowUpRight className="ml-1 h-3 w-3" /></Link></Button></CardHeader>
          <CardContent className="space-y-3">
            {recent.map((e) => (
              <Link key={e.id} to="/app/employees/$id" params={{ id: e.id }} className="flex items-center gap-3 rounded-lg border border-transparent p-2 transition hover:border-border hover:bg-muted/50">
                <Avatar className="h-10 w-10"><AvatarImage src={e.photo} /><AvatarFallback>{e.fullName[0]}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5"><span className="truncate font-medium">{e.fullName}</span>{e.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary" />}</div>
                  <div className="truncate text-xs text-muted-foreground">{e.designation} · {e.department}</div>
                </div>
                <Badge variant={e.status === "active" ? "default" : "outline"} className="shrink-0">{e.status}</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardHeader><CardTitle>Recent activity</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {auditLogs.slice(0, 6).map((a) => (
              <div key={a.id} className="flex items-start gap-3 text-sm">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div className="min-w-0 flex-1">
                  <div className="truncate"><span className="font-medium">{a.user.split("@")[0]}</span> · {a.action}</div>
                  <div className="text-xs text-muted-foreground">{new Date(a.timestamp).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
