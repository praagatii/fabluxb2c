import { createFileRoute } from "@tanstack/react-router";
import { X, Star } from "lucide-react";
import { discountPercent, formatPrice, getProduct, type Product } from "@/data/products";
import { categories } from "@/data/categories";
import { productImage } from "@/lib/product-images";
import { useStore } from "@/context/StoreContext";
import { Container } from "@/components/common/Section";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { SmartLink } from "@/components/common/SmartLink";
import { cn } from "@/lib/utils";

const title = "Compare Products — Fabluxe";
const description =
  "Compare up to four Fabluxe appliances side by side within a single category, with differing specifications highlighted.";

export const Route = createFileRoute("/compare")({
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
  component: ComparePage,
});

/** Union of every spec label across the compared products, in stable order */
function specLabels(items: Product[]) {
  const labels: string[] = [];
  for (const item of items) {
    for (const group of item.specTable) {
      for (const row of group.rows) {
        if (!labels.includes(row.label)) labels.push(row.label);
      }
    }
  }
  return labels;
}

const specValue = (product: Product, label: string) =>
  product.specTable.flatMap((g) => g.rows).find((r) => r.label === label)?.value ?? "—";

function ComparePage() {
  const { compare, removeFromCompare, clearCompare, addToCart, compareCategory } = useStore();
  const items = compare.map((id) => getProduct(id)).filter((p): p is Product => Boolean(p));
  const categoryName = categories.find((c) => c.slug === compareCategory)?.name;

  return (
    <div className="pb-40">
      <Container>
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Compare" }]} />
        <span className="rule-gold mb-4" aria-hidden="true" />
        <p className="label-eyebrow text-teal">Like for like</p>
        <h1 className="mt-3 font-display text-display text-navy">
          Compare {categoryName ?? "products"}
        </h1>
      </Container>

      {items.length === 0 ? (
        <Container className="py-14">
          <div className="border border-border bg-card p-10 text-center">
            <h2 className="text-heading text-navy">Nothing to compare yet</h2>
            <p className="mx-auto mt-3 max-w-md text-caption text-muted-foreground">
              Tick “Add to compare” on any product card to build a side-by-side table.
            </p>
            <SmartLink
              to="/shop"
              className="mt-6 inline-block bg-navy px-6 py-3 text-body font-medium text-primary-foreground transition-colors hover:bg-beige hover:text-navy"
            >
              Browse the catalogue
            </SmartLink>
          </div>
        </Container>
      ) : (
        <Container className="py-14 sm:py-[var(--spacing-section)]">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="text-caption text-muted-foreground">
              {items.length} of 4 products · differing rows are highlighted
            </p>
            <button
              type="button"
              onClick={clearCompare}
              className="text-body text-muted-foreground underline-offset-4 transition-colors hover:text-teal hover:underline"
            >
              Clear comparison
            </button>
          </div>

          <div className="overflow-x-auto border border-border bg-card">
            <table className="w-full min-w-[48rem] border-collapse text-left">
              <thead className="sticky top-0 z-10 bg-card">
                <tr>
                  <th scope="col" className="w-44 border-b border-border p-4 align-top">
                    <span className="label-eyebrow text-teal">Product</span>
                  </th>
                  {items.map((product) => (
                    <th
                      key={product.id}
                      scope="col"
                      className="min-w-56 border-b border-l border-border p-4 align-top"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <img
                          src={productImage(product.image)}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          className="h-24 w-full max-w-36 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeFromCompare(product.id)}
                          aria-label={`Remove ${product.name}`}
                          className="text-muted-foreground transition-colors hover:text-teal"
                        >
                          <X className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="label-eyebrow mt-3 text-teal">{product.brand}</p>
                      <SmartLink
                        to={`/shop/product/${product.id}`}
                        className="link-gold mt-1 block text-body font-normal leading-snug text-navy"
                      >
                        {product.name}
                      </SmartLink>
                      <span className="mt-2 flex items-center gap-1.5">
                        <Star
                          className="h-3.5 w-3.5 text-gold"
                          fill="currentColor"
                          aria-hidden="true"
                        />
                        <span className="numeric text-caption text-navy">
                          {product.rating.toFixed(1)}
                        </span>
                        <span className="numeric text-caption text-muted-foreground">
                          ({product.reviewCount})
                        </span>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th scope="row" className="border-b border-border p-4 text-caption text-navy">
                    Price
                  </th>
                  {items.map((product) => (
                    <td key={product.id} className="border-b border-l border-border p-4">
                      <span className="numeric block text-body font-semibold text-navy">
                        {formatPrice(product.price)}
                      </span>
                      <span className="numeric text-caption text-muted-foreground line-through">
                        {formatPrice(product.mrp)}
                      </span>
                      <span className="numeric ml-2 bg-beige px-2 py-0.5 text-caption font-semibold text-teal">
                        {discountPercent(product)}% off
                      </span>
                    </td>
                  ))}
                </tr>

                <tr>
                  <th scope="row" className="border-b border-border p-4 text-caption text-navy">
                    Availability
                  </th>
                  {items.map((product) => (
                    <td
                      key={product.id}
                      className="border-b border-l border-border p-4 text-caption text-muted-foreground"
                    >
                      {product.availability}
                    </td>
                  ))}
                </tr>

                {specLabels(items).map((label) => {
                  const values = items.map((p) => specValue(p, label));
                  const differs = new Set(values).size > 1;
                  return (
                    <tr key={label} className={cn(differs && "bg-sky/30")}>
                      <th scope="row" className="border-b border-border p-4 text-caption text-navy">
                        {label}
                        {differs ? (
                          <span className="ml-2 text-caption uppercase tracking-widest text-teal">
                            differs
                          </span>
                        ) : null}
                      </th>
                      {values.map((value, index) => (
                        <td
                          key={`${label}-${items[index]?.id}`}
                          className="border-b border-l border-border p-4 text-caption text-muted-foreground"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  );
                })}

                <tr>
                  <th scope="row" className="p-4 text-caption text-navy">
                    Buy
                  </th>
                  {items.map((product) => (
                    <td key={product.id} className="border-l border-border p-4">
                      <button
                        type="button"
                        onClick={() => addToCart(product.id)}
                        className="w-full bg-navy px-4 py-3 text-body font-medium text-primary-foreground transition-colors hover:bg-beige hover:text-navy"
                      >
                        Add to cart
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCompare(product.id)}
                        className="mt-2 w-full border border-border px-4 py-2 text-body text-muted-foreground transition-colors hover:text-teal"
                      >
                        Remove
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      )}
    </div>
  );
}
