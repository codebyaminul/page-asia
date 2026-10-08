'use client';

import * as React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuoteModal } from '@/components/garage/QuoteModal';
import { services } from '@/data/services';
import {
  Wrench,
  Settings,
  Headphones,
  GraduationCap,
  ShieldCheck,
  Package,
  CheckCircle2,
  ArrowRight,
  Clock,
  Phone,
  ChevronRight,
  Toolbox,
  Cpu,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Wrench: <Wrench className="h-6 w-6 text-page-red" />,
  Settings: <Settings className="h-6 w-6 text-page-red" />,
  Headphones: <Headphones className="h-6 w-6 text-page-red" />,
  GraduationCap: <GraduationCap className="h-6 w-6 text-page-red" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6 text-page-red" />,
  Package: <Package className="h-6 w-6 text-page-red" />,
};

export default function ServicesPage() {
  const [quoteOpen, setQuoteOpen] = React.useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = React.useState<string | null>(null);

  const handleOpenServiceInquiry = (serviceTitle?: string) => {
    setSelectedServiceTitle(serviceTitle || 'Technical Service Inquiry');
    setQuoteOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-page-offwhite">
      {/* 1. Global Navigation */}
      <Navbar onOpenQuote={() => handleOpenServiceInquiry()} />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <section className="bg-page-nearblack text-white pt-16 pb-20 md:pt-24 md:pb-28 border-b border-page-darkgray relative overflow-hidden">
          <Container>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 text-xs font-mono text-page-midgray mb-2">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-white font-semibold">Services</span>
              </nav>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-page-charcoal border border-page-darkgray text-page-lightgray text-xs font-mono">
                <Wrench className="h-3.5 w-3.5 text-page-red" />
                <span>Field Engineering & Technical After-Sales</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Technical Services & Support
              </h1>

              <p className="text-lg md:text-xl text-page-midgray max-w-2xl mx-auto leading-relaxed">
                Industrial equipment is only as dependable as the technical team backing it. Our certified field engineers deliver professional installation, scheduled preventive maintenance, calibration, and genuine parts supply.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => handleOpenServiceInquiry()}
                  className="w-full sm:w-auto font-bold uppercase tracking-wider text-xs px-8 h-12 gap-2"
                >
                  <span>Request Service Support</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-page-darkgray text-white hover:bg-page-charcoal font-bold uppercase tracking-wider text-xs px-8 h-12"
                  >
                    <span>Contact Helpdesk</span>
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* 3. Services Breakdown */}
        <SectionWrapper variant="light" noPadding className="py-16 md:py-20">
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-label text-page-red font-mono font-semibold tracking-wider block">
                Lifecycle Care
              </span>
              <h2 className="text-h2 font-bold tracking-tight text-page-nearblack">
                Comprehensive Technical Service Portfolio
              </h2>
              <p className="text-sm text-page-midgray leading-relaxed">
                Tailored service agreements supporting automotive dealerships, fleet garages, tyre centers, and electric vehicle service bays.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group flex flex-col justify-between bg-white rounded-lg border border-page-lightgray hover:border-page-red hover:shadow-lg transition-all duration-300 p-6 md:p-8 space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded bg-page-offwhite border border-page-lightgray flex items-center justify-center">
                        {iconMap[service.icon] || <Wrench className="h-6 w-6 text-page-red" />}
                      </div>
                      <Badge variant="brand" className="text-[10px] font-mono">
                        Certified Service
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-page-nearblack group-hover:text-page-red transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs text-page-midgray leading-relaxed">
                      {service.description}
                    </p>

                    <div className="pt-2 border-t border-page-lightgray/80 space-y-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-page-nearblack font-semibold block">
                        Core Service Scope:
                      </span>
                      <ul className="space-y-1.5 text-xs text-page-charcoal">
                        {service.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-page-red shrink-0 mt-0.5" />
                            <span className="leading-snug">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-page-lightgray/60">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenServiceInquiry(service.title)}
                      className="w-full text-xs font-semibold hover:border-page-red transition-colors justify-between"
                    >
                      <span>Inquire About {service.title}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* 4. SLA & Guarantee Highlights */}
        <SectionWrapper variant="nearblack" noPadding className="py-16 text-white bg-page-nearblack">
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-label text-page-red font-mono font-semibold tracking-wider block">
                Commitment to Uptime
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Service Level Agreements & Guarantee
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-technical">
              <div className="p-5 rounded bg-page-charcoal border border-page-darkgray space-y-2">
                <Clock className="h-6 w-6 text-page-red" />
                <h4 className="text-sm font-bold text-white">Rapid Field Dispatch</h4>
                <p className="text-xs text-page-midgray leading-relaxed">
                  Fast emergency response protocol for mission-critical lifting and diagnostic breakdowns.
                </p>
              </div>

              <div className="p-5 rounded bg-page-charcoal border border-page-darkgray space-y-2">
                <Package className="h-6 w-6 text-page-red" />
                <h4 className="text-sm font-bold text-white">Genuine OEM Parts</h4>
                <p className="text-xs text-page-midgray leading-relaxed">
                  Direct factory replacement seals, sensors, and mechanical assemblies with warranty backed fitment.
                </p>
              </div>

              <div className="p-5 rounded bg-page-charcoal border border-page-darkgray space-y-2">
                <ShieldCheck className="h-6 w-6 text-page-red" />
                <h4 className="text-sm font-bold text-white">Safety Audits</h4>
                <p className="text-xs text-page-midgray leading-relaxed">
                  Proof-load drop testing and hydraulic pressure testing ensuring workplace safety standards compliance.
                </p>
              </div>

              <div className="p-5 rounded bg-page-charcoal border border-page-darkgray space-y-2">
                <GraduationCap className="h-6 w-6 text-page-red" />
                <h4 className="text-sm font-bold text-white">Technician Training</h4>
                <p className="text-xs text-page-midgray leading-relaxed">
                  Regular operational refresher sessions to help workshops maximize machinery longevity.
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Service Request Quote Modal */}
      <QuoteModal
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        product={
          selectedServiceTitle
            ? ({
                id: 'svc-inquiry',
                slug: 'service-request',
                name: selectedServiceTitle,
                sku: 'SVC-REQ',
                division: 'garage-equipment',
                category: 'workshop-equipment',
                brand: 'PAGE International',
                shortDescription: 'Technical Service & Maintenance Inquiry',
                description: '',
                images: [],
                keySpecs: [],
                specGroups: [],
                features: [],
                isActive: true,
              } as any)
            : null
        }
      />
    </div>
  );
}
