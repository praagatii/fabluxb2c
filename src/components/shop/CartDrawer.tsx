import { useMemo } from "react";
import { X } from "lucide-react";
import { formatPrice, getProduct, type Product } from "@/data/products";
import { productImage } from "@/lib/product-images";
import { useStore, type CartLine } from "@/context/StoreContext";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { SmartLink } from "@/components/common/SmartLink";

type Row = { line: CartLine; product: Product; unitPrice: number; lineTotal: number };

export function CartDrawer() {
  const { cartOpen, closeCart, cart, setQuantity, removeFromCart } = useStore();

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

  return (
    <Sheet open={cartOpen} onOpenChange={(open) => (open ? undefined : closeCart())}>
      <SheetContent className="flex w-full max-w-md flex-col bg-background p-0">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <SheetTitle className="text-heading text-navy">Your cart</SheetTitle>
          <SheetClose className="grid h-9 w-9 place-items-center rounded-sm text-navy transition-colors hover:text-teal">
            <X className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Close cart</span>
          </SheetClose>
        </div>

        {rows.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
            <p className="text-body text-navy">Your cart is empty</p>
            <p className="max-w-xs text-caption text-muted-foreground">
              Add an appliance or an interiors piece and it will appear here.
            </p>
            <SmartLink
              to="/shop"
              onClick={closeCart}
              className="bg-navy px-6 py-3 text-body font-medium text-primary-foreground transition-colors hover:bg-teal"
            >
              Browse the catalogue
            </SmartLink>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {rows.map(({ line, product, lineTotal }) => (
                <li key={line.key} className="flex gap-4 py-5">
                  <SmartLink
                    to={`/shop/product/${product.id}`}
                    onClick={closeCart}
                    className="block aspect-4/3 w-20 shrink-0 bg-sky/40"
                  >
                    <img
                      src={productImage(product.image)}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </SmartLink>
                  <div className="min-w-0 flex-1">
                    <p className="label-eyebrow text-teal">{product.brand}</p>
                    <p className="mt-1 text-body leading-snug text-navy">
                      <SmartLink to={`/shop/product/${product.id}`} onClick={closeCart} className="link-gold">
                        {product.name}
                      </SmartLink>
                    </p>
                    <p className="mt-1 text-caption text-muted-foreground">
                      {[line.colour, line.size].filter(Boolean).join(" · ")}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${product.name}`}
                          onClick={() => setQuantity(line.key, line.quantity - 1)}
                          className="grid h-9 w-9 place-items-center text-navy transition-colors hover:text-teal"
                        >
                          −
                        </button>
                        <span className="numeric w-9 text-center text-body text-navy">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${product.name}`}
                          onClick={() => setQuantity(line.key, line.quantity + 1)}
                          className="grid h-9 w-9 place-items-center text-navy transition-colors hover:text-teal"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(line.key)}
                        className="text-caption text-muted-foreground underline-offset-4 transition-colors hover:text-teal hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="numeric shrink-0 text-body font-semibold text-navy">
                    {formatPrice(lineTotal)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-6 py-5">
              <div className="flex items-center justify-between">
                <p className="text-body text-navy">Subtotal</p>
                <p className="numeric text-heading font-semibold text-navy">{formatPrice(subtotal)}</p>
              </div>
              <p className="mt-1 text-caption text-muted-foreground">
                Delivery and taxes calculated at checkout.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <SmartLink
                  to="/checkout"
                  onClick={closeCart}
                  className="w-full bg-navy px-6 py-2.5 text-center text-body font-medium text-primary-foreground transition-colors hover:bg-teal"
                >
                  Checkout
                </SmartLink>
                <SmartLink
                  to="/cart"
                  onClick={closeCart}
                  className="w-full border border-navy px-6 py-2.5 text-center text-body font-medium text-navy transition-colors hover:border-gold hover:text-teal"
                >
                  View cart
                </SmartLink>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
