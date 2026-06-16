import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Award,
  TrendingUp,
  Plus,
  Shield,
  Check,
  X,
  FileText,
  UserCheck,
  ShieldAlert,
  History,
  Globe,
  Trash2,
  Download,
  AlertCircle,
  Eye
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis
} from "recharts";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuth } from "@/components/auth-provider";
import { getEmployeeById, updateEmployee, getEmploymentHistory } from "@/lib/api/employees.functions";
import { listReviews, createReview, getPerformanceBreakdown } from "@/lib/api/performance.functions";
import { listAuditLogs } from "@/lib/api/audit.functions";
import { uploadFile, deleteFile } from "@/lib/api/upload.functions";
import { createVerificationRequest, listVerificationRequests, resolveVerificationRequest } from "@/lib/api/verification.functions";
import { getConsentSettings, updateConsentVisibility, listConsentGrants, grantAccess, revokeAccess, downloadSharedDataHistory } from "@/lib/api/consent.functions";
import { listCompanies } from "@/lib/api/companies.functions";

import { ListSkeleton, ChartSkeleton } from "@/components/loading-skeleton";
import { EmptyState } from "@/components/empty-state";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/app/employees/$id")({
  loader: async ({ params }) => {
    try {
      const employee = await getEmployeeById({ data: { id: params.id } });
      return { employee };
    } catch (err) {
      console.error("Employee loader error:", err);
      throw notFound();
    }
  },
  component: EmployeeDetail,
  notFoundComponent: () => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">Employee not found</h3>
      <p className="text-sm text-muted-foreground mt-1">The requested employee record does not exist or you do not have permission to view it.</p>
      <Button asChild className="mt-6" variant="outline">
        <Link to="/app/employees">Back to employees</Link>
      </Button>
    </div>
  ),
});

