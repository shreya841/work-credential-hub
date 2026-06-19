import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DnxMo53r.mjs";
import { t as Badge } from "./badge-GBPLA4QD.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Input } from "./input-C8wv43d_.mjs";
import { n as useAuth } from "./auth-provider-CtLo-iYA.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-B-3oHQMO.mjs";
import { B as EllipsisVertical, C as Plus, H as Copy, P as Funnel, at as Ban, b as Search, n as X, ot as BadgeCheck, r as Users, u as Trash2 } from "../_libs/lucide-react.mjs";
import { a as DropdownMenuSeparator, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-D50QXS9o.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Card } from "./card-CCXaAbeo.mjs";
import { t as PageHeader } from "./page-header-CDeKwgJG.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-mLrJhqIt.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-cNCVehGV.mjs";
import { a as PaginationNext, i as PaginationLink, n as PaginationContent, o as PaginationPrevious, r as PaginationItem, t as Pagination } from "./pagination-ulKYo7ZP.mjs";
import { o as TableSkeleton } from "./loading-skeleton-BkAGb6P9.mjs";
import { t as EmptyState } from "./empty-state-DmMIw0uj.mjs";
import { t as Label } from "./label-ZItyyoZm.mjs";
import { a as DialogFooter, c as DialogTrigger, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-BgWFhrxr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as listEmployees, l as updateEmployee, n as createEmployee, o as getEmployeeInviteLink, r as deleteEmployee } from "./employees.functions-DNhepElv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.employees.index--b94-Qnd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/routes/app.employees.index.tsx?tsr-split=component";
var WhatsAppIcon = (props) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
	fill: "currentColor",
	viewBox: "0 0 24 24",
	className: props.className,
	style: {
		width: "1rem",
		height: "1rem",
		...props.style
	},
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.388 1.967 13.91 .94 11.283.94c-5.442 0-9.866 4.372-9.87 9.802 0 1.83.504 3.609 1.46 5.19L1.816 21.66l5.83-1.506zm9.234-5.656c-.266-.134-1.58-.78-1.827-.868-.247-.09-.427-.134-.607.134-.18.266-.697.868-.853 1.047-.157.18-.314.201-.58.067-.266-.134-1.127-.415-2.147-1.326-.79-.705-1.324-1.577-1.48-1.845-.157-.266-.017-.41.117-.543.12-.12.266-.314.4-.47.134-.157.18-.268.269-.447.09-.18.045-.335-.022-.47-.067-.134-.607-1.462-.83-2c-.217-.524-.436-.453-.607-.462-.157-.008-.337-.01-.517-.01-.18 0-.472.067-.719.336-.247.268-.944.923-.944 2.25 0 1.327.965 2.607 1.1 2.785.134.18 1.9 2.9 4.6 4.069.643.277 1.143.444 1.532.568.646.205 1.233.176 1.7.107.52-.078 1.58-.645 1.802-1.27.225-.625.225-1.16.157-1.27-.067-.113-.247-.18-.513-.314z" }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 27,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 22,
	columnNumber: 64
}, void 0);
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

Please claim your profile using the link below:

${claimLink}

After claiming your profile, you can:

