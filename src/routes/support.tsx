import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  Download,
  FileSpreadsheet,
  FileText,
  Headphones,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHeader } from "@/components/site/PageHeader";
import { guides } from "@/lib/data";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      {
        title:
          "Commercial Support, B2B Quotations & Product Guides — PAGE International",
      },
      {
        name: "description",
        content:
          "Contact PAGE automotive technical support, request equipment or fleet quotations, view warranty terms and download product datasheets.",
      },
      { property: "og:title", content: "PAGE B2B Support & Quotes" },
      {
        property: "og:description",
        content:
          "Direct technical assistance, commercial quotations and equipment datasheets.",
      },
    ],
  }),
  component: Support,
});

const faqs: [string, string][] = [
  [
    "How does vehicle platform compatibility verification work at PAGE?",
    "Use our Multi-Mobility Platform Finder across 4-Wheeler, 2-Wheeler, 3-Wheeler, and EV platforms. Our technical database cross-references manufacturer OEM part numbers against engine codes, battery voltages, and chassis tolerances.",
  ],
  [
    "Does PAGE supply on-site equipment installation and technician training?",
    "Yes. For commercial garage equipment (2-post lifts, tyre changers, wheel balancers, and compressors), PAGE provides certified on-site installation, concrete floor anchoring inspection, electrical wiring verification, and operator training at your workshop premises.",
  ],
  [
    "What warranty is provided on garage equipment and spare parts?",
    "Heavy-duty garage equipment carries 18 to 36 months of commercial warranty covering hydraulic rams, motors, and structural steel. Mechanical replacement parts carry standard manufacturer defect warranties. Keep your PAGE commercial tax invoice for expedited claims.",
  ],
  [
    "Can PAGE fulfill bulk fleet supply and volume workshop procurement?",
    "Yes. We support corporate fleet operators, delivery fleets, dealership networks, and multi-bay garages with centralized B2B purchasing, volume discount schedules, and scheduled spare parts replenishment.",
  ],
  [
    "Can PAGE engineers install equipment on-site at my workshop or service center?",
    "Yes. For commercial garage equipment (vehicle lifts, tyre changers, wheel balancers, and compressors), PAGE engineers travel to your workshop to perform foundation chemical anchoring, electrical 3-phase connections, hydraulic pressure synchronization, and technician calibration training.",
  ],
  [
    "How do I obtain product datasheets, CE certifications, or user manuals?",
    "Technical datasheets and dimensional drawings can be downloaded directly from the product detail page, or you can request complete equipment PDF catalogues from our support desk.",
  ],
];

