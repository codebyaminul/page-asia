import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { images } from "@/lib/data";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About PAGE International Ltd." }, { name: "description", content: "PAGE International brings automotive parts, service, equipment and technology together." }, { property: "og:title", content: "About PAGE International" }, { property: "og:description", content: "Automotive parts, service and technology." }] }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader eyebrow="About" title="An automotive ecosystem, under one name" />
      <section className="container-page grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <img src={images.workshop} alt="PAGE workshop" loading="lazy" width={1600} height={1008} className="aspect-[4/3] w-full object-cover" />
        <div className="flex flex-col justify-center">
          <p className="text-lg leading-relaxed">PAGE International Ltd. supplies automotive parts, workshop equipment and diagnostic technology, and supports drivers and businesses through service and solutions.</p>
          <p className="mt-4 text-muted-foreground">This prototype uses illustrative content. Company history, figures and partner brands should be replaced with verified information.</p>
          <div className="mt-8 flex gap-3"><Link to="/solutions" className="btn btn-dark">Our solutions</Link><Link to="/support" className="btn btn-outline">Contact us</Link></div>
        </div>
      </section>
    </>
  );
}
