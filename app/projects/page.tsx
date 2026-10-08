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
import { projects } from '@/data/projects';
import {
  Compass,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Wrench,
  Building2,
  Info,
} from 'lucide-react';

export default function ProjectsPage() {
  const [quoteOpen, setQuoteOpen] = React.useState(false);
  const [activeProjectModal, setActiveProjectModal] = React.useState<any | null>(null);

  const handleOpenDiscussion = (projectTitle?: string) => {
    setActiveProjectModal(
      projectTitle
        ? {
            id: 'proj-quote',
            slug: 'project-consultation',
            name: `Project Consultation: ${projectTitle}`,
            sku: 'PROJ-CS',
            division: 'garage-equipment',
            category: 'workshop-equipment',
            brand: 'PAGE International',
            shortDescription: 'Workshop Project Engineering Consultation',
            description: '',
            images: [],
            keySpecs: [],
            specGroups: [],
            features: [],
            isActive: true,
          }
        : null
    );
    setQuoteOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-page-offwhite">
      {/* 1. Global Navigation */}
      <Navbar onOpenQuote={() => handleOpenDiscussion()} />

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
                <span className="text-white font-semibold">Projects</span>
              </nav>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-page-charcoal border border-page-darkgray text-page-lightgray text-xs font-mono">
                <Compass className="h-3.5 w-3.5 text-page-red" />
                <span>Facility Deployments & Technical Demonstrations</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Project Showcase
              </h1>

              <p className="text-lg md:text-xl text-page-midgray max-w-2xl mx-auto leading-relaxed">
                Representative project deployments and prototype case studies illustrating turnkey workshop layouts, high-throughput wheel lines, and electric vehicle service bays.
              </p>
            </div>
          </Container>
        </section>

        {/* 3. Prototype Disclaimer Bar */}
        <div className="bg-white border-b border-page-lightgray py-3">
          <Container>
            <div className="flex items-center gap-2.5 text-xs text-page-midgray font-mono">
              <Info className="h-4 w-4 text-page-red shrink-0" />
              <span>
                <strong>Prototype Case Studies:</strong> The showcase configurations below represent technical reference layouts and mock engineering specifications.
              </span>
            </div>
          </Container>
        </div>

        {/* 4. Projects Cards Grid */}
        <SectionWrapper variant="light" noPadding className="py-16 md:py-20">
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group flex flex-col justify-between bg-white rounded-lg border border-page-lightgray hover:border-page-red hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div>
                    {/* Media Thumbnail */}
                    <div className="relative aspect-16/9 w-full bg-page-offwhite overflow-hidden border-b border-page-lightgray/80">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-page-nearblack/85 via-page-nearblack/25 to-transparent" />

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 text-xs font-mono font-bold bg-page-nearblack/90 backdrop-blur-xs text-white rounded-xs border border-page-darkgray">
                          {project.projectType}
                        </span>
                        <Badge variant="red" className="text-[10px]">
                          Prototype Case Study
                        </Badge>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="text-[11px] font-mono uppercase text-page-lightgray block">
                          {project.sector}
                        </span>
                        <h3 className="text-xl font-bold text-white group-hover:text-page-red transition-colors">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 md:p-8 space-y-4">
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-page-midgray block">
                          Solution Delivered:
                        </span>
                        <p className="text-sm font-bold text-page-nearblack">
                          {project.solutionProvided}
                        </p>
                      </div>

                      <p className="text-xs text-page-midgray leading-relaxed">
                        {project.description}
                      </p>

                      {/* Equipment Installed */}
                      <div className="space-y-2 pt-2 border-t border-page-lightgray/70">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-page-nearblack font-semibold block">
                          Machinery & Infrastructure Deployed:
                        </span>
                        <ul className="space-y-1.5 text-xs text-page-charcoal">
                          {project.equipmentInstalled.map((eq, eIdx) => (
                            <li key={eIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-page-red shrink-0 mt-0.5" />
                              <span className="leading-snug">{eq}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="p-6 md:p-8 pt-0 mt-2 border-t border-page-lightgray/40 flex items-center justify-between">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => handleOpenDiscussion(project.title)}
                      className="w-full font-bold uppercase tracking-wider text-xs gap-1.5"
                    >
                      <span>Discuss Similar Project</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Quote Modal */}
      <QuoteModal
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        product={activeProjectModal}
      />
    </div>
  );
}
