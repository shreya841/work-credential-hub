import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, BadgeCheck, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { searchEmployees } from "@/lib/api/search.functions";
import { ListSkeleton } from "@/components/loading-skeleton";
import { EmptyState } from "@/components/empty-state";

export const Route = createFileRoute("/app/search")({ component: HrSearch });

function HrSearch() {
  const [q, setQ] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(q);
    }, 350);
    return () => clearTimeout(handler);
  }, [q]);

  const { data: results = [], isLoading } = useQuery({
    queryKey: ["search-employees", debouncedQuery],
    queryFn: () => searchEmployees({ data: { query: debouncedQuery } }),
    enabled: debouncedQuery.trim().length > 0,
  });

  const hasQuery = q.trim().length > 0;
  const hasDebouncedQuery = debouncedQuery.trim().length > 0;

  return (
    <div>
      <PageHeader title="HR Search" description="Verify a candidate by name, email, employee ID or skills." />
      <Card className="border-border/60 bg-gradient-card">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, email, employee ID, or skills…"
              className="h-14 pl-12 text-base"
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Searches are logged in the audit trail and only return profiles with active consent.
          </p>
        </CardContent>
      </Card>

      <div className="mt-6 space-y-3">
        {!hasQuery && (
          <Card className="border-dashed border-border/60">
            <CardContent className="grid place-items-center py-16 text-sm text-muted-foreground">
              Start typing to search verified employee candidates.
            </CardContent>
          </Card>
        )}

        {hasQuery && !hasDebouncedQuery && (
          <div className="space-y-3">
            <ListSkeleton count={3} />
          </div>
        )}

        {hasDebouncedQuery && isLoading && (
          <div className="space-y-3">
            <ListSkeleton count={3} />
          </div>
        )}

        {hasDebouncedQuery && !isLoading && results.length === 0 && (
          <EmptyState
            icon={Users}
            title="No matches found"
            description={`We couldn't find any verified employees matching "${debouncedQuery}" with consent granted to your company.`}
          />
        )}

        {hasDebouncedQuery &&
          !isLoading &&
          results.map((e) => (
            <Card key={e.id} className="border-border/60 transition hover:shadow-elegant">
              <CardContent className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-4">
                <Avatar className="h-12 w-12">
                  {e.photoUrl && <AvatarImage src={e.photoUrl} alt={e.fullName} />}
                  <AvatarFallback>{e.fullName[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate font-semibold">{e.fullName}</span>
                    {e.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary shrink-0" />}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {e.employeeId} · {e.designation} · {e.email}
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {e.skills.map((s) => (
                      <Badge key={s} variant="outline" className="text-[10px]">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <div className="text-sm">
                    <span className="font-semibold">{e.rating > 0 ? e.rating.toFixed(1) : "N/A"}</span>{" "}
                    {e.rating > 0 && <span className="text-muted-foreground">★</span>}
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/profile/$id" params={{ id: e.id }}>
                      View profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
