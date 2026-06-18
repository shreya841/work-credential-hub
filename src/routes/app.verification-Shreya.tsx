import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, BadgeCheck, FileText, CheckCircle2, XCircle, Clock, Eye } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listVerificationRequests, createVerificationRequest } from "@/lib/api/verification.functions";
import { listEmployees } from "@/lib/api/employees.functions";
import { TableSkeleton } from "@/components/loading-skeleton";
import { EmptyState } from "@/components/empty-state";

export const Route = createFileRoute("/app/verification-Shreya")({ component: VerificationPage });

function VerificationPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Form states
  const [employeeId, setEmployeeId] = useState("");
  const [requestType, setRequestType] = useState("Full Background Check");

  // Fetch requests
  const { data: requestData, isLoading: requestsLoading } = useQuery({
    queryKey: ["verification-requests"],
    queryFn: () => listVerificationRequests({ data: { page: 1, pageSize: 50 } }),
  });

  // Fetch employees to select from for requesting verification
  const { data: employeesData } = useQuery({
    queryKey: ["all-employees-for-verify"],
    queryFn: () => listEmployees({ data: { page: 1, pageSize: 100 } }),
  });

  const mutation = useMutation({
    mutationFn: (newRequest: any) => createVerificationRequest({ data: newRequest }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verification-requests"] });
      toast.success("Verification request sent successfully");
      setOpen(false);
      setEmployeeId("");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to send verification request");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId) {
      toast.error("Please select an employee");
      return;
    }
    mutation.mutate({
      employeeId,
      requestType,
    });
  };

  const requests = requestData?.data ?? [];
  const employees = employeesData?.data ?? [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10 flex items-center gap-1 w-fit">
            <CheckCircle2 className="h-3 w-3" /> Approved
          </Badge>
        );
      case "denied":
        return (
          <Badge variant="destructive" className="flex items-center gap-1 w-fit">
            <XCircle className="h-3 w-3" /> Denied
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="border-warning/40 bg-warning/10 text-warning flex items-center gap-1 w-fit">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        );
    }
  };

  return (
    <div>
      <PageHeader
        title="Verification Requests"
        description="Verify candidate credentials and track consent outcomes."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-hero text-primary-foreground shadow-elegant">
                <Plus className="mr-1 h-4 w-4" /> Request verification
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request candidate verification</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="employee">Select Candidate / Employee</Label>
                  <Select value={employeeId} onValueChange={setEmployeeId}>
                    <SelectTrigger id="employee">
                      <SelectValue placeholder="Choose profile..." />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.fullName} ({emp.employeeId})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requestType">Verification Scope</Label>
                  <Select value={requestType} onValueChange={setRequestType}>
                    <SelectTrigger id="requestType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full Background Check">Full Background Check</SelectItem>
                      <SelectItem value="Employment Tenure Verification">Employment Tenure Verification</SelectItem>
                      <SelectItem value="Performance Review Audit">Performance Review Audit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter className="mt-4">
                  <Button type="submit" className="bg-gradient-hero text-primary-foreground shadow-elegant" disabled={mutation.isPending}>
                    {mutation.isPending ? "Sending..." : "Submit request"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <Card className="border-border/60 p-4">
        <div className="overflow-hidden rounded-lg border">
          {requestsLoading ? (
            <TableSkeleton rows={8} columns={5} />
          ) : requests.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={FileText}
                title="No verification requests"
                description="Any verification checks you request for candidates or employees will be shown here."
              />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Scope</TableHead>
                  <TableHead>Requested On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-semibold text-sm">{r.employeeName}</TableCell>
                    <TableCell className="text-sm">{r.requestType}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(r.status)}</TableCell>
                    <TableCell className="text-right">
                      {r.status === "approved" ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(r);
                            setDetailOpen(true);
                          }}
                          className="flex items-center gap-1 text-primary hover:text-primary"
                        >
                          <Eye className="h-4 w-4" /> View report
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm" disabled>
                          No data
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Card>

      {/* Verification Detail Modal */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-xl">
              <BadgeCheck className="h-6 w-6 text-primary" /> Verified Employment Report
            </DialogTitle>
          </DialogHeader>
          {selectedRequest && selectedRequest.responseData && (
            <div className="mt-4 space-y-6">
              {/* Candidate Info */}
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Candidate Name</Label>
                  <p className="text-sm font-semibold">{selectedRequest.responseData.fullName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Current Designation</Label>
                  <p className="text-sm font-semibold">{selectedRequest.responseData.designation}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Department</Label>
                  <p className="text-sm font-semibold">{selectedRequest.responseData.department}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Experience Tenure</Label>
                  <p className="text-sm font-semibold">{selectedRequest.responseData.experience} years</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Joining Date</Label>
                  <p className="text-sm font-semibold">
                    {new Date(selectedRequest.responseData.joiningDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Exit Date</Label>
                  <p className="text-sm font-semibold">
                    {selectedRequest.responseData.exitDate
                      ? new Date(selectedRequest.responseData.exitDate).toLocaleDateString()
                      : "Active / Present"}
                  </p>
                </div>
              </div>

              {/* Verified Performance Rating */}
              <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div>
                  <h4 className="font-semibold text-sm">Verified Overall Rating</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Average score compiled from all internal reviews.</p>
                </div>
                <div className="text-right">
                  <div className="font-display text-3xl font-bold text-primary">
                    {selectedRequest.responseData.rating > 0 ? selectedRequest.responseData.rating.toFixed(1) : "N/A"}{" "}
                    <span className="text-lg">★</span>
                  </div>
                </div>
              </div>

              {/* Review History Logs */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Review Logs ({selectedRequest.responseData.reviewsCount})</h4>
                {selectedRequest.responseData.reviews && selectedRequest.responseData.reviews.length > 0 ? (
                  <div className="space-y-3">
                    {selectedRequest.responseData.reviews.map((rev: any, idx: number) => (
                      <div key={idx} className="border rounded-lg p-3 bg-muted/30">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">{rev.period}</span>
                          <Badge variant="outline">{rev.overall.toFixed(1)} ★</Badge>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground italic">"{rev.feedback}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No detailed reviews shared.</p>
                )}
              </div>
            </div>
          )}
          <DialogFooter className="mt-6 border-t pt-4">
            <Button onClick={() => setDetailOpen(false)}>Close report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
