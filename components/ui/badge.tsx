import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase transition-colors rounded-sm',
  {
    variants: {
      variant: {
        default: 'bg-page-nearblack text-white',
        red: 'bg-page-red text-white',
        redSubtle: 'bg-page-red/10 text-page-red border border-page-red/20',
        outline: 'border border-page-lightgray text-page-midgray bg-white',
        ev: 'bg-ev-teal text-white',
        evSubtle: 'bg-ev-teal-light text-ev-teal border border-ev-teal/20',
        brand: 'bg-page-charcoal text-white font-mono',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
