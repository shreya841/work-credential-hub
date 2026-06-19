import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DnxMo53r.mjs";
import { t as Badge } from "./badge-GBPLA4QD.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-Cj2KU_kF.mjs";
import { c as stringType, o as objectType } from "../_libs/zod.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-B-3oHQMO.mjs";
import { D as MapPin, m as ShieldOff, ot as BadgeCheck, rt as Briefcase, st as Award } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CCXaAbeo.mjs";
import { r as ListSkeleton } from "./loading-skeleton-BkAGb6P9.mjs";
import { t as Route } from "./profile._id-MT8OSg0M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile._id-BiGqG85C.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/routes/profile.$id.tsx?tsr-split=component";
var fetchPublicReviews = createServerFn({ method: "GET" }).validator(objectType({ employeeId: stringType().uuid() })).handler(createSsrRpc("5da27b2b2b751179c614c18019cbee8b5193f3ec2cc56cb935d9d83cd96ba427"));
function PublicProfile() {
	const { data } = Route.useLoaderData();
	const { data: myReviews = [], isLoading: reviewsLoading } = useQuery({
		queryKey: ["public-reviews", data.employee?.id],
		queryFn: () => fetchPublicReviews({ data: { employeeId: data.employee.id } }),
		enabled: !data.isPrivate && !!data.employee?.id
	});
	if (data.isPrivate) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid min-h-screen place-items-center bg-background p-6",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
			className: "max-w-md border-border/60 bg-gradient-card",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
				className: "p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mx-auto grid h-14 w-14 place-items-center rounded-xl bg-muted text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldOff, { className: "h-7 w-7" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 44,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 43,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "mt-4 font-display text-xl font-bold",
						children: "This profile is private"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 46,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "The employee hasn't enabled public visibility or shared access with your company."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 47,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						variant: "outline",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/",
							children: "Back to home"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 51,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 50,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 42,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 41,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 40,
		columnNumber: 12
	}, this);
	const e = data.employee;
	const company = e.company;
	const joiningDateFormatted = e.joiningDate ? new Date(e.joiningDate).toLocaleDateString(void 0, {
		year: "numeric",
		month: "long"
	}) : "";
	const exitDateFormatted = e.exitDate ? new Date(e.exitDate).toLocaleDateString(void 0, {
		year: "numeric",
		month: "long"
	}) : "Present";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "bg-gradient-hero",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-4xl px-4 py-6 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "inline-flex items-center gap-2 text-sm text-white/90",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BadgeCheck, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 71,
						columnNumber: 13
					}, this), " WorkCred · Public profile"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 70,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 69,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 68,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto -mt-10 max-w-4xl px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
					className: "overflow-hidden border-border/60 bg-card",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
						className: "p-6",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, {
									className: "h-20 w-20 border-4 border-background shadow-elegant",
									children: [e.photoUrl && /* @__PURE__ */ (void 0)(AvatarImage, {
										src: e.photoUrl,
										alt: e.fullName
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 80,
										columnNumber: 32
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AvatarFallback, { children: e.fullName[0] }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 81,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 79,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
												className: "font-display text-2xl font-bold",
												children: e.fullName
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 85,
												columnNumber: 19
											}, this), e.verified && /* @__PURE__ */ (void 0)(Badge, {
												className: "bg-primary/15 text-primary hover:bg-primary/15",
												children: [/* @__PURE__ */ (void 0)(BadgeCheck, { className: "mr-1 h-3 w-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 87,
													columnNumber: 23
												}, this), " Verified"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 86,
												columnNumber: 34
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 84,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-sm text-muted-foreground",
											children: [
												e.designation,
												" · ",
												company?.name ?? "No Company"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 90,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "inline-flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Briefcase, { className: "h-3 w-3" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 95,
														columnNumber: 21
													}, this),
													" ",
													e.experience,
													" yrs experience"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 94,
												columnNumber: 19
											}, this), company?.location && /* @__PURE__ */ (void 0)("span", {
												className: "inline-flex items-center gap-1",
												children: [
													/* @__PURE__ */ (void 0)(MapPin, { className: "h-3 w-3" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 98,
														columnNumber: 23
													}, this),
													" ",
													company.location
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 97,
												columnNumber: 41
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 93,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 83,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-display text-3xl font-bold text-gradient",
										children: e.rating > 0 ? e.rating.toFixed(1) : "N/A"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 103,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs text-muted-foreground",
										children: "Avg rating"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 106,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 102,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 78,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 77,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 76,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "my-6 grid gap-5 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
							className: "border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Verified company history" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 116,
								columnNumber: 15
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 115,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
								className: "space-y-3",
								children: company ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-3 rounded-lg border p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "grid h-10 w-10 place-items-center rounded-md bg-gradient-hero font-bold text-primary-foreground shadow-elegant",
											children: company.name.substring(0, 2).toUpperCase()
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 120,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "truncate font-medium",
												children: company.name
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 124,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "text-xs text-muted-foreground",
												children: [
													joiningDateFormatted,
													" → ",
													exitDateFormatted
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 125,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 123,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
											className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BadgeCheck, { className: "mr-1 h-3 w-3" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 130,
												columnNumber: 21
											}, this), " Verified"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 129,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 119,
									columnNumber: 26
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-sm text-muted-foreground py-4 text-center",
									children: "No company history verified."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 132,
									columnNumber: 26
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 118,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 114,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
							className: "border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Skills" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 139,
								columnNumber: 15
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 138,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
								className: "flex flex-wrap gap-1.5",
								children: e.skills.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-sm text-muted-foreground",
									children: "No skills listed."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 142,
									columnNumber: 40
								}, this) : e.skills.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
									variant: "outline",
									children: s
								}, s, false, {
									fileName: _jsxFileName,
									lineNumber: 142,
									columnNumber: 143
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 141,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 137,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
							className: "border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Achievements" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 151,
								columnNumber: 15
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 150,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
								className: "space-y-2 text-sm text-muted-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Award, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 154,
									columnNumber: 15
								}, this), " No achievements recorded yet."]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 153,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 149,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
							className: "border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Performance ratings" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 161,
								columnNumber: 15
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 160,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
								className: "space-y-3",
								children: reviewsLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ListSkeleton, { count: 2 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 164,
									columnNumber: 33
								}, this) : myReviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "py-6 text-center text-sm text-muted-foreground",
									children: "No performance reviews shared publicly."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 164,
									columnNumber: 87
								}, this) : myReviews.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-lg border p-3 bg-card",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs text-muted-foreground",
											children: r.period
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 168,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
											variant: "outline",
											children: [r.overall.toFixed(1), " ★"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 169,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 167,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 line-clamp-2 text-xs text-muted-foreground",
										children: r.feedback
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 171,
										columnNumber: 21
									}, this)]
								}, r.id, true, {
									fileName: _jsxFileName,
									lineNumber: 166,
									columnNumber: 45
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 163,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 159,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 112,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "pb-10 text-center text-xs text-muted-foreground",
					children: "Profile verified by WorkCred · workcred.io"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 177,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 75,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 67,
		columnNumber: 10
	}, this);
}
//#endregion
export { PublicProfile as component };
