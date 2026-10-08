import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            'flex h-10 w-full appearance-none rounded-md border border-page-lightgray bg-white px-3 py-2 pr-8 text-sm text-page-nearblack focus-visible:outline-none focus-visible:border-page-red focus-visible:ring-1 focus-visible:ring-page-red disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-2.5 top-3 h-4 w-4 pointer-events-none text-page-midgray" />
      </div>
    );
  }
);
Select.displayName = 'Select';

export { Select };
