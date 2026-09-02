import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AdminCard,
  AdminGuard,
  AdminPageHeader,
  AdminTable,
  ReadOnlyNote,
  StatusPill,
  Td,
} from "@/components/admin/AdminChrome";
import { adminOrders, formatINR, orderStatuses } from "@/data/admin";
import { groupByCompany, mockOrders, type OrderStatus } from "@/data/orders";
import { getProduct } from "@/data/products";
import { useAdmin } from "@/context/AdminContext";

// TODO: sync with client's existing order and invoice system.

export const Route = createFileRoute("/admin/orders/$orderId")({
  head: ({ params }) => ({
    meta: [
      { title: `Order ${params.orderId} — Fabluxe Admin` },
      { name: "robots", content: "noindex" },
      { name: "description", content: `Admin detail for order ${params.orderId}.` },
      { property: "og:title", content: `Order ${params.orderId} — Fabluxe Admin` },
      { property: "og:description", content: "Items grouped by fulfilling company." },
    ],
  }),
  component: () => (
    <AdminGuard section="orders" label="Orders">
      <OrderDetail />
    </AdminGuard>
  ),
});

function OrderDetail() {
  const { orderId } = Route.useParams();
  const { mayEdit } = useAdmin();
  const editable = mayEdit("orders");
  const order = mockOrders.find((o) => o.id === orderId);
  const meta = adminOrders.find((o) => o.id === orderId);
  const [status, setStatus] = useState<OrderStatus>(order?.status ?? "Placed");
  const [note, setNote] = useState("");

  if (!order) {
    return (
      <AdminCard>
        <p className="text-body text-navy">Order {orderId} was not found.</p>
        <Link to="/admin/orders" className="mt-3 inline-block text-body text-teal hover:underline">
          Back to orders
        </Link>
      </AdminCard>
    );
  }

  const groups = groupByCompany(order.items);

  return (
    <>
      <AdminPageHeader
        eyebrow="Order detail"
        title={order.id}
        copy={`${meta?.customer ?? "Customer"} · placed ${order.placedAt} · ${order.paymentMethod}`}
        actions={
          <Link to="/admin/orders" className="rounded-sm border border-border px-3 py-2 text-body text-navy hover:border-teal">
            Back to orders
          </Link>
        }
      />
      <ReadOnlyNote section="orders" />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {groups.map((group) => (
            <div key={group.key}>
              <h2 className="mb-2 text-body font-medium text-navy">
                Fulfilled by {group.name}{" "}
                <span className="text-caption font-normal text-muted-foreground">GSTIN {group.gstin}</span>
              </h2>
              <AdminTable head={["Item", "Variant", "Qty", "Unit price", "Line total"]}>
                {group.items.map((item, i) => {
                  const product = getProduct(item.productId);
                  return (
                    <tr key={`${item.productId}-${i}`}>
                      <Td>{product?.name ?? item.productId}</Td>
                      <Td className="text-caption text-muted-foreground">
                        {[item.colour, item.size].filter(Boolean).join(" · ") || "—"}
                      </Td>
                      <Td className="numeric">{item.quantity}</Td>
                      <Td className="numeric">{formatINR(item.unitPrice)}</Td>
                      <Td className="numeric">{formatINR(item.unitPrice * item.quantity)}</Td>
                    </tr>
                  );
                })}
              </AdminTable>
            </div>
          ))}

          <AdminCard title="Invoices">
            <p className="mb-3 text-caption text-muted-foreground">
              {groups.length === 2
                ? "This order is split across both companies: one shared order ID, two separate invoices."
                : "Single-company order, one invoice."}
            </p>
            <AdminTable head={["Invoice", "Company", "GST registration", "Amount", ""]}>
              {groups.map((group, index) => (
                <tr key={group.key}>
                  <Td className="numeric text-caption">
                    {order.id}/{index + 1}
                  </Td>
                  <Td>{group.name}</Td>
                  <Td className="numeric text-caption">{group.gstin}</Td>
                  <Td className="numeric">{formatINR(group.total)}</Td>
                  <Td>
                    <button
                      disabled
                      className="cursor-not-allowed rounded-sm border border-border px-3 py-1.5 text-caption text-muted-foreground"
                    >
                      Download PDF
                    </button>
                  </Td>
                </tr>
              ))}
            </AdminTable>
          </AdminCard>
        </div>

        <div className="space-y-4">
          <AdminCard title="Status">
            <div className="flex items-center gap-2">
              <StatusPill tone={status === "Delivered" ? "positive" : "neutral"}>{status}</StatusPill>
            </div>
            <select
              disabled={!editable}
              value={status}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
              className="mt-3 w-full rounded-sm border border-border bg-background px-3 py-2 text-body text-navy disabled:opacity-70"
            >
              {orderStatuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            {editable ? (
              <button
                onClick={() => setNote(`Status set to ${status}. Prototype only — nothing was saved.`)}
                className="mt-2 w-full rounded-sm bg-navy px-3 py-2 text-body text-primary-foreground hover:opacity-90"
              >
                Update status
              </button>
            ) : null}
            {note ? <p className="mt-2 text-caption text-teal">{note}</p> : null}
          </AdminCard>

          <AdminCard title="Summary">
            <dl className="space-y-1.5 text-body">
              {[
                ["Subtotal", order.subtotal],
                ["Discount", -order.discount],
                ["Delivery", order.delivery],
                ["Taxes", order.taxes],
                ["Total", order.total],
              ].map(([label, value]) => (
                <div key={label as string} className="flex justify-between">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="numeric text-navy">{formatINR(value as number)}</dd>
                </div>
              ))}
            </dl>
          </AdminCard>

          <AdminCard title="Delivery address">
            <address className="text-body not-italic text-navy">
              {order.address.name}
              <br />
              {order.address.line1}
              {order.address.line2 ? <>, {order.address.line2}</> : null}
              <br />
              {order.address.city}, {order.address.state} {order.address.pincode}
              <br />
              {order.address.phone}
            </address>
            <p className="mt-2 text-caption text-muted-foreground">{order.deliveryEstimate}</p>
          </AdminCard>
        </div>
      </div>
    </>
  );
}
