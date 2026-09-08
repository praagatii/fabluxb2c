import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/home/HeroSection";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { FeaturedStory } from "@/components/home/FeaturedStory";
import { ProductRail } from "@/components/home/ProductRail";
import { BrandStrip } from "@/components/home/BrandStrip";
import { TrustRow } from "@/components/home/TrustRow";
import { NewsletterCapture } from "@/components/home/NewsletterCapture";
import { InteriorDesignBand, B2BBand } from "@/components/home/PromoBands";
import { bestSellers } from "@/data/products";

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

      {/* 2. Shop categories — obvious first step */}
      <ShopByCategory />

      {/* 3. Featured product story */}
      <FeaturedStory />

      {/* 4. Best sellers — horizontal rail */}
      <ProductRail
        eyebrow="Best sellers"
        title="What India is buying this month"
        products={bestSellers}
      />

      {/* 5. Interior design */}
      <InteriorDesignBand />

      {/* 6. B2B store */}
      <B2BBand />

      {/* 7. Brands — logo loop */}
      <BrandStrip />

      {/* 8. Service promises */}
      <TrustRow />

      {/* 9. Newsletter */}
      <NewsletterCapture />
    </>
  );
}
