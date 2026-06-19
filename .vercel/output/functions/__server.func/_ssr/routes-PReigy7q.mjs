import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DnxMo53r.mjs";
import { t as Badge } from "./badge-GBPLA4QD.mjs";
import { n as useTheme } from "./theme-provider-eDAGwicb.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Lock, F as FileText, W as ClipboardCheck, a as UserPlus, b as Search, c as TrendingUp, f as Sparkles, h as ShieldCheck, lt as ArrowRight, nt as Building2, o as UserCheck, ot as BadgeCheck, q as CircleCheck, r as Users, t as Zap, w as Play, y as SendHorizontal } from "../_libs/lucide-react.mjs";
import { n as CardContent, t as Card } from "./card-CCXaAbeo.mjs";
import { n as useReducedMotion, r as motion, t as useInView } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-PReigy7q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/routes/index.tsx?tsr-split=component";
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen overflow-hidden bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Nav, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 45,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Hero, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 46,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Metrics, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 47,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Features, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 48,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HowItWorks, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 49,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Security, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 50,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pricing, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 51,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Contact, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 52,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Footer, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 53,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 44,
		columnNumber: 10
	}, this);
}
function Nav() {
	const { theme, toggle } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: "sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid h-9 w-9 place-items-center rounded-lg bg-gradient-hero text-primary-foreground shadow-elegant",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BadgeCheck, { className: "h-5 w-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 66,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 65,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-display text-lg font-bold tracking-normal",
						children: "WorkCred"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 68,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 64,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
					className: "hidden items-center gap-8 text-sm text-muted-foreground md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: "#features",
							className: "transition hover:text-foreground",
							children: "Features"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 71,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: "#how",
							className: "transition hover:text-foreground",
							children: "Workflow"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 72,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: "#security",
							className: "transition hover:text-foreground",
							children: "Trust"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 73,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: "#pricing",
							className: "transition hover:text-foreground",
							children: "Pricing"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 74,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 70,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/auth/login",
							children: "Sign in"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 80,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 79,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						size: "sm",
						className: "bg-gradient-hero text-primary-foreground shadow-elegant",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/auth/signup",
							children: ["Get started ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "ml-1 h-3.5 w-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 84,
								columnNumber: 27
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 83,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 82,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 76,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 63,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 62,
		columnNumber: 10
	}, this);
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "relative isolate overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_34%),radial-gradient(circle_at_80%_20%,color-mix(in_oklab,var(--accent)_20%,transparent),transparent_30%)]" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 113,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-24 lg:grid-cols-[1fr_0.92fr]",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
				initial: "hidden",
				animate: "visible",
				variants: fadeUp,
				transition: {
					duration: .7,
					ease: "easeOut"
				},
				className: "mx-auto max-w-3xl text-center lg:mx-0 lg:text-left",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
						variant: "outline",
						className: "mb-6 border-primary/25 bg-primary/5 text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "mr-1.5 h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 120,
							columnNumber: 13
						}, this), "Consent-first employee verification"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 119,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "font-display text-4xl font-bold leading-tight tracking-normal sm:text-6xl lg:text-7xl",
						children: "Verify talent. Build trust. Hire smarter."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 123,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0",
						children: "WorkCred gives hiring teams a trusted way to verify career history, employee reputation, and consent-approved records without slowing down the hiring process."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 126,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
							whileHover: {
								y: -3,
								scale: 1.02
							},
							whileTap: { scale: .98 },
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								asChild: true,
								size: "lg",
								className: "w-full bg-gradient-hero text-primary-foreground shadow-elegant sm:w-auto",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/auth/signup",
									children: ["Get Started ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "ml-2 h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 139,
										columnNumber: 31
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 138,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 137,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 131,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
							whileHover: {
								y: -3,
								scale: 1.02
							},
							whileTap: { scale: .98 },
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								asChild: true,
								size: "lg",
								variant: "outline",
								className: "w-full border-primary/20 bg-background/70 sm:w-auto",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/app/dashboard",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Play, { className: "mr-2 h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 151,
										columnNumber: 19
									}, this), " Watch Demo"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 150,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 149,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 143,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 130,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground lg:justify-start",
						children: [
							"Consent controls",
							"Audit-ready access",
							"Encrypted records"
						].map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-3.5 w-3.5 text-success" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 158,
								columnNumber: 17
							}, this), item]
						}, item, true, {
							fileName: _jsxFileName,
							lineNumber: 157,
							columnNumber: 90
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 156,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 115,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
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
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-x-8 bottom-0 top-8 rounded-[2rem] border border-border/70 bg-card/80 shadow-glow backdrop-blur" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 175,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "absolute inset-x-14 bottom-10 top-0 rounded-[1.5rem] border border-primary/15 bg-background/90 p-5 shadow-elegant",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between border-b border-border/60 pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs uppercase text-muted-foreground",
									children: "Verification desk"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 179,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "mt-1 font-display text-xl font-semibold tracking-normal",
									children: "Candidate review"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 180,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 178,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
									className: "bg-success text-success-foreground",
									children: "Live"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 182,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 177,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-6 space-y-4",
								children: [
									["Identity", "Matched"],
									["Employment history", "Ready"],
									["Consent status", "Approved"]
								].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between rounded-lg border border-border/60 bg-muted/35 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-sm text-muted-foreground",
										children: label
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 186,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "inline-flex items-center gap-2 text-sm font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-2 w-2 rounded-full bg-success" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 188,
											columnNumber: 21
										}, this), value]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 187,
										columnNumber: 19
									}, this)]
								}, label, true, {
									fileName: _jsxFileName,
									lineNumber: 185,
									columnNumber: 131
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 184,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-6 rounded-lg bg-foreground p-5 text-background",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-5 w-5 text-primary-glow" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 195,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-sm font-medium",
										children: "Trust summary ready"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 197,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 text-xs text-background/70",
										children: "Verified signals are ready for the hiring team."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 198,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 196,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 194,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 193,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 176,
						columnNumber: 11
					}, this),
					floatingCards.map((card) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
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
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(card.icon, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 224,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 223,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm font-semibold",
								children: card.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 227,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: card.value
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 228,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 226,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 222,
							columnNumber: 15
						}, this)
					}, card.title, false, {
						fileName: _jsxFileName,
						lineNumber: 204,
						columnNumber: 38
					}, this))
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 164,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 114,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 112,
		columnNumber: 10
	}, this);
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollSection, {
		className: "border-y border-border/50 bg-muted/20 py-14",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: metricLabels.map(({ key, label }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
					whileHover: { y: -4 },
					transition: { duration: .2 },
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
						className: "h-full border-border/60 bg-card/80",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
							className: "p-5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm text-muted-foreground",
								children: label
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 265,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-3 font-display text-2xl font-bold tracking-normal",
								children: hasData && metrics[key] ? formatMetric(metrics[key]) : "Growing with early adopters"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 266,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 264,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 263,
						columnNumber: 15
					}, this)
				}, key, false, {
					fileName: _jsxFileName,
					lineNumber: 258,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 254,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 253,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 252,
		columnNumber: 10
	}, this);
}
function Features() {
	const items = [
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
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollSection, {
		id: "features",
		className: "py-24",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionIntro, {
				eyebrow: "Platform",
				title: "Designed for trust-heavy hiring"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 304,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: items.map((feature) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
					whileHover: { y: -6 },
					transition: { duration: .2 },
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
						className: "group h-full border-border/60 bg-gradient-card transition-shadow hover:shadow-elegant",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
							className: "p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mb-5 grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-gradient-hero group-hover:text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(feature.icon, { className: "h-5 w-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 314,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 313,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "font-display text-lg font-semibold tracking-normal",
									children: feature.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 316,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-2 text-sm leading-6 text-muted-foreground",
									children: feature.desc
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 317,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 312,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 311,
						columnNumber: 15
					}, this)
				}, feature.title, false, {
					fileName: _jsxFileName,
					lineNumber: 306,
					columnNumber: 33
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 305,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 303,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 302,
		columnNumber: 10
	}, this);
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id: "how",
		ref: sectionRef,
		className: "relative border-y border-border/50 py-28 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_65%)]" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 403,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 -z-10 bg-muted/25" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 404,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
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
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
							variant: "outline",
							className: "mb-4 border-primary/25 bg-primary/5 text-primary",
							children: "Workflow"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 421,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display text-3xl font-bold tracking-normal sm:text-4xl",
							children: "From signup to hired — in five steps"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 424,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-4 text-sm leading-7 text-muted-foreground sm:text-base",
							children: "WorkCred creates a transparent, consent-driven pipeline that moves professionals from profile creation to verified status — with zero guesswork for HR teams."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 427,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 408,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:items-start",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col gap-0",
						children: HOW_STEPS.map((step, index) => {
							const isActive = displayStep === index;
							const isDone = index < displayStep;
							const Icon = step.icon;
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-col items-center",
									style: { minWidth: 44 },
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.button, {
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
										children: [isDone ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-5 w-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 452,
											columnNumber: 33
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-5 w-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 452,
											columnNumber: 72
										}, this), isActive && /* @__PURE__ */ (void 0)(motion.span, {
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
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 454,
											columnNumber: 36
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 446,
										columnNumber: 21
									}, this), index < HOW_STEPS.length - 1 && /* @__PURE__ */ (void 0)("div", {
										className: "relative my-1 flex-1",
										style: {
											width: 2,
											minHeight: 36
										},
										children: [/* @__PURE__ */ (void 0)("div", { className: "absolute inset-0 rounded-full bg-border/60" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 473,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)(motion.div, {
											className: `absolute left-0 top-0 w-full rounded-full bg-gradient-to-b ${step.color}`,
											initial: { height: "0%" },
											animate: { height: isDone ? "100%" : isActive ? "50%" : "0%" },
											transition: {
												duration: .5,
												ease: "easeInOut"
											}
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 475,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 468,
										columnNumber: 54
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 442,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
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
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
											children: ["Step ", step.id]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 510,
											columnNumber: 25
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
											className: `mt-0.5 font-display text-base font-semibold tracking-normal transition-colors duration-200 ${isActive ? step.lightText : ""}`,
											children: step.label
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 513,
											columnNumber: 25
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 509,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: `font-display text-3xl font-bold tracking-normal transition-colors duration-300 ${isActive ? step.lightText : "text-muted-foreground/20"}`,
											children: ["0", step.id]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 517,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 508,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
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
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-3 flex flex-wrap gap-1.5 pb-1",
											children: step.detail.map((tag) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${step.lightBg} ${step.lightText}`,
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-3 w-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 535,
													columnNumber: 29
												}, this), tag]
											}, tag, true, {
												fileName: _jsxFileName,
												lineNumber: 534,
												columnNumber: 49
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 533,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 523,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 487,
									columnNumber: 19
								}, this)]
							}, step.id, true, {
								fileName: _jsxFileName,
								lineNumber: 440,
								columnNumber: 20
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 435,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
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
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: `flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${currentStep.color} text-white shadow-elegant`,
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(currentStep.icon, { className: "h-7 w-7" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 565,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 564,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: `text-xs font-semibold uppercase tracking-widest ${currentStep.lightText}`,
										children: [
											"Step ",
											currentStep.id,
											" of ",
											HOW_STEPS.length
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 568,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "mt-1 font-display text-2xl font-bold tracking-normal",
										children: currentStep.label
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 571,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-0.5 text-sm text-muted-foreground",
										children: currentStep.tagline
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 572,
										columnNumber: 17
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 567,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 563,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-6 text-sm leading-7 text-muted-foreground sm:text-base",
								children: currentStep.description
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 577,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
								className: "mt-6 space-y-3",
								children: currentStep.detail.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: `flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${currentStep.lightBg}`,
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: `h-3.5 w-3.5 ${currentStep.lightText}` }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 583,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 582,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-sm font-medium",
										children: item
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 585,
										columnNumber: 19
									}, this)]
								}, item, true, {
									fileName: _jsxFileName,
									lineNumber: 581,
									columnNumber: 47
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 580,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-8 flex items-center gap-2",
								children: [HOW_STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => {
										setActiveStep(i);
										setHoveredStep(null);
									},
									className: `h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${i === displayStep ? `w-6 bg-gradient-to-r ${currentStep.color}` : i < displayStep ? "w-1.5 bg-success/60" : "w-1.5 bg-border"}`,
									"aria-label": `Jump to step ${i + 1}`,
									id: `hiw-dot-${s.id}`
								}, s.id, false, {
									fileName: _jsxFileName,
									lineNumber: 591,
									columnNumber: 40
								}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "ml-auto text-xs text-muted-foreground",
									children: [
										displayStep + 1,
										" / ",
										HOW_STEPS.length
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 595,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 590,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-5 flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
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
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 602,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									size: "sm",
									onClick: () => {
										setActiveStep((p) => Math.min(HOW_STEPS.length - 1, p + 1));
										setHoveredStep(null);
									},
									disabled: displayStep === HOW_STEPS.length - 1,
									className: `flex-1 bg-gradient-to-r ${currentStep.color} text-xs text-white border-0 shadow-elegant hover:opacity-90`,
									id: "hiw-next-btn",
									children: "Next →"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 608,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 601,
								columnNumber: 13
							}, this)
						]
					}, displayStep, true, {
						fileName: _jsxFileName,
						lineNumber: 546,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 433,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 406,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 401,
		columnNumber: 10
	}, this);
}
function Security() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollSection, {
		id: "security",
		className: "py-24",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
					variant: "outline",
					className: "mb-4",
					children: "Trust layer"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 624,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-3xl font-bold tracking-normal sm:text-4xl",
					children: "Built for sensitive employee data from day one."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 627,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-4 leading-7 text-muted-foreground",
					children: "WorkCred keeps verification grounded in explicit consent, permissioned access, and clear activity history so teams can move quickly without weakening professional trust."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 630,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 623,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					["Consent gates", "Data access starts with employee approval."],
					["Structured audit trail", "Every critical action remains traceable."],
					["Private workspaces", "Company records stay segmented by role."],
					["Clear status states", "Teams know what is pending, approved, or verified."]
				].map(([title, desc]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
					whileHover: { y: -4 },
					className: "rounded-xl border border-border/60 bg-card p-5 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-5 w-5 text-success" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 639,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "mt-4 font-display text-base font-semibold tracking-normal",
							children: title
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 640,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 text-sm leading-6 text-muted-foreground",
							children: desc
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 641,
							columnNumber: 15
						}, this)
					]
				}, title, true, {
					fileName: _jsxFileName,
					lineNumber: 636,
					columnNumber: 319
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 635,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 622,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 621,
		columnNumber: 10
	}, this);
}
function Pricing() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollSection, {
		id: "pricing",
		className: "border-y border-border/50 bg-muted/20 py-24",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-5xl px-4 text-center sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
					variant: "outline",
					className: "mb-4",
					children: "Launch partners"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 650,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-3xl font-bold tracking-normal sm:text-4xl",
					children: "Start with a focused verification workspace."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 653,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground",
					children: "Bring your team onto WorkCred, verify early workflows, and shape a trust system that fits your hiring process."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 656,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8 flex flex-col justify-center gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						size: "lg",
						className: "bg-gradient-hero text-primary-foreground shadow-elegant",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/auth/signup",
							children: "Get Started"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 662,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 661,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						size: "lg",
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/auth/login",
							children: "Sign in"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 665,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 664,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 660,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 649,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 648,
		columnNumber: 10
	}, this);
}
function Contact() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollSection, {
		id: "contact",
		className: "py-24",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-4xl px-4 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border/60 bg-gradient-card p-6 shadow-elegant sm:p-10",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid items-center gap-8 md:grid-cols-[0.9fr_1.1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
							variant: "outline",
							className: "mb-4",
							children: "Demo"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 677,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display text-3xl font-bold tracking-normal",
							children: "See the verification flow"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 680,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-3 leading-7 text-muted-foreground",
							children: "Share a few details and the WorkCred team can walk through the product experience with your hiring workflow in mind."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 681,
							columnNumber: 15
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 676,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						className: "space-y-3",
						onSubmit: (event) => event.preventDefault(),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								className: "w-full rounded-md border bg-background px-3 py-2 text-sm",
								placeholder: "Full name"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 687,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								className: "w-full rounded-md border bg-background px-3 py-2 text-sm",
								placeholder: "Work email",
								type: "email"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 688,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
								className: "min-h-[104px] w-full rounded-md border bg-background px-3 py-2 text-sm",
								placeholder: "Tell us about your hiring process"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 689,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								className: "w-full bg-gradient-hero text-primary-foreground",
								children: "Watch Demo"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 690,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 686,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 675,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 674,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 673,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 672,
		columnNumber: 10
	}, this);
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
		className: "border-t border-border/50 py-10",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid h-7 w-7 place-items-center rounded-md bg-gradient-hero text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BadgeCheck, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 702,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 701,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-display font-bold tracking-normal",
						children: "WorkCred"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 704,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-xs text-muted-foreground",
						children: ["© ", (/* @__PURE__ */ new Date()).getFullYear()]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 705,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 700,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex gap-6 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "#",
						className: "transition hover:text-foreground",
						children: "Privacy"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 708,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "#",
						className: "transition hover:text-foreground",
						children: "Terms"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 711,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "#",
						className: "transition hover:text-foreground",
						children: "Security"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 714,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 707,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 699,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 698,
		columnNumber: 10
	}, this);
}
function SectionIntro({ eyebrow, title }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto max-w-2xl text-center",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
			variant: "outline",
			className: "mb-4",
			children: eyebrow
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 729,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
			className: "font-display text-3xl font-bold tracking-normal sm:text-4xl",
			children: title
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 732,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 728,
		columnNumber: 10
	}, this);
}
function ScrollSection({ children, className, id }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.section, {
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
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 744,
		columnNumber: 10
	}, this);
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
