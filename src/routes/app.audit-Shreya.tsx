import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Filter, ScrollText } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { listAuditLogs } from "@/lib/api/audit.functions";
import { TableSkeleton } from "@/components/loading-skeleton";
import { EmptyState } from "@/components/empty-state";

export const Route = createFileRoute("/app/audit-Shreya")({ component: Audit });

const typeColor: Record<string, string> = {
  update: "border-warning/40 bg-warning/10 text-warning",
  login: "border-primary/40 bg-primary/10 text-primary",
  logout: "border-muted/40 bg-muted/10 text-muted-foreground",
  access: "border-accent/40 bg-accent/10 text-accent",
  create: "border-success/40 bg-success/10 text-success",
  delete: "border-destructive/40 bg-destructive/10 text-destructive",
  verification_request: "border-indigo-500/40 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  consent_change: "border-teal-500/40 bg-teal-500/10 text-teal-600 dark:text-teal-400",
};

const PER_PAGE = 15;

function Audit() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["audit-logs", q, type, page],
    queryFn: () =>
      listAuditLogs({
        data: {
          page,
          pageSize: PER_PAGE,
          type: type === "all" ? undefined : (type as any),
          search: q || undefined,
        },
      }),
  });

  const logs = data?.data ?? [];
  const total = data?.total ?? 0;
  const pages = data?.totalPages ?? 1;

  return (
    <div>
      <PageHeader title="Audit Logs" description="Immutable trail of all access, updates, and authentication events." />
      <Card className="border-border/60 p-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
          <Input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="Search by user, action, or target…"
          />
          <Select
            value={type}
            onValueChange={(v) => {
              setType(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-44">
              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All events</SelectItem>
              <SelectItem value="login">Login</SelectItem>
              <SelectItem value="logout">Logout</SelectItem>
              <SelectItem value="access">Access</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="create">Create</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
              <SelectItem value="verification_request">Verification Request</SelectItem>
              <SelectItem value="consent_change">Consent Change</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 overflow-hidden rounded-lg border">
          {isLoading ? (
            <TableSkeleton rows={PER_PAGE} columns={5} />
          ) : logs.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={ScrollText}
                title="No audit logs found"
                description="We couldn't find any audit event entries matching your search."
              />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(a.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell className="font-medium text-sm">{a.userName}</TableCell>
                    <TableCell className="text-sm">{a.action}</TableCell>
                    <TableCell className="text-xs font-mono text-muted-foreground">
                      {a.targetType ? `${a.targetType}:${a.targetId.substring(0, 8)}` : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${typeColor[a.type] || ""} capitalize text-[10px]`}>
                        {a.type.replace("_", " ")}
                      </Badge>
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
