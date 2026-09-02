/**
 * Admin portal mock data. Front-end prototype only — nothing here is
 * persisted and no request leaves the browser.
 * // TODO: sync with client's existing order and invoice system.
 */
import { products, type Product } from "@/data/products";
import { mockOrders, type Order } from "@/data/orders";
import { companies } from "@/data/site";

/* ---------------------------------------------- roles and access */

export const adminRoles = ["Director", "Manager", "Editor", "Viewer"] as const;
export type AdminRole = (typeof adminRoles)[number];

export const roleBlurb: Record<AdminRole, string> = {
  Director: "Full authority. The only role that can create users and assign access levels.",
  Manager: "Runs catalogue, orders, coupons and enquiries. Cannot manage users.",
  Editor: "Edits products, content and reviews. No order or coupon controls.",
  Viewer: "Read-only across the portal.",
};

export type AdminSection =
  | "dashboard"
  | "products"
  | "categories"
  | "orders"
  | "coupons"
  | "reviews"
  | "interiors"
  | "b2b"
  | "content"
  | "users";

/** Which sections each role may open. Users is Director-only, by design. */
export const roleAccess: Record<AdminRole, AdminSection[]> = {
  Director: [
    "dashboard",
    "products",
    "categories",
    "orders",
    "coupons",
    "reviews",
    "interiors",
    "b2b",
    "content",
    "users",
  ],
  Manager: [
    "dashboard",
    "products",
    "categories",
    "orders",
    "coupons",
    "reviews",
    "interiors",
    "b2b",
    "content",
  ],
  Editor: ["dashboard", "products", "categories", "reviews", "interiors", "b2b", "content"],
  Viewer: [
    "dashboard",
    "products",
    "categories",
    "orders",
    "reviews",
    "interiors",
    "b2b",
    "content",
  ],
};

/** Viewer can open a section but never change anything. */
export const canEdit = (role: AdminRole, section: AdminSection) =>
  role !== "Viewer" && roleAccess[role].includes(section);

export const canAccess = (role: AdminRole, section: AdminSection) =>
  roleAccess[role].includes(section);

/* ---------------------------------------------- catalogue rows */

export type AdminProductRow = {
  id: string;
  name: string;
  sku: string;
  brand: string;
  categorySlug: string;
  company: Product["fulfilledBy"];
  price: number;
  mrp: number;
  stock: number;
  status: "Published" | "Draft" | "Archived";
  image: Product["image"];
};

const stockFor = (id: string) => {
  const n = Number(id.replace(/\D/g, "")) || 0;
  return (n * 7) % 64;
};

export const adminProducts: AdminProductRow[] = products.map((p, index) => ({
  id: p.id,
  name: p.name,
  sku: `FBX-${p.categorySlug.slice(0, 3).toUpperCase()}-${p.id.replace(/\D/g, "")}`,
  brand: p.brand,
  categorySlug: p.categorySlug,
  company: p.fulfilledBy,
  price: p.price,
  mrp: p.mrp,
  stock: stockFor(p.id),
  status: index % 11 === 0 ? "Draft" : index % 17 === 0 ? "Archived" : "Published",
  image: p.image,
}));

export const lowStock = adminProducts
  .filter((p) => p.stock <= 6)
  .sort((a, b) => a.stock - b.stock)
  .slice(0, 6);

/* ---------------------------------------------- dashboard */

const revenueOf = (o: Order) => o.total;

export const dashboardStats = () => {
  const revenue = mockOrders.reduce((sum, o) => sum + revenueOf(o), 0);
  return {
    revenue,
    orders: mockOrders.length + 129,
    averageOrder: Math.round(revenue / Math.max(mockOrders.length, 1)),
    conversion: 2.8,
  };
};

export const revenueByCompany = [
  { name: companies.electronics.name, gstin: companies.electronics.gstin, share: 78, value: 4820000 },
  { name: companies.interiors.name, gstin: companies.interiors.gstin, share: 22, value: 1360000 },
];

export const salesTrend = [
  { label: "Mar", value: 62 },
  { label: "Apr", value: 71 },
  { label: "May", value: 58 },
  { label: "Jun", value: 84 },
  { label: "Jul", value: 76 },
  { label: "Aug", value: 93 },
];

/* ---------------------------------------------- orders */

export type AdminOrderRow = {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  status: Order["status"];
  companies: string[];
};

