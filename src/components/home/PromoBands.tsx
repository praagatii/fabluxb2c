import interiorsImage from "@/assets/band-interiors.jpg";
import b2bImage from "@/assets/band-b2b.jpg";
import { Container } from "@/components/common/Section";
import { SmartLink } from "@/components/common/SmartLink";

export function InteriorDesignBand() {
  return (
    <section className="py-14 sm:py-[var(--spacing-section)]">
      <Container>
        <div className="grid items-stretch gap-0 border border-border bg-card lg:grid-cols-2">
          <img
            src={interiorsImage}
            alt="A Fabluxora Interiors living room in navy velvet, brass and linen"
            loading="lazy"
            width={1200}
            height={900}
            className="h-64 w-full object-cover lg:h-full"
          />
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <span className="rule-gold mb-4" aria-hidden="true" />
            <p className="label-eyebrow text-teal">Fabluxora Interiors</p>
            <h2 className="font-display mt-3 text-display text-navy">
              Rooms designed around how you actually live
            </h2>
            <p className="mt-4 max-w-md text-body leading-relaxed text-muted-foreground">
              Room styles, completed projects and a consultation with a senior designer. Share your
              floor plan and we will come back with a direction, material palette and a phased
              scope of work.
            </p>
            <p className="label-eyebrow mt-6 text-muted-foreground">Enquiry only — no pricing</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <SmartLink
                to="/interior-design"
                className="bg-navy px-6 py-2.5 text-body font-medium text-primary-foreground transition-colors hover:bg-teal"
              >
                Explore interior design
              </SmartLink>
              <SmartLink
                to="/interior-design/consultation"
                className="border border-navy px-6 py-2.5 text-body font-medium text-navy transition-colors hover:border-gold hover:text-teal"
              >
                Book a consultation
              </SmartLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function B2BBand() {
  return (
    <section className="bg-navy py-14 sm:py-[var(--spacing-section)]">
      <Container>
        <div className="grid items-stretch gap-0 border border-teal/50 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div className="flex flex-col justify-center bg-teal/15 p-8 sm:p-12">
            <span className="rule-gold mb-4" aria-hidden="true" />
            <p className="label-eyebrow text-gold">B2B Store — trade only</p>
            <h2 className="font-display mt-3 text-display text-beige">
              Interior fittings and business goods, catalogued
            </h2>
            <p className="mt-4 max-w-md text-body leading-relaxed text-sky">
              Hardware, sanitaryware, surfaces and site-ready fittings for contractors, architects
              and facility teams. Browse specifications, build a list and raise an enquiry — our
              trade desk responds within one working day.
            </p>
            <p className="label-eyebrow mt-6 text-sky/80">
              Browse only — no cart, no checkout, no online purchase
            </p>
            <div className="mt-6">
              <SmartLink
                to="/b2b"
                className="inline-block bg-beige px-6 py-2.5 text-body font-medium text-navy transition-colors hover:bg-gold"
              >
                Browse the range
              </SmartLink>
            </div>
          </div>
          <img
            src={b2bImage}
            alt="Brushed brass door handles and fittings from the B2B catalogue"
            loading="lazy"
            width={1200}
            height={900}
            className="h-64 w-full object-cover lg:h-full"
          />
        </div>
      </Container>
    </section>
  );
}
