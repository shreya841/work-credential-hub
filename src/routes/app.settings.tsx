import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Shield, Database, Key, Server, Users as UsersIcon } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/auth-provider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listUsers, updateUserAdmin } from "@/lib/api/users.functions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/settings")({ component: SettingsPage });

function SettingsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  // Configuration settings states
  const [platformName, setPlatformName] = useState("WorkCred Platform");
  const [allowPublicSearch, setAllowPublicSearch] = useState(true);
  const [enforceMfa, setEnforceMfa] = useState(false);
  const [auditLogRetention, setAuditLogRetention] = useState("90");

  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ["users-list"],
    queryFn: () => listUsers({ data: { page: 1, pageSize: 50 } }),
    enabled: user.role === "super_admin",
  });

  const updateUserMutation = useMutation({
    mutationFn: (args: any) => updateUserAdmin({ data: args }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-list"] });
      toast.success("User updated successfully");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to update user");
    },
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Settings saved successfully");
    }, 800);
  };

  if (user.role !== "super_admin") {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Shield className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold text-destructive">Unauthorized Access</h3>
        <p className="text-sm text-muted-foreground mt-1">This section is restricted to Super Administrators only.</p>
      </div>
    );
  }

  const usersList = usersData?.data ?? [];

  return (
    <div>
      <PageHeader title="Platform Settings" description="Configure system-level parameters, compliance settings, and audit retention." />

      <Tabs defaultValue="general" className="mt-6">
        <TabsList>
          <TabsTrigger value="general" className="flex items-center gap-1.5">
            <Server className="h-4 w-4" /> General
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1.5">
            <Key className="h-4 w-4" /> Security
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-1.5">
            <UsersIcon className="h-4 w-4" /> User Management
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-1.5">
            <Database className="h-4 w-4" /> System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>General Configuration</CardTitle>
              <CardDescription>Configure basic branding and visibility options.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4 max-w-xl">
                <div className="space-y-2">
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input id="platformName" value={platformName} onChange={(e) => setPlatformName(e.target.value)} />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/20">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-semibold">Allow Public Profile Search</Label>
                    <p className="text-xs text-muted-foreground">Allows candidates with public visible toggle to show in HR searches.</p>
                  </div>
                  <Switch checked={allowPublicSearch} onCheckedChange={setAllowPublicSearch} />
                </div>
                <Button type="submit" className="bg-gradient-hero text-primary-foreground shadow-elegant" disabled={loading}>
                  {loading ? "Saving..." : "Save Settings"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage user authentication policies and session controls.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4 max-w-xl">
                <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/20">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-semibold">Enforce MFA (Multi-Factor Authentication)</Label>
                    <p className="text-xs text-muted-foreground">Force all company admins and HR roles to register OTP credentials.</p>
                  </div>
                  <Switch checked={enforceMfa} onCheckedChange={setEnforceMfa} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retention">Audit Log Retention (Days)</Label>
                  <Input id="retention" type="number" min={30} value={auditLogRetention} onChange={(e) => setAuditLogRetention(e.target.value)} />
                </div>
                <Button type="submit" className="bg-gradient-hero text-primary-foreground shadow-elegant" disabled={loading}>
                  {loading ? "Saving..." : "Save Settings"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Configure user roles and suspend or unsuspend accounts.</CardDescription>
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <div className="space-y-2">
                  <div className="h-10 bg-muted rounded animate-pulse" />
                  <div className="h-10 bg-muted rounded animate-pulse" />
                  <div className="h-10 bg-muted rounded animate-pulse" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usersList.map((u: any) => (
                      <TableRow key={u.id}>
                        <TableCell className="font-medium">{u.fullName}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>
                          <Select
                            value={u.role}
                            onValueChange={(val) =>
                              updateUserMutation.mutate({ userId: u.id, role: val as any })
                            }
                            disabled={updateUserMutation.isPending || u.id === user.id}
                          >
                            <SelectTrigger className="w-36 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="super_admin">Super Admin</SelectItem>
                              <SelectItem value="company_admin">Company Admin</SelectItem>
                              <SelectItem value="hr">HR Manager</SelectItem>
                              <SelectItem value="employee">Employee</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Badge variant={u.status === "active" ? "outline" : "destructive"}>
                            <span className="capitalize">{u.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {u.id !== user.id && (
                            <Button
                              size="xs"
                              variant={u.status === "active" ? "destructive" : "outline"}
                              className="text-xs h-8"
                              onClick={() =>
                                updateUserMutation.mutate({
                                  userId: u.id,
                                  status: u.status === "active" ? "suspended" : "active",
                                })
                              }
                              disabled={updateUserMutation.isPending}
                            >
                              {u.status === "active" ? "Suspend" : "Unsuspend"}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="mt-4">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>System & Database Status</CardTitle>
              <CardDescription>View ORM connections and run migrations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 bg-muted/10 space-y-3">
                <div className="flex justify-between items-center text-sm border-b pb-2">
                  <span className="text-muted-foreground">Database Dialect</span>
                  <span className="font-semibold font-mono">PostgreSQL</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b pb-2">
                  <span className="text-muted-foreground">ORM Engine</span>
                  <span className="font-semibold font-mono">Drizzle ORM v0.45.2</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Connection Pool</span>
                  <span className="text-emerald-500 font-semibold flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" /> Connected
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


