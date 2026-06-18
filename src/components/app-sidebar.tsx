import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Building2,
  Users,
  TrendingUp,
  ShieldCheck,
  Search,
  ScrollText,
  BadgeCheck,
  Settings,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/components/auth-provider";
import { SIDEBAR_ITEMS } from "@/lib/auth/rbac";

const allItems = [
  { key: "dashboard", title: "Dashboard", url: "/app/dashboard", icon: LayoutDashboard },
  { key: "companies", title: "Companies", url: "/app/companies", icon: Building2 },
  { key: "employees", title: "Employees", url: "/app/employees", icon: Users },
  { key: "performance", title: "Performance", url: "/app/performance", icon: TrendingUp },
  { key: "search", title: "HR Search", url: "/app/search", icon: Search },
  { key: "verification", title: "Verification Requests", url: "/app/verification", icon: BadgeCheck },
  { key: "consent", title: "Consent", url: "/app/consent", icon: ShieldCheck },
  { key: "audit", title: "Audit Logs", url: "/app/audit", icon: ScrollText },
  { key: "settings", title: "Settings", url: "/app/settings", icon: Settings },
  { key: "profile", title: "My Profile", url: "/app/profile", icon: User },
];

export function AppSidebar() {
  const { user } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const allowedKeys = SIDEBAR_ITEMS[user.role] || [];
  const items = allItems.filter((item) => allowedKeys.includes(item.key));

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-hero text-primary-foreground shadow-elegant">
            <BadgeCheck className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-display text-lg font-bold leading-none">WorkCred</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Verified Talent</div>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname.startsWith(item.url)} tooltip={item.title}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
