import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/signup")({
  component: Signup,
});

function Signup() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Create your workspace</h1>
      <p className="mt-2 text-sm text-muted-foreground">Start verifying talent in minutes.</p>
      <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => { toast.success("Workspace created"); nav({ to: "/app/dashboard" }); }, 700); }}>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2"><Label htmlFor="fn">First name</Label><Input id="fn" required /></div>
          <div className="space-y-2"><Label htmlFor="ln">Last name</Label><Input id="ln" required /></div>
        </div>
        <div className="space-y-2"><Label htmlFor="co">Company</Label><Input id="co" required placeholder="Acme Inc." /></div>
        <div className="space-y-2"><Label htmlFor="email">Work email</Label><Input id="email" type="email" required /></div>
        <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" required minLength={8} /></div>
        <Button className="w-full bg-gradient-hero text-primary-foreground shadow-elegant" disabled={loading}>
          {loading ? "Creating…" : "Create workspace"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Have an account? <Link to="/auth/login" className="text-primary hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
