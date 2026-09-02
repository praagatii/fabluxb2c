import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AdminGuard,
  AdminPageHeader,
  AdminTable,
  ReadOnlyNote,
  StatusPill,
  Td,
} from "@/components/admin/AdminChrome";
import { b2bEnquiries, type B2BEnquiry } from "@/data/admin";
import { b2bCategories, b2bProducts } from "@/data/b2b";
import { useAdmin } from "@/context/AdminContext";

export const Route = createFileRoute("/admin/b2b")({
  head: () => ({
    meta: [
      { title: "B2B — Fabluxe Admin" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Manage the browse-only trade catalogue and B2B enquiries." },
      { property: "og:title", content: "B2B — Fabluxe Admin" },
      { property: "og:description", content: "Trade catalogue and enquiry pipeline." },
    ],
  }),
  component: () => (
    <AdminGuard section="b2b" label="B2B">
      <B2BScreen />
    </AdminGuard>
  ),
});

const tone = (status: B2BEnquiry["status"]) =>
  status === "Won" ? "positive" : status === "New" ? "warning" : "neutral";

function B2BScreen() {
  const { mayEdit } = useAdmin();
  const editable = mayEdit("b2b");
  const [tab, setTab] = useState<"catalogue" | "enquiries">("catalogue");
  const [category, setCategory] = useState("all");
  const [enquiries, setEnquiries] = useState<B2BEnquiry[]>(b2bEnquiries);

  const rows = b2bProducts.filter((p) => category === "all" || p.categorySlug === category);

  return (
    <>
      <AdminPageHeader
        eyebrow="Trade"
        title="B2B store"
        copy="The trade catalogue is browse-only: items carry SKU, MOQ and lead time, never a price."
      />
      <ReadOnlyNote section="b2b" />

      <div className="mb-4 flex flex-wrap gap-2">
        {([
          ["catalogue", `Catalogue (${b2bProducts.length})`],
          ["enquiries", `Enquiries (${enquiries.length})`],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            aria-pressed={tab === key}
            className={
              tab === key
                ? "rounded-full bg-navy px-3 py-1.5 text-xs text-primary-foreground"
                : "rounded-full border border-border px-3 py-1.5 text-xs text-navy hover:border-teal"
            }
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "catalogue" ? (
        <>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-3 rounded-sm border border-border bg-background px-3 py-2 text-sm text-navy"
          >
            <option value="all">All categories</option>
            {b2bCategories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <AdminTable head={["Item", "SKU", "Category", "MOQ", "Lead time", ""]}>
            {rows.map((product) => (
              <tr key={product.id}>
                <Td>
                  <p className="text-navy">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.brand}</p>
                </Td>
                <Td className="numeric text-xs">{product.sku}</Td>
                <Td className="text-xs">{b2bCategories.find((c) => c.slug === product.categorySlug)?.name}</Td>
                <Td className="text-xs">{product.moq}</Td>
                <Td className="text-xs">{product.leadTime}</Td>
                <Td>
                  <button disabled={!editable} className="text-xs text-teal hover:underline disabled:text-muted-foreground disabled:no-underline">
                    Edit
                  </button>
                </Td>
              </tr>
            ))}
          </AdminTable>
        </>
      ) : (
        <AdminTable head={["Reference", "Company", "Contact", "GSTIN", "Product", "Quantity", "Received", "Status"]}>
          {enquiries.map((enquiry) => (
            <tr key={enquiry.id}>
              <Td className="numeric text-xs">{enquiry.id}</Td>
              <Td>{enquiry.company}</Td>
              <Td className="text-xs">{enquiry.contact}</Td>
              <Td className="numeric text-xs">{enquiry.gstin ?? "—"}</Td>
              <Td className="text-xs">{enquiry.product}</Td>
              <Td className="text-xs">{enquiry.quantity}</Td>
              <Td className="text-xs">{enquiry.receivedAt}</Td>
              <Td>
                {editable ? (
                  <select
                    value={enquiry.status}
                    onChange={(e) =>
                      setEnquiries((current) =>
                        current.map((x) =>
                          x.id === enquiry.id ? { ...x, status: e.target.value as B2BEnquiry["status"] } : x,
                        ),
                      )
                    }
                    className="rounded-sm border border-border bg-background px-2 py-1 text-xs text-navy"
                  >
                    <option>New</option>
                    <option>Quoted</option>
                    <option>Won</option>
                    <option>Closed</option>
                  </select>
                ) : (
                  <StatusPill tone={tone(enquiry.status)}>{enquiry.status}</StatusPill>
                )}
              </Td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
