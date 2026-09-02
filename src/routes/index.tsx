import { createFileRoute } from "@tanstack/react-router";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductRail } from "@/components/home/ProductRail";
import { InteriorDesignBand, B2BBand } from "@/components/home/PromoBands";
import { BrandStrip } from "@/components/home/BrandStrip";
import { TrustRow } from "@/components/home/TrustRow";
import { ReviewHighlights } from "@/components/home/ReviewHighlights";
import { NewsletterCapture } from "@/components/home/NewsletterCapture";
import { featuredProducts, bestSellers, newArrivals } from "@/data/products";

const title = "Fabluxe — Premium Home Electronics, Interiors & Trade Fittings";
const description =
  "Shop refrigerators, televisions, air conditioners and kitchen appliances with installation included, explore Fabluxora interior design, and browse the Fabluxe B2B fittings catalogue.";

export const Route = createFileRoute("/")({
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
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroCarousel />
      <CategoryGrid />
      <ProductRail
        eyebrow="Featured"
        title="Chosen by our buying team"
        copy="A short list of appliances we would put in our own homes this season."
        products={featuredProducts}
        className="bg-card"
      />
      <InteriorDesignBand />
      <B2BBand />
      <ProductRail
        eyebrow="Best sellers"
        title="What India is buying this month"
        products={bestSellers}
      />
      <ProductRail
        eyebrow="New arrivals"
        title="Just landed in the catalogue"
        products={newArrivals}
        className="bg-card"
      />
      <BrandStrip />
      <TrustRow />
      <ReviewHighlights />
      <NewsletterCapture />
    </>
  );
}
