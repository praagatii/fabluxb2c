import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { SupportLayout } from "@/components/support/SupportLayout";
import { PolicyStubPage } from "@/components/support/SupportPages";
import { returnsPolicy } from "@/data/support";

const title = "Returns & Warranty — Fabluxe";
const description =
  "Return and warranty terms vary by product. Find out how Fabluxe handles returns, service and spares, and raise a request.";

export const Route = createFileRoute("/support/returns")({
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
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Returns & warranty" }]} />
      <PolicyStubPage policy={returnsPolicy} />
    </SupportLayout>
  ),
});