import { brands } from "@/data/site";

export function BrandStrip() {
  return (
    <section className="overflow-hidden border-y border-border py-8">
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-16">
        {brands.map((brand) => (
          <li key={brand} className="shrink-0">
            <span className="font-display text-heading tracking-tight text-navy/45">{brand}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
