import hero1 from "@/assets/hero-1.jpg";
import { SmartLink } from "@/components/common/SmartLink";

/** Audo-style editorial hero: large full-bleed visual, minimal text, one CTA. */
export function HeroSection() {
  return (
    <section className="relative -mt-16 min-h-dvh w-full overflow-hidden bg-navy sm:-mt-[4.5rem]">
      <img
        src={hero1}
        alt=""
        width={1600}
        height={900}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-navy/85 via-navy/25 to-navy/10" />
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-[80rem] px-5 pb-16 sm:px-8 sm:pb-24">
          <span className="rule-gold mb-5" aria-hidden="true" />
          <p className="label-eyebrow text-gold">Home, Considered</p>
          <h1 className="mt-4 max-w-2xl font-display text-display text-beige">
            Considered objects for the modern Indian home
          </h1>
          <p className="mt-5 max-w-md text-body leading-relaxed text-sky">
            Appliances and interiors pieces chosen by our buying team, installed and demonstrated
            by Fabluxe.
          </p>
          <div className="mt-8">
            <SmartLink
              to="/shop"
              className="inline-block bg-beige px-8 py-4 text-body font-medium text-navy transition-colors hover:bg-gold"
            >
              Shop the collection
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
}