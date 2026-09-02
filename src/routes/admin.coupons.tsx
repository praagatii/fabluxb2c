import { useState } from "react";
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
import { adminCoupons, formatINR, type AdminCoupon } from "@/data/admin";
import { useAdmin } from "@/context/AdminContext";

export const Route = createFileRoute("/admin/coupons")({
  head: () => ({
    meta: [
      { title: "Coupons — Fabluxe Admin" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Create and manage discount codes." },
      { property: "og:title", content: "Coupons — Fabluxe Admin" },
      { property: "og:description", content: "Discount code management." },
    ],
  }),
  component: () => (
    <AdminGuard section="coupons" label="Coupons">
      <CouponsScreen />
    </AdminGuard>
  ),
});

const tone = (status: AdminCoupon["status"]) =>
  status === "Active" ? "positive" : status === "Scheduled" ? "warning" : "neutral";

const blank: AdminCoupon = {
  code: "",
  type: "percent",
  value: 10,
  minOrder: 0,
  from: "2026-09-01",
  to: "2026-12-31",
  usageLimit: 500,
  used: 0,
  status: "Scheduled",
};

function CouponsScreen() {
  const { mayEdit } = useAdmin();
  const editable = mayEdit("coupons");
  const [list, setList] = useState<AdminCoupon[]>(adminCoupons);
  const [draft, setDraft] = useState<AdminCoupon>(blank);

  const field =
    "w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-navy outline-none focus:border-teal";

  return (
    <>
      <AdminPageHeader eyebrow="Promotions" title="Coupons" copy="Discount codes offered on the storefront cart." />
      <ReadOnlyNote section="coupons" />

      {editable ? (
        <AdminCard title="Create a coupon" className="mb-4">
          <form
            className="grid gap-3 sm:grid-cols-3 xl:grid-cols-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!draft.code.trim()) return;
              setList((current) => [{ ...draft, code: draft.code.toUpperCase() }, ...current]);
              setDraft(blank);
            }}
          >
            <label>
              <span className="mb-1 block text-xs font-medium text-navy">Code</span>
              <input className={field} value={draft.code} onChange={(e) => setDraft({ ...draft, code: e.target.value })} placeholder="FESTIVE10" />
            </label>
            <label>
              <span className="mb-1 block text-xs font-medium text-navy">Type</span>
              <select className={field} value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as AdminCoupon["type"] })}>
                <option value="percent">Percent off</option>
                <option value="flat">Flat amount</option>
              </select>
            </label>
            <label>
              <span className="mb-1 block text-xs font-medium text-navy">Value</span>
              <input type="number" className={field} value={draft.value} onChange={(e) => setDraft({ ...draft, value: Number(e.target.value) })} />
            </label>
            <label>
              <span className="mb-1 block text-xs font-medium text-navy">Minimum order (₹)</span>
              <input type="number" className={field} value={draft.minOrder} onChange={(e) => setDraft({ ...draft, minOrder: Number(e.target.value) })} />
            </label>
            <label>
              <span className="mb-1 block text-xs font-medium text-navy">Valid from</span>
              <input type="date" className={field} value={draft.from} onChange={(e) => setDraft({ ...draft, from: e.target.value })} />
            </label>
            <label>
              <span className="mb-1 block text-xs font-medium text-navy">Valid to</span>
              <input type="date" className={field} value={draft.to} onChange={(e) => setDraft({ ...draft, to: e.target.value })} />
            </label>
            <label>
              <span className="mb-1 block text-xs font-medium text-navy">Usage limit</span>
              <input type="number" className={field} value={draft.usageLimit} onChange={(e) => setDraft({ ...draft, usageLimit: Number(e.target.value) })} />
            </label>
            <label>
              <span className="mb-1 block text-xs font-medium text-navy">Status</span>
              <select className={field} value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as AdminCoupon["status"] })}>
                <option>Active</option>
                <option>Scheduled</option>
                <option>Expired</option>
              </select>
            </label>
            <div className="flex items-end">
              <button className="w-full rounded-sm bg-navy px-4 py-2 text-sm text-primary-foreground hover:opacity-90">
                Create coupon
              </button>
            </div>
          </form>
        </AdminCard>
      ) : null}

      <AdminTable head={["Code", "Type", "Value", "Min order", "Validity", "Usage", "Status", ""]}>
        {list.map((coupon) => (
          <tr key={coupon.code}>
            <Td className="numeric font-medium text-navy">{coupon.code}</Td>
            <Td className="text-xs capitalize">{coupon.type}</Td>
            <Td className="numeric">{coupon.type === "percent" ? `${coupon.value}%` : formatINR(coupon.value)}</Td>
            <Td className="numeric">{coupon.minOrder ? formatINR(coupon.minOrder) : "—"}</Td>
            <Td className="text-xs">{coupon.from} → {coupon.to}</Td>
            <Td className="numeric text-xs">{coupon.used} / {coupon.usageLimit}</Td>
            <Td><StatusPill tone={tone(coupon.status)}>{coupon.status}</StatusPill></Td>
            <Td>
              {editable ? (
                <div className="flex gap-2 text-xs">
                  <button
                    onClick={() =>
                      setList((current) =>
                        current.map((c) =>
                          c.code === coupon.code
                            ? { ...c, status: c.status === "Active" ? "Expired" : "Active" }
                            : c,
                        ),
                      )
                    }
                    className="text-teal hover:underline"
                  >
                    {coupon.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => setList((current) => current.filter((c) => c.code !== coupon.code))}
                    className="text-destructive hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ) : null}
            </Td>
          </tr>
        ))}
      </AdminTable>
    </>
  );
}
