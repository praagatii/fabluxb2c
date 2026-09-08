import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, Container } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { ConsultationBooking } from "@/components/interiors/ConsultationBooking";
import { howItWorks } from "@/data/interiors";

export const Route = createFileRoute("/interior-design/consultation")({
  head: () => ({
    meta: [
      { title: "Book an Interior Design Consultation — Fabluxora Interiors" },
      {
        name: "description",
        content:
          "Meet a senior Fabluxora Interiors designer at the studio or at your home. Share a floor plan and we return with a direction and scope of work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Book an Interior Design Consultation" },
      {
        property: "og:description",
        content: "A conversation with a senior designer about layout, light and how you live.",
      },
    ],
  }),
  component: ConsultationPage,
});

function ConsultationPage() {


  return (
    <div className="bg-background">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Interior Design", to: "/interior-design" },
            { label: "Consultation" },
          ]}
        />
      </Container>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="rule-gold mb-4" aria-hidden="true" />
            <p className="label-eyebrow text-teal">Consultation</p>
            <h1 className="mt-3 font-display text-display leading-tight text-navy">
              An hour with a senior designer
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#booking"
                className="bg-navy px-7 py-2.5 text-body font-medium text-primary-foreground transition-colors hover:bg-beige hover:text-navy"
              >
                Book a consultation
              </a>
              <a
                href="/support"
                className="border border-navy px-7 py-2.5 text-body font-medium text-navy transition-colors hover:border-gold hover:text-teal"
              >
                Contact customer support
              </a>
            </div>
          </div>

          <ol className="grid gap-4">
            {howItWorks.map((step) => (
              <li key={step.id} className="border border-border bg-card p-6">
                <p className="font-display text-heading text-gold">{step.step}</p>
                <h2 className="mt-2 text-heading text-navy">{step.title}</h2>
                <p className="mt-2 text-caption leading-relaxed text-muted-foreground">{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="bg-beige" id="booking">
        <SectionHeading
          eyebrow="Consultation booking"
          title="Choose a mode, a date and a time"
        />
        <div className="mt-8">
          <ConsultationBooking />
        </div>
      </Section>

      <Section>

        <SectionHeading
          eyebrow="Before you book"
          title="Where to start"
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/interior-design"
            className="border border-navy px-6 py-3 text-body text-navy transition-colors hover:border-gold hover:text-teal"
          >
            Browse room styles
          </Link>
          <Link
            to="/interior-design/portfolio"
            className="border border-navy px-6 py-3 text-body text-navy transition-colors hover:border-gold hover:text-teal"
          >
            See completed projects
          </Link>
        </div>
      </Section>

    </div>
  );
}
