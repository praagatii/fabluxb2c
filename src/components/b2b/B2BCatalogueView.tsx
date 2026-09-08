import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { B2BProductCard } from "./B2BProductCard";
import type { B2BProduct } from "@/data/b2b";

type Facet = { key: string; values: { value: string; count: number }[] };

function buildFacets(products: B2BProduct[]): Facet[] {
  const map = new Map<string, Map<string, number>>();
  for (const product of products) {
    for (const [key, value] of Object.entries(product.attributes)) {
      if (!map.has(key)) map.set(key, new Map());
      const bucket = map.get(key)!;
      bucket.set(value, (bucket.get(value) ?? 0) + 1);
    }
  }
  return [...map.entries()].map(([key, bucket]) => ({
    key,
    values: [...bucket.entries()]
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => a.value.localeCompare(b.value)),
  }));
}

type Selected = Record<string, string[]>;

export function B2BCatalogueView({
  products,
  brandsLabel = "Brand",
}: {
  products: B2BProduct[];
  brandsLabel?: string;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Selected>({});
  const [panelOpen, setPanelOpen] = useState(false);

  const facets = useMemo(() => buildFacets(products), [products]);
  const brands = useMemo(
    () => [...new Set(products.map((p) => p.brand))].sort((a, b) => a.localeCompare(b)),
    [products],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      if (
        q &&
        ![product.name, product.brand, product.sku, product.summary]
          .join(" ")
          .toLowerCase()
          .includes(q)
      ) {
        return false;
      }
      return Object.entries(selected).every(([key, values]) => {
        if (values.length === 0) return true;
        if (key === "__brand") return values.includes(product.brand);
        return values.includes(product.attributes[key] ?? "");
      });
    });
  }, [products, query, selected]);

  const toggle = (key: string, value: string) =>
    setSelected((prev) => {
      const current = prev[key] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });

  const activeCount = Object.values(selected).reduce((sum, list) => sum + list.length, 0);

  const filters = (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-heading text-navy">Filters</p>
        <button
          type="button"
          onClick={() => setSelected({})}
          className="link-gold text-caption uppercase tracking-[0.18em] text-teal"
        >
          Reset
        </button>
      </div>

      <div className="border-t border-border pt-5">
        <p className="label-eyebrow text-teal">{brandsLabel}</p>
        <div className="mt-3 space-y-2">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex cursor-pointer items-center gap-2 text-body text-navy"
            >
              <input
                type="checkbox"
                checked={(selected["__brand"] ?? []).includes(brand)}
                onChange={() => toggle("__brand", brand)}
                className="h-4 w-4 accent-[var(--color-teal)]"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {facets.map((facet) => (
        <div key={facet.key} className="border-t border-border pt-5">
          <p className="label-eyebrow text-teal">{facet.key}</p>
          <div className="mt-3 space-y-2">
            {facet.values.map((entry) => (
              <label
                key={entry.value}
                className="flex cursor-pointer items-center justify-between gap-3 text-body text-navy"
              >
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={(selected[facet.key] ?? []).includes(entry.value)}
                    onChange={() => toggle(facet.key, entry.value)}
                    className="h-4 w-4 accent-[var(--color-teal)]"
                  />
                  {entry.value}
                </span>
                <span className="numeric text-caption text-muted-foreground">{entry.count}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      <aside className="hidden lg:block">
        <div className="scrollbar-hide sticky top-28 h-[calc(100dvh-8rem)] overflow-y-auto">
          {filters}
        </div>
      </aside>

      <div className="scrollbar-hide min-w-0 lg:h-[calc(100dvh-8rem)] lg:overflow-y-auto">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-teal"
              aria-hidden="true"
            />
            <label htmlFor="b2b-search" className="sr-only">
              Search the B2B catalogue
            </label>
            <input
              id="b2b-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by product, brand or SKU"
              className="w-full border border-border bg-card py-2.5 pl-9 pr-3 text-body text-navy placeholder:text-muted-foreground focus:border-teal focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={() => setPanelOpen((open) => !open)}
            className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-caption uppercase tracking-[0.18em] text-navy lg:hidden"
            aria-expanded={panelOpen}
          >
            {panelOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            )}
            Filters{activeCount ? ` (${activeCount})` : ""}
          </button>
        </div>

        {panelOpen ? (
          <div className="mt-5 border border-border bg-card p-5 lg:hidden">{filters}</div>
        ) : null}

        <p className="mt-5 text-caption uppercase tracking-[0.18em] text-muted-foreground">
          <span className="numeric text-navy">{results.length}</span> item
          {results.length === 1 ? "" : "s"} — enquiry only
        </p>

        {results.length === 0 ? (
          <p className="mt-10 border border-dashed border-border p-10 text-center text-caption text-muted-foreground">
            Nothing matches that search yet. Clear a filter, or raise an enquiry and the trade desk
            will source it.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((product) => (
              <B2BProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
