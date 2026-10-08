import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  theme?: 'dark' | 'light';
  className?: string;
  showTagline?: boolean;
}

export function Logo({ theme = 'dark', className, showTagline = false }: LogoProps) {
  const isDark = theme === 'dark';

  return (
    <Link href="/" className={cn('inline-flex items-center gap-3 select-none group', className)}>
      {/* Precision Industrial Mark */}
      <div className="relative flex items-center justify-center w-9 h-9 bg-page-nearblack border border-page-darkgray rounded-sm shadow-sm group-hover:border-page-red transition-colors">
        <span className="text-page-red font-black text-xl tracking-tighter leading-none">P</span>
        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-page-red rounded-xs" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={cn(
              'font-black text-xl tracking-tight transition-colors',
              isDark ? 'text-white' : 'text-page-nearblack'
            )}
          >
            PAGE
          </span>
          <span className="text-page-red font-bold text-lg">/</span>
          <span
            className={cn(
              'text-xs font-semibold tracking-widest uppercase transition-colors',
              isDark ? 'text-page-lightgray/90' : 'text-page-midgray'
            )}
          >
            INTERNATIONAL
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] tracking-wider uppercase text-page-midgray font-mono mt-0.5">
            Workshop & EV Solutions
          </span>
        )}
      </div>
    </Link>
  );
}
