import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Share2, Trash2 } from "lucide-react";
import { formatPrice, getProduct, type Product } from "@/data/products";
import { productImage } from "@/lib/product-images";
import { useStore } from "@/context/StoreContext";
import { Container } from "@/components/common/Section";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { SmartLink } from "@/components/common/SmartLink";

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
  const { wishlist, removeFromWishlist, addToCart } = useStore();
  const [shared, setShared] = useState(false);
  const items = wishlist.map((id) => getProduct(id)).filter((p): p is Product => Boolean(p));

  const moveToCart = (id: string) => {
    addToCart(id);
    removeFromWishlist(id);
  };

  return (
    <div className="pb-24">
      <Container>
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Wishlist" }]} />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="rule-gold mb-4" aria-hidden="true" />
            <p className="label-eyebrow text-teal">Saved for later</p>
            <h1 className="mt-3 font-display text-3xl text-navy sm:text-4xl">Your wishlist</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          {items.length > 0 ? (
            <button
              type="button"
              onClick={() => setShared(true)}
              className="inline-flex items-center gap-2 border border-navy px-5 py-3 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-primary-foreground"
            >
              <Share2 className="h-4 w-4" aria-hidden="true" />
              Share wishlist
            </button>
          ) : null}
        </div>
        {shared ? (
          <p aria-live="polite" className="mt-4 bg-sky/50 px-4 py-3 text-xs text-navy">
            Share link copied — fabluxe.in/wishlist/shared/8f2c41 (prototype placeholder).
          </p>
        ) : null}
      </Container>

      <Container className="py-10">
        {items.length === 0 ? (
          <div className="border border-border bg-card p-12 text-center">
            <h2 className="font-display text-2xl text-navy">Your wishlist is empty</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Tap the heart on any product to keep it here while you decide. Wishlists are a good
              way to hold a shortlist before an interiors consultation.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <SmartLink
                to="/shop"
                className="bg-navy px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-teal"
              >
                Start browsing
              </SmartLink>
              <SmartLink
                to="/shop/televisions"
                className="border border-navy px-6 py-3 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-primary-foreground"
              >
                See new arrivals
              </SmartLink>
            </div>
          </div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product) => (
              <li key={product.id} className="flex h-full flex-col border border-border bg-card">
                <SmartLink to={`/shop/product/${product.id}`} className="block aspect-4/3 bg-sky/40">
                  <img
                    src={productImage(product.image)}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </SmartLink>
                <div className="flex flex-1 flex-col p-5">
                  <p className="label-eyebrow text-teal">{product.brand}</p>
                  <h2 className="mt-2 font-display text-lg leading-snug text-navy">
                    <SmartLink to={`/shop/product/${product.id}`} className="link-gold">
                      {product.name}
                    </SmartLink>
                  </h2>
                  <p className="numeric mt-3 text-lg font-semibold text-navy">
                    {formatPrice(product.price)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {product.availability} · Fulfilled by {product.fulfilledBy}
                  </p>
                  <div className="mt-auto flex items-center gap-3 pt-5">
                    <button
                      type="button"
                      onClick={() => moveToCart(product.id)}
                      className="flex-1 bg-navy px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-teal"
                    >
                      Move to cart
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromWishlist(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="grid h-11 w-11 place-items-center border border-border text-muted-foreground transition-colors hover:text-teal"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
}
