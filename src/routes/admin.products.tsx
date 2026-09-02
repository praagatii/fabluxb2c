import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AdminCard,
  AdminGuard,
  AdminPageHeader,
  AdminTable,
  ReadOnlyNote,
  StatusPill,
  Td,
} from "@/components/admin/AdminChrome";
import { adminProducts, formatINR, type AdminProductRow } from "@/data/admin";
import { categories } from "@/data/categories";
import { companies } from "@/data/site";
import { productImage } from "@/lib/product-images";
import { useAdmin } from "@/context/AdminContext";

export const Route = createFileRoute("/admin/products")({
  head: () => ({
    meta: [
      { title: "Products — Fabluxe Admin" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Manage the electronics and furniture catalogue." },
      { property: "og:title", content: "Products — Fabluxe Admin" },
      { property: "og:description", content: "Catalogue table with filters and bulk actions." },
    ],
  }),
  component: () => (
    <AdminGuard section="products" label="Products">
      <ProductsScreen />
    </AdminGuard>
  ),
});

const statusTone = (status: AdminProductRow["status"]) =>
  status === "Published" ? "positive" : status === "Draft" ? "warning" : "neutral";

function ProductsScreen() {
  const { mayEdit } = useAdmin();
  const editable = mayEdit("products");
  const [rows, setRows] = useState<AdminProductRow[]>(adminProducts);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [company, setCompany] = useState("all");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [editing, setEditing] = useState<AdminProductRow | "new" | null>(null);
  const [note, setNote] = useState("");

  const filtered = useMemo(
    () =>
      rows.filter((row) => {
        const q = query.trim().toLowerCase();
        if (q && !`${row.name} ${row.sku} ${row.brand}`.toLowerCase().includes(q)) return false;
        if (category !== "all" && row.categorySlug !== category) return false;
        if (company !== "all" && row.company !== company) return false;
        if (status !== "all" && row.status !== status) return false;
        return true;
      }),
    [rows, query, category, company, status],
  );

  const allChecked = filtered.length > 0 && filtered.every((r) => selected.includes(r.id));

  const bulk = (next: AdminProductRow["status"]) => {
    setRows((current) =>
      current.map((row) => (selected.includes(row.id) ? { ...row, status: next } : row)),
    );
    setNote(`${selected.length} product(s) set to ${next}. Prototype only — nothing was saved.`);
    setSelected([]);
  };

  return (
    <>
      <AdminPageHeader
        eyebrow="Catalogue"
        title="Products"
        copy={`${rows.length} products across ${categories.length} categories.`}
        actions={
          editable ? (
            <button
              onClick={() => setEditing("new")}
              className="rounded-sm bg-navy px-3 py-2 text-body text-primary-foreground transition-opacity hover:opacity-90"
            >
              New product
            </button>
          ) : null
        }
      />
      <ReadOnlyNote section="products" />
      {note ? <p className="mb-4 rounded-sm bg-teal/10 px-3 py-2 text-caption text-navy">{note}</p> : null}

      <AdminCard className="mb-4">
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, SKU or brand"
            className="rounded-sm border border-border bg-background px-3 py-2 text-body text-navy outline-none focus:border-teal"
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-sm border border-border bg-background px-3 py-2 text-body text-navy">
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <select value={company} onChange={(e) => setCompany(e.target.value)} className="rounded-sm border border-border bg-background px-3 py-2 text-body text-navy">
            <option value="all">All companies</option>
            <option value={companies.electronics.name}>{companies.electronics.name}</option>
            <option value={companies.interiors.name}>{companies.interiors.name}</option>
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-sm border border-border bg-background px-3 py-2 text-body text-navy">
            <option value="all">All statuses</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
        </div>
        {selected.length && editable ? (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-3">
            <span className="text-caption text-muted-foreground">{selected.length} selected</span>
            <button onClick={() => bulk("Published")} className="rounded-sm border border-border px-3 py-1.5 text-caption text-navy hover:border-teal">Publish</button>
            <button onClick={() => bulk("Draft")} className="rounded-sm border border-border px-3 py-1.5 text-caption text-navy hover:border-teal">Move to draft</button>
            <button onClick={() => bulk("Archived")} className="rounded-sm border border-border px-3 py-1.5 text-caption text-navy hover:border-teal">Archive</button>
          </div>
        ) : null}
      </AdminCard>

      <AdminTable
        head={[
          <input
            key="all"
            type="checkbox"
            aria-label="Select all"
            checked={allChecked}
            onChange={(e) => setSelected(e.target.checked ? filtered.map((r) => r.id) : [])}
          />,
          "Product",
          "SKU",
          "Category",
          "Company",
          "Price",
          "Stock",
          "Status",
          "",
        ]}
      >
        {filtered.map((row) => (
          <tr key={row.id}>
            <Td>
              <input
                type="checkbox"
                aria-label={`Select ${row.name}`}
                checked={selected.includes(row.id)}
                onChange={(e) =>
                  setSelected((current) =>
                    e.target.checked ? [...current, row.id] : current.filter((id) => id !== row.id),
                  )
                }
              />
            </Td>
            <Td>
              <div className="flex items-center gap-3">
                <img src={productImage(row.image)} alt="" className="h-9 w-9 rounded-sm object-cover" />
                <div>
                  <p className="text-navy">{row.name}</p>
                  <p className="text-caption text-muted-foreground">{row.brand}</p>
                </div>
              </div>
            </Td>
            <Td className="numeric text-caption">{row.sku}</Td>
            <Td className="text-caption">{categories.find((c) => c.slug === row.categorySlug)?.name}</Td>
            <Td className="text-caption">{row.company}</Td>
            <Td className="numeric">{formatINR(row.price)}</Td>
            <Td className="numeric">{row.stock}</Td>
            <Td><StatusPill tone={statusTone(row.status)}>{row.status}</StatusPill></Td>
            <Td>
              <button
                onClick={() => setEditing(row)}
                className="text-caption text-teal hover:underline"
              >
                {editable ? "Edit" : "View"}
              </button>
            </Td>
          </tr>
        ))}
      </AdminTable>

      {editing ? (
        <ProductForm
          row={editing === "new" ? null : editing}
          readOnly={!editable}
          onClose={() => setEditing(null)}
          onSave={(saved) => {
            setRows((current) =>
              current.some((r) => r.id === saved.id)
                ? current.map((r) => (r.id === saved.id ? saved : r))
                : [saved, ...current],
            );
            setNote(`Saved ${saved.name}. Prototype only — nothing was persisted.`);
            setEditing(null);
          }}
        />
      ) : null}
    </>
  );
}

function ProductForm({
  row,
  readOnly,
  onClose,
  onSave,
}: {
  row: AdminProductRow | null;
  readOnly: boolean;
  onClose: () => void;
  onSave: (row: AdminProductRow) => void;
}) {
  const [draft, setDraft] = useState<AdminProductRow>(
    row ?? {
      id: `prd-new-${Date.now()}`,
      name: "",
      sku: "",
      brand: "",
      categorySlug: categories[0]!.slug,
      company: companies.electronics.name as AdminProductRow["company"],
      price: 0,
      mrp: 0,
      stock: 0,
      status: "Draft",
      image: "fridge",
    },
  );
  const [colours, setColours] = useState("Graphite, Brushed Steel");
  const [sizes, setSizes] = useState("Standard");
  const [specs, setSpecs] = useState("Capacity: 653 L\nEnergy rating: 4 Star");
  const discount = draft.mrp > 0 ? Math.round(((draft.mrp - draft.price) / draft.mrp) * 100) : 0;

  const field = "w-full rounded-sm border border-border bg-background px-3 py-2 text-body text-navy outline-none focus:border-teal disabled:opacity-70";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy/40 p-4">
      <form
        className="my-8 w-full max-w-2xl rounded-md border border-border bg-card p-6"
        onSubmit={(e) => {
          e.preventDefault();
          onSave(draft);
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="label-eyebrow text-teal">{row ? "Edit product" : "New product"}</p>
            <h2 className="mt-1 text-heading text-navy">{draft.name || "Untitled product"}</h2>
          </div>
          <button type="button" onClick={onClose} className="text-body text-muted-foreground hover:text-navy">
            Close
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-1 block text-caption font-medium text-navy">Name</span>
            <input disabled={readOnly} className={field} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          </label>
          <label>
            <span className="mb-1 block text-caption font-medium text-navy">SKU</span>
            <input disabled={readOnly} className={field} value={draft.sku} onChange={(e) => setDraft({ ...draft, sku: e.target.value })} />
          </label>
          <label>
            <span className="mb-1 block text-caption font-medium text-navy">Brand</span>
            <input disabled={readOnly} className={field} value={draft.brand} onChange={(e) => setDraft({ ...draft, brand: e.target.value })} />
          </label>
          <label>
            <span className="mb-1 block text-caption font-medium text-navy">Category</span>
            <select disabled={readOnly} className={field} value={draft.categorySlug} onChange={(e) => setDraft({ ...draft, categorySlug: e.target.value })}>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="mb-1 block text-caption font-medium text-navy">Fulfilled by</span>
            <select
              disabled={readOnly}
              className={field}
              value={draft.company}
              onChange={(e) => setDraft({ ...draft, company: e.target.value as AdminProductRow["company"] })}
            >
              <option value={companies.electronics.name}>{companies.electronics.name}</option>
              <option value={companies.interiors.name}>{companies.interiors.name}</option>
            </select>
          </label>
          <label>
            <span className="mb-1 block text-caption font-medium text-navy">MRP (₹)</span>
            <input disabled={readOnly} type="number" className={field} value={draft.mrp} onChange={(e) => setDraft({ ...draft, mrp: Number(e.target.value) })} />
          </label>
          <label>
            <span className="mb-1 block text-caption font-medium text-navy">Selling price (₹)</span>
            <input disabled={readOnly} type="number" className={field} value={draft.price} onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })} />
          </label>
          <label>
            <span className="mb-1 block text-caption font-medium text-navy">Stock</span>
            <input disabled={readOnly} type="number" className={field} value={draft.stock} onChange={(e) => setDraft({ ...draft, stock: Number(e.target.value) })} />
          </label>
          <label>
            <span className="mb-1 block text-caption font-medium text-navy">Status</span>
            <select disabled={readOnly} className={field} value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as AdminProductRow["status"] })}>
              <option>Published</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
          </label>
          <label className="sm:col-span-2">
            <span className="mb-1 block text-caption font-medium text-navy">Images</span>
            <div className="flex items-center gap-3">
              <img src={productImage(draft.image)} alt="" className="h-16 w-16 rounded-sm object-cover" />
              <select disabled={readOnly} className={field} value={draft.image} onChange={(e) => setDraft({ ...draft, image: e.target.value as AdminProductRow["image"] })}>
                <option value="fridge">Primary image A</option>
                <option value="tv">Primary image B</option>
                <option value="laundry">Primary image C</option>
              </select>
            </div>
            <p className="mt-1 text-caption text-muted-foreground">Upload is a placeholder in this prototype.</p>
          </label>
          <label>
            <span className="mb-1 block text-caption font-medium text-navy">Colour variants</span>
            <input disabled={readOnly} className={field} value={colours} onChange={(e) => setColours(e.target.value)} />
          </label>
          <label>
            <span className="mb-1 block text-caption font-medium text-navy">Size variants</span>
            <input disabled={readOnly} className={field} value={sizes} onChange={(e) => setSizes(e.target.value)} />
          </label>
          <label className="sm:col-span-2">
            <span className="mb-1 block text-caption font-medium text-navy">Specifications (one per line, label: value)</span>
            <textarea disabled={readOnly} rows={4} className={field} value={specs} onChange={(e) => setSpecs(e.target.value)} />
          </label>
        </div>

        <p className="mt-3 text-caption text-muted-foreground">Discount shown on the storefront: {discount}% off MRP.</p>

        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-sm border border-border px-4 py-2 text-body text-navy">
            Cancel
          </button>
          {!readOnly ? (
            <button type="submit" className="rounded-sm bg-navy px-4 py-2 text-body text-primary-foreground hover:opacity-90">
              Save product
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
