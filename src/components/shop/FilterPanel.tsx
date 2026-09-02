import { Star } from "lucide-react";
import { formatPrice } from "@/data/products";
import type { FilterState } from "@/lib/facets";
import { buildFacets } from "@/lib/facets";

type FilterPanelProps = {
  facets: ReturnType<typeof buildFacets>;
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
};

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-5">
      <p className="label-eyebrow text-teal">{title}</p>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

function Check({
  label,
  count,
  checked,
  onToggle,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 text-sm text-navy">
      <span className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="h-4 w-4 accent-[var(--color-teal)]"
        />
        {label}
      </span>
      {count === undefined ? null : (
        <span className="numeric text-xs text-muted-foreground">{count}</span>
      )}
    </label>
  );
}

const toggleValue = (list: string[], value: string) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

export function FilterPanel({ facets, filters, onChange, onReset }: FilterPanelProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-navy">Filters</p>
        <button
          type="button"
          onClick={onReset}
          className="link-gold text-xs uppercase tracking-[0.18em] text-teal"
        >
          Reset
        </button>
      </div>

      <Group title="Price">
        <label className="block text-sm text-navy" htmlFor="price-range">
          Up to <span className="numeric font-semibold">{formatPrice(filters.priceMax)}</span>
        </label>
        <input
          id="price-range"
          type="range"
          min={facets.priceMin}
          max={facets.priceMax}
          step={1000}
          value={filters.priceMax}
          onChange={(event) => onChange({ ...filters, priceMax: Number(event.target.value) })}
          className="w-full accent-[var(--color-teal)]"
        />
        <div className="numeric flex justify-between text-xs text-muted-foreground">
          <span>{formatPrice(facets.priceMin)}</span>
          <span>{formatPrice(facets.priceMax)}</span>
        </div>
      </Group>

      <Group title="Brand">
        {facets.brands.map((brand) => (
          <Check
            key={brand.value}
            label={brand.value}
            count={brand.count}
            checked={filters.brands.includes(brand.value)}
            onToggle={() => onChange({ ...filters, brands: toggleValue(filters.brands, brand.value) })}
          />
        ))}
      </Group>

      <Group title="Customer rating">
        {[4.5, 4, 3.5, 3].map((rating) => (
          <label
            key={rating}
            className="flex cursor-pointer items-center gap-2 text-sm text-navy"
          >
            <input
              type="radio"
              name="min-rating"
              checked={filters.minRating === rating}
              onChange={() => onChange({ ...filters, minRating: rating })}
              className="h-4 w-4 accent-[var(--color-teal)]"
            />
            <Star className="h-3.5 w-3.5 text-gold" fill="currentColor" aria-hidden="true" />
            <span className="numeric">{rating} and above</span>
          </label>
        ))}
        <label className="flex cursor-pointer items-center gap-2 text-sm text-navy">
          <input
            type="radio"
            name="min-rating"
            checked={filters.minRating === 0}
            onChange={() => onChange({ ...filters, minRating: 0 })}
            className="h-4 w-4 accent-[var(--color-teal)]"
          />
          Any rating
        </label>
      </Group>

      <Group title="Availability">
        {facets.availability.map((option) => (
          <Check
            key={option.value}
            label={option.value}
            count={option.count}
            checked={filters.availability.includes(option.value)}
            onToggle={() =>
              onChange({
                ...filters,
                availability: toggleValue(filters.availability, option.value),
              })
            }
          />
        ))}
      </Group>

      {facets.attributes.map((facet) => (
        <Group key={facet.key} title={facet.key}>
          {facet.values.map((option) => (
            <Check
              key={option.value}
              label={option.value}
              count={option.count}
              checked={(filters.attributes[facet.key] ?? []).includes(option.value)}
              onToggle={() =>
                onChange({
                  ...filters,
                  attributes: {
                    ...filters.attributes,
                    [facet.key]: toggleValue(filters.attributes[facet.key] ?? [], option.value),
                  },
                })
              }
            />
          ))}
        </Group>
      ))}
    </div>
  );
}
