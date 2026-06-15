import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck, ShieldCheck, Search, TrendingUp, Users, Building2,
  ArrowRight, CheckCircle2, Star, Lock, Zap, Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WorkCred — The Verified Employee Reputation Platform" },
      { name: "description", content: "Companies share, view and verify employee performance histories with consent. Hire with confidence on WorkCred." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Logos />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-hero text-primary-foreground shadow-elegant">
            <BadgeCheck className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-bold">WorkCred</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm"><Link to="/auth/login">Sign in</Link></Button>
          <Button asChild size="sm" className="bg-gradient-hero text-primary-foreground shadow-elegant hover:opacity-90">
            <Link to="/auth/signup">Get started <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute top-40 right-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-6 border-primary/30 bg-primary/5 text-primary">
            <ShieldCheck className="mr-1.5 h-3.5 w-3.5" /> Trusted by 500+ enterprise HR teams
          </Badge>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Hire with proof, not <span className="text-gradient">promises.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            WorkCred is the verified employee reputation platform. Companies share performance histories,
            employees control consent, and HR teams verify candidates in seconds — not weeks.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-hero text-primary-foreground shadow-elegant hover:opacity-90">
              <Link to="/auth/signup">Start free trial <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/app/dashboard">View live demo</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            {["SOC 2 Type II", "GDPR compliant", "End-to-end encrypted"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" />{t}</span>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-border/60 bg-gradient-card p-2 shadow-glow">
          <div className="rounded-xl bg-background/60 p-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { l: "Verified profiles", v: "120K+" },
                { l: "Partner companies", v: "500+" },
                { l: "Avg. verify time", v: "8 sec" },
                { l: "Customer NPS", v: "72" },
              ].map((s) => (
                <div key={s.l} className="rounded-lg bg-background/50 p-4 text-center">
                  <div className="font-display text-2xl font-bold text-gradient">{s.v}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Logos() {
  return (
    <section className="border-y border-border/40 bg-muted/20 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mb-4 text-center text-xs uppercase tracking-widest text-muted-foreground">Powering reputation for teams at</p>
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
          {["Acme", "Northwind", "Lumen", "Vega", "Orbit", "Helix"].map((b) => (
            <span key={b} className="font-display text-xl font-bold tracking-tight text-muted-foreground">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: ShieldCheck, title: "Verified history", desc: "Company-attested employment, performance, and tenure data — cryptographically signed." },
    { icon: Lock, title: "Employee consent", desc: "Workers control who sees what, with granular per-company access approvals." },
    { icon: Search, title: "Instant verification", desc: "Look up a candidate by name, email, or employee ID and get the full picture in seconds." },
    { icon: TrendingUp, title: "Performance insights", desc: "Standardized ratings across productivity, teamwork, leadership and more." },
    { icon: Users, title: "Multi-tenant teams", desc: "Onboard your entire HR org with role-based access for admins, recruiters and managers." },
    { icon: Zap, title: "Real-time audit", desc: "Every access, edit and login is logged in an immutable audit trail." },
  ];
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">Platform</Badge>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Everything HR needs to trust the hire</h2>
          <p className="mt-3 text-muted-foreground">Reputation, performance, and verification — unified in one platform.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <Card key={f.title} className="group border-border/60 bg-gradient-card transition hover:-translate-y-1 hover:shadow-elegant">
              <CardContent className="p-6">
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary group-hover:bg-gradient-hero group-hover:text-primary-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Companies onboard", desc: "Your team uploads employee records and performance reviews to a private, verified workspace." },
    { n: "02", title: "Employees consent", desc: "Workers approve which companies can view their profile, with full control at any time." },
    { n: "03", title: "HR verifies instantly", desc: "Recruiters search by name, email or ID and get the verified work history in seconds." },
  ];
  return (
    <section id="how" className="border-y border-border/40 bg-muted/20 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">How it works</Badge>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Verification in three steps</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-xl border border-border/60 bg-card p-6">
              <div className="font-display text-5xl font-bold text-gradient">{s.n}</div>
              <h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { quote: "We cut our background-check cycle from 11 days to under an hour. WorkCred is a category-defining product.", name: "Sara Cohen", role: "VP People, Acme" },
    { quote: "Finally a platform where employees own their reputation. The consent model is exactly right.", name: "Marcus Okafor", role: "Head of TA, Northwind" },
    { quote: "Our HR org runs on WorkCred. The audit trail alone is worth the price of admission.", name: "Priya Sharma", role: "CHRO, Lumen Health" },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">Loved by HR leaders</Badge>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Teams that vouch for us</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.map((q) => (
            <Card key={q.name} className="border-border/60 bg-gradient-card">
              <CardContent className="p-6">
                <div className="flex gap-0.5 text-warning">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-sm leading-relaxed">"{q.quote}"</p>
                <div className="mt-6 border-t border-border/60 pt-4">
                  <div className="font-semibold">{q.name}</div>
                  <div className="text-xs text-muted-foreground">{q.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    { name: "Starter", price: "$0", period: "/forever", desc: "For small teams exploring WorkCred.", features: ["Up to 25 employees", "Basic verification", "Email support"], cta: "Start free" },
    { name: "Growth", price: "$199", period: "/mo", desc: "For scaling HR organizations.", features: ["Up to 500 employees", "Advanced performance reviews", "HR Search & consent management", "Priority support"], cta: "Start trial", featured: true },
    { name: "Enterprise", price: "Custom", period: "", desc: "For large enterprises with custom needs.", features: ["Unlimited employees", "SSO, SAML, audit exports", "Dedicated success manager", "Custom SLAs"], cta: "Talk to sales" },
  ];
  return (
    <section id="pricing" className="border-y border-border/40 bg-muted/20 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">Pricing</Badge>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Fair pricing for any team</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <Card key={t.name} className={`relative border-border/60 ${t.featured ? "bg-gradient-card shadow-glow ring-2 ring-primary" : "bg-card"}`}>
              {t.featured && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-hero text-primary-foreground">Most popular</Badge>}
              <CardContent className="p-7">
                <h3 className="font-display text-xl font-semibold">{t.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold">{t.price}</span>
                  <span className="text-sm text-muted-foreground">{t.period}</span>
                </div>
                <Button asChild className={`mt-6 w-full ${t.featured ? "bg-gradient-hero text-primary-foreground" : ""}`} variant={t.featured ? "default" : "outline"}>
                  <Link to="/auth/signup">{t.cta}</Link>
                </Button>
                <ul className="mt-6 space-y-2 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /><span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-2xl border border-border/60 bg-gradient-card p-10 shadow-elegant">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <Badge variant="outline" className="mb-4">Contact</Badge>
              <h2 className="font-display text-3xl font-bold">Talk to our team</h2>
              <p className="mt-3 text-muted-foreground">Curious how WorkCred fits your HR stack? We'll show you a demo tailored to your workflow.</p>
              <div className="mt-6 space-y-2 text-sm">
                <div className="flex items-center gap-2"><Globe className="h-4 w-4 text-primary" /> workcred.io</div>
                <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-primary" /> San Francisco · London · Bangalore</div>
              </div>
            </div>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="Full name" />
              <input className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="Work email" type="email" />
              <textarea className="min-h-[100px] w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="Tell us about your team…" />
              <Button className="w-full bg-gradient-hero text-primary-foreground">Request a demo</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-hero text-primary-foreground"><BadgeCheck className="h-4 w-4" /></div>
          <span className="font-display font-bold">WorkCred</span>
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Security</a>
        </div>
      </div>
    </footer>
  );
}
