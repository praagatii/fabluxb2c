import { brands } from "@/data/site";
import { Container } from "@/components/common/Section";

export function BrandStrip() {
  return (
    <section className="border-y border-border bg-card py-10">
      <Container>
        <p className="label-eyebrow text-center text-teal">Brands we carry</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {brands.map((brand) => (
            <li key={brand} className="font-display text-body text-navy/70">
              {brand}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
