import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Topbar } from "@/components/topbar";
import { AuthProvider } from "@/components/auth-provider";
import { getCurrentUser } from "@/lib/api/auth.functions";
import type { AuthUser } from "@/lib/types";

export const Route = createFileRoute("/app-Shreya")({
  beforeLoad: async ({ location }) => {
    if (location.pathname === "/app" || location.pathname === "/app/") {
      throw redirect({ to: "/app/dashboard" });
    }
    const { user } = await getCurrentUser();
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
            <main className="flex-1 px-4 py-6 sm:px-6">
              <Outlet />
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
}
