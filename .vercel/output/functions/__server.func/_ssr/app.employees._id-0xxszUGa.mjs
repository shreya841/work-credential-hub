import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { r as cn, t as Button } from "./button-BPK1zgJN.mjs";
import { t as Badge } from "./badge-KS2SooOw.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Input } from "./input-BYcV5Phs.mjs";
import { n as useAuth } from "./auth-provider-DIoK8pn-.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-BbAAdpLg.mjs";
import { C as Plus, O as Mail, T as Phone, c as TrendingUp, et as Calendar, g as ShieldAlert, ot as BadgeCheck, rt as Briefcase, st as Award, ut as ArrowLeft } from "../_libs/lucide-react.mjs";
import { r as canPerformAction } from "./rbac-DVva8RQt.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-DRtcuf8H.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-C9T31-X3.mjs";
import { n as ChartSkeleton, r as ListSkeleton } from "./loading-skeleton-BKYH7Wpk.mjs";
import { t as EmptyState } from "./empty-state-B-onYlus.mjs";
import { t as Label } from "./label-qle7VSy6.mjs";
import { a as DialogFooter, c as DialogTrigger, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-OO5XYV91.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as createVerificationRequest } from "./verification2.functions-DVHevb61.mjs";
import { i as listReviews, t as createReview } from "./performance.functions-bbiyboZ8.mjs";
import { t as Route } from "./app.employees._id-C0mnTRA8.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-Dfe8WMk0.mjs";
import { _ as ResponsiveContainer, a as YAxis, c as CartesianGrid, f as PolarAngleAxis, i as BarChart, l as Bar, m as PolarGrid, n as RadarChart, o as XAxis, p as PolarRadiusAxis, u as Radar, v as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.employees._id-0xxszUGa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function EmployeeDetail() {
	const { employee: e } = Route.useLoaderData();
	const queryClient = useQueryClient();
	const { user } = useAuth();
	const isApproved = user.role === "super_admin" || user.companyStatus === "approved";
	const canAddReview = canPerformAction(user.role, "create_review") && isApproved;
	const [reviewOpen, setReviewOpen] = (0, import_react.useState)(false);
	const [period, setPeriod] = (0, import_react.useState)("");
	const [productivity, setProductivity] = (0, import_react.useState)("5");
	const [teamwork, setTeamwork] = (0, import_react.useState)("5");
	const [communication, setCommunication] = (0, import_react.useState)("5");
	const [leadership, setLeadership] = (0, import_react.useState)("5");
	const [attendance, setAttendance] = (0, import_react.useState)("5");
	const [feedback, setFeedback] = (0, import_react.useState)("");
	const reviewMutation = useMutation({
		mutationFn: (newReview) => createReview({ data: newReview }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["employee-reviews", e.id] });
			queryClient.invalidateQueries({ queryKey: ["performance-ranking"] });
			queryClient.invalidateQueries({ queryKey: ["performance-breakdown", e.id] });
			queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard-rating-dist"] });
			toast.success("Performance review added successfully");
			setReviewOpen(false);
			setPeriod("");
			setProductivity("5");
			setTeamwork("5");
			setCommunication("5");
			setLeadership("5");
			setAttendance("5");
			setFeedback("");
		},
		onError: (err) => {
			toast.error(err instanceof Error ? err.message : "Failed to add performance review");
		}
	});
	const requestMutation = useMutation({
		mutationFn: () => createVerificationRequest({ data: {
			employeeId: e.id,
			requestType: "Employment Verification"
		} }),
		onSuccess: () => {
			toast.success("Verification check requested successfully. The professional has been notified.");
		},
		onError: (err) => {
			toast.error(err.message || "Failed to request verification");
		}
	});
	const handleReviewSubmit = (event) => {
		event.preventDefault();
		if (!period.trim()) {
			toast.error("Please enter a review period");
			return;
		}
		if (!feedback.trim()) {
			toast.error("Please enter feedback");
			return;
		}
		reviewMutation.mutate({
			employeeId: e.id,
			period,
			productivity: Number(productivity),
			teamwork: Number(teamwork),
			communication: Number(communication),
			leadership: Number(leadership),
			attendance: Number(attendance),
			feedback
		});
	};
	const { data: myReviews = [], isLoading: reviewsLoading, error: reviewsError } = useQuery({
		queryKey: ["employee-reviews", e.id],
		queryFn: () => listReviews({ data: { employeeId: e.id } }),
		retry: false
	});
	const latest = myReviews[0];
	const company = e.company;
	const radarData = latest ? [
		{
			metric: "Productivity",
			v: latest.productivity
		},
		{
			metric: "Teamwork",
			v: latest.teamwork
		},
		{
			metric: "Communication",
			v: latest.communication
		},
		{
			metric: "Attendance",
			v: latest.attendance
		},
		{
			metric: "Leadership",
			v: latest.leadership
		}
	] : [];
	const history = myReviews.slice().reverse().map((r) => ({
		d: r.period,
		rating: r.overall
	}));
	const joiningDateFormatted = new Date(e.joiningDate).toLocaleDateString(void 0, {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "ghost",
			size: "sm",
			className: "mb-4 -ml-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/employees",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-1 h-4 w-4" }), " Back to employees"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "overflow-hidden border-border/60 bg-gradient-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 bg-gradient-hero" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "-mt-12 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[auto_minmax(0,1fr)_auto] gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
							className: "h-24 w-24 shrink-0 border-4 border-background shadow-elegant",
							children: [e.photoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
								src: e.photoUrl,
								alt: e.fullName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: e.fullName[0] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 self-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl font-bold",
									children: e.fullName
								}), e.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									className: "bg-primary/15 text-primary hover:bg-primary/15",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "mr-1 h-3 w-3" }), " Verified"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									e.designation,
									" · ",
									e.department,
									" · ",
									company?.name ?? "No Company"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "self-end flex items-center gap-2",
							children: [canAddReview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
								open: reviewOpen,
								onOpenChange: setReviewOpen,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										className: "bg-gradient-hero text-primary-foreground shadow-elegant",
										size: "sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add Review"]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
									className: "max-w-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add Performance Review" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: handleReviewSubmit,
										className: "space-y-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "period",
													children: "Review Period"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "period",
													placeholder: "e.g. Q1 2026, Annual 2025",
													value: period,
													onChange: (e) => setPeriod(e.target.value),
													required: true
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 gap-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "productivity",
															children: "Productivity"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
															value: productivity,
															onValueChange: setProductivity,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
																id: "productivity",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
																5,
																4,
																3,
																2,
																1
															].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
																value: String(n),
																children: [
																	n,
																	" Star",
																	n > 1 ? "s" : ""
																]
															}, n)) })]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "teamwork",
															children: "Teamwork"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
															value: teamwork,
															onValueChange: setTeamwork,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
																id: "teamwork",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
																5,
																4,
																3,
																2,
																1
															].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
																value: String(n),
																children: [
																	n,
																	" Star",
																	n > 1 ? "s" : ""
																]
															}, n)) })]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "communication",
															children: "Communication"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
															value: communication,
															onValueChange: setCommunication,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
																id: "communication",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
																5,
																4,
																3,
																2,
																1
															].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
																value: String(n),
																children: [
																	n,
																	" Star",
																	n > 1 ? "s" : ""
																]
															}, n)) })]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "leadership",
															children: "Leadership"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
															value: leadership,
															onValueChange: setLeadership,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
																id: "leadership",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
																5,
																4,
																3,
																2,
																1
															].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
																value: String(n),
																children: [
																	n,
																	" Star",
																	n > 1 ? "s" : ""
																]
															}, n)) })]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2 col-span-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "attendance",
															children: "Attendance"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
															value: attendance,
															onValueChange: setAttendance,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
																id: "attendance",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
																5,
																4,
																3,
																2,
																1
															].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
																value: String(n),
																children: [
																	n,
																	" Star",
																	n > 1 ? "s" : ""
																]
															}, n)) })]
														})]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "feedback",
													children: "Detailed Feedback"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
													id: "feedback",
													rows: 3,
													placeholder: "Provide performance feedback...",
													value: feedback,
													onChange: (e) => setFeedback(e.target.value),
													required: true
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "submit",
												className: "bg-gradient-hero text-primary-foreground shadow-elegant w-full",
												disabled: reviewMutation.isPending,
												children: reviewMutation.isPending ? "Submitting..." : "Submit Review"
											}) })
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/profile/$id",
									params: { id: e.id },
									children: "Public profile"
								})
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							icon: Mail,
							label: "Email",
							value: e.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							icon: Phone,
							label: "Phone",
							value: e.phone || "N/A"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							icon: Briefcase,
							label: "Experience",
							value: `${e.experience} years`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							icon: Calendar,
							label: "Joined",
							value: joiningDateFormatted
						})
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "performance",
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "performance",
						children: "Performance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "reviews",
						children: "Review history"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "profile",
						children: "Profile"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "performance",
					className: "mt-4 space-y-5",
					children: reviewsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartSkeleton, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartSkeleton, {})]
					}) : reviewsError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border-amber-200/50 bg-amber-50/10 p-6 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center max-w-md mx-auto space-y-3 py-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-10 w-10 text-amber-600" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-bold text-foreground",
									children: "Detailed ratings are private"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "You do not have consent to view this professional's performance charts. You can submit a background check request to verify their credentials."
								}),
								user.companyId !== e.companyId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "bg-gradient-hero text-primary-foreground shadow-elegant mt-2",
									onClick: () => requestMutation.mutate(),
									disabled: requestMutation.isPending || !isApproved,
									children: requestMutation.isPending ? "Requesting..." : "Request Verification"
								})
							]
						})
					}) : myReviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: TrendingUp,
							title: "No performance data yet",
							description: "This employee has not received any performance reviews."
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Latest rating breakdown" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								className: "h-72",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
										data: radarData,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, { stroke: "var(--color-border)" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
												dataKey: "metric",
												tick: {
													fill: "var(--color-muted-foreground)",
													fontSize: 11
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarRadiusAxis, {
												domain: [0, 5],
												tick: {
													fill: "var(--color-muted-foreground)",
													fontSize: 10
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
												dataKey: "v",
												stroke: "var(--color-chart-1)",
												fill: "var(--color-chart-1)",
												fillOpacity: .35
											})
										]
									})
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Overall rating history" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
								className: "h-72",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
										data: history,
										margin: {
											left: -20,
											right: 12
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "var(--color-border)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "d",
												stroke: "var(--color-muted-foreground)",
												fontSize: 12
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												domain: [0, 5],
												stroke: "var(--color-muted-foreground)",
												fontSize: 12
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
												background: "var(--color-popover)",
												border: "1px solid var(--color-border)",
												borderRadius: 8
											} }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
												dataKey: "rating",
												fill: "var(--color-chart-2)",
												radius: [
													6,
													6,
													0,
													0
												]
											})
										]
									})
								})
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
						children: radarData.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "border-border/60 bg-gradient-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs uppercase tracking-wider text-muted-foreground",
										children: m.metric
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 font-display text-2xl font-bold",
										children: [
											m.v.toFixed(1),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm text-muted-foreground",
												children: "/5"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 h-1.5 overflow-hidden rounded-full bg-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full bg-gradient-hero",
											style: { width: `${m.v / 5 * 100}%` }
										})
									})
								]
							})
						}, m.metric))
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "reviews",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border-border/60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "p-6",
							children: reviewsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 3 }) : reviewsError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center max-w-md mx-auto space-y-3 py-6 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-10 w-10 text-amber-600" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-bold text-foreground",
										children: "Detailed reviews are private"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Consent is required to view this professional's detailed reviews and evaluator feedback."
									})
								]
							}) : myReviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
								icon: TrendingUp,
								title: "No review history",
								description: "Performance review history will appear here once reviews are submitted."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative space-y-6 border-l border-border/60 pl-6",
								children: myReviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-[27px] top-1 grid h-4 w-4 place-items-center rounded-full bg-gradient-hero shadow-elegant" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold",
													children: new Date(r.createdAt).toLocaleDateString()
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
													variant: "outline",
													children: [r.overall.toFixed(1), " ★"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs text-muted-foreground",
													children: ["by ", r.reviewerName]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-muted-foreground",
											children: r.feedback
										})
									]
								}, r.id))
							})
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "profile",
					className: "mt-4 grid gap-5 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "border-border/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Skills" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "flex flex-wrap gap-2",
							children: e.skills.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground",
								children: "No skills listed."
							}) : e.skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								children: s
							}, s))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "border-border/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Achievements" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "space-y-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4 w-4" }), " No achievements recorded yet."]
							})
						})]
					})]
				})
			]
		})
	] });
}
function Info({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 rounded-lg border border-border/60 bg-background/40 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] uppercase tracking-wider text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "truncate text-sm font-medium",
				children: value
			})]
		})]
	});
}
//#endregion
export { EmployeeDetail as component };
