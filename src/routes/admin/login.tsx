import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Shield,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Sparkles,
  Briefcase,
  UserCheck,
} from "lucide-react";
import { loginAdmin, getAuthAdminUser, getUsers } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
  head: () => ({
    meta: [{ title: "Admin Sign In — PAGE International" }],
  }),
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const users = getUsers();

  useEffect(() => {
    // If already logged in, redirect to /admin
    if (getAuthAdminUser()) {
      navigate({ to: "/admin" });
    }
  }, [navigate]);

  function handleLogin(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your administrator email address.");
      return;
    }
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const res = loginAdmin(email, password);
      setLoading(false);
      if (res.success) {
        navigate({ to: "/admin" });
      } else {
        setError(res.error || "Authentication failed. Please verify your credentials.");
      }
    }, 400);
  }

  function handleQuickLogin(userEmail: string) {
    setEmail(userEmail);
    setPassword("admin123");
    setError(null);
    setLoading(true);
    setTimeout(() => {
      const res = loginAdmin(userEmail, "admin123");
      setLoading(false);
      if (res.success) {
        navigate({ to: "/admin" });
      } else {
        setError(res.error || "Failed to log in.");
      }
    }, 300);
  }

  return (
    <div className="min-h-screen bg-[#121212] text-zinc-200 flex flex-col justify-center items-center p-4 font-[Inter,system-ui,sans-serif]">
      {/* Background ambient glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full" />
      </div>

      <div className="relative w-full max-w-[420px] z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-2 shadow-lg shadow-emerald-500/10">
            <Shield className="h-6 w-6" strokeWidth={2.25} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-display">
            PAGE Admin Console
          </h1>
          <p className="text-[13px] text-zinc-500">
            Sign in to manage inventory, price quotes & bookings
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#1c1c1c] border border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-2xl space-y-5">
          {error && (
            <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg p-3 text-[12px] animate-in fade-in duration-200">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1.5">
                Staff Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@pageinternational.com"
                  className="w-full bg-[#161616] border border-white/[0.08] rounded-lg pl-9 pr-3 py-2.5 text-[13px] text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block">
                  Password
                </label>
                <span className="text-[11px] text-zinc-500">Default: admin123</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#161616] border border-white/[0.08] rounded-lg pl-9 pr-3 py-2.5 text-[13px] text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-[13px] flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-900/30 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Selectors */}
          <div className="pt-4 border-t border-white/[0.06] space-y-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 text-center">
              Quick 1-Click Demo Login
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin("rafiq@pageinternational.com")}
                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white/[0.03] hover:bg-emerald-500/10 border border-white/[0.06] hover:border-emerald-500/30 text-[11px] text-zinc-300 transition-all"
              >
                <KeyRound className="h-3 w-3 text-emerald-400" />
                <span>Admin</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("nusrat@pageinternational.com")}
                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white/[0.03] hover:bg-purple-500/10 border border-white/[0.06] hover:border-purple-500/30 text-[11px] text-zinc-300 transition-all"
              >
                <Briefcase className="h-3 w-3 text-purple-400" />
                <span>Product Mgr</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("staff@pageinternational.com")}
                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white/[0.03] hover:bg-blue-500/10 border border-white/[0.06] hover:border-blue-500/30 text-[11px] text-zinc-300 transition-all"
              >
                <UserCheck className="h-3 w-3 text-blue-400" />
                <span>Staff</span>
              </button>
            </div>
          </div>
        </div>

        {/* Back to public site */}
        <div className="text-center">
          <Link
            to="/"
            className="text-[12px] text-zinc-500 hover:text-zinc-300 transition-colors inline-flex items-center gap-1"
          >
            ← Return to PAGE International Website
          </Link>
        </div>
      </div>
    </div>
  );
}
