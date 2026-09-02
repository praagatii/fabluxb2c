/**
 * Category system is fully data-driven. Adding a category here makes it appear
 * in the mega-menu, the home tiles and (later) the shop listing — no code edits.
 */
export type Category = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  productCount: number;
  status: "live" | "coming-soon";
  /** Company that fulfils orders in this category */
  fulfilledBy: "Fabluxe Home Solutions" | "Fabluxora Interiors";
  subcategories: { name: string; slug: string }[];
};

export const categories: Category[] = [
  {
    id: "cat-refrigerators",
    name: "Refrigerators",
    slug: "refrigerators",
    tagline: "Frost-free, side-by-side and French door",
    productCount: 148,
    status: "live",
    fulfilledBy: "Fabluxe Home Solutions",
    subcategories: [
      { name: "Single Door", slug: "single-door" },
      { name: "Double Door", slug: "double-door" },
      { name: "Side by Side", slug: "side-by-side" },
      { name: "French Door", slug: "french-door" },
    ],
  },
  {
    id: "cat-washing-machines",
    name: "Washing Machines",
    slug: "washing-machines",
    tagline: "Front load, top load and washer dryers",
    productCount: 96,
    status: "live",
    fulfilledBy: "Fabluxe Home Solutions",
    subcategories: [
      { name: "Front Load", slug: "front-load" },
      { name: "Top Load", slug: "top-load" },
      { name: "Semi Automatic", slug: "semi-automatic" },
      { name: "Washer Dryer", slug: "washer-dryer" },
    ],
  },
  {
    id: "cat-air-conditioners",
    name: "Air Conditioners",
    slug: "air-conditioners",
    tagline: "Inverter split, window and cassette units",
    productCount: 112,
    status: "live",
    fulfilledBy: "Fabluxe Home Solutions",
    subcategories: [
      { name: "Split AC", slug: "split-ac" },
      { name: "Window AC", slug: "window-ac" },
      { name: "Cassette AC", slug: "cassette-ac" },
      { name: "Air Purifiers", slug: "air-purifiers" },
    ],
  },
  {
    id: "cat-televisions",
    name: "Televisions",
    slug: "televisions",
    tagline: "OLED, QLED and 4K smart panels",
    productCount: 87,
    status: "live",
    fulfilledBy: "Fabluxe Home Solutions",
    subcategories: [
      { name: "OLED", slug: "oled" },
      { name: "QLED", slug: "qled" },
      { name: "4K Smart TV", slug: "4k-smart-tv" },
      { name: "Soundbars", slug: "soundbars" },
    ],
  },
  {
    id: "cat-kitchen-appliances",
    name: "Kitchen Appliances",
    slug: "kitchen-appliances",
    tagline: "Chimneys, hobs, dishwashers and ovens",
    productCount: 134,
    status: "live",
    fulfilledBy: "Fabluxe Home Solutions",
    subcategories: [
      { name: "Chimneys", slug: "chimneys" },
      { name: "Hobs & Cooktops", slug: "hobs-cooktops" },
      { name: "Dishwashers", slug: "dishwashers" },
      { name: "Built-in Ovens", slug: "built-in-ovens" },
    ],
  },
  {
    id: "cat-small-appliances",
    name: "Small Appliances",
    slug: "small-appliances",
    tagline: "Everyday essentials, considered",
    productCount: 210,
    status: "live",
    fulfilledBy: "Fabluxe Home Solutions",
    subcategories: [
      { name: "Mixer Grinders", slug: "mixer-grinders" },
      { name: "Air Fryers", slug: "air-fryers" },
      { name: "Coffee Makers", slug: "coffee-makers" },
      { name: "Vacuum Cleaners", slug: "vacuum-cleaners" },
    ],
  },
  {
    id: "cat-furniture",
    name: "Furniture & Lighting",
    slug: "furniture",
    tagline: "Seating, storage and light, fulfilled by Fabluxora Interiors",
    productCount: 3,
    status: "live",
    fulfilledBy: "Fabluxora Interiors",
    subcategories: [
      { name: "Sofas & Seating", slug: "sofas-seating" },
      { name: "Beds & Storage", slug: "beds-storage" },
      { name: "Lighting", slug: "lighting" },
    ],
  },
];

export const liveCategories = categories.filter((c) => c.status === "live");
