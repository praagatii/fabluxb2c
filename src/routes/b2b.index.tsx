import { useEffect } from "react";
import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section, Container } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { SmartLink } from "@/components/common/SmartLink";
import { B2BLabel, B2BPageMark } from "@/components/b2b/B2BChrome";
import { b2bCategories, b2bAudience, b2bProducts } from "@/data/b2b";
import { b2bImage } from "@/lib/b2b-images";

export const Route = createFileRoute("/b2b/")({
  head: () => ({
    meta: [
      { title: "B2B Store — Trade Catalogue | Fabluxe" },
      {
        name: "description",
        content:
          "Browse the Fabluxe B2B catalogue of interior fittings, hardware, fixtures, bulk appliances and project supply. Browse-only — purchases are handled through enquiry.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Fabluxe B2B Store — Trade Catalogue" },
      {
        property: "og:description",
        content:
          "Interior fittings, hardware, fixtures, bulk appliances and project supply for contractors, studios and developers.",
      },
    ],
  }),
  component: B2BLanding,
});

function B2BLanding() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash !== "b2b-categories") return;
    const timer = window.setTimeout(() => {
      document
        .getElementById("b2b-categories")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
    return () => window.clearTimeout(timer);
  }, [hash]);

  return (
    <>
      <Container>
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "B2B Store" }]} />
      </Container>

      <Section className="pt-0">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <B2BPageMark>Trade catalogue</B2BPageMark>
            <h1 className="mt-4 font-display text-display leading-tight text-navy">
              A trade catalogue for the people who build the room
            </h1>
            <p className="mt-5 max-w-xl text-body leading-relaxed text-muted-foreground">
              The Fabluxe B2B Store lists what we supply to contractors, studios and developers —
              door furniture, motion hardware, fixtures, appliance packages and site materials. It
              is a catalogue for specification, not a checkout. Nothing here is priced online and
              nothing can be added to a cart.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SmartLink
                to="/b2b/catalogue"
                className="inline-flex items-center gap-2 bg-navy px-6 py-2.5 text-caption uppercase tracking-[0.18em] text-beige transition-colors hover:bg-beige hover:text-navy"
              >
                Browse the catalogue
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </SmartLink>
              <SmartLink
                to="/b2b/enquiry"
                className="inline-flex items-center gap-2 border border-border px-6 py-2.5 text-caption uppercase tracking-[0.18em] text-navy transition-colors hover:border-gold"
              >
                Raise a bulk enquiry
              </SmartLink>
            </div>
          </div>
          <img
            src={b2bImage("fittings")}
            alt="Brushed brass door levers and rosettes from the Fabluxe trade catalogue"
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </Section>

      <Section className="bg-card">
        <SectionHeading
          eyebrow="Who it is for"
          title="Built around project buying"
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {b2bAudience.map((item) => (
            <div
              key={item.title}
              className="flex flex-col rounded-[12px] border border-border bg-background p-5"
            >
              <h3 className="text-heading leading-snug text-navy">{item.title}</h3>
              <p className="mt-auto pt-2 text-caption leading-relaxed text-muted-foreground">
                {item.copy}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="b2b-categories">
        <SectionHeading
          eyebrow="Categories"
          title="Five supply lines"
          action={
            <SmartLink
              to="/b2b/catalogue"
              className="label-eyebrow link-gold text-teal"
            >
              View everything
            </SmartLink>
          }
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {b2bCategories.map((category) => (
            <SmartLink
              key={category.id}
              to={`/b2b/catalogue/${category.slug}`}
              className="group block overflow-hidden rounded-[12px] border border-border bg-card transition-shadow hover:shadow-[var(--shadow-soft)]"
            >
              <div className="relative overflow-hidden bg-[#ececec]">
                <img
                  src={b2bImage(category.image)}
                  alt={category.name}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <B2BLabel className="absolute left-3 top-3" />
              </div>
              <div className="p-4">
                <h3 className="text-heading text-navy">{category.name}</h3>
                <p className="mt-2 text-caption leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </SmartLink>
          ))}
        </div>
      </Section>

      <Section className="bg-navy">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionHeading
              eyebrow="Bulk enquiry"
              title="Send us the schedule, we will price it"
              tone="inverse"
            />
          </div>
          <Link
            to="/b2b/enquiry"
            search={{ product: "" }}
            className="inline-flex shrink-0 items-center gap-2 bg-beige px-6 py-2.5 text-caption uppercase tracking-[0.18em] text-navy transition-colors hover:bg-gold"
          >
            Start an enquiry
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Section>
    </>
  );
}
