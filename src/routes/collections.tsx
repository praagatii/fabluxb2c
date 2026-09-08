import { createFileRoute } from "@tanstack/react-router";
import { Container, Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { ProductCard } from "@/components/shop/ProductCard";
import { SmartLink } from "@/components/common/SmartLink";
import { featuredProducts, bestSellers, newArrivals } from "@/data/products";

const title = "Collections — Fabluxe";
const description =
  "Editorial collections of home appliances and interiors pieces, curated by the Fabluxe buying team.";

export const Route = createFileRoute("/collections")({
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
  component: CollectionsPage,
});

const collections = [
  {
    id: "featured",
    eyebrow: "The Featured Edit",
    title: "Chosen by our buying team",
    copy: "A short list of appliances and pieces we would put in our own homes this season.",
    products: featuredProducts,
  },
  {
    id: "best-sellers",
    eyebrow: "Best Sellers",
    title: "What India is buying this month",
    copy: "The pieces our customers keep coming back for, from refrigerators to sofas.",
    products: bestSellers,
  },
  {
    id: "new-arrivals",
    eyebrow: "New Arrivals",
    title: "Just landed in the catalogue",
    copy: "Fresh additions, engineered for considered homes.",
    products: newArrivals,
  },
];

function CollectionsPage() {
  return (
    <div>
      <Container>
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Collections" }]} />
        <div className="max-w-2xl">
          <span className="rule-gold mb-4" aria-hidden="true" />
          <p className="label-eyebrow text-teal">Collections</p>
          <h1 className="mt-3 font-display text-display text-navy">Curated edits for the considered home</h1>
        </div>
      </Container>

      {collections.map((collection) => (
        <Section key={collection.id} className={collection.id === "best-sellers" ? "bg-card" : ""}>
          <SectionHeading
            eyebrow={collection.eyebrow}
            title={collection.title}
            action={
              <SmartLink to="/shop" className="link-gold text-body text-teal">
                View all
              </SmartLink>
            }
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {collection.products.map((product) => (
              <li key={product.id} className="h-full">
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </Section>
      ))}
    </div>
  );
}
