import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Slot } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { r as cn, t as Button } from "./button-DnxMo53r.mjs";
import { t as Badge } from "./badge-GBPLA4QD.mjs";
import { n as useTheme } from "./theme-provider-eDAGwicb.mjs";
import { _ as useNavigate, f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as logoutUser } from "./auth.functions-7eFT9ROn.mjs";
import { t as Route } from "./app-s03e--Ea.mjs";
import { t as Input } from "./input-C8wv43d_.mjs";
import { t as Skeleton } from "./skeleton-W2p1PR5p.mjs";
import { n as useAuth, t as AuthProvider } from "./auth-provider-CtLo-iYA.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-B-3oHQMO.mjs";
import { E as PanelLeft, J as CircleAlert, _ as Settings, b as Search, c as TrendingUp, h as ShieldCheck, i as User, it as Bell, j as LayoutDashboard, k as LogOut, n as X, nt as Building2, ot as BadgeCheck, r as Users, x as ScrollText } from "../_libs/lucide-react.mjs";
import { a as Portal, i as Overlay, n as Content, o as Root, r as Description, s as Title, t as Close } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as DropdownMenuSeparator, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-D50QXS9o.mjs";
import { n as SIDEBAR_ITEMS, t as ROLE_LABELS } from "./rbac-DVva8RQt.mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as Root$1 } from "../_libs/radix-ui__react-separator.mjs";
import { a as Trigger, i as Root3, n as Portal$1, r as Provider, t as Content2 } from "../_libs/radix-ui__react-tooltip.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-8ivBEoTB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = import_react.useState(void 0);
	import_react.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
