import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BadgeCheck, MapPin, Briefcase, Award, ShieldOff, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "@/lib/db/index.server";
import * as schema from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { getSession } from "@/lib/auth/session.server";
import { useQuery } from "@tanstack/react-query";
import { ProfileSkeleton, ListSkeleton } from "@/components/loading-skeleton";

// ── Server Functions ────────────────────────────────────────────────

const fetchPublicProfile = createServerFn({ method: "GET" })
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const db = getDb();
    const session = await getSession();

    const rows = await db
      .select({
        employee: schema.employees,
        company: schema.companies,
      })
      .from(schema.employees)
      .leftJoin(schema.companies, eq(schema.employees.companyId, schema.companies.id))
      .where(eq(schema.employees.id, data.id))
      .limit(1);

    if (rows.length === 0) {
      return null;
    }

    const { employee: emp, company } = rows[0];

    // Check consent:
    // 1. Employee is viewing their own profile
    // 2. Employee belongs to the same company as the session user
    // 3. consentSettings.publicVisible = true
    // 4. Exists a consentGrant where grant.employeeId = emp.id and grant.companyId = session.companyId and grant.granted = true
    let authorized = false;

    if (session) {
      if (session.role === "super_admin") {
        authorized = true;
      } else if (emp.userId === session.id) {
        authorized = true;
      } else if (session.companyId && emp.companyId === session.companyId) {
        authorized = true;
      }
    }

    if (!authorized) {
      const [consent] = await db
        .select()
        .from(schema.consentSettings)
        .where(
          and(
            eq(schema.consentSettings.employeeId, emp.id),
            eq(schema.consentSettings.publicVisible, true)
          )
        )
        .limit(1);

      if (consent) {
        authorized = true;
      }
    }

    if (!authorized && session && session.companyId) {
      const [grant] = await db
        .select()
        .from(schema.consentGrants)
        .where(
          and(
            eq(schema.consentGrants.employeeId, emp.id),
            eq(schema.consentGrants.companyId, session.companyId),
            eq(schema.consentGrants.granted, true)
          )
        )
        .limit(1);

      if (grant) {
        authorized = true;
      }
    }

    if (!authorized) {
      return {
        isPrivate: true,
        employee: {
          fullName: emp.fullName,
          photoUrl: emp.photoUrl,
        },
      };
    }

    return {
      isPrivate: false,
      employee: {
        id: emp.id,
        employeeId: emp.employeeId,
        fullName: emp.fullName,
        email: emp.email,
        phone: emp.phone,
        designation: emp.designation,
        department: emp.department,
        skills: emp.skills ?? [],
        joiningDate: emp.joiningDate.toISOString(),
        exitDate: emp.exitDate ? emp.exitDate.toISOString() : null,
        experience: emp.experience,
        status: emp.status,
        photoUrl: emp.photoUrl,
        verified: emp.verified,
        rating: Number(emp.rating),
        company: company
          ? {
              name: company.name,
              location: company.location,
              logoUrl: company.logoUrl,
            }
          : null,
      },
    };
  });

