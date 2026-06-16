import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Star, BadgeCheck, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getPerformanceRanking, getPerformanceBreakdown, listReviews } from "@/lib/api/performance.functions";
import { ListSkeleton, ChartSkeleton } from "@/components/loading-skeleton";
import { EmptyState } from "@/components/empty-state";

export const Route = createFileRoute("/app/performance")({ component: PerformancePage });

function PerformancePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Fetch top ranking employees
  const { data: ranking = [], isLoading: rankingLoading } = useQuery({
    queryKey: ["performance-ranking"],
    queryFn: () => getPerformanceRanking(),
  });

  const currentId = selectedId || ranking[0]?.id || null;

  // Fetch breakdown
  const { data: breakdownData, isLoading: breakdownLoading } = useQuery({
    queryKey: ["performance-breakdown", currentId],
    queryFn: () => getPerformanceBreakdown({ data: { employeeId: currentId! } }),
    enabled: !!currentId,
  });

  // Fetch review history
  const { data: selReviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["performance-history", currentId],
    queryFn: () => listReviews({ data: { employeeId: currentId! } }),
    enabled: !!currentId,
  });

  const selectedEmp = ranking.find((r) => r.id === currentId) || ranking[0];

  const breakdown = breakdownData?.metrics
    ? [
        { m: "Productivity", v: breakdownData.metrics.productivity },
        { m: "Teamwork", v: breakdownData.metrics.teamwork },
        { m: "Comm.", v: breakdownData.metrics.communication },
        { m: "Attendance", v: breakdownData.metrics.attendance },
        { m: "Leadership", v: breakdownData.metrics.leadership },
      ]
    : [];

  const hasRanking = ranking.length > 0;

  return (
    <div>
      <PageHeader title="Performance" description="Track ratings, reviews, and trends across your workforce." />

      {rankingLoading ? (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <ChartSkeleton />
          <Card className="border-border/60 p-5">
            <ListSkeleton count={5} />
          </Card>
        </div>
      ) : !hasRanking ? (
        <EmptyState
          icon={TrendingUp}
          title="No performance data yet"
          description="Performance reviews and rankings will appear here once employee reviews are submitted."
        />
      ) : (
        <>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
            {/* Snapshot */}
            <Card className="border-border/60">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{selectedEmp?.fullName} — performance snapshot</CardTitle>
                <Badge variant="outline">{(selectedEmp?.rating ?? 0).toFixed(1)} ★ avg</Badge>
              </CardHeader>
              <CardContent className="h-72">
                {breakdownLoading ? (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-sm text-muted-foreground">Loading snapshot...</span>
                  </div>
                ) : breakdown.length === 0 ? (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    No review details available for this employee.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={breakdown} margin={{ left: -20, right: 12 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={12} />
                      <YAxis domain={[0, 5]} stroke="var(--color-muted-foreground)" fontSize={12} />
                      <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                      <Bar name="Score" dataKey="v" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle>Top performers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                {ranking.map((e, i) => (
                  <button
                    key={e.id}
                    onClick={() => setSelectedId(e.id)}
                    className={`flex w-full items-center gap-3 rounded-lg border p-2 text-left transition hover:bg-muted/50 ${
                      currentId === e.id ? "border-primary/40 bg-primary/5" : "border-transparent"
                    }`}
                  >
                    <span className="w-5 text-center text-xs text-muted-foreground">#{i + 1}</span>
                    <Avatar className="h-8 w-8">
                      {e.photoUrl && <AvatarImage src={e.photoUrl} alt={e.fullName} />}
                      <AvatarFallback>{e.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1 truncate text-sm font-medium">
                        {e.fullName}
                        {e.verified && <BadgeCheck className="h-3 w-3 text-primary shrink-0" />}
                      </div>
                      <div className="truncate text-xs text-muted-foreground">{e.designation}</div>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold shrink-0">
                      <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                      {e.rating.toFixed(1)}
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* History */}
          {selectedEmp && (
            <Card className="mt-6 border-border/60">
              <CardHeader>
                <CardTitle>Review history — {selectedEmp.fullName}</CardTitle>
              </CardHeader>
              <CardContent>
                {reviewsLoading ? (
                  <ListSkeleton count={3} />
                ) : selReviews.length === 0 ? (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    No reviews submitted yet for this employee.
                  </div>
                ) : (
                  <div className="relative space-y-5 border-l border-border/60 pl-6">
                    {selReviews.map((r) => (
                      <div key={r.id} className="relative">
                        <div className="absolute -left-[27px] top-1 h-4 w-4 rounded-full bg-gradient-hero shadow-elegant" />
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold">{new Date(r.createdAt).toLocaleDateString()}</span>
                          <Badge variant="outline">{r.overall.toFixed(1)} ★</Badge>
                          <span className="text-xs text-muted-foreground">by {r.reviewerName}</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{r.feedback}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-4 text-right">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/app/employees/$id" params={{ id: selectedEmp.id }}>
                      Open profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
