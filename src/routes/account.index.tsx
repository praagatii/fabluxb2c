import { createFileRoute } from "@tanstack/react-router";
import { formatPrice } from "@/data/products";
import { groupByCompany } from "@/data/orders";
import { useAccount } from "@/context/AccountContext";
import { AccountLayout, StatusChip } from "@/components/account/AccountLayout";
import { SmartLink } from "@/components/common/SmartLink";

const title = "Your Orders — Fabluxe Account";
const description = "Track Fabluxe orders, view invoices per fulfilling company and manage your account.";

export const Route = createFileRoute("/account/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const { orders } = useAccount();

  return (
    <AccountLayout title="Orders">
      <ul className="divide-y divide-border border border-border bg-card">
        {orders.map((order) => {
          const invoices = groupByCompany(order.items).length;
          return (
            <li key={order.id} className="flex flex-wrap items-center gap-4 p-5">
              <div className="min-w-0 flex-1">
                <p className="numeric text-body font-semibold text-navy">{order.id}</p>
                <p className="mt-1 text-caption text-muted-foreground">
                  Placed {order.placedAt} · {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "items"}
                </p>
                {invoices > 1 ? (
                  <span className="mt-2 inline-block bg-beige px-2 py-0.5 text-caption text-teal">
                    2 invoices
                  </span>
                ) : null}
              </div>
              <StatusChip status={order.status} />
              <p className="numeric w-28 text-right text-body text-navy">{formatPrice(order.total)}</p>
              <SmartLink
                to={`/account/orders/${order.id}`}
                className="border border-border px-4 py-2.5 text-body text-navy transition-colors hover:text-teal"
              >
                View detail
              </SmartLink>
            </li>
          );
        })}
      </ul>
    </AccountLayout>
  );
}
