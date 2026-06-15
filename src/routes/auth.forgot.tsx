import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/forgot")({
  component: Forgot,
});

function Forgot() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Reset password</h1>
      <p className="mt-2 text-sm text-muted-foreground">We'll email you a secure reset link.</p>
      {sent ? (
        <div className="mt-8 rounded-lg border border-success/30 bg-success/10 p-4 text-sm text-success-foreground">
          Check your inbox for reset instructions.
        </div>
      ) : (
        <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Reset link sent"); }}>
          <div className="space-y-2"><Label htmlFor="email">Work email</Label><Input id="email" type="email" required /></div>
          <Button className="w-full bg-gradient-hero text-primary-foreground shadow-elegant">Send reset link</Button>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link to="/auth/login" className="text-primary hover:underline">Back to sign in</Link>
      </p>
    </div>
  );
}