function EmployeeDetail() {
  const { employee: initialEmployee } = Route.useLoaderData();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [reviewOpen, setReviewOpen] = useState(false);
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [whitelistOpen, setWhitelistOpen] = useState(false);

  // Review states
  const [productivity, setProductivity] = useState(5);
  const [teamwork, setTeamwork] = useState(5);
  const [communication, setCommunication] = useState(5);
  const [leadership, setLeadership] = useState(5);
  const [attendance, setAttendance] = useState(100);
  const [feedback, setFeedback] = useState("");
  const [period, setPeriod] = useState("Q2 2026");
  const [reviewerName, setReviewerName] = useState(user?.fullName || "");

  // Verification states
  const [verificationType, setVerificationType] = useState("Employment & Performance Verification");

  // Query updated employee data to keep UI synced
  const { data: employeeData = initialEmployee, refetch: refetchEmployee } = useQuery({
    queryKey: ["employee-detail", initialEmployee.id],
    queryFn: () => getEmployeeById({ data: { id: initialEmployee.id } }),
    initialData: initialEmployee,
  });

  const e = employeeData;

  const { data: myReviews = [], isLoading: reviewsLoading, refetch: refetchReviews } = useQuery({
    queryKey: ["employee-reviews", e.id],
    queryFn: () => listReviews({ data: { employeeId: e.id } }),
  });

  const { data: breakdownData } = useQuery({
    queryKey: ["employee-breakdown", e.id],
    queryFn: () => getPerformanceBreakdown({ data: { employeeId: e.id } }),
  });

  const { data: employmentHistory = [] } = useQuery({
    queryKey: ["employee-history", e.email],
    queryFn: () => getEmploymentHistory({ data: { email: e.email } }),
  });

  const { data: consentSettingsData } = useQuery({
    queryKey: ["employee-consent", e.id],
    queryFn: () => getConsentSettings(),
    enabled: user?.id === e.userId,
  });

  const { data: consentGrantsData = [], refetch: refetchGrants } = useQuery({
    queryKey: ["employee-grants", e.id],
    queryFn: () => listConsentGrants(),
    enabled: user?.id === e.userId,
  });

  const { data: allCompanies = [] } = useQuery({
    queryKey: ["companies-list-all"],
    queryFn: () => listCompanies({ data: { pageSize: 100 } }),
    enabled: user?.id === e.userId,
  });

  const { data: auditLogsData } = useQuery({
    queryKey: ["employee-audit-logs", e.id],
    queryFn: () => listAuditLogs({ data: { targetId: e.id, pageSize: 50 } }),
  });

  const { data: verRequests = [], refetch: refetchVerifications } = useQuery({
    queryKey: ["employee-verification-requests", e.id],
    queryFn: () => listVerificationRequests({ data: { pageSize: 50 } }),
  });

  // Filter verification requests specific to this employee
  const employeeVerifications = verRequests.data || [];

  const isHRorAdmin = user && (user.role === "super_admin" || user.role === "company_admin" || user.role === "hr");
  const isCompanyOwner = user && user.companyId === e.companyId;
  const isEmployeeSelf = user && user.id === e.userId;

  const latest = myReviews[0];
  const company = e.company;

  const radarData = latest
    ? [
        { metric: "Productivity", v: latest.productivity },
        { metric: "Teamwork", v: latest.teamwork },
        { metric: "Communication", v: latest.communication },
        { metric: "Attendance", v: (latest.attendance / 100) * 5 },
        { metric: "Leadership", v: latest.leadership },
      ]
    : [];

  const history = myReviews
    .slice()
    .reverse()
    .map((r) => ({ d: r.period, rating: r.overall }));

  // File Upload Handlers
  const uploadMutation = useMutation({
    mutationFn: async ({ file, type }: { file: File; type: "photo" | "resume" }) => {
      return new Promise<{ url: string }>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          try {
            const result = await uploadFile({
              data: {
                fileName: file.name,
                fileType: file.type,
                base64Data: reader.result as string,
              },
            });
            resolve(result);
          } catch (e) {
            reject(e);
          }
        };
        reader.onerror = (error) => reject(error);
      });
    },
    onSuccess: async (data, variables) => {
      const field = variables.type === "photo" ? "photoUrl" : "resumeUrl";
      await updateEmployee({
        data: {
          id: e.id,
          [field]: data.url,
        },
      });
      queryClient.invalidateQueries({ queryKey: ["employee-detail", e.id] });
      toast.success(`${variables.type === "photo" ? "Photo" : "Resume"} uploaded successfully`);
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    },
  });

  const deleteFileMutation = useMutation({
    mutationFn: async ({ type, url }: { type: "photo" | "resume"; url: string }) => {
      await deleteFile({ data: { fileUrl: url } });
      const field = type === "photo" ? "photoUrl" : "resumeUrl";
      await updateEmployee({
        data: {
          id: e.id,
          [field]: null,
        },
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["employee-detail", e.id] });
      toast.success(`${variables.type === "photo" ? "Photo" : "Resume"} deleted successfully`);
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "photo" | "resume") => {
    const file = event.target.files?.[0];
    if (file) {
      uploadMutation.mutate({ file, type });
    }
  };

  // Performance Review Mutation
  const reviewMutation = useMutation({
    mutationFn: (newReview: any) => createReview({ data: newReview }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee-reviews", e.id] });
      queryClient.invalidateQueries({ queryKey: ["employee-detail", e.id] });
      queryClient.invalidateQueries({ queryKey: ["employee-breakdown", e.id] });
      toast.success("Performance review submitted successfully");
      setReviewOpen(false);
      // Reset form
      setFeedback("");
      setPeriod("Q2 2026");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to submit review");
    },
  });

  const handleReviewSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    reviewMutation.mutate({
      employeeId: e.id,
      productivity: Number(productivity),
      teamwork: Number(teamwork),
      communication: Number(communication),
      leadership: Number(leadership),
      attendance: Number(attendance),
      feedback,
      period,
      reviewerName,
    });
  };

  // Verification request mutations
  const verificationMutation = useMutation({
    mutationFn: (req: any) => createVerificationRequest({ data: req }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee-verification-requests", e.id] });
      toast.success("Verification request sent successfully to employee");
      setVerificationOpen(false);
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to send request");
    },
  });

  const handleVerificationSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    verificationMutation.mutate({
      employeeId: e.id,
      requestType: verificationType,
    });
  };

  // Verification request resolution (Approve/Reject)
  const resolveVerificationMutation = useMutation({
    mutationFn: ({ requestId, status }: { requestId: string; status: "approved" | "denied" }) =>
      resolveVerificationRequest({ data: { id: requestId, status } }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["employee-verification-requests", e.id] });
      queryClient.invalidateQueries({ queryKey: ["employee-detail", e.id] });
      toast.success(`Verification request ${variables.status} successfully`);
      refetchEmployee();
      refetchReviews();
      refetchVerifications();
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Resolution failed");
    },
  });

  // Verify employee history button
  const verifyEmployeeMutation = useMutation({
    mutationFn: () => updateEmployee({ data: { id: e.id, verified: true } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee-detail", e.id] });
      toast.success("Employee history verified successfully");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to verify employee");
    },
  });

  // Consent mutations
  const visibilityMutation = useMutation({
    mutationFn: (visible: boolean) => updateConsentVisibility({ data: { publicVisible: visible } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee-consent", e.id] });
      toast.success("Visibility setting updated");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to update visibility");
    },
  });

  const whitelistMutation = useMutation({
    mutationFn: ({ companyId, grant }: { companyId: string; grant: boolean }) => {
      if (grant) {
        return grantAccess({ data: { companyId } });
      } else {
        return revokeAccess({ data: { companyId } });
      }
    },
    onSuccess: () => {
      refetchGrants();
      toast.success("Company access settings updated");
      setWhitelistOpen(false);
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to update company access");
    },
  });

  const downloadHistory = async () => {
    try {
      const dataStr = await downloadSharedDataHistory();
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `shared-data-history-${e.fullName.toLowerCase().replace(/\s+/g, '-')}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      toast.success("History downloaded successfully");
    } catch (e) {
      toast.error("Download failed");
    }
  };

  const joiningDateFormatted = new Date(e.joiningDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const exitDateFormatted = e.exitDate
    ? new Date(e.exitDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Present";

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link to="/app/employees">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to employees
          </Link>
        </Button>

        <div className="flex gap-2">
          {/* Company verifies history */}
          {isHRorAdmin && isCompanyOwner && !e.verified && (
            <Button
              className="bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30"
              variant="outline"
              size="sm"
              onClick={() => verifyEmployeeMutation.mutate()}
              disabled={verifyEmployeeMutation.isPending}
            >
              <UserCheck className="mr-1.5 h-4 w-4" /> Verify employment history
            </Button>
          )}

          {/* Send Verification Request button */}
          {isHRorAdmin && !isCompanyOwner && (
            <Button
              className="bg-gradient-hero text-primary-foreground shadow-elegant"
              size="sm"
              onClick={() => setVerificationOpen(true)}
            >
              <Shield className="mr-1.5 h-4 w-4" /> Request Verification
            </Button>
          )}

          {/* Add Review button */}
          {isHRorAdmin && isCompanyOwner && (
            <Button
              className="bg-gradient-hero text-primary-foreground shadow-elegant"
              size="sm"
              onClick={() => setReviewOpen(true)}
            >
              <Plus className="mr-1.5 h-4 w-4" /> Add Review
            </Button>
          )}
        </div>
      </div>

      <Card className="overflow-hidden border-border/60 bg-gradient-card">
        <div className="h-24 bg-gradient-hero" />
        <CardContent className="-mt-12 p-6">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-4">
            <Avatar className="h-24 w-24 shrink-0 border-4 border-background shadow-elegant">
              {e.photoUrl && <AvatarImage src={e.photoUrl} alt={e.fullName} />}
              <AvatarFallback>{e.fullName[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 self-end">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-2xl font-bold">{e.fullName}</h2>
                {e.verified ? (
                  <Badge className="bg-primary/15 text-primary hover:bg-primary/15 border border-primary/20">
                    <BadgeCheck className="mr-1 h-3.5 w-3.5" /> Verified Profile
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-amber-500 border-amber-500/20 bg-amber-500/5">
                    <ShieldAlert className="mr-1 h-3.5 w-3.5" /> Pending Verification
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {e.designation} · {e.department} · {company?.name ?? "No Company"}
              </p>
            </div>
            <div className="self-end">
              <Button asChild variant="outline" size="sm">
                <Link to="/profile/$id" params={{ id: e.id }}>
                  <Eye className="mr-1.5 h-4 w-4" /> View Public Profile
                </Link>
              </Button>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Info icon={Mail} label="Email" value={e.email} />
            <Info icon={Phone} label="Phone" value={e.phone || "N/A"} />
            <Info icon={Briefcase} label="Experience" value={`${e.experience} years`} />
            <Info icon={Calendar} label="Tenure" value={`${joiningDateFormatted} - ${exitDateFormatted}`} />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="performance" className="mt-6">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="reviews">Review history</TabsTrigger>
          <TabsTrigger value="profile">Profile Details</TabsTrigger>
          <TabsTrigger value="employment">Employment history</TabsTrigger>
          <TabsTrigger value="verification">Verification requests</TabsTrigger>
          <TabsTrigger value="audit">Audit history</TabsTrigger>
        </TabsList>

        {/* PERFORMANCE TAB */}
        <TabsContent value="performance" className="mt-4 space-y-5">
          {reviewsLoading ? (
            <div className="grid gap-5 lg:grid-cols-2">
              <ChartSkeleton />
              <ChartSkeleton />
            </div>
          ) : myReviews.length === 0 ? (
            <div className="py-6">
              <EmptyState
                icon={TrendingUp}
                title="No reviews submitted yet"
                description="This employee has not received any performance reviews."
              />
            </div>
          ) : (
            <>
              <div className="grid gap-5 lg:grid-cols-2">
                <Card className="border-border/60">
                  <CardHeader>
                    <CardTitle>Latest rating breakdown</CardTitle>
                    <CardDescription>Visual breakdown of core competency ratings</CardDescription>
                  </CardHeader>
                  <CardContent className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="var(--color-border)" />
                        <PolarAngleAxis dataKey="metric" tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} />
                        <PolarRadiusAxis domain={[0, 5]} tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} />
                        <Radar dataKey="v" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.35} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card className="border-border/60">
                  <CardHeader>
                    <CardTitle>Overall rating history</CardTitle>
                    <CardDescription>Timeline of reviews overall score averages</CardDescription>
                  </CardHeader>
                  <CardContent className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={history} margin={{ left: -20, right: 12 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={12} />
                        <YAxis domain={[0, 5]} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                        <Bar dataKey="rating" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Aggregated ratings */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <Card className="border-border/60 bg-gradient-card">
                  <CardContent className="p-4">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Productivity</div>
                    <div className="mt-1 font-display text-2xl font-bold">
                      {latest.productivity.toFixed(1)} <span className="text-sm text-muted-foreground">/5</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/60 bg-gradient-card">
                  <CardContent className="p-4">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Teamwork</div>
                    <div className="mt-1 font-display text-2xl font-bold">
                      {latest.teamwork.toFixed(1)} <span className="text-sm text-muted-foreground">/5</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/60 bg-gradient-card">
                  <CardContent className="p-4">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Communication</div>
                    <div className="mt-1 font-display text-2xl font-bold">
                      {latest.communication.toFixed(1)} <span className="text-sm text-muted-foreground">/5</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/60 bg-gradient-card">
                  <CardContent className="p-4">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Leadership</div>
                    <div className="mt-1 font-display text-2xl font-bold">
                      {latest.leadership.toFixed(1)} <span className="text-sm text-muted-foreground">/5</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/60 bg-gradient-card">
                  <CardContent className="p-4">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Attendance</div>
                    <div className="mt-1 font-display text-2xl font-bold">
                      {latest.attendance.toFixed(0)} <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Benchmarks */}
              {breakdownData && (
                <div className="grid gap-5 lg:grid-cols-2">
                  <Card className="border-border/60">
                    <CardHeader>
                      <CardTitle>Organization Benchmarks</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Employee Average Rating</span>
                          <span className="font-semibold">{breakdownData.employeeAvgRating ? breakdownData.employeeAvgRating.toFixed(2) : "0.00"} ★</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: `${((breakdownData.employeeAvgRating || 0) / 5) * 100}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Department Average ({e.department})</span>
                          <span className="font-semibold">{breakdownData.departmentAvgRating ? breakdownData.departmentAvgRating.toFixed(2) : "0.00"} ★</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${((breakdownData.departmentAvgRating || 0) / 5) * 100}%` }} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-border/60 bg-muted/30">
                    <CardHeader>
                      <CardTitle>Latest Reviewer Feedback</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground text-sm">
                        "{latest.feedback}"
                      </blockquote>
                      <p className="text-xs text-right mt-3 text-muted-foreground font-medium">
                        — Reviewed by {latest.reviewerName} for {latest.period}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </>
          )}
        </TabsContent>

        {/* REVIEW HISTORY TAB */}
        <TabsContent value="reviews" className="mt-4">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Performance Review History</CardTitle>
              <CardDescription>Comprehensive audit record of employee performance evaluations</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {reviewsLoading ? (
                <ListSkeleton count={3} />
              ) : myReviews.length === 0 ? (
                <EmptyState
                  icon={TrendingUp}
                  title="No review history"
                  description="Performance review history will appear here once reviews are submitted."
                />
              ) : (
                <div className="relative space-y-6 border-l border-border/60 pl-6">
                  {myReviews.map((r) => (
                    <div key={r.id} className="relative">
                      <div className="absolute -left-[27px] top-1 grid h-4 w-4 place-items-center rounded-full bg-gradient-hero shadow-elegant" />
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold">{new Date(r.createdAt).toLocaleDateString()}</span>
                        <Badge variant="outline">{r.overall.toFixed(2)} ★</Badge>
                        <span className="text-xs text-muted-foreground">Period: {r.period}</span>
                        <span className="text-xs text-muted-foreground">by {r.reviewerName}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{r.feedback}</p>
                      <div className="mt-2 grid grid-cols-5 gap-2 text-xs bg-muted/30 p-2 rounded-md border max-w-xl">
                        <div>Productivity: <span className="font-semibold">{r.productivity}</span></div>
                        <div>Teamwork: <span className="font-semibold">{r.teamwork}</span></div>
                        <div>Comm: <span className="font-semibold">{r.communication}</span></div>
                        <div>Leadership: <span className="font-semibold">{r.leadership}</span></div>
                        <div>Attendance: <span className="font-semibold">{r.attendance}%</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* PROFILE DETAILS TAB */}
        <TabsContent value="profile" className="mt-4 grid gap-5 lg:grid-cols-2">
          {/* Basic Info and Skills */}
          <div className="space-y-5">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle>Skills & Competencies</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {e.skills.length === 0 ? (
                  <span className="text-sm text-muted-foreground">No skills listed.</span>
                ) : (
                  e.skills.map((s: string) => (
                    <Badge key={s} variant="outline">
                      {s}
                    </Badge>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle>Current Company Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {company ? (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground block text-xs">Company Name</span>
                      <span className="font-medium">{company.name}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-xs">Industry</span>
                      <span className="font-medium">{company.industry}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-xs">Location</span>
                      <span className="font-medium">{company.location || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-xs">Website</span>
                      <a href={company.website || "#"} target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">
                        {company.website || "N/A"}
                      </a>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-xs">Verification Lifecycle</span>
                      <Badge className="capitalize mt-1">
                        {company.status}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">Not currently assigned to a company.</div>
                )}
              </CardContent>
            </Card>

            {/* Consent status section for the user themselves */}
            {isEmployeeSelf && consentSettingsData && (
              <Card className="border-border/60">
                <CardHeader>
                  <CardTitle>Profile Visibility & Consent settings</CardTitle>
                  <CardDescription>Control who has access to your credentials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <span className="font-medium text-sm block">Public Profile Visibility</span>
                      <span className="text-xs text-muted-foreground">Allow anyone to find your profile in public searches</span>
                    </div>
                    <Switch
                      checked={consentSettingsData.publicVisible}
                      onCheckedChange={(checked) => visibilityMutation.mutate(checked)}
                      disabled={visibilityMutation.isPending}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-sm">Explicit Company Whitelist</span>
                      <Button size="xs" variant="outline" onClick={() => setWhitelistOpen(true)}>
                        <Plus className="h-3 w-3 mr-1" /> Configure Whitelist
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {consentGrantsData.filter((g: any) => g.granted).length === 0 ? (
                        <div className="text-xs text-muted-foreground">No specific companies whitelisted.</div>
                      ) : (
                        consentGrantsData.filter((g: any) => g.granted).map((g: any) => (
                          <div key={g.companyId} className="flex justify-between items-center text-xs bg-muted p-2 rounded-md">
                            <span>{g.companyName}</span>
                            <Button
                              size="xs"
                              variant="ghost"
                              className="text-destructive hover:text-destructive/80 h-6 px-2"
                              onClick={() => whitelistMutation.mutate({ companyId: g.companyId, grant: false })}
                            >
                              Revoke Access
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <Button size="sm" variant="outline" className="w-full" onClick={downloadHistory}>
                      <Download className="h-4 w-4 mr-2" /> Download shared data history
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Uploaded Documents */}
          <div className="space-y-5">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle>Uploaded Documents</CardTitle>
                <CardDescription>Profile images and verified PDF resumes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 text-sm">
                {/* Image Upload */}
                <div className="border-b pb-4 space-y-2">
                  <span className="font-semibold text-muted-foreground block text-xs">Profile Picture</span>
                  {e.photoUrl ? (
                    <div className="flex items-center justify-between bg-muted p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border shadow-sm">
                          <AvatarImage src={e.photoUrl} />
                          <AvatarFallback>{e.fullName[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium truncate max-w-[150px]">profile_photo.jpg</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="xs" variant="outline" asChild>
                          <a href={e.photoUrl} target="_blank" rel="noreferrer">View</a>
                        </Button>
                        {(isHRorAdmin && isCompanyOwner) && (
                          <Button
                            size="xs"
                            variant="ghost"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => deleteFileMutation.mutate({ type: "photo", url: e.photoUrl! })}
                            disabled={deleteFileMutation.isPending}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-muted/50 p-4 rounded-lg border border-dashed flex flex-col items-center justify-center text-center">
                      <Globe className="h-6 w-6 text-muted-foreground mb-2" />
                      <span className="text-xs text-muted-foreground">No profile photo uploaded.</span>
                      {(isHRorAdmin && isCompanyOwner) && (
                        <div className="mt-2">
                          <label className="cursor-pointer bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-md hover:bg-primary/95 transition font-medium">
                            Upload Photo
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(event) => handleFileUpload(event, "photo")}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Resume Upload */}
                <div className="space-y-2">
                  <span className="font-semibold text-muted-foreground block text-xs">Verified Resume (PDF)</span>
                  {e.resumeUrl ? (
                    <div className="flex items-center justify-between bg-muted p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div className="min-w-0">
                          <span className="text-xs font-medium block truncate max-w-[150px]">employee_resume.pdf</span>
                          <span className="text-[10px] text-muted-foreground">Verified Document</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="xs" variant="outline" asChild>
                          <a href={e.resumeUrl} target="_blank" rel="noreferrer">Preview PDF</a>
                        </Button>
                        {(isHRorAdmin && isCompanyOwner) && (
                          <Button
                            size="xs"
                            variant="ghost"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => deleteFileMutation.mutate({ type: "resume", url: e.resumeUrl! })}
                            disabled={deleteFileMutation.isPending}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-muted/50 p-4 rounded-lg border border-dashed flex flex-col items-center justify-center text-center">
                      <FileText className="h-6 w-6 text-muted-foreground mb-2" />
                      <span className="text-xs text-muted-foreground">No resume document uploaded.</span>
                      {(isHRorAdmin && isCompanyOwner) && (
                        <div className="mt-2">
                          <label className="cursor-pointer bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-md hover:bg-primary/95 transition font-medium">
                            Upload Resume
                            <input
                              type="file"
                              accept=".pdf"
                              className="hidden"
                              onChange={(event) => handleFileUpload(event, "resume")}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* EMPLOYMENT HISTORY TAB */}
        <TabsContent value="employment" className="mt-4">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Employment History Trail</CardTitle>
              <CardDescription>Verified list of other employment records for this employee</CardDescription>
            </CardHeader>
            <CardContent>
              {employmentHistory.length === 0 ? (
                <EmptyState
                  icon={Briefcase}
                  title="No other history"
                  description="No other employment records exist for this email address."
                />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company Name</TableHead>
                      <TableHead>Designation</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Tenure</TableHead>
                      <TableHead>Verification</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employmentHistory.map((h: any) => (
                      <TableRow key={h.id} className={h.id === e.id ? "bg-muted/50 font-medium" : ""}>
                        <TableCell>
                          {h.companyName} {h.id === e.id && <Badge size="xs" className="ml-1.5 bg-primary/20 text-primary border border-primary/20">Current</Badge>}
                        </TableCell>
                        <TableCell>{h.designation}</TableCell>
                        <TableCell>{h.department}</TableCell>
                        <TableCell>
                          {new Date(h.joiningDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })} - {h.exitDate ? new Date(h.exitDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : "Present"}
                        </TableCell>
                        <TableCell>
                          {h.verified ? (
                            <Badge className="bg-primary/10 text-primary border border-primary/20"><BadgeCheck className="h-3 w-3 mr-1" /> Verified</Badge>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground">Unverified</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* VERIFICATION FLOW TAB */}
        <TabsContent value="verification" className="mt-4">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Verification Request Flow</CardTitle>
              <CardDescription>Verification request history, pending responses, and security validations</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Employee self-verification panel */}
              {isEmployeeSelf && employeeVerifications.filter((r: any) => r.status === "pending").length > 0 && (
                <div className="mb-6 bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg space-y-3">
                  <div className="flex items-center gap-2 text-amber-500 font-semibold text-sm">
                    <AlertCircle className="h-4 w-4" />
                    Pending Verification Requests Need Your Response
                  </div>
                  <div className="space-y-3">
                    {employeeVerifications.filter((r: any) => r.status === "pending").map((r: any) => (
                      <div key={r.id} className="flex justify-between items-center text-xs bg-background p-3 rounded border">
                        <div>
                          <strong>{r.requestedByCompany}</strong> requests verification: <em>{r.requestType}</em>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="xs"
                            onClick={() => resolveVerificationMutation.mutate({ requestId: r.id, status: "approved" })}
                            disabled={resolveVerificationMutation.isPending}
                          >
                            Approve & Grant Profile Access
                          </Button>
                          <Button
                            size="xs"
                            variant="outline"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => resolveVerificationMutation.mutate({ requestId: r.id, status: "denied" })}
                            disabled={resolveVerificationMutation.isPending}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {employeeVerifications.length === 0 ? (
                <EmptyState
                  icon={Shield}
                  title="No verification requests"
                  description="No verification requests have been logged yet for this employee."
                />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Requested By</TableHead>
                      <TableHead>Request Type</TableHead>
                      <TableHead>Requested Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Resolved Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeeVerifications.map((r: any) => (
                      <TableRow key={r.id}>
                        <TableCell>
                          <span className="block font-medium">{r.requestedByCompany}</span>
                          <span className="text-[10px] text-muted-foreground">by {r.requestedByName}</span>
                        </TableCell>
                        <TableCell>{r.requestType}</TableCell>
                        <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            className="capitalize"
                            variant={
                              r.status === "approved"
                                ? "default"
                                : r.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {r.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {r.resolvedAt ? new Date(r.resolvedAt).toLocaleString() : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* AUDIT LOG TAB */}
        <TabsContent value="audit" className="mt-4">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Employee Profile Audit Log History</CardTitle>
              <CardDescription>A chronological history of edits, access validations, and visibility changes</CardDescription>
            </CardHeader>
            <CardContent>
              {!auditLogsData || auditLogsData.data.length === 0 ? (
                <EmptyState
                  icon={History}
                  title="No audit trails"
                  description="No audit logs have been recorded for this employee profile yet."
                />
              ) : (
                <div className="relative space-y-4 border-l pl-4">
                  {auditLogsData.data.map((log: any) => (
                    <div key={log.id} className="text-xs">
                      <div className="flex justify-between items-center text-muted-foreground mb-1">
                        <span>{new Date(log.timestamp).toLocaleString()}</span>
                        <Badge variant="outline">{log.type}</Badge>
                      </div>
                      <p className="font-semibold text-foreground">{log.action}</p>
                      <span className="text-muted-foreground text-[10px]">by {log.userName} (IP: {log.ipAddress || "Internal"})</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* DIALOG: Add Review */}
      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Add Performance Review</DialogTitle>
            <DialogDescription>Submit quarterly or annual performance review details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reviewer">Reviewer Name</Label>
                <Input id="reviewer" required value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="period">Review Period</Label>
                <Input id="period" required placeholder="Q2 2026" value={period} onChange={(e) => setPeriod(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="prod">Productivity (1-5)</Label>
                <Select value={String(productivity)} onValueChange={(v) => setProductivity(Number(v))}>
                  <SelectTrigger id="prod"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="team">Teamwork (1-5)</Label>
                <Select value={String(teamwork)} onValueChange={(v) => setTeamwork(Number(v))}>
                  <SelectTrigger id="team"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="comm">Communication (1-5)</Label>
                <Select value={String(communication)} onValueChange={(v) => setCommunication(Number(v))}>
                  <SelectTrigger id="comm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lead">Leadership (1-5)</Label>
                <Select value={String(leadership)} onValueChange={(v) => setLeadership(Number(v))}>
                  <SelectTrigger id="lead"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="attendance">Attendance Score (0-100)</Label>
              <Input
                id="attendance"
                type="number"
                min={0}
                max={100}
                required
                value={attendance}
                onChange={(e) => setAttendance(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback">Written Feedback</Label>
              <Textarea
                id="feedback"
                required
                placeholder="Describe details regarding core accomplishments, attendance records, teamwork skills..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={reviewMutation.isPending} className="bg-gradient-hero text-primary-foreground shadow-elegant w-full">
                {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* DIALOG: Send Verification Request */}
      <Dialog open={verificationOpen} onOpenChange={setVerificationOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request Credential Verification</DialogTitle>
            <DialogDescription>
              Submit a formal request to employee "{e.fullName}". They will be notified and can approve to grant you profile access.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleVerificationSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vtype">Verification Scope</Label>
              <Select value={verificationType} onValueChange={setVerificationType}>
                <SelectTrigger id="vtype"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Employment & Performance Verification">Employment & Performance Verification</SelectItem>
                  <SelectItem value="Full History & Background Check">Full History & Background Check</SelectItem>
                  <SelectItem value="Skills & Department Benchmark Validation">Skills & Department Benchmark Validation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={verificationMutation.isPending} className="bg-gradient-hero text-primary-foreground w-full">
                {verificationMutation.isPending ? "Sending Request..." : "Send Verification Request"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* DIALOG: Whitelist Company Selection */}
      <Dialog open={whitelistOpen} onOpenChange={setWhitelistOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Whitelist Company Access</DialogTitle>
            <DialogDescription>Allow a specific company to view your credentials and performance timeline</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {allCompanies.data?.length === 0 ? (
                <div className="text-xs text-muted-foreground text-center py-4">No companies found.</div>
              ) : (
                allCompanies.data?.map((comp: any) => {
                  const grant = consentGrantsData.find((g: any) => g.companyId === comp.id);
                  const isGranted = grant?.granted || false;
                  return (
                    <div key={comp.id} className="flex justify-between items-center p-2 hover:bg-muted rounded text-xs">
                      <div>
                        <span className="font-semibold block">{comp.name}</span>
                        <span className="text-muted-foreground text-[10px]">{comp.industry} · {comp.location || "Online"}</span>
                      </div>
                      <Button
                        size="xs"
                        variant={isGranted ? "outline" : "default"}
                        onClick={() => whitelistMutation.mutate({ companyId: comp.id, grant: !isGranted })}
                      >
                        {isGranted ? "Revoke Access" : "Grant Access"}
                      </Button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/40 p-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}
