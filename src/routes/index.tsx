import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/home/HeroSection";
import { DivisionShowcase } from "@/components/home/DivisionShowcase";
import { FeaturedStory } from "@/components/home/FeaturedStory";
import { ProductRail } from "@/components/home/ProductRail";
import { InspirationSpaces } from "@/components/home/InspirationSpaces";
import { BrandStrip } from "@/components/home/BrandStrip";
import { TrustRow } from "@/components/home/TrustRow";
import { ReviewHighlights } from "@/components/home/ReviewHighlights";
import { NewsletterCapture } from "@/components/home/NewsletterCapture";
import { InteriorDesignBand, B2BBand } from "@/components/home/PromoBands";
import { newArrivals, bestSellers } from "@/data/products";

const title = "Fabluxe — Premium Home Electronics, Interiors & Trade Fittings";
const description =
  "Considered appliances and interiors pieces for the modern Indian home, with installation included.";

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
      {/* 1. Full-screen hero */}
      <HeroSection />

      {/* 2. Way into the departments */}
      <DivisionShowcase />

      {/* 3. Featured product story */}
      <FeaturedStory />

      {/* 4. Best sellers — horizontal rail */}
      <ProductRail
        eyebrow="Best sellers"
        title="What India is buying this month"
        copy="The pieces that ship fastest, installed by a Fabluxe engineer."
        products={bestSellers}
      />

      {/* 5. New this season */}
      <ProductRail
        eyebrow="New this season"
        title="Fresh to the floor"
        copy="Newly added and worth a close look before the next batch lands."
        products={newArrivals}
        className="border-t border-border bg-beige/40"
      />

      {/* 6. Interior design */}
      <InteriorDesignBand />

      {/* 7. Inspiration spaces */}
      <InspirationSpaces />

      {/* 8. B2B store */}
      <B2BBand />

      {/* 9. Brands */}
      <BrandStrip />

      {/* 10. Service promises */}
      <TrustRow />

      {/* 11. Testimonials */}
      <ReviewHighlights />

      {/* 12. Newsletter */}
      <NewsletterCapture />
    </>
  );
}
