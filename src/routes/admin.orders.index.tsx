import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AdminCard,
  AdminGuard,
  AdminPageHeader,
  AdminTable,
  StatusPill,
  Td,
} from "@/components/admin/AdminChrome";
import { adminOrders, formatINR, orderStatuses } from "@/data/admin";

export const Route = createFileRoute("/admin/orders/")({
  head: () => ({
    meta: [
      { title: "Orders — Fabluxe Admin" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Order list with companies involved and status." },
      { property: "og:title", content: "Orders — Fabluxe Admin" },
      { property: "og:description", content: "Order list with split-fulfilment markers." },
    ],
  }),
  component: () => (
    <AdminGuard section="orders" label="Orders">
      <OrdersScreen />
    </AdminGuard>
  ),
});

function OrdersScreen() {
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");

  const rows = adminOrders.filter((order) => {
    if (status !== "all" && order.status !== status) return false;
    const q = query.trim().toLowerCase();
    return !q || `${order.id} ${order.customer} ${order.email}`.toLowerCase().includes(q);
  });

  return (
    <>
      <AdminPageHeader
        eyebrow="Fulfilment"
        title="Orders"
        copy="Orders that span both companies are invoiced separately under one shared order ID."
      />

      <AdminCard className="mb-4">
        <div className="grid gap-2 sm:grid-cols-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order ID or customer"
            className="rounded-sm border border-border bg-background px-3 py-2 text-body text-navy outline-none focus:border-teal"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-sm border border-border bg-background px-3 py-2 text-body text-navy"
          >
            <option value="all">All statuses</option>
            {orderStatuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </AdminCard>

      <AdminTable head={["Order ID", "Customer", "Date", "Total", "Status", "Companies involved", ""]}>
        {rows.map((order) => (
          <tr key={order.id}>
            <Td className="numeric text-caption">{order.id}</Td>
            <Td>
              <p className="text-navy">{order.customer}</p>
              <p className="text-caption text-muted-foreground">{order.email}</p>
            </Td>
            <Td className="text-caption">{order.date}</Td>
            <Td className="numeric">{formatINR(order.total)}</Td>
            <Td>
              <StatusPill tone={order.status === "Delivered" ? "positive" : "neutral"}>
                {order.status}
              </StatusPill>
            </Td>
            <Td>
              <div className="flex flex-wrap gap-1">
                {order.companies.map((company) => (
                  <span key={company} className="rounded-full bg-muted px-2 py-0.5 text-caption text-navy">
                    {company}
                  </span>
                ))}
                {order.companies.length === 2 ? (
                  <StatusPill tone="warning">2 invoices</StatusPill>
                ) : null}
              </div>
            </Td>
            <Td>
              <Link
                to="/admin/orders/$orderId"
                params={{ orderId: order.id }}
                className="text-caption text-teal hover:underline"
              >
                Open
              </Link>
            </Td>
          </tr>
        ))}
      </AdminTable>
    </>
  );
}
