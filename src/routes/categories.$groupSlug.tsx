import { createFileRoute, notFound } from "@tanstack/react-router";
import { categories, getCategoryGroup } from "@/data/categories";
import { products } from "@/data/products";
import { productImage } from "@/lib/product-images";
import { categoryGroupImage } from "@/lib/category-group-images";
import { Container } from "@/components/common/Section";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { SmartLink } from "@/components/common/SmartLink";

export const Route = createFileRoute("/categories/$groupSlug")({
  loader: ({ params }) => {
    const group = getCategoryGroup(params.groupSlug);
    if (!group) throw notFound();
    return { group };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found — Fabluxe" }, { name: "robots", content: "noindex" }] };
    }
    const { group } = loaderData;
    const title = `${group.name} — Fabluxe`;
    const description = `${group.tagline}. Shop ${group.name.toLowerCase()} at Fabluxe, with delivery and installation included.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoryGroupPage,
});

function CategoryGroupPage() {
  const { group } = Route.useLoaderData();
  const members = categories.filter((c) => group.memberCategorySlugs.includes(c.slug));

  return (
    <div>
      <Container>
        <div className="py-14 sm:py-[var(--spacing-section)]">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Shop", to: "/shop" }, { label: group.name }]} />
          <span className="rule-gold mb-4 mt-8 block" aria-hidden="true" />
          <p className="label-eyebrow text-teal">{group.name}</p>
          <h1 className="mt-3 text-display text-navy">{group.name}</h1>
          <p className="mt-4 max-w-2xl text-body leading-relaxed text-muted-foreground">
            {group.tagline}
          </p>
        </div>
      </Container>

      <Container className="pb-16">
        {members.length === 0 ? (
          <div className="border border-border bg-card p-12 text-center">
            <h2 className="text-heading text-navy">Coming soon</h2>
            <p className="mx-auto mt-3 max-w-md text-caption text-muted-foreground">
              This range is being prepared. Browse the rest of the catalogue in the meantime.
            </p>
            <SmartLink
              to="/shop"
              className="mt-6 inline-block bg-navy px-6 py-3 text-body font-medium text-primary-foreground transition-colors hover:bg-beige hover:text-navy"
            >
              Browse the catalogue
            </SmartLink>
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => {
              const hero = products.find((p) => p.categorySlug === member.slug);
              const image = hero
                ? productImage(hero.image)
                : categoryGroupImage(member.slug === "furniture" ? "furniture" : "appliances");
              return (
                <li key={member.id}>
                  <SmartLink
                    to={`/shop/${member.slug}`}
                    className="group relative block overflow-hidden bg-sky/40"
                  >
                    <img
                      src={image}
                      alt={member.name}
                      loading="lazy"
                      width={1600}
                      height={900}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-navy/55 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h2 className="font-display text-heading text-beige">{member.name}</h2>
                      <p className="mt-1 text-caption text-beige/80">{member.tagline}</p>
                    </div>
                  </SmartLink>
                </li>
              );
            })}
          </ul>
        )}
      </Container>
    </div>
  );
}
