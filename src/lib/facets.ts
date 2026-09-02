import type { Product } from "@/data/products";

export type Facet = { key: string; values: { value: string; count: number }[] };

export type FilterState = {
  brands: string[];
  minRating: number;
  availability: string[];
  attributes: Record<string, string[]>;
  priceMax: number;
};

export type SortKey = "relevance" | "price-asc" | "price-desc" | "rating" | "newest";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Customer rating" },
  { value: "newest", label: "Newest first" },
];

const tally = (values: string[]) => {
  const map = new Map<string, number>();
  values.forEach((v) => map.set(v, (map.get(v) ?? 0) + 1));
  return [...map.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => a.value.localeCompare(b.value, undefined, { numeric: true }));
};

/** All facets are derived from the product data — nothing is hard-coded. */
export function buildFacets(items: Product[]) {
  const attributeKeys = [...new Set(items.flatMap((p) => Object.keys(p.attributes)))];
  const attributes: Facet[] = attributeKeys.map((key) => ({
    key,
    values: tally(items.map((p) => p.attributes[key]).filter((v): v is string => Boolean(v))),
  }));

  const prices = items.map((p) => p.price);
  return {
    brands: tally(items.map((p) => p.brand)),
    availability: tally(items.map((p) => p.availability)),
    attributes,
    priceMin: prices.length ? Math.min(...prices) : 0,
    priceMax: prices.length ? Math.max(...prices) : 0,
  };
}

export const emptyFilters = (priceMax: number): FilterState => ({
  brands: [],
  minRating: 0,
  availability: [],
  attributes: {},
  priceMax,
});

export function applyFilters(items: Product[], filters: FilterState) {
  return items.filter((p) => {
    if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
    if (filters.availability.length && !filters.availability.includes(p.availability)) return false;
    if (p.rating < filters.minRating) return false;
    if (p.price > filters.priceMax) return false;
    return Object.entries(filters.attributes).every(([key, values]) => {
      if (!values.length) return true;
      const value = p.attributes[key];
      return value !== undefined && values.includes(value);
    });
  });
}

export function sortProducts(items: Product[], sort: SortKey) {
  const copy = [...items];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case "newest":
      return copy.sort((a, b) => b.addedOn.localeCompare(a.addedOn));
    default:
      return copy.sort(
        (a, b) => Number(b.tags.includes("featured")) - Number(a.tags.includes("featured")),
      );
  }
}

export const activeFilterCount = (filters: FilterState, priceMax: number) =>
  filters.brands.length +
  filters.availability.length +
  (filters.minRating > 0 ? 1 : 0) +
  (filters.priceMax < priceMax ? 1 : 0) +
  Object.values(filters.attributes).reduce((sum, v) => sum + v.length, 0);
