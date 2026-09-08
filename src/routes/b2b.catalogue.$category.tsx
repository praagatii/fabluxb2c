import { createFileRoute, notFound } from "@tanstack/react-router";
import { Section, Container } from "@/components/common/Section";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { SmartLink } from "@/components/common/SmartLink";
import { B2BPageMark } from "@/components/b2b/B2BChrome";
import { B2BCatalogueView } from "@/components/b2b/B2BCatalogueView";
import { getB2BCategory, b2bProductsIn } from "@/data/b2b";

export const Route = createFileRoute("/b2b/catalogue/$category")({
  loader: ({ params }) => {
    const category = getB2BCategory(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Category unavailable — Fabluxe B2B" }, { name: "robots", content: "noindex" }],
      };
    }
    const { category } = loaderData;
    const title = `${category.name} — Trade Catalogue | Fabluxe B2B`;
    return {
      meta: [
        { title },
        { name: "description", content: category.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:title", content: title },
        { property: "og:description", content: category.description },
      ],
    };
  },
  notFoundComponent: CategoryMissing,
  component: B2BCategoryPage,
});

function CategoryMissing() {
  return (
    <Section>
      <h1 className="text-heading text-navy">That catalogue section does not exist</h1>
        <p className="mt-3 text-caption text-muted-foreground">
        <SmartLink to="/b2b/catalogue" className="link-gold text-teal">
          Browse the full catalogue
        </SmartLink>
      </p>
    </Section>
  );
}

function B2BCategoryPage() {
  const { category } = Route.useLoaderData();
  const products = b2bProductsIn(category.slug);

  return (
    <>
      <div className="border-b border-border bg-beige">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "B2B Store", to: "/b2b" },
              { label: "Catalogue", to: "/b2b/catalogue" },
              { label: category.name },
            ]}
          />
        </Container>
      </div>

      <header className="py-14 sm:py-[var(--spacing-section)]">
        <Container>
          <B2BPageMark>{category.tagline}</B2BPageMark>
          <h1 className="mt-2 max-w-2xl font-display text-display text-navy">{category.name}</h1>
        </Container>
      </header>

      <Section className="pt-0">
        <B2BCatalogueView products={products} />
      </Section>
    </>
  );
}
