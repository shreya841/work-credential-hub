import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BPK1zgJN.mjs";
import { t as Badge } from "./badge-KS2SooOw.mjs";
import { t as Input } from "./input-BYcV5Phs.mjs";
import { n as useAuth } from "./auth-provider-DIoK8pn-.mjs";
import { M as Key, V as Database, p as Shield, r as Users, v as Server } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-DRtcuf8H.mjs";
import { t as PageHeader } from "./page-header-DHJUr0Vr.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-DdpCoWi7.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-C9T31-X3.mjs";
import { t as Label } from "./label-qle7VSy6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Switch } from "./switch-eIbfVW8p.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-Dfe8WMk0.mjs";
import { n as updateUserAdmin, t as listUsers } from "./users.functions-B1Y8sN5J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.settings-DfFG2IDA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	if (user.role !== "super_admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-12 w-12 text-destructive mb-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-lg font-semibold text-destructive",
				children: "Unauthorized Access"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mt-1",
				children: "This section is restricted to Super Administrators only."
			})
		]
	});
	const usersList = usersData?.data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Platform Settings",
		description: "Configure system-level parameters, compliance settings, and audit retention."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "general",
		className: "mt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
					value: "general",
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "h-4 w-4" }), " General"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
					value: "security",
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "h-4 w-4" }), " Security"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
					value: "users",
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }), " User Management"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
					value: "database",
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "h-4 w-4" }), " System"]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "general",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "General Configuration" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Configure basic branding and visibility options." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSave,
						className: "space-y-4 max-w-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "platformName",
									children: "Platform Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "platformName",
									value: platformName,
									onChange: (e) => setPlatformName(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-lg border p-4 bg-muted/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-sm font-semibold",
										children: "Allow Public Profile Search"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Allows candidates with public visible toggle to show in HR searches."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: allowPublicSearch,
									onCheckedChange: setAllowPublicSearch
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "bg-gradient-hero text-primary-foreground shadow-elegant",
								disabled: loading,
								children: loading ? "Saving..." : "Save Settings"
							})
						]
					}) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "security",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Security Settings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Manage user authentication policies and session controls." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSave,
						className: "space-y-4 max-w-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-lg border p-4 bg-muted/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-sm font-semibold",
										children: "Enforce MFA (Multi-Factor Authentication)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Force all company admins and HR roles to register OTP credentials."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: enforceMfa,
									onCheckedChange: setEnforceMfa
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "retention",
									children: "Audit Log Retention (Days)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "retention",
									type: "number",
									min: 30,
									value: auditLogRetention,
									onChange: (e) => setAuditLogRetention(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "bg-gradient-hero text-primary-foreground shadow-elegant",
								disabled: loading,
								children: loading ? "Saving..." : "Save Settings"
							})
						]
					}) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "users",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "User Management" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Configure user roles and suspend or unsuspend accounts." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: usersLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 bg-muted rounded animate-pulse" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 bg-muted rounded animate-pulse" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 bg-muted rounded animate-pulse" })
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Full Name" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Email" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Role" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Actions"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: usersList.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-medium",
							children: u.fullName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: u.email }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: u.role,
							onValueChange: (val) => updateUserMutation.mutate({
								userId: u.id,
								role: val
							}),
							disabled: updateUserMutation.isPending || u.id === user.id,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-36 h-8 text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "super_admin",
									children: "Super Admin"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "company_admin",
									children: "Company Admin"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "hr",
									children: "HR Manager"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "employee",
									children: "Employee"
								})
							] })]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: u.status === "active" ? "outline" : "destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "capitalize",
								children: u.status
							})
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: u.id !== user.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "xs",
								variant: u.status === "active" ? "destructive" : "outline",
								className: "text-xs h-8",
								onClick: () => updateUserMutation.mutate({
									userId: u.id,
									status: u.status === "active" ? "suspended" : "active"
								}),
								disabled: updateUserMutation.isPending,
								children: u.status === "active" ? "Suspend" : "Unsuspend"
							})
						})
					] }, u.id)) })] }) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "database",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "System & Database Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "View ORM connections and run migrations." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border p-4 bg-muted/10 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center text-sm border-b pb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Database Dialect"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold font-mono",
										children: "PostgreSQL"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center text-sm border-b pb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "ORM Engine"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold font-mono",
										children: "Drizzle ORM v0.45.2"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Connection Pool"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-emerald-500 font-semibold flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-emerald-500 animate-ping" }), " Connected"]
									})]
								})
							]
						})
					})]
				})
			})
		]
	})] });
}
//#endregion
export { SettingsPage as component };