export const orderCompanies = (order: Order): string[] => {
  const names = new Set<string>();
  for (const item of order.items) {
    const product = products.find((p) => p.id === item.productId);
    if (product) names.add(product.fulfilledBy);
  }
  return Array.from(names);
};

const customerNames = ["Samarth Shetty", "Ananya Raghunathan", "Dhruv Mehta", "Ritu Bansal"];

export const adminOrders: AdminOrderRow[] = mockOrders.map((o, i) => ({
  id: o.id,
  customer: customerNames[i % customerNames.length]!,
  email: `${(customerNames[i % customerNames.length] ?? "guest").split(" ")[0]!.toLowerCase()}@example.in`,
  date: o.placedAt,
  total: o.total,
  status: o.status,
  companies: orderCompanies(o),
}));

export const orderStatuses: Order["status"][] = ["Placed", "Confirmed", "Shipped", "Delivered"];

/* ---------------------------------------------- coupons */

export type AdminCoupon = {
  code: string;
  type: "percent" | "flat";
  value: number;
  minOrder: number;
  from: string;
  to: string;
  usageLimit: number;
  used: number;
  status: "Active" | "Scheduled" | "Expired";
};

export const adminCoupons: AdminCoupon[] = [
  { code: "FABFEST", type: "percent", value: 10, minOrder: 25000, from: "2026-08-01", to: "2026-10-31", usageLimit: 2000, used: 412, status: "Active" },
  { code: "FIRSTHOME", type: "percent", value: 5, minOrder: 0, from: "2026-01-01", to: "2026-12-31", usageLimit: 5000, used: 1890, status: "Active" },
  { code: "INTERIORS15", type: "percent", value: 15, minOrder: 60000, from: "2026-09-01", to: "2026-11-30", usageLimit: 500, used: 0, status: "Scheduled" },
  { code: "FLAT2500", type: "flat", value: 2500, minOrder: 40000, from: "2026-04-01", to: "2026-06-30", usageLimit: 1000, used: 998, status: "Expired" },
  { code: "KITCHEN12", type: "percent", value: 12, minOrder: 30000, from: "2026-08-15", to: "2026-09-30", usageLimit: 800, used: 214, status: "Active" },
  { code: "FLAT7500", type: "flat", value: 7500, minOrder: 120000, from: "2026-08-01", to: "2026-12-31", usageLimit: 300, used: 47, status: "Active" },
  { code: "DIWALI26", type: "percent", value: 20, minOrder: 75000, from: "2026-10-15", to: "2026-11-05", usageLimit: 2500, used: 0, status: "Scheduled" },
  { code: "TRADE1000", type: "flat", value: 1000, minOrder: 15000, from: "2026-02-01", to: "2026-05-31", usageLimit: 1500, used: 640, status: "Expired" },
];


/* ---------------------------------------------- reviews queue */

export type AdminReview = {
  id: string;
  productId: string;
  productName: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  submittedAt: string;
  status: "Pending" | "Approved" | "Hidden";
  reply?: string;
};

