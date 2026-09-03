import { createFileRoute } from "@tanstack/react-router";
import { formatPrice, getProduct } from "@/data/products";
import { productImage } from "@/lib/product-images";
import { useStore } from "@/context/StoreContext";
import { AccountLayout } from "@/components/account/AccountLayout";
import { SmartLink } from "@/components/common/SmartLink";

const title = "Saved items — Fabluxe Account";
const description = "The products you have saved to your Fabluxe wishlist.";

export const Route = createFileRoute("/account/wishlist")({
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
  component: AccountWishlistPage,
});

function AccountWishlistPage() {
  const { wishlist, addToCart, removeFromWishlist } = useStore();
  const items = wishlist.flatMap((id) => {
    const product = getProduct(id);
    return product ? [product] : [];
  });

  return (
    <AccountLayout title="Wishlist" crumbs={[{ label: "Wishlist" }]}>
      {items.length === 0 ? (
        <div className="border border-border bg-card p-10 text-center">
<h2 className="text-heading text-navy">Nothing saved yet</h2>
          <p className="mx-auto mt-3 max-w-sm text-caption text-muted-foreground">
            Tap the heart on any product to keep it here for later.
          </p>
          <SmartLink
            to="/shop"
            className="mt-6 inline-block bg-navy px-6 py-3 text-body font-medium text-primary-foreground transition-colors hover:bg-beige hover:text-navy"
          >
            Browse the catalogue
          </SmartLink>
        </div>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2">
          {items.map((product) => (
            <li key={product.id} className="flex gap-4 border border-border bg-card p-4">
              <img
                src={productImage(product.image)}
                alt={product.name}
                loading="lazy"
                className="aspect-4/3 w-28 shrink-0 object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="label-eyebrow text-teal">{product.brand}</p>
                <p className="mt-1 text-body leading-snug text-navy">
                  <SmartLink to={`/shop/product/${product.id}`} className="link-gold">
                    {product.name}
                  </SmartLink>
                </p>
                <p className="numeric mt-1 text-body text-navy">{formatPrice(product.price)}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-body">
                  <button
                    type="button"
                    onClick={() => addToCart(product.id)}
                    className="bg-navy px-3 py-2 font-medium text-primary-foreground transition-colors hover:bg-beige hover:text-navy"
                  >
                    Move to cart
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(product.id)}
                    className="text-muted-foreground transition-colors hover:text-teal"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AccountLayout>
  );
}
