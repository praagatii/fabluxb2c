/**
 * Mock coupon catalogue. Prototype only — no validation service behind it.
 */
export type Coupon = {
  code: string;
  title: string;
  copy: string;
  /** Percentage off the eligible subtotal */
  percent: number;
  /** Upper limit on the rupee value of the discount */
  maxDiscount: number;
  minSubtotal: number;
};

export const coupons: Coupon[] = [
  {
    code: "FABFEST",
    title: "Festive edit — 10% off",
    copy: "Ten per cent off large appliances, capped at ₹12,000.",
    percent: 10,
    maxDiscount: 12000,
    minSubtotal: 25000,
  },
  {
    code: "FIRSTHOME",
    title: "First order — 5% off",
    copy: "Five per cent off your first Fabluxe order, capped at ₹5,000.",
    percent: 5,
    maxDiscount: 5000,
    minSubtotal: 0,
  },
  {
    code: "INTERIORS15",
    title: "Interiors pairing — 15% off",
    copy: "Fifteen per cent off when the order includes Fabluxora Interiors pieces, capped at ₹20,000.",
    percent: 15,
    maxDiscount: 20000,
    minSubtotal: 60000,
  },
];

export const findCoupon = (code: string) =>
  coupons.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
