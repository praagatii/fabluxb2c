import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Section, Container } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TestimonialCard } from "@/components/common/TestimonialCard";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { ConsultationDialog } from "@/components/interiors/ConsultationDialog";
import { interiorImage } from "@/lib/interior-images";
import {
  roomStyles,
  roomTypes,
  roomTypeLabel,
  projects,
  howItWorks,
  testimonials,
} from "@/data/interiors";
import heroImage from "@/assets/interiors-hero.jpg";

export const Route = createFileRoute("/interior-design/")({
  head: () => ({
    meta: [
      { title: "Interior Design by Fabluxora Interiors — Room Styles & Consultations" },
      {
        name: "description",
        content:
          "Explore six room styles, browse completed Indian homes and book a consultation with a senior Fabluxora Interiors designer. Enquiry only.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Interior Design by Fabluxora Interiors" },
      {
        property: "og:description",
        content:
          "Room styles, completed projects and consultations with a senior designer, across Indian cities.",
      },
    ],
  }),
  component: InteriorDesignLanding,
});

function InteriorDesignLanding() {
  const [room, setRoom] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const styles =
    room === "all" ? roomStyles : roomStyles.filter((style) => style.suits.includes(room));

  return (
    <div className="bg-background">
      <Container>
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Interior Design" }]} />
      </Container>

      <section className="relative">
        <img
          src={heroImage}
          alt="A Fabluxora Interiors living room in navy velvet, brass and linen"
          width={1920}
          height={1080}
          loading="lazy"
          decoding="async"
          className="h-[70vh] min-h-[26rem] w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/60" aria-hidden="true" />
        <div className="absolute inset-0 grid items-center">
          <Container>
            <div className="max-w-2xl">
              <span className="rule-gold mb-4" aria-hidden="true" />
              <p className="label-eyebrow text-gold">Fabluxora Interiors</p>
              <h1 className="mt-4 font-display text-display leading-tight text-primary-foreground">
                We design the whole room, not the shopping list
              </h1>
              <p className="mt-5 max-w-xl text-body leading-relaxed text-sky">
                Layout, light, joinery, materials and the pieces that sit in them — considered
                together, by one senior designer who stays with your project from the first
                conversation to handover.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setDialogOpen(true)}
                className="bg-gold px-7 py-2.5 text-body font-medium text-navy transition-colors hover:bg-sky"
                >
                  Book a consultation
                </button>
                <Link
                  to="/interior-design/portfolio"
                className="border border-sky px-7 py-2.5 text-body font-medium text-primary-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  See completed projects
                </Link>
              </div>
              <p className="label-eyebrow mt-8 text-sky">Enquiry only — no pricing online</p>
            </div>
          </Container>
        </div>
      </section>

      <Section className="bg-beige">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps, one designer"
        />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step) => (
            <li key={step.id} className="rounded-[12px] border border-border bg-card p-5 transition-shadow hover:shadow-[var(--shadow-soft)]">
              <p className="font-display text-heading text-gold">{step.step}</p>
              <h3 className="mt-3 text-heading text-navy">{step.title}</h3>
              <p className="mt-2 text-caption leading-relaxed text-muted-foreground">{step.copy}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Room styles"
          title="Six directions to start from"
        />
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter styles by room type">
          <FilterChip active={room === "all"} onClick={() => setRoom("all")} label="All rooms" />
          {roomTypes.map((type) => (
            <FilterChip
              key={type.id}
              active={room === type.id}
              onClick={() => setRoom(type.id)}
              label={type.label}
            />
          ))}
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {styles.map((style) => (
            <li key={style.id}>
              <Link
                to="/interior-design/styles/$styleId"
                params={{ styleId: style.id }}
                className="group flex h-full flex-col overflow-hidden rounded-[12px] border border-border bg-card transition-shadow hover:shadow-[var(--shadow-soft)]"
              >
                <img
                  src={interiorImage(style.image)}
                  alt={`${style.name} interior style`}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="flex flex-1 flex-col p-5">
                  <span className="rule-gold mb-3" aria-hidden="true" />
                  <h3 className="text-heading text-navy">{style.name}</h3>
                  <p className="mt-2 text-caption leading-relaxed text-muted-foreground">
                    {style.tagline}
                  </p>
                  <p className="label-eyebrow mt-5 text-teal">
                    {style.suits.map((id) => roomTypeLabel(id)).join(" · ")}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {styles.length === 0 ? (
          <p className="mt-8 text-caption text-muted-foreground">
            No styles listed for that room yet — a designer can still take it on. Book a
            consultation and we will work it out together.
          </p>
        ) : null}
      </Section>

      <Section className="bg-beige">
        <SectionHeading
          eyebrow="Portfolio"
          title="Recently completed"
          action={
            <Link
              to="/interior-design/portfolio"
              className="border border-navy px-5 py-2.5 text-body font-medium text-navy transition-colors hover:border-gold hover:text-teal"
            >
              View all projects
            </Link>
          }
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <li key={project.id}>
              <Link
                to="/interior-design/portfolio/$projectId"
                params={{ projectId: project.id }}
                className="group block overflow-hidden rounded-[12px] border border-border bg-card transition-shadow hover:shadow-[var(--shadow-soft)]"
              >
                <img
                  src={interiorImage(project.image)}
                  alt={project.title}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="p-5">
                  <p className="label-eyebrow text-teal">
                    {roomTypeLabel(project.roomTypeId)} · {project.city}
                  </p>
                  <h3 className="mt-3 text-heading leading-snug text-navy">
                    {project.title}
                  </h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading eyebrow="In their words" title="What clients say" align="center" />
        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <li key={item.id} className="h-full">
              <TestimonialCard quote={item.quote} name={item.name} detail={item.place} />
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-navy py-14 sm:py-[var(--spacing-section)]">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="rule-gold mx-auto mb-4" aria-hidden="true" />
            <p className="label-eyebrow text-gold">Next step</p>
            <h2 className="mt-3 font-display text-display text-primary-foreground">
              Start with a conversation
            </h2>
            <p className="mt-4 text-caption leading-relaxed text-sky">
              Bring a floor plan, a few photographs, or nothing at all. The first consultation is
              about how you want the room to work.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setDialogOpen(true)}
                className="bg-gold px-7 py-2.5 text-body font-medium text-navy transition-colors hover:bg-sky"
              >
                Book a consultation
              </button>
              <Link
                to="/interior-design/consultation"
                className="border border-sky px-7 py-2.5 text-body font-medium text-primary-foreground transition-colors hover:border-gold hover:text-gold"
              >
                See how consultations run
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ConsultationDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "border border-navy bg-navy px-3 py-1.5 text-caption text-primary-foreground"
          : "border border-border bg-card px-3 py-1.5 text-caption text-navy transition-colors hover:border-gold"
      }
    >
      {label}
    </button>
  );
}
