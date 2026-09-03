import { useMemo, useState, type FormEvent } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Check, CreditCard, QrCode } from "lucide-react";
import { formatPrice, getProduct } from "@/data/products";
import { coupons, findCoupon, type Coupon } from "@/data/offers";
import { nextOrderId, type Address, type Order, type OrderItem } from "@/data/orders";
import { productImage } from "@/lib/product-images";
import { useStore } from "@/context/StoreContext";
import { useAccount } from "@/context/AccountContext";
import { Container } from "@/components/common/Section";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { SmartLink } from "@/components/common/SmartLink";
import { cn } from "@/lib/utils";

const title = "Checkout — Fabluxe";
const description =
  "Complete your Fabluxe order: account, delivery address, payment method and a final review.";

export const Route = createFileRoute("/checkout")({
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
  component: CheckoutPage,
});

const DELIVERY_THRESHOLD = 50000;
const DELIVERY_FEE = 1490;
const TAX_RATE = 0.18;

const steps = ["Account", "Delivery address", "Payment", "Review & place order"];

const paymentOptions = [
  { id: "credit-card", label: "Credit card", copy: "Pay in full or convert to EMI at checkout." },
  { id: "debit-card", label: "Debit card", copy: "All major Indian banks supported." },
  { id: "upi", label: "UPI", copy: "Pay by UPI ID or scan the QR with any UPI app." },
  { id: "net-banking", label: "Net banking", copy: "Redirects to your bank in the live build." },
  { id: "cod", label: "Cash on delivery", copy: "Available on orders below ₹2,00,000." },
];

const inputClass =
  "mt-1.5 w-full border border-border bg-background px-3 py-2.5 text-body text-navy placeholder:text-muted-foreground";

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-caption text-muted-foreground">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder ?? ""}
        className={inputClass}
      />
    </label>
  );
}

