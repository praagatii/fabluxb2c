import { brands } from "@/data/site";

/** A calm, infinite logo loop of the brands we carry. The track is duplicated
 * once and translated by -50% for a seamless scroll. */
export function BrandStrip() {
  const row = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-x-14 pr-14 sm:gap-x-20 sm:pr-20"
    >
      {brands.map((brand) => (
        <li key={brand} className="shrink-0">
          <span className="font-display text-heading tracking-tight text-navy/45">{brand}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="overflow-hidden border-y border-border py-8">
      <div className="animate-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
