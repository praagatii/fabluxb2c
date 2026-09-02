import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { SupportLayout } from "@/components/support/SupportLayout";
import { PolicyStubPage } from "@/components/support/SupportPages";
import { shippingPolicy } from "@/data/support";

const title = "Shipping Policy — Fabluxe";
const description =
  "How Fabluxe delivers and installs your order — scheduled windows, installation and who fulfils your items.";

export const Route = createFileRoute("/support/shipping")({
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
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Shipping" }]} />
      <PolicyStubPage policy={shippingPolicy} />
    </SupportLayout>
  ),
});