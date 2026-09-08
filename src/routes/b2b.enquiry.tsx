import { createFileRoute } from "@tanstack/react-router";
import { Section, Container } from "@/components/common/Section";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { B2BPageMark } from "@/components/b2b/B2BChrome";
import { B2BEnquiryForm } from "@/components/b2b/B2BEnquiryForm";

export const Route = createFileRoute("/b2b/enquiry")({
  validateSearch: (search: Record<string, unknown>) => ({
    product: typeof search['product'] === "string" ? (search['product'] as string) : "",
  }),
  head: () => ({
    meta: [
      { title: "Raise a Trade Enquiry — Fabluxe B2B Store" },
      {
        name: "description",
        content:
          "Send the Fabluxe trade desk your company details, products of interest and quantities. We reply with availability, lead time and a written quotation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Raise a Trade Enquiry — Fabluxe B2B" },
      {
        property: "og:description",
        content: "Company details, products of interest and quantities — answered in one working day.",
      },
    ],
  }),
  component: EnquiryPage,
});

function EnquiryPage() {
  const { product } = Route.useSearch();

  return (
    <>
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "B2B Store", to: "/b2b" },
            { label: "Enquiry" },
          ]}
        />
      </Container>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <B2BPageMark>Trade enquiry</B2BPageMark>
            <h1 className="mt-4 font-display text-display leading-tight text-navy">
              Tell us what the project needs
            </h1>
            <ul className="mt-8 space-y-4 text-caption leading-relaxed text-muted-foreground">
              <li>
                <span className="label-eyebrow block text-teal">One working day</span>
                Every enquiry is acknowledged with a reference number and an owner.
              </li>
              <li>
                <span className="label-eyebrow block text-teal">Phased supply</span>
                Deliveries can be released floor by floor against the site programme.
              </li>
              <li>
                <span className="label-eyebrow block text-teal">Batch matching</span>
                Finishes and surfaces are held and matched across the whole project.
              </li>
            </ul>
          </div>

          <B2BEnquiryForm initialProductId={product || undefined} />
        </div>
      </Section>
    </>
  );
}
