import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { SupportLayout } from "@/components/support/SupportLayout";
import { PolicyStubPage } from "@/components/support/SupportPages";
import { termsPolicy } from "@/data/support";

const title = "Terms of Use — Fabluxe";
const description =
  "The terms governing your use of the Fabluxe storefront across Shop, Interior Design and B2B Store.";

export const Route = createFileRoute("/support/terms")({
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
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Terms of use" }]} />
      <PolicyStubPage policy={termsPolicy} />
    </SupportLayout>
  ),
});