export const adminReviews: AdminReview[] = [
  { id: "rvw-901", productId: products[0]!.id, productName: products[0]!.name, author: "Kavya Nair", rating: 5, title: "Silent and beautifully built", body: "Installed within the promised window and the engineer explained every setting before leaving.", submittedAt: "2026-08-24", status: "Pending" },
  { id: "rvw-902", productId: products[3]!.id, productName: products[3]!.name, author: "Imran Qureshi", rating: 2, title: "Delivery slot moved twice", body: "Product is good but the slot changed twice before it arrived.", submittedAt: "2026-08-22", status: "Pending" },
  { id: "rvw-903", productId: products[5]!.id, productName: products[5]!.name, author: "Meera Joshi", rating: 4, title: "Worth the money", body: "Quiet, efficient and looks far more expensive than it was.", submittedAt: "2026-08-19", status: "Approved", reply: "Thank you Meera — glad the installation went smoothly." },
  { id: "rvw-904", productId: products[7]!.id, productName: products[7]!.name, author: "anon_9921", rating: 1, title: "read this before buying!!!", body: "Contact me on my number for a better price elsewhere.", submittedAt: "2026-08-18", status: "Hidden" },
  { id: "rvw-905", productId: products[2]!.id, productName: products[2]!.name, author: "Rohan Patel", rating: 5, title: "Exceptional finish", body: "The panel calibration out of the box was better than my old set after a professional visit.", submittedAt: "2026-08-15", status: "Approved" },
  // 25 further submissions so the moderation queue reflects a real volume of reviews.
  ...Array.from({ length: 25 }, (_, i) => {
    const product = products[(i * 3 + 9) % products.length]!;
    const rating = [5, 4, 5, 3, 4, 2, 5][i % 7]!;
    const status = (["Pending", "Approved", "Approved", "Hidden", "Pending"] as const)[i % 5]!;
    return {
      id: `rvw-${906 + i}`,
      productId: product.id,
      productName: product.name,
      author: [
        "Ananya Raghunathan", "Dhruv Mehta", "Priya Sundaram", "Kabir Anand", "Meera Joshi",
        "Rohan Iyer", "Sanya Kapoor", "Vikram Desai", "Farhan Shaikh", "Lakshmi Menon",
      ][i % 10]!,
      rating,
      title: [
        "Exactly as described", "Worth the premium", "Installation was flawless",
        "Quiet and efficient", "Good, with small caveats",
      ][i % 5]!,
      body: [
        "Delivered inside the promised window and installed the same afternoon.",
        "Build quality is a clear step above what we replaced.",
        "Packaging was immaculate and the team removed all of it.",
        "Performance has been consistent through a long summer.",
        "Finish looks expensive against our cabinetry.",
      ][i % 5]!,
      submittedAt: `2026-08-${String((i % 27) + 1).padStart(2, "0")}`,
      status,
      ...(status === "Approved" && i % 3 === 0
        ? { reply: "Thank you for the detailed feedback — we've shared it with the service team." }
        : {}),
    } satisfies AdminReview;
  }),
];


/* ---------------------------------------------- consultation requests */

export type ConsultationRequest = {
  id: string;
  name: string;
  contact: string;
  mode: "In person" | "Video call" | "Phone call";
  date: string;
  slot: string;
  styleInterest: string;
  status: "New" | "Confirmed" | "Completed" | "Cancelled";
};

export const consultationRequests: ConsultationRequest[] = [
  { id: "FBI-CON-4417", name: "Nandita Rao", contact: "+91 98860 41120", mode: "In person", date: "2026-09-02", slot: "11:00 – 12:00", styleInterest: "Contemporary Luxe", status: "New" },
  { id: "FBI-CON-4412", name: "Aditya Kulkarni", contact: "aditya.k@example.in", mode: "Video call", date: "2026-09-01", slot: "16:00 – 17:00", styleInterest: "Modern Minimal", status: "Confirmed" },
  { id: "FBI-CON-4408", name: "Sneha Iyer", contact: "+91 99000 77341", mode: "Phone call", date: "2026-08-28", slot: "10:00 – 11:00", styleInterest: "Classic Indian", status: "Confirmed" },
  { id: "FBI-CON-4391", name: "Vikram Desai", contact: "vikram@example.in", mode: "In person", date: "2026-08-20", slot: "15:00 – 16:00", styleInterest: "Scandinavian", status: "Completed" },
  { id: "FBI-CON-4386", name: "Priya Menon", contact: "+91 90350 11208", mode: "Video call", date: "2026-08-18", slot: "12:00 – 13:00", styleInterest: "Coastal", status: "Cancelled" },
];

/* ---------------------------------------------- B2B enquiries */

export type B2BEnquiry = {
  id: string;
  company: string;
  contact: string;
  gstin?: string;
  product: string;
  quantity: string;
  receivedAt: string;
  status: "New" | "Quoted" | "Won" | "Closed";
};

export const b2bEnquiries: B2BEnquiry[] = [
  { id: "FBX-B2B-8841", company: "Sterling Projects Pvt Ltd", contact: "procurement@sterling.in", gstin: "27AABCS4321L1ZQ", product: "Brushed brass lever handle", quantity: "1,200 sets", receivedAt: "2026-08-27", status: "New" },
  { id: "FBX-B2B-8836", company: "Yellow Door Hospitality", contact: "+91 98200 33410", product: "Concealed cistern frame", quantity: "340 units", receivedAt: "2026-08-25", status: "Quoted" },
  { id: "FBX-B2B-8829", company: "Nirvana Realty", contact: "fitout@nirvanarealty.in", gstin: "29AAECN7712P1ZK", product: "Soft-close drawer runner", quantity: "5,000 pairs", receivedAt: "2026-08-21", status: "Won" },
  { id: "FBX-B2B-8814", company: "Coastline Interiors LLP", contact: "hello@coastline.co.in", product: "Recessed downlight 12W", quantity: "800 units", receivedAt: "2026-08-14", status: "Closed" },
];

