import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Building2, ShieldCheck, Sparkles } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type {
  HiringTrendPoint,
  DepartmentAnalyticsPoint,
  VerificationStatsPoint,
  RatingDistPoint,
} from "@/lib/types";

// ── Chart configs ────────────────────────────────────────────────────
const employeeGrowthConfig = {
  hires: { label: "Hires", color: "var(--color-chart-1)" },
  exits: { label: "Exits", color: "var(--color-chart-4)" },
} satisfies ChartConfig;

const departmentConfig = {
  total: { label: "Total employees", color: "var(--color-chart-2)" },
  verified: { label: "Verified employees", color: "var(--color-chart-3)" },
} satisfies ChartConfig;

const verificationConfig = {
  pending: { label: "Pending", color: "var(--color-chart-4)" },
  approved: { label: "Approved", color: "var(--color-chart-3)" },
  denied: { label: "Denied", color: "var(--color-chart-5)" },
} satisfies ChartConfig;

const ratingConfig = {
  count: { label: "Reviews", color: "var(--color-chart-1)" },
} satisfies ChartConfig;

const RATING_COLORS = [
  "oklch(0.65 0.22 22)",
  "oklch(0.72 0.18 45)",
  "oklch(0.78 0.16 80)",
  "oklch(0.70 0.17 155)",
  "oklch(0.70 0.17 220)",
];

interface ChartEmptyStateProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