* View your work history
* View performance summaries
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
	const employeesList = data?.data ?? [];
	const total = data?.total ?? 0;
	const pages = data?.totalPages ?? 1;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
			title: "Employees",
			description: "Search, manage and verify employees across your organization.",
			actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						className: "bg-gradient-hero text-primary-foreground shadow-elegant",
						disabled: !isApproved,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "mr-1 h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 221,
							columnNumber: 17
						}, this), " Add employee"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 220,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 219,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "max-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, { children: "Add employee" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 226,
						columnNumber: 17
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 225,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						className: "grid grid-cols-2 gap-3",
						onSubmit: handleCreate,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2 col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "fullName",
									children: "Full name"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 230,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "fullName",
									required: true,
									value: fullName,
									onChange: (e) => setFullName(e.target.value)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 231,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 229,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "email",
									children: "Email"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 234,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "email",
									type: "email",
									required: true,
									value: email,
									onChange: (e) => setEmail(e.target.value)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 235,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 233,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "phone",
									children: "Phone"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 238,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "phone",
									type: "tel",
									required: true,
									value: phone,
									onChange: (e) => setPhone(e.target.value),
									placeholder: "e.g. +919876543210"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 239,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 237,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "designation",
									children: "Designation"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 242,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "designation",
									required: true,
									value: designation,
									onChange: (e) => setDesignation(e.target.value)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 243,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 241,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "department",
									children: "Department"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 246,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "department",
									required: true,
									value: department,
									onChange: (e) => setDepartment(e.target.value)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 247,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 245,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "experience",
									children: "Experience (yrs)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 250,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "experience",
									type: "number",
									required: true,
									min: 0,
									value: experience,
									onChange: (e) => setExperience(Number(e.target.value))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 251,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 249,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "joiningDate",
									children: "Joining date"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 254,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "joiningDate",
									type: "date",
									required: true,
									value: joiningDate,
									onChange: (e) => setJoiningDate(e.target.value)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 255,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 253,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2 col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "skills",
									children: "Skills (comma separated)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 258,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "skills",
									placeholder: "React, Leadership, SQL",
									value: skills,
									onChange: (e) => setSkills(e.target.value)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 259,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 257,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center space-x-2 col-span-2 mt-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "checkbox",
									id: "sendEmail",
									checked: sendEmail,
									onChange: (e) => setSendEmail(e.target.checked),
									className: "h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 262,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "sendEmail",
									className: "cursor-pointer text-sm font-medium text-muted-foreground",
									children: "Send invitation email to employee"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 263,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 261,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
								className: "col-span-2 mt-4",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "submit",
									className: "bg-gradient-hero text-primary-foreground shadow-elegant",
									disabled: mutation.isPending,
									children: mutation.isPending ? "Adding..." : "Add employee"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 268,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 267,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 228,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 224,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 218,
				columnNumber: 122
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 218,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
			className: "border-border/60 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 279,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: q,
								onChange: (e) => {
									setPage(1);
									setQ(e.target.value);
								},
								placeholder: "Search by name, email, ID, designation…",
								className: "pl-9",
								disabled: !isApproved
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 280,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 278,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
							value: status,
							onValueChange: (v) => {
								setStatus(v);
								setPage(1);
							},
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
								className: "w-full sm:w-44",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Funnel, { className: "mr-2 h-4 w-4 text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 290,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 291,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 289,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: "all",
									children: "All status"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 294,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: "active",
									children: "Active"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 295,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: "on_leave",
									children: "On leave"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 296,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: "exited",
									children: "Exited"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 297,
									columnNumber: 15
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 293,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 285,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "hidden text-xs text-muted-foreground sm:flex sm:items-center sm:justify-end",
							children: [total, " results"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 300,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 277,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-4 overflow-hidden rounded-lg border",
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableSkeleton, {
						rows: PER_PAGE,
						columns: 5
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 306,
						columnNumber: 24
					}, this) : employeesList.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-6",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EmptyState, {
							icon: Users,
							title: "No employees found",
							description: "We couldn't find any employee profiles matching your search or filters."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 307,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 306,
						columnNumber: 101
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, { children: "Employee" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 311,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, { children: "Department" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 312,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, { children: "Experience" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 313,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, { children: "Status" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 314,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, { children: "Rating" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 315,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 316,
							columnNumber: 19
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 310,
						columnNumber: 17
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 309,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableBody, { children: employeesList.map((e) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, {
								className: "h-9 w-9",
								children: [e.photoUrl && /* @__PURE__ */ (void 0)(AvatarImage, {
									src: e.photoUrl,
									alt: e.fullName
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 324,
									columnNumber: 42
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AvatarFallback, { children: e.fullName[0] }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 325,
									columnNumber: 27
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 323,
								columnNumber: 25
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-1.5 font-medium flex-wrap",
									children: [
										e.fullName,
										e.verified && /* @__PURE__ */ (void 0)(BadgeCheck, { className: "h-3.5 w-3.5 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 330,
											columnNumber: 44
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
											variant: "outline",
											className: e.claimStatus === "claimed" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[9px] px-1.5 py-0 h-4 flex items-center font-normal" : "border-amber-500/30 bg-amber-500/10 text-amber-400 text-[9px] px-1.5 py-0 h-4 flex items-center font-normal",
											children: e.claimStatus === "claimed" ? "Verified Employee" : "Profile Not Claimed"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 331,
											columnNumber: 29
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 328,
									columnNumber: 27
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-muted-foreground",
									children: [
										e.employeeId,
										" · ",
										e.designation
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 335,
									columnNumber: 27
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 327,
								columnNumber: 25
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 322,
							columnNumber: 23
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 321,
							columnNumber: 21
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: e.department }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 341,
							columnNumber: 21
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: [e.experience, " yrs"] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 342,
							columnNumber: 21
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
							variant: "outline",
							className: e.status === "active" ? "border-success/40 bg-success/10 text-success capitalize" : e.status === "on_leave" ? "border-warning/40 bg-warning/10 text-warning capitalize" : "border-border bg-muted text-muted-foreground capitalize",
							children: e.status.replace("_", " ")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 344,
							columnNumber: 23
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 343,
							columnNumber: 21
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-medium",
								children: e.rating > 0 ? e.rating.toFixed(1) : "N/A"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 349,
								columnNumber: 23
							}, this),
							" ",
							e.rating > 0 && /* @__PURE__ */ (void 0)("span", {
								className: "text-muted-foreground",
								children: "★"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 350,
								columnNumber: 40
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 348,
							columnNumber: 21
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
							className: "text-right",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex justify-end items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									asChild: true,
									variant: "outline",
									size: "sm",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/app/employees/$id",
										params: { id: e.id },
										children: "View"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 355,
										columnNumber: 27
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 354,
									columnNumber: 25
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										variant: "ghost",
										size: "sm",
										className: "h-8 w-8 p-0 cursor-pointer",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EllipsisVertical, { className: "h-4 w-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 364,
											columnNumber: 31
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 363,
										columnNumber: 29
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 362,
									columnNumber: 27
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuContent, {
									align: "end",
									children: [
										e.claimStatus === "unclaimed" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
											/* @__PURE__ */ (void 0)(DropdownMenuItem, {
												onClick: () => handleCopyInviteLink(e.id),
												className: "cursor-pointer text-sky-600 focus:text-sky-600 focus:bg-sky-50 dark:focus:bg-sky-950/20",
												children: [/* @__PURE__ */ (void 0)(Copy, { className: "mr-2 h-4 w-4" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 370,
													columnNumber: 35
												}, this), " Copy Invite Link"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 369,
												columnNumber: 33
											}, this),
											/* @__PURE__ */ (void 0)(DropdownMenuItem, {
												onClick: () => handleShareWhatsAppInvite(e.id),
												className: "cursor-pointer text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50 dark:focus:bg-emerald-950/20",
												children: [/* @__PURE__ */ (void 0)(WhatsAppIcon, { className: "mr-2 h-4 w-4 fill-emerald-600" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 373,
													columnNumber: 35
												}, this), " Share WhatsApp Invite"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 372,
												columnNumber: 33
											}, this),
											/* @__PURE__ */ (void 0)(DropdownMenuSeparator, {}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 375,
												columnNumber: 33
											}, this)
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 368,
											columnNumber: 63
										}, this),
										e.status !== "active" && /* @__PURE__ */ (void 0)(DropdownMenuItem, {
											onClick: () => updateStatusMutation.mutate({
												id: e.id,
												status: "active"
											}),
											className: "cursor-pointer",
											children: [/* @__PURE__ */ (void 0)(Plus, { className: "mr-2 h-4 w-4 text-emerald-500" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 381,
												columnNumber: 33
											}, this), " Activate"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 377,
											columnNumber: 55
										}, this),
										e.status !== "on_leave" && /* @__PURE__ */ (void 0)(DropdownMenuItem, {
											onClick: () => updateStatusMutation.mutate({
												id: e.id,
												status: "on_leave"
											}),
											className: "cursor-pointer text-amber-500 focus:text-amber-500",
											children: [/* @__PURE__ */ (void 0)(Ban, { className: "mr-2 h-4 w-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 387,
												columnNumber: 33
											}, this), " Suspend"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 383,
											columnNumber: 57
										}, this),
										e.status !== "exited" && /* @__PURE__ */ (void 0)(DropdownMenuItem, {
											onClick: () => updateStatusMutation.mutate({
												id: e.id,
												status: "exited"
											}),
											className: "cursor-pointer text-slate-500 focus:text-slate-500",
											children: [/* @__PURE__ */ (void 0)(X, { className: "mr-2 h-4 w-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 393,
												columnNumber: 33
											}, this), " Revoke / Exit"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 389,
											columnNumber: 55
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuSeparator, {}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 395,
											columnNumber: 29
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
											onClick: () => {
												if (confirm(`Are you sure you want to permanently delete "${e.fullName}"?`)) deleteMutation.mutate(e.id);
											},
											className: "cursor-pointer text-rose-600 font-semibold focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/20",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "mr-2 h-4 w-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 401,
												columnNumber: 31
											}, this), " Permanent Delete"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 396,
											columnNumber: 29
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 367,
									columnNumber: 27
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 361,
									columnNumber: 25
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 353,
								columnNumber: 23
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 352,
							columnNumber: 21
						}, this)
					] }, e.id, true, {
						fileName: _jsxFileName,
						lineNumber: 320,
						columnNumber: 41
					}, this)) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 319,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 308,
						columnNumber: 22
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 305,
					columnNumber: 9
				}, this),
				!isLoading && pages > 1 && /* @__PURE__ */ (void 0)(Pagination, {
					className: "mt-4",
					children: /* @__PURE__ */ (void 0)(PaginationContent, { children: [
						/* @__PURE__ */ (void 0)(PaginationItem, { children: /* @__PURE__ */ (void 0)(PaginationPrevious, {
							onClick: () => setPage((p) => Math.max(1, p - 1)),
							className: page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 415,
							columnNumber: 17
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 414,
							columnNumber: 15
						}, this),
						Array.from({ length: pages }).map((_, i) => /* @__PURE__ */ (void 0)(PaginationItem, { children: /* @__PURE__ */ (void 0)(PaginationLink, {
							isActive: page === i + 1,
							onClick: () => setPage(i + 1),
							className: "cursor-pointer",
							children: i + 1
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 420,
							columnNumber: 19
						}, this) }, i, false, {
							fileName: _jsxFileName,
							lineNumber: 419,
							columnNumber: 28
						}, this)),
						/* @__PURE__ */ (void 0)(PaginationItem, { children: /* @__PURE__ */ (void 0)(PaginationNext, {
							onClick: () => setPage((p) => Math.min(pages, p + 1)),
							className: page === pages ? "pointer-events-none opacity-50" : "cursor-pointer"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 425,
							columnNumber: 17
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 424,
							columnNumber: 15
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 413,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 412,
					columnNumber: 37
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 276,
			columnNumber: 7
		}, this),
		createdEmployeeInfo && /* @__PURE__ */ (void 0)(Dialog, {
			open: !!createdEmployeeInfo,
			onOpenChange: (isOpen) => {
				if (!isOpen) setCreatedEmployeeInfo(null);
			},
			children: /* @__PURE__ */ (void 0)(DialogContent, {
				className: "max-w-md border-border/40 bg-card/80 backdrop-blur-md shadow-elegant rounded-xl",
				children: [
					/* @__PURE__ */ (void 0)(DialogHeader, {
						className: "space-y-1",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 mb-2",
								children: /* @__PURE__ */ (void 0)(BadgeCheck, { className: "h-6 w-6" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 436,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 435,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(DialogTitle, {
								className: "text-center font-display text-xl font-bold",
								children: "Onboarding Link Generated"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 438,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "text-center text-sm text-muted-foreground",
								children: [
									"Employee profile created for ",
									/* @__PURE__ */ (void 0)("span", {
										className: "font-semibold text-foreground",
										children: createdEmployeeInfo.fullName
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 442,
										columnNumber: 46
									}, this),
									"."
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 441,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 434,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "space-y-4 my-4",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (void 0)(Label, {
								htmlFor: "claimLink",
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: "Claim URL"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 448,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (void 0)(Input, {
									id: "claimLink",
									readOnly: true,
									value: `${window.location.origin}/auth/signup?inviteId=${createdEmployeeInfo.invitationId}`,
									onClick: (e) => e.target.select(),
									className: "bg-muted font-mono text-xs select-all"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 452,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)(Button, {
									size: "icon",
									variant: "outline",
									onClick: async () => {
										const link = `${window.location.origin}/auth/signup?inviteId=${createdEmployeeInfo.invitationId}`;
										await navigator.clipboard.writeText(link);
										toast.success("Claim link copied to clipboard");
									},
									className: "shrink-0",
									children: /* @__PURE__ */ (void 0)(Copy, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 458,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 453,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 451,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 447,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "rounded-lg border bg-muted/30 p-3 text-xs space-y-1 text-muted-foreground",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "font-semibold text-foreground mb-1",
								children: "WhatsApp message template:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 464,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "whitespace-pre-line leading-relaxed font-sans border-l-2 border-primary/20 pl-2 bg-muted/10 py-1",
								children: `Hello ${createdEmployeeInfo.fullName},

Your WorkCred profile has been created by ${createdEmployeeInfo.companyName}.

Please claim your profile using the link below:

[Claim Link]

After claiming your profile, you can:
* View your work history
* View performance summaries
* Manage verification requests
* Manage consent settings

Regards,
WorkCred Team`
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 465,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 463,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 446,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)(DialogFooter, {
						className: "grid grid-cols-2 gap-2 sm:space-x-0",
						children: [/* @__PURE__ */ (void 0)(Button, {
							variant: "outline",
							className: "w-full",
							onClick: async () => {
								const link = `${window.location.origin}/auth/signup?inviteId=${createdEmployeeInfo.invitationId}`;
								await navigator.clipboard.writeText(link);
								toast.success("Claim link copied to clipboard");
							},
							children: [/* @__PURE__ */ (void 0)(Copy, { className: "mr-2 h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 492,
								columnNumber: 17
							}, this), " Copy Invite Link"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 487,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)(Button, {
							className: "w-full bg-[#25D366] hover:bg-[#20ba5a] text-white",
							onClick: () => {
								const link = `${window.location.origin}/auth/signup?inviteId=${createdEmployeeInfo.invitationId}`;
								shareOnWhatsApp(createdEmployeeInfo.fullName, createdEmployeeInfo.companyName, link, createdEmployeeInfo.phone);
							},
							children: [/* @__PURE__ */ (void 0)(WhatsAppIcon, { className: "mr-2 h-4 w-4 fill-white" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 498,
								columnNumber: 17
							}, this), " Share on WhatsApp"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 494,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 486,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 433,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 430,
			columnNumber: 31
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 217,
		columnNumber: 10
	}, this);
}
//#endregion
export { EmployeesPage as component };
