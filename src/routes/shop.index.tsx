import { createFileRoute } from "@tanstack/react-router";
import { ListingView } from "@/components/shop/ListingView";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

const title = "Shop — Fabluxe";
const description =
  "Shop home electronics, kitchen, furniture and interiors at Fabluxe, with delivery and installation included.";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopIndex,
});

function ShopIndex() {
  const subNav = categories
    .filter((c) => c.status === "live")
    .map((c) => ({ label: c.name, to: `/shop/${c.slug}` }));

  return (
    <ListingView
      eyebrow="Fabluxe"
      title="Shop"
      crumbs={[{ label: "Home" }, { label: "Shop" }]}
      items={products}
      subNav={subNav}
    />
  );
}
