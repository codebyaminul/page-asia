import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHeader } from "@/components/site/PageHeader";
import { guides } from "@/lib/data";

export const Route = createFileRoute("/support")({
  head: () => ({ meta: [{ title: "Support, Quotes & Guides — PAGE" }, { name: "description", content: "Contact PAGE support, request a quotation, read FAQs and automotive guides." }, { property: "og:title", content: "Support & Quotes — PAGE" }, { property: "og:description", content: "Get help, request a quote and read guides." }] }),
  component: Support,
});

const faqs: [string, string][] = [
  ["How do I know a part fits my vehicle?", "Save your vehicle in My Garage or use the vehicle finder; compatible products are highlighted. If unsure, contact support with your VIN."],
  ["Can PAGE install parts I buy online?", "Yes — choose ‘Book installation’ on any product page to schedule fitting at a service center."],
  ["What warranty applies?", "Warranty varies by product and is listed on each product page. Keep your invoice for claims."],
  ["Do you supply workshops and fleets?", "Yes. Use the quotation form for volume pricing, equipment and setup."],
];

function Support() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader eyebrow="Support" title="How can we help?" intro="Contact details below are placeholders for the prototype." />
      <section className="container-page grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <h2 className="display-md">Request a quote</h2>
          {sent ? <p className="mt-6 border-l-2 border-success bg-secondary p-5 text-sm">Thanks — your request was captured (demo only). Our team would contact you within one business day.</p> : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium">Name<input required className="field mt-1.5" /></label>
              <label className="text-sm font-medium">Phone<input required type="tel" className="field mt-1.5" /></label>
              <label className="text-sm font-medium sm:col-span-2">Type<select className="field mt-1.5"><option>Parts</option><option>Workshop equipment</option><option>Fleet maintenance</option><option>Garage setup</option><option>Other</option></select></label>
              <label className="text-sm font-medium sm:col-span-2">Details<textarea required className="field mt-1.5 h-32 py-3" /></label>
              <button className="btn btn-primary sm:col-span-2">Send request</button>
            </form>
          )}
        </div>
        <div>
          <h2 className="display-md">FAQ</h2>
          <Accordion type="single" collapsible className="mt-4">
            {faqs.map(([q, a]) => <AccordionItem key={q} value={q}><AccordionTrigger className="text-left text-base">{q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{a}</AccordionContent></AccordionItem>)}
          </Accordion>
          <h2 className="display-md mt-12">Guides</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {guides.map((g) => <li key={g.slug} className="flex justify-between gap-4 py-4 text-sm"><span className="font-medium">{g.title}</span><span className="shrink-0 text-muted-foreground">{g.mins} min</span></li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
