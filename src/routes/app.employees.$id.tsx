import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, Mail, Phone, Briefcase, Calendar, Award } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Radar, RadarChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis } from "recharts";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { getEmployeeById } from "@/lib/api/employees.functions";
import { listReviews } from "@/lib/api/performance.functions";
import { ListSkeleton, ChartSkeleton } from "@/components/loading-skeleton";
import { EmptyState } from "@/components/empty-state";

export const Route = createFileRoute("/app/employees/$id")({
  loader: async ({ params }) => {
    try {
      const employee = await getEmployeeById({ data: { id: params.id } });
      return { employee };
    } catch (err) {
      console.error("Employee loader error:", err);
      throw notFound();
    }
  },
  component: EmployeeDetail,
  notFoundComponent: () => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">Employee not found</h3>
      <p className="text-sm text-muted-foreground mt-1">The requested employee record does not exist or you do not have permission to view it.</p>
      <Button asChild className="mt-6" variant="outline">
        <Link to="/app/employees">Back to employees</Link>
      </Button>
    </div>
  ),
});

function EmployeeDetail() {
  const { employee: e } = Route.useLoaderData();

  const { data: myReviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["employee-reviews", e.id],
    queryFn: () => listReviews({ data: { employeeId: e.id } }),
  });

  const latest = myReviews[0];
  const company = e.company;

  const radarData = latest
    ? [
        { metric: "Productivity", v: latest.productivity },
        { metric: "Teamwork", v: latest.teamwork },
        { metric: "Communication", v: latest.communication },
        { metric: "Attendance", v: latest.attendance },
        { metric: "Leadership", v: latest.leadership },
      ]
    : [];

  const history = myReviews
    .slice()
    .reverse()
    .map((r) => ({ d: r.period, rating: r.overall }));

  const joiningDateFormatted = new Date(e.joiningDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
        <Link to="/app/employees">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to employees
        </Link>
      </Button>

      <Card className="overflow-hidden border-border/60 bg-gradient-card">
        <div className="h-24 bg-gradient-hero" />
        <CardContent className="-mt-12 p-6">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-4">
            <Avatar className="h-24 w-24 shrink-0 border-4 border-background shadow-elegant">
              {e.photoUrl && <AvatarImage src={e.photoUrl} alt={e.fullName} />}
              <AvatarFallback>{e.fullName[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 self-end">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-2xl font-bold">{e.fullName}</h2>
                {e.verified && (
                  <Badge className="bg-primary/15 text-primary hover:bg-primary/15">
                    <BadgeCheck className="mr-1 h-3 w-3" /> Verified
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {e.designation} · {e.department} · {company?.name ?? "No Company"}
              </p>
            </div>
            <div className="self-end">
              <Button asChild variant="outline" size="sm">
                <Link to="/profile/$id" params={{ id: e.id }}>
                  Public profile
                </Link>
              </Button>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Info icon={Mail} label="Email" value={e.email} />
            <Info icon={Phone} label="Phone" value={e.phone || "N/A"} />
            <Info icon={Briefcase} label="Experience" value={`${e.experience} years`} />
            <Info icon={Calendar} label="Joined" value={joiningDateFormatted} />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="performance" className="mt-6">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="reviews">Review history</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="mt-4 space-y-5">
          {reviewsLoading ? (
            <div className="grid gap-5 lg:grid-cols-2">
              <ChartSkeleton />
              <ChartSkeleton />
            </div>
          ) : myReviews.length === 0 ? (
            <div className="py-6">
              <EmptyState
                icon={TrendingUp}
                title="No performance data yet"
                description="This employee has not received any performance reviews."
              />
            </div>
          ) : (
            <>
              <div className="grid gap-5 lg:grid-cols-2">
                <Card className="border-border/60">
                  <CardHeader>
                    <CardTitle>Latest rating breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="var(--color-border)" />
                        <PolarAngleAxis dataKey="metric" tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} />
                        <PolarRadiusAxis domain={[0, 5]} tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} />
                        <Radar dataKey="v" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.35} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card className="border-border/60">
                  <CardHeader>
                    <CardTitle>Overall rating history</CardTitle>
                  </CardHeader>
                  <CardContent className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={history} margin={{ left: -20, right: 12 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={12} />
                        <YAxis domain={[0, 5]} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                        <Bar dataKey="rating" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {radarData.map((m) => (
                  <Card key={m.metric} className="border-border/60 bg-gradient-card">
                    <CardContent className="p-4">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">{m.metric}</div>
                      <div className="mt-1 font-display text-2xl font-bold">
                        {m.v.toFixed(1)} <span className="text-sm text-muted-foreground">/5</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full bg-gradient-hero" style={{ width: `${(m.v / 5) * 100}%` }} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          <Card className="border-border/60">
            <CardContent className="p-6">
              {reviewsLoading ? (
                <ListSkeleton count={3} />
              ) : myReviews.length === 0 ? (
                <EmptyState
                  icon={TrendingUp}
                  title="No review history"
                  description="Performance review history will appear here once reviews are submitted."
                />
              ) : (
                <div className="relative space-y-6 border-l border-border/60 pl-6">
                  {myReviews.map((r) => (
                    <div key={r.id} className="relative">
                      <div className="absolute -left-[27px] top-1 grid h-4 w-4 place-items-center rounded-full bg-gradient-hero shadow-elegant" />
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold">{new Date(r.createdAt).toLocaleDateString()}</span>
                        <Badge variant="outline">{r.overall.toFixed(1)} ★</Badge>
                        <span className="text-xs text-muted-foreground">by {r.reviewerName}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{r.feedback}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profile" className="mt-4 grid gap-5 lg:grid-cols-2">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {e.skills.length === 0 ? (
                <span className="text-sm text-muted-foreground">No skills listed.</span>
              ) : (
                e.skills.map((s: string) => (
                  <Badge key={s} variant="outline">
                    {s}
                  </Badge>
                ))
              )}
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4" /> No achievements recorded yet.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/40 p-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}
