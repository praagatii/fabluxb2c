import { brands } from "@/data/site";

export function BrandStrip() {
  return (
    <section className="overflow-hidden border-t border-border py-8">
      <div className="mx-auto w-full max-w-[80rem] px-5 sm:px-8">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-background to-transparent" />
          <ul className="animate-marquee flex w-max items-center gap-x-10 sm:gap-x-16">
            {[...brands, ...brands].map((brand, index) => (
              <li key={`${brand}-${index}`} className="shrink-0">
                <span className="font-display text-heading tracking-tight text-navy/45">
                  {brand}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}