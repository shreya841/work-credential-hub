import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, BadgeCheck, MapPin, Globe, Users, Building2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listCompanies, createCompany } from "@/lib/api/companies.functions";
import { useAuth } from "@/components/auth-provider";
import { CardGridSkeleton } from "@/components/loading-skeleton";
import { EmptyState } from "@/components/empty-state";

export const Route = createFileRoute("/app/companies-Shreya")({ component: Companies });

function Companies() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [size, setSize] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: () => listCompanies({ data: { page: 1, pageSize: 50 } }),
  });

  const mutation = useMutation({
    mutationFn: (newCompany: any) => createCompany({ data: newCompany }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success("Company added successfully");
      setOpen(false);
      setName("");
      setIndustry("");
      setSize("");
      setLocation("");
      setWebsite("");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to create company");
    },
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      name,
      industry,
      size,
      location,
      website: website || "",
    });
  };

  const isSuperAdmin = user.role === "super_admin";
  const companiesList = data?.data ?? [];

  return (
    <div>
      <PageHeader
        title="Companies"
        description="Manage partner companies and their verification status."
        actions={
          isSuperAdmin ? (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-hero text-primary-foreground shadow-elegant">
                  <Plus className="mr-1 h-4 w-4" /> Add company
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add company</DialogTitle>
                </DialogHeader>
                <form className="space-y-3" onSubmit={handleCreate}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Company Name</Label>
                    <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Input id="industry" required value={industry} onChange={(e) => setIndustry(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="size">Size (employees)</Label>
                      <Input id="size" required placeholder="e.g. 10-50, 100-500" value={size} onChange={(e) => setSize(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" required value={location} onChange={(e) => setLocation(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <Input id="website" type="text" placeholder="https://example.com" value={website} onChange={(e) => setWebsite(e.target.value)} />
                  </div>
                  <DialogFooter className="mt-4">
                    <Button type="submit" className="bg-gradient-hero text-primary-foreground shadow-elegant" disabled={mutation.isPending}>
                      {mutation.isPending ? "Adding..." : "Add company"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          ) : undefined
        }
      />

      {isLoading ? (
        <CardGridSkeleton count={6} />
      ) : companiesList.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No companies registered yet"
          description={isSuperAdmin ? "Register your first company to get started." : "Your company is not registered."}
          actionLabel={isSuperAdmin ? "Add Company" : undefined}
          onAction={isSuperAdmin ? () => setOpen(true) : undefined}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companiesList.map((c) => (
            <Card
              key={c.id}
              className="group border-border/60 bg-gradient-card transition hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-hero font-display text-lg font-bold text-primary-foreground shadow-elegant">
                    {c.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="truncate font-display text-lg font-semibold">{c.name}</h3>
                      {c.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{c.industry}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" />
                    {c.location || "N/A"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5" />
                    {c.website ? (
                      <a href={c.website} target="_blank" rel="noreferrer" className="hover:underline">
                        {c.website.replace(/^https?:\/\/(www\.)?/, "")}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5" />
                    {c.employeeCount.toLocaleString()} employees
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                  <Badge
                    variant={c.verified ? "default" : "outline"}
                    className={
                      c.verified ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10" : ""
                    }
                  >
                    {c.verified ? "Verified" : "Pending"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