function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useStore();
  const { signedIn, user, signIn, signUp, addresses, addAddress, placeOrder } = useAccount();

  const [step, setStep] = useState(signedIn ? 2 : 1);
  const [mode, setMode] = useState<"create" | "signin">("create");
  const [addressId, setAddressId] = useState(addresses[0]?.id ?? "");
  const [payment, setPayment] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [terms, setTerms] = useState(false);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const rows = useMemo(
    () =>
      cart.flatMap((line) => {
        const product = getProduct(line.productId);
        if (!product) return [];
        const delta = product.variants.size.find((s) => s.label === line.size)?.priceDelta ?? 0;
        return [{ line, product, unitPrice: product.price + delta }];
      }),
    [cart],
  );

  const subtotal = rows.reduce((sum, r) => sum + r.unitPrice * r.line.quantity, 0);
  const discount = applied
    ? Math.min(Math.round((subtotal * applied.percent) / 100), applied.maxDiscount)
    : 0;
  const delivery = subtotal === 0 || subtotal - discount >= DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const taxes = Math.round((subtotal - discount) * TAX_RATE);
  const total = subtotal - discount + delivery + taxes;

  const selectedAddress = addresses.find((a) => a.id === addressId) ?? addresses[0];

  const applyCoupon = () => {
    const coupon = findCoupon(code);
    if (!coupon) {
      setApplied(null);
      setCouponError("That code isn't recognised.");
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

  const submitAccount = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Prototype only: any input succeeds, nothing is verified.
    if (mode === "create") {
      signUp({
        name: String(data.get("name") ?? "Guest"),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
      });
    } else {
      signIn(String(data.get("email") ?? ""));
    }
    setStep(2);
  };

  const submitAddress = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("line1")) {
      const created: Address = {
        id: `addr-${Date.now()}`,
        label: String(data.get("label") || "New address"),
        name: String(data.get("name") ?? ""),
        line1: String(data.get("line1") ?? ""),
        line2: String(data.get("line2") ?? ""),
        city: String(data.get("city") ?? ""),
        state: String(data.get("state") ?? ""),
        pincode: String(data.get("pincode") ?? ""),
        phone: String(data.get("phone") ?? ""),
      };
      addAddress(created);
      setAddressId(created.id);
    }
    setStep(3);
  };

  const submitOrder = () => {
    if (!terms || !selectedAddress) return;
    const items: OrderItem[] = rows.map((r) => ({
      productId: r.product.id,
      quantity: r.line.quantity,
      unitPrice: r.unitPrice,
      ...(r.line.colour ? { colour: r.line.colour } : {}),
      ...(r.line.size ? { size: r.line.size } : {}),
    }));
    const order: Order = {
      id: nextOrderId(),
      placedAt: new Date().toISOString().slice(0, 10),
      status: "Placed",
      items,
      subtotal,
      discount,
      delivery,
      taxes,
      total,
      ...(applied ? { couponCode: applied.code } : {}),
      paymentMethod: paymentOptions.find((p) => p.id === payment)?.label ?? "UPI",
      address: selectedAddress,
      deliveryEstimate: "Arriving in 4–7 working days",
    };
    placeOrder(order);
    clearCart();
    void router.navigate({ to: "/order/$orderId", params: { orderId: order.id } });
  };

  if (rows.length === 0) {
    return (
      <Container className="py-16">
        <div className="border border-border bg-card p-12 text-center">
          <h1 className="text-heading text-navy">Your cart is empty</h1>
          <p className="mx-auto mt-3 max-w-md text-caption text-muted-foreground">
            Add something to the cart before heading to checkout.
          </p>
          <SmartLink
            to="/shop"
            className="mt-6 inline-block bg-navy px-6 py-3 text-body font-medium text-primary-foreground transition-colors hover:bg-teal"
          >
            Browse the catalogue
          </SmartLink>
        </div>
      </Container>
    );
  }

  return (
    <div className="pb-24">
      <Container>
        <Breadcrumbs
          items={[{ label: "Home", to: "/" }, { label: "Cart", to: "/cart" }, { label: "Checkout" }]}
        />
        <span className="rule-gold mb-4" aria-hidden="true" />
        <p className="label-eyebrow text-teal">Secure checkout</p>
        <h1 className="mt-3 text-heading text-navy">Complete your order</h1>

        <ol className="mt-8 grid gap-3 sm:grid-cols-4">
          {steps.map((label, index) => {
            const number = index + 1;
            const done = step > number;
            const active = step === number;
            return (
              <li
                key={label}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "flex items-center gap-3 border-t-2 pt-3",
                  active ? "border-gold" : done ? "border-teal" : "border-border",
                )}
              >
                <span
                  className={cn(
                    "numeric grid h-7 w-7 shrink-0 place-items-center rounded-full text-caption font-semibold",
                    active
                      ? "bg-navy text-primary-foreground"
                      : done
                        ? "bg-teal text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : number}
                </span>
                <span className={cn("text-caption", active ? "text-navy" : "text-muted-foreground")}>
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </Container>

      <Container className="grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="border border-border bg-card p-6 sm:p-8">
          {step === 1 ? (
            <section aria-labelledby="step-account">
              <h2 id="step-account" className="text-heading text-navy">
                {mode === "create" ? "Create an account to continue" : "Sign in to continue"}
              </h2>
              <p className="mt-2 text-caption text-muted-foreground">
                Browsing is open to everyone, but an account is required to place an order.
              </p>
              <form onSubmit={submitAccount} className="mt-6 grid gap-4 sm:grid-cols-2">
                {mode === "create" ? (
                  <>
                    <Field label="Full name" name="name" placeholder="Your name" />
                    <Field label="Phone" name="phone" type="tel" placeholder="+91 90000 00000" />
                  </>
                ) : null}
                <Field label="Email" name="email" type="email" placeholder="you@example.com" />
                <Field label="Password" name="password" type="password" placeholder="••••••••" />
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-navy px-6 py-2.5 text-body font-medium text-primary-foreground transition-colors hover:bg-teal sm:w-auto"
                  >
                    {mode === "create" ? "Create account & continue" : "Sign in & continue"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode(mode === "create" ? "signin" : "create")}
                    className="ml-0 mt-3 block text-body text-teal underline-offset-4 hover:underline sm:ml-5 sm:mt-0 sm:inline"
                  >
                    {mode === "create" ? "Sign in instead" : "Create an account instead"}
                  </button>
                </div>
              </form>
            </section>
          ) : null}

          {step === 2 ? (
            <section aria-labelledby="step-address">
              <h2 id="step-address" className="text-heading text-navy">
                Delivery address
              </h2>
              <fieldset className="mt-6">
                <legend className="label-eyebrow text-teal">Saved addresses</legend>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className={cn(
                        "cursor-pointer border p-4 text-body",
                        addressId === address.id ? "border-gold bg-sky/30" : "border-border",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="saved-address"
                          value={address.id}
                          checked={addressId === address.id}
                          onChange={() => setAddressId(address.id)}
                          className="accent-[var(--color-teal)]"
                        />
                        <span className="label-eyebrow text-navy">{address.label}</span>
                      </span>
                      <span className="mt-2 block text-caption leading-relaxed text-muted-foreground">
                        {address.name}, {address.line1}
                        {address.line2 ? `, ${address.line2}` : ""}, {address.city},{" "}
                        {address.state} {address.pincode}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <form onSubmit={submitAddress} className="mt-8">
                <p className="label-eyebrow text-teal">Or add a new address</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="Address label" name="label" placeholder="Home" required={false} />
                  <Field label="Full name" name="name" placeholder="Your name" required={false} />
                  <Field
                    label="Address line 1"
                    name="line1"
                    placeholder="Flat, building, street"
                    required={false}
                  />
                  <Field
                    label="Address line 2"
                    name="line2"
                    placeholder="Landmark, area"
                    required={false}
                  />
                  <Field label="City" name="city" placeholder="Bengaluru" required={false} />
                  <Field label="State" name="state" placeholder="Karnataka" required={false} />
                  <Field label="PIN code" name="pincode" placeholder="560038" required={false} />
                  <Field label="Phone" name="phone" type="tel" placeholder="+91 90000 00000" required={false} />
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="bg-navy px-6 py-2.5 text-body font-medium text-primary-foreground transition-colors hover:bg-teal"
                  >
                    Continue to payment
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="border border-border px-6 py-2.5 text-body text-navy transition-colors hover:text-teal"
                  >
                    Back
                  </button>
                </div>
              </form>
            </section>
          ) : null}

          {step === 3 ? (
            <section aria-labelledby="step-payment">
              <h2 id="step-payment" className="text-heading text-navy">
                Payment method
              </h2>
              <div className="mt-6 divide-y divide-border border border-border">
                {paymentOptions.map((option) => (
                  <div key={option.id}>
                    <label className="flex cursor-pointer items-start gap-3 p-4">
                      <input
                        type="radio"
                        name="payment"
                        value={option.id}
                        checked={payment === option.id}
                        onChange={() => setPayment(option.id)}
                        className="mt-1 accent-[var(--color-teal)]"
                      />
                      <span>
                        <span className="block text-body text-navy">{option.label}</span>
                        <span className="block text-caption text-muted-foreground">{option.copy}</span>
                      </span>
                    </label>

                    {option.id === "upi" && payment === "upi" ? (
                      <div className="grid gap-5 border-t border-border bg-beige/60 p-4 sm:grid-cols-[minmax(0,1fr)_10rem]">
                        <label className="block text-caption text-muted-foreground">
                          UPI ID
                          <input
                            value={upiId}
                            onChange={(event) => setUpiId(event.target.value)}
                            placeholder="name@bank"
                            className={inputClass}
                          />
                        </label>
                        <div className="grid aspect-square place-items-center border border-dashed border-teal/60 bg-card text-center">
                          <span className="px-2">
                            <QrCode className="mx-auto h-8 w-8 text-teal" aria-hidden="true" />
                            <span className="mt-2 block text-caption leading-snug text-muted-foreground">
                              QR placeholder
                            </span>
                          </span>
                        </div>
                      </div>
                    ) : null}

                    {(option.id === "credit-card" || option.id === "debit-card") &&
                    payment === option.id ? (
                      <div className="grid gap-4 border-t border-border bg-beige/60 p-4 sm:grid-cols-2">
                        <label className="block text-caption text-muted-foreground sm:col-span-2">
                          Card number
                          <input placeholder="0000 0000 0000 0000" className={inputClass} />
                        </label>
                        <label className="block text-caption text-muted-foreground">
                          Expiry
                          <input placeholder="MM / YY" className={inputClass} />
                        </label>
                        <label className="block text-caption text-muted-foreground">
                          CVV
                          <input placeholder="•••" className={inputClass} />
                        </label>
                        <p className="flex items-center gap-2 text-caption text-muted-foreground sm:col-span-2">
                          <CreditCard className="h-3.5 w-3.5 text-teal" aria-hidden="true" />
                          Card details are not processed in this prototype.
                        </p>
                      </div>
                    ) : null}

                    {option.id === "net-banking" && payment === "net-banking" ? (
                      <div className="border-t border-border bg-beige/60 p-4">
                        <label className="block text-caption text-muted-foreground">
                          Select your bank
                          <select className={inputClass}>
                            <option>State Bank of India</option>
                            <option>HDFC Bank</option>
                            <option>ICICI Bank</option>
                            <option>Axis Bank</option>
                            <option>Kotak Mahindra Bank</option>
                          </select>
                        </label>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setStep(4)}
className="bg-navy px-6 py-2.5 text-body font-medium text-primary-foreground transition-colors hover:bg-teal"
                  >
                    Continue to review
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="border border-border px-6 py-2.5 text-body text-navy transition-colors hover:text-teal"
                  >
                  Back
                </button>
              </div>
            </section>
          ) : null}

          {step === 4 ? (
            <section aria-labelledby="step-review">
              <h2 id="step-review" className="text-heading text-navy">
                Review and place order
              </h2>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="border border-border p-4">
                  <p className="label-eyebrow text-teal">Account</p>
                  <p className="mt-2 text-body text-navy">{user?.name ?? "Guest"}</p>
                  <p className="text-caption text-muted-foreground">{user?.email}</p>
                  <p className="text-caption text-muted-foreground">{user?.phone}</p>
                </div>
                <div className="border border-border p-4">
                  <p className="label-eyebrow text-teal">Delivering to</p>
                  <p className="mt-2 text-body text-navy">{selectedAddress?.label}</p>
                  <p className="text-caption leading-relaxed text-muted-foreground">
                    {selectedAddress?.line1}
                    {selectedAddress?.line2 ? `, ${selectedAddress.line2}` : ""},{" "}
                    {selectedAddress?.city}, {selectedAddress?.state} {selectedAddress?.pincode}
                  </p>
                </div>
                <div className="border border-border p-4 sm:col-span-2">
                  <p className="label-eyebrow text-teal">Payment</p>
                  <p className="mt-2 text-body text-navy">
                    {paymentOptions.find((p) => p.id === payment)?.label}
                    {payment === "upi" && upiId ? ` · ${upiId}` : ""}
                  </p>
                </div>
              </div>

              <ul className="mt-6 divide-y divide-border border border-border">
                {rows.map(({ line, product, unitPrice }) => (
                  <li key={line.key} className="flex flex-wrap items-start gap-4 p-4 sm:flex-nowrap">
                    <img
                      src={productImage(product.image)}
                      alt={product.name}
                      loading="lazy"
                      className="aspect-4/3 w-24 shrink-0 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-body text-navy">{product.name}</p>
                      <p className="text-caption text-muted-foreground">
                        {[line.colour, line.size].filter(Boolean).join(" · ")} · Qty {line.quantity}
                      </p>
                    </div>
                    <p className="numeric mt-1 basis-full text-right text-body text-navy sm:ml-auto sm:basis-auto">
                      {formatPrice(unitPrice * line.quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              <label className="mt-6 flex items-start gap-3 text-caption text-muted-foreground">
                <input
                  type="checkbox"
                  checked={terms}
                  onChange={(event) => setTerms(event.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[var(--color-teal)]"
                />
                I accept the terms of use and confirm that returns and warranty apply as per company
                policy.
              </label>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={!terms}
                  onClick={submitOrder}
className="bg-navy px-6 py-2.5 text-body font-medium text-primary-foreground transition-colors hover:bg-teal disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Place order
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="border border-border px-6 py-2.5 text-body text-navy transition-colors hover:text-teal"
                  >
                  Back
                </button>
              </div>
            </section>
          ) : null}
        </div>

        <aside className="h-fit border border-border bg-card p-6 lg:sticky lg:top-28">
          <p className="label-eyebrow text-teal">Order summary</p>

          <div className="mt-5">
            <label htmlFor="checkout-coupon" className="text-caption text-muted-foreground">
              Coupon or discount code
            </label>
            <div className="mt-2 flex">
              <input
                id="checkout-coupon"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="FABFEST"
                className="min-w-0 flex-1 border border-border bg-background px-3 py-2.5 text-body text-navy placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={applyCoupon}
                className="bg-navy px-4 text-body font-medium text-primary-foreground transition-colors hover:bg-teal"
              >
                Apply
              </button>
            </div>
            {applied ? (
              <p className="mt-3 flex items-center justify-between text-caption text-teal">
                <span>{applied.code} applied</span>
                <button
                  type="button"
                  onClick={() => setApplied(null)}
                  className="underline-offset-4 hover:underline"
                >
                  Remove
                </button>
              </p>
            ) : null}
            {couponError ? <p className="mt-3 text-caption text-destructive">{couponError}</p> : null}
            <p className="mt-3 text-caption text-muted-foreground">
              Available codes: {coupons.map((c) => c.code).join(", ")}
            </p>
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
        </aside>
      </Container>
    </div>
  );
}