const fetchPublicReviews = createServerFn({ method: "GET" })
  .validator(z.object({ employeeId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const db = getDb();
    const rows = await db
      .select({
        id: schema.performanceReviews.id,
        period: schema.performanceReviews.period,
        overall: schema.performanceReviews.overall,
        feedback: schema.performanceReviews.feedback,
        createdAt: schema.performanceReviews.createdAt,
      })
      .from(schema.performanceReviews)
      .where(eq(schema.performanceReviews.employeeId, data.employeeId))
      .orderBy(desc(schema.performanceReviews.createdAt))
      .limit(5);

    return rows.map((r) => ({
      id: r.id,
      period: r.period,
      overall: Number(r.overall),
      feedback: r.feedback,
      createdAt: r.createdAt.toISOString(),
    }));
  });

// ── Route Definition ────────────────────────────────────────────────

export const Route = createFileRoute("/profile/$id-Shreya")({
  loader: async ({ params }) => {
    try {
      const data = await fetchPublicProfile({ data: { id: params.id } });
      if (!data) throw notFound();
      return { data };
    } catch (err) {
      console.error("Profile loader error:", err);
      throw notFound();
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.data?.employee?.fullName || "Employee"} — Verified profile · WorkCred` },
      { name: "description", content: `Verified work history for ${loaderData?.data?.employee?.fullName || "Employee"}.` },
    ],
  }),
  component: PublicProfile,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center p-6 text-center">
      <Card className="max-w-md border-border/60">
        <CardContent className="p-8">
          <ShieldOff className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold">Profile not found</h2>
          <p className="text-sm text-muted-foreground mt-2">
            The profile you are looking for does not exist or has been removed.
          </p>
          <Button asChild className="mt-6" variant="outline">
            <Link to="/">Back to home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  ),
});

function PublicProfile() {
  const { data } = Route.useLoaderData();

  const { data: myReviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["public-reviews", data.employee?.id],
    queryFn: () => fetchPublicReviews({ data: { employeeId: data.employee.id! } }),
    enabled: !data.isPrivate && !!data.employee?.id,
  });

  if (data.isPrivate) {
    return (
      <div className="grid min-h-screen place-items-center bg-background p-6">
        <Card className="max-w-md border-border/60 bg-gradient-card">
          <CardContent className="p-8 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-muted text-muted-foreground">
              <ShieldOff className="h-7 w-7" />
            </div>
            <h2 className="mt-4 font-display text-xl font-bold">This profile is private</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The employee hasn't enabled public visibility or shared access with your company.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/">Back to home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const e = data.employee;
  const company = e.company;

  const joiningDateFormatted = e.joiningDate
    ? new Date(e.joiningDate).toLocaleDateString(undefined, { year: "numeric", month: "long" })
    : "";
  const exitDateFormatted = e.exitDate
    ? new Date(e.exitDate).toLocaleDateString(undefined, { year: "numeric", month: "long" })
    : "Present";

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/90">
            <BadgeCheck className="h-4 w-4" /> WorkCred · Public profile
          </Link>
        </div>
      </div>
      <div className="mx-auto -mt-10 max-w-4xl px-4 sm:px-6">
        <Card className="overflow-hidden border-border/60 bg-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
              <Avatar className="h-20 w-20 border-4 border-background shadow-elegant">
                {e.photoUrl && <AvatarImage src={e.photoUrl} alt={e.fullName} />}
                <AvatarFallback>{e.fullName[0]}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-bold">{e.fullName}</h1>
                  {e.verified && (
                    <Badge className="bg-primary/15 text-primary hover:bg-primary/15">
                      <BadgeCheck className="mr-1 h-3 w-3" /> Verified
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {e.designation} · {company?.name ?? "No Company"}
                </p>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="h-3 w-3" /> {e.experience} yrs experience
                  </span>
                  {company?.location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {company.location}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-3xl font-bold text-gradient">
                  {e.rating > 0 ? e.rating.toFixed(1) : "N/A"}
                </div>
                <div className="text-xs text-muted-foreground">Avg rating</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="my-6 grid gap-5 md:grid-cols-2">
          {/* Verified History */}
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Verified company history</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {company ? (
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <div className="grid h-10 w-10 place-items-center rounded-md bg-gradient-hero font-bold text-primary-foreground shadow-elegant">
                    {company.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{company.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {joiningDateFormatted} → {exitDateFormatted}
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10">
                    <BadgeCheck className="mr-1 h-3 w-3" /> Verified
                  </Badge>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground py-4 text-center">No company history verified.</div>
              )}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">
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

          {/* Achievements */}
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground flex items-center gap-2">
              <Award className="h-4 w-4" /> No achievements recorded yet.
            </CardContent>
          </Card>

          {/* Performance Ratings */}
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Performance ratings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {reviewsLoading ? (
                <ListSkeleton count={2} />
              ) : myReviews.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  No performance reviews shared publicly.
                </div>
              ) : (
                myReviews.map((r) => (
                  <div key={r.id} className="rounded-lg border p-3 bg-card">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{r.period}</span>
                      <Badge variant="outline">{r.overall.toFixed(1)} ★</Badge>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{r.feedback}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="pb-10 text-center text-xs text-muted-foreground">
          Profile verified by WorkCred · workcred.io
        </div>
      </div>
    </div>
  );
}
