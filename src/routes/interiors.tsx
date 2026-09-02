import { createFileRoute, notFound } from "@tanstack/react-router";
import { getDivision } from "@/data/divisions";
import { DivisionLanding } from "@/components/division/DivisionLanding";

export const Route = createFileRoute("/interiors")({
  loader: () => {
    const division = getDivision("interiors");
    if (!division) throw notFound();
    return { division };
  },
  head: ({ loaderData }) => {
    const d = loaderData?.division;
    return {
      meta: d
        ? [
            { title: `${d.name} — Fabluxe` },
            { name: "description", content: d.intro },
            { property: "og:type", content: "website" },
          ]
        : [{ title: "Fabluxe" }],
    };
  },
  component: InteriorsDivision,
});

function InteriorsDivision() {
  const { division } = Route.useLoaderData();
  return <DivisionLanding division={division} />;
}