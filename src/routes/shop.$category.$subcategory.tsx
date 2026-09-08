import { createFileRoute, notFound } from "@tanstack/react-router";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { ListingView } from "@/components/shop/ListingView";
import { categoryBanner } from "@/lib/category-banners";

export const Route = createFileRoute("/shop/$category/$subcategory")({
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.category);
    const subcategory = category?.subcategories.find((s) => s.slug === params.subcategory);
    if (!category || !subcategory) throw notFound();
    return { category, subcategory };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Category not found — Fabluxe" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.subcategory.name} ${loaderData.category.name} — Fabluxe`;
    const description = `Shop ${loaderData.subcategory.name.toLowerCase()} ${loaderData.category.name.toLowerCase()} at Fabluxe, with delivery, installation and demonstration included.`;
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
  component: SubcategoryPage,
});

function SubcategoryPage() {
  const { category, subcategory } = Route.useLoaderData();
  const items = products.filter(
    (p) => p.categorySlug === category.slug && p.subcategorySlug === subcategory.slug,
  );

  const subNav = [
    { label: "All", to: `/shop/${category.slug}` },
    ...category.subcategories.map((sub) => ({
      label: sub.name,
      to: `/shop/${category.slug}/${sub.slug}`,
      active: sub.slug === subcategory.slug,
    })),
  ];

  return (
    <ListingView
      eyebrow={category.name}
      title={subcategory.name}
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Shop", to: "/shop" },
        { label: category.name, to: `/shop/${category.slug}` },
        { label: subcategory.name },
      ]}
      items={items}
      subNav={subNav}
      banner={categoryBanner(category.slug)}
    />
  );
}
