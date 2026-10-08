import * as React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

export interface SectionWrapperProps
  extends React.HTMLAttributes<HTMLElement> {
  variant?: 'light' | 'offwhite' | 'charcoal' | 'nearblack' | 'darkgray';
  containerSize?: 'default' | 'narrow' | 'wide' | 'full';
  noPadding?: boolean;
}

export const SectionWrapper = React.forwardRef<
  HTMLElement,
  SectionWrapperProps
>(
  (
    {
      className,
      variant = 'light',
      containerSize = 'default',
      noPadding = false,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      light: 'bg-white text-page-nearblack',
      offwhite: 'bg-page-offwhite text-page-nearblack border-y border-page-lightgray/60',
      charcoal: 'bg-page-charcoal text-white',
      nearblack: 'bg-page-nearblack text-white',
      darkgray: 'bg-page-darkgray text-white',
    };

    return (
      <section
        ref={ref}
        className={cn(
          variantStyles[variant],
          !noPadding && 'py-16 md:py-24 lg:py-28',
          'relative w-full overflow-hidden',
          className
        )}
        {...props}
      >
        <Container size={containerSize}>{children}</Container>
      </section>
    );
  }
);
SectionWrapper.displayName = 'SectionWrapper';
