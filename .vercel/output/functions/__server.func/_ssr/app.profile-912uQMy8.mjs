import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DnxMo53r.mjs";
import { t as Badge } from "./badge-GBPLA4QD.mjs";
import { t as Input } from "./input-C8wv43d_.mjs";
import { n as useAuth } from "./auth-provider-CtLo-iYA.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-B-3oHQMO.mjs";
import { N as Globe, O as Mail, R as ExternalLink, T as Phone, et as Calendar, f as Sparkles, ot as BadgeCheck, rt as Briefcase } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CCXaAbeo.mjs";
import { t as PageHeader } from "./page-header-CDeKwgJG.mjs";
import { i as ProfileSkeleton, r as ListSkeleton } from "./loading-skeleton-BkAGb6P9.mjs";
import { t as Label } from "./label-ZItyyoZm.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as getEmployeeByUserId, l as updateEmployee, s as getEmploymentHistory } from "./employees.functions-DNhepElv.mjs";
import { r as updateUserProfile } from "./users.functions-BVnxnYlY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.profile-912uQMy8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/routes/app.profile.tsx?tsr-split=component";
function ProfilePage() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const { data: employee, isLoading: isEmployeeLoading } = useQuery({
		queryKey: ["employee-self", user?.id],
		queryFn: () => getEmployeeByUserId({ data: { userId: user.id } })
	});
	const { data: history, isLoading: isHistoryLoading } = useQuery({
		queryKey: ["employee-history-self", employee?.id],
		queryFn: () => getEmploymentHistory({ data: { employeeId: employee.id } }),
		enabled: !!employee?.id
	});
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [avatarUrl, setAvatarUrl] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [experience, setExperience] = (0, import_react.useState)(0);
	const [designation, setDesignation] = (0, import_react.useState)("");
	const [department, setDepartment] = (0, import_react.useState)("");
	const [skills, setSkills] = (0, import_react.useState)("");
	const [certifications, setCertifications] = (0, import_react.useState)("");
	const [portfolioLinks, setPortfolioLinks] = (0, import_react.useState)("");
	const [resumeUrl, setResumeUrl] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (employee) {
			setFullName(employee.fullName || "");
			setAvatarUrl(employee.photoUrl || user?.avatarUrl || "");
			setPhone(employee.phone || "");
			setExperience(employee.experience || 0);
			setDesignation(employee.designation || "");
			setDepartment(employee.department || "");
			setSkills(employee.skills ? employee.skills.join(", ") : "");
			setCertifications(employee.certifications ? employee.certifications.join(", ") : "");
			setPortfolioLinks(employee.portfolioLinks ? employee.portfolioLinks.join(", ") : "");
			setResumeUrl(employee.resumeUrl || "");
		}
	}, [employee, user]);
	const updateProfileMutation = useMutation({
		mutationFn: async (data) => {
			await updateUserProfile({ data: {
				fullName: data.fullName,
				avatarUrl: data.photoUrl
			} });
			return updateEmployee({ data });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["employee-self"] });
			queryClient.invalidateQueries({ queryKey: ["employee-history-self"] });
			toast.success("Profile saved successfully");
		},
		onError: (err) => {
			toast.error(err.message || "Failed to update profile");
		}
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!employee) return;
		const parsedSkills = skills ? skills.split(",").map((s) => s.trim()).filter((s) => s.length > 0) : [];
		const parsedCertifications = certifications ? certifications.split(",").map((s) => s.trim()).filter((s) => s.length > 0) : [];
		const parsedPortfolioLinks = portfolioLinks ? portfolioLinks.split(",").map((s) => s.trim()).filter((s) => s.length > 0) : [];
		updateProfileMutation.mutate({
			id: employee.id,
			fullName,
			phone,
			experience: Number(experience),
			designation,
			department,
			skills: parsedSkills,
			certifications: parsedCertifications,
			portfolioLinks: parsedPortfolioLinks,
			resumeUrl,
			photoUrl: avatarUrl
		});
	};
	if (isEmployeeLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfileSkeleton, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 125,
		columnNumber: 12
	}, this);
	const initials = (fullName || user?.fullName || "P").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
			title: "My Profile",
			description: "View and manage your workforce professional identity."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 129,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-6 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "lg:col-span-2 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
					className: "overflow-hidden border-border/60 bg-gradient-card",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "h-24 bg-gradient-hero flex items-center justify-end px-6",
						children: employee?.trustScore !== void 0 && /* @__PURE__ */ (void 0)("div", {
							className: "bg-background/90 backdrop-blur border text-foreground px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5 translate-y-6",
							children: [
								/* @__PURE__ */ (void 0)(Sparkles, { className: "h-3.5 w-3.5 text-primary" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 137,
									columnNumber: 19
								}, this),
								"Trust Score: ",
								employee.trustScore
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 136,
							columnNumber: 54
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
						className: "mt-2 p-6 pt-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex gap-4 items-end -mt-10 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, {
								className: "h-24 w-24 border-4 border-background shadow-elegant",
								children: [avatarUrl && /* @__PURE__ */ (void 0)(AvatarImage, {
									src: avatarUrl,
									alt: fullName
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 144,
									columnNumber: 33
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AvatarFallback, {
									className: "text-xl font-bold",
									children: initials
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 145,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 143,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "font-display text-2xl font-bold flex items-center gap-1.5",
									children: [fullName || user?.fullName, employee?.verified && /* @__PURE__ */ (void 0)(BadgeCheck, { className: "h-5 w-5 text-primary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 150,
										columnNumber: 44
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 148,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm text-muted-foreground capitalize",
									children: employee?.companyId ? "Verified Employee" : "Independent Professional"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 152,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 147,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 142,
							columnNumber: 15
						}, this), employee ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-3 rounded-lg border p-3 bg-background/40",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "h-5 w-5 text-primary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 160,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-[10px] uppercase tracking-wider text-muted-foreground",
											children: "Work Email"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 162,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-sm font-medium truncate",
											children: employee.email
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 163,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 161,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 159,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-3 rounded-lg border p-3 bg-background/40",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { className: "h-5 w-5 text-primary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 167,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[10px] uppercase tracking-wider text-muted-foreground",
										children: "Phone"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 169,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-sm font-medium",
										children: employee.phone || "Not set"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 170,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 168,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 166,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-3 rounded-lg border p-3 bg-background/40",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Briefcase, { className: "h-5 w-5 text-primary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 174,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-[10px] uppercase tracking-wider text-muted-foreground",
											children: "Designation & Dept"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 176,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-sm font-medium truncate",
											children: [
												employee.designation,
												" · ",
												employee.department
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 177,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 175,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 173,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-3 rounded-lg border p-3 bg-background/40",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { className: "h-5 w-5 text-primary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 183,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[10px] uppercase tracking-wider text-muted-foreground",
										children: "Joining Date"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 185,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-sm font-medium",
										children: new Date(employee.joiningDate).toLocaleDateString()
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 186,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 184,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 182,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 158,
							columnNumber: 27
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-sm text-muted-foreground bg-muted/20 border rounded-lg p-4",
							children: "No linked employee workspace profile found."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 191,
							columnNumber: 26
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 141,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 134,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
					className: "border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Edit Profile Info" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 200,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, { children: "Update your professional profile details, resume, and credentials." }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 201,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 199,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: handleSubmit,
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "displayName",
										children: "Display Name"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 207,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "displayName",
										value: fullName,
										onChange: (e) => setFullName(e.target.value),
										required: true
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 208,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 206,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "avatarUrl",
										children: "Avatar Image URL"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 211,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "avatarUrl",
										placeholder: "https://...",
										value: avatarUrl,
										onChange: (e) => setAvatarUrl(e.target.value)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 212,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 210,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "phone",
										children: "Phone Number"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 215,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "phone",
										value: phone,
										onChange: (e) => setPhone(e.target.value)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 216,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 214,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "experience",
										children: "Years of Experience"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 219,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "experience",
										type: "number",
										min: "0",
										value: experience,
										onChange: (e) => setExperience(Number(e.target.value))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 220,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 218,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "designation",
										children: "Designation"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 223,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "designation",
										value: designation,
										onChange: (e) => setDesignation(e.target.value)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 224,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 222,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "department",
										children: "Department"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 227,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "department",
										value: department,
										onChange: (e) => setDepartment(e.target.value)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 228,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 226,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "resumeUrl",
										children: "Resume Document URL"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 231,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "resumeUrl",
										placeholder: "https://...",
										value: resumeUrl,
										onChange: (e) => setResumeUrl(e.target.value)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 232,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 230,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "skills",
										children: "Skills (Comma-separated)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 235,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "skills",
										placeholder: "React, Node.js, TypeScript",
										value: skills,
										onChange: (e) => setSkills(e.target.value)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 236,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 234,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "certifications",
										children: "Certifications (Comma-separated)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 239,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "certifications",
										placeholder: "AWS Solution Architect, PMP",
										value: certifications,
										onChange: (e) => setCertifications(e.target.value)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 240,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 238,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "portfolioLinks",
										children: "Portfolio & Social Links (Comma-separated)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 243,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "portfolioLinks",
										placeholder: "https://github.com/me, https://portfolio.me",
										value: portfolioLinks,
										onChange: (e) => setPortfolioLinks(e.target.value)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 244,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 242,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 205,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "pt-2 flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								type: "submit",
								className: "bg-gradient-hero text-primary-foreground shadow-elegant",
								disabled: updateProfileMutation.isPending,
								children: updateProfileMutation.isPending ? "Saving..." : "Save Profile"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 248,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 247,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 204,
						columnNumber: 15
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 203,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 198,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 133,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
					className: "border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Verified Timeline" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 261,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, { children: "Your career history status logs" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 262,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 260,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, { children: isHistoryLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ListSkeleton, { count: 3 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 265,
						columnNumber: 35
					}, this) : !history || history.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-center py-6 text-sm text-muted-foreground",
						children: "No career history records logged. Add entries from the dashboard."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 265,
						columnNumber: 99
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4",
						children: history.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "border rounded-lg p-3 bg-muted/10 space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex justify-between items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-semibold text-sm text-foreground block",
									children: item.companyName
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 271,
									columnNumber: 27
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs text-muted-foreground",
									children: item.designation
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 274,
									columnNumber: 27
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 270,
									columnNumber: 25
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
									variant: item.verificationStatus === "verified" ? "default" : item.verificationStatus === "rejected" ? "destructive" : "outline",
									className: "capitalize text-[10px]",
									children: item.verificationStatus
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 276,
									columnNumber: 25
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 269,
								columnNumber: 23
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[10px] text-muted-foreground flex flex-col gap-0.5 pt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
										"Timeline: ",
										new Date(item.joiningDate).toLocaleDateString(),
										" -",
										" ",
										item.exitDate ? new Date(item.exitDate).toLocaleDateString() : "Present"
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 281,
										columnNumber: 25
									}, this),
									item.department && /* @__PURE__ */ (void 0)("span", { children: ["Department: ", item.department] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 285,
										columnNumber: 45
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
										"Experience: ",
										item.experience,
										" years"
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 286,
										columnNumber: 25
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 280,
								columnNumber: 23
							}, this)]
						}, item.id, true, {
							fileName: _jsxFileName,
							lineNumber: 268,
							columnNumber: 40
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 267,
						columnNumber: 26
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 264,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 259,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
					className: "border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Portfolio Links" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 295,
						columnNumber: 15
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 294,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
						className: "space-y-2 text-sm",
						children: employee && employee.portfolioLinks && employee.portfolioLinks.length > 0 ? employee.portfolioLinks.map((link, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: link,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-primary hover:underline flex items-center gap-1.5 truncate",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "h-4 w-4 shrink-0" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 299,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "truncate",
									children: link.replace("https://", "").replace("http://", "")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 300,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "h-3 w-3 shrink-0 ml-auto" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 301,
									columnNumber: 21
								}, this)
							]
						}, idx, true, {
							fileName: _jsxFileName,
							lineNumber: 298,
							columnNumber: 151
						}, this)) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-muted-foreground",
							children: "No portfolio links added."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 302,
							columnNumber: 27
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 297,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 293,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 258,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 131,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 128,
		columnNumber: 10
	}, this);
}
//#endregion
export { ProfilePage as component };
