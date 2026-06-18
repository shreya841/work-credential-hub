import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { User, Mail, Phone, Briefcase, Calendar, Award, Globe, FileText, BadgeCheck, Clock, X, Sparkles, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEmployeeByUserId, updateEmployee, getEmploymentHistory } from "@/lib/api/employees.functions";
import { updateUserProfile } from "@/lib/api/users.functions";
import { useAuth } from "@/components/auth-provider";
import { ProfileSkeleton, ListSkeleton } from "@/components/loading-skeleton";

export const Route = createFileRoute("/app/profile")({ component: ProfilePage });

function ProfilePage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Queries
  const { data: employee, isLoading: isEmployeeLoading } = useQuery({
    queryKey: ["employee-self", user?.id],
    queryFn: () => getEmployeeByUserId({ data: { userId: user!.id } }),
  });

  const { data: history, isLoading: isHistoryLoading } = useQuery({
    queryKey: ["employee-history-self", employee?.id],
    queryFn: () => getEmploymentHistory({ data: { employeeId: employee!.id } }),
    enabled: !!employee?.id,
  });

  // State variables for form fields
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState(0);
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [skills, setSkills] = useState("");
  const [certifications, setCertifications] = useState("");
  const [portfolioLinks, setPortfolioLinks] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");

  // Sync state with loaded employee data
  useEffect(() => {
    if (employee) {
      setFullName(employee.fullName || "");
      setAvatarUrl(employee.photoUrl || user?.avatarUrl || "");
      setPhone(employee.phone || "");
      setExperience(employee.experience || 0);
      setDesignation(employee.designation || "");
      setDepartment(employee.department || "");
      setSkills(employee.skills ? employee.skills.join(", ") : "");
      setCertifications(employee.certifications ? employee.certifications.join(", ") : "");
      setPortfolioLinks(employee.portfolioLinks ? employee.portfolioLinks.join(", ") : "");
      setResumeUrl(employee.resumeUrl || "");
    }
  }, [employee, user]);

  // Mutations
  const updateProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      // 1. Update user profile details
      await updateUserProfile({
        data: {
          fullName: data.fullName,
          avatarUrl: data.photoUrl,
        },
      });

      // 2. Update employee profile details
      return updateEmployee({ data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee-self"] });
      queryClient.invalidateQueries({ queryKey: ["employee-history-self"] });
      toast.success("Profile saved successfully");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update profile");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;

    const parsedSkills = skills
      ? skills.split(",").map((s) => s.trim()).filter((s) => s.length > 0)
      : [];
    const parsedCertifications = certifications
      ? certifications.split(",").map((s) => s.trim()).filter((s) => s.length > 0)
      : [];
    const parsedPortfolioLinks = portfolioLinks
      ? portfolioLinks.split(",").map((s) => s.trim()).filter((s) => s.length > 0)
      : [];

    updateProfileMutation.mutate({
      id: employee.id,
      fullName,
      phone,
      experience: Number(experience),
      designation,
      department,
      skills: parsedSkills,
      certifications: parsedCertifications,
      portfolioLinks: parsedPortfolioLinks,
      resumeUrl,
      photoUrl: avatarUrl,
    });
  };

  if (isEmployeeLoading) {
    return <ProfileSkeleton />;
  }

  const initials = (fullName || user?.fullName || "P")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-6">
      <PageHeader title="My Profile" description="View and manage your workforce professional identity." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Details & Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden border-border/60 bg-gradient-card">
            <div className="h-24 bg-gradient-hero flex items-center justify-end px-6">
              {employee?.trustScore !== undefined && (
                <div className="bg-background/90 backdrop-blur border text-foreground px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5 translate-y-6">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  Trust Score: {employee.trustScore}
                </div>
              )}
            </div>
            <CardContent className="mt-2 p-6 pt-0">
              <div className="flex gap-4 items-end -mt-10 mb-6">
                <Avatar className="h-24 w-24 border-4 border-background shadow-elegant">
                  {avatarUrl && <AvatarImage src={avatarUrl} alt={fullName} />}
                  <AvatarFallback className="text-xl font-bold">{initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h2 className="font-display text-2xl font-bold flex items-center gap-1.5">
                    {fullName || user?.fullName}
                    {employee?.verified && <BadgeCheck className="h-5 w-5 text-primary" />}
                  </h2>
                  <p className="text-sm text-muted-foreground capitalize">
                    {employee?.companyId ? "Verified Employee" : "Independent Professional"}
                  </p>
                </div>
              </div>

              {employee ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-lg border p-3 bg-background/40">
                    <Mail className="h-5 w-5 text-primary" />
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Work Email</div>
                      <div className="text-sm font-medium truncate">{employee.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border p-3 bg-background/40">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Phone</div>
                      <div className="text-sm font-medium">{employee.phone || "Not set"}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border p-3 bg-background/40">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Designation & Dept</div>
                      <div className="text-sm font-medium truncate">
                        {employee.designation} · {employee.department}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border p-3 bg-background/40">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Joining Date</div>
                      <div className="text-sm font-medium">
                        {new Date(employee.joiningDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground bg-muted/20 border rounded-lg p-4">
                  No linked employee workspace profile found.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Edit Profile Form */}
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Edit Profile Info</CardTitle>
              <CardDescription>Update your professional profile details, resume, and credentials.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input id="displayName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avatarUrl">Avatar Image URL</Label>
                    <Input id="avatarUrl" placeholder="https://..." value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input id="experience" type="number" min="0" value={experience} onChange={(e) => setExperience(Number(e.target.value))} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" value={department} onChange={(e) => setDepartment(e.target.value)} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="resumeUrl">Resume Document URL</Label>
                    <Input id="resumeUrl" placeholder="https://..." value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="skills">Skills (Comma-separated)</Label>
                    <Input id="skills" placeholder="React, Node.js, TypeScript" value={skills} onChange={(e) => setSkills(e.target.value)} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="certifications">Certifications (Comma-separated)</Label>
                    <Input id="certifications" placeholder="AWS Solution Architect, PMP" value={certifications} onChange={(e) => setCertifications(e.target.value)} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="portfolioLinks">Portfolio & Social Links (Comma-separated)</Label>
                    <Input id="portfolioLinks" placeholder="https://github.com/me, https://portfolio.me" value={portfolioLinks} onChange={(e) => setPortfolioLinks(e.target.value)} />
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <Button type="submit" className="bg-gradient-hero text-primary-foreground shadow-elegant" disabled={updateProfileMutation.isPending}>
                    {updateProfileMutation.isPending ? "Saving..." : "Save Profile"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Timeline & Career History List */}
        <div className="space-y-6">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Verified Timeline</CardTitle>
              <CardDescription>Your career history status logs</CardDescription>
            </CardHeader>
            <CardContent>
              {isHistoryLoading ? (
                <ListSkeleton count={3} />
              ) : !history || history.length === 0 ? (
                <div className="text-center py-6 text-sm text-muted-foreground">
                  No career history records logged. Add entries from the dashboard.
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3 bg-muted/10 space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="font-semibold text-sm text-foreground block">
                            {item.companyName}
                          </span>
                          <span className="text-xs text-muted-foreground">{item.designation}</span>
                        </div>
                        <Badge
                          variant={
                            item.verificationStatus === "verified"
                              ? "default"
                              : item.verificationStatus === "rejected"
                              ? "destructive"
                              : "outline"
                          }
                          className="capitalize text-[10px]"
                        >
                          {item.verificationStatus}
                        </Badge>
                      </div>
                      <div className="text-[10px] text-muted-foreground flex flex-col gap-0.5 pt-1">
                        <span>
                          Timeline: {new Date(item.joiningDate).toLocaleDateString()} -{" "}
                          {item.exitDate ? new Date(item.exitDate).toLocaleDateString() : "Present"}
                        </span>
                        {item.department && <span>Department: {item.department}</span>}
                        <span>Experience: {item.experience} years</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Portfolio Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {employee && employee.portfolioLinks && employee.portfolioLinks.length > 0 ? (
                employee.portfolioLinks.map((link: string, idx: number) => (
                  <a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1.5 truncate"
                  >
                    <Globe className="h-4 w-4 shrink-0" />
                    <span className="truncate">{link.replace("https://", "").replace("http://", "")}</span>
                    <ExternalLink className="h-3 w-3 shrink-0 ml-auto" />
                  </a>
                ))
              ) : (
                <span className="text-muted-foreground">No portfolio links added.</span>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
