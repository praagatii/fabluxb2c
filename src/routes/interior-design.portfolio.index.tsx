import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, Container } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { interiorImage } from "@/lib/interior-images";
import { projects, roomStyles, roomTypes, roomTypeLabel, styleById } from "@/data/interiors";

export const Route = createFileRoute("/interior-design/portfolio/")({
  head: () => ({
    meta: [
      { title: "Interiors Portfolio — Completed Homes by Fabluxora Interiors" },
      {
        name: "description",
        content:
          "Twelve completed interior projects across Bengaluru, Mumbai, Kolkata, Pune, Chennai, Delhi and Goa. Filter by room type, style and city.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Interiors Portfolio — Fabluxora Interiors" },
      {
        property: "og:description",
        content: "Completed rooms and full-home fit-outs, filterable by room type, style and city.",
      },
    ],
  }),
  component: PortfolioIndex,
});

function PortfolioIndex() {
  const [room, setRoom] = useState("all");
  const [style, setStyle] = useState("all");
  const [city, setCity] = useState("all");

  const cities = useMemo(
    () => Array.from(new Set(projects.map((project) => project.city))).sort(),
    [],
  );

  const filtered = projects.filter(
    (project) =>
      (room === "all" || project.roomTypeId === room) &&
      (style === "all" || project.styleId === style) &&
      (city === "all" || project.city === city),
  );

  const selectClass =
    "border border-border bg-card px-3 py-2 text-body text-navy focus:outline-none focus:ring-1 focus:ring-teal";

  return (
    <div className="bg-background">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Interior Design", to: "/interior-design" },
            { label: "Portfolio" },
          ]}
        />
      </Container>

      <Section>
        <SectionHeading
          as="h1"
          eyebrow="Portfolio"
          title="Twelve homes, finished and lived in"
        />

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <label className="grid gap-1.5">
            <span className="label-eyebrow text-teal">Room type</span>
            <select value={room} onChange={(e) => setRoom(e.target.value)} className={selectClass}>
              <option value="all">All room types</option>
              {roomTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5">
            <span className="label-eyebrow text-teal">Style</span>
            <select value={style} onChange={(e) => setStyle(e.target.value)} className={selectClass}>
              <option value="all">All styles</option>
              {roomStyles.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5">
            <span className="label-eyebrow text-teal">City</span>
            <select value={city} onChange={(e) => setCity(e.target.value)} className={selectClass}>
              <option value="all">All cities</option>
              {cities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="mt-6 text-caption text-muted-foreground">
          Showing {filtered.length} of {projects.length} projects
        </p>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <li key={project.id}>
              <Link
                to="/interior-design/portfolio/$projectId"
                params={{ projectId: project.id }}
                className="group flex h-full flex-col overflow-hidden rounded-[12px] border border-border bg-card transition-shadow hover:shadow-[var(--shadow-soft)]"
              >
                <img
                  src={interiorImage(project.image)}
                  alt={project.title}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="label-eyebrow text-teal">
                    {roomTypeLabel(project.roomTypeId)} · {project.city}
                  </p>
                  <h2 className="mt-3 text-heading leading-snug text-navy">
                    {project.title}
                  </h2>
                  <p className="mt-auto pt-4 text-caption text-muted-foreground">
                    {styleById(project.styleId)?.name} · {project.area} · {project.year}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {filtered.length === 0 ? (
          <p className="mt-10 border border-border bg-card p-8 text-center text-caption text-muted-foreground">
            No projects match that combination yet. Try widening one of the filters.
          </p>
        ) : null}
      </Section>
    </div>
  );
}
