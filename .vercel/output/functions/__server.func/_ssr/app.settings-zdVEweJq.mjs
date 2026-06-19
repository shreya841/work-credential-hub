import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-DnxMo53r.mjs";
import { t as Badge } from "./badge-GBPLA4QD.mjs";
import { t as Input } from "./input-C8wv43d_.mjs";
import { n as useAuth } from "./auth-provider-CtLo-iYA.mjs";
import { M as Key, V as Database, p as Shield, r as Users, v as Server } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-CCXaAbeo.mjs";
import { t as PageHeader } from "./page-header-CDeKwgJG.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-mLrJhqIt.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-cNCVehGV.mjs";
import { t as Label } from "./label-ZItyyoZm.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Switch } from "./switch-CK12VkhL.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-OpyVAXdj.mjs";
import { n as updateUserAdmin, t as listUsers } from "./users.functions-BVnxnYlY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.settings-zdVEweJq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/routes/app.settings.tsx?tsr-split=component";
function SettingsPage() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [platformName, setPlatformName] = (0, import_react.useState)("WorkCred Platform");
	const [allowPublicSearch, setAllowPublicSearch] = (0, import_react.useState)(true);
	const [enforceMfa, setEnforceMfa] = (0, import_react.useState)(false);
	const [auditLogRetention, setAuditLogRetention] = (0, import_react.useState)("90");
	const { data: usersData, isLoading: usersLoading } = useQuery({
		queryKey: ["users-list"],
		queryFn: () => listUsers({ data: {
			page: 1,
			pageSize: 50
		} }),
		enabled: user.role === "super_admin"
	});
	const updateUserMutation = useMutation({
		mutationFn: (args) => updateUserAdmin({ data: args }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users-list"] });
			toast.success("User updated successfully");
		},
		onError: (err) => {
			toast.error(err instanceof Error ? err.message : "Failed to update user");
		}
	});
	const handleSave = (e) => {
		e.preventDefault();
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			toast.success("Settings saved successfully");
		}, 800);
	};
	if (user.role !== "super_admin") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col items-center justify-center py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, { className: "h-12 w-12 text-destructive mb-4" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 66,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
				className: "text-lg font-semibold text-destructive",
				children: "Unauthorized Access"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 67,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-muted-foreground mt-1",
				children: "This section is restricted to Super Administrators only."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 68,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 65,
		columnNumber: 12
	}, this);
	const usersList = usersData?.data ?? [];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
		title: "Platform Settings",
		description: "Configure system-level parameters, compliance settings, and audit retention."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 73,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tabs, {
		defaultValue: "general",
		className: "mt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsList, { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
					value: "general",
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Server, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 78,
						columnNumber: 13
					}, this), " General"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 77,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
					value: "security",
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Key, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 81,
						columnNumber: 13
					}, this), " Security"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 80,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
					value: "users",
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 84,
						columnNumber: 13
					}, this), " User Management"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 83,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
					value: "database",
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Database, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 87,
						columnNumber: 13
					}, this), " System"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 86,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 76,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
				value: "general",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
					className: "border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "General Configuration" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 94,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, { children: "Configure basic branding and visibility options." }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 95,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 93,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: handleSave,
						className: "space-y-4 max-w-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "platformName",
									children: "Platform Name"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 100,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "platformName",
									value: platformName,
									onChange: (e) => setPlatformName(e.target.value)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 101,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 99,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between rounded-lg border p-4 bg-muted/20",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										className: "text-sm font-semibold",
										children: "Allow Public Profile Search"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 105,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground",
										children: "Allows candidates with public visible toggle to show in HR searches."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 106,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 104,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch, {
									checked: allowPublicSearch,
									onCheckedChange: setAllowPublicSearch
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 108,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 103,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								type: "submit",
								className: "bg-gradient-hero text-primary-foreground shadow-elegant",
								disabled: loading,
								children: loading ? "Saving..." : "Save Settings"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 110,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 98,
						columnNumber: 15
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 97,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 92,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 91,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
				value: "security",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
					className: "border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "Security Settings" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 121,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, { children: "Manage user authentication policies and session controls." }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 122,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 120,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: handleSave,
						className: "space-y-4 max-w-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between rounded-lg border p-4 bg-muted/20",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										className: "text-sm font-semibold",
										children: "Enforce MFA (Multi-Factor Authentication)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 128,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground",
										children: "Force all company admins and HR roles to register OTP credentials."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 129,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 127,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch, {
									checked: enforceMfa,
									onCheckedChange: setEnforceMfa
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 131,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 126,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "retention",
									children: "Audit Log Retention (Days)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 134,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "retention",
									type: "number",
									min: 30,
									value: auditLogRetention,
									onChange: (e) => setAuditLogRetention(e.target.value)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 135,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 133,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								type: "submit",
								className: "bg-gradient-hero text-primary-foreground shadow-elegant",
								disabled: loading,
								children: loading ? "Saving..." : "Save Settings"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 137,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 125,
						columnNumber: 15
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 124,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 119,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 118,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
				value: "users",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
					className: "border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "User Management" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 148,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, { children: "Configure user roles and suspend or unsuspend accounts." }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 149,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 147,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, { children: usersLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-10 bg-muted rounded animate-pulse" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 153,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-10 bg-muted rounded animate-pulse" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 154,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-10 bg-muted rounded animate-pulse" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 155,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 152,
						columnNumber: 31
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, { children: "Full Name" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 159,
							columnNumber: 23
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, { children: "Email" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 160,
							columnNumber: 23
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, { children: "Role" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 161,
							columnNumber: 23
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, { children: "Status" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 162,
							columnNumber: 23
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
							className: "text-right",
							children: "Actions"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 163,
							columnNumber: 23
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 158,
						columnNumber: 21
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 157,
						columnNumber: 19
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableBody, { children: usersList.map((u) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
							className: "font-medium",
							children: u.fullName
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 168,
							columnNumber: 25
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: u.email }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 169,
							columnNumber: 25
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
							value: u.role,
							onValueChange: (val) => updateUserMutation.mutate({
								userId: u.id,
								role: val
							}),
							disabled: updateUserMutation.isPending || u.id === user.id,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
								className: "w-36 h-8 text-xs",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 176,
									columnNumber: 31
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 175,
								columnNumber: 29
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: "super_admin",
									children: "Super Admin"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 179,
									columnNumber: 31
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: "company_admin",
									children: "Company Admin"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 180,
									columnNumber: 31
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: "hr",
									children: "HR Manager"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 181,
									columnNumber: 31
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: "employee",
									children: "Employee"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 182,
									columnNumber: 31
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 178,
								columnNumber: 29
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 171,
							columnNumber: 27
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 170,
							columnNumber: 25
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
							variant: u.status === "active" ? "outline" : "destructive",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "capitalize",
								children: u.status
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 188,
								columnNumber: 29
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 187,
							columnNumber: 27
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 186,
							columnNumber: 25
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
							className: "text-right",
							children: u.id !== user.id && /* @__PURE__ */ (void 0)(Button, {
								size: "xs",
								variant: u.status === "active" ? "destructive" : "outline",
								className: "text-xs h-8",
								onClick: () => updateUserMutation.mutate({
									userId: u.id,
									status: u.status === "active" ? "suspended" : "active"
								}),
								disabled: updateUserMutation.isPending,
								children: u.status === "active" ? "Suspend" : "Unsuspend"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 192,
								columnNumber: 48
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 191,
							columnNumber: 25
						}, this)
					] }, u.id, true, {
						fileName: _jsxFileName,
						lineNumber: 167,
						columnNumber: 48
					}, this)) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 166,
						columnNumber: 19
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 156,
						columnNumber: 26
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 151,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 146,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 145,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
				value: "database",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
					className: "border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, { children: "System & Database Status" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 209,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, { children: "View ORM connections and run migrations." }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 210,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 208,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-lg border p-4 bg-muted/10 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between items-center text-sm border-b pb-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: "Database Dialect"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 215,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-semibold font-mono",
										children: "PostgreSQL"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 216,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 214,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between items-center text-sm border-b pb-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: "ORM Engine"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 219,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-semibold font-mono",
										children: "Drizzle ORM v0.45.2"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 220,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 218,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between items-center text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: "Connection Pool"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 223,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-emerald-500 font-semibold flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-2 w-2 rounded-full bg-emerald-500 animate-ping" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 225,
											columnNumber: 21
										}, this), " Connected"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 224,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 222,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 213,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 212,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 207,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 206,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 75,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 72,
		columnNumber: 10
	}, this);
}
//#endregion
export { SettingsPage as component };
