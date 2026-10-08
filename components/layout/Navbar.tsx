'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationItems } from '@/data/navigation';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { MegaMenu } from './MegaMenu';
import { MobileNav } from './MobileNav';
import { ChevronDown, Menu, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface NavbarProps {
  onOpenQuoteModal?: () => void;
  onOpenQuote?: () => void;
}

export function Navbar({ onOpenQuoteModal, onOpenQuote }: NavbarProps) {
  const triggerQuote = onOpenQuote || onOpenQuoteModal;
  const pathname = usePathname();

  const [activeMegaMenu, setActiveMegaMenu] = React.useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu on route change
  React.useEffect(() => {
    setActiveMegaMenu(null);
    setIsMobileNavOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full bg-page-nearblack border-b border-page-darkgray transition-all duration-200 select-none',
          isScrolled ? 'shadow-xl' : ''
        )}
      >
        <Container>
          <div className="flex h-20 items-center justify-between">
            {/* Left: Brand Identity */}
            <div className="flex items-center gap-8">
              <Logo theme="dark" showTagline={false} />
            </div>

            {/* Center: Desktop Navigation Bar */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
              {navigationItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));
                const isMegaOpen = activeMegaMenu === item.label;
                const isEV = item.megaMenuVariant === 'ev';

                if (item.hasMegaMenu) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setActiveMegaMenu(item.label)}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMegaMenu((prev) =>
                            prev === item.label ? null : item.label
                          )
                        }
                        className={cn(
                          'inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold transition-colors rounded-sm cursor-pointer',
                          isActive
                            ? isEV ? 'text-ev-teal' : 'text-page-red'
                            : 'text-page-lightgray hover:text-white',
                          isMegaOpen && (isEV ? 'text-ev-teal' : 'text-page-red')
                        )}
                        aria-expanded={isMegaOpen}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            'h-3.5 w-3.5 transition-transform duration-200',
                            isMegaOpen && 'rotate-180',
                            isEV && isMegaOpen ? 'text-ev-teal' : ''
                          )}
                        />
                      </button>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onMouseEnter={() => setActiveMegaMenu(null)}
                    className={cn(
                      'px-3.5 py-2 text-sm font-semibold transition-colors rounded-sm',
                      isActive
                        ? 'text-page-red'
                        : 'text-page-lightgray hover:text-white'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              <Link href="/request-quote" className="hidden sm:inline-flex">
                <Button
                  variant="primary"
                  size="md"
                  onClick={(e) => {
                    if (triggerQuote) {
                      e.preventDefault();
                      triggerQuote();
                    }
                  }}
                  className="font-bold uppercase tracking-wider text-xs gap-1.5 px-5 h-10 shadow-sm"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>


              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden p-2 rounded-md text-white hover:bg-page-charcoal transition-colors cursor-pointer"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </Container>

        {/* Desktop Mega Menus */}
        {navigationItems.map(
          (item) =>
            item.hasMegaMenu && (
              <MegaMenu
                key={item.label}
                item={item}
                isOpen={activeMegaMenu === item.label}
                onClose={() => setActiveMegaMenu(null)}
              />
            )
        )}
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenQuoteModal={onOpenQuoteModal}
      />
    </>
  );
}
