import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "@/data/products";

export type CartLine = {
  /** Stable identity for a product + variant combination */
  key: string;
  productId: string;
  quantity: number;
  colour?: string;
  size?: string;
};

export type AddToCartOptions = {
  quantity?: number;
  colour?: string;
  size?: string;
};

export type CompareResult = { ok: boolean; message?: string };

const MAX_COMPARE = 4;

const lineKey = (productId: string, colour?: string, size?: string) =>
  [productId, colour ?? "", size ?? ""].join("|");

type StoreState = {
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
  compareCategory: string | null;
  compareNotice: string | null;
  dismissCompareNotice: () => void;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (productId: string, options?: AddToCartOptions) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  moveToWishlist: (key: string) => void;
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleCompare: (productId: string) => CompareResult;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
};

const StoreContext = createContext<StoreState | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [compareNotice, setCompareNotice] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const addToCart = useCallback((productId: string, options: AddToCartOptions = {}) => {
    const product = getProduct(productId);
    const colour = options.colour ?? product?.variants.colour[0];
    const size =
      options.size ??
      (product?.variants.size.find((s) => s.priceDelta === 0) ?? product?.variants.size[0])?.label;
    const quantity = Math.max(1, options.quantity ?? 1);
    const key = lineKey(productId, colour, size);

    setCart((lines) => {
      const existing = lines.find((l) => l.key === key);
      if (existing) {
        return lines.map((l) => (l.key === key ? { ...l, quantity: l.quantity + quantity } : l));
      }
      return [
        ...lines,
        {
          key,
          productId,
          quantity,
          ...(colour ? { colour } : {}),
          ...(size ? { size } : {}),
        },
      ];
    });
    setCartOpen(true);
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setCart((lines) =>
      quantity <= 0
        ? lines.filter((l) => l.key !== key)
        : lines.map((l) => (l.key === key ? { ...l, quantity } : l)),
    );
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setCart((lines) => lines.filter((l) => l.key !== key));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleIn = (list: string[], id: string) =>
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

  const toggleWishlist = useCallback((id: string) => setWishlist((l) => toggleIn(l, id)), []);
  const removeFromWishlist = useCallback(
    (id: string) => setWishlist((l) => l.filter((x) => x !== id)),
    [],
  );

  const moveToWishlist = useCallback((key: string) => {
    setCart((lines) => {
      const line = lines.find((l) => l.key === key);
      if (line) setWishlist((w) => (w.includes(line.productId) ? w : [...w, line.productId]));
      return lines.filter((l) => l.key !== key);
    });
  }, []);

  const compareCategory = useMemo(() => {
    const first = compare[0] ? getProduct(compare[0]) : undefined;
    return first?.categorySlug ?? null;
  }, [compare]);

  const toggleCompare = useCallback(
    (id: string): CompareResult => {
      if (compare.includes(id)) {
        setCompare((l) => l.filter((x) => x !== id));
        return { ok: true };
      }

      const product = getProduct(id);
      const currentCategory = compare[0] ? getProduct(compare[0])?.categorySlug : undefined;

      if (product && currentCategory && product.categorySlug !== currentCategory) {
        const message =
          "Comparison works within a single category. Clear the compare bar to start a new comparison in another category.";
        setCompareNotice(message);
        return { ok: false, message };
      }

      if (compare.length >= MAX_COMPARE) {
        const message = `You can compare up to ${MAX_COMPARE} products at a time. Remove one to add another.`;
        setCompareNotice(message);
        return { ok: false, message };
      }

      setCompare((l) => [...l, id]);
      setCompareNotice(null);
      return { ok: true };
    },
    [compare],
  );

  const removeFromCompare = useCallback(
    (id: string) => setCompare((l) => l.filter((x) => x !== id)),
    [],
  );
  const clearCompare = useCallback(() => {
    setCompare([]);
    setCompareNotice(null);
  }, []);
  const dismissCompareNotice = useCallback(() => setCompareNotice(null), []);

  const value = useMemo<StoreState>(
    () => ({
      cart,
      wishlist,
      compare,
      compareCategory,
      compareNotice,
      dismissCompareNotice,
      cartOpen,
      openCart,
      closeCart,
      addToCart,
      setQuantity,
      removeFromCart,
      clearCart,
      moveToWishlist,
      toggleWishlist,
      removeFromWishlist,
      toggleCompare,
      removeFromCompare,
      clearCompare,
      cartCount: cart.reduce((sum, l) => sum + l.quantity, 0),
      wishlistCount: wishlist.length,
      compareCount: compare.length,
    }),
    [
      cart,
      wishlist,
      compare,
      compareCategory,
      compareNotice,
      dismissCompareNotice,
      cartOpen,
      openCart,
      closeCart,
      addToCart,
      setQuantity,
      removeFromCart,
      clearCart,
      moveToWishlist,
      toggleWishlist,
      removeFromWishlist,
      toggleCompare,
      removeFromCompare,
      clearCompare,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
