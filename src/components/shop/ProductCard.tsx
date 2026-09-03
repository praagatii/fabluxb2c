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
          aria-pressed={wished}
          aria-label={`${wished ? "Remove from" : "Add to"} wishlist: ${product.name}`}
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            "absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/85 text-navy transition-colors hover:text-teal",
            wished && "text-gold",
          )}
        >
          <Heart className="h-4 w-4" aria-hidden="true" fill={wished ? "currentColor" : "none"} />
        </button>

        <button
          type="button"
          onClick={() => addToCart(product.id)}
          aria-label={`Add to cart: ${product.name}`}
          className={cn(
            "absolute bottom-3 left-1/2 grid -translate-x-1/2 items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-caption font-medium text-white transition-all duration-300 ease-[var(--ease-editorial)] hover:bg-teal",
            list ? "sm:left-3 sm:translate-x-0" : "",
          )}
        >
          <span className="hidden sm:inline">Add to cart</span>
          <Plus className="h-4 w-4 sm:hidden" aria-hidden="true" />
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
        <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
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
        </div>
      </div>
    </article>
  );
}
