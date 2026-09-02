/**
 * Mock order history and address book for the prototype.
 * No back end — everything here is static seed data.
 */
import { companies } from "@/data/site";
import { getProduct } from "@/data/products";

export type Address = {
  id: string;
  label: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault?: boolean;
};

export type OrderItem = {
  productId: string;
  quantity: number;
  unitPrice: number;
  colour?: string;
  size?: string;
};

export type OrderStatus = "Placed" | "Confirmed" | "Shipped" | "Delivered";

export const orderTimeline: OrderStatus[] = ["Placed", "Confirmed", "Shipped", "Delivered"];

export type Order = {
  id: string;
  placedAt: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  delivery: number;
  taxes: number;
  total: number;
  couponCode?: string;
  paymentMethod: string;
  address: Address;
  deliveryEstimate: string;
};

/**
 * TODO: the client has no order-numbering format yet.
 * FBX-<year>-<6 digits> is a placeholder so the UI has something to show.
 */
let sequence = 148;
export const nextOrderId = () => {
  sequence += 1;
  return `FBX-${new Date().getFullYear()}-${String(sequence).padStart(6, "0")}`;
};

export const placeholderOrderId = "FBX-2026-000148";

export const savedAddresses: Address[] = [
  {
    id: "addr-home",
    label: "Home",
    name: "Samarth Shetty",
    line1: "12, Ashwin Residency, 4th Cross",
    line2: "Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    phone: "+91 98450 22110",
    isDefault: true,
  },
  {
    id: "addr-office",
    label: "Office",
    name: "Samarth Shetty",
    line1: "4th Floor, Prestige Atrium, Residency Road",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560025",
    phone: "+91 80 4123 8890",
  },
];

const line = (
  productId: string,
  quantity = 1,
  colour?: string,
  size?: string,
): OrderItem => {
  const product = getProduct(productId);
  const delta = product?.variants.size.find((s) => s.label === size)?.priceDelta ?? 0;
  return {
    productId,
    quantity,
    unitPrice: (product?.price ?? 0) + delta,
    ...(colour ? { colour } : {}),
    ...(size ? { size } : {}),
  };
};

const summarise = (
  items: OrderItem[],
  discount = 0,
  delivery = 0,
): Pick<Order, "subtotal" | "discount" | "delivery" | "taxes" | "total"> => {
  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const taxes = Math.round((subtotal - discount) * 0.18);
  return { subtotal, discount, delivery, taxes, total: subtotal - discount + delivery + taxes };
};

const seed = (
  id: string,
  placedAt: string,
  status: OrderStatus,
  items: OrderItem[],
  extras: Partial<Order> = {},
): Order => ({
  id,
  placedAt,
  status,
  items,
  paymentMethod: "UPI",
  address: savedAddresses[0]!,
  deliveryEstimate: "Delivered",
  ...summarise(items, extras.discount ?? 0, extras.delivery ?? 0),
  ...extras,
});

const ids = ["prd-1001", "prd-1005", "prd-1009", "prd-1025", "prd-1027"];

export const mockOrders: Order[] = [
  // split order — electronics + furniture
  seed("FBX-2026-000141", "2026-08-26", "Placed", [line("prd-1002"), line("prd-1026")], {
    deliveryEstimate: "Arriving Fri, 4 Sep 2026",
    paymentMethod: "UPI",
    address: savedAddresses[1]!,
  }),
  // split order — electronics + furniture
  seed("FBX-2026-000132", "2026-08-14", "Shipped", [line(ids[0]!), line(ids[3]!)], {
    deliveryEstimate: "Arriving Tue, 1 Sep 2026",
    paymentMethod: "Credit card",
  }),
  seed("FBX-2026-000126", "2026-07-19", "Confirmed", [line("prd-1013", 2)], {
    deliveryEstimate: "Arriving Mon, 7 Sep 2026",
    paymentMethod: "Cash on delivery",
  }),
  seed("FBX-2026-000118", "2026-07-02", "Delivered", [line(ids[1]!)], {
    paymentMethod: "Net banking",
  }),
  seed("FBX-2026-000101", "2026-06-08", "Delivered", [line("prd-1017"), line("prd-1021", 2)], {
    discount: 2500,
    paymentMethod: "Credit card",
  }),
  seed("FBX-2026-000094", "2026-05-21", "Delivered", [line(ids[2]!, 1), line(ids[4]!, 2)], {
    discount: 5000,
    paymentMethod: "UPI",
  }),
];


export type CompanyGroup = {
  key: string;
  name: string;
  gstin: string;
  items: OrderItem[];
  total: number;
};

/** Split an order into one block per fulfilling company. */
export function groupByCompany(items: OrderItem[]): CompanyGroup[] {
  const registry = Object.values(companies);
  const groups = new Map<string, CompanyGroup>();

  for (const item of items) {
    const product = getProduct(item.productId);
    if (!product) continue;
    const name = product.fulfilledBy;
    const gstin = registry.find((c) => c.name === name)?.gstin ?? "—";
    const existing = groups.get(name) ?? { key: name, name, gstin, items: [], total: 0 };
    existing.items.push(item);
    existing.total += item.unitPrice * item.quantity;
    groups.set(name, existing);
  }

  return Array.from(groups.values());
}
