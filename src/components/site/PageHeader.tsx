import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-ink pb-14 pt-32 text-ink-foreground lg:pb-20 lg:pt-40">
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
      <div className="container-page relative">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-lg mt-4 max-w-4xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-ink-muted">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="display-lg mt-3">{title}</h2>
      </div>
      {action}
    </div>
  );
}
