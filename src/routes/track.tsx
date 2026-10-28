import { createFileRoute, Link } from "@tanstack/react-router";
import { lookupPublicOrderOrQuoteFn } from "@/lib/server-api";
import { taka } from "@/lib/data";
import {
  Search,
  PackageCheck,
  Truck,
  Clock,
  CheckCircle2,
  XCircle,
  Building2,
  Phone,
  Mail,
  MapPin,
  Printer,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
  AlertCircle,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/track")({
  component: TrackPage,
  head: () => ({
    meta: [
      {
        title: "Track Commercial Order & Quotation (RFQ) — PAGE International",
      },
      {
        name: "description",
        content:
          "Check real-time fulfillment status, logistics dispatch timeline, or commercial quotation review progress for your workshop machinery.",
      },
    ],
  }),
});

export function TrackPage() {
  const [refId, setRefId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!refId.trim() || !phone.trim()) {
      setError("Please enter both your Reference ID and contact phone number.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await lookupPublicOrderOrQuoteFn({
        data: { referenceId: refId.trim(), phone: phone.trim() },
      });

      if (res.success) {
        setResult(res);
      } else {
        setError(res.error || "No matching record found.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to query tracking records. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePreset = (presetRef: string, presetPhone: string) => {
    setRefId(presetRef);
    setPhone(presetPhone);
    setError(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 lg:pt-32 pb-20">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-secondary/40 py-3">
        <nav
          aria-label="Breadcrumb"
          className="container-page text-xs text-muted-foreground flex items-center gap-1.5"
        >
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-foreground">
            Logistics & Inquiry Tracking
          </span>
        </nav>
      </div>

      <div className="container-page py-10 lg:py-14 space-y-10 max-w-4xl">
        {/* Hero Title */}
        <div className="text-center space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
            PAGE Fulfillment & Inquiry Tracking Desk
          </span>
          <h1 className="display-lg text-foreground font-bold">
            Track Order & Commercial RFQ
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            Inspect real-time shipment dispatch milestones, estimated delivery timeline, or engineering quotation status for your garage machinery.
          </p>
        </div>

        {/* Input Card */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleTrack} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Order or Quotation Ref # *
                </label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. PG-102941 or q-001"
                    value={refId}
                    onChange={(e) => setRefId(e.target.value)}
                    className="field pl-10 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Contact Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +880 1711-234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="field pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-muted-foreground">Demo shortcuts:</span>
                <button
                  type="button"
                  onClick={() => handlePreset("q-001", "+880-1711-123456")}
                  className="text-[11px] font-mono font-semibold bg-secondary hover:bg-secondary/80 text-foreground px-2.5 py-1 rounded border border-border transition-all"
                >
                  Quote #q-001
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset("q-002", "+880-1911-654321")}
                  className="text-[11px] font-mono font-semibold bg-secondary hover:bg-secondary/80 text-foreground px-2.5 py-1 rounded border border-border transition-all"
                >
                  Quote #q-002
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary h-11 px-8 text-xs font-bold uppercase tracking-wider disabled:opacity-50 flex items-center justify-center gap-2 shadow"
              >
                {loading ? (
                  <>
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <span>Track Status</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-5 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-xs text-destructive flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Tracking Result View */}
        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Header Result Card */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded">
                      #{result.record.id}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {result.type === "order" ? "Machinery Sales Order" : "Commercial Quotation (RFQ)"}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground mt-2">
                    {result.record.companyName || result.record.fullName || result.record.contactName}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Logged on {new Date(result.record.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="btn btn-outline h-10 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>Print Receipt</span>
                  </button>
                </div>
              </div>

              {/* Stepper Timeline */}
              <div className="py-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-6">
                  Fulfillment & Lifecycle Timeline
                </h3>

                {result.type === "order" ? (
                  /* Order Stepper */
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {[
                      {
                        title: "1. Order Received",
                        desc: "Registered in system",
                        done: true,
                        active: result.record.status === "pending",
                      },
                      {
                        title: "2. Confirmed",
                        desc: "Verified by desk",
                        done: ["confirmed", "dispatched", "delivered"].includes(result.record.status),
                        active: result.record.status === "confirmed",
                      },
                      {
                        title: "3. In Transit",
                        desc: "Logistics dispatched",
                        done: ["dispatched", "delivered"].includes(result.record.status),
                        active: result.record.status === "dispatched",
                      },
                      {
                        title: "4. Delivered",
                        desc: "Commissioned at bay",
                        done: result.record.status === "delivered",
                        active: result.record.status === "delivered",
                      },
                    ].map((step, idx) => (
                      <div
                        key={idx}
                        className={`rounded-xl border p-4 transition-all ${
                          step.active
                            ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                            : step.done
                            ? "border-emerald-500/30 bg-emerald-500/5 text-foreground"
                            : "border-border bg-secondary/30 text-muted-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          {step.done ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                          )}
                          <span className="font-bold text-xs text-foreground">
                            {step.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Quotation Stepper */
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {[
                      {
                        title: "1. Inquiry Received",
                        desc: "RFQ logged in DB",
                        done: true,
                        active: result.record.status === "pending",
                      },
                      {
                        title: "2. Engineering Review",
                        desc: "Bay spec audited",
                        done: true,
                        active: result.record.status === "pending",
                      },
                      {
                        title: "3. Official Offer Sent",
                        desc: "Commercial pricing reply",
                        done: ["replied", "accepted"].includes(result.record.status),
                        active: result.record.status === "replied",
                      },
                      {
                        title: "4. Order Confirmed",
                        desc: "PO accepted",
                        done: result.record.status === "accepted",
                        active: result.record.status === "accepted",
                      },
                    ].map((step, idx) => (
                      <div
                        key={idx}
                        className={`rounded-xl border p-4 transition-all ${
                          step.active
                            ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                            : step.done
                            ? "border-emerald-500/30 bg-emerald-500/5 text-foreground"
                            : "border-border bg-secondary/30 text-muted-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          {step.done ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                          )}
                          <span className="font-bold text-xs text-foreground">
                            {step.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Desk Reply Message (for Quotes) */}
              {result.record.reply && (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs space-y-1">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary block">
                    Official Reply from Commercial Desk:
                  </span>
                  <p className="text-foreground leading-relaxed font-medium">
                    "{result.record.reply}"
                  </p>
                </div>
              )}

              {/* Items Breakdown */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Purchased / Quoted Equipment Lines
                </h3>

                <div className="rounded-xl border border-border overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-secondary text-muted-foreground font-mono uppercase text-[10px]">
                      <tr>
                        <th className="p-3">Item Description</th>
                        <th className="p-3 text-center">Qty</th>
                        {result.type === "order" && (
                          <>
                            <th className="p-3 text-right">Unit Price</th>
                            <th className="p-3 text-right">Line Total</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {result.record.items.map((it: any, idx: number) => (
                        <tr key={idx} className="hover:bg-muted/40">
                          <td className="p-3 font-semibold text-foreground">
                            {it.productName}
                            {it.productSku && (
                              <span className="block font-mono text-[10px] text-muted-foreground font-normal">
                                SKU: {it.productSku}
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-center font-bold text-foreground font-mono">
                            {it.qty}
                          </td>
                          {result.type === "order" && (
                            <>
                              <td className="p-3 text-right font-mono text-muted-foreground">
                                {taka(it.unitPrice)}
                              </td>
                              <td className="p-3 text-right font-mono font-bold text-foreground">
                                {taka(it.lineTotal || it.unitPrice * it.qty)}
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {result.type === "order" && (
                  <div className="flex justify-end pt-2 text-xs">
                    <div className="w-64 space-y-1.5 rounded-lg bg-secondary/50 p-4 border border-border">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal:</span>
                        <span>{taka(result.record.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Delivery:</span>
                        <span>
                          {result.record.deliveryCharge === 0 ? "Complimentary" : taka(result.record.deliveryCharge)}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-foreground pt-2 border-t border-border text-sm">
                        <span>Total:</span>
                        <span className="text-primary font-mono">
                          {taka(result.record.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Assistance Card */}
            <div className="rounded-xl border border-border bg-secondary/30 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-bold text-foreground">Need Urgent Dispatch Updates?</p>
                  <p className="text-muted-foreground mt-0.5">
                    Contact the Tejgaon industrial engineering dispatch desk directly at{" "}
                    <strong className="text-foreground">+880 9612-PAGE-INTL</strong>.
                  </p>
                </div>
              </div>

              <Link
                to="/account"
                className="btn btn-outline h-9 px-4 text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5"
              >
                <span>Client Portal</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
