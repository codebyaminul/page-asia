'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-page-red focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-page-red text-white hover:bg-page-red-hover active:scale-[0.98] shadow-sm',
        secondary:
          'bg-page-charcoal text-white hover:bg-page-nearblack active:scale-[0.98]',
        outline:
          'border border-page-lightgray bg-transparent text-page-nearblack hover:bg-page-offwhite hover:border-page-midgray',
        outlineDark:
          'border border-page-darkgray bg-transparent text-white hover:bg-page-charcoal hover:border-page-midgray',
        ghost:
          'text-page-nearblack hover:bg-page-offwhite',
        ghostDark:
          'text-white hover:bg-page-charcoal',
        link:
          'text-page-red underline-offset-4 hover:underline p-0 h-auto',
        ev:
          'bg-ev-teal text-white hover:bg-[#09575A] active:scale-[0.98] shadow-sm',
        evOutline:
          'border border-ev-teal/30 text-ev-teal hover:bg-ev-teal-light hover:border-ev-teal',
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded',
        md: 'h-10 px-4 text-sm rounded-md',
        lg: 'h-12 px-6 text-base rounded-md font-semibold',
        icon: 'h-10 w-10 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
