import { categoryGroups } from "@/data/categories";
import { categoryGroupImage } from "@/lib/category-group-images";
import { Section } from "@/components/common/Section";
import { SmartLink } from "@/components/common/SmartLink";

/** Image-led broad category tiles. Each group uses its own photograph so no
 * tile repeats, and the image gently scales up on hover to indicate selection. */
export function ShopByCategory() {
  const shown = categoryGroups.filter((g) => g.status === "live");

  return (
    <Section className="bg-transparent">
      <p className="label-eyebrow text-teal">Categories</p>
      <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((group) => (
          <li key={group.id}>
            <SmartLink
              to={group.to ?? `/categories/${group.slug}`}
              className="category-card relative block bg-sky/40"
            >
              <img
                src={categoryGroupImage(group.slug)}
                alt={group.name}
                loading="lazy"
                width={1600}
                height={900}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy/55 via-transparent to-transparent" />
              <h3 className="absolute bottom-0 left-0 p-5 font-display text-heading text-beige">
                {group.name}
              </h3>
            </SmartLink>
          </li>
        ))}
      </ul>
    </Section>
  );
}
