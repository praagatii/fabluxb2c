import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Section, Container } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { ConsultationDialog } from "@/components/interiors/ConsultationDialog";
import { InteriorGallery } from "@/components/interiors/InteriorGallery";
import { interiorImage } from "@/lib/interior-images";
import { styleById, roomTypeLabel, projectsForStyle } from "@/data/interiors";

export const Route = createFileRoute("/interior-design/styles/$styleId")({
  loader: ({ params }) => {
    const style = styleById(params.styleId);
    if (!style) throw notFound();
    return { style };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Style unavailable — Fabluxora Interiors" }, { name: "robots", content: "noindex" }],
      };
    }
    const { style } = loaderData;
    const description = `${style.tagline}. Materials, finishes and completed ${style.name} projects by Fabluxora Interiors. Enquiry only.`;
    return {
      meta: [
        { title: `${style.name} Interiors — Fabluxora Interiors` },
        { name: "description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:title", content: `${style.name} Interiors` },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: StyleNotFound,
  component: StyleDetail,
});

function StyleDetail() {
  const { style } = Route.useLoaderData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const related = projectsForStyle(style.id);

  return (
    <div className="bg-background">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Interior Design", to: "/interior-design" },
            { label: style.name },
          ]}
        />
      </Container>

      <section className="relative">
        <img
          src={interiorImage(style.image)}
          alt={`${style.name} interior`}
          width={1200}
          height={900}
          className="h-[58vh] min-h-[22rem] w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/55" aria-hidden="true" />
        <div className="absolute inset-0 grid items-end pb-10 sm:pb-16">
          <Container>
            <span className="rule-gold mb-4" aria-hidden="true" />
            <p className="label-eyebrow text-gold">Room style</p>
            <h1 className="mt-3 font-display text-display text-primary-foreground">
              {style.name}
            </h1>
            <p className="mt-3 max-w-xl text-body text-sky">{style.tagline}</p>
          </Container>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="rule-gold mb-4" aria-hidden="true" />
            <p className="label-eyebrow text-teal">The idea</p>
            <p className="mt-4 text-heading leading-snug text-navy">{style.intro}</p>
            {style.description.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-body leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <div className="mt-8">
              <p className="label-eyebrow text-teal">Rooms it suits</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {style.suits.map((id) => (
                  <li
                    key={id}
                    className="border border-border bg-card px-4 py-2 text-caption uppercase tracking-[0.12em] text-navy"
                  >
                    {roomTypeLabel(id)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="border border-border bg-beige p-6">
            <span className="rule-gold mb-3" aria-hidden="true" />
            <p className="label-eyebrow text-teal">Materials and finishes</p>
            <ul className="mt-4 divide-y divide-border">
              {style.materials.map((material) => (
                <li key={material.name} className="py-3">
                  <p className="text-caption text-navy">{material.name}</p>
                  <p className="text-caption text-muted-foreground">{material.note}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      <Section className="bg-beige">
        <SectionHeading eyebrow="Gallery" title={`${style.name} in completed homes`} />
        <div className="mt-10">
          <InteriorGallery images={style.gallery} alt={style.name} />
        </div>
      </Section>

      {related.length > 0 ? (
        <Section>
          <SectionHeading eyebrow="Related projects" title="From the portfolio" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((project) => (
              <li key={project.id}>
                <Link
                  to="/interior-design/portfolio/$projectId"
                  params={{ projectId: project.id }}
                  className="group block border border-border bg-card"
                >
                  <img
                    src={interiorImage(project.image)}
                    alt={project.title}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="p-6">
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
      ) : null}

      <section className="bg-navy py-14 sm:py-[var(--spacing-section)]">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="rule-gold mx-auto mb-4" aria-hidden="true" />
            <h2 className="font-display text-display text-primary-foreground">
              Take {style.name} further
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
        context={style.name}
      />
    </div>
  );
}

function StyleNotFound() {
  return (
    <Section>
      <span className="rule-gold mb-4" aria-hidden="true" />
      <h1 className="text-heading text-navy">We could not find that style</h1>
      <p className="mt-3 text-caption text-muted-foreground">
        It may have been renamed. Browse the six current room styles instead.
      </p>
      <Link
        to="/interior-design"
        className="mt-6 inline-block bg-navy px-6 py-3 text-body text-primary-foreground transition-colors hover:bg-beige hover:text-navy"
      >
        Back to interior design
      </Link>
    </Section>
  );
}