var _jsxFileName$6 = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/components/ui/separator.tsx";
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Root$1, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$6,
	lineNumber: 10,
	columnNumber: 3
}, void 0));
Separator.displayName = Root$1.displayName;
var _jsxFileName$5 = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/components/ui/sheet.tsx";
var Sheet = Root;
var SheetPortal = Portal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Overlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}, void 0, false, {
	fileName: _jsxFileName$5,
	lineNumber: 22,
	columnNumber: 3
}, void 0));
SheetOverlay.displayName = Overlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetOverlay, {}, void 0, false, {
	fileName: _jsxFileName$5,
	lineNumber: 62,
	columnNumber: 5
}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-4 w-4" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 65,
			columnNumber: 9
		}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "sr-only",
			children: "Close"
		}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 66,
			columnNumber: 9
		}, void 0)]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 64,
		columnNumber: 7
	}, void 0), children]
}, void 0, true, {
	fileName: _jsxFileName$5,
	lineNumber: 63,
	columnNumber: 5
}, void 0)] }, void 0, true, {
	fileName: _jsxFileName$5,
	lineNumber: 61,
	columnNumber: 3
}, void 0));
SheetContent.displayName = Content.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$5,
	lineNumber: 75,
	columnNumber: 3
}, void 0);
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$5,
	lineNumber: 80,
	columnNumber: 3
}, void 0);
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$5,
	lineNumber: 91,
	columnNumber: 3
}, void 0));
SheetTitle.displayName = Title.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$5,
	lineNumber: 103,
	columnNumber: 3
}, void 0));
SheetDescription.displayName = Description.displayName;
var _jsxFileName$4 = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/components/ui/tooltip.tsx";
var TooltipProvider = Provider;
var Tooltip = Root3;
var TooltipTrigger = Trigger;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Portal$1, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$4,
	lineNumber: 19,
	columnNumber: 5
}, void 0) }, void 0, false, {
	fileName: _jsxFileName$4,
	lineNumber: 18,
	columnNumber: 3
}, void 0));
TooltipContent.displayName = Content2.displayName;
var _jsxFileName$3 = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/components/ui/sidebar.tsx";
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 3600 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = import_react.createContext(null);
function useSidebar() {
	const context = import_react.useContext(SidebarContext);
	if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
	return context;
}
var SidebarProvider = import_react.forwardRef(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = import_react.useState(false);
	const [_open, _setOpen] = import_react.useState(defaultOpen);
	const open = openProp ?? _open;
	const setOpen = import_react.useCallback((value) => {
		const openState = typeof value === "function" ? value(open) : value;
		if (setOpenProp) setOpenProp(openState);
		else _setOpen(openState);
		document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
	}, [setOpenProp, open]);
	const toggleSidebar = import_react.useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
	}, [
		isMobile,
		setOpen,
		setOpenMobile
	]);
	import_react.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				toggleSidebar();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggleSidebar]);
	const state = open ? "expanded" : "collapsed";
	const contextValue = import_react.useMemo(() => ({
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	}), [
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SidebarContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TooltipProvider, {
			delayDuration: 0,
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				style: {
					"--sidebar-width": SIDEBAR_WIDTH,
					"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
					...style
				},
				className: cn("group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar", className),
				ref,
				...props,
				children
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 129,
				columnNumber: 11
			}, void 0)
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 128,
			columnNumber: 9
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 127,
		columnNumber: 7
	}, void 0);
});
SidebarProvider.displayName = "SidebarProvider";
var Sidebar = import_react.forwardRef(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
	if (collapsible === "none") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", className),
		ref,
		...props,
		children
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 176,
		columnNumber: 9
	}, void 0);
	if (isMobile) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sheet, {
		open: openMobile,
		onOpenChange: setOpenMobile,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetContent, {
			"data-sidebar": "sidebar",
			"data-mobile": "true",
			className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
			style: { "--sidebar-width": SIDEBAR_WIDTH_MOBILE },
			side,
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetHeader, {
				className: "sr-only",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetTitle, { children: "Sidebar" }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 204,
					columnNumber: 15
				}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetDescription, { children: "Displays the mobile sidebar." }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 205,
					columnNumber: 15
				}, void 0)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 203,
				columnNumber: 13
			}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex h-full w-full flex-col",
				children
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 207,
				columnNumber: 13
			}, void 0)]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 192,
			columnNumber: 11
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 191,
		columnNumber: 9
	}, void 0);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref,
		className: "group peer hidden text-sidebar-foreground md:block",
		"data-state": state,
		"data-collapsible": state === "collapsed" ? collapsible : "",
		"data-variant": variant,
		"data-side": side,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: cn("relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)") }, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 223,
			columnNumber: 9
		}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: cn("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex", side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]", variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", className),
			...props,
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				"data-sidebar": "sidebar",
				className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow",
				children
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 247,
				columnNumber: 11
			}, void 0)
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 233,
			columnNumber: 9
		}, void 0)]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 214,
		columnNumber: 7
	}, void 0);
});
Sidebar.displayName = "Sidebar";
var SidebarTrigger = import_react.forwardRef(({ className, onClick, ...props }, ref) => {
	const { toggleSidebar } = useSidebar();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
		ref,
		"data-sidebar": "trigger",
		variant: "ghost",
		size: "icon",
		className: cn("h-7 w-7", className),
		onClick: (event) => {
			onClick?.(event);
			toggleSidebar();
		},
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PanelLeft, {}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 279,
			columnNumber: 7
		}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "sr-only",
			children: "Toggle Sidebar"
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 280,
			columnNumber: 7
		}, void 0)]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 267,
		columnNumber: 5
	}, void 0);
});
SidebarTrigger.displayName = "SidebarTrigger";
var SidebarRail = import_react.forwardRef(({ className, ...props }, ref) => {
	const { toggleSidebar } = useSidebar();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		ref,
		"data-sidebar": "rail",
		"aria-label": "Toggle Sidebar",
		tabIndex: -1,
		onClick: toggleSidebar,
		title: "Toggle Sidebar",
		className: cn("absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex", "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 291,
		columnNumber: 7
	}, void 0);
});
SidebarRail.displayName = "SidebarRail";
var SidebarInset = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		ref,
		className: cn("relative flex w-full flex-1 flex-col bg-background", "md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 317,
		columnNumber: 7
	}, void 0);
});
SidebarInset.displayName = "SidebarInset";
var SidebarInput = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
		ref,
		"data-sidebar": "input",
		className: cn("h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 336,
		columnNumber: 5
	}, void 0);
});
SidebarInput.displayName = "SidebarInput";
var SidebarHeader = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref,
		"data-sidebar": "header",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 352,
		columnNumber: 7
	}, void 0);
});
SidebarHeader.displayName = "SidebarHeader";
var SidebarFooter = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref,
		"data-sidebar": "footer",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 366,
		columnNumber: 7
	}, void 0);
});
SidebarFooter.displayName = "SidebarFooter";
var SidebarSeparator = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Separator, {
		ref,
		"data-sidebar": "separator",
		className: cn("mx-2 w-auto bg-sidebar-border", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 382,
		columnNumber: 5
	}, void 0);
});
SidebarSeparator.displayName = "SidebarSeparator";
var SidebarContent = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref,
		"data-sidebar": "content",
		className: cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 395,
		columnNumber: 7
	}, void 0);
});
SidebarContent.displayName = "SidebarContent";
var SidebarGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref,
		"data-sidebar": "group",
		className: cn("relative flex w-full min-w-0 flex-col p-2", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 412,
		columnNumber: 7
	}, void 0);
});
SidebarGroup.displayName = "SidebarGroup";
var SidebarGroupLabel = import_react.forwardRef(({ className, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(asChild ? Slot : "div", {
		ref,
		"data-sidebar": "group-label",
		className: cn("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 430,
		columnNumber: 5
	}, void 0);
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";
var SidebarGroupAction = import_react.forwardRef(({ className, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(asChild ? Slot : "button", {
		ref,
		"data-sidebar": "group-action",
		className: cn("absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 after:md:hidden", "group-data-[collapsible=icon]:hidden", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 451,
		columnNumber: 5
	}, void 0);
});
SidebarGroupAction.displayName = "SidebarGroupAction";
var SidebarGroupContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	ref,
	"data-sidebar": "group-content",
	className: cn("w-full text-sm", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$3,
	lineNumber: 469,
	columnNumber: 5
}, void 0));
SidebarGroupContent.displayName = "SidebarGroupContent";
var SidebarMenu = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
	ref,
	"data-sidebar": "menu",
	className: cn("flex w-full min-w-0 flex-col gap-1", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$3,
	lineNumber: 481,
	columnNumber: 5
}, void 0));
SidebarMenu.displayName = "SidebarMenu";
var SidebarMenuItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
	ref,
	"data-sidebar": "menu-item",
	className: cn("group/menu-item relative", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$3,
	lineNumber: 493,
	columnNumber: 5
}, void 0));
SidebarMenuItem.displayName = "SidebarMenuItem";
var sidebarMenuButtonVariants = cva("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring cursor-pointer transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", {
	variants: {
		variant: {
			default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
			outline: "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
		},
		size: {
			default: "h-8 text-sm",
			sm: "h-7 text-xs",
			lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var SidebarMenuButton = import_react.forwardRef(({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => {
	const Comp = asChild ? Slot : "button";
	const { isMobile, state } = useSidebar();
	const button = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Comp, {
		ref,
		"data-sidebar": "menu-button",
		"data-size": size,
		"data-active": isActive,
		className: cn(sidebarMenuButtonVariants({
			variant,
			size
		}), className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 549,
		columnNumber: 7
	}, void 0);
	if (!tooltip) return button;
	if (typeof tooltip === "string") tooltip = { children: tooltip };
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TooltipTrigger, {
		asChild: true,
		children: button
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 571,
		columnNumber: 9
	}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TooltipContent, {
		side: "right",
		align: "center",
		hidden: state !== "collapsed" || isMobile,
		...tooltip
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 572,
		columnNumber: 9
	}, void 0)] }, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 570,
		columnNumber: 7
	}, void 0);
});
SidebarMenuButton.displayName = "SidebarMenuButton";
var SidebarMenuAction = import_react.forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(asChild ? Slot : "button", {
		ref,
		"data-sidebar": "menu-action",
		className: cn("absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 after:md:hidden", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 594,
		columnNumber: 5
	}, void 0);
});
SidebarMenuAction.displayName = "SidebarMenuAction";
var SidebarMenuBadge = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	ref,
	"data-sidebar": "menu-badge",
	className: cn("pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground", "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$3,
	lineNumber: 617,
	columnNumber: 5
}, void 0));
SidebarMenuBadge.displayName = "SidebarMenuBadge";
var SidebarMenuSkeleton = import_react.forwardRef(({ className, showIcon = false, ...props }, ref) => {
	const width = import_react.useMemo(() => {
		return `${Math.floor(Math.random() * 40) + 50}%`;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref,
		"data-sidebar": "menu-skeleton",
		className: cn("flex h-8 items-center gap-2 rounded-md px-2", className),
		...props,
		children: [showIcon && /* @__PURE__ */ (void 0)(Skeleton, {
			className: "size-4 rounded-md",
			"data-sidebar": "menu-skeleton-icon"
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 653,
			columnNumber: 20
		}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Skeleton, {
			className: "h-4 max-w-(--skeleton-width) flex-1",
			"data-sidebar": "menu-skeleton-text",
			style: { "--skeleton-width": width }
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 654,
			columnNumber: 7
		}, void 0)]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 647,
		columnNumber: 5
	}, void 0);
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
var SidebarMenuSub = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
	ref,
	"data-sidebar": "menu-sub",
	className: cn("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5", "group-data-[collapsible=icon]:hidden", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$3,
	lineNumber: 670,
	columnNumber: 5
}, void 0));
SidebarMenuSub.displayName = "SidebarMenuSub";
var SidebarMenuSubItem = import_react.forwardRef(({ ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
	ref,
	...props
}, void 0, false, {
	fileName: _jsxFileName$3,
	lineNumber: 685,
	columnNumber: 26
}, void 0));
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
var SidebarMenuSubButton = import_react.forwardRef(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(asChild ? Slot : "a", {
		ref,
		"data-sidebar": "menu-sub-button",
		"data-size": size,
		"data-active": isActive,
		className: cn("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground", "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground", size === "sm" && "text-xs", size === "md" && "text-sm", "group-data-[collapsible=icon]:hidden", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 700,
		columnNumber: 5
	}, void 0);
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
var _jsxFileName$2 = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/components/app-sidebar.tsx";
var allItems = [
	{
		key: "dashboard",
		title: "Dashboard",
		url: "/app/dashboard",
		icon: LayoutDashboard
	},
	{
		key: "companies",
		title: "Companies",
		url: "/app/companies",
		icon: Building2
	},
	{
		key: "employees",
		title: "Employees",
		url: "/app/employees",
		icon: Users
	},
	{
		key: "performance",
		title: "Performance",
		url: "/app/performance",
		icon: TrendingUp
	},
	{
		key: "search",
		title: "HR Search",
		url: "/app/search",
		icon: Search
	},
	{
		key: "verification",
		title: "Verification Requests",
		url: "/app/verification",
		icon: BadgeCheck
	},
	{
		key: "consent",
		title: "Consent",
		url: "/app/consent",
		icon: ShieldCheck
	},
	{
		key: "audit",
		title: "Audit Logs",
		url: "/app/audit",
		icon: ScrollText
	},
	{
		key: "settings",
		title: "Settings",
		url: "/app/settings",
		icon: Settings
	},
	{
		key: "profile",
		title: "My Profile",
		url: "/app/profile",
		icon: User
	}
];
function AppSidebar() {
	const { user } = useAuth();
	const { state } = useSidebar();
	const collapsed = state === "collapsed";
	const pathname = useRouterState({ select: (r) => r.location.pathname });
	const allowedKeys = SIDEBAR_ITEMS[user.role] || [];
	const items = allItems.filter((item) => allowedKeys.includes(item.key));
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sidebar, {
		collapsible: "icon",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SidebarHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/",
			className: "flex items-center gap-2 px-2 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-hero text-primary-foreground shadow-elegant",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BadgeCheck, { className: "h-5 w-5" }, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 56,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 55,
				columnNumber: 11
			}, this), !collapsed && /* @__PURE__ */ (void 0)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "font-display text-lg font-bold leading-none",
					children: "WorkCred"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 60,
					columnNumber: 15
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "text-[10px] uppercase tracking-wider text-muted-foreground",
					children: "Verified Talent"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 61,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 59,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 54,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 53,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SidebarContent, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SidebarGroup, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SidebarGroupLabel, { children: "Workspace" }, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 68,
			columnNumber: 11
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SidebarGroupContent, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SidebarMenu, { children: items.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SidebarMenuButton, {
			asChild: true,
			isActive: pathname.startsWith(item.url),
			tooltip: item.title,
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: item.url,
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(item.icon, { className: "h-4 w-4 shrink-0" }, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 75,
					columnNumber: 23
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.title }, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 76,
					columnNumber: 23
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 74,
				columnNumber: 21
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 73,
			columnNumber: 19
		}, this) }, item.url, false, {
			fileName: _jsxFileName$2,
			lineNumber: 72,
			columnNumber: 17
		}, this)) }, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 70,
			columnNumber: 13
		}, this) }, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 69,
			columnNumber: 11
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 67,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 66,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 52,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/components/topbar.tsx";
function Topbar() {
	const { theme, toggle } = useTheme();
	const { user } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const handleSignOut = async () => {
		try {
			await logoutUser();
			queryClient.clear();
			navigate({ to: "/auth/login" });
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};
	const initials = user.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: "sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/80 px-3 backdrop-blur sm:px-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SidebarTrigger, {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 47,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative hidden flex-1 max-w-md md:block",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 49,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
					placeholder: "Search employees, companies…",
					className: "pl-9 h-9 bg-muted/40 border-transparent",
					disabled: true
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 50,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 48,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "ml-auto flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "ghost",
					size: "icon",
					"aria-label": "Notifications",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 58,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 57,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "ghost",
						className: "relative h-8 w-8 rounded-full p-0",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, {
							className: "h-8 w-8",
							children: [user.avatarUrl && /* @__PURE__ */ (void 0)(AvatarImage, {
								src: user.avatarUrl,
								alt: user.fullName
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 65,
								columnNumber: 36
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AvatarFallback, { children: initials }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 66,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 64,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 63,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 62,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuContent, {
					className: "w-56",
					align: "end",
					forceMount: true,
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuLabel, {
							className: "font-normal",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-sm font-medium leading-none",
										children: user.fullName
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 73,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs leading-none text-muted-foreground",
										children: user.email
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 74,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-1.5",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
											variant: "secondary",
											className: "text-[10px] py-0 px-1.5 font-semibold",
											children: ROLE_LABELS[user.role]
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 76,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 75,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 72,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 71,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuSeparator, {}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 82,
							columnNumber: 13
						}, this),
						user.role === "employee" && /* @__PURE__ */ (void 0)(DropdownMenuItem, {
							asChild: true,
							children: /* @__PURE__ */ (void 0)(Link, {
								to: "/app/profile",
								className: "w-full flex items-center cursor-pointer",
								children: [/* @__PURE__ */ (void 0)(User, { className: "mr-2 h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 86,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", { children: "My Profile" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 87,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 85,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 84,
							columnNumber: 15
						}, this),
						user.role === "super_admin" && /* @__PURE__ */ (void 0)(DropdownMenuItem, {
							asChild: true,
							children: /* @__PURE__ */ (void 0)(Link, {
								to: "/app/settings",
								className: "w-full flex items-center cursor-pointer",
								children: [/* @__PURE__ */ (void 0)(Settings, { className: "mr-2 h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 94,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Settings" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 95,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 93,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 92,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuSeparator, {}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 99,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
							onClick: handleSignOut,
							className: "text-destructive focus:text-destructive cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "mr-2 h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 104,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Sign out" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 105,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 100,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 70,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 61,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 56,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 46,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/routes/app.tsx?tsr-split=component";
function AppLayout() {
	const { user } = Route.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AuthProvider, {
		user,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SidebarProvider, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex min-h-screen w-full font-sans antialiased",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppSidebar, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 15,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SidebarInset, {
				className: "flex flex-1 flex-col overflow-x-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Topbar, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 17,
						columnNumber: 13
					}, this),
					(user.role === "company_admin" || user.role === "hr") && user.companyStatus !== "approved" && /* @__PURE__ */ (void 0)("div", {
						className: "bg-amber-500/10 border-b border-amber-500/20 px-6 py-3 text-amber-800 dark:text-amber-405 text-sm flex items-center gap-2",
						children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 animate-pulse" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 19,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("span", { children: user.companyStatus === "rejected" ? "Your company registration has been rejected. Employee management features are disabled." : user.companyStatus === "suspended" ? "Your company workspace has been suspended. Access to workspace features is disabled." : "Your company is awaiting admin approval. Employee management features are disabled until verification is complete." }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 20,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 18,
						columnNumber: 108
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
						className: "flex-1 px-4 py-6 sm:px-6",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 25,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 24,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 16,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 14,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 13,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 12,
		columnNumber: 10
	}, this);
}
//#endregion
export { AppLayout as component };
