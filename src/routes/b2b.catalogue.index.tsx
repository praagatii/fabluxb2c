import { createFileRoute } from "@tanstack/react-router";
import { Section, Container } from "@/components/common/Section";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { B2BPageMark } from "@/components/b2b/B2BChrome";
import { B2BCatalogueView } from "@/components/b2b/B2BCatalogueView";
import { b2bProducts } from "@/data/b2b";

export const Route = createFileRoute("/b2b/catalogue/")({
  head: () => ({
    meta: [
      { title: "Trade Catalogue — Browse All Lines | Fabluxe B2B" },
      {
        name: "description",
        content:
          "Search and filter the full Fabluxe B2B catalogue: fittings, hardware, fixtures, bulk appliances and project supply. Enquiry only, no online pricing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Fabluxe B2B — Full Trade Catalogue" },
      {
        property: "og:description",
        content: "Filter the trade catalogue by material, finish, application and certification.",
      },
    ],
  }),
  component: CataloguePage,
});

function CataloguePage() {
  return (
    <>
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "B2B Store", to: "/b2b" },
            { label: "Catalogue" },
          ]}
        />
      </Container>
      <Section className="pt-0">
        <B2BPageMark>Catalogue</B2BPageMark>
        <h1 className="mt-4 font-display text-display text-navy">Every line we supply</h1>
        <div className="mt-10">
          <B2BCatalogueView products={b2bProducts} />
        </div>
      </Section>
    </>
  );
}