export function Support() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    phone: "",
    email: "",
    businessType: "Workshop",
    location: "",
    type: "Custom Machinery / Equipment Sourcing (Not in Shop)",
    quantity: "1",
    products: "",
    details: "",
  });

  return (
    <div className="bg-background text-foreground min-h-screen">
      <PageHeader
        eyebrow="Commercial Support & Engineering Desk"
        title="Technical Assistance & B2B Quotations"
        intro="Have questions regarding equipment dimensions, vehicle compatibility, or volume supply terms? Our technical applications engineers and B2B commercial advisors are ready to assist."
      />

      {/* Direct Contact Cards */}
      <section className="border-b border-border bg-secondary/40 py-8">
        <div className="container-page grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded border border-border bg-card p-4">
            <Phone className="h-5 w-5 text-primary mb-2" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">
              Technical Hotline
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              +880 9612-PAGE-INTL
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Sat–Thu 8:00–20:00
            </p>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <Mail className="h-5 w-5 text-primary mb-2" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">
              B2B Quotations Desk
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              b2b@page-intl.com
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Official quotes within 24h
            </p>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <ShieldCheck className="h-5 w-5 text-primary mb-2" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">
              Machinery Warranty & AMC
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              claims@page-intl.com
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Certified engineer dispatch
            </p>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <MapPin className="h-5 w-5 text-primary mb-2" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">
              Equipment Demonstration Hub
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Tejgaon I/A, Dhaka
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Showroom & testing bay
            </p>
          </div>
        </div>
      </section>

      {/* Main Section: Dedicated Custom Sourcing & Inquiry Hub */}
      <section className="container-page py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Column: Sourcing Proposition & Commercial Desk */}
          <div>
            <span className="eyebrow text-primary">Custom Sourcing & Inquiries</span>
            <h2 className="display-hero text-foreground leading-[0.9] mt-3">
              NEED EQUIPMENT <br />
              <span className="text-primary">NOT IN OUR SHOP?</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Looking for specialized garage machinery, unlisted OEM replacement parts, diagnostics, or turnkey bay projects? Our commercial procurement desk sources directly from authorized global manufacturers.
            </p>

            {/* 3 Value Pillars */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">
                    24-Hour Quotation Turnaround
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Fast commercial pricing, technical datasheets, and delivery schedules.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <Wrench className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">
                    Custom Technical Specifications
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Machinery sized for your workshop ceiling height, power load, and vehicle mix.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">
                    Official Warranty & Installation
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Certified anchoring, commissioning, and technician operation training.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Desk Hotline */}
            <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded bg-muted/80 px-3.5 py-2 font-mono text-xs sm:text-sm font-bold text-foreground border border-border">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Hotline: +880 9612-PAGE-INTL · b2b@page-intl.com</span>
              </div>
            </div>

            {/* Quick Link Notice */}
            <div className="mt-4 p-3 rounded border border-border/80 bg-muted/30 text-xs text-muted-foreground flex items-center justify-between gap-2">
              <span>
                Looking for products in our store? Explore our{" "}
                <Link to="/shop" className="text-primary font-semibold underline hover:text-primary/80">
                  Shop Catalogue
                </Link>{" "}
                or{" "}
                <Link to="/cart" className="text-primary font-semibold underline hover:text-primary/80">
                  Quotation Cart
                </Link>
                .
              </span>
            </div>
          </div>

          {/* Right Column: Clean, Streamlined Sourcing Form */}
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="border-b border-border pb-4 mb-6">
              <span className="eyebrow text-primary">Procurement Desk</span>
              <h3 className="display-sm text-foreground uppercase mt-1">
                Custom Quotation & Inquiry
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Submit details for custom equipment sourcing, unlisted parts, or general queries.
              </p>
            </div>

            {sent ? (
              <div className="rounded border border-emerald-500/40 bg-emerald-500/10 p-6 text-xs text-foreground text-center py-10">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-500/20 text-emerald-600 mb-3">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h4 className="font-display text-lg uppercase text-foreground">
                  Custom Request Received
                </h4>
                <p className="mt-2 text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong>{formData.contactPerson || formData.businessName}</strong>. Your inquiry regarding <strong>{formData.type}</strong> has been logged. Our procurement team will review specifications and respond with pricing and availability within 24 business hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="btn btn-outline mt-6 h-9 text-xs font-bold uppercase"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!formData.businessName || !formData.phone) return;
                  setSent(true);
                }}
                className="space-y-4"
              >
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground mb-1">
                      Business / Workshop Name *
                    </label>
                    <input
                      required
                      className="field h-10 text-xs"
                      placeholder="e.g. Apex Auto Workshop Ltd."
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({ ...formData, businessName: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground mb-1">
                      Contact Person *
                    </label>
                    <input
                      required
                      className="field h-10 text-xs"
                      placeholder="e.g. Tanvir Ahmed"
                      value={formData.contactPerson}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactPerson: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground mb-1">
                      Phone Number / WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      className="field h-10 text-xs"
                      placeholder="+880 17XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground mb-1">
                      Corporate Email
                    </label>
                    <input
                      type="email"
                      className="field h-10 text-xs"
                      placeholder="procurement@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground mb-1">
                      Inquiry Category *
                    </label>
                    <select
                      className="field h-10 text-xs"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                    >
                      <option>Custom Equipment Sourcing (Not in Shop)</option>
                      <option>Unlisted Spare Part / OEM Part Number Request</option>
                      <option>Turnkey Workshop Bay Setup & Machinery</option>
                      <option>Commercial Fleet & Volume Procurement</option>
                      <option>General Technical or Commercial Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground mb-1">
                      Business Type
                    </label>
                    <select
                      className="field h-10 text-xs"
                      value={formData.businessType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessType: e.target.value,
                        })
                      }
                    >
                      <option value="Workshop">Independent Workshop</option>
                      <option value="Service Center">Service Center Hub</option>
                      <option value="Dealer">Authorized Dealership</option>
                      <option value="Distributor">Wholesale Distributor</option>
                      <option value="Fleet">Commercial Fleet Depot</option>
                      <option value="EV Business">EV Specialized Workshop</option>
                      <option value="Other">Other Automotive Business</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground mb-1">
                    Item Name, Model or OEM Part Number
                  </label>
                  <input
                    className="field h-10 text-xs"
                    placeholder="e.g. Hunter 3D Aligner, In-Ground Scissor Lift, Denso #..."
                    value={formData.products}
                    onChange={(e) =>
                      setFormData({ ...formData, products: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground mb-1">
                    Custom Specifications, Quantities or Query Details *
                  </label>
                  <textarea
                    required
                    className="field h-24 py-2.5 text-xs"
                    placeholder="Provide details about what you need (model number, technical specs, vehicle make/year, required quantity, or your question). Our sourcing desk will verify availability and quote you."
                    value={formData.details}
                    onChange={(e) =>
                      setFormData({ ...formData, details: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary h-11 w-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-2"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Submit Custom Quote Request / Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Dedicated Knowledge Base & FAQs Section with breathing room */}
      <section className="border-t border-border bg-secondary/30 py-16 lg:py-20">
        <div className="container-page">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow text-primary">Support & Documentation</span>
            <h2 className="display-md text-foreground mt-1">
              FREQUENTLY ASKED QUESTIONS & GUIDES
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Common questions regarding equipment delivery, installation, warranty claims, and commercial supply terms.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            {/* Left: FAQs Accordion */}
            <div>
              <Accordion type="single" collapsible className="space-y-2.5">
                {faqs.map(([q, a], idx) => (
                  <AccordionItem
                    key={idx}
                    value={`faq-${idx}`}
                    className="rounded-lg border border-border bg-card px-4"
                  >
                    <AccordionTrigger className="text-left text-xs sm:text-sm font-semibold hover:text-primary py-3.5">
                      {q}
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-4">
                      {a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Right: Technical Guides & Catalogues */}
            <div className="space-y-4">
              <h3 className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-4">
                Automotive Technical Guides & Catalogues
              </h3>
              <div className="space-y-3">
                {guides.map((g) => (
                  <div
                    key={g.slug}
                    className="flex items-center justify-between rounded-lg border border-border bg-card p-4 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <FileText className="h-4 w-4 text-primary shrink-0" />
                      <div>
                        <span className="font-semibold text-xs sm:text-sm text-foreground block">
                          {g.title}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {g.cat} • {g.mins} min read
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-primary flex items-center gap-1 shrink-0">
                      Read <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                ))}
              </div>

              {/* Technical Assistance Callout Box */}
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 sm:p-5 mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Need Comprehensive Equipment PDF Catalogues?
                </h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Our applications engineering team maintains complete dimensional CAD drawings, floor foundation specs, and wiring diagrams for turnkey bays.
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href="mailto:b2b@page-intl.com"
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    Request Technical Datasheet Pack <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
