import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AdminCard,
  AdminGuard,
  AdminPageHeader,
  AdminTable,
  StatCard,
  StatusPill,
  Td,
} from "@/components/admin/AdminChrome";
import {
  adminOrders,
  b2bEnquiries,
  consultationRequests,
  dashboardStats,
  formatINR,
  lowStock,
  revenueByCompany,
  salesTrend,
} from "@/data/admin";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Fabluxe Admin" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Sales, orders, revenue split and open enquiries." },
      { property: "og:title", content: "Dashboard — Fabluxe Admin" },
      { property: "og:description", content: "Sales, orders and enquiries at a glance." },
    ],
  }),
  component: () => (
    <AdminGuard section="dashboard" label="The dashboard">
      <Dashboard />
    </AdminGuard>
  ),
});

function Dashboard() {
  const stats = dashboardStats();
  const openEnquiries = [
    ...consultationRequests
      .filter((r) => r.status === "New")
      .map((r) => ({ id: r.id, who: r.name, what: `Consultation — ${r.mode}`, when: r.date })),
    ...b2bEnquiries
      .filter((e) => e.status === "New" || e.status === "Quoted")
      .map((e) => ({ id: e.id, who: e.company, what: `B2B — ${e.product}`, when: e.receivedAt })),
  ];

  const peak = Math.max(...salesTrend.map((s) => s.value));

  return (
    <>
      <AdminPageHeader
        eyebrow="Overview"
        title="Dashboard"
        copy="Trading summary across both fulfilling companies."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue (90 days)" value={formatINR(6180000)} sub="+14% vs prior period" />
        <StatCard label="Orders" value={String(stats.orders)} sub="All channels" />
        <StatCard label="Average order" value={formatINR(stats.averageOrder)} sub="Across 6 seeded orders" />
        <StatCard label="Conversion" value={`${stats.conversion}%`} sub="Storefront sessions" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <AdminCard title="Sales trend" className="lg:col-span-2">
          <div className="flex h-40 items-end gap-3">
            {salesTrend.map((point) => (
              <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-sm bg-teal/70"
                  style={{ height: `${(point.value / peak) * 100}%` }}
                  aria-hidden="true"
                />
                <span className="text-caption text-muted-foreground">{point.label}</span>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard title="Revenue by fulfilling company">
          <ul className="space-y-4">
            {revenueByCompany.map((company) => (
              <li key={company.name}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-caption text-navy">{company.name}</span>
                  <span className="numeric text-body text-navy">{formatINR(company.value)}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-gold" style={{ width: `${company.share}%` }} />
                </div>
                <p className="mt-1 text-caption text-muted-foreground">
                  {company.share}% of revenue · GSTIN {company.gstin}
                </p>
              </li>
            ))}
          </ul>
        </AdminCard>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div>
          <h2 className="mb-2 text-body font-medium text-navy">Recent orders</h2>
          <AdminTable head={["Order", "Customer", "Total", "Status", "Companies"]}>
            {adminOrders.slice(0, 5).map((order) => (
              <tr key={order.id}>
                <Td>
                  <Link to="/admin/orders/$orderId" params={{ orderId: order.id }} className="text-teal hover:underline">
                    {order.id}
                  </Link>
                </Td>
                <Td>{order.customer}</Td>
                <Td className="numeric">{formatINR(order.total)}</Td>
                <Td>
                  <StatusPill tone={order.status === "Delivered" ? "positive" : "neutral"}>
                    {order.status}
                  </StatusPill>
                </Td>
                <Td>{order.companies.length === 2 ? "2 companies" : order.companies[0]}</Td>
              </tr>
            ))}
          </AdminTable>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="mb-2 text-body font-medium text-navy">Low stock alerts</h2>
            <AdminTable head={["Product", "SKU", "Stock"]}>
              {lowStock.map((item) => (
                <tr key={item.id}>
                  <Td>{item.name}</Td>
                  <Td className="numeric text-caption">{item.sku}</Td>
                  <Td>
                    <StatusPill tone={item.stock === 0 ? "danger" : "warning"}>
                      {item.stock} left
                    </StatusPill>
                  </Td>
                </tr>
              ))}
            </AdminTable>
          </div>

          <div>
            <h2 className="mb-2 text-body font-medium text-navy">Open enquiries</h2>
            <AdminTable head={["Reference", "From", "Enquiry", "Received"]}>
              {openEnquiries.map((row) => (
                <tr key={row.id}>
                  <Td className="numeric text-caption">{row.id}</Td>
                  <Td>{row.who}</Td>
                  <Td>{row.what}</Td>
                  <Td className="text-caption text-muted-foreground">{row.when}</Td>
                </tr>
              ))}
            </AdminTable>
          </div>
        </div>
      </div>
    </>
  );
}
