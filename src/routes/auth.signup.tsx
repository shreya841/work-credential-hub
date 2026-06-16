import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const signupAction = createServerFn({ method: "POST" })
  .validator(
    z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      companyName: z.string().min(1, "Company name is required"),
      companyIndustry: z.string().min(1, "Industry is required"),
      email: z.string().email("Please enter a valid email"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      role: z.enum(["company_admin", "employee"]),
    })
  )
  .handler(async ({ data }) => {
    try {
      const { setCookie } = await import("@tanstack/react-start/server");
      const { getDb } = await import("@/lib/db/index.server");
      const { users, companies } = await import("@/lib/db/schema");
      const { eq } = await import("drizzle-orm");
      const { hashPassword, signAccessToken, signRefreshToken } = await import(
        "@/lib/auth/jwt.server"
      );

      const db = getDb();

      // Check if email already exists
      const [existing] = await db
        .select()
        .from(users)
        .where(eq(users.email, data.email))
        .limit(1);
      if (existing) throw new Error("An account with this email already exists");

      const passwordHash = await hashPassword(data.password);
      const fullName = `${data.firstName} ${data.lastName}`;

      let companyId: string | null = null;

      if (data.role === "company_admin") {
        // Create company first
        const [company] = await db
          .insert(companies)
          .values({
            name: data.companyName,
            industry: data.companyIndustry,
          })
          .returning();
        companyId = company.id;
      }

      // Create user
      const [user] = await db
        .insert(users)
        .values({
          email: data.email,
          passwordHash,
          fullName,
          role: data.role,
          companyId,
        })
        .returning();

      // Update company createdById
      if (companyId) {
        await db
          .update(companies)
          .set({ createdById: user.id })
          .where(eq(companies.id, companyId));
      }

      const accessToken = signAccessToken({
        userId: user.id,
        role: user.role,
        email: user.email,
      });
      const refreshToken = signRefreshToken(user.id);

      setCookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
      });
      setCookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          companyId: user.companyId,
          avatarUrl: user.avatarUrl,
        },
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Signup failed");
    }
  });

export const Route = createFileRoute("/auth/signup")({
  component: Signup,
});

function Signup() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState<"company_admin" | "employee">("company_admin");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const companyName = formData.get("companyName") as string;
    const companyIndustry = formData.get("companyIndustry") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signupAction({
        data: {
          firstName,
          lastName,
          companyName: companyName || "N/A",
          companyIndustry: companyIndustry || "General",
          email,
          password,
          role,
        },
      });
      toast.success("Account created successfully");
      nav({ to: "/app/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Create your workspace</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Start managing employee reputation in minutes.
      </p>

      {error && (
        <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label>I am a</Label>
          <Select value={role} onValueChange={(v) => setRole(v as "company_admin" | "employee")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="company_admin">Company Admin</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" name="firstName" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" name="lastName" required />
          </div>
        </div>
        {role === "company_admin" && (
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company name</Label>
              <Input id="companyName" name="companyName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyIndustry">Industry</Label>
              <Input id="companyIndustry" name="companyIndustry" required />
            </div>
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@company.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            placeholder="Min 8 characters"
          />
        </div>
        <Button
          className="w-full bg-gradient-hero text-primary-foreground shadow-elegant"
          disabled={loading}
        >
          {loading ? "Creating…" : "Create workspace"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Have an account?{" "}
        <Link to="/auth/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
