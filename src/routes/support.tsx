import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  FileText,
  Headphones,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHeader } from "@/components/site/PageHeader";
import { guides } from "@/lib/data";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Technical Support, B2B Quotations & Guides — PAGE International" },
      {
        name: "description",
        content: "Contact PAGE automotive technical support, request equipment or fleet quotations, view warranty terms and read maintenance guides.",
      },
      { property: "og:title", content: "PAGE Support & Quotes" },
      { property: "og:description", content: "Direct technical assistance, quotations and automotive guides." },
    ],
  }),
  component: Support,
});

const faqs: [string, string][] = [
  [
    "How do I verify if a part fits my vehicle?",
    "Use our Vehicle Fitment Finder on the homepage, shop page, or save your vehicle in My Garage. Our catalogue cross-references OE part numbers against engine code and chassis specifications. If your vehicle has aftermarket modifications, send your 17-digit VIN to our support team for physical measurement confirmation.",
  ],
  [
    "Does PAGE supply equipment installation and technician training?",
    "Yes. For commercial workshop equipment (2-post lifts, tyre changers, wheel balancers, and compressors), PAGE provides certified installation, concrete floor anchoring inspection, electrical 3-phase wiring verification, and 1-day operator training at your workshop premises.",
  ],
  [
    "What warranty is provided on garage equipment and spare parts?",
    "Heavy-duty garage equipment carries 18 to 36 months of commercial warranty covering hydraulic rams, motors, and structural steel. Mechanical replacement parts carry standard 12-month manufacturer defect warranties. Keep your PAGE invoice for expedited claims.",
  ],
  [
    "Can PAGE fulfill bulk fleet supply and volume workshop procurement?",
    "Yes. We support corporate fleet operators, taxi fleets, and multi-bay garages with centralized B2B purchasing, monthly billing terms, and scheduled spare parts delivery.",
  ],
  [
    "Can I schedule installation at a PAGE Service Center?",
    "Absolutely. When purchasing any part online, select 'Book Installation' or request fitting at our Tejgaon, Gulshan, Uttara, or Chattogram service hubs during checkout.",
  ],
];

export function Support() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    type: "Workshop Machinery",
    details: "",
  });

  return (
    <div className="bg-background text-foreground min-h-screen">
      <PageHeader
        eyebrow="Commercial Support"
        title="Technical Assistance & B2B Quotations"
        intro="Have a question regarding vehicle compatibility, machine specifications, or commercial fleet terms? Our technical advisors and workshop engineers are here to support you."
      />

      {/* Direct Contact Cards */}
      <section className="border-b border-border bg-secondary/40 py-8">
        <div className="container-page grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded border border-border bg-card p-4">
            <Phone className="h-5 w-5 text-primary mb-2" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">
              Technical Hotline
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">+880 9612-PAGE-INTL</p>
            <p className="text-[11px] text-muted-foreground mt-1">Sat–Thu 8:00–20:00</p>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <Mail className="h-5 w-5 text-primary mb-2" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">
              B2B Quotations Desk
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">b2b@page-intl.com</p>
            <p className="text-[11px] text-muted-foreground mt-1">2-hour email response</p>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <ShieldCheck className="h-5 w-5 text-primary mb-2" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">
              Warranty & Claims
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">claims@page-intl.com</p>
            <p className="text-[11px] text-muted-foreground mt-1">Direct invoice verification</p>
          </div>

          <div className="rounded border border-border bg-card p-4">
            <MapPin className="h-5 w-5 text-primary mb-2" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">
              Central Distribution Hub
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Tejgaon I/A, Dhaka</p>
            <p className="text-[11px] text-muted-foreground mt-1">Showroom & testing bay</p>
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
                Direct Inquiries
              </span>
              <h2 className="display-md mt-1 text-foreground">REQUEST A COMMERCIAL QUOTE</h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                For garage machinery, turnkey workshop setup, volume spare parts, or fleet maintenance contracts.
              </p>
            </div>

            {sent ? (
              <div className="rounded border border-success/40 bg-success/10 p-6 text-xs text-foreground">
                <p className="font-bold text-sm text-success flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" /> Quotation Request Received
                </p>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your inquiry for <strong>{formData.type}</strong> has been assigned to a PAGE commercial account specialist. We will contact you at <strong>{formData.phone}</strong> within one business day.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="btn btn-outline mt-5 h-9 text-xs"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-4 rounded border border-border bg-card p-6 shadow-xs"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                      Full Name / Contact Person *
                    </label>
                    <input
                      required
                      className="field"
                      placeholder="e.g. Engr. Tanvir Ahmed"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      className="field"
                      placeholder="+880 1..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="field"
                      placeholder="contact@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                      Inquiry Category *
                    </label>
                    <select
                      className="field"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option>Workshop Machinery (Lifts, Tyre, Balancer)</option>
                      <option>Turnkey Garage Bay Setup</option>
                      <option>Commercial Fleet Parts Contract</option>
                      <option>Electronic Diagnostics & Tools</option>
                      <option>Retail Spare Parts Inquiry</option>
                      <option>Warranty Claim / Service Assistance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                    Details / Machinery Specifications / Vehicle Model *
                  </label>
                  <textarea
                    required
                    className="field h-28 py-2.5"
                    placeholder="Specify machinery requirements (e.g., 4-ton 2-post lift, 380V power available, bay ceiling height), required spare part numbers, or fleet vehicle models."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary h-11 w-full text-xs font-bold uppercase tracking-wider"
                >
                  Submit Quotation Request
                </button>
              </form>
            )}
          </div>

          {/* Right: Technical FAQs & Guides */}
          <div>
            <div className="border-b border-border pb-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Knowledge Base
              </span>
              <h2 className="display-md mt-1 text-foreground">FREQUENTLY ASKED QUESTIONS</h2>
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
                Automotive Technical Guides
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
