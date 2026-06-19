import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, BadgeCheck, Search, Filter, Users, MoreVertical, Trash2, Ban, X, Copy } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployeeInviteLink } from "@/lib/api/employees.functions";
import { TableSkeleton } from "@/components/loading-skeleton";
import { EmptyState } from "@/components/empty-state";
import { useAuth } from "@/components/auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    className={props.className}
    style={{ width: "1rem", height: "1rem", ...props.style }}
    {...props}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.388 1.967 13.91 .94 11.283.94c-5.442 0-9.866 4.372-9.87 9.802 0 1.83.504 3.609 1.46 5.19L1.816 21.66l5.83-1.506zm9.234-5.656c-.266-.134-1.58-.78-1.827-.868-.247-.09-.427-.134-.607.134-.18.266-.697.868-.853 1.047-.157.18-.314.201-.58.067-.266-.134-1.127-.415-2.147-1.326-.79-.705-1.324-1.577-1.48-1.845-.157-.266-.017-.41.117-.543.12-.12.266-.314.4-.47.134-.157.18-.268.269-.447.09-.18.045-.335-.022-.47-.067-.134-.607-1.462-.83-2c-.217-.524-.436-.453-.607-.462-.157-.008-.337-.01-.517-.01-.18 0-.472.067-.719.336-.247.268-.944.923-.944 2.25 0 1.327.965 2.607 1.1 2.785.134.18 1.9 2.9 4.6 4.069.643.277 1.143.444 1.532.568.646.205 1.233.176 1.7.107.52-.078 1.58-.645 1.802-1.27.225-.625.225-1.16.157-1.27-.067-.113-.247-.18-.513-.314z"/>
  </svg>
);

export const Route = createFileRoute("/app/employees/")({
  component: EmployeesPage,
});

const PER_PAGE = 8;

