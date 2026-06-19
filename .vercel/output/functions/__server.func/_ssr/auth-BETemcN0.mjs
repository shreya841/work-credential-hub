import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useTheme } from "./theme-provider-eDAGwicb.mjs";
import { f as Outlet, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Star, o as UserCheck, ot as BadgeCheck, q as CircleCheck } from "../_libs/lucide-react.mjs";
import { i as AnimatePresence, r as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BETemcN0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/routes/auth.tsx?tsr-split=component";
var COLUMN_1_ITEMS = [
	{
		type: "profile",
		name: "Sarah Jenkins",
		role: "Sr. Software Engineer",
		company: "Google",
		status: "Verified",
		initial: "SJ",
		color: "from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20"
	},
	{
		type: "skill",
		title: "Core Capabilities",
		skills: [
			"React",
			"TypeScript",
			"Node.js",
			"GraphQL"
		],
		score: 98,
		color: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20"
	},
	{
		type: "cert",
		title: "AWS Solutions Architect",
		issuer: "Amazon Web Services",
		date: "Issued Oct 2025",
		color: "from-orange-500/10 to-amber-500/10 dark:from-orange-500/20 dark:to-amber-500/20"
	},
	{
		type: "trust",
		score: 99.4,
		rating: "4.9/5",
		audits: 24,
		color: "from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20"
	}
];
var COLUMN_2_ITEMS = [
	{
		type: "profile",
		name: "David Chen",
		role: "Lead UI/UX Designer",
		company: "Meta",
		status: "Active",
		initial: "DC",
		color: "from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20"
	},
	{
		type: "audit",
		action: "Employment Verification",
		target: "Microsoft HR Portal",
		time: "2m ago",
		status: "Success",
		color: "from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20"
	},
	{
		type: "skill",
		title: "Design System Specialist",
		skills: [
			"Figma",
			"Design Tokens",
			"Prototyping"
		],
		score: 95,
		color: "from-rose-500/10 to-pink-500/10 dark:from-rose-500/20 dark:to-rose-500/20"
	},
	{
		type: "consent",
		requester: "Stripe Inc.",
		access: "Employment History, Certifications",
		status: "Approved",
		color: "from-emerald-500/10 to-cyan-500/10 dark:from-emerald-500/20 dark:to-cyan-500/20"
	}
];
var COLUMN_3_ITEMS = [
	{
		type: "profile",
		name: "Elena Rostova",
		role: "Engineering Manager",
		company: "Netflix",
		status: "Verified",
		initial: "ER",
		color: "from-red-500/10 to-rose-500/10 dark:from-red-500/20 dark:to-rose-500/20"
	},
	{
		type: "skill",
		title: "Backend Infrastructure",
		skills: [
			"Kubernetes",
			"Go",
			"gRPC",
			"PostgreSQL"
		],
		score: 97,
		color: "from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20"
	},
	{
		type: "cert",
		title: "Certified Kubernetes Administrator",
		issuer: "CNCF",
		date: "Issued Jan 2026",
		color: "from-sky-500/10 to-blue-500/10 dark:from-sky-500/20 dark:to-sky-500/20"
	},
	{
		type: "trust",
		score: 98.9,
		rating: "4.8/5",
		audits: 42,
		color: "from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-purple-500/20"
	}
];
function GridItemCard({ item }) {
	const isProfile = item.type === "profile";
	const isSkill = item.type === "skill";
	const isCert = item.type === "cert";
	const isTrust = item.type === "trust";
	const isAudit = item.type === "audit";
	const isConsent = item.type === "consent";
	const cardBaseClass = `p-4 rounded-xl border border-slate-200 dark:border-white/15 bg-gradient-to-br ${item.color} bg-white dark:bg-[#0E1326]/60 backdrop-blur-md shadow-md hover:shadow-xl dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-[1.04] hover:-translate-y-0.5 hover:border-[#00C2FF]/50 cursor-pointer`;
	if (isProfile) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cardBaseClass,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "h-10 w-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center font-bold text-slate-800 dark:text-white text-sm",
					children: item.initial
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 103,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex-1 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
						className: "text-sm font-bold text-slate-900 dark:text-white truncate",
						children: item.name
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 107,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-slate-500 dark:text-white/60 truncate",
						children: [
							item.role,
							" • ",
							item.company
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 108,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 106,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "flex items-center gap-1 text-[10px] font-bold bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-450 px-2 py-0.5 rounded-full border border-emerald-500/30",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserCheck, { className: "h-3 w-3" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 111,
						columnNumber: 13
					}, this), item.status]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 110,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 102,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 101,
		columnNumber: 12
	}, this);
	if (isSkill) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cardBaseClass,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center justify-between mb-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "text-xs font-bold text-slate-700 dark:text-white/80",
				children: item.title
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 120,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "text-xs font-mono font-bold text-emerald-600 dark:text-emerald-450",
				children: [item.score, "% Match"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 121,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 119,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-wrap gap-1.5",
			children: item.skills.map((s, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "text-[10px] bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-755 dark:text-white/85 px-2 py-0.5 rounded-md font-semibold",
				children: s
			}, idx, false, {
				fileName: _jsxFileName,
				lineNumber: 124,
				columnNumber: 56
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 123,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 118,
		columnNumber: 12
	}, this);
	if (isCert) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cardBaseClass,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-2 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-600 dark:text-amber-450",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BadgeCheck, { className: "h-5 w-5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 134,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 133,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
					className: "text-sm font-bold text-slate-900 dark:text-white",
					children: item.title
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 137,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-slate-500 dark:text-white/60",
					children: item.issuer
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 138,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[10px] text-slate-400 dark:text-white/40 mt-1 font-semibold",
					children: item.date
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 139,
					columnNumber: 13
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 136,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 132,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 131,
		columnNumber: 12
	}, this);
	if (isTrust) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cardBaseClass,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-[10px] text-slate-500 dark:text-white/60 uppercase tracking-wider font-bold",
				children: "Verified Reputation"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 148,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
				className: "text-2xl font-black text-slate-900 dark:text-white mt-0.5",
				children: [item.score, "%"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 149,
				columnNumber: 13
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 147,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-right",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-1 text-xs text-amber-550 dark:text-amber-450 font-bold justify-end",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "h-3.5 w-3.5 fill-current" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 153,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.rating }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 154,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 152,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[10px] text-slate-400 dark:text-white/40 mt-0.5 font-semibold",
					children: [item.audits, " audits"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 156,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 151,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 146,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 145,
		columnNumber: 12
	}, this);
	if (isAudit) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cardBaseClass,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 165,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[10px] text-slate-500 dark:text-white/60",
						children: item.time
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 166,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 164,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-[10px] font-bold text-emerald-600 dark:text-emerald-450 bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 dark:border-emerald-500/30 px-1.5 py-0.5 rounded",
					children: item.status
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 168,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 163,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-xs font-bold text-slate-900 dark:text-white",
				children: item.action
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 172,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-[10px] text-slate-500 dark:text-white/60 mt-0.5",
				children: ["Target: ", item.target]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 173,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 162,
		columnNumber: 12
	}, this);
	if (isConsent) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cardBaseClass,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-1.5 bg-emerald-500/10 rounded-md text-emerald-600 dark:text-emerald-450",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 180,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 179,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
					className: "text-xs font-bold text-slate-900 dark:text-white truncate",
					children: "Consent Granted"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 183,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[10px] text-slate-500 dark:text-white/60 truncate",
					children: ["To: ", item.requester]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 184,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 182,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 178,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-[10px] text-slate-400 dark:text-white/40 mt-2 truncate",
			children: ["Shared: ", item.access]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 187,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 177,
		columnNumber: 12
	}, this);
	return null;
}
function AuthLayout() {
	const { theme, toggle } = useTheme();
	const [mousePos, setMousePos] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const [isHovering, setIsHovering] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const handleMouseMove = (e) => {
			setMousePos({
				x: e.clientX,
				y: e.clientY
			});
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#070913] font-sans selection:bg-primary/30 selection:text-white transition-colors duration-500",
		onMouseEnter: () => setIsHovering(true),
		onMouseLeave: () => setIsHovering(false),
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("style", { children: `
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-scroll-up {
          animation: scrollUp 28s linear infinite;
        }
        .animate-scroll-down {
          animation: scrollDown 28s linear infinite;
        }
        .animate-scroll-up:hover, .animate-scroll-down:hover {
          animation-play-state: paused;
        }
      ` }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 217,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatePresence, { children: isHovering && /* @__PURE__ */ (void 0)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				style: {
					left: mousePos.x - 250,
					top: mousePos.y - 250
				},
				className: "absolute pointer-events-none w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,194,255,0.14)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(0,194,255,0.22)_0%,transparent_70%)] z-1 transition-opacity duration-300"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 241,
				columnNumber: 24
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 240,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 opacity-85 dark:opacity-75 pointer-events-auto z-0 scale-105 select-none",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col gap-6 overflow-hidden relative h-full",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-col gap-6 animate-scroll-up",
							children: [...COLUMN_1_ITEMS, ...COLUMN_1_ITEMS].map((item, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GridItemCard, { item }, `col1-${idx}`, false, {
								fileName: _jsxFileName,
								lineNumber: 258,
								columnNumber: 72
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 257,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 256,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "hidden md:flex flex-col gap-6 overflow-hidden relative h-full",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-col gap-6 animate-scroll-down",
							children: [...COLUMN_2_ITEMS, ...COLUMN_2_ITEMS].map((item, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GridItemCard, { item }, `col2-${idx}`, false, {
								fileName: _jsxFileName,
								lineNumber: 265,
								columnNumber: 72
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 264,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 263,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "hidden md:flex flex-col gap-6 overflow-hidden relative h-full",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-col gap-6 animate-scroll-up",
							children: [...COLUMN_3_ITEMS, ...COLUMN_3_ITEMS].map((item, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GridItemCard, { item }, `col3-${idx}`, false, {
								fileName: _jsxFileName,
								lineNumber: 272,
								columnNumber: 72
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 271,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 270,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 254,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-gradient-to-b from-slate-50/80 via-transparent to-slate-50/80 dark:from-[#070913]/90 dark:via-transparent dark:to-[#070913]/90 pointer-events-none z-1" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 278,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-slate-50/40 dark:bg-[#070913]/60 pointer-events-none z-1 transition-colors duration-500" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 279,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,194,255,0.06),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,194,255,0.09),transparent_60%)] pointer-events-none z-1" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 282,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 opacity-[0.04] dark:opacity-[0.02] pointer-events-none z-1 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 285,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "absolute inset-0 pointer-events-none z-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
					animate: {
						y: [
							0,
							-30,
							0
						],
						x: [
							0,
							15,
							0
						]
					},
					transition: {
						duration: 6,
						repeat: Infinity,
						ease: "easeInOut"
					},
					className: "absolute top-1/6 left-1/12 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 blur-sm"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 289,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
					animate: {
						y: [
							0,
							40,
							0
						],
						x: [
							0,
							-20,
							0
						]
					},
					transition: {
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut"
					},
					className: "absolute bottom-1/5 right-1/12 w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 opacity-20 blur-sm"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 297,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 288,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
				animate: {
					scale: [
						1,
						1.25,
						1
					],
					opacity: [
						.3,
						.5,
						.3
					]
				},
				transition: {
					duration: 10,
					repeat: Infinity,
					ease: "easeInOut"
				},
				className: "absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-cyan-400/10 dark:bg-cyan-500/10 blur-[100px] pointer-events-none z-1"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 308,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
				animate: {
					scale: [
						1.25,
						1,
						1.25
					],
					opacity: [
						.2,
						.35,
						.2
					]
				},
				transition: {
					duration: 12,
					repeat: Infinity,
					ease: "easeInOut"
				},
				className: "absolute bottom-1/4 right-1/4 w-[550px] h-[550px] rounded-full bg-indigo-400/10 dark:bg-violet-600/10 blur-[130px] pointer-events-none z-1"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 316,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative z-10 w-full max-w-md px-4 py-8",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col items-center mb-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "flex items-center gap-2.5 group",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
							whileHover: {
								rotate: 360,
								scale: 1.05
							},
							animate: { boxShadow: [
								"0px 0px 0px rgba(0,194,255,0)",
								"0px 0px 15px rgba(0,194,255,0.4)",
								"0px 0px 0px rgba(0,194,255,0)"
							] },
							transition: {
								rotate: {
									duration: .8,
									ease: "easeInOut"
								},
								boxShadow: {
									duration: 3,
									repeat: Infinity,
									ease: "easeInOut"
								}
							},
							className: "relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-tr from-[#00C2FF] to-[#00E5A8] p-[1.5px] shadow-md",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid h-full w-full place-items-center rounded-[11px] bg-white dark:bg-[#0A0F1D] transition-colors duration-500",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BadgeCheck, { className: "h-5.5 w-5.5 text-[#00E5A8]" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 347,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 346,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 330,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-500",
							children: ["Work", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[#00C2FF]",
								children: "Cred"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 351,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 350,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 329,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 328,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
					initial: {
						opacity: 0,
						scale: .95,
						y: 45
					},
					animate: {
						opacity: 1,
						scale: 1,
						y: 0
					},
					transition: {
						type: "spring",
						damping: 18,
						stiffness: 90,
						duration: .9
					},
					className: "relative rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white/80 dark:bg-black/55 backdrop-blur-xl p-6 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.25),0_12px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_0_80px_rgba(0,194,255,0.25),0_30px_80px_rgba(0,0,0,0.95)] overflow-hidden transition-colors duration-500",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00C2FF]/55 to-transparent" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 372,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 374,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 357,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 326,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 215,
		columnNumber: 10
	}, this);
}
//#endregion
export { AuthLayout as component };
