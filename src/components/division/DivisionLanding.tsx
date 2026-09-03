import { type Division } from "@/data/divisions";
import { categories } from "@/data/categories";
import { products, bestSellers } from "@/data/products";
import { productImage } from "@/lib/product-images";
import { SmartLink } from "@/components/common/SmartLink";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductRail } from "@/components/home/ProductRail";
import { BrandStrip } from "@/components/home/BrandStrip";

export function DivisionLanding({ division }: { division: Division }) {
  const divisionCategories = categories.filter(
    (c) => c.status === "live" && division.categorySlugs.includes(c.slug),
  );
  const divisionProducts = products.filter((p) => division.categorySlugs.includes(p.categorySlug));
  const featured = divisionProducts.filter(
    (p) => p.tags.includes("featured") || p.tags.includes("new-arrival"),
  );
  const top = featured.length ? featured : bestSellers.filter((p) =>
    division.categorySlugs.includes(p.categorySlug),
  );

  return (
    <>
      {/* Division hero */}
      <section className="relative -mt-14 min-h-[70dvh] w-full overflow-hidden bg-navy sm:-mt-16">
        <img
          src={division.image}
          alt=""
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy/85 via-navy/30 to-navy/10" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[80rem] px-5 pb-16 sm:px-8 sm:pb-24">
            <span className="rule-gold mb-5" aria-hidden="true" />
            <p className="label-eyebrow text-gold">{division.name}</p>
            <h1 className="mt-4 max-w-2xl font-display text-display text-beige">
              {division.tagline}
            </h1>
            <p className="mt-5 max-w-md text-body leading-relaxed text-sky">{division.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SmartLink
                to={division.to}
                className="bg-beige px-6 py-2.5 text-body font-medium text-navy transition-colors hover:bg-gold"
              >
                Explore {division.shortName}
              </SmartLink>
              <SmartLink
                to={`/shop`}
                className="border border-beige/70 px-6 py-2.5 text-body font-medium text-beige transition-colors hover:border-gold hover:text-gold"
              >
                Shop the catalogue
              </SmartLink>
            </div>
          </div>
        </div>
      </section>

      <ProductRail
        eyebrow="Featured"
        title={`New in ${division.shortName}`}
        products={top}
      />

      {divisionCategories.length > 0 ? (
        <Section className="bg-beige/40">
          <SectionHeading
            eyebrow="Shop by category"
            title={`Categories in ${division.shortName}`}
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {divisionCategories.map((category) => {
              const image = productImage(
                products.find((p) => p.categorySlug === category.slug)?.image ?? "fridge",
              );
              return (
                <li key={category.id} className="h-full">
                  <SmartLink
                    to={`/shop/${category.slug}`}
                    className="group relative block overflow-hidden bg-sky/40"
                  >
                    <img
                      src={image}
                      alt={category.name}
                      loading="lazy"
                      width={1600}
                      height={900}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-navy/60 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-display text-heading text-beige">{category.name}</h3>
                    </div>
                  </SmartLink>
                </li>
              );
            })}
          </ul>
        </Section>
      ) : null}

      <BrandStrip />

      <ProductRail
        eyebrow="Best sellers"
        title="Popular in this division"
        products={bestSellers.filter((p) => division.categorySlugs.includes(p.categorySlug))}
        className="bg-card"
      />
    </>
  );
}