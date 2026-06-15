import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, BadgeCheck, MapPin, Globe, Users } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { companies } from "@/lib/mock";

export const Route = createFileRoute("/app/companies")({ component: Companies });

function Companies() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <PageHeader
        title="Companies"
        description="Manage partner companies and their verification status."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button className="bg-gradient-hero text-primary-foreground"><Plus className="mr-1 h-4 w-4" /> Add company</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add company</DialogTitle></DialogHeader>
              <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setOpen(false); toast.success("Company added"); }}>
                <div className="space-y-2"><Label>Name</Label><Input required /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2"><Label>Industry</Label><Input required /></div>
                  <div className="space-y-2"><Label>Size</Label><Input placeholder="100-200" /></div>
                </div>
                <div className="space-y-2"><Label>Location</Label><Input /></div>
                <div className="space-y-2"><Label>Website</Label><Input type="url" /></div>
                <DialogFooter><Button type="submit" className="bg-gradient-hero text-primary-foreground">Add company</Button></DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((c) => (
          <Card key={c.id} className="group border-border/60 bg-gradient-card transition hover:-translate-y-0.5 hover:shadow-elegant">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-hero font-display text-lg font-bold text-primary-foreground shadow-elegant">{c.logo}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="truncate font-display text-lg font-semibold">{c.name}</h3>
                    {c.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{c.industry}</p>
                </div>
              </div>
              <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{c.location}</div>
                <div className="flex items-center gap-2"><Globe className="h-3.5 w-3.5" />{c.website}</div>
                <div className="flex items-center gap-2"><Users className="h-3.5 w-3.5" />{c.employees.toLocaleString()} employees</div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                <Badge variant={c.verified ? "default" : "outline"} className={c.verified ? "bg-success/15 text-success hover:bg-success/15" : ""}>
                  {c.verified ? "Verified" : "Pending"}
                </Badge>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
