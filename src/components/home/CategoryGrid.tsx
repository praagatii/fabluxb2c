import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SmartLink } from "@/components/common/SmartLink";

function CategoryTile({ category }: { category: (typeof categories)[number] }) {
  const disabled = category.status === "coming-soon";

  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-heading leading-snug text-navy">{category.name}</h3>
        {disabled ? (
          <span className="label-eyebrow shrink-0 bg-sky px-2 py-1 text-teal">Coming soon</span>
        ) : (
          <ArrowRight
            className="h-4 w-4 shrink-0 text-teal transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
      </div>
      <p className="mt-2 text-caption text-muted-foreground">{category.tagline}</p>
      <p className="numeric mt-6 text-caption text-teal">
        {disabled ? "In development" : `${category.productCount} products`}
      </p>
    </>
  );

  if (disabled) {
    return (
      <div
        aria-disabled="true"
        className="flex h-full flex-col border border-dashed border-border bg-card/50 p-6 opacity-70"
      >
        {body}
      </div>
    );
  }

  return (
    <SmartLink
      to={`/shop/${category.slug}`}
      className="group flex h-full flex-col border border-border bg-card p-6 transition-colors hover:border-gold"
    >
      {body}
    </SmartLink>
  );
}

export function CategoryGrid() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Shop by category"
        title="Everything for the considered home"
        copy="Categories are generated from the catalogue, so new ranges appear here the moment they are added."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryTile key={category.id} category={category} />
        ))}
      </div>
    </Section>
  );
}
