import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { Container } from "@/components/common/Section";
import { SupportLayout } from "@/components/support/SupportLayout";
import { SupportContactForm } from "@/components/support/SupportContact";

const title = "Contact Fabluxe Customer Support — Help & Enquiries";
const description =
  "Contact Fabluxe customer support for orders, delivery, installation, returns and service across the Shop, Interior Design and B2B Store. Call or email us.";

export const Route = createFileRoute("/support/")({
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
  component: SupportContactPage,
});

function SupportContactPage() {
  return (
    <SupportLayout>
      <Container>
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact us" }]} />
        <SupportContactForm />
      </Container>
    </SupportLayout>
  );
}