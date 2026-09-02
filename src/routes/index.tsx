import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/home/HeroSection";
import { EditorialFeature } from "@/components/home/EditorialFeature";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { InspirationSpaces } from "@/components/home/InspirationSpaces";
import { ProductRail } from "@/components/home/ProductRail";
import { BrandStrip } from "@/components/home/BrandStrip";
import { TrustRow } from "@/components/home/TrustRow";
import { NewsletterCapture } from "@/components/home/NewsletterCapture";
import hero2 from "@/assets/hero-2.jpg";
import bandInteriors from "@/assets/band-interiors.jpg";
import { featuredProducts, bestSellers } from "@/data/products";

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
      <HeroSection />

      <ProductRail
        eyebrow="Featured"
        title="New this season"
        copy="A short list of appliances and pieces our buying team chose for this season."
        products={featuredProducts}
      />

      <EditorialFeature
        image={hero2}
        alt="A Lumen OLED television in a calm living room"
        eyebrow="The Lumen Edit"
        title="A picture that behaves like a painting"
        copy="The Lumen OLED Evo series, calibrated in Filmmaker mode and wall-mounted by our own installation team."
        cta={{ label: "Explore televisions", to: "/shop/televisions" }}
      />

      <ShopByCategory />

      <ProductRail
        eyebrow="Best sellers"
        title="What India is buying this month"
        products={bestSellers}
        className="bg-card"
      />

      <EditorialFeature
        image={bandInteriors}
        alt="A Fabluxora Interiors living room in navy velvet, brass and linen"
        eyebrow="Fabluxora Interiors"
        title="Rooms designed around how you live"
        copy="Room styles, completed projects and a consultation with a senior designer. Share your floor plan and we will return with a direction and material palette."
        cta={{ label: "Explore interior design", to: "/interior-design" }}
        align="right"
      />

      <InspirationSpaces />

      <BrandStrip />
      <TrustRow />
      <NewsletterCapture />
    </>
  );
}