import { createFileRoute } from "@tanstack/react-router";
import { Container, Section } from "@/components/common/Section";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { ProductCard } from "@/components/shop/ProductCard";
import { SmartLink } from "@/components/common/SmartLink";
import { products, type Product } from "@/data/products";

const title = "Brands — Fabluxe";
const description =
  "The appliance and interiors brands carried by Fabluxe, from Voltek and Elba to Terra Studio and Marchetti.";

export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BrandsPage,
});

function groupByBrand(): { brand: string; items: Product[] }[] {
  const map = new Map<string, Product[]>();
  for (const product of products) {
    const list = map.get(product.brand) ?? [];
    list.push(product);
    map.set(product.brand, list);
  }
  return Array.from(map.entries())
    .map(([brand, items]) => ({ brand, items }))
    .sort((a, b) => a.brand.localeCompare(b.brand));
}

function BrandsPage() {
  const groups = groupByBrand();

  return (
    <div>
      <Container>
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Brands" }]} />
        <div className="max-w-2xl">
          <span className="rule-gold mb-4" aria-hidden="true" />
          <p className="label-eyebrow text-teal">Brands</p>
          <h1 className="mt-3 font-display text-display text-navy">The makers we carry</h1>
        </div>

        <nav className="mt-8 flex flex-wrap gap-2" aria-label="Jump to brand">
          {groups.map((group) => (
            <a
              key={group.brand}
              href={`#${encodeURIComponent(group.brand)}`}
              className="border border-border px-4 py-2 text-caption text-navy transition-colors hover:border-gold"
            >
              {group.brand}
            </a>
          ))}
        </nav>
      </Container>

      {groups.map((group) => (
        <Section key={group.brand} className={groups.indexOf(group) % 2 === 1 ? "bg-card" : ""}>
          <div id={encodeURIComponent(group.brand)} className="scroll-mt-28">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="label-eyebrow text-teal">Brand</p>
                <h2 className="mt-2 text-heading text-navy">{group.brand}</h2>
                <p className="numeric mt-2 text-caption text-muted-foreground">
                  {group.items.length} {group.items.length === 1 ? "piece" : "pieces"}
                </p>
              </div>
              <SmartLink to="/shop" className="link-gold text-body text-teal">
                View all
              </SmartLink>
            </div>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {group.items.map((product) => (
                <li key={product.id} className="h-full">
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ))}
    </div>
  );
}
