import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-ink pb-14 pt-36 text-ink-foreground lg:pb-20 lg:pt-48">
      <div className="layout-lines absolute inset-0" aria-hidden />
      <div className="relative px-[clamp(1rem,4vw,3rem)]">
        <p className="chapter text-ink-muted"><span className="text-primary">PAGE</span> / {eyebrow}</p>
        <h1 className="display-giant mt-6 max-w-[14ch]">{title}</h1>
        <div className="mt-10 grid gap-8 border-t border-ink-border pt-6 lg:grid-cols-[1fr_1.4fr]">
          {intro ? <p className="max-w-md text-ink-muted">{intro}</p> : <span />}
          {children && <div>{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-12 flex flex-col gap-6 border-t border-foreground pt-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="chapter text-muted-foreground"><span className="text-primary">PAGE</span> / {eyebrow}</p>}
        <h2 className="display-lg mt-5 max-w-[16ch]">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function Chapter({ n, label, dark }: { n: string; label: string; dark?: boolean }) {
  return (
    <p className={`chapter ${dark ? "text-ink-muted" : "text-muted-foreground"}`}>
      <span className="text-primary">{n}</span> / {label}
    </p>
  );
}
