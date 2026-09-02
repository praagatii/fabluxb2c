import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Info, Minus, Plus, Tag, Trash2, X } from "lucide-react";
import { formatPrice, getProduct, type Product } from "@/data/products";
import { coupons, findCoupon, type Coupon } from "@/data/offers";
import { productImage } from "@/lib/product-images";
import { useStore, type CartLine } from "@/context/StoreContext";
import { Container } from "@/components/common/Section";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { SmartLink } from "@/components/common/SmartLink";

const title = "Your Cart — Fabluxe";
const description =
  "Review your Fabluxe cart, apply an offer code and see the full order summary before checkout.";

export const Route = createFileRoute("/cart")({
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
  component: CartPage,
});

const DELIVERY_THRESHOLD = 50000;
const DELIVERY_FEE = 1490;
const TAX_RATE = 0.18;

type Row = { line: CartLine; product: Product; unitPrice: number; lineTotal: number };

function CartPage() {
  const { cart, setQuantity, removeFromCart, moveToWishlist } = useStore();
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [offersOpen, setOffersOpen] = useState(false);

  const rows = useMemo<Row[]>(
    () =>
      cart.flatMap((line) => {
        const product = getProduct(line.productId);
        if (!product) return [];
        const delta = product.variants.size.find((s) => s.label === line.size)?.priceDelta ?? 0;
        const unitPrice = product.price + delta;
        return [{ line, product, unitPrice, lineTotal: unitPrice * line.quantity }];
      }),
    [cart],
  );

  const subtotal = rows.reduce((sum, r) => sum + r.lineTotal, 0);
  const discount = applied
    ? Math.min(Math.round((subtotal * applied.percent) / 100), applied.maxDiscount)
    : 0;
  const delivery = subtotal === 0 || subtotal - discount >= DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const taxes = Math.round((subtotal - discount) * TAX_RATE);
  const total = subtotal - discount + delivery + taxes;

  const companies = Array.from(new Set(rows.map((r) => r.product.fulfilledBy)));
  const splitOrder = companies.length > 1;

  const applyCoupon = () => {
    const coupon = findCoupon(code);
    if (!coupon) {
      setApplied(null);
      setCouponError("That code isn't recognised. Check the available offers below.");
      return;
    }
    if (subtotal < coupon.minSubtotal) {
      setApplied(null);
      setCouponError(`${coupon.code} applies on orders above ${formatPrice(coupon.minSubtotal)}.`);
      return;
    }
    setApplied(coupon);
    setCouponError(null);
  };

  return (
    <div className="pb-32">
      <Container>
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Cart" }]} />
        <span className="rule-gold mb-4" aria-hidden="true" />
        <p className="label-eyebrow text-teal">Your order</p>
        <h1 className="mt-3 text-heading text-navy">Shopping cart</h1>
        <p className="mt-3 text-caption text-muted-foreground">
          {rows.length} {rows.length === 1 ? "line" : "lines"} in your cart
        </p>
      </Container>

      {rows.length === 0 ? (
        <Container className="py-12">
          <div className="border border-border bg-card p-12 text-center">
            <h2 className="text-heading text-navy">Your cart is empty</h2>
            <p className="mx-auto mt-3 max-w-md text-caption text-muted-foreground">
              Add an appliance or an interiors piece and it will appear here with delivery and
              invoice details.
            </p>
            <SmartLink
              to="/shop"
              className="mt-6 inline-block bg-navy px-6 py-3 text-body font-medium text-primary-foreground transition-colors hover:bg-teal"
            >
              Browse the catalogue
            </SmartLink>
          </div>
        </Container>
      ) : (
        <Container className="grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            {splitOrder ? (
              <p className="mb-6 flex items-start gap-3 border border-border bg-sky/40 px-4 py-3 text-caption leading-relaxed text-navy">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                <span>
                  This order will be fulfilled by two Fabluxe companies —{" "}
                  {companies.join(" and ")} — and invoiced separately under one order ID.
                </span>
              </p>
            ) : null}

            <ul className="divide-y divide-border border border-border bg-card">
              {rows.map(({ line, product, unitPrice, lineTotal }) => (
                <li key={line.key} className="flex flex-col gap-4 p-5 sm:flex-row">
                  <SmartLink
                    to={`/shop/product/${product.id}`}
                    className="block aspect-4/3 w-full shrink-0 bg-sky/40 sm:w-40"
                  >
                    <img
                      src={productImage(product.image)}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </SmartLink>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="label-eyebrow text-teal">{product.brand}</p>
                    <h2 className="mt-1 text-heading leading-snug text-navy">
                      <SmartLink to={`/shop/product/${product.id}`} className="link-gold">
                        {product.name}
                      </SmartLink>
                    </h2>
                    <p className="mt-1 text-caption text-muted-foreground">
                      {[line.colour, line.size].filter(Boolean).join(" · ")}
                    </p>
                    <p className="mt-1 text-caption text-muted-foreground">
                      Fulfilled by {product.fulfilledBy}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${product.name}`}
                          onClick={() => setQuantity(line.key, line.quantity - 1)}
                          className="grid h-10 w-10 place-items-center text-navy transition-colors hover:text-teal"
                        >
                          <Minus className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <span className="numeric w-10 text-center text-body text-navy">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${product.name}`}
                          onClick={() => setQuantity(line.key, line.quantity + 1)}
                          className="grid h-10 w-10 place-items-center text-navy transition-colors hover:text-teal"
                        >
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="numeric text-body text-navy">
                        <span className="font-semibold">{formatPrice(lineTotal)}</span>
                        {line.quantity > 1 ? (
                          <span className="ml-2 text-caption text-muted-foreground">
                            {formatPrice(unitPrice)} each
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-body">
                      <button
                        type="button"
                        onClick={() => moveToWishlist(line.key)}
                        className="text-muted-foreground underline-offset-4 transition-colors hover:text-teal hover:underline"
                      >
                        Move to wishlist
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(line.key)}
                        className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-teal"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit border border-border bg-card p-6 lg:sticky lg:top-28">
            <p className="label-eyebrow text-teal">Order summary</p>

            <div className="mt-5">
              <label htmlFor="coupon" className="text-caption text-muted-foreground">
                Coupon or discount code
              </label>
              <div className="mt-2 flex">
                <input
                  id="coupon"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="FABFEST"
                  className="min-w-0 flex-1 border border-border bg-background px-3 py-2.5 text-body text-navy placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="bg-navy px-4 py-2.5 text-body font-medium text-primary-foreground transition-colors hover:bg-teal"
                >
                  Apply
                </button>
              </div>

              <div aria-live="polite">
                {applied ? (
                  <p className="mt-3 flex items-center justify-between gap-3 bg-beige px-3 py-2 text-caption text-navy">
                    <span className="inline-flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5 text-teal" aria-hidden="true" />
                      {applied.code} applied — {applied.percent}% off
                    </span>
                    <button
                      type="button"
                      aria-label="Remove coupon"
                      onClick={() => {
                        setApplied(null);
                        setCode("");
                      }}
                      className="text-muted-foreground transition-colors hover:text-teal"
                    >
                      <X className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </p>
                ) : null}
                {couponError ? (
                  <p className="mt-3 text-caption text-destructive">{couponError}</p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() => setOffersOpen((open) => !open)}
                aria-expanded={offersOpen}
                className="mt-3 text-body text-teal underline-offset-4 hover:underline"
              >
                {offersOpen ? "Hide available offers" : "View available offers"}
              </button>

              {offersOpen ? (
                <ul className="mt-3 space-y-3 border border-border p-3">
                  {coupons.map((coupon) => (
                    <li key={coupon.code}>
                      <div className="flex items-center justify-between gap-3">
                        <span className="numeric bg-sky/60 px-2 py-0.5 text-caption font-semibold text-navy">
                          {coupon.code}
                        </span>
                        <button
                          type="button"
                          onClick={() => setCode(coupon.code)}
                          className="text-body text-teal underline-offset-4 hover:underline"
                        >
                          Use code
                        </button>
                      </div>
                      <p className="mt-1 text-caption text-navy">{coupon.title}</p>
                      <p className="text-caption leading-relaxed text-muted-foreground">{coupon.copy}</p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <dl className="mt-6 space-y-3 border-t border-border pt-5 text-body">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="numeric text-navy">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Discount</dt>
                <dd className="numeric text-teal">
                  {discount > 0 ? `− ${formatPrice(discount)}` : "—"}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Delivery &amp; installation</dt>
                <dd className="numeric text-navy">
                  {delivery === 0 ? "Complimentary" : formatPrice(delivery)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Taxes (GST 18%)</dt>
                <dd className="numeric text-navy">{formatPrice(taxes)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <dt className="text-body text-navy">Total</dt>
                <dd className="numeric text-body font-semibold text-navy">{formatPrice(total)}</dd>
              </div>
            </dl>

            <SmartLink
              to="/checkout"
              className="mt-6 block bg-navy px-6 py-3.5 text-center text-body font-medium text-primary-foreground transition-colors hover:bg-teal"
            >
              Proceed to checkout
            </SmartLink>
            <p className="mt-3 text-center text-caption text-muted-foreground">
              Returns and warranty as per company policy.
            </p>
          </aside>
        </Container>
      )}
    </div>
  );
}
