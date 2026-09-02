import { Heart, Star } from "lucide-react";
import { discountPercent, formatPrice, type Product } from "@/data/products";
import { productImage } from "@/lib/product-images";
import { useStore } from "@/context/StoreContext";
import { SmartLink } from "@/components/common/SmartLink";
import { cn } from "@/lib/utils";

type ProductCardProps = { product: Product; view?: "grid" | "list" };

export function ProductCard({ product, view = "grid" }: ProductCardProps) {
  const { addToCart, toggleWishlist, toggleCompare, wishlist, compare } = useStore();
  const discount = discountPercent(product);
  const wished = wishlist.includes(product.id);
  const compared = compare.includes(product.id);
  const list = view === "list";
  const hoverImage = product.images[1] ?? product.image;

  return (
    <article
      className={cn(
        "group flex h-full border border-border bg-card",
        list ? "flex-col sm:flex-row" : "flex-col",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-sky/40",
          list ? "aspect-4/3 sm:w-64 sm:shrink-0" : "aspect-4/3",
        )}
      >
        <img
          src={productImage(product.image)}
          alt={product.name}
          loading="lazy"
          width={1600}
          height={900}
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
          <span className="label-eyebrow absolute left-0 top-4 bg-navy px-3 py-1.5 text-gold">
            {product.badge}
          </span>
        ) : null}
        <button
          type="button"
          aria-pressed={wished}
          aria-label={`${wished ? "Remove from" : "Add to"} wishlist: ${product.name}`}
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            "absolute right-3 top-3 grid h-9 w-9 place-items-center bg-card text-navy transition-colors hover:text-teal",
            wished && "text-gold",
          )}
        >
          <Heart className="h-4 w-4" aria-hidden="true" fill={wished ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="label-eyebrow text-teal">{product.brand}</p>
        <h3 className="mt-2 font-display text-lg leading-snug text-navy">
          <SmartLink to={`/shop/product/${product.id}`} className="link-gold">
            {product.name}
          </SmartLink>
        </h3>

        <p className="mt-2 text-xs text-muted-foreground">{product.specs.slice(0, 3).join(" · ")}</p>

        {list ? (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        ) : null}

        <div className="mt-4 flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 text-gold" fill="currentColor" aria-hidden="true" />
          <span className="numeric text-xs text-navy">{product.rating.toFixed(1)}</span>
          <span className="numeric text-xs text-muted-foreground">
            ({product.reviewCount} reviews)
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-baseline gap-2">
          <span className="numeric text-lg font-semibold text-navy">
            {formatPrice(product.price)}
          </span>
          <span className="numeric text-xs text-muted-foreground line-through">
            {formatPrice(product.mrp)}
          </span>
          <span className="numeric bg-beige px-2 py-0.5 text-xs font-semibold text-teal">
            {discount}% off
          </span>
        </div>

        <p className="mt-2 text-xs text-muted-foreground">
          {product.availability} · Fulfilled by {product.fulfilledBy}
        </p>

        <div className={cn("mt-5 flex flex-col gap-3", list && "sm:flex-row sm:items-center")}>
          <button
            type="button"
            onClick={() => addToCart(product.id)}
            className="w-full bg-navy px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-teal sm:w-auto sm:flex-1"
          >
            Add to cart
          </button>
          <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={compared}
              onChange={() => toggleCompare(product.id)}
              className="h-4 w-4 accent-[var(--color-teal)]"
            />
            Add to compare
          </label>
        </div>
      </div>
    </article>
  );
}
