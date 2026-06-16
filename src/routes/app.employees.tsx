import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, BadgeCheck, Search, Filter, Users } from "lucide-react";
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
import { listEmployees, createEmployee } from "@/lib/api/employees.functions";
import { TableSkeleton } from "@/components/loading-skeleton";
import { EmptyState } from "@/components/empty-state";

export const Route = createFileRoute("/app/employees")({ component: EmployeesPage });

const PER_PAGE = 8;

function EmployeesPage() {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee added successfully");
      setOpen(false);
      // Reset form
      setFullName("");
      setEmail("");
      setPhone("");
      setDesignation("");
      setDepartment("");
      setExperience(0);
      setJoiningDate("");
      setSkills("");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to add employee");
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
      phone: phone || undefined,
      designation,
      department,
      experience: Number(experience),
      joiningDate,
      skills: skillsArray,
    });
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
              <Button className="bg-gradient-hero text-primary-foreground shadow-elegant">
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
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
                          <div className="flex items-center gap-1.5 font-medium">
                            {e.fullName}
                            {e.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary" />}
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
                      <Button asChild variant="ghost" size="sm">
                        <Link to="/app/employees/$id" params={{ id: e.id }}>
                          View
                        </Link>
                      </Button>
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
    </div>
  );
}
