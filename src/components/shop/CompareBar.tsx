import { X } from "lucide-react";
import { getProduct } from "@/data/products";
import { categories } from "@/data/categories";
import { productImage } from "@/lib/product-images";
import { useStore } from "@/context/StoreContext";
import { SmartLink } from "@/components/common/SmartLink";

/**
 * Persistent compare bar. Appears as soon as one product is added to compare
 * and stays docked to the bottom of the viewport.
 */
export function CompareBar() {
  const { compare, compareCategory, compareNotice, dismissCompareNotice, removeFromCompare, clearCompare } =
    useStore();

  if (compare.length === 0 && !compareNotice) return null;

  const categoryName = categories.find((c) => c.slug === compareCategory)?.name;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/20 bg-card/95 backdrop-blur [padding-bottom:env(safe-area-inset-bottom)]">
      <div aria-live="polite">
        {compareNotice ? (
          <div className="flex items-start justify-between gap-4 bg-navy px-5 py-3 text-caption text-beige sm:px-8">
            <p className="max-w-3xl leading-relaxed">{compareNotice}</p>
            <button
              type="button"
              onClick={dismissCompareNotice}
              aria-label="Dismiss compare message"
              className="shrink-0 text-gold"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>

      {compare.length > 0 ? (
        <div className="mx-auto flex w-full max-w-[80rem] flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="min-w-0">
            <p className="label-eyebrow text-teal">
              Comparing {categoryName ? `· ${categoryName}` : ""}
            </p>
            <ul className="mt-2 flex flex-wrap items-center gap-2">
              {compare.map((id) => {
                const product = getProduct(id);
                if (!product) return null;
                return (
                  <li
                    key={id}
                    className="flex items-center gap-2 border border-border bg-background py-1 pl-1 pr-2"
                  >
                    <img
                      src={productImage(product.image)}
                      alt=""
                      aria-hidden="true"
                      className="h-8 w-10 object-cover"
                    />
                    <span className="max-w-[9rem] truncate text-caption text-navy">{product.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFromCompare(id)}
                      aria-label={`Remove ${product.name} from compare`}
                      className="text-muted-foreground transition-colors hover:text-teal"
                    >
                      <X className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={clearCompare}
              className="text-caption text-muted-foreground underline-offset-4 transition-colors hover:text-teal hover:underline"
            >
              Clear all
            </button>
            <SmartLink
              to="/compare"
              className="bg-navy px-5 py-3 text-body font-medium text-primary-foreground transition-colors hover:bg-beige hover:text-navy"
            >
              Compare {compare.length}
            </SmartLink>
          </div>
        </div>
      ) : null}
    </div>
  );
}
