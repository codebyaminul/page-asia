import Link from 'next/link';
import { Container } from './Container';
import { Logo } from '@/components/ui/Logo';
import { garageCategories, evCategories } from '@/data/categories';
import { workshopSolutions } from '@/data/workshop-solutions';
import { brands } from '@/data/brands';
import { MapPin, Phone, Mail, ShieldAlert, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-page-nearblack text-white border-t border-page-darkgray pt-16 pb-12">
      <Container>
        {/* Top Tier: Brand Statement & Authorized Distributor Badge Strip */}
        <div className="pb-12 border-b border-page-darkgray grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <Logo theme="dark" showTagline={true} />
            <p className="text-sm text-page-lightgray/70 leading-relaxed max-w-md pt-2">
              PAGE International Ltd. delivers professional automotive garage equipment, complete turnkey workshop engineering, and 2-wheeler / 3-wheeler electric vehicle components across Bangladesh.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-page-midgray block mb-2">
                Selected Technology Brands
              </span>
              <div className="flex flex-wrap gap-2">
                {brands.map((b) => (
                  <span
                    key={b.id}
                    className="inline-flex items-center px-2.5 py-1 text-xs font-bold font-mono tracking-wider bg-page-charcoal border border-page-darkgray text-white rounded-xs"
                  >
                    {b.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Garage Equipment Categories */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-page-lightgray border-b border-page-darkgray/80 pb-2">
                Garage Equipment
              </h4>
              <ul className="space-y-2 text-xs">
                {garageCategories.slice(0, 6).map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/garage-equipment/${c.slug}`}
                      className="text-page-midgray hover:text-white transition-colors"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/garage-equipment"
                    className="text-page-red font-semibold hover:underline inline-flex items-center gap-0.5 pt-1"
                  >
                    All Equipment <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* EV Parts Categories */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-ev-teal border-b border-page-darkgray/80 pb-2">
                EV Parts Division
              </h4>
              <ul className="space-y-2 text-xs">
                {evCategories.slice(0, 6).map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/ev-parts/${c.slug}`}
                      className="text-page-midgray hover:text-ev-teal transition-colors"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/ev-parts"
                    className="text-ev-teal font-semibold hover:underline inline-flex items-center gap-0.5 pt-1"
                  >
                    EV Discovery Hub <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Workshop Solutions & Services */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-page-lightgray border-b border-page-darkgray/80 pb-2">
                Solutions & Services
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/solutions" className="text-page-midgray hover:text-white transition-colors">
                    Workshop Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-page-midgray hover:text-white transition-colors">
                    Engineering Services
                  </Link>
                </li>
                <li>
                  <Link href="/brands" className="text-page-midgray hover:text-white transition-colors">
                    Technology Brands
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-page-midgray hover:text-white transition-colors">
                    Case Studies & Projects
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-page-midgray hover:text-white transition-colors">
                    About PAGE
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="text-page-midgray hover:text-white transition-colors">
                    News & Insights
                  </Link>
                </li>
                <li>
                  <Link
                    href="/request-quote"
                    className="text-page-red font-semibold hover:underline inline-flex items-center gap-0.5 pt-1"
                  >
                    Request a Quote <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Middle Tier: Contact & Location (Strictly Verified / Prototype Placeholders) */}
        <div className="py-8 border-b border-page-darkgray grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-page-lightgray/80">
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-page-red shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Corporate Office & Facility</span>
              <p className="text-page-midgray mt-0.5">
                Uttara, Dhaka, Bangladesh <span className="text-[10px] text-page-midgray/60 font-mono">(Verified Area)</span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="h-4 w-4 text-page-red shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Commercial Inquiries</span>
              <p className="text-page-midgray mt-0.5 font-mono">
                [Prototype Contact Placeholder — Use Inquiry Form]
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="h-4 w-4 text-page-red shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Digital Correspondence</span>
              <p className="text-page-midgray mt-0.5 font-mono">
                info@page-asia.com <span className="text-[10px] text-page-midgray/60 font-mono">(Official Domain)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Prototype Disclosure & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-page-midgray">
          <div className="flex items-center gap-2 text-page-lightgray/60">
            <ShieldAlert className="h-3.5 w-3.5 text-page-red" />
            <span>
              PAGE International Modernization Prototype · Built for B2B Evaluation
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} PAGE International Ltd. All rights reserved.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
