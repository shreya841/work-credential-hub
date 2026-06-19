import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";

const signupAction = createServerFn({ method: "POST" })
  .validator(
    z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      companyName: z.string().optional(),
      companyIndustry: z.string().optional(),
      companyLocation: z.string().optional(),
      companySize: z.string().optional(),
      companyWebsite: z.string().optional(),
      email: z.string().email("Please enter a valid email"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      role: z.enum(["company_admin", "employee", "independent_professional"]),
      phone: z.string().optional(),
      skills: z.array(z.string()).optional(),
      certifications: z.array(z.string()).optional(),
      experience: z.number().optional(),
      portfolioLinks: z.array(z.string()).optional(),
      resumeUrl: z.string().optional(),
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
      let employeeIdToLink: string | null = null;
      const isIndependent = data.role === "independent_professional";
      const dbRole = isIndependent ? "employee" : data.role;

      if (data.role === "company_admin") {
        if (!data.companyName) throw new Error("Company name is required for Company Admin");
        // Create company first
        const [company] = await db
          .insert(companies)
          .values({
            name: data.companyName,
            industry: data.companyIndustry || "General",
            size: data.companySize || "1-10",
            location: data.companyLocation || "",
            website: data.companyWebsite || "",
          })
          .returning();
        companyId = company.id;
      } else if (data.role === "employee") {
        const { employees, invitations } = await import("@/lib/db/schema");
        const { and } = await import("drizzle-orm");
        
        // Check invitations first
        const [inv] = await db
          .select()
          .from(invitations)
          .where(and(eq(invitations.email, data.email.toLowerCase().trim()), eq(invitations.status, "pending")))
          .limit(1);

        if (inv) {
          companyId = inv.companyId;
          employeeIdToLink = inv.employeeId;
          
          await db
            .update(invitations)
            .set({ status: "accepted" })
            .where(eq(invitations.id, inv.id));
        } else {
          // Check existing employee record by email
          const [existingEmp] = await db
            .select()
            .from(employees)
            .where(eq(employees.email, data.email.toLowerCase().trim()))
            .limit(1);

          if (existingEmp) {
            companyId = existingEmp.companyId;
            employeeIdToLink = existingEmp.id;
          }
        }
      }

      // Create user
      const [user] = await db
        .insert(users)
        .values({
          email: data.email,
          passwordHash,
          fullName,
          role: dbRole as any,
          companyId,
        })
        .returning();

      // Update company createdById
      if (data.role === "company_admin" && companyId) {
        await db
          .update(companies)
          .set({ createdById: user.id })
          .where(eq(companies.id, companyId));
      }

      // If we found an employee record to link, update it
      const { employees } = await import("@/lib/db/schema");
      if (employeeIdToLink) {
        await db
          .update(employees)
          .set({ userId: user.id, claimStatus: "claimed" })
          .where(eq(employees.id, employeeIdToLink));
      } else if (isIndependent || data.role === "employee") {
        // Create an employee profile (if not linked)
        const employeeId = `${isIndependent ? 'IND' : 'EMP'}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
        
        await db
          .insert(employees)
          .values({
            employeeId,
            userId: user.id,
            companyId: companyId || null,
            fullName,
            email: data.email.toLowerCase().trim(),
            phone: data.phone || "",
            designation: isIndependent ? "Independent Professional" : "Employee Profile",
            department: isIndependent ? "Self" : "General",
            skills: data.skills || [],
            certifications: data.certifications || [],
            portfolioLinks: data.portfolioLinks || [],
            resumeUrl: data.resumeUrl || "",
            joiningDate: new Date(),
            experience: data.experience || 0,
            status: "active",
            claimStatus: "claimed",
          });
      }

      // Send Welcome Registration Email
      try {
        const { sendEmail, getWelcomeEmailHtml } = await import("@/lib/email.server");
        const welcomeHtml = getWelcomeEmailHtml({ fullName: user.fullName });
        await sendEmail({
          to: user.email,
          subject: "Welcome to WorkCred!",
          html: welcomeHtml,
        });
      } catch (emailErr) {
        console.error("Failed to send welcome email:", emailErr);
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

const getInvitationEmail = createServerFn({ method: "GET" })
  .validator(
    z.object({
      inviteId: z.string(),
    })
  )
  .handler(async ({ data }) => {
    const { getDb } = await import("@/lib/db/index.server");
    const { invitations } = await import("@/lib/db/schema");
    const { eq, and } = await import("drizzle-orm");
    const db = getDb();

    const [inv] = await db
      .select({ email: invitations.email })
      .from(invitations)
      .where(and(eq(invitations.id, data.inviteId), eq(invitations.status, "pending")))
      .limit(1);

    return inv || null;
  });

const signupSearchSchema = z.object({
  email: z.string().optional(),
  inviteId: z.string().optional(),
});

export const Route = createFileRoute("/auth/signup")({
  validateSearch: (search) => signupSearchSchema.parse(search),
  component: Signup,
});

function Signup() {
  const search = Route.useSearch();
  const prefilledEmail = search.email || "";
  const inviteId = search.inviteId || "";

  const nav = useNavigate();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailVal, setEmailVal] = useState(prefilledEmail);
  const [role, setRole] = useState<"company_admin" | "employee" | "independent_professional">(
    (prefilledEmail || inviteId) ? "employee" : "company_admin"
  );

  useEffect(() => {
    if (inviteId && !prefilledEmail) {
      getInvitationEmail({ data: { inviteId } })
        .then((res) => {
          if (res?.email) {
            setEmailVal(res.email);
          }
        })
        .catch(console.error);
    }
  }, [inviteId, prefilledEmail]);

  useEffect(() => {
    if (prefilledEmail) {
      setEmailVal(prefilledEmail);
    }
  }, [prefilledEmail]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const companyName = formData.get("companyName") as string;
    const companyIndustry = formData.get("companyIndustry") as string;
    const companyLocation = formData.get("companyLocation") as string;
    const companySize = formData.get("companySize") as string;
    const companyWebsite = formData.get("companyWebsite") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const phone = formData.get("phone") as string;
    const skills = formData.get("skills") as string;
    const experience = formData.get("experience") as string;
    const portfolioLinks = formData.get("portfolioLinks") as string;
    const resumeUrl = formData.get("resumeUrl") as string;

    const skillsArray = skills
      ? skills.split(",").map((s) => s.trim()).filter((s) => s.length > 0)
      : [];
    const portfolioLinksArray = portfolioLinks
      ? portfolioLinks.split(",").map((s) => s.trim()).filter((s) => s.length > 0)
      : [];

    try {
      await signupAction({
        data: {
          firstName,
          lastName,
          companyName: role === "company_admin" ? companyName : undefined,
          companyIndustry: role === "company_admin" ? companyIndustry : undefined,
          companyLocation: role === "company_admin" ? companyLocation : undefined,
          companySize: role === "company_admin" ? companySize : undefined,
          companyWebsite: role === "company_admin" ? companyWebsite : undefined,
          email,
          password,
          role,
          phone: role === "independent_professional" ? phone : undefined,
          skills: role === "independent_professional" ? skillsArray : undefined,
          experience: role === "independent_professional" ? Number(experience) : undefined,
          portfolioLinks: role === "independent_professional" ? portfolioLinksArray : undefined,
          resumeUrl: role === "independent_professional" ? resumeUrl : undefined,
        },
      });
      queryClient.clear();
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
          <Select value={role} onValueChange={(v) => setRole(v as any)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="company_admin">Company Admin</SelectItem>
              <SelectItem value="employee">Company Employee</SelectItem>
              <SelectItem value="independent_professional">Independent Professional</SelectItem>
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
          <>
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
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="companyLocation">Location</Label>
                <Input id="companyLocation" name="companyLocation" placeholder="e.g. Delhi, India" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companySize">Size (employees)</Label>
                <Select name="companySize" defaultValue="1-10">
                  <SelectTrigger id="companySize">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="500+">500+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyWebsite">Company Website</Label>
              <Input id="companyWebsite" name="companyWebsite" type="url" placeholder="https://example.com" required />
            </div>
          </>
        )}
        {role === "independent_professional" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" name="phone" placeholder="e.g. +1234567890" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input id="experience" name="experience" type="number" min="0" placeholder="e.g. 5" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Input id="skills" name="skills" placeholder="e.g. React, SQL, TypeScript" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolioLinks">Portfolio Links (comma separated)</Label>
              <Input id="portfolioLinks" name="portfolioLinks" placeholder="e.g. https://portfolio.com, https://github.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resumeUrl">Resume URL</Label>
              <Input id="resumeUrl" name="resumeUrl" type="url" placeholder="https://drive.google.com/resume.pdf" />
            </div>
          </>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            required 
            placeholder="you@company.com" 
            value={emailVal} 
            onChange={(e) => setEmailVal(e.target.value)} 
          />
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
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            placeholder="Confirm your password"
          />
        </div>
        <Button
          className="w-full bg-gradient-hero text-primary-foreground shadow-elegant"
          disabled={loading}
        >
          {loading ? "Creating…" : (prefilledEmail || inviteId) ? "Claim Profile" : "Create workspace"}
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
