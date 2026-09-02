import { createFileRoute, useParams } from "@tanstack/react-router";
import { Check, Download } from "lucide-react";
import { formatPrice, getProduct } from "@/data/products";
import { groupByCompany, orderTimeline } from "@/data/orders";
import { productImage } from "@/lib/product-images";
import { useAccount } from "@/context/AccountContext";
import { AccountLayout, StatusChip } from "@/components/account/AccountLayout";
import { SmartLink } from "@/components/common/SmartLink";
import { cn } from "@/lib/utils";

const title = "Order detail — Fabluxe Account";
const description =
  "Follow an order from placed to delivered, with items grouped by fulfilling company and one invoice row per company.";

export const Route = createFileRoute("/account/orders/$orderId")({
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
  component: OrderDetailPage,
});

function OrderDetailPage() {
  const { orderId } = useParams({ from: "/account/orders/$orderId" });
  const { getOrder } = useAccount();
  const order = getOrder(orderId);

  if (!order) {
    return (
      <AccountLayout title="Order not found" crumbs={[{ label: "Orders", to: "/account" }]}>
        <p className="border border-border bg-card p-6 text-sm text-muted-foreground">
          We couldn't find {orderId}. Newly placed orders live in memory only in this prototype.
        </p>
      </AccountLayout>
    );
  }

  const groups = groupByCompany(order.items);
  const reached = orderTimeline.indexOf(order.status);

  return (
    <AccountLayout
      title={order.id}
      eyebrow="Order detail"
      crumbs={[{ label: "Orders", to: "/account" }, { label: order.id }]}
    >
      <div className="flex flex-wrap items-center gap-4">
        <StatusChip status={order.status} />
        <p className="text-xs text-muted-foreground">Placed {order.placedAt}</p>
        <p className="numeric text-sm text-navy">{formatPrice(order.total)}</p>
      </div>

      <ol className="mt-8 grid gap-3 border border-border bg-card p-6 sm:grid-cols-4">
        {orderTimeline.map((stage, index) => {
          const done = index <= reached;
          return (
            <li key={stage} className="flex items-center gap-3">
              <span
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs",
                  done ? "bg-teal text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : index + 1}
              </span>
              <span className={cn("text-xs", done ? "text-navy" : "text-muted-foreground")}>
                {stage}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 space-y-6">
        {groups.map((group) => (
          <section key={group.key} className="border border-border bg-card">
            <header className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border p-5">
              <h2 className="font-display text-xl text-navy">{group.name}</h2>
              <p className="numeric text-xs text-muted-foreground">GSTIN {group.gstin}</p>
            </header>
            <ul className="divide-y divide-border">
              {group.items.map((item, index) => {
                const product = getProduct(item.productId);
                if (!product) return null;
                return (
                  <li key={`${item.productId}-${index}`} className="flex gap-4 p-5">
                    <img
                      src={productImage(product.image)}
                      alt={product.name}
                      loading="lazy"
                      className="aspect-4/3 w-24 shrink-0 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-navy">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {[item.colour, item.size].filter(Boolean).join(" · ")} · Qty {item.quantity}
                      </p>
                    </div>
                    <p className="numeric text-sm text-navy">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </p>
                  </li>
                );
              })}
            </ul>
            {/* TODO: invoices come from the client's existing invoice system. */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-5">
              <p className="text-xs text-muted-foreground">
                Invoice total{" "}
                <span className="numeric font-semibold text-navy">{formatPrice(group.total)}</span>
              </p>
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-xs text-muted-foreground opacity-60"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                Download invoice
              </button>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="border border-border bg-card p-5">
          <p className="label-eyebrow text-teal">Delivery address</p>
          <p className="mt-2 text-sm text-navy">{order.address.name}</p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {order.address.line1}
            {order.address.line2 ? `, ${order.address.line2}` : ""}, {order.address.city},{" "}
            {order.address.state} {order.address.pincode}
            <br />
            {order.address.phone}
          </p>
        </div>
        <div className="border border-border bg-card p-5">
          <p className="label-eyebrow text-teal">Need help?</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Raise a support request for installation, warranty or returns on this order.
          </p>
          <SmartLink
            to="/account/support"
            className="mt-4 inline-block border border-border px-4 py-2.5 text-xs text-navy transition-colors hover:text-teal"
          >
            Contact support
          </SmartLink>
        </div>
      </div>
    </AccountLayout>
  );
}
