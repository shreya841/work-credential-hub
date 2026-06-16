import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, UserCheck, TrendingUp, BadgeCheck, ArrowUpRight, Clock, Building2, ShieldAlert } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import {
  getDashboardStats,
  getHiringTrend,
  getRatingDistribution,
  getRecentEmployees,
  getRecentActivity,
  getDepartmentAnalytics,
  getVerificationStats,
} from "@/lib/api/dashboard.functions";
import { getPerformanceRanking } from "@/lib/api/performance.functions";
import { StatCardSkeleton, ChartSkeleton, ListSkeleton } from "@/components/loading-skeleton";
import { EmptyState } from "@/components/empty-state";

export const Route = createFileRoute("/app/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => getDashboardStats(),
  });

  const { data: hiringTrend, isLoading: trendLoading } = useQuery({
    queryKey: ["dashboard-hiring-trend"],
    queryFn: () => getHiringTrend(),
  });

  const { data: ratingDist, isLoading: ratingLoading } = useQuery({
    queryKey: ["dashboard-rating-dist"],
    queryFn: () => getRatingDistribution(),
  });

  const { data: recentEmployees, isLoading: recentLoading } = useQuery({
    queryKey: ["dashboard-recent-employees"],
    queryFn: () => getRecentEmployees(),
  });

  const { data: recentActivity, isLoading: activityLoading } = useQuery({
    queryKey: ["dashboard-recent-activity"],
    queryFn: () => getRecentActivity(),
  });

  const { data: deptAnalytics, isLoading: deptLoading } = useQuery({
    queryKey: ["dashboard-dept-analytics"],
    queryFn: () => getDepartmentAnalytics(),
  });

  const { data: verifStats, isLoading: verifLoading } = useQuery({
    queryKey: ["dashboard-verif-stats"],
    queryFn: () => getVerificationStats(),
  });

  const { data: topPerformers, isLoading: topLoading } = useQuery({
    queryKey: ["dashboard-top-performers"],
    queryFn: () => getPerformanceRanking(),
  });

  const hasHiringData = hiringTrend && hiringTrend.some(t => t.hires > 0 || t.exits > 0);
  const hasRatingData = ratingDist && ratingDist.some(r => r.count > 0);
  const hasDeptData = deptAnalytics && deptAnalytics.length > 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your workforce reputation and performance."
        actions={
          <Button asChild className="bg-gradient-hero text-primary-foreground shadow-elegant">
            <Link to="/app/employees">View employees</Link>
          </Button>
        }
      />

      {/* Stats Cards */}
      {statsLoading || !stats ? (
        <StatCardSkeleton />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Employees" value={stats.totalEmployees} icon={Users} tone="primary" />
          <StatCard label="Active Employees" value={stats.activeEmployees} icon={UserCheck} tone="success" />
          <StatCard label="Performance Reviews" value={stats.totalReviews} icon={TrendingUp} tone="accent" />
          <StatCard label="Verified Employees" value={stats.verifiedEmployees} icon={BadgeCheck} tone="warning" />
        </div>
      )}

      {/* Row 1: Hiring Trend & Rating Distribution */}
      <div className="grid gap-5 lg:grid-cols-3">
        {trendLoading ? (
          <div className="lg:col-span-2"><ChartSkeleton /></div>
        ) : (
          <Card className="lg:col-span-2 border-border/60 bg-gradient-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Hiring trend</CardTitle>
                <CardDescription>Employee growth & exits</CardDescription>
              </div>
              <Badge variant="outline">Last 6 months</Badge>
            </CardHeader>
            <CardContent className="h-64">
              {!hasHiringData ? (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  No hiring or exit data recorded in the last 6 months.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hiringTrend} margin={{ left: -20, right: 12 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                    <Line name="Hires" type="monotone" dataKey="hires" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={{ r: 3 }} />
                    <Line name="Exits" type="monotone" dataKey="exits" stroke="var(--color-chart-4)" strokeWidth={2.5} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        )}

        {ratingLoading ? (
          <ChartSkeleton />
        ) : (
          <Card className="border-border/60 bg-gradient-card">
            <CardHeader>
              <CardTitle>Performance distribution</CardTitle>
              <CardDescription>Overall rating distribution count</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              {!hasRatingData ? (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  No reviews submitted yet.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ratingDist} margin={{ left: -20, right: 12 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="rating" stroke="var(--color-muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                    <Bar name="Count" dataKey="count" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Row 2: Department Analytics & Verification Stats */}
      <div className="grid gap-5 lg:grid-cols-3">
        {deptLoading ? (
          <div className="lg:col-span-2"><ChartSkeleton /></div>
        ) : (
          <Card className="lg:col-span-2 border-border/60 bg-gradient-card">
            <CardHeader>
              <CardTitle>Department analytics</CardTitle>
              <CardDescription>Average rating and employee count per department</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              {!hasDeptData ? (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  No department performance analytics available.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deptAnalytics} margin={{ left: -20, right: 12 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="department" stroke="var(--color-muted-foreground)" fontSize={12} />
                    <YAxis yAxisId="left" domain={[0, 5]} stroke="var(--color-muted-foreground)" fontSize={12} />
                    <YAxis yAxisId="right" orientation="right" stroke="var(--color-muted-foreground)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                    <Bar yAxisId="left" name="Avg Rating" dataKey="avg_rating" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} maxBarSize={30} />
                    <Bar yAxisId="right" name="Employees" dataKey="employee_count" fill="var(--color-chart-3)" radius={[6, 6, 0, 0]} maxBarSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        )}

        {verifLoading ? (
          <ChartSkeleton />
        ) : (
          <Card className="border-border/60 bg-gradient-card">
            <CardHeader>
              <CardTitle>Verification statistics</CardTitle>
              <CardDescription>Breakdown of verification requests</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-center h-64">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border/40 bg-muted/20 p-3 text-center">
                  <div className="text-xl font-bold text-amber-500">{verifStats?.pending ?? 0}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Pending</div>
                </div>
                <div className="rounded-xl border border-border/40 bg-muted/20 p-3 text-center">
                  <div className="text-xl font-bold text-emerald-500">{verifStats?.approved ?? 0}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Approved</div>
                </div>
                <div className="rounded-xl border border-border/40 bg-muted/20 p-3 text-center">
                  <div className="text-xl font-bold text-rose-500">{verifStats?.denied ?? 0}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Denied</div>
                </div>
                <div className="rounded-xl border border-border/40 bg-muted/20 p-3 text-center">
                  <div className="text-xl font-bold text-muted-foreground">{verifStats?.expired ?? 0}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Expired</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Row 3: Lists (Recent Employees, Top Performers, Recent Activity) */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Recent Employees */}
        <Card className="border-border/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent employees</CardTitle>
              <CardDescription>Recently registered employees</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/app/employees">
                View all <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentLoading ? (
              <ListSkeleton count={4} />
            ) : !recentEmployees || recentEmployees.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No employees yet"
                description="Register employee records to start."
              />
            ) : (
              recentEmployees.slice(0, 4).map((e) => (
                <Link
                  key={e.id}
                  to="/app/employees/$id"
                  params={{ id: e.id }}
                  className="flex items-center gap-3 rounded-lg border border-transparent p-2 transition hover:border-border hover:bg-muted/50"
                >
                  <Avatar className="h-9 w-9">
                    {e.photoUrl && <AvatarImage src={e.photoUrl} />}
                    <AvatarFallback>{e.fullName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span className="truncate text-sm font-medium">{e.fullName}</span>
                      {e.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary" />}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {e.designation}
                    </div>
                  </div>
                  <Badge variant={e.status === "active" ? "default" : "outline"} className="shrink-0 text-[10px] px-1.5 py-0.5 capitalize">
                    {e.status}
                  </Badge>
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="border-border/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top performers</CardTitle>
              <CardDescription>Highest rated employees</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/app/performance">
                Rankings <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {topLoading ? (
              <ListSkeleton count={4} />
            ) : !topPerformers || topPerformers.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                No ratings submitted yet.
              </div>
            ) : (
              topPerformers.slice(0, 4).map((e: any, idx) => (
                <Link
                  key={e.id}
                  to="/app/employees/$id"
                  params={{ id: e.id }}
                  className="flex items-center gap-3 rounded-lg border border-transparent p-2 transition hover:border-border hover:bg-muted/50"
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary/10 text-xs font-semibold text-primary">
                    #{idx + 1}
                  </div>
                  <Avatar className="h-8 w-8">
                    {e.photoUrl && <AvatarImage src={e.photoUrl} />}
                    <AvatarFallback>{e.fullName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{e.fullName}</div>
                    <div className="truncate text-xs text-muted-foreground">{e.designation}</div>
                  </div>
                  <Badge variant="outline" className="shrink-0 border-warning/30 bg-warning/5 text-warning font-semibold text-[10px] px-1.5 py-0.5">
                    {(e.rating ?? 0).toFixed(1)} ★
                  </Badge>
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Platform audit events log</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {activityLoading ? (
              <ListSkeleton count={4} />
            ) : !recentActivity || recentActivity.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                No activity logs recorded.
              </div>
            ) : (
              recentActivity.slice(0, 4).map((a) => (
                <div key={a.id} className="flex items-start gap-3 text-sm">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-muted-foreground truncate">
                      <span className="font-semibold text-foreground">{a.userName}</span> · {a.action}
                    </div>
                    <div className="text-[10px] text-muted-foreground flex items-center mt-0.5 gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(a.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
