import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Lock,
  Moon,
  Play,
  Search,
  SendHorizonal,
  ShieldCheck,
  Sparkles,
  Sun,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/theme-provider";

type LandingMetricKey =
  | "totalProfessionals"
  | "verifiedEmployees"
  | "companies"
  | "verificationRequests";

type LandingMetrics = Record<LandingMetricKey, number | null>;

const emptyMetrics: LandingMetrics = {
  totalProfessionals: null,
  verifiedEmployees: null,
  companies: null,
  verificationRequests: null,
};

const metricLabels: Array<{ key: LandingMetricKey; label: string }> = [
  { key: "totalProfessionals", label: "Total Professionals" },
  { key: "verifiedEmployees", label: "Verified Employees" },
  { key: "companies", label: "Companies" },
  { key: "verificationRequests", label: "Verification Requests" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WorkCred - Verify talent. Build trust. Hire smarter." },
      {
        name: "description",
        content:
          "WorkCred helps companies verify employee histories with consent-first workflows, trusted records, and faster hiring decisions.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <Nav />
      <Hero />
      <Metrics />
      <Features />
      <HowItWorks />
      <Security />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-hero text-primary-foreground shadow-elegant">
            <BadgeCheck className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-bold tracking-normal">WorkCred</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition hover:text-foreground">Features</a>
          <a href="#how" className="transition hover:text-foreground">Workflow</a>
          <a href="#security" className="transition hover:text-foreground">Trust</a>
          <a href="#pricing" className="transition hover:text-foreground">Pricing</a>
        </nav>
        <div className="flex items-center gap-2">


          <Button asChild variant="ghost" size="sm">
            <Link to="/auth/login">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="bg-gradient-hero text-primary-foreground shadow-elegant">
            <Link to="/auth/signup">
              Get started <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const floatingCards = [
    {
      title: "Verified Employee",
      value: "Identity matched",
      icon: UserCheck,
      className: "left-0 top-10 sm:left-4 lg:-left-8",
      delay: 0,
    },
    {
      title: "Trust Score",
      value: "Signal ready",
      icon: TrendingUp,
      className: "right-0 top-40 sm:right-4 lg:-right-10",
      delay: 0.25,
    },
    {
      title: "Consent Approved",
      value: "Access granted",
      icon: ClipboardCheck,
      className: "bottom-4 left-8 sm:left-16 lg:left-8",
      delay: 0.5,
    },
  ];

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_34%),radial-gradient(circle_at_80%_20%,color-mix(in_oklab,var(--accent)_20%,transparent),transparent_30%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-24 lg:grid-cols-[1fr_0.92fr]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left"
        >
          <Badge variant="outline" className="mb-6 border-primary/25 bg-primary/5 text-primary">
            <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
            Consent-first employee verification
          </Badge>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-normal sm:text-6xl lg:text-7xl">
            Verify talent. Build trust. Hire smarter.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0">
            WorkCred gives hiring teams a trusted way to verify career history, employee reputation, and
            consent-approved records without slowing down the hiring process.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button asChild size="lg" className="w-full bg-gradient-hero text-primary-foreground shadow-elegant sm:w-auto">
                <Link to="/auth/signup">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button asChild size="lg" variant="outline" className="w-full border-primary/20 bg-background/70 sm:w-auto">
                <Link to="/app/dashboard">
                  <Play className="mr-2 h-4 w-4" /> Watch Demo
                </Link>
              </Button>
            </motion.div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground lg:justify-start">
            {["Consent controls", "Audit-ready access", "Encrypted records"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="relative mx-auto min-h-[430px] w-full max-w-[560px]"
        >
          <div className="absolute inset-x-8 bottom-0 top-8 rounded-[2rem] border border-border/70 bg-card/80 shadow-glow backdrop-blur" />
          <div className="absolute inset-x-14 bottom-10 top-0 rounded-[1.5rem] border border-primary/15 bg-background/90 p-5 shadow-elegant">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div>
                <p className="text-xs uppercase text-muted-foreground">Verification desk</p>
                <h2 className="mt-1 font-display text-xl font-semibold tracking-normal">Candidate review</h2>
              </div>
              <Badge className="bg-success text-success-foreground">Live</Badge>
            </div>
            <div className="mt-6 space-y-4">
              {[
                ["Identity", "Matched"],
                ["Employment history", "Ready"],
                ["Consent status", "Approved"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/35 p-4">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="inline-flex items-center gap-2 text-sm font-medium">
                    <span className="h-2 w-2 rounded-full bg-success" />
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-foreground p-5 text-background">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary-glow" />
                <div>
                  <p className="text-sm font-medium">Trust summary ready</p>
                  <p className="mt-1 text-xs text-background/70">Verified signals are ready for the hiring team.</p>
                </div>
              </div>
            </div>
          </div>

          {floatingCards.map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: prefersReducedMotion ? 0 : [0, -12, 0],
              }}
              transition={{
                opacity: { duration: 0.45, delay: card.delay },
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: card.delay },
              }}
              className={`absolute z-10 w-[210px] rounded-xl border border-border/70 bg-background/90 p-4 shadow-elegant backdrop-blur ${card.className}`}
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <card.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{card.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{card.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Metrics() {
  const [metrics, setMetrics] = useState<LandingMetrics>(emptyMetrics);
  const hasData = metricLabels.some(({ key }) => typeof metrics[key] === "number" && metrics[key] > 0);

  useEffect(() => {
    const windowWithMetrics = window as Window & {
      __WORKCRED_LANDING_METRICS__?: Partial<Record<LandingMetricKey, number>>;
    };

    setMetrics({
      totalProfessionals: normalizeMetric(windowWithMetrics.__WORKCRED_LANDING_METRICS__?.totalProfessionals),
      verifiedEmployees: normalizeMetric(windowWithMetrics.__WORKCRED_LANDING_METRICS__?.verifiedEmployees),
      companies: normalizeMetric(windowWithMetrics.__WORKCRED_LANDING_METRICS__?.companies),
      verificationRequests: normalizeMetric(windowWithMetrics.__WORKCRED_LANDING_METRICS__?.verificationRequests),
    });
  }, []);

  return (
    <ScrollSection className="border-y border-border/50 bg-muted/20 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metricLabels.map(({ key, label }) => (
            <motion.div key={key} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <Card className="h-full border-border/60 bg-card/80">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="mt-3 font-display text-2xl font-bold tracking-normal">
                    {hasData && metrics[key] ? formatMetric(metrics[key]) : "Growing with early adopters"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}

function Features() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Verified career records",
      desc: "Create a trusted source of truth for employment history, tenure, and role information.",
    },
    {
      icon: Lock,
      title: "Consent-led sharing",
      desc: "Employees stay in control of which companies can access their profile and verification data.",
    },
    {
      icon: Search,
      title: "Fast hiring review",
      desc: "Give recruiters a clean workflow for checking candidate signals before making an offer.",
    },
    {
      icon: Users,
      title: "Role-based teams",
      desc: "Support admins, HR teams, managers, and employees with focused permissions.",
    },
    {
      icon: Zap,
      title: "Audit-ready workflows",
      desc: "Track access, requests, approvals, and profile changes through a transparent activity trail.",
    },
    {
      icon: Building2,
      title: "Company verification",
      desc: "Keep employer participation structured so trust grows across the platform.",
    },
  ];

  return (
    <ScrollSection id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionIntro eyebrow="Platform" title="Designed for trust-heavy hiring" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((feature) => (
            <motion.div key={feature.title} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
              <Card className="group h-full border-border/60 bg-gradient-card transition-shadow hover:shadow-elegant">
                <CardContent className="p-6">
                  <div className="mb-5 grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-gradient-hero group-hover:text-primary-foreground">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold tracking-normal">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}

const HOW_STEPS = [
  {
    id: 1,
    icon: UserPlus,
    label: "Create Profile",
    tagline: "Build your verified identity",
    description:
      "Professionals set up a WorkCred profile with their employment history, role details, and personal information — forming the foundational record that employers will later verify.",
    detail: ["Employment timeline", "Role & tenure tracking", "Professional bio"],
    color: "from-violet-500 to-indigo-600",
    lightBg: "bg-violet-500/10",
    lightText: "text-violet-600 dark:text-violet-400",
    ring: "ring-violet-500/40",
  },
  {
    id: 2,
    icon: ShieldCheck,
    label: "Verify Employment",
    tagline: "Confirm your work history",
    description:
      "Current and past employers confirm the accuracy of employment records, adding a cryptographically trusted signal to each role in the professional's profile.",
    detail: ["Employer confirmation", "Tenure validation", "Role accuracy checks"],
    color: "from-blue-500 to-cyan-500",
    lightBg: "bg-blue-500/10",
    lightText: "text-blue-600 dark:text-blue-400",
    ring: "ring-blue-500/40",
  },
  {
    id: 3,
    icon: FileText,
    label: "Manage Consent",
    tagline: "You control who sees what",
    description:
      "Professionals stay in full control by choosing which companies can access their verified record. Consent can be granted or revoked at any time — no data leaves without explicit approval.",
    detail: ["Granular access controls", "Revocable at any time", "Timestamped approvals"],
    color: "from-emerald-500 to-teal-500",
    lightBg: "bg-emerald-500/10",
    lightText: "text-emerald-600 dark:text-emerald-400",
    ring: "ring-emerald-500/40",
  },
  {
    id: 4,
    icon: SendHorizonal,
    label: "Share with HR",
    tagline: "Deliver verified signals",
    description:
      "With consent granted, hiring teams receive a structured, audit-ready verification package — employment history, trust signals, and confirmation status — without chasing references.",
    detail: ["Structured data delivery", "Audit-ready formatting", "Real-time status"],
    color: "from-orange-500 to-amber-500",
    lightBg: "bg-orange-500/10",
    lightText: "text-orange-600 dark:text-orange-400",
    ring: "ring-orange-500/40",
  },
  {
    id: 5,
    icon: Zap,
    label: "Get Verified Faster",
    tagline: "Hire with confidence",
    description:
      "HR teams close the loop on verification in hours — not weeks. WorkCred removes the friction from background checks, letting hiring decisions move at the speed of trust.",
    detail: ["Faster time-to-hire", "Reduced verification lag", "Confident offer decisions"],
    color: "from-pink-500 to-rose-500",
    lightBg: "bg-pink-500/10",
    lightText: "text-pink-600 dark:text-pink-400",
    ring: "ring-pink-500/40",
  },
];

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

  // Auto-advance stepper every 3.5s when section is in view
  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % HOW_STEPS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isInView, prefersReducedMotion]);

  const displayStep = hoveredStep !== null ? hoveredStep : activeStep;
  const currentStep = HOW_STEPS[displayStep];

  return (
    <section id="how" ref={sectionRef} className="relative border-y border-border/50 py-28 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_65%)]" />
      <div className="absolute inset-0 -z-10 bg-muted/25" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Badge variant="outline" className="mb-4 border-primary/25 bg-primary/5 text-primary">
            Workflow
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-normal sm:text-4xl">
            From signup to hired — in five steps
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            WorkCred creates a transparent, consent-driven pipeline that moves professionals from profile creation
            to verified status — with zero guesswork for HR teams.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:items-start">
          {/* LEFT — Vertical stepper */}
          <div className="flex flex-col gap-0">
            {HOW_STEPS.map((step, index) => {
              const isActive = displayStep === index;
              const isDone = index < displayStep;
              const Icon = step.icon;

              return (
                <div key={step.id} className="flex gap-4">
                  {/* Connector column */}
                  <div className="flex flex-col items-center" style={{ minWidth: 44 }}>
                    {/* Step bubble */}
                    <motion.button
                      onClick={() => { setActiveStep(index); setHoveredStep(null); }}
                      onMouseEnter={() => setHoveredStep(index)}
                      onMouseLeave={() => setHoveredStep(null)}
                      whileTap={{ scale: 0.93 }}
                      className={`relative z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                        isActive
                          ? `bg-gradient-to-br ${step.color} border-transparent text-white shadow-elegant`
                          : isDone
                          ? "border-success/60 bg-success/10 text-success"
                          : "border-border/60 bg-card text-muted-foreground hover:border-primary/40 hover:text-primary"
                      }`}
                      aria-label={`Go to step ${step.id}: ${step.label}`}
                      id={`hiw-step-${step.id}`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                      {/* Active pulse ring */}
                      {isActive && (
                        <motion.span
                          className={`absolute inset-0 rounded-full ring-4 ${step.ring}`}
                          initial={{ scale: 1, opacity: 0.7 }}
                          animate={{ scale: 1.55, opacity: 0 }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                        />
                      )}
                    </motion.button>

                    {/* Connector line */}
                    {index < HOW_STEPS.length - 1 && (
                      <div className="relative my-1 flex-1" style={{ width: 2, minHeight: 36 }}>
                        {/* Track */}
                        <div className="absolute inset-0 rounded-full bg-border/60" />
                        {/* Fill */}
                        <motion.div
                          className={`absolute left-0 top-0 w-full rounded-full bg-gradient-to-b ${step.color}`}
                          initial={{ height: "0%" }}
                          animate={{
                            height: isDone ? "100%" : isActive ? "50%" : "0%",
                          }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Step content row */}
                  <motion.div
                    className={`mb-1 flex-1 cursor-pointer rounded-xl border px-5 py-4 transition-all duration-300 ${
                      index < HOW_STEPS.length - 1 ? "mb-2" : ""
                    } ${
                      isActive
                        ? "border-primary/30 bg-card shadow-elegant"
                        : "border-transparent bg-transparent hover:border-border/60 hover:bg-card/60"
                    }`}
                    onClick={() => { setActiveStep(index); setHoveredStep(null); }}
                    onMouseEnter={() => setHoveredStep(index)}
                    onMouseLeave={() => setHoveredStep(null)}
                    whileHover={prefersReducedMotion ? {} : { x: 4 }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    // stagger per step
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Step {step.id}
                        </p>
                        <h3
                          className={`mt-0.5 font-display text-base font-semibold tracking-normal transition-colors duration-200 ${
                            isActive ? step.lightText : ""
                          }`}
                        >
                          {step.label}
                        </h3>
                      </div>
                      <span
                        className={`font-display text-3xl font-bold tracking-normal transition-colors duration-300 ${
                          isActive ? step.lightText : "text-muted-foreground/20"
                        }`}
                      >
                        0{step.id}
                      </span>
                    </div>

                    {/* Expanded detail tags on active */}
                    <motion.div
                      initial={false}
                      animate={isActive ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 flex flex-wrap gap-1.5 pb-1">
                        {step.detail.map((tag) => (
                          <span
                            key={tag}
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${step.lightBg} ${step.lightText}`}
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* RIGHT — Detail panel */}
          <motion.div
            key={displayStep}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
            className="sticky top-24 rounded-2xl border border-border/60 bg-card/90 p-7 shadow-elegant backdrop-blur-sm sm:p-9"
          >
            {/* Icon header */}
            <div className="flex items-start gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${currentStep.color} text-white shadow-elegant`}
              >
                <currentStep.icon className="h-7 w-7" />
              </div>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-widest ${currentStep.lightText}`}>
                  Step {currentStep.id} of {HOW_STEPS.length}
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-normal">{currentStep.label}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{currentStep.tagline}</p>
              </div>
            </div>

            {/* Description */}
            <p className="mt-6 text-sm leading-7 text-muted-foreground sm:text-base">{currentStep.description}</p>

            {/* Feature list */}
            <ul className="mt-6 space-y-3">
              {currentStep.detail.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${currentStep.lightBg}`}
                  >
                    <CheckCircle2 className={`h-3.5 w-3.5 ${currentStep.lightText}`} />
                  </span>
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>

            {/* Progress dots */}
            <div className="mt-8 flex items-center gap-2">
              {HOW_STEPS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => { setActiveStep(i); setHoveredStep(null); }}
                  className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                    i === displayStep
                      ? `w-6 bg-gradient-to-r ${currentStep.color}`
                      : i < displayStep
                      ? "w-1.5 bg-success/60"
                      : "w-1.5 bg-border"
                  }`}
                  aria-label={`Jump to step ${i + 1}`}
                  id={`hiw-dot-${s.id}`}
                />
              ))}
              <span className="ml-auto text-xs text-muted-foreground">
                {displayStep + 1} / {HOW_STEPS.length}
              </span>
            </div>

            {/* Nav buttons */}
            <div className="mt-5 flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setActiveStep((p) => Math.max(0, p - 1)); setHoveredStep(null); }}
                disabled={displayStep === 0}
                className="flex-1 border-border/60 text-xs"
                id="hiw-prev-btn"
              >
                ← Previous
              </Button>
              <Button
                size="sm"
                onClick={() => { setActiveStep((p) => Math.min(HOW_STEPS.length - 1, p + 1)); setHoveredStep(null); }}
                disabled={displayStep === HOW_STEPS.length - 1}
                className={`flex-1 bg-gradient-to-r ${currentStep.color} text-xs text-white border-0 shadow-elegant hover:opacity-90`}
                id="hiw-next-btn"
              >
                Next →
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Security() {
  return (
    <ScrollSection id="security" className="py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1fr]">
        <div>
          <Badge variant="outline" className="mb-4">
            Trust layer
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-normal sm:text-4xl">
            Built for sensitive employee data from day one.
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            WorkCred keeps verification grounded in explicit consent, permissioned access, and clear activity
            history so teams can move quickly without weakening professional trust.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Consent gates", "Data access starts with employee approval."],
            ["Structured audit trail", "Every critical action remains traceable."],
            ["Private workspaces", "Company records stay segmented by role."],
            ["Clear status states", "Teams know what is pending, approved, or verified."],
          ].map(([title, desc]) => (
            <motion.div
              key={title}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-border/60 bg-card p-5 shadow-sm"
            >
              <CheckCircle2 className="h-5 w-5 text-success" />
              <h3 className="mt-4 font-display text-base font-semibold tracking-normal">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}

function Pricing() {
  return (
    <ScrollSection id="pricing" className="border-y border-border/50 bg-muted/20 py-24">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <Badge variant="outline" className="mb-4">
          Launch partners
        </Badge>
        <h2 className="font-display text-3xl font-bold tracking-normal sm:text-4xl">
          Start with a focused verification workspace.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
          Bring your team onto WorkCred, verify early workflows, and shape a trust system that fits your hiring
          process.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-gradient-hero text-primary-foreground shadow-elegant">
            <Link to="/auth/signup">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/auth/login">Sign in</Link>
          </Button>
        </div>
      </div>
    </ScrollSection>
  );
}

function Contact() {
  return (
    <ScrollSection id="contact" className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-2xl border border-border/60 bg-gradient-card p-6 shadow-elegant sm:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Badge variant="outline" className="mb-4">
                Demo
              </Badge>
              <h2 className="font-display text-3xl font-bold tracking-normal">See the verification flow</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Share a few details and the WorkCred team can walk through the product experience with your hiring
                workflow in mind.
              </p>
            </div>
            <form className="space-y-3" onSubmit={(event) => event.preventDefault()}>
              <input className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="Full name" />
              <input className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="Work email" type="email" />
              <textarea className="min-h-[104px] w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="Tell us about your hiring process" />
              <Button className="w-full bg-gradient-hero text-primary-foreground">Watch Demo</Button>
            </form>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-hero text-primary-foreground">
            <BadgeCheck className="h-4 w-4" />
          </div>
          <span className="font-display font-bold tracking-normal">WorkCred</span>
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <a href="#" className="transition hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="transition hover:text-foreground">
            Terms
          </a>
          <a href="#" className="transition hover:text-foreground">
            Security
          </a>
        </div>
      </div>
    </footer>
  );
}

function SectionIntro({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Badge variant="outline" className="mb-4">
        {eyebrow}
      </Badge>
      <h2 className="font-display text-3xl font-bold tracking-normal sm:text-4xl">{title}</h2>
    </div>
  );
}

function ScrollSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

function normalizeMetric(value: number | undefined) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null;
}

function formatMetric(value: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}
