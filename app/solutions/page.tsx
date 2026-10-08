'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuoteModal } from '@/components/garage/QuoteModal';
import { workshopSolutions } from '@/data/workshop-solutions';
import {
  Building2,
  TrendingUp,
  Zap,
  ScanLine,
  Disc,
  Settings,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Wrench,
  Compass,
  FileCheck,
  ChevronRight,
  Phone,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="h-6 w-6 text-page-red" />,
  TrendingUp: <TrendingUp className="h-6 w-6 text-page-red" />,
  Zap: <Zap className="h-6 w-6 text-ev-teal" />,
  ScanLine: <ScanLine className="h-6 w-6 text-page-red" />,
  Disc: <Disc className="h-6 w-6 text-page-red" />,
  Settings: <Settings className="h-6 w-6 text-page-red" />,
};

export default function WorkshopSolutionsPage() {
  const [quoteOpen, setQuoteOpen] = React.useState(false);
  const [selectedSolutionTitle, setSelectedSolutionTitle] = React.useState<string | null>(null);

  const handleOpenDiscussion = (solutionTitle?: string) => {
    setSelectedSolutionTitle(solutionTitle || 'Turnkey Workshop Solution Consultation');
    setQuoteOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-page-offwhite">
      {/* 1. Global Navigation */}
      <Navbar onOpenQuote={() => handleOpenDiscussion()} />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <section className="bg-page-nearblack text-white pt-16 pb-20 md:pt-24 md:pb-28 border-b border-page-darkgray relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />

          <Container>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 text-xs font-mono text-page-midgray mb-2">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-white font-semibold">Solutions</span>
              </nav>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-page-charcoal border border-page-darkgray text-page-lightgray text-xs font-mono">
                <Compass className="h-3.5 w-3.5 text-page-red" />
                <span>Turnkey Engineering & Facility Architecture</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Complete Workshop Solutions
              </h1>

              <p className="text-lg md:text-xl text-page-midgray max-w-2xl mx-auto leading-relaxed">
                PAGE International supports automotive workshop businesses far beyond individual equipment sales. We design, supply, install, and commission end-to-end service facilities tailored to your volume and vehicle focus.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => handleOpenDiscussion()}
                  className="w-full sm:w-auto font-bold uppercase tracking-wider text-xs px-8 h-12 gap-2"
                >
                  <span>Discuss Your Workshop</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Link href="/projects" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-page-darkgray text-white hover:bg-page-charcoal font-bold uppercase tracking-wider text-xs px-8 h-12"
                  >
                    <span>View Project Showcase</span>
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* 3. Solutions Cards Grid */}
        <SectionWrapper variant="light" noPadding className="py-16 md:py-20">
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-label text-page-red font-mono font-semibold tracking-wider block">
                Integrated Capabilities
              </span>
              <h2 className="text-h2 font-bold tracking-tight text-page-nearblack">
                End-to-End Workshop Delivery Models
              </h2>
              <p className="text-sm text-page-midgray leading-relaxed">
                Whether establishing a greenfield multi-bay dealership or retrofitting an urban bay for electric vehicle service, explore our structured delivery packages.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workshopSolutions.map((solution) => (
                <div
                  key={solution.id}
                  className="group flex flex-col justify-between bg-white rounded-lg border border-page-lightgray hover:border-page-red hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div>
                    {/* Media Thumbnail */}
                    <div className="relative aspect-16/9 w-full bg-page-offwhite overflow-hidden border-b border-page-lightgray/80">
                      <Image
                        src={solution.image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80'}
                        alt={solution.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-page-nearblack/80 via-page-nearblack/20 to-transparent" />

                      <div className="absolute top-3 left-3">
                        <div className="w-10 h-10 rounded bg-page-nearblack/90 backdrop-blur-xs border border-page-darkgray flex items-center justify-center">
                          {iconMap[solution.icon] || <Wrench className="h-5 w-5 text-page-red" />}
                        </div>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-page-red transition-colors">
                          {solution.title}
                        </h3>
                        <p className="text-xs text-page-lightgray font-medium">
                          {solution.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6 space-y-4">
                      <p className="text-xs text-page-midgray leading-relaxed">
                        {solution.shortDescription}
                      </p>

                      {/* Key Capabilities */}
                      <div className="space-y-2 pt-2 border-t border-page-lightgray/70">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-page-nearblack font-semibold block">
                          Included Engineering Scope:
                        </span>
                        <ul className="space-y-1.5 text-xs text-page-charcoal">
                          {solution.includes.map((inc, iIdx) => (
                            <li key={iIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-page-red shrink-0 mt-0.5" />
                              <span className="leading-snug">{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="p-6 pt-0 mt-2 border-t border-page-lightgray/40">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => handleOpenDiscussion(solution.title)}
                      className="w-full font-bold uppercase tracking-wider text-xs gap-1.5"
                    >
                      <span>Discuss Your Workshop</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* 4. Engineering Process Overview */}
        <SectionWrapper variant="nearblack" noPadding className="py-16 text-white bg-page-nearblack">
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-label text-page-red font-mono font-semibold tracking-wider block">
                Methodology
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Our Structured 3-Stage Project Workflow
              </h2>
              <p className="text-sm text-page-midgray leading-relaxed">
                From initial site measurement to final technician training and equipment handover, every project follows a predictable milestone roadmap.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-technical">
              <div className="p-6 rounded-lg bg-page-charcoal border border-page-darkgray space-y-3 relative">
                <span className="text-3xl font-mono font-black text-page-red/40 block">01</span>
                <h3 className="text-lg font-bold text-white">Site Survey & Blueprinting</h3>
                <p className="text-xs text-page-midgray leading-relaxed">
                  We measure available floor dimensions, ceiling clearance, concrete slab thickness, and single/three-phase electrical supply lines before drafting CAD equipment positioning.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-page-charcoal border border-page-darkgray space-y-3 relative">
                <span className="text-3xl font-mono font-black text-page-red/40 block">02</span>
                <h3 className="text-lg font-bold text-white">Supply & Mechanical Setup</h3>
                <p className="text-xs text-page-midgray leading-relaxed">
                  Certified technicians anchor columns to manufacturer torque specifications, route pneumatic and hydraulic piping, and execute optical laser leveling.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-page-charcoal border border-page-darkgray space-y-3 relative">
                <span className="text-3xl font-mono font-black text-page-red/40 block">03</span>
                <h3 className="text-lg font-bold text-white">Calibration & Staff Training</h3>
                <p className="text-xs text-page-midgray leading-relaxed">
                  Before commercial operation begins, our engineers run proof-load drop tests, configure vehicle diagnostic software databases, and train your staff on safe daily usage.
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* 5. Bottom Consultation Banner */}
        <section className="bg-white py-14 border-t border-page-lightgray">
          <Container>
            <div className="p-8 md:p-12 rounded-lg bg-page-offwhite border border-page-lightgray flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2 max-w-xl text-center md:text-left">
                <Badge variant="red">Facility Engineering Consultation</Badge>
                <h3 className="text-2xl md:text-3xl font-extrabold text-page-nearblack tracking-tight">
                  Planning a New Workshop or Upgrading Service Bays?
                </h3>
                <p className="text-sm text-page-midgray leading-relaxed">
                  Speak with our technical project engineers to evaluate equipment footprints, power requirements, and delivery schedules.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => handleOpenDiscussion()}
                  className="w-full sm:w-auto font-bold uppercase tracking-wider text-xs px-8 h-12"
                >
                  <span>Discuss Your Workshop</span>
                </Button>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full font-bold uppercase tracking-wider text-xs px-8 h-12"
                  >
                    <span>Contact Sales</span>
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Quote Modal */}
      <QuoteModal
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        product={
          selectedSolutionTitle
            ? ({
                id: 'ws-inquiry',
                slug: 'workshop-solution',
                name: selectedSolutionTitle,
                sku: 'SOL-ENG',
                division: 'garage-equipment',
                category: 'workshop-equipment',
                brand: 'PAGE International',
                shortDescription: 'Turnkey Workshop Solution Consultation',
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
