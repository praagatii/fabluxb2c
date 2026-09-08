import { useMemo, useState } from "react";
import { LayoutGrid, Rows3, SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/data/products";
import {
  activeFilterCount,
  applyFilters,
  buildFacets,
  emptyFilters,
  sortOptions,
  sortProducts,
  type FilterState,
  type SortKey,
} from "@/lib/facets";
import { ProductCard } from "@/components/shop/ProductCard";
import { Breadcrumbs, type Crumb } from "@/components/shop/Breadcrumbs";
import { FilterPanel } from "@/components/shop/FilterPanel";
import { TestimonialCard } from "@/components/common/TestimonialCard";
import { reviewHighlights } from "@/data/site";
import { SmartLink } from "@/components/common/SmartLink";
import { Container } from "@/components/common/Section";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;

type ListingViewProps = {
  eyebrow: string;
  title: string;
  crumbs: Crumb[];
  items: Product[];
  subNav?: { label: string; to: string; active?: boolean }[];
  banner?: string;
};

export function ListingView({ eyebrow, title, crumbs, items, subNav, banner }: ListingViewProps) {
  const facets = useMemo(() => buildFacets(items), [items]);
  const [filters, setFilters] = useState<FilterState>(() => emptyFilters(facets.priceMax));
  const [sort, setSort] = useState<SortKey>("relevance");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const results = useMemo(
    () => sortProducts(applyFilters(items, filters), sort),
    [items, filters, sort],
  );
  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visible = results.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const activeCount = activeFilterCount(filters, facets.priceMax);

  const update = (next: FilterState) => {
    setFilters(next);
    setPage(1);
  };
  const reset = () => update(emptyFilters(facets.priceMax));

  const filterPanel = (
    <FilterPanel facets={facets} filters={filters} onChange={update} onReset={reset} />
  );

  return (
    <>
      <Container>
        <Breadcrumbs items={crumbs} />
      </Container>

      <header className="pt-0">
        <Container>
          {banner ? (
            <div className="relative overflow-hidden rounded-[12px]">
              <img
                src={banner}
                alt=""
                width={1600}
                height={900}
                className="h-56 w-full object-cover sm:h-72"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/40 to-navy/5" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6 sm:p-10">
                <p className="label-eyebrow text-beige">{eyebrow}</p>
                <h1 className="mt-3 font-display text-display text-beige">{title}</h1>
              </div>
            </div>
          ) : (
            <div className="py-14 sm:py-[var(--spacing-section)]">
              <p className="label-eyebrow text-teal">{eyebrow}</p>
              <h1 className="mt-2 max-w-2xl font-display text-display text-navy">{title}</h1>
            </div>
          )}
        </Container>
      </header>

      {subNav && subNav.length > 0 ? (
        <div className="border-b border-border">
          <Container className="overflow-x-auto">
            <ul className="flex items-center gap-1 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {subNav.map((item) => (
                <li key={`${item.label}-${item.to}`} className="shrink-0">
                  <SmartLink
                    to={item.to}
                    className={cn(
                      "inline-block whitespace-nowrap border px-3 py-1.5 text-caption transition-colors",
                      item.active
                        ? "border-navy bg-navy text-primary-foreground"
                        : "border-border text-navy hover:border-gold",
                    )}
                  >
                    {item.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      ) : null}

      <Container>
        <div className="flex flex-col gap-8 py-14 sm:py-[var(--spacing-section)] lg:flex-row">
          <aside className="hidden w-64 shrink-0 lg:block">
          <div className="scrollbar-hide sticky top-28 max-h-[calc(100dvh-8rem)] overflow-y-auto">
            {filterPanel}
          </div>
        </aside>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <p className="numeric text-caption text-muted-foreground">
                <span className="font-semibold text-navy">{results.length}</span> products
                {activeCount > 0 ? ` · ${activeCount} filters applied` : ""}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="flex items-center gap-2 border border-border px-3 py-2 text-body text-navy lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                  Filters
                </button>

                <label className="flex items-center gap-2 text-caption text-muted-foreground">
                  <span className="sr-only sm:not-sr-only">Sort by</span>
                  <select
                    value={sort}
                    onChange={(event) => {
                      setSort(event.target.value as SortKey);
                      setPage(1);
                    }}
                    className="max-w-full border border-border bg-card px-3 py-2 text-body text-navy"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="flex border border-border">
                  <button
                    type="button"
                    aria-label="Grid view"
                    aria-pressed={view === "grid"}
                    onClick={() => setView("grid")}
                    className={cn(
                      "grid h-9 w-9 place-items-center text-navy",
                      view === "grid" && "bg-navy text-primary-foreground",
                    )}
                  >
                    <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="List view"
                    aria-pressed={view === "list"}
                    onClick={() => setView("list")}
                    className={cn(
                      "grid h-9 w-9 place-items-center text-navy",
                      view === "list" && "bg-navy text-primary-foreground",
                    )}
                  >
                    <Rows3 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {visible.length === 0 ? (
              <p className="py-16 text-center text-caption text-muted-foreground">
                No products match these filters.{" "}
                <button type="button" onClick={reset} className="link-gold text-teal">
                  Reset filters
                </button>
              </p>
            ) : (
              <ul className={cn("mt-8 grid gap-x-5 gap-y-10", view === "grid" ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1")}>
                {visible.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} view={view} />
                  </li>
                ))}
              </ul>
            )}

            {pageCount > 1 ? (
              <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="border border-border px-3 py-2 text-body text-navy disabled:opacity-40"
                >
                  Previous
                </button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
                  <button
                    key={number}
                    type="button"
                    aria-current={number === safePage ? "page" : undefined}
                    onClick={() => setPage(number)}
                    className={cn(
                      "numeric h-9 w-9 border border-border text-body text-navy",
                      number === safePage && "bg-navy text-primary-foreground",
                    )}
                  >
                    {number}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  disabled={safePage === pageCount}
                  className="border border-border px-3 py-2 text-body text-navy disabled:opacity-40"
                >
                  Next
                </button>
              </nav>
            ) : null}
          </div>
        </div>
      </Container>

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-navy/60"
          />
          <div className="absolute inset-y-0 left-0 w-[88%] max-w-sm overflow-y-auto bg-card p-6">
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="mb-4 ml-auto flex items-center gap-2 text-body text-navy"
            >
              Close <X className="h-4 w-4" aria-hidden="true" />
            </button>
            {filterPanel}
          </div>
        </div>
      ) : null}

      <section className="py-14 sm:py-[var(--spacing-section)]">
        <Container>
          <ul
            className="animate-marquee flex w-max gap-6"
            style={{ animationDuration: "50s" }}
          >
            {[...reviewHighlights, ...reviewHighlights].map((review, index) => (
              <li key={`${review.id}-${index}`} className="w-[20rem] shrink-0 sm:w-[22rem]">
                <TestimonialCard
                  quote={review.quote}
                  name={review.author}
                  detail={review.location}
                  rating={review.rating}
                  surface="navy"
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
