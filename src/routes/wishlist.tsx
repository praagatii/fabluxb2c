import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Share2 } from "lucide-react";
import { getProduct, type Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { Container } from "@/components/common/Section";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { SmartLink } from "@/components/common/SmartLink";
import { ProductCard } from "@/components/shop/ProductCard";

const title = "Your Wishlist — Fabluxe";
const description =
  "Saved Fabluxe appliances and interiors pieces. Move items to your cart, remove them, or share your wishlist.";

export const Route = createFileRoute("/wishlist")({
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
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useStore();
  const [shared, setShared] = useState(false);
  const items = wishlist.map((id) => getProduct(id)).filter((p): p is Product => Boolean(p));

  return (
    <div className="pb-24">
      <Container>
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Wishlist" }]} />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label-eyebrow text-teal">Saved for later</p>
            <h1 className="mt-3 font-display text-display text-navy">Your wishlist</h1>
            <p className="mt-2 text-body text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          {items.length > 0 ? (
            <button
              type="button"
              onClick={() => setShared(true)}
              className="inline-flex items-center gap-2 border border-navy px-5 py-3 text-body font-medium text-navy transition-colors hover:bg-navy hover:text-primary-foreground"
            >
              <Share2 className="h-4 w-4" aria-hidden="true" />
              Share wishlist
            </button>
          ) : null}
        </div>
        {shared ? (
          <p aria-live="polite" className="mt-4 bg-sky/50 px-4 py-3 text-caption text-navy">
            Share link copied — fabluxe.in/wishlist/shared/8f2c41 (prototype placeholder).
          </p>
        ) : null}
      </Container>

      <Container className="py-10">
        {items.length === 0 ? (
          <div className="border border-border bg-card p-12 text-center">
            <h2 className="font-display text-heading text-navy">Your wishlist is empty</h2>
            <p className="mx-auto mt-3 max-w-md text-body leading-relaxed text-muted-foreground">
              Tap the heart on any product to keep it here while you decide.
            </p>
            <SmartLink
              to="/shop"
              className="mt-6 inline-block bg-navy px-6 py-3 text-body font-medium text-primary-foreground transition-colors hover:bg-teal"
            >
              Start browsing
            </SmartLink>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
}