/* ---------------------------------------------- content */

export type AdminBanner = {
  id: string;
  title: string;
  placement: "Home hero" | "Promo band" | "Announcement";
  link: string;
  status: "Live" | "Scheduled" | "Draft";
  updatedAt: string;
};

export const adminBanners: AdminBanner[] = [
  { id: "bnr-hero-1", title: "The Festive Edit — refrigeration", placement: "Home hero", link: "/shop", status: "Live", updatedAt: "2026-08-20" },
  { id: "bnr-hero-2", title: "Lumen OLED Evo series", placement: "Home hero", link: "/shop", status: "Live", updatedAt: "2026-08-12" },
  { id: "bnr-band-1", title: "Interior Design promo band", placement: "Promo band", link: "/interior-design", status: "Live", updatedAt: "2026-07-30" },
  { id: "bnr-band-2", title: "B2B Store promo band", placement: "Promo band", link: "/b2b", status: "Live", updatedAt: "2026-07-30" },
  { id: "bnr-ann-1", title: "Free installation on large appliances", placement: "Announcement", link: "/offers", status: "Scheduled", updatedAt: "2026-08-26" },
];

export const adminStaticPages = [
  { slug: "shipping", title: "Shipping policy", updatedAt: "2026-08-02" },
  { slug: "returns", title: "Returns and warranty", updatedAt: "2026-08-02" },
  { slug: "privacy", title: "Privacy policy", updatedAt: "2026-06-18" },
  { slug: "terms", title: "Terms of use", updatedAt: "2026-06-18" },
  { slug: "faq", title: "FAQ", updatedAt: "2026-08-11" },
  { slug: "about", title: "About Fabluxe", updatedAt: "2026-05-04" },
];

export const sectionTemplates = [
  "Product rail",
  "Editorial banner",
  "Category grid",
  "Review carousel",
  "Newsletter capture",
];

/* ---------------------------------------------- users */

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  company: string;
  status: "Active" | "Invited" | "Suspended";
  lastActive: string;
};

export const adminUsers: AdminUser[] = [
  { id: "usr-01", name: "Rohit Fabri", email: "rohit@fabluxe.in", role: "Director", company: "Fabluxe Group", status: "Active", lastActive: "Today" },
  { id: "usr-02", name: "Sana Kapoor", email: "sana@fabluxe.in", role: "Manager", company: companies.electronics.name, status: "Active", lastActive: "Today" },
  { id: "usr-03", name: "Jitesh Pillai", email: "jitesh@fabluxora.in", role: "Manager", company: companies.interiors.name, status: "Active", lastActive: "Yesterday" },
  { id: "usr-04", name: "Neha Sharma", email: "neha@fabluxe.in", role: "Editor", company: "Fabluxe Group", status: "Active", lastActive: "2 days ago" },
  { id: "usr-05", name: "Arjun Bhat", email: "arjun@fabluxe.in", role: "Viewer", company: companies.electronics.name, status: "Invited", lastActive: "—" },
  { id: "usr-06", name: "Farah Siddiqui", email: "farah@fabluxe.in", role: "Director", company: "Fabluxe Group", status: "Active", lastActive: "Today" },
  { id: "usr-07", name: "Kiran Malhotra", email: "kiran@fabluxora.in", role: "Editor", company: companies.interiors.name, status: "Active", lastActive: "3 days ago" },
  { id: "usr-08", name: "Deepak Rane", email: "deepak@fabluxe.in", role: "Manager", company: companies.electronics.name, status: "Suspended", lastActive: "12 days ago" },
  { id: "usr-09", name: "Tanvi Gokhale", email: "tanvi@fabluxora.in", role: "Editor", company: companies.interiors.name, status: "Active", lastActive: "Yesterday" },
  { id: "usr-10", name: "Harish Nambiar", email: "harish@fabluxe.in", role: "Viewer", company: "Fabluxe Group", status: "Active", lastActive: "5 days ago" },
];


export const formatINR = (value: number) =>
  `₹${new Intl.NumberFormat("en-IN").format(Math.round(value))}`;
