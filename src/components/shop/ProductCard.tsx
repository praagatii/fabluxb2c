import { Heart, Plus } from "lucide-react";
import { discountPercent, formatPrice, type Product } from "@/data/products";
import { productImage } from "@/lib/product-images";
import { useStore } from "@/context/StoreContext";
import { SmartLink } from "@/components/common/SmartLink";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

type ProductCardProps = { product: Product; view?: "grid" | "list" };

export function ProductCard({ product, view = "grid" }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const wished = wishlist.includes(product.id);
  const discount = discountPercent(product);
  const list = view === "list";
  const hoverImage = product.images[1] ?? product.image;
  const categoryLabel = categories.find(
    (c) => c.slug === product.categorySlug && c.status === "live",
  )?.name;

  return (
    <article className={cn("group flex h-full flex-col", list && "sm:flex-row")}>
      <div
        className={cn(
          "relative aspect-square overflow-hidden rounded-[12px] bg-[#ececec]",
          list && "sm:aspect-4/3 sm:w-52 sm:shrink-0",
        )}
      >
        <img
          src={productImage(product.image)}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full scale-[1.01] object-cover transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-[1.05]"
        />
        <img
          src={productImage(hoverImage)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-[var(--ease-editorial)] group-hover:opacity-100"
        />

        <div className="absolute left-3 top-3 flex items-center gap-1.5">
          <span className="uppercase bg-navy px-2.5 py-1 text-[10px] font-semibold leading-none tracking-wide text-white">
            {categoryLabel ?? product.categorySlug}
          </span>
          {product.badge ? (
            <span className="uppercase bg-white/85 px-2.5 py-1 text-[10px] font-medium leading-none tracking-wide text-navy">
              {product.badge}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={wished}
          aria-label={`${wished ? "Remove from" : "Add to"} wishlist: ${product.name}`}
          className={cn(
            "absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/85 text-navy transition-colors hover:text-teal",
            wished && "text-gold",
          )}
        >
          <Heart className="h-4 w-4" aria-hidden="true" fill={wished ? "currentColor" : "none"} />
        </button>
      </div>

      <div className={cn("flex flex-1 flex-col", list ? "sm:px-5" : "pt-3")}>
        <p className="uppercase text-[11px] font-medium leading-relaxed tracking-wide text-muted-foreground">
          {product.brand}
        </p>
        <h3 className="mt-0.5 line-clamp-2 text-base leading-snug text-navy">
          <SmartLink to={`/shop/product/${product.id}`} className="transition-colors hover:text-teal">
            {product.name}
          </SmartLink>
        </h3>
        <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-2 pt-2.5">
          <span className="numeric text-base font-semibold text-navy">
            {formatPrice(product.price)}
          </span>
          {discount > 0 ? (
            <>
              <span className="numeric text-caption text-muted-foreground line-through">
                {formatPrice(product.mrp)}
              </span>
              <span className="numeric text-caption font-medium text-teal">{discount}% off</span>
            </>
          ) : null}
          <button
            type="button"
            onClick={() => addToCart(product.id)}
            aria-label={`Add to cart: ${product.name}`}
            className={cn(
              "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-sm bg-navy px-3.5 text-caption font-medium leading-none text-white transition-colors hover:bg-beige hover:text-navy",
              list ? "" : "sm:ml-auto",
            )}
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}
