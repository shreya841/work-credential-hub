import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BadgeCheck, MapPin, Briefcase, Award, ShieldOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { employees, reviews, companies } from "@/lib/mock";

export const Route = createFileRoute("/profile/$id")({
  loader: ({ params }) => {
    const e = employees.find((x) => x.id === params.id);
    if (!e) throw notFound();
    return { employee: e };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.employee.fullName} — Verified profile · WorkCred` },
      { name: "description", content: `Verified work history for ${loaderData?.employee.fullName}.` },
    ],
  }),
  component: PublicProfile,
  notFoundComponent: () => <div className="p-8">Profile not found</div>,
});

function PublicProfile() {
  const { employee: e } = Route.useLoaderData();
  const company = companies.find((c) => c.id === e.companyId);
  const myReviews = reviews.filter((r) => r.employeeId === e.id);

  if (!e.consentEnabled) {
    return (
      <div className="grid min-h-screen place-items-center bg-background p-6">
        <Card className="max-w-md border-border/60 bg-gradient-card">
          <CardContent className="p-8 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-muted text-muted-foreground"><ShieldOff className="h-7 w-7" /></div>
            <h2 className="mt-4 font-display text-xl font-bold">This profile is private</h2>
            <p className="mt-2 text-sm text-muted-foreground">The employee hasn't enabled public visibility.</p>
            <Button asChild variant="outline" className="mt-6"><Link to="/">Back to home</Link></Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/90"><BadgeCheck className="h-4 w-4" /> WorkCred · Public profile</Link>
        </div>
      </div>
      <div className="mx-auto -mt-10 max-w-4xl px-4 sm:px-6">
        <Card className="overflow-hidden border-border/60 bg-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
              <Avatar className="h-20 w-20 border-4 border-background shadow-elegant"><AvatarImage src={e.photo} /><AvatarFallback>{e.fullName[0]}</AvatarFallback></Avatar>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-bold">{e.fullName}</h1>
                  {e.verified && <Badge className="bg-primary/15 text-primary hover:bg-primary/15"><BadgeCheck className="mr-1 h-3 w-3" /> Verified</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{e.designation} · {company?.name}</p>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Briefcase className="h-3 w-3" /> {e.experience} yrs experience</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {company?.location}</span>
                </div>
              </div>
              <div className="text-right"><div className="font-display text-3xl font-bold text-gradient">{e.rating.toFixed(1)}</div><div className="text-xs text-muted-foreground">Avg rating</div></div>
            </div>
          </CardContent>
        </Card>

        <div className="my-6 grid gap-5 md:grid-cols-2">
          <Card className="border-border/60"><CardHeader><CardTitle>Verified company history</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="grid h-10 w-10 place-items-center rounded-md bg-gradient-hero font-bold text-primary-foreground">{company?.logo}</div>
                <div className="min-w-0 flex-1"><div className="truncate font-medium">{company?.name}</div><div className="text-xs text-muted-foreground">{e.joiningDate} → {e.exitDate || "Present"}</div></div>
                <Badge className="bg-success/15 text-success hover:bg-success/15"><BadgeCheck className="mr-1 h-3 w-3" /> Verified</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/60"><CardHeader><CardTitle>Skills</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">{e.skills.map((s: string) => <Badge key={s} variant="outline">{s}</Badge>)}</CardContent>
          </Card>
          <Card className="border-border/60"><CardHeader><CardTitle>Achievements</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              {["Top performer Q3 2024", "Led platform migration", "Mentored 5 engineers"].map((a) => (
                <div key={a} className="flex items-center gap-2"><Award className="h-4 w-4 text-warning" /> {a}</div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-border/60"><CardHeader><CardTitle>Performance ratings</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {myReviews.slice(0, 3).map((r) => (
                <div key={r.id} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between"><span className="text-sm font-medium">{r.date}</span><Badge variant="outline">{r.overall.toFixed(1)} ★</Badge></div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{r.feedback}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="pb-10 text-center text-xs text-muted-foreground">Profile verified by WorkCred · workcred.io</div>
      </div>
    </div>
  );
}
