import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { SupportLayout } from "@/components/support/SupportLayout";
import { AboutPage } from "@/components/support/SupportPages";

const title = "About Fabluxe — One Storefront, Three Companies";
const description =
  "Meet the Fabluxe group — Fabluxe Home Solutions for electronics, Fabluxora Interiors for design, and the B2B trade catalogue.";

export const Route = createFileRoute("/support/about")({
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
  component: () => (
    <SupportLayout>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About Fabluxe" }]} />
      <AboutPage />
    </SupportLayout>
  ),
});