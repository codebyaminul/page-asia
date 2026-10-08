import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  badge?: string;
  badgeVariant?: 'red' | 'ev' | 'default';
  theme?: 'dark' | 'light';
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  badge,
  badgeVariant = 'red',
  theme = 'dark',
  children,
}: PageHeaderProps) {
  const isDark = theme === 'dark';

  return (
    <div
      className={cn(
        'relative border-b py-12 md:py-16 lg:py-20',
        isDark
          ? 'bg-page-nearblack text-white border-page-darkgray'
          : 'bg-page-offwhite text-page-nearblack border-page-lightgray'
      )}
    >
      {/* Background industrial architectural grid subtle overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${isDark ? '#FFF' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#FFF' : '#000'} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <Container>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center space-x-1.5 text-xs text-page-midgray">
            <Link
              href="/"
              className={cn(
                'transition-colors',
                isDark ? 'hover:text-white' : 'hover:text-page-nearblack'
              )}
            >
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="h-3 w-3 shrink-0 text-page-midgray/60" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className={cn(
                      'transition-colors',
                      isDark ? 'hover:text-white' : 'hover:text-page-nearblack'
                    )}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={cn('font-medium', isDark ? 'text-white' : 'text-page-nearblack')}>
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-3xl">
            {badge && (
              <div className="mb-3">
                <Badge variant={badgeVariant}>{badge}</Badge>
              </div>
            )}
            <h1 className="text-h1 font-bold tracking-tight leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p
                className={cn(
                  'mt-3 text-body-lg leading-relaxed max-w-2xl',
                  isDark ? 'text-page-lightgray/80' : 'text-page-midgray'
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
          {children && <div className="shrink-0">{children}</div>}
        </div>
      </Container>
    </div>
  );
}
