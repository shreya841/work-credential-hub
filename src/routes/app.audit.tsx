import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Filter } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { auditLogs } from "@/lib/mock";

export const Route = createFileRoute("/app/audit")({ component: Audit });

const typeColor: Record<string, string> = {
  update: "border-warning/40 bg-warning/10 text-warning",
  login: "border-primary/40 bg-primary/10 text-primary",
  access: "border-accent/40 bg-accent/10 text-accent",
  create: "border-success/40 bg-success/10 text-success",
  delete: "border-destructive/40 bg-destructive/10 text-destructive",
};

function Audit() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const rows = auditLogs.filter((a) => {
    const matchQ = !q || [a.user, a.action, a.target].some((s) => s.toLowerCase().includes(q.toLowerCase()));
    const matchT = type === "all" || a.type === type;
    return matchQ && matchT;
  });

  return (
    <div>
      <PageHeader title="Audit Logs" description="Immutable trail of all access, updates, and authentication events." />
      <Card className="border-border/60 p-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by user, action, or target…" />
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-44"><Filter className="mr-2 h-4 w-4 text-muted-foreground" /><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All events</SelectItem>
              <SelectItem value="login">Login</SelectItem>
              <SelectItem value="access">Access</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="create">Create</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4 overflow-hidden rounded-lg border">
          <Table>
            <TableHeader><TableRow><TableHead>Time</TableHead><TableHead>User</TableHead><TableHead>Action</TableHead><TableHead>Target</TableHead><TableHead>Type</TableHead></TableRow></TableHeader>
            <TableBody>
              {rows.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="text-sm text-muted-foreground">{new Date(a.timestamp).toLocaleString()}</TableCell>
                  <TableCell className="font-medium">{a.user}</TableCell>
                  <TableCell>{a.action}</TableCell>
                  <TableCell>{a.target}</TableCell>
                  <TableCell><Badge variant="outline" className={typeColor[a.type]}>{a.type}</Badge></TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && <TableRow><TableCell colSpan={5} className="py-12 text-center text-sm text-muted-foreground">No events match.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
