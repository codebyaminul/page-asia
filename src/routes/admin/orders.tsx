import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  getOrders,
  saveOrders,
  updateOrderStatus,
  type AdminOrder,
} from "@/lib/admin-data";
import { getAdminOrdersFn, updateOrderStatusFn } from "@/lib/server-api";
import { taka } from "@/lib/data";
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  XCircle,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  CreditCard,
  FileText,
  Printer,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
  head: () => ({
    meta: [{ title: "Customer Orders — PAGE Admin" }],
  }),
});

function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>(() => getOrders());
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<AdminOrder | null>(null);

  // Fetch real-time orders from PostgreSQL on mount
  const fetchOrders = () => {
    setLoading(true);
    getAdminOrdersFn()
      .then((data) => {
        if (data && data.length) {
          setOrders(data as AdminOrder[]);
          saveOrders(data as AdminOrder[]);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch orders from DB:", err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (
    orderId: string,
    newStatus: AdminOrder["status"]
  ) => {
    // Optimistic UI update
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: newStatus, updatedAt: new Date().toISOString() }
          : o
      )
    );
    updateOrderStatus(orderId, newStatus);
    try {
      await updateOrderStatusFn({ data: { id: orderId, status: newStatus } });
    } catch (err) {
      console.warn("Server status sync failed:", err);
    }
  };

  const filtered = orders.filter((o) => {
    const s = search.toLowerCase();
    const matchSearch =
      !search ||
      o.id.toLowerCase().includes(s) ||
      o.fullName.toLowerCase().includes(s) ||
      (o.companyName && o.companyName.toLowerCase().includes(s)) ||
      o.phone.toLowerCase().includes(s) ||
      (o.email && o.email.toLowerCase().includes(s)) ||
      o.items.some((it) => it.productName.toLowerCase().includes(s));

    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const confirmedCount = orders.filter((o) => o.status === "confirmed").length;
  const dispatchedCount = orders.filter((o) => o.status === "dispatched").length;
  const deliveredCount = orders.filter((o) => o.status === "delivered").length;

  const statusBadge = (status: AdminOrder["status"]) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
            <Clock className="h-3 w-3" /> Pending Review
          </span>
        );
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="h-3 w-3" /> Confirmed
          </span>
        );
      case "dispatched":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
            <Truck className="h-3 w-3" /> In Transit
          </span>
        );
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
            <PackageCheck className="h-3 w-3" /> Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-0.5 rounded-full">
            <XCircle className="h-3 w-3" /> Cancelled
          </span>
        );
    }
  };

  const paymentLabel = (method: string) => {
    switch (method) {
      case "b2b":
        return "B2B Credit Line / Commercial PO";
      case "card":
        return "Electronic Card / Payment Gateway";
      default:
        return "Cash on Delivery / Warehouse Pickup";
    }
  };

  return (
    <AdminLayout activeRoute="/admin/orders">
      <div className="p-6 lg:p-8 space-y-6 max-w-[1440px]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span>Customer Orders</span>
              {loading && (
                <div className="h-4 w-4 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin" />
              )}
            </h1>
            <p className="text-[13px] text-zinc-500 mt-1">
              Real-time B2B machinery sales and part order fulfillment desk.
            </p>
          </div>

          <button
            onClick={fetchOrders}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#232323] border border-white/[0.08] hover:border-white/[0.15] text-zinc-300 hover:text-white text-xs font-semibold transition-all self-start sm:self-auto"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin text-emerald-400" : ""}`} />
            <span>Sync Live PostgreSQL</span>
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Order #, Customer, Company, Phone..."
              className="w-full bg-[#232323] border border-white/[0.06] rounded-lg pl-9 pr-3 py-[7px] text-[13px] text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "all", label: "All", count: orders.length },
              { id: "pending", label: "Pending", count: pendingCount },
              { id: "confirmed", label: "Confirmed", count: confirmedCount },
              { id: "dispatched", label: "In Transit", count: dispatchedCount },
              { id: "delivered", label: "Delivered", count: deliveredCount },
              { id: "cancelled", label: "Cancelled", count: orders.filter((o) => o.status === "cancelled").length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-[7px] rounded-lg text-[12px] font-medium transition-all flex items-center gap-1.5 ${
                  statusFilter === tab.id
                    ? "bg-white/[0.08] text-white"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    tab.id === "pending" && pendingCount > 0
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-white/[0.05] text-zinc-400"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filtered.length === 0 ? (
          <div className="bg-[#232323] border border-white/[0.06] rounded-xl p-12 text-center">
            <div className="h-12 w-12 rounded-full bg-white/[0.04] text-zinc-500 flex items-center justify-center mx-auto mb-3">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-zinc-300">No Orders Found</p>
            <p className="text-xs text-zinc-600 mt-1">
              {search || statusFilter !== "all"
                ? "Try clearing your search query or status filter."
                : "No customer orders have been recorded in the database yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((order) => {
              const isExpanded = expandedId === order.id;
              const dateStr = new Date(order.createdAt).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );

              return (
                <div
                  key={order.id}
                  className="bg-[#232323] border border-white/[0.06] hover:border-white/[0.1] rounded-xl transition-all overflow-hidden"
                >
                  {/* Summary Bar */}
                  <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="h-11 w-11 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <ShoppingBag className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-white bg-white/[0.06] px-2 py-0.5 rounded">
                            #{order.id}
                          </span>
                          {statusBadge(order.status)}
                          {order.customerId && (
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded border border-emerald-500/20">
                              Client Portal Account
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400 pt-0.5">
                          <span className="font-semibold text-white">
                            {order.companyName || order.fullName}
                          </span>
                          <span>&bull;</span>
                          <span>{order.phone}</span>
                          <span>&bull;</span>
                          <span className="text-zinc-500">{dateStr}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 self-end lg:self-center">
                      <div className="text-right">
                        <p className="text-[11px] text-zinc-500 uppercase font-mono tracking-wider">
                          Grand Total
                        </p>
                        <p className="text-base font-bold text-white tracking-tight">
                          {taka(order.total)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setInvoiceOrder(order)}
                          title="Generate Invoice / Mushak"
                          className="h-8 px-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 border border-white/[0.06]"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>Invoice</span>
                        </button>

                        <button
                          onClick={() =>
                            setExpandedId(isExpanded ? null : order.id)
                          }
                          className="h-8 px-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1 border border-white/[0.06]"
                        >
                          <span>{isExpanded ? "Collapse" : "Details"}</span>
                          {isExpanded ? (
                            <ChevronUp className="h-3.5 w-3.5" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail Panel */}
                  {isExpanded && (
                    <div className="border-t border-white/[0.06] bg-[#1d1d1d] p-5 lg:p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                        {/* Customer & Delivery */}
                        <div className="space-y-2">
                          <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                            Delivery Destination
                          </h4>
                          <div className="space-y-1.5 text-zinc-300 bg-[#232323] p-3 rounded-lg border border-white/[0.04]">
                            <p className="font-bold text-white">
                              {order.fullName}
                            </p>
                            {order.companyName && (
                              <p className="text-emerald-400 flex items-center gap-1.5">
                                <Building2 className="h-3.5 w-3.5" />
                                <span>{order.companyName}</span>
                              </p>
                            )}
                            <p className="flex items-center gap-1.5">
                              <Phone className="h-3.5 w-3.5 text-zinc-500" />
                              <span>{order.phone}</span>
                            </p>
                            {order.email && (
                              <p className="flex items-center gap-1.5">
                                <Mail className="h-3.5 w-3.5 text-zinc-500" />
                                <span>{order.email}</span>
                              </p>
                            )}
                            <p className="flex items-start gap-1.5 pt-1">
                              <MapPin className="h-3.5 w-3.5 text-zinc-500 shrink-0 mt-0.5" />
                              <span>
                                {order.streetAddress}, {order.city}
                              </span>
                            </p>
                            {order.binVatNumber && (
                              <p className="font-mono text-[10px] text-zinc-400 pt-1 border-t border-white/[0.04]">
                                BIN / VAT: {order.binVatNumber}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Payment & Logistics */}
                        <div className="space-y-2">
                          <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                            Commercial Billing
                          </h4>
                          <div className="space-y-2 bg-[#232323] p-3 rounded-lg border border-white/[0.04] text-zinc-300">
                            <div className="flex justify-between items-center">
                              <span className="text-zinc-500">Account Type:</span>
                              <span className="font-semibold uppercase tracking-wider text-[11px] text-white">
                                {order.accountType}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-zinc-500">Payment:</span>
                              <span className="font-semibold text-white">
                                {paymentLabel(order.paymentMethod)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-white/[0.04]">
                              <span className="text-zinc-500">Subtotal:</span>
                              <span>{taka(order.subtotal)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-zinc-500">Delivery Charge:</span>
                              <span>
                                {order.deliveryCharge === 0
                                  ? "Complimentary"
                                  : taka(order.deliveryCharge)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center font-bold text-white pt-2 border-t border-white/[0.04]">
                              <span>Order Total:</span>
                              <span className="text-emerald-400 font-mono">
                                {taka(order.total)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Status Management Actions */}
                        <div className="space-y-2">
                          <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                            Fulfillment Workflow
                          </h4>
                          <div className="bg-[#232323] p-3 rounded-lg border border-white/[0.04] space-y-2.5">
                            <p className="text-[11px] text-zinc-400">
                              Current Status:{" "}
                              <strong className="text-white uppercase">
                                {order.status}
                              </strong>
                            </p>

                            <div className="flex flex-col gap-1.5">
                              {order.status === "pending" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(order.id, "confirmed")
                                  }
                                  className="w-full py-2 px-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                                >
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  <span>Confirm Order</span>
                                </button>
                              )}

                              {order.status === "confirmed" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(order.id, "dispatched")
                                  }
                                  className="w-full py-2 px-3 rounded-md bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                                >
                                  <Truck className="h-3.5 w-3.5" />
                                  <span>Dispatch Logistics</span>
                                </button>
                              )}

                              {order.status === "dispatched" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(order.id, "delivered")
                                  }
                                  className="w-full py-2 px-3 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                                >
                                  <PackageCheck className="h-3.5 w-3.5" />
                                  <span>Confirm Delivery</span>
                                </button>
                              )}

                              {order.status !== "cancelled" &&
                                order.status !== "delivered" && (
                                  <button
                                    onClick={() =>
                                      handleStatusChange(order.id, "cancelled")
                                    }
                                    className="w-full py-1.5 px-3 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold text-xs transition-all flex items-center justify-center gap-1"
                                  >
                                    <XCircle className="h-3 w-3" />
                                    <span>Cancel Order</span>
                                  </button>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Line Items Table */}
                      <div className="space-y-2">
                        <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                          Purchased Machinery & Spares ({order.items.length}{" "}
                          items)
                        </h4>
                        <div className="rounded-lg border border-white/[0.04] overflow-hidden bg-[#232323]">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-white/[0.03] text-zinc-500 border-b border-white/[0.04] font-mono uppercase text-[10px]">
                              <tr>
                                <th className="p-3">Equipment / SKU</th>
                                <th className="p-3 text-right">Unit Price</th>
                                <th className="p-3 text-center">Qty</th>
                                <th className="p-3 text-right">Line Total</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.04]">
                              {order.items.map((item, idx) => (
                                <tr key={idx} className="hover:bg-white/[0.02]">
                                  <td className="p-3 font-semibold text-white">
                                    {item.productName}
                                    <span className="block font-mono text-[10px] text-zinc-500 font-normal">
                                      SKU: {item.productSku}
                                    </span>
                                  </td>
                                  <td className="p-3 text-right text-zinc-300 font-mono">
                                    {taka(item.unitPrice)}
                                  </td>
                                  <td className="p-3 text-center text-zinc-300 font-mono font-bold">
                                    {item.qty}
                                  </td>
                                  <td className="p-3 text-right text-white font-mono font-bold">
                                    {taka(item.lineTotal || item.unitPrice * item.qty)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Invoice Modal */}
      {invoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#1c1c1c] border border-white/[0.1] shadow-2xl p-6 sm:p-8 text-zinc-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                  PAGE International Ltd.
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Commercial Tax Invoice #{invoiceOrder.id}
                </h3>
              </div>
              <button
                onClick={() => setInvoiceOrder(null)}
                className="h-8 w-8 grid place-items-center rounded-lg bg-white/[0.04] text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-zinc-500 font-mono text-[10px] uppercase">
                  Billed To:
                </p>
                <p className="font-bold text-white mt-0.5">
                  {invoiceOrder.companyName || invoiceOrder.fullName}
                </p>
                <p className="text-zinc-400">{invoiceOrder.phone}</p>
                <p className="text-zinc-400">{invoiceOrder.streetAddress}, {invoiceOrder.city}</p>
                {invoiceOrder.binVatNumber && (
                  <p className="text-emerald-400 font-mono text-[11px] mt-1">
                    BIN/VAT: {invoiceOrder.binVatNumber}
                  </p>
                )}
              </div>

              <div className="text-right">
                <p className="text-zinc-500 font-mono text-[10px] uppercase">
                  Invoice Date:
                </p>
                <p className="text-zinc-300 font-mono mt-0.5">
                  {new Date(invoiceOrder.createdAt).toLocaleDateString("en-GB")}
                </p>
                <p className="text-zinc-500 font-mono text-[10px] uppercase mt-2">
                  Payment Status:
                </p>
                <p className="font-semibold text-emerald-400 uppercase text-[11px]">
                  {invoiceOrder.status === "delivered" ? "Paid / Settled" : "Pending Clearance"}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-white/[0.06] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.04] text-zinc-400 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Item Description</th>
                    <th className="p-3 text-right">Price</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {invoiceOrder.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-semibold text-white">
                        {it.productName}
                      </td>
                      <td className="p-3 text-right font-mono text-zinc-300">
                        {taka(it.unitPrice)}
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-zinc-300">
                        {it.qty}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-white">
                        {taka(it.lineTotal || it.unitPrice * it.qty)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-2 text-xs">
              <div className="w-64 space-y-1.5 bg-[#232323] p-4 rounded-xl border border-white/[0.04]">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal:</span>
                  <span>{taka(invoiceOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Delivery Charge:</span>
                  <span>{taka(invoiceOrder.deliveryCharge)}</span>
                </div>
                <div className="flex justify-between font-bold text-white pt-2 border-t border-white/[0.06] text-sm">
                  <span>Total Amount:</span>
                  <span className="text-emerald-400 font-mono">
                    {taka(invoiceOrder.total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.06]">
              <button
                onClick={() => window.print()}
                className="btn btn-outline h-10 px-5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => setInvoiceOrder(null)}
                className="btn btn-primary h-10 px-6 text-xs font-bold uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
