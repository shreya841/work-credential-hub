import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, BadgeCheck, Search, Filter } from "lucide-react";
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
import { employees } from "@/lib/mock";

export const Route = createFileRoute("/app/employees")({ component: EmployeesPage });

const PER_PAGE = 8;

function EmployeesPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => employees.filter((e) => {
    const matchQ = !q || [e.fullName, e.email, e.employeeId, e.designation].some((s) => s.toLowerCase().includes(q.toLowerCase()));
    const matchS = status === "all" || e.status === status;
    return matchQ && matchS;
  }), [q, status]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const view = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div>
      <PageHeader
        title="Employees"
        description="Search, manage and verify employees across your organization."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button className="bg-gradient-hero text-primary-foreground"><Plus className="mr-1 h-4 w-4" /> Add employee</Button></DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader><DialogTitle>Add employee</DialogTitle></DialogHeader>
              <form className="grid grid-cols-2 gap-3" onSubmit={(e) => { e.preventDefault(); setOpen(false); toast.success("Employee added"); }}>
                <div className="space-y-2 col-span-2"><Label>Full name</Label><Input required /></div>
                <div className="space-y-2"><Label>Employee ID</Label><Input required /></div>
                <div className="space-y-2"><Label>Email</Label><Input type="email" required /></div>
                <div className="space-y-2"><Label>Phone</Label><Input /></div>
                <div className="space-y-2"><Label>Designation</Label><Input /></div>
                <div className="space-y-2"><Label>Department</Label><Input /></div>
                <div className="space-y-2"><Label>Experience (yrs)</Label><Input type="number" /></div>
                <div className="space-y-2"><Label>Joining date</Label><Input type="date" /></div>
                <div className="space-y-2"><Label>Exit date</Label><Input type="date" /></div>
                <div className="space-y-2 col-span-2"><Label>Skills (comma separated)</Label><Input placeholder="React, Leadership, SQL" /></div>
                <DialogFooter className="col-span-2"><Button type="submit" className="bg-gradient-hero text-primary-foreground">Add employee</Button></DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <Card className="border-border/60 p-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
          <div className="relative min-w-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => { setPage(1); setQ(e.target.value); }} placeholder="Search by name, email, ID, role…" className="pl-9" />
          </div>
          <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-44"><Filter className="mr-2 h-4 w-4 text-muted-foreground" /><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="on_leave">On leave</SelectItem>
              <SelectItem value="exited">Exited</SelectItem>
            </SelectContent>
          </Select>
          <div className="hidden text-xs text-muted-foreground sm:flex sm:items-center sm:justify-end">{filtered.length} results</div>
        </div>

        <div className="mt-4 overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow><TableHead>Employee</TableHead><TableHead>Department</TableHead><TableHead>Experience</TableHead><TableHead>Status</TableHead><TableHead>Rating</TableHead><TableHead /></TableRow>
            </TableHeader>
            <TableBody>
              {view.map((e) => (
                <TableRow key={e.id} className="cursor-pointer">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9"><AvatarImage src={e.photo} /><AvatarFallback>{e.fullName[0]}</AvatarFallback></Avatar>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 font-medium">{e.fullName}{e.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary" />}</div>
                        <div className="text-xs text-muted-foreground">{e.employeeId} · {e.designation}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{e.department}</TableCell>
                  <TableCell>{e.experience} yrs</TableCell>
                  <TableCell><Badge variant="outline" className={
                    e.status === "active" ? "border-success/40 bg-success/10 text-success" :
                    e.status === "on_leave" ? "border-warning/40 bg-warning/10 text-warning" :
                    "border-border bg-muted text-muted-foreground"
                  }>{e.status.replace("_", " ")}</Badge></TableCell>
                  <TableCell><span className="font-medium">{e.rating.toFixed(1)}</span> <span className="text-muted-foreground">★</span></TableCell>
                  <TableCell className="text-right"><Button asChild variant="ghost" size="sm"><Link to="/app/employees/$id" params={{ id: e.id }}>View</Link></Button></TableCell>
                </TableRow>
              ))}
              {view.length === 0 && (
                <TableRow><TableCell colSpan={6} className="py-12 text-center text-sm text-muted-foreground">No employees found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {pages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem><PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} /></PaginationItem>
              {Array.from({ length: pages }).map((_, i) => (
                <PaginationItem key={i}><PaginationLink isActive={page === i + 1} onClick={() => setPage(i + 1)}>{i + 1}</PaginationLink></PaginationItem>
              ))}
              <PaginationItem><PaginationNext onClick={() => setPage((p) => Math.min(pages, p + 1))} /></PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </Card>
    </div>
  );
}
