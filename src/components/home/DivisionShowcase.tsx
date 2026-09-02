import { divisions } from "@/data/divisions";
import { Container } from "@/components/common/Section";
import { SmartLink } from "@/components/common/SmartLink";

/** Ströms-style way into the three departments — an oversized, image-led
 * editorial map of the store rather than a conventional category grid. */
export function DivisionShowcase() {
  return (
    <section className="bg-background py-14 sm:py-[var(--spacing-section)]">
      <Container>
        <div className="sm:flex sm:items-end sm:justify-between">
          <div>
            <span className="rule-gold mb-4 block" aria-hidden="true" />
            <p className="label-eyebrow text-teal">Three departments, one store</p>
            <h2 className="font-display mt-3 max-w-2xl text-display text-navy">
              Enter the edit from the room, the range or the trade desk
            </h2>
          </div>
          <p className="mt-4 max-w-sm text-body leading-relaxed text-muted-foreground sm:mt-0 sm:pb-1 sm:text-right">
            Every department keeps its own categories, brands, collections and way of working.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {divisions.map((division, i) => (
            <li key={division.id} className={i === 0 ? "md:col-span-1" : "md:col-span-1"}>
              <SmartLink
                to={division.to}
                className="group relative block overflow-hidden bg-navy"
              >
                <img
                  src={division.image}
                  alt=""
                  loading="lazy"
                  width={1600}
                  height={1200}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-navy/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <span className="label-eyebrow text-gold">{division.name}</span>
                  <h3 className="font-display mt-2 text-heading text-beige">{division.shortName}</h3>
                  <span className="link-gold mt-3 inline-block text-caption uppercase tracking-[0.12em] text-beige/90">
                    Enter {division.shortName}
                  </span>
                </div>
              </SmartLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
