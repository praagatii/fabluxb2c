import { createFileRoute, useParams } from "@tanstack/react-router";
import { CheckCircle2, Download, Truck } from "lucide-react";
import { formatPrice, getProduct } from "@/data/products";
import { groupByCompany } from "@/data/orders";
import { productImage } from "@/lib/product-images";
import { useAccount } from "@/context/AccountContext";
import { Container } from "@/components/common/Section";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { SmartLink } from "@/components/common/SmartLink";

const title = "Order confirmed — Fabluxe";
const description =
  "Your Fabluxe order is confirmed. See the delivery estimate, your items and your invoice.";

export const Route = createFileRoute("/order/$orderId")({
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
  component: OrderConfirmationPage,
});

function OrderConfirmationPage() {
  const { orderId } = useParams({ from: "/order/$orderId" });
  const { getOrder, orders } = useAccount();
  const order = getOrder(orderId) ?? orders[0];

  if (!order) {
    return (
      <Container className="py-16">
        <h1 className="text-heading text-navy">Order not found</h1>
        <p className="mt-3 text-caption text-muted-foreground">
          This prototype keeps orders in memory, so a page refresh clears newly placed ones.
        </p>
      </Container>
    );
  }

  const groups = groupByCompany(order.items);
  const split = groups.length > 1;

  return (
    <div className="pb-24">
      <Container>
        <Breadcrumbs
          items={[{ label: "Home", to: "/" }, { label: "Order confirmation" }]}
        />
        <div className="border border-border bg-card p-8 text-center sm:p-12">
          <CheckCircle2 className="mx-auto h-10 w-10 text-teal" aria-hidden="true" />
          <span className="rule-gold mx-auto mt-6" aria-hidden="true" />
          <p className="label-eyebrow mt-4 text-teal">Thank you</p>
          <h1 className="mt-3 font-display text-display text-navy">Your order is placed</h1>
          {/* Order ID format is a placeholder — the client has no order-numbering format yet. */}
          <p className="numeric mt-4 text-body text-navy">
            Order ID <span className="font-semibold">{order.id}</span>
          </p>
          <p className="mt-2 inline-flex items-center gap-2 text-caption text-muted-foreground">
            <Truck className="h-4 w-4 text-teal" aria-hidden="true" />
            {order.deliveryEstimate}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <SmartLink
              to={`/account/orders/${order.id}`}
              className="bg-navy px-6 py-2.5 text-body font-medium text-primary-foreground transition-colors hover:bg-beige hover:text-navy"
            >
              Track order
            </SmartLink>
            <SmartLink
              to="/shop"
              className="border border-border px-6 py-2.5 text-body text-navy transition-colors hover:text-teal"
            >
              Continue shopping
            </SmartLink>
          </div>
        </div>
      </Container>

      <Container className="py-14 sm:py-[var(--spacing-section)]">
        <p className="label-eyebrow text-teal">Items in this order</p>
        <ul className="mt-4 divide-y divide-border border border-border bg-card">
          {order.items.map((item, index) => {
            const product = getProduct(item.productId);
            if (!product) return null;
            return (
              <li key={`${item.productId}-${index}`} className="flex flex-wrap items-start gap-4 p-4 sm:flex-nowrap">
                <img
                  src={productImage(product.image)}
                  alt={product.name}
                  loading="lazy"
                  className="aspect-4/3 w-24 shrink-0 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-body text-navy">{product.name}</p>
                  <p className="text-caption text-muted-foreground">
                    {[item.colour, item.size].filter(Boolean).join(" · ")} · Qty {item.quantity}
                  </p>
                  <p className="text-caption text-muted-foreground">
                    Fulfilled by {product.fulfilledBy}
                  </p>
                </div>
                <p className="numeric mt-1 basis-full text-right text-body text-navy sm:ml-auto sm:basis-auto">
                  {formatPrice(item.unitPrice * item.quantity)}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mt-10">
          <p className="label-eyebrow text-teal">
            {split ? "Two invoices, one order ID" : "Invoice"}
          </p>
          {split ? (
            <p className="mt-3 max-w-2xl text-caption leading-relaxed text-muted-foreground">
              This order contains items from two Fabluxe group companies. Each company raises its
              own invoice under the single order ID {order.id}.
            </p>
          ) : null}

          {/* TODO: invoices come from the client's existing invoice system. */}
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {groups.map((group) => (
              <section key={group.key} className="border border-border bg-card p-6">
                <h2 className="text-heading text-navy">{group.name}</h2>
                <p className="numeric mt-1 text-caption text-muted-foreground">GSTIN {group.gstin}</p>
                <ul className="mt-4 space-y-2 border-t border-border pt-4 text-body">
                  {group.items.map((item, index) => (
                    <li
                      key={`${item.productId}-${index}`}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <span className="min-w-0 text-navy">
                        {getProduct(item.productId)?.name}
                        {item.quantity > 1 ? ` × ${item.quantity}` : ""}
                      </span>
                      <span className="numeric shrink-0 text-muted-foreground">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
                  <span className="text-caption text-muted-foreground">Invoice total</span>
                  <span className="numeric text-body font-semibold text-navy">
                    {formatPrice(group.total)}
                  </span>
                </p>
                <button
                  type="button"
                  disabled
                  title="Invoices are issued by the client's invoice system"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 border border-border px-4 py-3 text-body text-muted-foreground opacity-60"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download invoice
                </button>
              </section>
            ))}
          </div>
        </div>

        <dl className="mt-10 max-w-sm space-y-3 border border-border bg-card p-6 text-body">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="numeric text-navy">{formatPrice(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Discount</dt>
            <dd className="numeric text-teal">
              {order.discount > 0 ? `− ${formatPrice(order.discount)}` : "—"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Delivery &amp; installation</dt>
            <dd className="numeric text-navy">
              {order.delivery === 0 ? "Complimentary" : formatPrice(order.delivery)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Taxes (GST 18%)</dt>
            <dd className="numeric text-navy">{formatPrice(order.taxes)}</dd>
          </div>
          <div className="flex justify-between border-t border-border pt-3">
            <dt className="text-body text-navy">Total paid</dt>
            <dd className="numeric text-body font-semibold text-navy">{formatPrice(order.total)}</dd>
          </div>
        </dl>
      </Container>
    </div>
  );
}