function ChartEmptyState({ icon: Icon, title, description }: ChartEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center h-[280px]">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground mb-3">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-display text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-1 max-w-xs text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

interface DashboardChartsProps {
  hiringTrend: HiringTrendPoint[] | undefined;
  departmentAnalytics: DepartmentAnalyticsPoint[] | undefined;
  verificationStats: VerificationStatsPoint[] | undefined;
  ratingDist: RatingDistPoint[] | undefined;
}

export default function DashboardCharts({
  hiringTrend,
  departmentAnalytics,
  verificationStats,
  ratingDist,
}: DashboardChartsProps) {
  const [activePieIndex, setActivePieIndex] = useState<number | null>(null);

  const hasHiringData = useMemo(() => hiringTrend && hiringTrend.some((t) => t.hires > 0 || t.exits > 0), [hiringTrend]);
  const hasDepartmentData = useMemo(() => departmentAnalytics && departmentAnalytics.some((d) => d.total > 0), [departmentAnalytics]);
  const hasVerificationData = useMemo(() => verificationStats && verificationStats.some((v) => v.count > 0), [verificationStats]);
  const hasRatingData = useMemo(() => ratingDist && ratingDist.some((r) => r.count > 0), [ratingDist]);

  const totalVerifications = useMemo(
    () => verificationStats?.reduce((s, v) => s + v.count, 0) ?? 0,
    [verificationStats]
  );

  return (
    <>
      {/* Row 1: Growth & Departments */}
      <div className="grid gap-5 xl:grid-cols-2">
        {/* Employee Growth Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <Card className="border-border/60 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle>Employee Growth</CardTitle>
                <CardDescription>Hires and exits over the last 6 months</CardDescription>
              </div>
              <Badge variant="outline" className="shrink-0 border-success/30 bg-success/8 text-success">
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-success inline-block animate-pulse" />
                Live
              </Badge>
            </CardHeader>
            <CardContent>
              {!hasHiringData ? (
                <ChartEmptyState
                  icon={TrendingUp}
                  title="No employee growth yet"
                  description="Hiring and exit trends will appear once employee dates are recorded."
                />
              ) : (
                <ChartContainer config={employeeGrowthConfig} className="h-[300px] w-full">
                  <AreaChart data={hiringTrend} margin={{ left: 0, right: 16, top: 12 }}>
                    <defs>
                      <linearGradient id="hiresGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-hires)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="var(--color-hires)" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="exitsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-exits)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="var(--color-exits)" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.06} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} tick={{ fontSize: 11 }} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={10} tick={{ fontSize: 11 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area name="Hires" type="monotone" dataKey="hires" stroke="var(--color-hires)" strokeWidth={2} fill="url(#hiresGradient)" />
                    <Area name="Exits" type="monotone" dataKey="exits" stroke="var(--color-exits)" strokeWidth={2} fill="url(#exitsGradient)" />
                  </AreaChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Department Analytics Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-border/60 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Department Analytics</CardTitle>
              <CardDescription>Total vs verified employees by department</CardDescription>
            </CardHeader>
            <CardContent>
              {!hasDepartmentData ? (
                <ChartEmptyState
                  icon={Building2}
                  title="No department data"
                  description="Department analytics will appear once employees are registered with departments."
                />
              ) : (
                <ChartContainer config={departmentConfig} className="h-[300px] w-full">
                  <BarChart data={departmentAnalytics} margin={{ left: 0, right: 16, top: 12 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.06} />
                    <XAxis dataKey="department" tickLine={false} axisLine={false} tickMargin={10} tick={{ fontSize: 11 }} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={10} tick={{ fontSize: 11 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar name="Total employees" dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
                    <Bar name="Verified employees" dataKey="verified" fill="var(--color-verified)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Row 2: Pie + Bar */}
      <div className="grid gap-5 xl:grid-cols-2 mt-5">
        {/* Verification Statistics Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <Card className="border-border/60 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Verification statistics</CardTitle>
              <CardDescription>Status of background check requests</CardDescription>
            </CardHeader>
            <CardContent>
              {!hasVerificationData ? (
                <ChartEmptyState
                  icon={ShieldCheck}
                  title="No verification data"
                  description="Verification statistics will appear once requests are initiated."
                />
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
                  <ChartContainer config={verificationConfig} className="mx-auto aspect-square h-[200px] w-[200px]">
                    <PieChart>
                      <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                      <Pie
                        data={verificationStats}
                        dataKey="count"
                        nameKey="status"
                        innerRadius={60}
                        strokeWidth={5}
                      >
                        {verificationStats?.map((entry) => (
                          <Cell key={entry.status} fill={`var(--color-${entry.status})`} />
                        ))}
                        <Label
                          content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                              return (
                                <text
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                >
                                  <tspan
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    className="fill-foreground text-3xl font-bold"
                                  >
                                    {totalVerifications}
                                  </tspan>
                                  <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 24}
                                    className="fill-muted-foreground text-xs"
                                  >
                                    Requests
                                  </tspan>
                                </text>
                              );
                            }
                          }}
                        />
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                  {/* Legend */}
                  <div className="flex-1 space-y-3 w-full">
                    {verificationStats?.map((entry) => {
                      const pct = totalVerifications > 0 ? Math.round((entry.count / totalVerifications) * 100) : 0;
                      return (
                        <div key={entry.status} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="capitalize font-medium text-foreground">{entry.status}</span>
                            <span className="text-muted-foreground tabular-nums">{entry.count} ({pct}%)</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-border/60 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: `var(--color-${entry.status})` }}
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Rating Distribution Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.44 }}
        >
          <Card className="border-border/60 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
              <CardDescription>Performance review spread across rating buckets</CardDescription>
            </CardHeader>
            <CardContent>
              {!hasRatingData ? (
                <ChartEmptyState
                  icon={Sparkles}
                  title="No ratings yet"
                  description="Rating distribution will appear once performance reviews are submitted."
                />
              ) : (
                <ChartContainer config={ratingConfig} className="h-[300px] w-full">
                  <BarChart data={ratingDist} margin={{ left: 0, right: 16, top: 12 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.06} />
                    <XAxis dataKey="rating" tickLine={false} axisLine={false} tickMargin={10} tick={{ fontSize: 11 }} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={10} allowDecimals={false} tick={{ fontSize: 11 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar name="Reviews" dataKey="count" radius={[8, 8, 0, 0]} isAnimationActive animationDuration={900}>
                      {ratingDist?.map((_, idx) => (
                        <Cell key={idx} fill={RATING_COLORS[idx % RATING_COLORS.length]} fillOpacity={0.85} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