function EmployeesPage() {
  const { user } = useAuth();
  const isApproved = user.role === "super_admin" || user.companyStatus === "approved";
  const queryClient = useQueryClient();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [experience, setExperience] = useState(0);
  const [joiningDate, setJoiningDate] = useState("");
  const [skills, setSkills] = useState("");
  const [sendEmail, setSendEmail] = useState(true);
  const [createdEmployeeInfo, setCreatedEmployeeInfo] = useState<{
    fullName: string;
    email: string;
    phone: string;
    invitationId: string | null;
    companyName: string;
  } | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["employees", q, status, page],
    queryFn: () =>
      listEmployees({
        data: {
          page,
          pageSize: PER_PAGE,
          search: q || undefined,
          status: status === "all" ? undefined : (status as any),
        },
      }),
  });

  const mutation = useMutation({
    mutationFn: (newEmp: any) => createEmployee({ data: newEmp }),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee added successfully");
      setOpen(false);
      setCreatedEmployeeInfo({
        fullName: res.fullName,
        email: res.email,
        phone: res.phone || "",
        invitationId: res.invitationId,
        companyName: res.companyName,
      });
      // Reset form
      setFullName("");
      setEmail("");
      setPhone("");
      setDesignation("");
      setDepartment("");
      setExperience(0);
      setJoiningDate("");
      setSkills("");
      setSendEmail(true);
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to add employee");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteEmployee({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee permanently deleted");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to delete employee");
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "active" | "on_leave" | "exited" }) =>
      updateEmployee({ data: { id, status } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee status updated successfully");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to update status");
    },
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = skills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    mutation.mutate({
      fullName,
      email,
      phone,
      designation,
      department,
      experience: Number(experience),
      joiningDate,
      skills: skillsArray,
      sendEmail,
    });
  };

  const shareOnWhatsApp = (employeeName: string, companyName: string, claimLink: string, phone?: string) => {
    const message = `Hello ${employeeName},

Your WorkCred profile has been created by ${companyName}.

Please claim your profile using the link below:

${claimLink}

After claiming your profile, you can:

* View your work history
* View performance summaries
* Manage verification requests
* Manage consent settings

Regards,
WorkCred Team`;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const baseUrl = isMobile ? "whatsapp://send" : "https://web.whatsapp.com/send";
    const params = new URLSearchParams();
    if (phone) {
      const sanitizedPhone = phone.replace(/[^\d+]/g, "");
      params.append("phone", sanitizedPhone);
    }
    params.append("text", message);

    const finalUrl = `${baseUrl}?${params.toString()}`;
    window.open(finalUrl, "_blank");
  };

  const handleShareWhatsAppInvite = async (employeeId: string) => {
    try {
      const res = await getEmployeeInviteLink({ data: { employeeId } });
      const claimLink = `${window.location.origin}/auth/signup?inviteId=${res.invitationId}`;
      shareOnWhatsApp(res.fullName, res.companyName, claimLink, res.phone);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to share invite");
    }
  };

  const handleCopyInviteLink = async (employeeId: string) => {
    try {
      const res = await getEmployeeInviteLink({ data: { employeeId } });
      const claimLink = `${window.location.origin}/auth/signup?inviteId=${res.invitationId}`;
      await navigator.clipboard.writeText(claimLink);
      toast.success("Invite link copied to clipboard");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to copy invite link");
    }
  };

  const employeesList = data?.data ?? [];
  const total = data?.total ?? 0;
  const pages = data?.totalPages ?? 1;

  return (
    <div>
      <PageHeader
        title="Employees"
        description="Search, manage and verify employees across your organization."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-hero text-primary-foreground shadow-elegant" disabled={!isApproved}>
                <Plus className="mr-1 h-4 w-4" /> Add employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add employee</DialogTitle>
              </DialogHeader>
              <form className="grid grid-cols-2 gap-3" onSubmit={handleCreate}>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input id="fullName" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    type="tel"
                    required 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="e.g. +919876543210"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input id="designation" required value={designation} onChange={(e) => setDesignation(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" required value={department} onChange={(e) => setDepartment(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience (yrs)</Label>
                  <Input id="experience" type="number" required min={0} value={experience} onChange={(e) => setExperience(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joiningDate">Joining date</Label>
                  <Input id="joiningDate" type="date" required value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="skills">Skills (comma separated)</Label>
                  <Input id="skills" placeholder="React, Leadership, SQL" value={skills} onChange={(e) => setSkills(e.target.value)} />
                </div>
                <div className="flex items-center space-x-2 col-span-2 mt-2">
                  <input
                    type="checkbox"
                    id="sendEmail"
                    checked={sendEmail}
                    onChange={(e) => setSendEmail(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                  />
                  <Label htmlFor="sendEmail" className="cursor-pointer text-sm font-medium text-muted-foreground">
                    Send invitation email to employee
                  </Label>
                </div>
                <DialogFooter className="col-span-2 mt-4">
                  <Button type="submit" className="bg-gradient-hero text-primary-foreground shadow-elegant" disabled={mutation.isPending}>
                    {mutation.isPending ? "Adding..." : "Add employee"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <Card className="border-border/60 p-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
          <div className="relative min-w-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => {
                setPage(1);
                setQ(e.target.value);
              }}
              placeholder="Search by name, email, ID, designation…"
              className="pl-9"
              disabled={!isApproved}
            />
          </div>
          <Select
            value={status}
            onValueChange={(v) => {
              setStatus(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-44">
              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="on_leave">On leave</SelectItem>
              <SelectItem value="exited">Exited</SelectItem>
            </SelectContent>
          </Select>
          <div className="hidden text-xs text-muted-foreground sm:flex sm:items-center sm:justify-end">
            {total} results
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-lg border">
          {isLoading ? (
            <TableSkeleton rows={PER_PAGE} columns={5} />
          ) : employeesList.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={Users}
                title="No employees found"
                description="We couldn't find any employee profiles matching your search or filters."
              />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeesList.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          {e.photoUrl && <AvatarImage src={e.photoUrl} alt={e.fullName} />}
                          <AvatarFallback>{e.fullName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 font-medium flex-wrap">
                            {e.fullName}
                            {e.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary" />}
                            <Badge
                              variant="outline"
                              className={
                                e.claimStatus === "claimed"
                                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[9px] px-1.5 py-0 h-4 flex items-center font-normal"
                                  : "border-amber-500/30 bg-amber-500/10 text-amber-400 text-[9px] px-1.5 py-0 h-4 flex items-center font-normal"
                              }
                            >
                              {e.claimStatus === "claimed" ? "Verified Employee" : "Profile Not Claimed"}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {e.employeeId} · {e.designation}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{e.department}</TableCell>
                    <TableCell>{e.experience} yrs</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          e.status === "active"
                            ? "border-success/40 bg-success/10 text-success capitalize"
                            : e.status === "on_leave"
                              ? "border-warning/40 bg-warning/10 text-warning capitalize"
                              : "border-border bg-muted text-muted-foreground capitalize"
                        }
                      >
                        {e.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{e.rating > 0 ? e.rating.toFixed(1) : "N/A"}</span>{" "}
                      {e.rating > 0 && <span className="text-muted-foreground">★</span>}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link to="/app/employees/$id" params={{ id: e.id }}>
                            View
                          </Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {e.claimStatus === "unclaimed" && (
                              <>
                                <DropdownMenuItem
                                  onClick={() => handleCopyInviteLink(e.id)}
                                  className="cursor-pointer text-sky-600 focus:text-sky-600 focus:bg-sky-50 dark:focus:bg-sky-950/20"
                                >
                                  <Copy className="mr-2 h-4 w-4" /> Copy Invite Link
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleShareWhatsAppInvite(e.id)}
                                  className="cursor-pointer text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50 dark:focus:bg-emerald-950/20"
                                >
                                  <WhatsAppIcon className="mr-2 h-4 w-4 fill-emerald-600" /> Share WhatsApp Invite
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                              </>
                            )}
                            {e.status !== "active" && (
                              <DropdownMenuItem
                                onClick={() => updateStatusMutation.mutate({ id: e.id, status: "active" })}
                                className="cursor-pointer"
                              >
                                <Plus className="mr-2 h-4 w-4 text-emerald-500" /> Activate
                              </DropdownMenuItem>
                            )}
                            {e.status !== "on_leave" && (
                              <DropdownMenuItem
                                onClick={() => updateStatusMutation.mutate({ id: e.id, status: "on_leave" })}
                                className="cursor-pointer text-amber-500 focus:text-amber-500"
                              >
                                <Ban className="mr-2 h-4 w-4" /> Suspend
                              </DropdownMenuItem>
                            )}
                            {e.status !== "exited" && (
                              <DropdownMenuItem
                                onClick={() => updateStatusMutation.mutate({ id: e.id, status: "exited" })}
                                className="cursor-pointer text-slate-500 focus:text-slate-500"
                              >
                                <X className="mr-2 h-4 w-4" /> Revoke / Exit
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                if (confirm(`Are you sure you want to permanently delete "${e.fullName}"?`)) {
                                  deleteMutation.mutate(e.id);
                                }
                              }}
                              className="cursor-pointer text-rose-600 font-semibold focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/20"
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Permanent Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {!isLoading && pages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {Array.from({ length: pages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink isActive={page === i + 1} onClick={() => setPage(i + 1)} className="cursor-pointer">
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(pages, p + 1))}
                  className={page === pages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </Card>
      {createdEmployeeInfo && (
        <Dialog
          open={!!createdEmployeeInfo}
          onOpenChange={(isOpen) => {
            if (!isOpen) setCreatedEmployeeInfo(null);
          }}
        >
          <DialogContent className="max-w-md border-border/40 bg-card/80 backdrop-blur-md shadow-elegant rounded-xl">
            <DialogHeader className="space-y-1">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 mb-2">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <DialogTitle className="text-center font-display text-xl font-bold">
                Onboarding Link Generated
              </DialogTitle>
              <p className="text-center text-sm text-muted-foreground">
                Employee profile created for <span className="font-semibold text-foreground">{createdEmployeeInfo.fullName}</span>.
              </p>
            </DialogHeader>

            <div className="space-y-4 my-4">
              <div className="space-y-2">
                <Label htmlFor="claimLink" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Claim URL
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="claimLink"
                    readOnly
                    value={`${window.location.origin}/auth/signup?inviteId=${createdEmployeeInfo.invitationId}`}
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                    className="bg-muted font-mono text-xs select-all"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={async () => {
                      const link = `${window.location.origin}/auth/signup?inviteId=${createdEmployeeInfo.invitationId}`;
                      await navigator.clipboard.writeText(link);
                      toast.success("Claim link copied to clipboard");
                    }}
                    className="shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border bg-muted/30 p-3 text-xs space-y-1 text-muted-foreground">
                <div className="font-semibold text-foreground mb-1">WhatsApp message template:</div>
                <div className="whitespace-pre-line leading-relaxed font-sans border-l-2 border-primary/20 pl-2 bg-muted/10 py-1">
                  {`Hello ${createdEmployeeInfo.fullName},

Your WorkCred profile has been created by ${createdEmployeeInfo.companyName}.

Please claim your profile using the link below:

[Claim Link]

After claiming your profile, you can:
* View your work history
* View performance summaries
* Manage verification requests
* Manage consent settings

Regards,
WorkCred Team`}
                </div>
              </div>
            </div>

            <DialogFooter className="grid grid-cols-2 gap-2 sm:space-x-0">
              <Button
                variant="outline"
                className="w-full"
                onClick={async () => {
                  const link = `${window.location.origin}/auth/signup?inviteId=${createdEmployeeInfo.invitationId}`;
                  await navigator.clipboard.writeText(link);
                  toast.success("Claim link copied to clipboard");
                }}
              >
                <Copy className="mr-2 h-4 w-4" /> Copy Invite Link
              </Button>
              <Button
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white"
                onClick={() => {
                  const link = `${window.location.origin}/auth/signup?inviteId=${createdEmployeeInfo.invitationId}`;
                  shareOnWhatsApp(
                    createdEmployeeInfo.fullName,
                    createdEmployeeInfo.companyName,
                    link,
                    createdEmployeeInfo.phone
                  );
                }}
              >
                <WhatsAppIcon className="mr-2 h-4 w-4 fill-white" /> Share on WhatsApp
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
