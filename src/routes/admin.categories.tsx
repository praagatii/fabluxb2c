import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import {
  AdminCard,
  AdminGuard,
  AdminPageHeader,
  ReadOnlyNote,
  StatusPill,
} from "@/components/admin/AdminChrome";
import { categories, type Category } from "@/data/categories";
import { companies } from "@/data/site";
import { useAdmin } from "@/context/AdminContext";

export const Route = createFileRoute("/admin/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Fabluxe Admin" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Add, rename, reorder and nest storefront categories." },
      { property: "og:title", content: "Categories — Fabluxe Admin" },
      { property: "og:description", content: "Data-driven category management." },
    ],
  }),
  component: () => (
    <AdminGuard section="categories" label="Categories">
      <CategoriesScreen />
    </AdminGuard>
  ),
});

const slugify = (value: string) =>
  value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function CategoriesScreen() {
  const { mayEdit } = useAdmin();
  const editable = mayEdit("categories");
  const [list, setList] = useState<Category[]>(categories);
  const [name, setName] = useState("");
  const [company, setCompany] = useState<Category["fulfilledBy"]>(companies.interiors.name as Category["fulfilledBy"]);
  const [subName, setSubName] = useState<Record<string, string>>({});

  const move = (index: number, delta: number) => {
    setList((current) => {
      const next = [...current];
      const target = index + delta;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target]!, next[index]!];
      return next;
    });
  };

  return (
    <>
      <AdminPageHeader
        eyebrow="Taxonomy"
        title="Categories"
        copy="The storefront mega-menu, home tiles and listing filters all read this list. Adding a category here makes it appear everywhere — no code change is needed."
      />
      <ReadOnlyNote section="categories" />

      {editable ? (
        <AdminCard title="Add a category" className="mb-4">
          <form
            className="flex flex-wrap items-end gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!name.trim()) return;
              setList((current) => [
                ...current,
                {
                  id: `cat-${slugify(name)}`,
                  name: name.trim(),
                  slug: slugify(name),
                  tagline: "Newly added from the admin portal",
                  productCount: 0,
                  status: "live",
                  fulfilledBy: company,
                  subcategories: [],
                },
              ]);
              setName("");
            }}
          >
            <label className="grow">
              <span className="mb-1 block text-caption font-medium text-navy">Category name (e.g. Furniture)</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Furniture"
                className="w-full rounded-sm border border-border bg-background px-3 py-2 text-body text-navy outline-none focus:border-teal"
              />
            </label>
            <label>
              <span className="mb-1 block text-caption font-medium text-navy">Fulfilled by</span>
              <select
                value={company}
                onChange={(e) => setCompany(e.target.value as Category["fulfilledBy"])}
                className="rounded-sm border border-border bg-background px-3 py-2 text-body text-navy"
              >
                <option value={companies.electronics.name}>{companies.electronics.name}</option>
                <option value={companies.interiors.name}>{companies.interiors.name}</option>
              </select>
            </label>
            <button className="rounded-sm bg-navy px-4 py-2 text-body text-primary-foreground hover:opacity-90">
              Add category
            </button>
          </form>
          <p className="mt-2 text-caption text-muted-foreground">
            Slug is generated automatically — the storefront route <code>/shop/$category</code> picks it up with no
            developer involvement.
          </p>
        </AdminCard>
      ) : null}

      <ul className="space-y-3">
        {list.map((category, index) => (
          <li key={category.id} className="rounded-md border border-border bg-card p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    value={category.name}
                    readOnly={!editable}
                    onChange={(e) =>
                      setList((current) =>
                        current.map((c) => (c.id === category.id ? { ...c, name: e.target.value } : c)),
                      )
                    }
                    className="rounded-sm border border-transparent bg-transparent px-1 py-0.5 text-heading text-navy hover:border-border focus:border-teal focus:outline-none"
                    aria-label={`Rename ${category.name}`}
                  />
                  <StatusPill tone={category.status === "live" ? "positive" : "warning"}>
                    {category.status === "live" ? "Live" : "Coming soon"}
                  </StatusPill>
                </div>
                <p className="mt-1 text-caption text-muted-foreground">
                  /shop/{category.slug} · {category.productCount} products · {category.fulfilledBy}
                </p>
              </div>
              {editable ? (
                <div className="flex items-center gap-1">
                  <button onClick={() => move(index, -1)} aria-label="Move up" className="rounded-sm border border-border p-1.5 text-navy hover:border-teal">
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => move(index, 1)} aria-label="Move down" className="rounded-sm border border-border p-1.5 text-navy hover:border-teal">
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setList((current) => current.filter((c) => c.id !== category.id))}
                    aria-label="Remove category"
                    className="rounded-sm border border-border p-1.5 text-destructive hover:border-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : null}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {category.subcategories.map((sub) => (
                <span key={sub.slug} className="rounded-full bg-muted px-3 py-1 text-caption text-navy">
                  {sub.name}
                </span>
              ))}
              {!category.subcategories.length ? (
                <span className="text-caption text-muted-foreground">No sub-categories yet</span>
              ) : null}
            </div>

            {editable ? (
              <form
                className="mt-3 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const value = (subName[category.id] ?? "").trim();
                  if (!value) return;
                  setList((current) =>
                    current.map((c) =>
                      c.id === category.id
                        ? { ...c, subcategories: [...c.subcategories, { name: value, slug: slugify(value) }] }
                        : c,
                    ),
                  );
                  setSubName((s) => ({ ...s, [category.id]: "" }));
                }}
              >
                <input
                  value={subName[category.id] ?? ""}
                  onChange={(e) => setSubName((s) => ({ ...s, [category.id]: e.target.value }))}
                  placeholder="Nest a sub-category"
                  className="grow rounded-sm border border-border bg-background px-3 py-1.5 text-caption text-navy outline-none focus:border-teal"
                />
                <button className="rounded-sm border border-border px-3 py-1.5 text-caption text-navy hover:border-teal">
                  Nest
                </button>
              </form>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
}
