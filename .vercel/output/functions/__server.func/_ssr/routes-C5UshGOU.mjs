import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BPK1zgJN.mjs";
import { t as Badge } from "./badge-KS2SooOw.mjs";
import { n as useTheme } from "./theme-provider-Oa6rMQBg.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Lock, F as FileText, W as ClipboardCheck, a as UserPlus, b as Search, c as TrendingUp, f as Sparkles, h as ShieldCheck, lt as ArrowRight, nt as Building2, o as UserCheck, ot as BadgeCheck, q as CircleCheck, r as Users, t as Zap, w as Play, y as SendHorizontal } from "../_libs/lucide-react.mjs";
import { n as CardContent, t as Card } from "./card-DRtcuf8H.mjs";
import { n as useReducedMotion, r as motion, t as useInView } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C5UshGOU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyMetrics = {
	totalProfessionals: null,
	verifiedEmployees: null,
	companies: null,
	verificationRequests: null
};
var metricLabels = [
	{
		key: "totalProfessionals",
		label: "Total Professionals"
	},
	{
		key: "verifiedEmployees",
		label: "Verified Employees"
	},
	{
		key: "companies",
		label: "Companies"
	},
	{
		key: "verificationRequests",
		label: "Verification Requests"
	}
];
var fadeUp = {
	hidden: {
		opacity: 0,
		y: 28
	},
	visible: {
		opacity: 1,
		y: 0
	}
};
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen overflow-hidden bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metrics, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Features, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Security, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pricing, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Nav() {
	const { theme, toggle } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-9 w-9 place-items-center rounded-lg bg-gradient-hero text-primary-foreground shadow-elegant",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-bold tracking-normal",
						children: "WorkCred"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-8 text-sm text-muted-foreground md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#features",
							className: "transition hover:text-foreground",
							children: "Features"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#how",
							className: "transition hover:text-foreground",
							children: "Workflow"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#security",
							className: "transition hover:text-foreground",
							children: "Trust"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#pricing",
							className: "transition hover:text-foreground",
							children: "Pricing"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth/login",
							children: "Sign in"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						className: "bg-gradient-hero text-primary-foreground shadow-elegant",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/auth/signup",
							children: ["Get started ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-3.5 w-3.5" })]
						})
					})]
				})
			]
		})
	});
}
function Hero() {
	const prefersReducedMotion = useReducedMotion();
	const floatingCards = [
		{
			title: "Verified Employee",
			value: "Identity matched",
			icon: UserCheck,
			className: "left-0 top-10 sm:left-4 lg:-left-8",
			delay: 0
		},
		{
			title: "Trust Score",
			value: "Signal ready",
			icon: TrendingUp,
			className: "right-0 top-40 sm:right-4 lg:-right-10",
			delay: .25
		},
		{
			title: "Consent Approved",
			value: "Access granted",
			icon: ClipboardCheck,
			className: "bottom-4 left-8 sm:left-16 lg:left-8",
			delay: .5
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_34%),radial-gradient(circle_at_80%_20%,color-mix(in_oklab,var(--accent)_20%,transparent),transparent_30%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-24 lg:grid-cols-[1fr_0.92fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: "hidden",
				animate: "visible",
				variants: fadeUp,
				transition: {
					duration: .7,
					ease: "easeOut"
				},
				className: "mx-auto max-w-3xl text-center lg:mx-0 lg:text-left",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "mb-6 border-primary/25 bg-primary/5 text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mr-1.5 h-3.5 w-3.5" }), "Consent-first employee verification"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-bold leading-tight tracking-normal sm:text-6xl lg:text-7xl",
						children: "Verify talent. Build trust. Hire smarter."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0",
						children: "WorkCred gives hiring teams a trusted way to verify career history, employee reputation, and consent-approved records without slowing down the hiring process."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							whileHover: {
								y: -3,
								scale: 1.02
							},
							whileTap: { scale: .98 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								className: "w-full bg-gradient-hero text-primary-foreground shadow-elegant sm:w-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/auth/signup",
									children: ["Get Started ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							whileHover: {
								y: -3,
								scale: 1.02
							},
							whileTap: { scale: .98 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "outline",
								className: "w-full border-primary/20 bg-background/70 sm:w-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/app/dashboard",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "mr-2 h-4 w-4" }), " Watch Demo"]
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground lg:justify-start",
						children: [
							"Consent controls",
							"Audit-ready access",
							"Encrypted records"
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-success" }), item]
						}, item))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					scale: .96
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				transition: {
					duration: .7,
					delay: .1,
					ease: "easeOut"
				},
				className: "relative mx-auto min-h-[430px] w-full max-w-[560px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-8 bottom-0 top-8 rounded-[2rem] border border-border/70 bg-card/80 shadow-glow backdrop-blur" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-14 bottom-10 top-0 rounded-[1.5rem] border border-primary/15 bg-background/90 p-5 shadow-elegant",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-border/60 pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase text-muted-foreground",
									children: "Verification desk"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 font-display text-xl font-semibold tracking-normal",
									children: "Candidate review"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "bg-success text-success-foreground",
									children: "Live"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 space-y-4",
								children: [
									["Identity", "Matched"],
									["Employment history", "Ready"],
									["Consent status", "Approved"]
								].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between rounded-lg border border-border/60 bg-muted/35 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted-foreground",
										children: label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-2 text-sm font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-success" }), value]
									})]
								}, label))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 rounded-lg bg-foreground p-5 text-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-primary-glow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: "Trust summary ready"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-background/70",
										children: "Verified signals are ready for the hiring team."
									})] })]
								})
							})
						]
					}),
					floatingCards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: prefersReducedMotion ? 0 : [
								0,
								-12,
								0
							]
						},
						transition: {
							opacity: {
								duration: .45,
								delay: card.delay
							},
							y: {
								duration: 4.5,
								repeat: Infinity,
								ease: "easeInOut",
								delay: card.delay
							}
						},
						className: `absolute z-10 w-[210px] rounded-xl border border-border/70 bg-background/90 p-4 shadow-elegant backdrop-blur ${card.className}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(card.icon, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold",
								children: card.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: card.value
							})] })]
						})
					}, card.title))
				]
			})]
		})]
	});
}
function Metrics() {
	const [metrics, setMetrics] = (0, import_react.useState)(emptyMetrics);
	const hasData = metricLabels.some(({ key }) => typeof metrics[key] === "number" && metrics[key] > 0);
	(0, import_react.useEffect)(() => {
		const windowWithMetrics = window;
		setMetrics({
			totalProfessionals: normalizeMetric(windowWithMetrics.__WORKCRED_LANDING_METRICS__?.totalProfessionals),
			verifiedEmployees: normalizeMetric(windowWithMetrics.__WORKCRED_LANDING_METRICS__?.verifiedEmployees),
			companies: normalizeMetric(windowWithMetrics.__WORKCRED_LANDING_METRICS__?.companies),
			verificationRequests: normalizeMetric(windowWithMetrics.__WORKCRED_LANDING_METRICS__?.verificationRequests)
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollSection, {
		className: "border-y border-border/50 bg-muted/20 py-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: metricLabels.map(({ key, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					whileHover: { y: -4 },
					transition: { duration: .2 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "h-full border-border/60 bg-card/80",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-2xl font-bold tracking-normal",
								children: hasData && metrics[key] ? formatMetric(metrics[key]) : "Growing with early adopters"
							})]
						})
					})
				}, key))
			})
		})
	});
}
function Features() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollSection, {
		id: "features",
		className: "py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionIntro, {
				eyebrow: "Platform",
				title: "Designed for trust-heavy hiring"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					{
						icon: ShieldCheck,
						title: "Verified career records",
						desc: "Create a trusted source of truth for employment history, tenure, and role information."
					},
					{
						icon: Lock,
						title: "Consent-led sharing",
						desc: "Employees stay in control of which companies can access their profile and verification data."
					},
					{
						icon: Search,
						title: "Fast hiring review",
						desc: "Give recruiters a clean workflow for checking candidate signals before making an offer."
					},
					{
						icon: Users,
						title: "Role-based teams",
						desc: "Support admins, HR teams, managers, and employees with focused permissions."
					},
					{
						icon: Zap,
						title: "Audit-ready workflows",
						desc: "Track access, requests, approvals, and profile changes through a transparent activity trail."
					},
					{
						icon: Building2,
						title: "Company verification",
						desc: "Keep employer participation structured so trust grows across the platform."
					}
				].map((feature) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					whileHover: { y: -6 },
					transition: { duration: .2 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "group h-full border-border/60 bg-gradient-card transition-shadow hover:shadow-elegant",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-5 grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-gradient-hero group-hover:text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(feature.icon, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-semibold tracking-normal",
									children: feature.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-6 text-muted-foreground",
									children: feature.desc
								})
							]
						})
					})
				}, feature.title))
			})]
		})
	});
}
var HOW_STEPS = [
	{
		id: 1,
		icon: UserPlus,
		label: "Create Profile",
		tagline: "Build your verified identity",
		description: "Professionals set up a WorkCred profile with their employment history, role details, and personal information — forming the foundational record that employers will later verify.",
		detail: [
			"Employment timeline",
			"Role & tenure tracking",
			"Professional bio"
		],
		color: "from-violet-500 to-indigo-600",
		lightBg: "bg-violet-500/10",
		lightText: "text-violet-600 dark:text-violet-400",
		ring: "ring-violet-500/40"
	},
	{
		id: 2,
		icon: ShieldCheck,
		label: "Verify Employment",
		tagline: "Confirm your work history",
		description: "Current and past employers confirm the accuracy of employment records, adding a cryptographically trusted signal to each role in the professional's profile.",
		detail: [
			"Employer confirmation",
			"Tenure validation",
			"Role accuracy checks"
		],
		color: "from-blue-500 to-cyan-500",
		lightBg: "bg-blue-500/10",
		lightText: "text-blue-600 dark:text-blue-400",
		ring: "ring-blue-500/40"
	},
	{
		id: 3,
		icon: FileText,
		label: "Manage Consent",
		tagline: "You control who sees what",
		description: "Professionals stay in full control by choosing which companies can access their verified record. Consent can be granted or revoked at any time — no data leaves without explicit approval.",
		detail: [
			"Granular access controls",
			"Revocable at any time",
			"Timestamped approvals"
		],
		color: "from-emerald-500 to-teal-500",
		lightBg: "bg-emerald-500/10",
		lightText: "text-emerald-600 dark:text-emerald-400",
		ring: "ring-emerald-500/40"
	},
	{
		id: 4,
		icon: SendHorizontal,
		label: "Share with HR",
		tagline: "Deliver verified signals",
		description: "With consent granted, hiring teams receive a structured, audit-ready verification package — employment history, trust signals, and confirmation status — without chasing references.",
		detail: [
			"Structured data delivery",
			"Audit-ready formatting",
			"Real-time status"
		],
		color: "from-orange-500 to-amber-500",
		lightBg: "bg-orange-500/10",
		lightText: "text-orange-600 dark:text-orange-400",
		ring: "ring-orange-500/40"
	},
	{
		id: 5,
		icon: Zap,
		label: "Get Verified Faster",
		tagline: "Hire with confidence",
		description: "HR teams close the loop on verification in hours — not weeks. WorkCred removes the friction from background checks, letting hiring decisions move at the speed of trust.",
		detail: [
			"Faster time-to-hire",
			"Reduced verification lag",
			"Confident offer decisions"
		],
		color: "from-pink-500 to-rose-500",
		lightBg: "bg-pink-500/10",
		lightText: "text-pink-600 dark:text-pink-400",
		ring: "ring-pink-500/40"
	}
];
function HowItWorks() {
	const [activeStep, setActiveStep] = (0, import_react.useState)(0);
	const [hoveredStep, setHoveredStep] = (0, import_react.useState)(null);
	const prefersReducedMotion = useReducedMotion();
	const sectionRef = (0, import_react.useRef)(null);
	const isInView = useInView(sectionRef, {
		once: true,
		amount: .25
	});
	(0, import_react.useEffect)(() => {
		if (!isInView || prefersReducedMotion) return;
		const timer = setInterval(() => {
			setActiveStep((prev) => (prev + 1) % HOW_STEPS.length);
		}, 3500);
		return () => clearInterval(timer);
	}, [isInView, prefersReducedMotion]);
	const displayStep = hoveredStep !== null ? hoveredStep : activeStep;
	const currentStep = HOW_STEPS[displayStep];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "how",
		ref: sectionRef,
		className: "relative border-y border-border/50 py-28 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_65%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 -z-10 bg-muted/25" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "mx-auto max-w-2xl text-center",
					initial: {
						opacity: 0,
						y: 24
					},
					animate: isInView ? {
						opacity: 1,
						y: 0
					} : {
						opacity: 0,
						y: 24
					},
					transition: {
						duration: .6,
						ease: "easeOut"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: "mb-4 border-primary/25 bg-primary/5 text-primary",
							children: "Workflow"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-bold tracking-normal sm:text-4xl",
							children: "From signup to hired — in five steps"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-7 text-muted-foreground sm:text-base",
							children: "WorkCred creates a transparent, consent-driven pipeline that moves professionals from profile creation to verified status — with zero guesswork for HR teams."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-0",
						children: HOW_STEPS.map((step, index) => {
							const isActive = displayStep === index;
							const isDone = index < displayStep;
							const Icon = step.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center",
									style: { minWidth: 44 },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
										onClick: () => {
											setActiveStep(index);
											setHoveredStep(null);
										},
										onMouseEnter: () => setHoveredStep(index),
										onMouseLeave: () => setHoveredStep(null),
										whileTap: { scale: .93 },
										className: `relative z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${isActive ? `bg-gradient-to-br ${step.color} border-transparent text-white shadow-elegant` : isDone ? "border-success/60 bg-success/10 text-success" : "border-border/60 bg-card text-muted-foreground hover:border-primary/40 hover:text-primary"}`,
										"aria-label": `Go to step ${step.id}: ${step.label}`,
										id: `hiw-step-${step.id}`,
										children: [isDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" }), isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
											className: `absolute inset-0 rounded-full ring-4 ${step.ring}`,
											initial: {
												scale: 1,
												opacity: .7
											},
											animate: {
												scale: 1.55,
												opacity: 0
											},
											transition: {
												duration: 1.2,
												repeat: Infinity,
												ease: "easeOut"
											}
										})]
									}), index < HOW_STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative my-1 flex-1",
										style: {
											width: 2,
											minHeight: 36
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full bg-border/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
											className: `absolute left-0 top-0 w-full rounded-full bg-gradient-to-b ${step.color}`,
											initial: { height: "0%" },
											animate: { height: isDone ? "100%" : isActive ? "50%" : "0%" },
											transition: {
												duration: .5,
												ease: "easeInOut"
											}
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									className: `mb-1 flex-1 cursor-pointer rounded-xl border px-5 py-4 transition-all duration-300 ${index < HOW_STEPS.length - 1 ? "mb-2" : ""} ${isActive ? "border-primary/30 bg-card shadow-elegant" : "border-transparent bg-transparent hover:border-border/60 hover:bg-card/60"}`,
									onClick: () => {
										setActiveStep(index);
										setHoveredStep(null);
									},
									onMouseEnter: () => setHoveredStep(index),
									onMouseLeave: () => setHoveredStep(null),
									whileHover: prefersReducedMotion ? {} : { x: 4 },
									transition: { duration: .2 },
									initial: {
										opacity: 0,
										x: -20
									},
									animate: isInView ? {
										opacity: 1,
										x: 0
									} : {
										opacity: 0,
										x: -20
									},
									style: { transitionDelay: `${index * 80}ms` },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
											children: ["Step ", step.id]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: `mt-0.5 font-display text-base font-semibold tracking-normal transition-colors duration-200 ${isActive ? step.lightText : ""}`,
											children: step.label
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `font-display text-3xl font-bold tracking-normal transition-colors duration-300 ${isActive ? step.lightText : "text-muted-foreground/20"}`,
											children: ["0", step.id]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: false,
										animate: isActive ? {
											height: "auto",
											opacity: 1
										} : {
											height: 0,
											opacity: 0
										},
										transition: {
											duration: .3,
											ease: "easeInOut"
										},
										className: "overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-3 flex flex-wrap gap-1.5 pb-1",
											children: step.detail.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${step.lightBg} ${step.lightText}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }), tag]
											}, tag))
										})
									})]
								})]
							}, step.id);
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 18,
							scale: .98
						},
						animate: {
							opacity: 1,
							y: 0,
							scale: 1
						},
						exit: {
							opacity: 0,
							y: -12,
							scale: .98
						},
						transition: {
							duration: .38,
							ease: "easeOut"
						},
						className: "sticky top-24 rounded-2xl border border-border/60 bg-card/90 p-7 shadow-elegant backdrop-blur-sm sm:p-9",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${currentStep.color} text-white shadow-elegant`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(currentStep.icon, { className: "h-7 w-7" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: `text-xs font-semibold uppercase tracking-widest ${currentStep.lightText}`,
										children: [
											"Step ",
											currentStep.id,
											" of ",
											HOW_STEPS.length
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-1 font-display text-2xl font-bold tracking-normal",
										children: currentStep.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-sm text-muted-foreground",
										children: currentStep.tagline
									})
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-sm leading-7 text-muted-foreground sm:text-base",
								children: currentStep.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-6 space-y-3",
								children: currentStep.detail.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${currentStep.lightBg}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: `h-3.5 w-3.5 ${currentStep.lightText}` })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: item
									})]
								}, item))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex items-center gap-2",
								children: [HOW_STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setActiveStep(i);
										setHoveredStep(null);
									},
									className: `h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${i === displayStep ? `w-6 bg-gradient-to-r ${currentStep.color}` : i < displayStep ? "w-1.5 bg-success/60" : "w-1.5 bg-border"}`,
									"aria-label": `Jump to step ${i + 1}`,
									id: `hiw-dot-${s.id}`
								}, s.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-auto text-xs text-muted-foreground",
									children: [
										displayStep + 1,
										" / ",
										HOW_STEPS.length
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => {
										setActiveStep((p) => Math.max(0, p - 1));
										setHoveredStep(null);
									},
									disabled: displayStep === 0,
									className: "flex-1 border-border/60 text-xs",
									id: "hiw-prev-btn",
									children: "← Previous"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									onClick: () => {
										setActiveStep((p) => Math.min(HOW_STEPS.length - 1, p + 1));
										setHoveredStep(null);
									},
									disabled: displayStep === HOW_STEPS.length - 1,
									className: `flex-1 bg-gradient-to-r ${currentStep.color} text-xs text-white border-0 shadow-elegant hover:opacity-90`,
									id: "hiw-next-btn",
									children: "Next →"
								})]
							})
						]
					}, displayStep)]
				})]
			})
		]
	});
}
function Security() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollSection, {
		id: "security",
		className: "py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					className: "mb-4",
					children: "Trust layer"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold tracking-normal sm:text-4xl",
					children: "Built for sensitive employee data from day one."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 leading-7 text-muted-foreground",
					children: "WorkCred keeps verification grounded in explicit consent, permissioned access, and clear activity history so teams can move quickly without weakening professional trust."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					["Consent gates", "Data access starts with employee approval."],
					["Structured audit trail", "Every critical action remains traceable."],
					["Private workspaces", "Company records stay segmented by role."],
					["Clear status states", "Teams know what is pending, approved, or verified."]
				].map(([title, desc]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					whileHover: { y: -4 },
					className: "rounded-xl border border-border/60 bg-card p-5 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-success" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-base font-semibold tracking-normal",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-6 text-muted-foreground",
							children: desc
						})
					]
				}, title))
			})]
		})
	});
}
function Pricing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollSection, {
		id: "pricing",
		className: "border-y border-border/50 bg-muted/20 py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-4 text-center sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					className: "mb-4",
					children: "Launch partners"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold tracking-normal sm:text-4xl",
					children: "Start with a focused verification workspace."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground",
					children: "Bring your team onto WorkCred, verify early workflows, and shape a trust system that fits your hiring process."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-col justify-center gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						className: "bg-gradient-hero text-primary-foreground shadow-elegant",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth/signup",
							children: "Get Started"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth/login",
							children: "Sign in"
						})
					})]
				})
			]
		})
	});
}
function Contact() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollSection, {
		id: "contact",
		className: "py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-4xl px-4 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-border/60 bg-gradient-card p-6 shadow-elegant sm:p-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-center gap-8 md:grid-cols-[0.9fr_1.1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: "mb-4",
							children: "Demo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-bold tracking-normal",
							children: "See the verification flow"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-7 text-muted-foreground",
							children: "Share a few details and the WorkCred team can walk through the product experience with your hiring workflow in mind."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "space-y-3",
						onSubmit: (event) => event.preventDefault(),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "w-full rounded-md border bg-background px-3 py-2 text-sm",
								placeholder: "Full name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "w-full rounded-md border bg-background px-3 py-2 text-sm",
								placeholder: "Work email",
								type: "email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: "min-h-[104px] w-full rounded-md border bg-background px-3 py-2 text-sm",
								placeholder: "Tell us about your hiring process"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full bg-gradient-hero text-primary-foreground",
								children: "Watch Demo"
							})
						]
					})]
				})
			})
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border/50 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-7 w-7 place-items-center rounded-md bg-gradient-hero text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display font-bold tracking-normal",
						children: "WorkCred"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted-foreground",
						children: ["© ", (/* @__PURE__ */ new Date()).getFullYear()]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-6 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "transition hover:text-foreground",
						children: "Privacy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "transition hover:text-foreground",
						children: "Terms"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "transition hover:text-foreground",
						children: "Security"
					})
				]
			})]
		})
	});
}
function SectionIntro({ eyebrow, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			variant: "outline",
			className: "mb-4",
			children: eyebrow
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl font-bold tracking-normal sm:text-4xl",
			children: title
		})]
	});
}
function ScrollSection({ children, className, id }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.section, {
		id,
		className,
		initial: "hidden",
		whileInView: "visible",
		viewport: {
			once: true,
			amount: .2
		},
		variants: fadeUp,
		transition: {
			duration: .6,
			ease: "easeOut"
		},
		children
	});
}
function normalizeMetric(value) {
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null;
}
function formatMetric(value) {
	return new Intl.NumberFormat("en", {
		notation: "compact",
		maximumFractionDigits: 1
	}).format(value);
}
//#endregion
export { Landing as component };
