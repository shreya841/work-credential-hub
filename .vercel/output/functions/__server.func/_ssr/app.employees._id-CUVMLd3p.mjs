import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { r as cn, t as Button } from "./button-DnxMo53r.mjs";
import { t as Badge } from "./badge-GBPLA4QD.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Input } from "./input-C8wv43d_.mjs";
import { n as useAuth } from "./auth-provider-CtLo-iYA.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-B-3oHQMO.mjs";
import { C as Plus, O as Mail, T as Phone, c as TrendingUp, et as Calendar, g as ShieldAlert, ot as BadgeCheck, rt as Briefcase, st as Award, ut as ArrowLeft } from "../_libs/lucide-react.mjs";
import { r as canPerformAction } from "./rbac-DVva8RQt.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-CCXaAbeo.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-cNCVehGV.mjs";
import { n as ChartSkeleton, r as ListSkeleton } from "./loading-skeleton-BkAGb6P9.mjs";
import { t as EmptyState } from "./empty-state-DmMIw0uj.mjs";
import { t as Label } from "./label-ZItyyoZm.mjs";
import { a as DialogFooter, c as DialogTrigger, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-BgWFhrxr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as createVerificationRequest } from "./verification2.functions-Cb33ooCo.mjs";
import { i as listReviews, t as createReview } from "./performance.functions-Ct0qpQiJ.mjs";
import { t as Route } from "./app.employees._id-CI6yADb8.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-OpyVAXdj.mjs";
import { _ as ResponsiveContainer, a as YAxis, c as CartesianGrid, f as PolarAngleAxis, i as BarChart, l as Bar, m as PolarGrid, n as RadarChart, o as XAxis, p as PolarRadiusAxis, u as Radar, v as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.employees._id-CUVMLd3p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/components/ui/textarea.tsx";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 8,
		columnNumber: 7
	}, void 0);
});
Textarea.displayName = "Textarea";
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/routes/app.employees.$id.tsx?tsr-split=component";
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			asChild: true,
			variant: "ghost",
			size: "sm",
			className: "mb-4 -ml-2",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/app/employees",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "mr-1 h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 156,
					columnNumber: 11
				}, this), " Back to employees"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 155,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 154,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
			className: "overflow-hidden border-border/60 bg-gradient-card",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-24 bg-gradient-hero" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 161,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
				className: "-mt-12 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-[auto_minmax(0,1fr)_auto] gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, {
							className: "h-24 w-24 shrink-0 border-4 border-background shadow-elegant",
							children: [e.photoUrl && /* @__PURE__ */ (void 0)(AvatarImage, {
								src: e.photoUrl,
								alt: e.fullName
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 165,
								columnNumber: 30
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AvatarFallback, { children: e.fullName[0] }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 166,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 164,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "min-w-0 self-end",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "font-display text-2xl font-bold",
									children: e.fullName
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 170,
									columnNumber: 17
								}, this), e.verified && /* @__PURE__ */ (void 0)(Badge, {
									className: "bg-primary/15 text-primary hover:bg-primary/15",
									children: [/* @__PURE__ */ (void 0)(BadgeCheck, { className: "mr-1 h-3 w-3" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 172,
										columnNumber: 21
									}, this), " Verified"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 171,
									columnNumber: 32
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 169,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									e.designation,
									" · ",
									e.department,
									" · ",
									company?.name ?? "No Company"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 175,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 168,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "self-end flex items-center gap-2",
							children: [canAddReview && /* @__PURE__ */ (void 0)(Dialog, {
								open: reviewOpen,
								onOpenChange: setReviewOpen,
								children: [/* @__PURE__ */ (void 0)(DialogTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (void 0)(Button, {
										className: "bg-gradient-hero text-primary-foreground shadow-elegant",
										size: "sm",
										children: [/* @__PURE__ */ (void 0)(Plus, { className: "mr-1 h-4 w-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 183,
											columnNumber: 23
										}, this), " Add Review"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 182,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 181,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)(DialogContent, {
									className: "max-w-md",
									children: [/* @__PURE__ */ (void 0)(DialogHeader, { children: /* @__PURE__ */ (void 0)(DialogTitle, { children: "Add Performance Review" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 188,
										columnNumber: 23
									}, this) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 187,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("form", {
										onSubmit: handleReviewSubmit,
										className: "space-y-4",
										children: [
											/* @__PURE__ */ (void 0)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (void 0)(Label, {
													htmlFor: "period",
													children: "Review Period"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 192,
													columnNumber: 25
												}, this), /* @__PURE__ */ (void 0)(Input, {
													id: "period",
													placeholder: "e.g. Q1 2026, Annual 2025",
													value: period,
													onChange: (e) => setPeriod(e.target.value),
													required: true
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 193,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 191,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "grid grid-cols-2 gap-3",
												children: [
													/* @__PURE__ */ (void 0)("div", {
														className: "space-y-2",
														children: [/* @__PURE__ */ (void 0)(Label, {
															htmlFor: "productivity",
															children: "Productivity"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 197,
															columnNumber: 27
														}, this), /* @__PURE__ */ (void 0)(Select, {
															value: productivity,
															onValueChange: setProductivity,
															children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
																id: "productivity",
																children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 200,
																	columnNumber: 31
																}, this)
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 199,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: [
																5,
																4,
																3,
																2,
																1
															].map((n) => /* @__PURE__ */ (void 0)(SelectItem, {
																value: String(n),
																children: [
																	n,
																	" Star",
																	n > 1 ? "s" : ""
																]
															}, n, true, {
																fileName: _jsxFileName,
																lineNumber: 203,
																columnNumber: 57
															}, this)) }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 202,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 198,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 196,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: "space-y-2",
														children: [/* @__PURE__ */ (void 0)(Label, {
															htmlFor: "teamwork",
															children: "Teamwork"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 210,
															columnNumber: 27
														}, this), /* @__PURE__ */ (void 0)(Select, {
															value: teamwork,
															onValueChange: setTeamwork,
															children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
																id: "teamwork",
																children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 213,
																	columnNumber: 31
																}, this)
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 212,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: [
																5,
																4,
																3,
																2,
																1
															].map((n) => /* @__PURE__ */ (void 0)(SelectItem, {
																value: String(n),
																children: [
																	n,
																	" Star",
																	n > 1 ? "s" : ""
																]
															}, n, true, {
																fileName: _jsxFileName,
																lineNumber: 216,
																columnNumber: 57
															}, this)) }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 215,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 211,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 209,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: "space-y-2",
														children: [/* @__PURE__ */ (void 0)(Label, {
															htmlFor: "communication",
															children: "Communication"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 223,
															columnNumber: 27
														}, this), /* @__PURE__ */ (void 0)(Select, {
															value: communication,
															onValueChange: setCommunication,
															children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
																id: "communication",
																children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 226,
																	columnNumber: 31
																}, this)
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 225,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: [
																5,
																4,
																3,
																2,
																1
															].map((n) => /* @__PURE__ */ (void 0)(SelectItem, {
																value: String(n),
																children: [
																	n,
																	" Star",
																	n > 1 ? "s" : ""
																]
															}, n, true, {
																fileName: _jsxFileName,
																lineNumber: 229,
																columnNumber: 57
															}, this)) }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 228,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 224,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 222,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: "space-y-2",
														children: [/* @__PURE__ */ (void 0)(Label, {
															htmlFor: "leadership",
															children: "Leadership"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 236,
															columnNumber: 27
														}, this), /* @__PURE__ */ (void 0)(Select, {
															value: leadership,
															onValueChange: setLeadership,
															children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
																id: "leadership",
																children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 239,
																	columnNumber: 31
																}, this)
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 238,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: [
																5,
																4,
																3,
																2,
																1
															].map((n) => /* @__PURE__ */ (void 0)(SelectItem, {
																value: String(n),
																children: [
																	n,
																	" Star",
																	n > 1 ? "s" : ""
																]
															}, n, true, {
																fileName: _jsxFileName,
																lineNumber: 242,
																columnNumber: 57
															}, this)) }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 241,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 237,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 235,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: "space-y-2 col-span-2",
														children: [/* @__PURE__ */ (void 0)(Label, {
															htmlFor: "attendance",
															children: "Attendance"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 249,
															columnNumber: 27
														}, this), /* @__PURE__ */ (void 0)(Select, {
															value: attendance,
															onValueChange: setAttendance,
															children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
																id: "attendance",
																children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 252,
																	columnNumber: 31
																}, this)
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 251,
																columnNumber: 29
															}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: [
																5,
																4,
																3,
																2,
																1
															].map((n) => /* @__PURE__ */ (void 0)(SelectItem, {
																value: String(n),
																children: [
																	n,
																	" Star",
																	n > 1 ? "s" : ""
																]
															}, n, true, {
																fileName: _jsxFileName,
																lineNumber: 255,
																columnNumber: 57
															}, this)) }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 254,
																columnNumber: 29
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 250,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 248,
														columnNumber: 25
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 195,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (void 0)(Label, {
													htmlFor: "feedback",
													children: "Detailed Feedback"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 263,
													columnNumber: 25
												}, this), /* @__PURE__ */ (void 0)(Textarea, {
													id: "feedback",
													rows: 3,
													placeholder: "Provide performance feedback...",
													value: feedback,
													onChange: (e) => setFeedback(e.target.value),
													required: true
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 264,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 262,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (void 0)(DialogFooter, { children: /* @__PURE__ */ (void 0)(Button, {
												type: "submit",
												className: "bg-gradient-hero text-primary-foreground shadow-elegant w-full",
												disabled: reviewMutation.isPending,
												children: reviewMutation.isPending ? "Submitting..." : "Submit Review"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 267,
												columnNumber: 25
											}, this) }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 266,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 190,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 186,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 180,
								columnNumber: 32
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								asChild: true,
								variant: "outline",
								size: "sm",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/profile/$id",
									params: { id: e.id },
									children: "Public profile"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 275,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 274,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 179,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 163,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Info, {
							icon: Mail,
							label: "Email",
							value: e.email
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 284,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Info, {
							icon: Phone,
							label: "Phone",
							value: e.phone || "N/A"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 285,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Info, {
							icon: Briefcase,
							label: "Experience",
							value: `${e.experience} years`
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 286,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Info, {
							icon: Calendar,
							label: "Joined",
							value: joiningDateFormatted
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 287,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 283,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 162,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 160,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tabs, {
			defaultValue: "performance",
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsList, { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
						value: "performance",
						children: "Performance"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 294,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
						value: "reviews",
						children: "Review history"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 295,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
						value: "profile",
						children: "Profile"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 296,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 293,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
					value: "performance",
					className: "mt-4 space-y-5",
					children: reviewsLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-5 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartSkeleton, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 300,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartSkeleton, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 301,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 299,
						columnNumber: 29
					}, this) : reviewsError ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
						className: "border-amber-200/50 bg-amber-50/10 p-6 text-center",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-col items-center max-w-md mx-auto space-y-3 py-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldAlert, { className: "h-10 w-10 text-amber-600" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 304,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-lg font-bold text-foreground",
									children: "Detailed ratings are private"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 305,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm text-muted-foreground",
									children: "You do not have consent to view this professional's performance charts. You can submit a background check request to verify their credentials."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 306,
									columnNumber: 17
								}, this),
								user.companyId !== e.companyId && /* @__PURE__ */ (void 0)(Button, {
									className: "bg-gradient-hero text-primary-foreground shadow-elegant mt-2",
									onClick: () => requestMutation.mutate(),
									disabled: requestMutation.isPending || !isApproved,
									children: requestMutation.isPending ? "Requesting..." : "Request Verification"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 310,
									columnNumber: 52
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 303,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 302,
						columnNumber: 37
					}, this) : myReviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "py-6",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EmptyState, {
							icon: TrendingUp,
							title: "No performance data yet",
							description: "This employee has not received any performance reviews."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 315,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 314,
						columnNumber: 48
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-5 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
							className: "border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Latest rating breakdown" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 320,
								columnNumber: 21
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 319,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
								className: "h-72",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RadarChart, {
										data: radarData,
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PolarGrid, { stroke: "var(--color-border)" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 325,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PolarAngleAxis, {
												dataKey: "metric",
												tick: {
													fill: "var(--color-muted-foreground)",
													fontSize: 11
												}
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 326,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PolarRadiusAxis, {
												domain: [0, 5],
												tick: {
													fill: "var(--color-muted-foreground)",
													fontSize: 10
												}
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 330,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Radar, {
												dataKey: "v",
												stroke: "var(--color-chart-1)",
												fill: "var(--color-chart-1)",
												fillOpacity: .35
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 334,
												columnNumber: 25
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 324,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 323,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 322,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 318,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
							className: "border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Overall rating history" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 341,
								columnNumber: 21
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 340,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
								className: "h-72",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BarChart, {
										data: history,
										margin: {
											left: -20,
											right: 12
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartesianGrid, {
												strokeDasharray: "3 3",
												stroke: "var(--color-border)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 349,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(XAxis, {
												dataKey: "d",
												stroke: "var(--color-muted-foreground)",
												fontSize: 12
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 350,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(YAxis, {
												domain: [0, 5],
												stroke: "var(--color-muted-foreground)",
												fontSize: 12
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 351,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tooltip, { contentStyle: {
												background: "var(--color-popover)",
												border: "1px solid var(--color-border)",
												borderRadius: 8
											} }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 352,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bar, {
												dataKey: "rating",
												fill: "var(--color-chart-2)",
												radius: [
													6,
													6,
													0,
													0
												]
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 357,
												columnNumber: 25
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 345,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 344,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 343,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 339,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 317,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
						children: radarData.map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
							className: "border-border/60 bg-gradient-card",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
								className: "p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs uppercase tracking-wider text-muted-foreground",
										children: m.metric
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 366,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-1 font-display text-2xl font-bold",
										children: [
											m.v.toFixed(1),
											" ",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-sm text-muted-foreground",
												children: "/5"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 368,
												columnNumber: 42
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 367,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-2 h-1.5 overflow-hidden rounded-full bg-muted",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "h-full bg-gradient-hero",
											style: { width: `${m.v / 5 * 100}%` }
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 371,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 370,
										columnNumber: 23
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 365,
								columnNumber: 21
							}, this)
						}, m.metric, false, {
							fileName: _jsxFileName,
							lineNumber: 364,
							columnNumber: 37
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 363,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 316,
						columnNumber: 22
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 298,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
					value: "reviews",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
						className: "border-border/60",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
							className: "p-6",
							children: reviewsLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ListSkeleton, { count: 3 }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 383,
								columnNumber: 33
							}, this) : reviewsError ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col items-center max-w-md mx-auto space-y-3 py-6 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldAlert, { className: "h-10 w-10 text-amber-600" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 384,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "text-lg font-bold text-foreground",
										children: "Detailed reviews are private"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 385,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-sm text-muted-foreground",
										children: "Consent is required to view this professional's detailed reviews and evaluator feedback."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 386,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 383,
								columnNumber: 77
							}, this) : myReviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EmptyState, {
								icon: TrendingUp,
								title: "No review history",
								description: "Performance review history will appear here once reviews are submitted."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 389,
								columnNumber: 51
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative space-y-6 border-l border-border/60 pl-6",
								children: myReviews.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute -left-[27px] top-1 grid h-4 w-4 place-items-center rounded-full bg-gradient-hero shadow-elegant" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 391,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "font-semibold",
													children: new Date(r.createdAt).toLocaleDateString()
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 393,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
													variant: "outline",
													children: [r.overall.toFixed(1), " ★"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 394,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "text-xs text-muted-foreground",
													children: ["by ", r.reviewerName]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 395,
													columnNumber: 25
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 392,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "mt-2 text-sm text-muted-foreground",
											children: r.feedback
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 397,
											columnNumber: 23
										}, this)
									]
								}, r.id, true, {
									fileName: _jsxFileName,
									lineNumber: 390,
									columnNumber: 39
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 389,
								columnNumber: 198
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 382,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 381,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 380,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
					value: "profile",
					className: "mt-4 grid gap-5 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
						className: "border-border/60",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Skills" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 406,
							columnNumber: 15
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 405,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
							className: "flex flex-wrap gap-2",
							children: e.skills.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-sm text-muted-foreground",
								children: "No skills listed."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 409,
								columnNumber: 40
							}, this) : e.skills.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "outline",
								children: s
							}, s, false, {
								fileName: _jsxFileName,
								lineNumber: 409,
								columnNumber: 143
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 408,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 404,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
						className: "border-border/60",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Achievements" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 416,
							columnNumber: 15
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 415,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
							className: "space-y-3",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Award, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 420,
									columnNumber: 17
								}, this), " No achievements recorded yet."]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 419,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 418,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 414,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 403,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 292,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 153,
		columnNumber: 10
	}, this);
}
function Info({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center gap-3 rounded-lg border border-border/60 bg-background/40 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-4 w-4" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 439,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 438,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-[10px] uppercase tracking-wider text-muted-foreground",
				children: label
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 442,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "truncate text-sm font-medium",
				children: value
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 443,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 441,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 437,
		columnNumber: 10
	}, this);
}
//#endregion
export { EmployeeDetail as component };
