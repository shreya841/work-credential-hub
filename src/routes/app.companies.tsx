import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, BadgeCheck, MapPin, Globe, Users, Building2, AlertTriangle, RefreshCw, MoreVertical, Check, Ban, Archive } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listCompanies, createCompany, updateCompany, deleteCompany, getCompanyDeleteImpact } from "@/lib/api/companies.functions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/components/auth-provider";
import { CardGridSkeleton } from "@/components/loading-skeleton";
import { EmptyState } from "@/components/empty-state";

export const Route = createFileRoute("/app/companies")({
  loader: async ({ context: { queryClient } }) => {
    try {
      await queryClient.prefetchQuery({
        queryKey: ["companies"],
        queryFn: () => listCompanies({ data: { page: 1, pageSize: 50 } }),
      });
    } catch (e) {
      console.error("Companies preloading failed:", e);
    }
  },
  component: Companies,
});

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

  const verifyMutation = useMutation({
    mutationFn: ({ id, verified, status }: { id: string; verified: boolean; status: "approved" | "rejected" | "suspended" | "pending" }) =>
      updateCompany({ data: { id, verified, status } }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success(
        variables.status === "approved" ? "Company approved successfully" : "Company status updated"
      );
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to update status");
    },
  });

  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  const rejectMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => updateCompany({ data: { id, status: "rejected", verified: false } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success("Company registration rejected successfully");
      setSelectedCompany(null);
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to reject company");
    },
  });

  const suspendMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => updateCompany({ data: { id, status: "suspended", verified: false } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success("Company suspended successfully");
      setSelectedCompany(null);
    },
    onError: (err: any) => toast.error(err.message || "Failed to suspend company"),
  });

  const archiveMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => updateCompany({ data: { id, status: "archived", verified: false } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success("Company archived successfully");
      setSelectedCompany(null);
    },
    onError: (err: any) => toast.error(err.message || "Failed to archive company"),
  });

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<any>(null);
  const [confirmNameInput, setConfirmNameInput] = useState("");

  const { data: deleteImpact, isLoading: isLoadingImpact } = useQuery({
    queryKey: ["delete-impact-companies", companyToDelete?.id],
    queryFn: () => getCompanyDeleteImpact({ data: { id: companyToDelete!.id } }),
    enabled: !!companyToDelete?.id,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCompany({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success("Company deleted successfully");
      setSelectedCompany(null);
      setDeleteConfirmOpen(false);
      setConfirmNameInput("");
    },
    onError: (err: any) => toast.error(err.message || "Failed to delete company"),
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
              className="group border-border/60 bg-gradient-card transition hover:-translate-y-0.5 hover:shadow-elegant cursor-pointer"
              onClick={() => setSelectedCompany(c)}
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
                <div className="mt-4 space-y-1.5 text-sm text-muted-foreground border-t border-border/30 pt-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                    <span><strong>Location:</strong> {c.location || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                    <strong>Website:</strong>{" "}
                    {c.website ? (
                      <a href={c.website} target="_blank" rel="noreferrer" className="hover:underline text-primary">
                        {c.website.replace(/^https?:\/\/(www\.)?/, "")}
                      </a>
                    ) : (
                      <span className="text-muted-foreground/60">N/A</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                    <span><strong>Declared Size:</strong> {c.size || "1-10"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                    <span><strong>Registered Users:</strong> {c.employeeCount.toLocaleString()}</span>
                  </div>
                  {(c.creatorName || c.creatorEmail) && (
                    <div className="mt-3 border-t border-dashed border-border/50 pt-2 text-xs">
                      <div className="font-semibold text-muted-foreground/80">Registered By:</div>
                      <div className="truncate text-foreground/90 font-medium">{c.creatorName || "Unknown Admin"}</div>
                      <div className="truncate text-muted-foreground/70">{c.creatorEmail}</div>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                  <Badge
                    variant={
                      c.status === "approved"
                        ? "default"
                        : c.status === "pending"
                        ? "outline"
                        : "destructive"
                    }
                    className={
                      c.status === "approved"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/20 capitalize font-medium"
                        : c.status === "rejected"
                        ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border-rose-500/20 capitalize font-medium"
                        : c.status === "suspended"
                        ? "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/10 border-red-500/20 capitalize font-medium"
                        : c.status === "archived"
                        ? "bg-slate-500/10 text-slate-600 dark:text-slate-400 hover:bg-slate-500/10 border-slate-500/20 capitalize font-medium"
                        : c.status === "deleted"
                        ? "bg-red-950/15 text-red-500 dark:text-red-400 hover:bg-red-950/15 border-red-500/30 capitalize font-medium line-through"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 border-amber-500/20 capitalize font-medium"
                    }
                  >
                    {c.status || "Pending"}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs text-primary font-medium cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCompany(c);
                    }}
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Company Profile Details Dialog */}
      <Dialog open={!!selectedCompany} onOpenChange={(open) => !open && setSelectedCompany(null)}>
        <DialogContent className="max-w-md bg-background border border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-lg font-bold">
              <Building2 className="h-5 w-5 text-primary" />
              <span>Company Profile</span>
            </DialogTitle>
          </DialogHeader>
          {selectedCompany && (
            <>
            <div className="space-y-4 py-2">
              <div className="flex items-start gap-3 pb-3 border-b border-border/50">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-hero font-display text-lg font-bold text-primary-foreground shadow-elegant">
                  {selectedCompany.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-bold flex items-center gap-1.5 truncate">
                    {selectedCompany.name}
                    {selectedCompany.verified && <BadgeCheck className="h-4 w-4 text-primary shrink-0" />}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge
                      variant={
                        selectedCompany.status === "approved"
                          ? "default"
                          : selectedCompany.status === "pending"
                          ? "outline"
                          : "destructive"
                      }
                      className={
                        selectedCompany.status === "approved"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/20 mt-1 capitalize font-medium"
                          : selectedCompany.status === "rejected"
                          ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border-rose-500/20 mt-1 capitalize font-medium"
                          : selectedCompany.status === "suspended"
                          ? "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/10 border-red-500/20 mt-1 capitalize font-medium"
                          : selectedCompany.status === "archived"
                          ? "bg-slate-500/10 text-slate-600 dark:text-slate-400 hover:bg-slate-500/10 border-slate-500/20 mt-1 capitalize font-medium"
                          : selectedCompany.status === "deleted"
                          ? "bg-red-950/15 text-red-500 dark:text-red-400 hover:bg-red-950/15 border-red-500/30 mt-1 capitalize font-medium line-through"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 border-amber-500/20 mt-1 capitalize font-medium"
                      }
                    >
                      {selectedCompany.status || "Pending"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">· {selectedCompany.industry} Industry</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="grid grid-cols-[110px_1fr] gap-1">
                  <span className="font-medium text-foreground">Location:</span>
                  <span className="text-foreground/90">{selectedCompany.location || "N/A"}</span>
                </div>
                <div className="grid grid-cols-[110px_1fr] gap-1">
                  <span className="font-medium text-foreground">Website:</span>
                  <span className="truncate">
                    {selectedCompany.website ? (
                      <a href={selectedCompany.website} target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium break-all">
                        {selectedCompany.website}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </span>
                </div>
                <div className="grid grid-cols-[110px_1fr] gap-1">
                  <span className="font-medium text-foreground">Company Size:</span>
                  <span className="text-foreground/90">{selectedCompany.size || "1-10"} employees</span>
                </div>
                <div className="grid grid-cols-[110px_1fr] gap-1">
                  <span className="font-medium text-foreground">Active Employees:</span>
                  <span className="text-foreground/90">{selectedCompany.employeeCount} users</span>
                </div>
                
                {(selectedCompany.creatorName || selectedCompany.creatorEmail) && (
                  <div className="mt-4 border-t border-border/50 pt-3 space-y-2">
                    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Registered Administrator</h4>
                    <div className="bg-muted/40 p-2.5 rounded-lg space-y-0.5 border border-border/40">
                      <div className="font-semibold text-foreground/90">{selectedCompany.creatorName || "Unknown Admin"}</div>
                      <div className="text-xs text-muted-foreground">{selectedCompany.creatorEmail}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter className="flex flex-wrap gap-2 justify-end sm:gap-2 border-t pt-4">
              <DialogClose asChild>
                <Button variant="outline" size="sm">Close</Button>
              </DialogClose>
              {isSuperAdmin && selectedCompany.status !== "deleted" && (
                <>
                  {selectedCompany.status !== "approved" && (
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium cursor-pointer"
                      onClick={() => verifyMutation.mutate({ id: selectedCompany.id, verified: true, status: "approved" })}
                      disabled={verifyMutation.isPending}
                    >
                      Approve
                    </Button>
                  )}
                  {selectedCompany.status !== "rejected" && selectedCompany.status !== "approved" && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="font-medium cursor-pointer"
                      onClick={() => {
                        if (confirm(`Are you sure you want to reject "${selectedCompany.name}"?`))
                          rejectMutation.mutate({ id: selectedCompany.id });
                      }}
                      disabled={rejectMutation.isPending}
                    >
                      Reject
                    </Button>
                  )}
                  {selectedCompany.status === "approved" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-500/30 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/10 font-medium cursor-pointer"
                      onClick={() => suspendMutation.mutate({ id: selectedCompany.id })}
                      disabled={suspendMutation.isPending}
                    >
                      Suspend
                    </Button>
                  )}
                  {selectedCompany.status !== "archived" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-500/30 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-950/10 font-medium cursor-pointer"
                      onClick={() => archiveMutation.mutate({ id: selectedCompany.id })}
                      disabled={archiveMutation.isPending}
                    >
                      Archive
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    className="font-semibold bg-rose-600 hover:bg-rose-700 cursor-pointer"
                    onClick={() => {
                      setCompanyToDelete(selectedCompany);
                      setDeleteConfirmOpen(true);
                      setConfirmNameInput("");
                    }}
                  >
                    Delete Company
                  </Button>
                </>
              )}
            </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {deleteConfirmOpen && companyToDelete && (
        <Dialog open={deleteConfirmOpen} onOpenChange={(open) => !open && setDeleteConfirmOpen(false)}>
          <DialogContent className="max-w-md bg-background border border-border">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-rose-600 font-display text-lg font-bold">
                <AlertTriangle className="h-5 w-5 text-rose-600" />
                <span>Confirm Company Deletion</span>
              </DialogTitle>
              <DialogDescription>
                Review the cascading impact of soft-deleting this company.
              </DialogDescription>
            </DialogHeader>

            {isLoadingImpact ? (
              <div className="py-6 flex justify-center">
                <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : deleteImpact ? (
              <div className="space-y-4 py-2 text-sm">
                <div className="bg-rose-500/10 dark:bg-rose-950/20 border border-rose-500/20 p-3.5 rounded-xl text-rose-700 dark:text-rose-300">
                  Are you sure you want to soft-delete <strong>{deleteImpact.companyName}</strong>? This action will archive active relationships but preserve individual career history.
                </div>

                <div className="space-y-2.5">
                  <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">Cascading Impact Summary:</h4>
                  
                  <div className="space-y-2 border border-border/60 rounded-xl p-3 bg-muted/20">
                    <div className="flex justify-between items-center pb-1.5 border-b border-border/40">
                      <span className="text-muted-foreground font-medium">Company Record:</span>
                      <Badge variant="destructive" className="bg-rose-500/10 text-rose-600 border-rose-500/20 font-medium">Status to DELETED</Badge>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-muted-foreground font-medium">HR / Admin Accounts:</span>
                      <span className="font-bold text-foreground">{deleteImpact.hrCount} unlinked (set to null)</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-muted-foreground font-medium">Active Employee Profiles:</span>
                      <span className="font-bold text-foreground">{deleteImpact.employeeCount} unlinked & profiles survive</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-muted-foreground font-medium">Employment Records:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{deleteImpact.employeeCount} archived in career history</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-muted-foreground font-medium">Verification Requests:</span>
                      <span className="font-bold text-foreground">{deleteImpact.requestCount} historical records kept</span>
                    </div>
                    <div className="flex justify-between items-center pt-1.5 border-t border-border/40">
                      <span className="text-muted-foreground font-medium">Performance Reviews:</span>
                      <span className="font-bold text-foreground">{deleteImpact.reviewCount} preserved on employees</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-4 pt-2 border-t border-border/50">
                  <Label className="text-foreground font-medium block">
                    Type <strong>{deleteImpact.companyName}</strong> to confirm deletion:
                  </Label>
                  <Input
                    id="confirm-name-input"
                    value={confirmNameInput}
                    onChange={(e) => setConfirmNameInput(e.target.value)}
                    placeholder="Enter company name"
                    className="border-rose-500/30 focus-visible:ring-rose-500/30 w-full"
                  />
                </div>
              </div>
            ) : (
              <div className="py-4 text-center text-muted-foreground">Failed to load impact details.</div>
            )}

            <DialogFooter className="gap-2 sm:gap-0 mt-2">
              <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={
                  isLoadingImpact || 
                  !deleteImpact || 
                  confirmNameInput !== deleteImpact.companyName || 
                  deleteMutation.isPending
                }
                onClick={() => deleteMutation.mutate(companyToDelete.id)}
                className="bg-rose-600 hover:bg-rose-700 text-white font-semibold cursor-pointer"
              >
                {deleteMutation.isPending ? "Deleting..." : "Confirm Deletion"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
