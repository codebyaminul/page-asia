import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  KeyRound,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  ShoppingBag,
  User,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  getCurrentCustomerFn,
  getCustomerBookingsFn,
  updateCustomerProfileFn,
  changeCustomerPasswordFn,
  getCustomerOrdersFn,
  getCustomerQuotesFn,
  loginCustomerFn,
  logoutCustomerFn,
  registerCustomerFn,
} from "@/lib/server-api";
import { taka } from "@/lib/data";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Customer Portal & Workshop Account — PAGE International" },
      {
        name: "description",
        content: "Track your machinery orders, commercial quotations, and equipment consultation bookings.",
      },
    ],
  }),
  component: AccountPortal,
});

export function AccountPortal() {
  const [customer, setCustomer] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authError, setAuthError] = useState("");
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // Portal tabs
  const [activeTab, setActiveTab] = useState<"orders" | "quotes" | "bookings" | "profile">("orders");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [editFullName, setEditFullName] = useState("");
  const [editCompanyName, setEditCompanyName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editBinVat, setEditBinVat] = useState("");
  const [editCity, setEditCity] = useState("Dhaka");
  const [editBusinessType, setEditBusinessType] = useState("Workshop / Garage");

  // Password change state
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [orders, setOrders] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regFullName, setRegFullName] = useState("");
  const [regCompanyName, setRegCompanyName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regBusinessType, setRegBusinessType] = useState("Workshop / Garage");
  const [regCity, setRegCity] = useState("Dhaka");
  const [regVatNumber, setRegVatNumber] = useState("");

  // Load customer session
  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      setLoading(true);
      const profile = await getCurrentCustomerFn();
      setCustomer(profile);
      if (profile) {
        loadCustomerData();
      }
    } catch (err) {
      console.warn("Session check notice:", err);
    } finally {
      setLoading(false);
    }
  }

  async function loadCustomerData() {
    try {
      setDataLoading(true);
      const [o, q, b] = await Promise.all([
        getCustomerOrdersFn().catch(() => []),
        getCustomerQuotesFn().catch(() => []),
        getCustomerBookingsFn().catch(() => []),
      ]);
      setOrders(o || []);
      setQuotes(q || []);
      setBookings(b || []);
    } catch (err) {
      console.error("Error loading portal data:", err);
    } finally {
      setDataLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    setAuthSubmitting(true);
    try {
      const res = await loginCustomerFn({
        data: { email: loginEmail, password: loginPassword },
      });
      if (res.success && res.customer) {
        setCustomer(res.customer);
        loadCustomerData();
      } else {
        setAuthError(res.error || "Authentication failed. Please verify credentials.");
      }
    } catch (err: any) {
      setAuthError(err.message || "Unable to sign in. Please try again.");
    } finally {
      setAuthSubmitting(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    setAuthSubmitting(true);
    try {
      const res = await registerCustomerFn({
        data: {
          fullName: regFullName,
          companyName: regCompanyName,
          email: regEmail,
          password: regPassword,
          phone: regPhone,
          businessType: regBusinessType,
          city: regCity,
          binVatNumber: regVatNumber,
        },
      });
      if (res.success && res.customer) {
        setCustomer(res.customer);
        loadCustomerData();
      } else {
        setAuthError(res.error || "Registration failed. Email may already be in use.");
      }
    } catch (err: any) {
      setAuthError(err.message || "Registration error. Please check form inputs.");
    } finally {
      setAuthSubmitting(false);
    }
  }

  async function handleLogout() {
    try {
      await logoutCustomerFn();
      setCustomer(null);
      setOrders([]);
      setQuotes([]);
      setBookings([]);
    } catch (err) {
      console.error("Logout error:", err);
    }
  }

  // Pre-fill test credentials
  function fillDemoCustomer(email: string) {
    setLoginEmail(email);
    setLoginPassword("customer123");
  }

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-zinc-950 text-zinc-400">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-red-500/30 border-t-red-500" />
          <p className="text-xs font-mono tracking-wider uppercase">Authenticating Portal Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e11] text-zinc-100">
      {/* Hero Header */}
      <div className="border-b border-zinc-800/80 bg-gradient-to-b from-zinc-900 to-zinc-950 pt-28 pb-10">
        <div className="container-page flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500">
              <ShieldCheck className="h-4 w-4" />
              <span>B2B Customer Portal & Account Hub</span>
            </div>
            <h1 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
              {customer ? (customer.companyName || customer.fullName) : "Workshop Client Portal"}
            </h1>
            <p className="mt-2 text-sm text-zinc-400 max-w-xl">
              {customer
                ? `Authorized customer dashboard for ${customer.email}. View dispatch statuses, RFQ commercial offers, and equipment calibration appointments.`
                : "Sign in with your authorized workshop or dealer account to manage purchases, commercial quotations, and machinery bookings."}
            </p>
          </div>

          {customer && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg border border-zinc-700/80 bg-zinc-800/60 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="container-page py-10">
        {/* UNAUTHENTICATED STATE: LOGIN / REGISTER */}
        {!customer ? (
          <div className="mx-auto max-w-xl">
            {/* Tab Switcher */}
            <div className="flex rounded-xl border border-zinc-800 bg-zinc-900/80 p-1.5 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setAuthMode("login");
                  setAuthError("");
                }}
                className={`flex-1 rounded-lg py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  authMode === "login"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Sign In to Account
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("register");
                  setAuthError("");
                }}
                className={`flex-1 rounded-lg py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  authMode === "register"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Register Workshop
              </button>
            </div>

            {/* Error Banner */}
            {authError && (
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-950/40 p-4 text-xs text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                <p>{authError}</p>
              </div>
            )}

            {/* LOGIN FORM */}
            {authMode === "login" ? (
              <form onSubmit={handleLogin} className="mt-6 space-y-4 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Workshop Email Address
                  </label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. workshop@apexmotors.bd"
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950/80 py-3 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Password
                  </label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950/80 py-3 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authSubmitting}
                  className="w-full rounded-lg bg-red-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:bg-red-500 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {authSubmitting ? "Authenticating Session..." : "Sign In to Client Portal"}
                </button>

                {/* Quick Demo Fill Buttons */}
                <div className="pt-4 border-t border-zinc-800">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                    Quick Demo Credentials (Pre-seeded Accounts):
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => fillDemoCustomer("tanvir@autofixbd.com")}
                      className="rounded border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-[11px] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                    >
                      AutoFix Garage Ltd.
                    </button>
                    <button
                      type="button"
                      onClick={() => fillDemoCustomer("rashid@dhakatyre.com")}
                      className="rounded border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-[11px] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                    >
                      Dhaka Tyre Center
                    </button>
                    <button
                      type="button"
                      onClick={() => fillDemoCustomer("selim@greenfleet.bd")}
                      className="rounded border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-[11px] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                    >
                      Green Fleet BD
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* REGISTRATION FORM */
              <form onSubmit={handleRegister} className="mt-6 space-y-4 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Company / Workshop Name
                    </label>
                    <input
                      type="text"
                      required
                      value={regCompanyName}
                      onChange={(e) => setRegCompanyName(e.target.value)}
                      placeholder="e.g. Apex Auto Tech Ltd."
                      className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-950/80 py-2.5 px-3.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Primary Contact Person
                    </label>
                    <input
                      type="text"
                      required
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      placeholder="e.g. Engr. Tanvir Ahmed"
                      className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-950/80 py-2.5 px-3.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="e.g. purchase@apexauto.bd"
                      className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-950/80 py-2.5 px-3.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Phone / Mobile
                    </label>
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+880 1700-000000"
                      className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-950/80 py-2.5 px-3.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Business Type
                    </label>
                    <select
                      value={regBusinessType}
                      onChange={(e) => setRegBusinessType(e.target.value)}
                      className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-950/80 py-2.5 px-3.5 text-sm text-zinc-100 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    >
                      <option value="Workshop / Garage">Workshop / Garage</option>
                      <option value="Tyre Service Center">Tyre Service Center</option>
                      <option value="Dealership Workshop">Dealership Workshop</option>
                      <option value="Fleet Operator">Fleet Operator</option>
                      <option value="EV Business">EV Business</option>
                      <option value="Distributor">Distributor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                      City / Location
                    </label>
                    <input
                      type="text"
                      required
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      placeholder="Dhaka, Chattogram, Bogura..."
                      className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-950/80 py-2.5 px-3.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                      BIN / VAT Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={regVatNumber}
                      onChange={(e) => setRegVatNumber(e.target.value)}
                      placeholder="e.g. 123456789-0101"
                      className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-950/80 py-2.5 px-3.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-950/80 py-2.5 px-3.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authSubmitting}
                  className="w-full mt-4 rounded-lg bg-red-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:bg-red-500 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {authSubmitting ? "Creating Client Account..." : "Create Registered B2B Account"}
                </button>
              </form>
            )}
          </div>
        ) : (
          /* AUTHENTICATED STATE: CUSTOMER DASHBOARD */
          <div>
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
                  <Package className="h-5 w-5 text-red-500" />
                </div>
                <p className="mt-2 text-2xl font-black text-white">{orders.length}</p>
              </div>

              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Quotation Requests (RFQs)</span>
                  <FileText className="h-5 w-5 text-amber-500" />
                </div>
                <p className="mt-2 text-2xl font-black text-white">{quotes.length}</p>
              </div>

              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Consultations & Demos</span>
                  <Calendar className="h-5 w-5 text-emerald-500" />
                </div>
                <p className="mt-2 text-2xl font-black text-white">{bookings.length}</p>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex border-b border-zinc-800 space-x-6 overflow-x-auto text-sm font-bold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab("orders")}
                className={`pb-3 transition-colors cursor-pointer ${
                  activeTab === "orders"
                    ? "border-b-2 border-red-500 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Orders & Shipments ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab("quotes")}
                className={`pb-3 transition-colors cursor-pointer ${
                  activeTab === "quotes"
                    ? "border-b-2 border-red-500 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Quotations (RFQs) ({quotes.length})
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`pb-3 transition-colors cursor-pointer ${
                  activeTab === "bookings"
                    ? "border-b-2 border-red-500 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Appointments ({bookings.length})
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`pb-3 transition-colors cursor-pointer ${
                  activeTab === "profile"
                    ? "border-b-2 border-red-500 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Workshop Profile
              </button>
            </div>

            {/* TAB CONTENTS */}
            <div className="mt-8">
              {dataLoading ? (
                <div className="py-12 text-center text-xs text-zinc-500 uppercase tracking-widest">
                  Loading account records...
                </div>
              ) : activeTab === "orders" ? (
                orders.length === 0 ? (
                  <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-12 text-center">
                    <Package className="mx-auto h-12 w-12 text-zinc-600" />
                    <h3 className="mt-4 text-base font-bold uppercase tracking-wider text-white">
                      No Past Orders Found
                    </h3>
                    <p className="mt-2 text-xs text-zinc-400 max-w-sm mx-auto">
                      You haven't placed any commercial orders yet. Browse our machinery and equipment catalog.
                    </p>
                    <Link
                      to="/shop"
                      className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-500"
                    >
                      Explore Machinery Catalog
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-700 transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/60">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm font-bold text-white">#{order.id}</span>
                              <span
                                className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                  order.status === "delivered"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : order.status === "confirmed"
                                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                }`}
                              >
                                {order.status}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-zinc-500">
                              Placed on {new Date(order.created_at).toLocaleDateString("en-GB", { dateStyle: "long" })}
                            </p>
                          </div>

                          <div className="text-right">
                            <span className="text-xs text-zinc-400 uppercase tracking-wider">Total Commercial Value</span>
                            <p className="text-lg font-black text-red-500">{taka(Number(order.total))}</p>
                          </div>
                        </div>

                        {/* Order Lines */}
                        <div className="pt-3">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                            Itemized Line Items:
                          </p>
                          <div className="space-y-2">
                            {order.items?.map((item: any) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between text-xs py-1.5 px-3 rounded bg-zinc-950/60 border border-zinc-800/40"
                              >
                                <div>
                                  <span className="font-semibold text-zinc-200">{item.productName}</span>
                                  <span className="text-zinc-500 ml-2 font-mono text-[11px]">SKU: {item.productSku}</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-zinc-400">{item.qty} × {taka(Number(item.unitPrice))}</span>
                                  <span className="ml-3 font-bold text-zinc-200">{taka(Number(item.lineTotal))}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : activeTab === "quotes" ? (
                quotes.length === 0 ? (
                  <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-12 text-center">
                    <FileText className="mx-auto h-12 w-12 text-zinc-600" />
                    <h3 className="mt-4 text-base font-bold uppercase tracking-wider text-white">
                      No Quotation Requests Found
                    </h3>
                    <p className="mt-2 text-xs text-zinc-400 max-w-sm mx-auto">
                      Need custom pricing or equipment leasing? Submit an RFQ quotation request from any product page.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {quotes.map((q) => (
                      <div
                        key={q.id}
                        className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-700 transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm font-bold text-white">Ref: #{q.id}</span>
                              <span
                                className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                  q.status === "replied"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : q.status === "accepted"
                                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                }`}
                              >
                                {q.status}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-zinc-500">
                              Submitted {new Date(q.created_at).toLocaleDateString("en-GB")}
                            </p>
                          </div>

                          {q.quoted_total && (
                            <div className="text-right">
                              <span className="text-xs text-zinc-400 uppercase tracking-wider">Official Quoted Total</span>
                              <p className="text-lg font-black text-emerald-400">{taka(Number(q.quoted_total))}</p>
                            </div>
                          )}
                        </div>

                        {/* Admin Reply Message */}
                        {q.admin_reply && (
                          <div className="mt-4 rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-3.5 text-xs">
                            <p className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] mb-1">
                              Commercial Offer from PAGE Desk:
                            </p>
                            <p className="text-zinc-300 leading-relaxed">{q.admin_reply}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
              ) : activeTab === "bookings" ? (
                bookings.length === 0 ? (
                  <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-12 text-center">
                    <Calendar className="mx-auto h-12 w-12 text-zinc-600" />
                    <h3 className="mt-4 text-base font-bold uppercase tracking-wider text-white">
                      No Appointments Booked
                    </h3>
                    <p className="mt-2 text-xs text-zinc-400 max-w-sm mx-auto">
                      Schedule a live machinery demo at our Tejgaon hub or request an on-site bay inspection.
                    </p>
                    <Link
                      to="/services/book"
                      className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-500"
                    >
                      Book Consultation
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((b) => (
                      <div
                        key={b.id}
                        className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{b.service_name}</span>
                            <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-bold uppercase text-zinc-300">
                              {b.status}
                            </span>
                          </div>
                          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 text-red-500" />
                              {new Date(b.preferred_date).toLocaleDateString("en-GB")} ({b.preferred_slot})
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5 text-red-500" />
                              {b.location_type === "onsite" ? `On-site: ${b.onsite_address || "Client Bay"}` : (b.center_name || "PAGE Hub")}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-mono text-zinc-500">Ref: #{b.id}</span>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                /* PROFILE TAB */
                <div className="max-w-3xl space-y-6">
                  {/* Workshop Profile Card */}
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-5">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                          Registered B2B Facility Credentials
                        </h3>
                        <p className="text-[11px] text-zinc-500 mt-0.5">
                          Commercial details pre-filled during quotation and equipment checkout.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsEditingProfile(!isEditingProfile);
                          setProfileMsg(null);
                        }}
                        className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-all"
                      >
                        {isEditingProfile ? "Cancel" : "Edit Profile"}
                      </button>
                    </div>

                    {profileMsg && (
                      <div className={`p-3 rounded-lg text-xs font-medium ${
                        profileMsg.type === "success"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}>
                        {profileMsg.text}
                      </div>
                    )}

                    {!isEditingProfile ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
                          <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block">Company / Workshop Name</span>
                          <p className="mt-1 font-bold text-zinc-200 text-sm">{customer.companyName || "N/A"}</p>
                        </div>
                        <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
                          <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block">Lead Representative</span>
                          <p className="mt-1 font-bold text-zinc-200 text-sm">{customer.fullName}</p>
                        </div>
                        <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
                          <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block">Corporate Email</span>
                          <p className="mt-1 font-mono text-zinc-300">{customer.email}</p>
                        </div>
                        <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
                          <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block">Contact Phone / WhatsApp</span>
                          <p className="mt-1 font-bold text-zinc-200">{customer.phone}</p>
                        </div>
                        <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
                          <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block">VAT / BIN Registration</span>
                          <p className="mt-1 font-mono text-emerald-400">{customer.binVatNumber || "Not recorded"}</p>
                        </div>
                        <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
                          <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block">Facility City / Hub</span>
                          <p className="mt-1 font-bold text-zinc-200">{customer.city}</p>
                        </div>
                      </div>
                    ) : (
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          setProfileSaving(true);
                          setProfileMsg(null);
                          try {
                            const updated = await updateCustomerProfileFn({
                              data: {
                                fullName: editFullName,
                                companyName: editCompanyName,
                                phone: editPhone,
                                binVatNumber: editBinVat,
                                city: editCity,
                                businessType: editBusinessType,
                              },
                            });
                            setCustomer(updated);
                            setIsEditingProfile(false);
                            setProfileMsg({ type: "success", text: "Workshop profile updated successfully." });
                          } catch (err: any) {
                            setProfileMsg({ type: "error", text: err.message || "Failed to update profile." });
                          } finally {
                            setProfileSaving(false);
                          }
                        }}
                        className="space-y-4 text-xs"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-zinc-400 mb-1 font-medium">Company Name</label>
                            <input
                              type="text"
                              value={editCompanyName}
                              onChange={(e) => setEditCompanyName(e.target.value)}
                              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-zinc-400 mb-1 font-medium">Lead Representative</label>
                            <input
                              type="text"
                              required
                              value={editFullName}
                              onChange={(e) => setEditFullName(e.target.value)}
                              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-zinc-400 mb-1 font-medium">Phone / WhatsApp</label>
                            <input
                              type="tel"
                              required
                              value={editPhone}
                              onChange={(e) => setEditPhone(e.target.value)}
                              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-zinc-400 mb-1 font-medium">VAT / BIN Registration</label>
                            <input
                              type="text"
                              placeholder="e.g. 123456789-0101"
                              value={editBinVat}
                              onChange={(e) => setEditBinVat(e.target.value)}
                              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-zinc-400 mb-1 font-medium">Facility City</label>
                            <input
                              type="text"
                              value={editCity}
                              onChange={(e) => setEditCity(e.target.value)}
                              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-zinc-400 mb-1 font-medium">Business Sector</label>
                            <select
                              value={editBusinessType}
                              onChange={(e) => setEditBusinessType(e.target.value)}
                              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                            >
                              <option value="Workshop / Garage">Workshop / Garage</option>
                              <option value="Tyre Service Center">Tyre Service Center</option>
                              <option value="Dealership Workshop">Dealership Workshop</option>
                              <option value="Fleet Operator">Fleet Operator</option>
                              <option value="EV Business">EV Business</option>
                              <option value="Distributor">Distributor</option>
                              <option value="Independent Technician">Independent Technician</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setIsEditingProfile(false)}
                            className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={profileSaving}
                            className="btn btn-primary h-9 px-5 text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                          >
                            {profileSaving ? "Saving..." : "Save Changes"}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Security / Password Card */}
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-3">
                      Account Security & Password
                    </h3>

                    {pwMsg && (
                      <div className={`p-3 rounded-lg text-xs font-medium ${
                        pwMsg.type === "success"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}>
                        {pwMsg.text}
                      </div>
                    )}

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (newPw !== confirmPw) {
                          setPwMsg({ type: "error", text: "New passwords do not match." });
                          return;
                        }
                        setPwSaving(true);
                        setPwMsg(null);
                        try {
                          const res = await changeCustomerPasswordFn({
                            data: { currentPassword: currentPw, newPassword: newPw },
                          });
                          if (res.success) {
                            setPwMsg({ type: "success", text: "Password changed successfully." });
                            setCurrentPw("");
                            setNewPw("");
                            setConfirmPw("");
                          } else {
                            setPwMsg({ type: "error", text: (res as any).error || "Failed to change password." });
                          }
                        } catch (err: any) {
                          setPwMsg({ type: "error", text: err.message || "Failed to update password." });
                        } finally {
                          setPwSaving(false);
                        }
                      }}
                      className="space-y-4 text-xs max-w-md"
                    >
                      <div>
                        <label className="block text-zinc-400 mb-1 font-medium">Current Password</label>
                        <input
                          type="password"
                          required
                          value={currentPw}
                          onChange={(e) => setCurrentPw(e.target.value)}
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-1 font-medium">New Password (min 6 characters)</label>
                        <input
                          type="password"
                          required
                          minLength={6}
                          value={newPw}
                          onChange={(e) => setNewPw(e.target.value)}
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-1 font-medium">Confirm New Password</label>
                        <input
                          type="password"
                          required
                          value={confirmPw}
                          onChange={(e) => setConfirmPw(e.target.value)}
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={pwSaving}
                        className="btn btn-outline h-9 px-5 text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                      >
                        {pwSaving ? "Updating..." : "Update Password"}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
