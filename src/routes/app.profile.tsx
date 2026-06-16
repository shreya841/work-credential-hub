import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { User, Mail, Phone, Briefcase, Calendar, Award } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEmployeeByUserId } from "@/lib/api/employees.functions";
import { updateUserProfile } from "@/lib/api/users.functions";
import { useAuth } from "@/components/auth-provider";
import { ProfileSkeleton } from "@/components/loading-skeleton";

export const Route = createFileRoute("/app/profile")({ component: ProfilePage });

function ProfilePage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const { data: employee, isLoading } = useQuery({
    queryKey: ["employee-self"],
    queryFn: () => getEmployeeByUserId({ data: {} }),
  });

  const mutation = useMutation({
    mutationFn: (updates: any) => updateUserProfile({ data: updates }),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ["employee-self"] });
      // Invalidate auth context user if cached
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Profile updated successfully");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to update profile");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      fullName: fullName || undefined,
      avatarUrl: avatarUrl || undefined,
    });
  };

  // Pre-fill fields when employee data loads
  useState(() => {
    if (user) {
      setFullName(user.fullName);
      setAvatarUrl(user.avatarUrl || "");
    }
  });

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  const initials = user.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div>
      <PageHeader title="My Profile" description="View and manage your employee details." />

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-2 space-y-5">
          <Card className="overflow-hidden border-border/60 bg-gradient-card">
            <div className="h-24 bg-gradient-hero" />
            <CardContent className="-mt-12 p-6">
              <div className="flex gap-4 items-end">
                <Avatar className="h-24 w-24 border-4 border-background shadow-elegant">
                  {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.fullName} />}
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h2 className="font-display text-2xl font-bold">{user.fullName}</h2>
                  <p className="text-sm text-muted-foreground capitalize">Role: {user.role.replace("_", " ")}</p>
                </div>
              </div>

              {employee ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-lg border p-3 bg-background/40">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Work Email</div>
                      <div className="text-sm font-medium">{employee.email}</div>
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
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Designation & Dept</div>
                      <div className="text-sm font-medium">
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
                <div className="mt-6 text-sm text-muted-foreground bg-muted/20 border rounded-lg p-4">
                  No linked employee workspace profile found for this user account. Contact your company administrator to link your profile.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Edit Profile Form */}
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Edit Profile Info</CardTitle>
              <CardDescription>Update your display name and avatar image.</CardDescription>
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
                </div>
                <Button type="submit" className="bg-gradient-hero text-primary-foreground shadow-elegant" disabled={mutation.isPending}>
                  {mutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Skills Card */}
        <div>
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {employee && employee.skills && employee.skills.length > 0 ? (
                  employee.skills.map((s: string) => (
                    <Badge key={s} variant="outline">
                      {s}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">No skills listed on your employee record.</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
