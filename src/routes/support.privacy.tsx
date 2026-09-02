import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { SupportLayout } from "@/components/support/SupportLayout";
import { PolicyStubPage } from "@/components/support/SupportPages";
import { privacyPolicy } from "@/data/support";

const title = "Privacy Policy — Fabluxe";
const description =
  "How Fabluxe collects, uses and protects your information across the store, interior design and B2B enquiries.";

export const Route = createFileRoute("/support/privacy")({
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
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Privacy policy" }]} />
      <PolicyStubPage policy={privacyPolicy} />
    </SupportLayout>
  ),
});