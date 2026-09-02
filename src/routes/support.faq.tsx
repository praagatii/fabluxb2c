import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { SupportLayout } from "@/components/support/SupportLayout";
import { FaqPage } from "@/components/support/SupportPages";

const title = "Frequently Asked Questions — Fabluxe";
const description =
  "Answers to common Fabluxe questions about ordering, delivery, returns and the three services — Shop, Interior Design and B2B Store.";

export const Route = createFileRoute("/support/faq")({
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
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "FAQ" }]} />
      <FaqPage />
    </SupportLayout>
  ),
});