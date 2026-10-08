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
    type: "Garage Equipment & Machinery",
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

      {/* Form & FAQs */}
      <section className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Request a Quote */}
          <div>
            <div className="border-b border-border pb-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Commercial Inquiries
              </span>
              <h2 className="display-md mt-1 text-foreground">
                REQUEST A COMMERCIAL QUOTE
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                For garage machinery, turnkey workshop bay planning, volume spare parts, or fleet maintenance supply contracts.
              </p>
            </div>

            {sent ? (
              <div className="rounded border border-emerald-500/40 bg-emerald-500/10 p-6 text-xs text-foreground">
                <p className="font-bold text-sm text-emerald-600 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" /> Quotation Request Received
                </p>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Thank you, <strong>{formData.contactPerson || formData.businessName}</strong>. Your inquiry for <strong>{formData.type}</strong> has been logged with our commercial applications desk. An official B2B quotation will be dispatched to <strong>{formData.email || formData.phone}</strong> within 24 business hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="btn btn-outline mt-5 h-9 text-xs font-bold uppercase"
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
                className="space-y-4 rounded border border-border bg-card p-6 shadow-xs"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                      Business / Workshop Name *
                    </label>
                    <input
                      required
                      className="field"
                      placeholder="e.g. Dhaka Auto Tech Ltd."
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({ ...formData, businessName: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                      Contact Person *
                    </label>
                    <input
                      required
                      className="field"
                      placeholder="e.g. Engr. Tanvir Ahmed"
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                      Phone Number / WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      className="field"
                      placeholder="+880 17XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                      Corporate Email
                    </label>
                    <input
                      type="email"
                      className="field"
                      placeholder="procurement@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                      Business Type
                    </label>
                    <select
                      className="field"
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

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                      City / Location
                    </label>
                    <input
                      className="field"
                      placeholder="e.g. Dhaka, Chattogram, Bogura"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                      Inquiry Category *
                    </label>
                    <select
                      className="field"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                    >
                      <option>Garage Equipment & Machinery</option>
                      <option>Turnkey Workshop Bay Setup</option>
                      <option>EV Diagnostics & High-Voltage Tooling</option>
                      <option>Wholesale Spare Parts Supply</option>
                      <option>Fleet Maintenance Scheduled Supply</option>
                      <option>Annual Maintenance Contract (AMC)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                      Target Equipment / Model
                    </label>
                    <input
                      className="field"
                      placeholder="e.g. 2-Post Lift 4.0T, Tyre Changer TC-820"
                      value={formData.products}
                      onChange={(e) =>
                        setFormData({ ...formData, products: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                    Bay Specifications / Requirements *
                  </label>
                  <textarea
                    required
                    className="field h-24 py-2.5"
                    placeholder="Specify machinery requirements (e.g., 4-ton 2-post lift, 380V power available, bay ceiling height), required spare part numbers, or fleet vehicle models."
                    value={formData.details}
                    onChange={(e) =>
                      setFormData({ ...formData, details: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary h-11 w-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Submit Commercial Quotation Request</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Technical FAQs & Guides */}
          <div>
            <div className="border-b border-border pb-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Knowledge Base & FAQs
              </span>
              <h2 className="display-md mt-1 text-foreground">
                FREQUENTLY ASKED QUESTIONS
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map(([q, a], idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="rounded border border-border bg-card px-4"
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

            {/* Guides Section */}
            <div className="mt-12 border-t border-border pt-8">
              <h3 className="font-display text-xl font-bold uppercase text-foreground mb-4">
                Automotive Technical Guides & Catalogues
              </h3>
              <div className="space-y-3">
                {guides.map((g) => (
                  <div
                    key={g.slug}
                    className="flex items-center justify-between rounded border border-border bg-card p-3.5 hover:border-foreground/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-primary shrink-0" />
                      <div>
                        <span className="font-semibold text-xs text-foreground block">
                          {g.title}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {g.cat} • {g.mins} min read
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-primary flex items-center gap-1">
                      Read <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
