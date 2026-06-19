import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BPK1zgJN.mjs";
import { t as Badge } from "./badge-KS2SooOw.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Input } from "./input-BYcV5Phs.mjs";
import { n as useAuth } from "./auth-provider-DIoK8pn-.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-BbAAdpLg.mjs";
import { B as EllipsisVertical, C as Plus, H as Copy, P as Funnel, S as RefreshCw, at as Ban, b as Search, n as X, ot as BadgeCheck, r as Users, u as Trash2 } from "../_libs/lucide-react.mjs";
import { a as DropdownMenuSeparator, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-BuTtChvS.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Card } from "./card-DRtcuf8H.mjs";
import { t as PageHeader } from "./page-header-DHJUr0Vr.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DdpCoWi7.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-C9T31-X3.mjs";
import { a as PaginationNext, i as PaginationLink, n as PaginationContent, o as PaginationPrevious, r as PaginationItem, t as Pagination } from "./pagination-7DnslzYf.mjs";
import { o as TableSkeleton } from "./loading-skeleton-BKYH7Wpk.mjs";
import { t as EmptyState } from "./empty-state-B-onYlus.mjs";
import { t as Label } from "./label-qle7VSy6.mjs";
import { a as DialogFooter, c as DialogTrigger, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-OO5XYV91.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as listEmployees, l as regenerateEmployeeInviteLink, n as createEmployee, o as getEmployeeInviteLink, r as deleteEmployee, u as updateEmployee } from "./employees.functions-BfzS3dm3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.employees.index-BWbeppvH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WhatsAppIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	fill: "currentColor",
	viewBox: "0 0 24 24",
	className: props.className,
	style: {
		width: "1rem",
		height: "1rem",
		...props.style
	},
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.388 1.967 13.91 .94 11.283.94c-5.442 0-9.866 4.372-9.87 9.802 0 1.83.504 3.609 1.46 5.19L1.816 21.66l5.83-1.506zm9.234-5.656c-.266-.134-1.58-.78-1.827-.868-.247-.09-.427-.134-.607.134-.18.266-.697.868-.853 1.047-.157.18-.314.201-.58.067-.266-.134-1.127-.415-2.147-1.326-.79-.705-1.324-1.577-1.48-1.845-.157-.266-.017-.41.117-.543.12-.12.266-.314.4-.47.134-.157.18-.268.269-.447.09-.18.045-.335-.022-.47-.067-.134-.607-1.462-.83-2c-.217-.524-.436-.453-.607-.462-.157-.008-.337-.01-.517-.01-.18 0-.472.067-.719.336-.247.268-.944.923-.944 2.25 0 1.327.965 2.607 1.1 2.785.134.18 1.9 2.9 4.6 4.069.643.277 1.143.444 1.532.568.646.205 1.233.176 1.7.107.52-.078 1.58-.645 1.802-1.27.225-.625.225-1.16.157-1.27-.067-.113-.247-.18-.513-.314z" })
});
var PER_PAGE = 8;
function EmployeesPage() {
	const { user } = useAuth();
	const isApproved = user.role === "super_admin" || user.companyStatus === "approved";
	const queryClient = useQueryClient();
	const [q, setQ] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [page, setPage] = (0, import_react.useState)(1);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [designation, setDesignation] = (0, import_react.useState)("");
	const [department, setDepartment] = (0, import_react.useState)("");
	const [experience, setExperience] = (0, import_react.useState)(0);
	const [joiningDate, setJoiningDate] = (0, import_react.useState)("");
	const [skills, setSkills] = (0, import_react.useState)("");
	const [sendEmail, setSendEmail] = (0, import_react.useState)(true);
	const [createdEmployeeInfo, setCreatedEmployeeInfo] = (0, import_react.useState)(null);
	const { data, isLoading } = useQuery({
		queryKey: [
			"employees",
			q,
			status,
			page
		],
		queryFn: () => listEmployees({ data: {
			page,
			pageSize: PER_PAGE,
			search: q || void 0,
			status: status === "all" ? void 0 : status
		} })
	});
	const mutation = useMutation({
		mutationFn: (newEmp) => createEmployee({ data: newEmp }),
		onSuccess: (res) => {
			queryClient.invalidateQueries({ queryKey: ["employees"] });
			toast.success("Employee added successfully");
			setOpen(false);
			setCreatedEmployeeInfo({
				fullName: res.fullName,
				email: res.email,
				phone: res.phone || "",
				invitationId: res.invitationId,
				companyName: res.companyName
			});
			setFullName("");
			setEmail("");
			setPhone("");
			setDesignation("");
			setDepartment("");
			setExperience(0);
			setJoiningDate("");
			setSkills("");
			setSendEmail(true);
		},
		onError: (err) => {
			toast.error(err instanceof Error ? err.message : "Failed to add employee");
		}
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => deleteEmployee({ data: { id } }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["employees"] });
			toast.success("Employee permanently deleted");
		},
		onError: (err) => {
			toast.error(err instanceof Error ? err.message : "Failed to delete employee");
		}
	});
	const updateStatusMutation = useMutation({
		mutationFn: ({ id, status }) => updateEmployee({ data: {
			id,
			status
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["employees"] });
			toast.success("Employee status updated successfully");
		},
		onError: (err) => {
			toast.error(err instanceof Error ? err.message : "Failed to update status");
		}
	});
	const handleCreate = (e) => {
		e.preventDefault();
		const skillsArray = skills.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
		mutation.mutate({
			fullName,
			email,
			phone,
			designation,
			department,
			experience: Number(experience),
			joiningDate,
			skills: skillsArray,
			sendEmail
		});
	};
	const shareOnWhatsApp = (employeeName, companyName, claimLink, phone) => {
		const message = `Hello ${employeeName},

Your WorkCred profile has been created by ${companyName}.

Please claim your profile using the secure link below:

${claimLink}

After claiming your profile, you can:

* Access your profile
* View work history
* View performance reviews
* Manage verification requests
* Manage consent settings

Regards,
WorkCred Team`;
		const baseUrl = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "whatsapp://send" : "https://web.whatsapp.com/send";
		const params = new URLSearchParams();
		if (phone) {
			const sanitizedPhone = phone.replace(/[^\d+]/g, "");
			params.append("phone", sanitizedPhone);
		}
		params.append("text", message);
		const finalUrl = `${baseUrl}?${params.toString()}`;
		window.open(finalUrl, "_blank");
	};
	const handleShareWhatsAppInvite = async (employeeId) => {
		try {
			const res = await getEmployeeInviteLink({ data: { employeeId } });
			const claimLink = `${window.location.origin}/auth/signup?inviteId=${res.invitationId}`;
			shareOnWhatsApp(res.fullName, res.companyName, claimLink, res.phone);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to share invite");
		}
	};
	const handleCopyInviteLink = async (employeeId) => {
		try {
			const res = await getEmployeeInviteLink({ data: { employeeId } });
			const claimLink = `${window.location.origin}/auth/signup?inviteId=${res.invitationId}`;
			await navigator.clipboard.writeText(claimLink);
			toast.success("Invite link copied to clipboard");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to copy invite link");
		}
	};
	const handleRegenerateInviteLink = async (employeeId) => {
		try {
			const res = await regenerateEmployeeInviteLink({ data: { employeeId } });
			setCreatedEmployeeInfo({
				fullName: res.fullName,
				email: "",
				phone: res.phone || "",
				invitationId: res.invitationId,
				companyName: res.companyName
			});
			toast.success("Invite link regenerated successfully");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to regenerate invite link");
		}
	};
	const employeesList = data?.data ?? [];
	const total = data?.total ?? 0;
	const pages = data?.totalPages ?? 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Employees",
			description: "Search, manage and verify employees across your organization.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "bg-gradient-hero text-primary-foreground shadow-elegant",
						disabled: !isApproved,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add employee"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add employee" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "grid grid-cols-2 gap-3",
						onSubmit: handleCreate,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "fullName",
									children: "Full name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "fullName",
									required: true,
									value: fullName,
									onChange: (e) => setFullName(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "email",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "email",
									type: "email",
									required: true,
									value: email,
									onChange: (e) => setEmail(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "phone",
									children: "Phone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "phone",
									type: "tel",
									required: true,
									value: phone,
									onChange: (e) => setPhone(e.target.value),
									placeholder: "e.g. +919876543210"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "designation",
									children: "Designation"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "designation",
									required: true,
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
									required: true,
									value: department,
									onChange: (e) => setDepartment(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "experience",
									children: "Experience (yrs)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "experience",
									type: "number",
									required: true,
									min: 0,
									value: experience,
									onChange: (e) => setExperience(Number(e.target.value))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "joiningDate",
									children: "Joining date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "joiningDate",
									type: "date",
									required: true,
									value: joiningDate,
									onChange: (e) => setJoiningDate(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "skills",
									children: "Skills (comma separated)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "skills",
									placeholder: "React, Leadership, SQL",
									value: skills,
									onChange: (e) => setSkills(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center space-x-2 col-span-2 mt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									id: "sendEmail",
									checked: sendEmail,
									onChange: (e) => setSendEmail(e.target.checked),
									className: "h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "sendEmail",
									className: "cursor-pointer text-sm font-medium text-muted-foreground",
									children: "Send invitation email to employee"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
								className: "col-span-2 mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "bg-gradient-hero text-primary-foreground shadow-elegant",
									disabled: mutation.isPending,
									children: mutation.isPending ? "Adding..." : "Add employee"
								})
							})
						]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "border-border/60 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: q,
								onChange: (e) => {
									setPage(1);
									setQ(e.target.value);
								},
								placeholder: "Search by name, email, ID, designation…",
								className: "pl-9",
								disabled: !isApproved
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: status,
							onValueChange: (v) => {
								setStatus(v);
								setPage(1);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
								className: "w-full sm:w-44",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "mr-2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "All status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "active",
									children: "Active"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "on_leave",
									children: "On leave"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "exited",
									children: "Exited"
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden text-xs text-muted-foreground sm:flex sm:items-center sm:justify-end",
							children: [total, " results"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 overflow-hidden rounded-lg border",
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
						rows: PER_PAGE,
						columns: 5
					}) : employeesList.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: Users,
							title: "No employees found",
							description: "We couldn't find any employee profiles matching your search or filters."
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Employee" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Department" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Experience" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Rating" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: employeesList.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-9 w-9",
								children: [e.photoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
									src: e.photoUrl,
									alt: e.fullName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: e.fullName[0] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 font-medium flex-wrap",
									children: [
										e.fullName,
										e.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-3.5 w-3.5 text-primary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: e.claimStatus === "claimed" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[9px] px-1.5 py-0 h-4 flex items-center font-normal" : "border-amber-500/30 bg-amber-500/10 text-amber-400 text-[9px] px-1.5 py-0 h-4 flex items-center font-normal",
											children: e.claimStatus === "claimed" ? "Verified Employee" : "Profile Not Claimed"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground",
									children: [
										e.employeeId,
										" · ",
										e.designation
									]
								})]
							})]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: e.department }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [e.experience, " yrs"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: e.status === "active" ? "border-success/40 bg-success/10 text-success capitalize" : e.status === "on_leave" ? "border-warning/40 bg-warning/10 text-warning capitalize" : "border-border bg-muted text-muted-foreground capitalize",
							children: e.status.replace("_", " ")
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: e.rating > 0 ? e.rating.toFixed(1) : "N/A"
							}),
							" ",
							e.rating > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "★"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									size: "sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/app/employees/$id",
										params: { id: e.id },
										children: "View"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										className: "h-8 w-8 p-0 cursor-pointer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "h-4 w-4" })
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
									align: "end",
									children: [
										e.claimStatus === "unclaimed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => handleCopyInviteLink(e.id),
												className: "cursor-pointer text-sky-600 focus:text-sky-600 focus:bg-sky-50 dark:focus:bg-sky-950/20",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "mr-2 h-4 w-4" }), " Copy Invite Link"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => handleShareWhatsAppInvite(e.id),
												className: "cursor-pointer text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50 dark:focus:bg-emerald-950/20",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "mr-2 h-4 w-4 fill-emerald-600" }), " Share WhatsApp Invite"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => handleRegenerateInviteLink(e.id),
												className: "cursor-pointer text-amber-600 focus:text-amber-600 focus:bg-amber-50 dark:focus:bg-amber-950/20",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "mr-2 h-4 w-4" }), " Regenerate Invite Link"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {})
										] }),
										e.status !== "active" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											onClick: () => updateStatusMutation.mutate({
												id: e.id,
												status: "active"
											}),
											className: "cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4 text-emerald-500" }), " Activate"]
										}),
										e.status !== "on_leave" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											onClick: () => updateStatusMutation.mutate({
												id: e.id,
												status: "on_leave"
											}),
											className: "cursor-pointer text-amber-500 focus:text-amber-500",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "mr-2 h-4 w-4" }), " Suspend"]
										}),
										e.status !== "exited" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											onClick: () => updateStatusMutation.mutate({
												id: e.id,
												status: "exited"
											}),
											className: "cursor-pointer text-slate-500 focus:text-slate-500",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mr-2 h-4 w-4" }), " Revoke / Exit"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											onClick: () => {
												if (confirm(`Are you sure you want to permanently delete "${e.fullName}"?`)) deleteMutation.mutate(e.id);
											},
											className: "cursor-pointer text-rose-600 font-semibold focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 h-4 w-4" }), " Permanent Delete"]
										})
									]
								})] })]
							})
						})
					] }, e.id)) })] })
				}),
				!isLoading && pages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationPrevious, {
							onClick: () => setPage((p) => Math.max(1, p - 1)),
							className: page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
						}) }),
						Array.from({ length: pages }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationLink, {
							isActive: page === i + 1,
							onClick: () => setPage(i + 1),
							className: "cursor-pointer",
							children: i + 1
						}) }, i)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNext, {
							onClick: () => setPage((p) => Math.min(pages, p + 1)),
							className: page === pages ? "pointer-events-none opacity-50" : "cursor-pointer"
						}) })
					] })
				})
			]
		}),
		createdEmployeeInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!createdEmployeeInfo,
			onOpenChange: (isOpen) => {
				if (!isOpen) setCreatedEmployeeInfo(null);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-md border-border/40 bg-card/80 backdrop-blur-md shadow-elegant rounded-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
						className: "space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 mb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "text-center font-display text-xl font-bold",
								children: "Onboarding Link Generated"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-center text-sm text-muted-foreground",
								children: [
									"Employee profile created for ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: createdEmployeeInfo.fullName
									}),
									"."
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 my-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "claimLink",
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: "Claim URL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "claimLink",
									readOnly: true,
									value: `${window.location.origin}/auth/signup?inviteId=${createdEmployeeInfo.invitationId}`,
									onClick: (e) => e.target.select(),
									className: "bg-muted font-mono text-xs select-all"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "outline",
									onClick: async () => {
										const link = `${window.location.origin}/auth/signup?inviteId=${createdEmployeeInfo.invitationId}`;
										await navigator.clipboard.writeText(link);
										toast.success("Claim link copied to clipboard");
									},
									className: "shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" })
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border bg-muted/30 p-3 text-xs space-y-1 text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-foreground mb-1",
								children: "WhatsApp message template:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "whitespace-pre-line leading-relaxed font-sans border-l-2 border-primary/20 pl-2 bg-muted/10 py-1",
								children: `Hello ${createdEmployeeInfo.fullName},

Your WorkCred profile has been created by ${createdEmployeeInfo.companyName}.

Please claim your profile using the secure link below:

[Claim Link]

After claiming your profile, you can:

* Access your profile
* View work history
* View performance reviews
* Manage verification requests
* Manage consent settings

Regards,
WorkCred Team`
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "grid grid-cols-2 gap-2 sm:space-x-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "w-full",
							onClick: async () => {
								const link = `${window.location.origin}/auth/signup?inviteId=${createdEmployeeInfo.invitationId}`;
								await navigator.clipboard.writeText(link);
								toast.success("Claim link copied to clipboard");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "mr-2 h-4 w-4" }), " Copy Invite Link"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "w-full bg-[#25D366] hover:bg-[#20ba5a] text-white",
							onClick: () => {
								const link = `${window.location.origin}/auth/signup?inviteId=${createdEmployeeInfo.invitationId}`;
								shareOnWhatsApp(createdEmployeeInfo.fullName, createdEmployeeInfo.companyName, link, createdEmployeeInfo.phone);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "mr-2 h-4 w-4 fill-white" }), " Share on WhatsApp"]
						})]
					})
				]
			})
		})
	] });
}
//#endregion
export { EmployeesPage as component };
