import { useState } from "react";
import { Search } from "lucide-react";
import { searchSuggestions } from "@/data/site";

export function SearchField({ id = "site-search" }: { id?: string }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const matches = searchSuggestions.filter((s) =>
    s.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="relative w-full">
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-teal"
        aria-hidden="true"
      />
      <input
        id={id}
        type="search"
        value={query}
        placeholder="Search refrigerators, televisions, air conditioners…"
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        className="h-11 w-full rounded-sm border border-border bg-card pl-9 pr-3 text-body text-navy placeholder:text-muted-foreground"
      />
      {open && matches.length > 0 ? (
        <ul className="absolute z-50 mt-1 w-full border border-border bg-card py-1 shadow-lg">
          {matches.map((s) => (
            <li key={s}>
              <button
                type="button"
                className="block w-full px-4 py-2 text-left text-body text-navy hover:bg-sky/50"
                onMouseDown={() => setQuery(s)}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
