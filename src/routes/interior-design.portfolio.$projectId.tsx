import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Section, Container } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { ConsultationDialog } from "@/components/interiors/ConsultationDialog";
import { InteriorGallery } from "@/components/interiors/InteriorGallery";
import { BeforeAfterSlider } from "@/components/interiors/BeforeAfterSlider";
import { interiorImage } from "@/lib/interior-images";
import { projectById, styleById, roomTypeLabel } from "@/data/interiors";

export const Route = createFileRoute("/interior-design/portfolio/$projectId")({
  loader: ({ params }) => {
    const project = projectById(params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project unavailable — Fabluxora Interiors" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    const description = `${project.brief} A ${styleById(project.styleId)?.name} ${roomTypeLabel(
      project.roomTypeId,
    ).toLowerCase()} in ${project.city}, completed ${project.year} by Fabluxora Interiors.`;
    return {
      meta: [
        { title: `${project.title} — Fabluxora Interiors` },
        { name: "description", content: description.slice(0, 158) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:title", content: project.title },
        { property: "og:description", content: description.slice(0, 158) },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const style = styleById(project.styleId);

  const meta = [
    { label: "Room type", value: roomTypeLabel(project.roomTypeId) },
    { label: "Style", value: style?.name ?? "—" },
    { label: "City", value: project.city },
    { label: "Area", value: project.area },
    { label: "Year", value: String(project.year) },
  ];

  return (
    <div className="bg-background">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Interior Design", to: "/interior-design" },
            { label: "Portfolio", to: "/interior-design/portfolio" },
            { label: project.city },
          ]}
        />
      </Container>

      <section className="relative">
        <img
          src={interiorImage(project.image)}
          alt={project.title}
          width={1200}
          height={900}
          className="h-[60vh] min-h-[22rem] w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/55" aria-hidden="true" />
        <div className="absolute inset-0 grid items-end pb-10 sm:pb-16">
          <Container>
            <span className="rule-gold mb-4" aria-hidden="true" />
            <p className="label-eyebrow text-gold">
              {roomTypeLabel(project.roomTypeId)} · {project.city}
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-display leading-tight text-primary-foreground">
              {project.title}
            </h1>
          </Container>
        </div>
      </section>

      <Section>
        <dl className="grid gap-px border border-border bg-border sm:grid-cols-5">
          {meta.map((item) => (
            <div key={item.label} className="bg-card p-5">
              <dt className="label-eyebrow text-teal">{item.label}</dt>
              <dd className="mt-2 text-caption text-navy">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <span className="rule-gold mb-4" aria-hidden="true" />
            <p className="label-eyebrow text-teal">The brief</p>
            <p className="mt-4 text-body leading-relaxed text-muted-foreground">{project.brief}</p>
            <p className="label-eyebrow mt-8 text-teal">What we did</p>
            <ul className="mt-4 space-y-3">
              {project.work.map((item) => (
                <li key={item} className="border-l-2 border-gold pl-4 text-caption leading-relaxed text-navy">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {style ? (
            <aside className="border border-border bg-beige p-6">
              <span className="rule-gold mb-3" aria-hidden="true" />
              <p className="label-eyebrow text-teal">Materials and finishes</p>
              <ul className="mt-4 divide-y divide-border">
                {style.materials.slice(0, 4).map((material) => (
                  <li key={material.name} className="py-3">
                    <p className="text-caption text-navy">{material.name}</p>
                    <p className="text-caption text-muted-foreground">{material.note}</p>
                  </li>
                ))}
              </ul>
              <Link
                to="/interior-design/styles/$styleId"
                params={{ styleId: style.id }}
                className="mt-5 inline-block border border-navy px-5 py-2.5 text-body text-navy transition-colors hover:border-gold hover:text-teal"
              >
                Explore {style.name}
              </Link>
            </aside>
          ) : null}
        </div>
      </Section>

      <Section className="bg-beige">
        <SectionHeading eyebrow="Before and after" title="How the room changed" />
        <div className="mt-10">
          <BeforeAfterSlider
            before={interiorImage("before")}
            after={interiorImage(project.image)}
            alt={project.title}
          />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Gallery" title="Room by room" />
        <div className="mt-10">
          <InteriorGallery images={project.gallery} alt={project.title} />
        </div>
      </Section>

      <section className="bg-navy py-14 sm:py-[var(--spacing-section)]">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="rule-gold mx-auto mb-4" aria-hidden="true" />
            <h2 className="font-display text-display text-primary-foreground">
              Something similar for your home?
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setDialogOpen(true)}
                className="bg-gold px-7 py-2.5 text-body font-medium text-navy transition-colors hover:bg-sky"
              >
                Book a consultation
              </button>
              <a
                href="/support"
                className="border border-sky px-7 py-2.5 text-body font-medium text-primary-foreground transition-colors hover:border-gold hover:text-gold"
              >
                Contact customer support
              </a>
            </div>
          </div>
        </Container>
      </section>

      <ConsultationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        context={project.title}
      />
    </div>
  );
}

function ProjectNotFound() {
  return (
    <Section>
      <span className="rule-gold mb-4" aria-hidden="true" />
      <h1 className="text-heading text-navy">We could not find that project</h1>
      <p className="mt-3 text-caption text-muted-foreground">Browse the full portfolio instead.</p>
      <Link
        to="/interior-design/portfolio"
        className="mt-6 inline-block bg-navy px-6 py-3 text-body text-primary-foreground transition-colors hover:bg-beige hover:text-navy"
      >
        View the portfolio
      </Link>
    </Section>
  );
}
