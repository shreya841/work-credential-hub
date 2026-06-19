import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Topbar } from "@/components/topbar";
import { AuthProvider } from "@/components/auth-provider";
import { getCurrentUser } from "@/lib/api/auth.functions";
import type { AuthUser } from "@/lib/types";
import { AlertCircle } from "lucide-react";

export const Route = createFileRoute("/app")({
  beforeLoad: async ({ location, context }) => {
    if (location.pathname === "/app" || location.pathname === "/app/") {
      throw redirect({ to: "/app/dashboard" });
    }
    const { queryClient } = context;
    const { user } = await queryClient.ensureQueryData({
      queryKey: ["current-user"],
      queryFn: () => getCurrentUser(),
    });
    if (!user) {
      throw redirect({ to: "/auth/login" });
    }
    return { user };
  },
  component: AppLayout,
});

function AppLayout() {
  const { user } = Route.useRouteContext();
  return (
    <AuthProvider user={user as AuthUser}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full font-sans antialiased">
          <AppSidebar />
          <SidebarInset className="flex flex-1 flex-col overflow-x-hidden">
            <Topbar />
            {((user.role === "company_admin" || user.role === "hr") && user.companyStatus !== "approved") && (
              <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-3 text-amber-800 dark:text-amber-405 text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 animate-pulse" />
                <span>
                  {user.companyStatus === "rejected"
                    ? "Your company registration has been rejected. Employee management features are disabled."
                    : user.companyStatus === "suspended"
                      ? "Your company workspace has been suspended. Access to workspace features is disabled."
                      : "Your company is awaiting admin approval. Employee management features are disabled until verification is complete."}
                </span>
              </div>
            )}
            <main className="flex-1 px-4 py-6 sm:px-6">
              <Outlet />
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
}
