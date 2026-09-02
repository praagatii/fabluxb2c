import { Heart, Star } from "lucide-react";
import { discountPercent, formatPrice, type Product } from "@/data/products";
import { productImage } from "@/lib/product-images";
import { useStore } from "@/context/StoreContext";
import { SmartLink } from "@/components/common/SmartLink";
import { cn } from "@/lib/utils";

type ProductCardProps = { product: Product; view?: "grid" | "list" };

export function ProductCard({ product, view = "grid" }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const wished = wishlist.includes(product.id);
  const discount = discountPercent(product);
  const list = view === "list";
  const hoverImage = product.images[1] ?? product.image;

  return (
    <article
      className={cn(
        "group flex h-full flex-col border border-border bg-card",
        list && "sm:flex-row",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-sky/40",
          list ? "aspect-4/3 sm:w-48 sm:shrink-0" : "aspect-4/3",
        )}
      >
        <img
          src={productImage(product.image)}
          alt={product.name}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover transition-opacity duration-500 ease-[var(--ease-editorial)] group-hover:opacity-0"
        />
        <img
          src={productImage(hoverImage)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-[1.03] object-cover opacity-0 transition-opacity duration-500 ease-[var(--ease-editorial)] group-hover:opacity-100"
        />
        {product.badge ? (
          <span className="label-eyebrow absolute left-0 top-3 bg-navy px-2.5 py-1 text-gold">
            {product.badge}
          </span>
        ) : null}
        <button
          type="button"
          aria-pressed={wished}
          aria-label={`${wished ? "Remove from" : "Add to"} wishlist: ${product.name}`}
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            "absolute right-2 top-2 grid h-8 w-8 place-items-center bg-card text-navy transition-colors hover:text-teal",
            wished && "text-gold",
          )}
        >
          <Heart className="h-4 w-4" aria-hidden="true" fill={wished ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="label-eyebrow text-teal">{product.brand}</p>
        <h3 className="mt-1 text-heading leading-snug text-navy">
          <SmartLink to={`/shop/product/${product.id}`} className="link-gold">
            {product.name}
          </SmartLink>
        </h3>
        <div className="mt-1.5 flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 text-gold" fill="currentColor" aria-hidden="true" />
          <span className="numeric text-caption text-navy">{product.rating.toFixed(1)}</span>
        </div>
        <div className="mt-2 flex flex-wrap items-baseline gap-2">
          <span className="numeric text-body font-semibold text-navy">
            {formatPrice(product.price)}
          </span>
          <span className="numeric text-caption text-muted-foreground line-through">
            {formatPrice(product.mrp)}
          </span>
          <span className="numeric bg-beige px-1.5 py-0.5 text-caption font-semibold text-teal">
            {discount}% off
          </span>
        </div>
        <div className="mt-auto pt-3">
          <button
            type="button"
            onClick={() => addToCart(product.id)}
            className="flex w-full items-center justify-center border border-navy px-3 py-2 text-caption font-medium text-navy transition-colors hover:bg-navy hover:text-primary-foreground"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}