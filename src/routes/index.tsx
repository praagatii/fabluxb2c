import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/home/HeroSection";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { InspirationSpaces } from "@/components/home/InspirationSpaces";
import { ProductRail } from "@/components/home/ProductRail";
import { BrandStrip } from "@/components/home/BrandStrip";
import { TrustRow } from "@/components/home/TrustRow";
import { NewsletterCapture } from "@/components/home/NewsletterCapture";
import { SmartLink } from "@/components/common/SmartLink";
import interiorsHero from "@/assets/interiors-hero.jpg";
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
      <HeroSection />

      <ProductRail
        eyebrow="Best sellers"
        title="What India is buying this month"
        products={bestSellers}
      />

      <ShopByCategory />

      <section className="relative overflow-hidden bg-navy">
        <img
          src={interiorsHero}
          alt=""
          loading="lazy"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="relative mx-auto max-w-[80rem] px-5 py-14 text-center sm:px-8 sm:py-20">
          <span className="rule-gold mx-auto mb-4" aria-hidden="true" />
          <p className="label-eyebrow text-gold">Fabluxora Interiors</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-display text-beige">
            Bring the edit into your own rooms
          </h2>
          <p className="mx-auto mt-3 max-w-md text-body leading-relaxed text-sky">
            A consultation with a senior designer, from floor plan to material palette.
          </p>
          <div className="mt-6">
            <SmartLink
              to="/interior-design/consultation"
              className="inline-block bg-beige px-8 py-3.5 text-body font-medium text-navy transition-colors hover:bg-gold"
            >
              Book a consultation
            </SmartLink>
          </div>
        </div>
      </section>

      <InspirationSpaces />

      <BrandStrip />
      <TrustRow />
      <NewsletterCapture />
    </>
  );
}