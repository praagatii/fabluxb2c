import { createFileRoute, notFound } from "@tanstack/react-router";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { ListingView } from "@/components/shop/ListingView";

export const Route = createFileRoute("/shop/$category")({
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found — Fabluxe" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.category.name} — Fabluxe`;
    const description = `${loaderData.category.tagline}. Compare ${loaderData.category.name.toLowerCase()} by brand, price, rating and specification at Fabluxe.`;
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
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const items = products.filter((p) => p.categorySlug === category.slug);

  const subNav = [
    { label: "All", to: `/shop/${category.slug}`, active: true },
    ...category.subcategories.map((sub) => ({
      label: sub.name,
      to: `/shop/${category.slug}/${sub.slug}`,
    })),
  ];

  return (
    <ListingView
      eyebrow={category.fulfilledBy}
      title={category.name}
      copy={category.tagline}
      crumbs={[{ label: "Home", to: "/" }, { label: "Shop", to: "/shop" }, { label: category.name }]}
      items={items}
      subNav={subNav}
    />
  );
}
