import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BPK1zgJN.mjs";
import { t as Badge } from "./badge-KS2SooOw.mjs";
import { t as Input } from "./input-BYcV5Phs.mjs";
import { n as useAuth } from "./auth-provider-DIoK8pn-.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-BbAAdpLg.mjs";
import { N as Globe, O as Mail, R as ExternalLink, T as Phone, et as Calendar, f as Sparkles, ot as BadgeCheck, rt as Briefcase } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-DRtcuf8H.mjs";
import { t as PageHeader } from "./page-header-DHJUr0Vr.mjs";
import { i as ProfileSkeleton, r as ListSkeleton } from "./loading-skeleton-BKYH7Wpk.mjs";
import { t as Label } from "./label-qle7VSy6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as getEmployeeByUserId, s as getEmploymentHistory, u as updateEmployee } from "./employees.functions-BfzS3dm3.mjs";
import { r as updateUserProfile } from "./users.functions-B1Y8sN5J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.profile-B3rCF533.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	if (isEmployeeLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSkeleton, {});
	const initials = (fullName || user?.fullName || "P").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "My Profile",
			description: "View and manage your workforce professional identity."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "overflow-hidden border-border/60 bg-gradient-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-24 bg-gradient-hero flex items-center justify-end px-6",
						children: employee?.trustScore !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-background/90 backdrop-blur border text-foreground px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5 translate-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
								"Trust Score: ",
								employee.trustScore
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "mt-2 p-6 pt-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4 items-end -mt-10 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-24 w-24 border-4 border-background shadow-elegant",
								children: [avatarUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
									src: avatarUrl,
									alt: fullName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
									className: "text-xl font-bold",
									children: initials
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-display text-2xl font-bold flex items-center gap-1.5",
									children: [fullName || user?.fullName, employee?.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-5 w-5 text-primary" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground capitalize",
									children: employee?.companyId ? "Verified Employee" : "Independent Professional"
								})]
							})]
						}), employee ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 rounded-lg border p-3 bg-background/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] uppercase tracking-wider text-muted-foreground",
											children: "Work Email"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-medium truncate",
											children: employee.email
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 rounded-lg border p-3 bg-background/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-wider text-muted-foreground",
										children: "Phone"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-medium",
										children: employee.phone || "Not set"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 rounded-lg border p-3 bg-background/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] uppercase tracking-wider text-muted-foreground",
											children: "Designation & Dept"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-sm font-medium truncate",
											children: [
												employee.designation,
												" · ",
												employee.department
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 rounded-lg border p-3 bg-background/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-wider text-muted-foreground",
										children: "Joining Date"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-medium",
										children: new Date(employee.joiningDate).toLocaleDateString()
									})] })]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted-foreground bg-muted/20 border rounded-lg p-4",
							children: "No linked employee workspace profile found."
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Edit Profile Info" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Update your professional profile details, resume, and credentials." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "displayName",
										children: "Display Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "displayName",
										value: fullName,
										onChange: (e) => setFullName(e.target.value),
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "avatarUrl",
										children: "Avatar Image URL"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "avatarUrl",
										placeholder: "https://...",
										value: avatarUrl,
										onChange: (e) => setAvatarUrl(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "phone",
										children: "Phone Number"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "phone",
										value: phone,
										onChange: (e) => setPhone(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "experience",
										children: "Years of Experience"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "experience",
										type: "number",
										min: "0",
										value: experience,
										onChange: (e) => setExperience(Number(e.target.value))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "designation",
										children: "Designation"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "designation",
										value: designation,
										onChange: (e) => setDesignation(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "department",
										children: "Department"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "department",
										value: department,
										onChange: (e) => setDepartment(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "resumeUrl",
										children: "Resume Document URL"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "resumeUrl",
										placeholder: "https://...",
										value: resumeUrl,
										onChange: (e) => setResumeUrl(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "skills",
										children: "Skills (Comma-separated)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "skills",
										placeholder: "React, Node.js, TypeScript",
										value: skills,
										onChange: (e) => setSkills(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "certifications",
										children: "Certifications (Comma-separated)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "certifications",
										placeholder: "AWS Solution Architect, PMP",
										value: certifications,
										onChange: (e) => setCertifications(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "portfolioLinks",
										children: "Portfolio & Social Links (Comma-separated)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "portfolioLinks",
										placeholder: "https://github.com/me, https://portfolio.me",
										value: portfolioLinks,
										onChange: (e) => setPortfolioLinks(e.target.value)
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-2 flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "bg-gradient-hero text-primary-foreground shadow-elegant",
								disabled: updateProfileMutation.isPending,
								children: updateProfileMutation.isPending ? "Saving..." : "Save Profile"
							})
						})]
					}) })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Verified Timeline" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Your career history status logs" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: isHistoryLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 3 }) : !history || history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center py-6 text-sm text-muted-foreground",
						children: "No career history records logged. Add entries from the dashboard."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: history.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border rounded-lg p-3 bg-muted/10 space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-sm text-foreground block",
									children: item.companyName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: item.designation
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: item.verificationStatus === "verified" ? "default" : item.verificationStatus === "rejected" ? "destructive" : "outline",
									className: "capitalize text-[10px]",
									children: item.verificationStatus
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[10px] text-muted-foreground flex flex-col gap-0.5 pt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Timeline: ",
										new Date(item.joiningDate).toLocaleDateString(),
										" -",
										" ",
										item.exitDate ? new Date(item.exitDate).toLocaleDateString() : "Present"
									] }),
									item.department && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Department: ", item.department] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Experience: ",
										item.experience,
										" years"
									] })
								]
							})]
						}, item.id))
					}) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Portfolio Links" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "space-y-2 text-sm",
						children: employee && employee.portfolioLinks && employee.portfolioLinks.length > 0 ? employee.portfolioLinks.map((link, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: link,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-primary hover:underline flex items-center gap-1.5 truncate",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-4 w-4 shrink-0" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: link.replace("https://", "").replace("http://", "")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3 shrink-0 ml-auto" })
							]
						}, idx)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "No portfolio links added."
						})
					})]
				})]
			})]
		})]
	});
}
//#endregion
export { ProfilePage as component };
