import { Container } from "@/components/common/Section";
import { SmartLink } from "@/components/common/SmartLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  type PolicyPage,
  faqs,
  aboutPoints,
  groupUrl,
  supportChannels,
} from "@/data/support";

/** Reusable layout for the static policy stub pages. */
export function PolicyStubPage({ policy }: { policy: PolicyPage }) {
  return (
    <div className="py-14 sm:py-[var(--spacing-section)]">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <article className="max-w-3xl">
          <span className="rule-gold mb-4" aria-hidden="true" />
          <p className="label-eyebrow text-teal">{policy.eyebrow}</p>
          <h2 className="mt-3 text-heading text-navy">{policy.title}</h2>
          <p className="mt-4 text-body leading-relaxed text-muted-foreground">{policy.intro}</p>

          <div className="mt-10 space-y-8">
            {policy.sections.map((section) => (
              <section key={section.heading}>
                <h3 className="text-heading text-navy">{section.heading}</h3>
                <p className="mt-2 text-body leading-relaxed text-muted-foreground">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </article>

        <aside className="h-fit space-y-6 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div>
            <p className="label-eyebrow text-teal">Not what you're looking for?</p>
            <p className="mt-2 text-caption text-muted-foreground">
              Policies vary by product. The fastest way to a precise answer is to ask our team.
            </p>
          </div>
          <SmartLink
            to="/support"
            className="block w-full bg-navy px-6 py-2.5 text-center text-body font-medium text-primary-foreground transition-colors hover:bg-beige hover:text-navy"
          >
            Contact customer support
          </SmartLink>
          <div className="border border-border bg-card p-5">
            <p className="label-eyebrow text-teal">Customer support</p>
            <p className="numeric mt-2 text-body font-medium text-navy">1800 209 4455</p>
            <p className="mt-1 text-body text-navy">care@fabluxe.in</p>
            <p className="mt-2 text-caption text-muted-foreground">
              Monday to Saturday, 9am to 8pm IST.
            </p>
          </div>
        </aside>
      </Container>
    </div>
  );
}

/** FAQ page with accordion. */
export function FaqPage() {
  return (
    <div className="py-14 sm:py-[var(--spacing-section)]">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="max-w-3xl">
          <span className="rule-gold mb-4" aria-hidden="true" />
          <p className="label-eyebrow text-teal">Frequently asked questions</p>
          <h2 className="mt-3 text-heading text-navy">
            Answers before you ask
          </h2>
          <p className="mt-4 text-body text-muted-foreground">
            Common questions about ordering, delivery, returns and the three Fabluxe services.
          </p>

          <Accordion type="single" collapsible className="mt-8 border-t border-border">
            {faqs.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger className="text-left text-navy">{item.q}</AccordionTrigger>
                <AccordionContent className="text-body leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <aside className="h-fit space-y-6 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div>
            <p className="label-eyebrow text-teal">Still stuck?</p>
            <p className="mt-2 text-caption text-muted-foreground">
              Our team replies within one working day.
            </p>
          </div>
          <SmartLink
            to="/support"
            className="block w-full bg-navy px-6 py-2.5 text-center text-body font-medium text-primary-foreground transition-colors hover:bg-beige hover:text-navy"
          >
            Contact customer support
          </SmartLink>
        </aside>
      </Container>
    </div>
  );
}

/** About Fabluxe page. */
export function AboutPage() {
  return (
    <div className="py-14 sm:py-[var(--spacing-section)]">
      <Container className="max-w-3xl">
        <span className="rule-gold mb-4" aria-hidden="true" />
        <p className="label-eyebrow text-teal">About Fabluxe</p>
        <h2 className="mt-3 text-heading text-navy">One storefront, three companies</h2>
        <p className="mt-4 text-body leading-relaxed text-muted-foreground">
          Fabluxe is an Indian group. This storefront brings its consumer electronics, interior
          design and trade businesses under one roof — while each order is fulfilled and invoiced
          by the company that actually serves you.
        </p>

        <div className="mt-10 space-y-5">
          {aboutPoints.map((point) => (
            <div key={point.title} className="border border-border bg-card p-6">
              <h3 className="text-heading text-navy">{point.title}</h3>
              <p className="mt-2 text-body leading-relaxed text-muted-foreground">{point.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 border border-border bg-card p-6">
          <p className="text-caption text-muted-foreground">
            Fabluxe Home Solutions (GSTIN <span className="numeric">29AAGCF1234K1ZP</span>) and
            Fabluxora Interiors (GSTIN <span className="numeric">29AAHCF9876M1ZR</span>) are
            separate companies in the Fabluxe group. For the wider group — across more categories
            and geographies —{" "}
            <a
              href={groupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-gold text-gold"
            >
              visit the Fabluxe group website
            </a>
            .
          </p>
        </div>

<div className="mt-10">
          <p className="label-eyebrow text-teal">Talk to us</p>
          <p className="numeric mt-2 text-body font-medium text-navy">
            {supportChannels[0]?.value}
          </p>
          <p className="mt-1 text-body text-navy">{supportChannels[1]?.value}</p>
          <SmartLink
            to="/support"
            className="mt-5 inline-block bg-navy px-6 py-2.5 text-body font-medium text-primary-foreground transition-colors hover:bg-beige hover:text-navy"
          >
            Contact us
          </SmartLink>
        </div>
      </Container>
    </div>
  );
}