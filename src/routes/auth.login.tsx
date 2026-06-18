import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/lib/api/auth.functions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser({
        data: {
          email,
          password,
        },
      });
      toast.success(`Welcome back, ${response.user.fullName}!`);
      navigate({ to: "/app/dashboard" });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Invalid email or password");
      toast.error("Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1.5">
        <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
          Welcome Back
        </h1>
        <p className="text-xs text-slate-500 dark:text-white/50 transition-colors duration-300">
          Sign in to your WorkCred workspace to manage trust.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-800 dark:text-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-semibold text-slate-700 dark:text-white/70">
            Work Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-white/40" />
            <Input
              id="email"
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="pl-10 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:border-[#00C2FF] dark:focus:border-[#00C2FF]/50 focus:ring-1 focus:ring-[#00C2FF] dark:focus:ring-[#00C2FF]/50 h-10.5 rounded-xl transition-all"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-xs font-semibold text-slate-700 dark:text-white/70">
              Password
            </Label>
            <Link 
              to="/auth/forgot" 
              className="text-xs text-sky-600 dark:text-[#00C2FF] hover:text-emerald-500 dark:hover:text-[#00E5A8] transition-colors"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-white/40" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="pl-10 pr-10 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:border-[#00C2FF] dark:focus:border-[#00C2FF]/50 focus:ring-1 focus:ring-[#00C2FF] dark:focus:ring-[#00C2FF]/50 h-10.5 rounded-xl transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white/70 transition-colors p-1"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Keep Me Logged In */}
        <div className="flex items-center justify-between py-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-4.5 h-4.5 rounded border border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-white/5 flex items-center justify-center peer-checked:bg-[#00C2FF] peer-checked:border-[#00C2FF] transition-all">
              {rememberMe && (
                <svg className="w-3.5 h-3.5 text-white dark:text-black font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="text-xs text-slate-600 dark:text-white/60">Keep me logged in</span>
          </label>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          className="w-full relative h-11 bg-gradient-to-r from-[#00C2FF] to-[#00E5A8] text-[#0A0F1D] dark:text-[#0A0F1D] font-bold rounded-xl shadow-lg hover:shadow-[#00C2FF]/20 hover:scale-[1.01] active:scale-[0.99] transition-all overflow-hidden group border-0 cursor-pointer"
          disabled={loading}
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative z-10">{loading ? "Signing in…" : "Sign In"}</span>
        </Button>
      </form>

      {/* Sign Up Link */}
      <p className="text-center text-xs text-slate-500 dark:text-white/50 pt-2">
        New here?{" "}
        <Link 
          to="/auth/signup" 
          className="text-sky-600 dark:text-[#00E5A8] hover:text-[#00C2FF] font-semibold hover:underline transition-colors"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
