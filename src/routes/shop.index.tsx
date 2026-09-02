import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ListingView } from "@/components/shop/ListingView";

const title = "Shop All Appliances — Fabluxe";
const description =
  "Browse the full Fabluxe catalogue of refrigerators, televisions, air conditioners, laundry and kitchen appliances, with filters for brand, price, rating and specification.";

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
  return (
    <ListingView
      eyebrow="The catalogue"
      title="Every appliance we carry, in one place"
      copy="Filter by brand, price, rating, availability and specification. Every product is delivered, installed and demonstrated by Fabluxe Home Solutions."
      crumbs={[{ label: "Home", to: "/" }, { label: "Shop" }]}
      items={products}
    />
  );
}
