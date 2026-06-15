import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-gradient-hero p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/15 backdrop-blur">
            <BadgeCheck className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-bold">WorkCred</span>
        </Link>
        <div className="relative z-10 max-w-md">
          <h2 className="font-display text-4xl font-bold leading-tight">Verified reputation for the modern workforce.</h2>
          <p className="mt-4 text-white/80">Join 500+ HR teams using WorkCred to hire with confidence.</p>
        </div>
        <p className="text-xs text-white/70">© {new Date().getFullYear()} WorkCred Inc.</p>
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -top-20 -left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      </div>
      <div className="flex items-center justify-center bg-background p-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
