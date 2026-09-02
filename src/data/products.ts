import { categories } from "@/data/categories";

export type ImageKey = "fridge" | "tv" | "laundry";

export type SpecGroup = { group: string; rows: { label: string; value: string }[] };

export type Product = {
  id: string;
  name: string;
  brand: string;
  categorySlug: string;
  subcategorySlug: string;
  price: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  badge?: "Best Seller" | "New" | "Limited Offer" | "Editor's Pick";
  specs: string[];
  image: ImageKey;
  /** Gallery — first entry is the primary image, second is used for hover swap */
  images: ImageKey[];
  /** Fulfilment company — drives invoice split at checkout */
  fulfilledBy: "Fabluxe Home Solutions" | "Fabluxora Interiors";
  tags: ("featured" | "best-seller" | "new-arrival")[];
  availability: "In stock" | "Low stock" | "Pre-order";
  /** Facet attributes — the listing filters are generated from these keys */
  attributes: Record<string, string>;
  variants: {
    colour: string[];
    size: { label: string; priceDelta: number }[];
  };
  description: string;
  specTable: SpecGroup[];
  /** ISO date, used by the "newest" sort */
  addedOn: string;
};

type Seed = {
  id: string;
  name: string;
  brand: string;
  categorySlug: string;
  subcategorySlug: string;
  price: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  badge?: Product["badge"];
  specs: string[];
  image: ImageKey;
  tags: Product["tags"];
  availability: Product["availability"];
  attributes: Record<string, string>;
  sizes: { label: string; priceDelta: number }[];
  colours: string[];
  addedOn: string;
};

const hoverFor: Record<ImageKey, ImageKey> = { fridge: "tv", tv: "laundry", laundry: "fridge" };

const seeds: Seed[] = [
  {
    id: "prd-1001",
    name: "Aureus 653L French Door Refrigerator",
    brand: "Voltek",
    categorySlug: "refrigerators",
    subcategorySlug: "french-door",
    price: 128900,
    mrp: 154900,
    rating: 4.7,
    reviewCount: 312,
    badge: "Editor's Pick",
    specs: ["653 L capacity", "Inverter compressor", "5-in-1 convertible", "Frost free"],
    image: "fridge",
    tags: ["featured", "best-seller"],
    availability: "In stock",
    attributes: { Capacity: "653 L", "Energy rating": "4 Star", Colour: "Graphite" },
    sizes: [
      { label: "563 L", priceDelta: -14000 },
      { label: "653 L", priceDelta: 0 },
      { label: "719 L", priceDelta: 21000 },
    ],
    colours: ["Graphite", "Brushed Steel", "Matte Black"],
    addedOn: "2026-05-14",
  },
  {
    id: "prd-1002",
    name: 'Lumen 65" OLED Evo Smart Television',
    brand: "Nord Vision",
    categorySlug: "televisions",
    subcategorySlug: "oled",
    price: 214500,
    mrp: 249900,
    rating: 4.8,
    reviewCount: 187,
    badge: "New",
    specs: ["65-inch 4K OLED", "120 Hz refresh", "Dolby Vision IQ", "Filmmaker mode"],
    image: "tv",
    tags: ["featured", "new-arrival"],
    availability: "In stock",
    attributes: { "Screen size": "65 inch", Panel: "OLED", Colour: "Charcoal" },
    sizes: [
      { label: "55 inch", priceDelta: -52000 },
      { label: "65 inch", priceDelta: 0 },
      { label: "77 inch", priceDelta: 96000 },
    ],
    colours: ["Charcoal", "Titanium"],
    addedOn: "2026-07-02",
  },
  {
    id: "prd-1003",
    name: "Calma 9 kg Front Load Washing Machine",
    brand: "Elba",
    categorySlug: "washing-machines",
    subcategorySlug: "front-load",
    price: 62400,
    mrp: 74900,
    rating: 4.6,
    reviewCount: 421,
    badge: "Best Seller",
    specs: ["9 kg drum", "1400 rpm spin", "Steam refresh", "Inverter direct drive"],
    image: "laundry",
    tags: ["featured", "best-seller"],
    availability: "In stock",
    attributes: { Capacity: "9 kg", "Energy rating": "5 Star", Colour: "Brushed Steel" },
    sizes: [
      { label: "7 kg", priceDelta: -9000 },
      { label: "9 kg", priceDelta: 0 },
      { label: "11 kg", priceDelta: 14500 },
    ],
    colours: ["Brushed Steel", "Ivory"],
    addedOn: "2026-03-21",
  },
  {
    id: "prd-1004",
    name: "Sereno 1.5 Ton 5-Star Inverter Split AC",
    brand: "Voltek",
    categorySlug: "air-conditioners",
    subcategorySlug: "split-ac",
    price: 48990,
    mrp: 58990,
    rating: 4.5,
    reviewCount: 658,
    badge: "Limited Offer",
    specs: ["1.5 ton capacity", "ISEER 5.2", "Copper condenser", "Quiet 32 dB mode"],
    image: "laundry",
    tags: ["featured", "best-seller"],
    availability: "Low stock",
    attributes: { Capacity: "1.5 Ton", "Energy rating": "5 Star", Colour: "Ivory" },
    sizes: [
      { label: "1.0 Ton", priceDelta: -8000 },
      { label: "1.5 Ton", priceDelta: 0 },
      { label: "2.0 Ton", priceDelta: 11000 },
    ],
    colours: ["Ivory", "Graphite"],
    addedOn: "2026-04-08",
  },
  {
    id: "prd-1005",
    name: "Fumo 90 cm Auto-Clean Filterless Chimney",
    brand: "Terra Studio",
    categorySlug: "kitchen-appliances",
    subcategorySlug: "chimneys",
    price: 32500,
    mrp: 41000,
    rating: 4.4,
    reviewCount: 233,
    specs: ["1500 m³/hr suction", "Motion sensor control", "Auto heat clean", "Silent blower"],
    image: "fridge",
    tags: ["featured", "new-arrival"],
    availability: "In stock",
    attributes: { Width: "90 cm", Suction: "1500 m³/hr", Colour: "Matte Black" },
    sizes: [
      { label: "60 cm", priceDelta: -6000 },
      { label: "90 cm", priceDelta: 0 },
    ],
    colours: ["Matte Black", "Brushed Steel"],
    addedOn: "2026-06-19",
  },
  {
    id: "prd-1006",
    name: "Brio Precision Espresso Machine",
    brand: "Elba",
    categorySlug: "small-appliances",
    subcategorySlug: "coffee-makers",
    price: 41750,
    mrp: 49500,
    rating: 4.9,
    reviewCount: 96,
    badge: "New",
    specs: ["15 bar pump", "PID temperature control", "Steel portafilter", "Integrated grinder"],
    image: "fridge",
    tags: ["new-arrival", "featured"],
    availability: "In stock",
    attributes: { Type: "Espresso", Power: "1450 W", Colour: "Brushed Steel" },
    sizes: [{ label: "Standard", priceDelta: 0 }],
    colours: ["Brushed Steel", "Matte Black"],
    addedOn: "2026-07-25",
  },
  {
    id: "prd-1007",
    name: "Quilo 14-Place Built-in Dishwasher",
    brand: "Nord Vision",
    categorySlug: "kitchen-appliances",
    subcategorySlug: "dishwashers",
    price: 71900,
    mrp: 84900,
    rating: 4.3,
    reviewCount: 145,
    specs: ["14 place settings", "Half-load wash", "42 dB operation", "Indian cooking cycle"],
    image: "laundry",
    tags: ["best-seller"],
    availability: "In stock",
    attributes: { Capacity: "14 Place", "Energy rating": "4 Star", Colour: "Graphite" },
    sizes: [
      { label: "12 Place", priceDelta: -8000 },
      { label: "14 Place", priceDelta: 0 },
    ],
    colours: ["Graphite", "Brushed Steel"],
    addedOn: "2026-02-11",
  },
  {
    id: "prd-1008",
    name: 'Aria 55" QLED Ambient Television',
    brand: "Nord Vision",
    categorySlug: "televisions",
    subcategorySlug: "qled",
    price: 96500,
    mrp: 112000,
    rating: 4.5,
    reviewCount: 274,
    badge: "Best Seller",
    specs: ["55-inch QLED", "Ambient art mode", "Anti-glare panel", "40 W audio"],
    image: "tv",
    tags: ["best-seller"],
    availability: "In stock",
    attributes: { "Screen size": "55 inch", Panel: "QLED", Colour: "Charcoal" },
    sizes: [
      { label: "43 inch", priceDelta: -28000 },
      { label: "55 inch", priceDelta: 0 },
      { label: "65 inch", priceDelta: 34000 },
    ],
    colours: ["Charcoal", "Ivory"],
    addedOn: "2026-01-30",
  },
  {
    id: "prd-1009",
    name: "Nima 8 kg Heat Pump Dryer",
    brand: "Elba",
    categorySlug: "washing-machines",
    subcategorySlug: "washer-dryer",
    price: 88400,
    mrp: 99900,
    rating: 4.6,
    reviewCount: 61,
    badge: "New",
    specs: ["8 kg load", "Heat pump technology", "A+++ efficiency", "Wool care cycle"],
    image: "laundry",
    tags: ["new-arrival"],
    availability: "Pre-order",
    attributes: { Capacity: "8 kg", "Energy rating": "5 Star", Colour: "Ivory" },
    sizes: [
      { label: "8 kg", priceDelta: 0 },
      { label: "10 kg", priceDelta: 12000 },
    ],
    colours: ["Ivory", "Graphite"],
    addedOn: "2026-08-04",
  },
  {
    id: "prd-1010",
    name: "Vero 300L Convertible Double Door Refrigerator",
    brand: "Terra Studio",
    categorySlug: "refrigerators",
    subcategorySlug: "double-door",
    price: 43900,
    mrp: 52900,
    rating: 4.2,
    reviewCount: 508,
    specs: ["300 L capacity", "Convertible freezer", "Stabiliser free", "Toughened shelves"],
    image: "fridge",
    tags: ["best-seller", "new-arrival"],
    availability: "In stock",
    attributes: { Capacity: "300 L", "Energy rating": "3 Star", Colour: "Brushed Steel" },
    sizes: [
      { label: "253 L", priceDelta: -7000 },
      { label: "300 L", priceDelta: 0 },
    ],
    colours: ["Brushed Steel", "Matte Black"],
    addedOn: "2026-05-02",
  },
  {
    id: "prd-1011",
    name: "Nordo 190L Single Door Refrigerator",
    brand: "Elba",
    categorySlug: "refrigerators",
    subcategorySlug: "single-door",
    price: 21400,
    mrp: 27900,
    rating: 4.0,
    reviewCount: 733,
    specs: ["190 L capacity", "Direct cool", "Base drawer", "Stabiliser free"],
    image: "fridge",
    tags: [],
    availability: "In stock",
    attributes: { Capacity: "190 L", "Energy rating": "4 Star", Colour: "Ivory" },
    sizes: [
      { label: "165 L", priceDelta: -3200 },
      { label: "190 L", priceDelta: 0 },
    ],
    colours: ["Ivory", "Graphite"],
    addedOn: "2025-12-12",
  },
  {
    id: "prd-1012",
    name: "Halden 601L Side by Side Refrigerator",
    brand: "Nord Vision",
    categorySlug: "refrigerators",
    subcategorySlug: "side-by-side",
    price: 96900,
    mrp: 118000,
    rating: 4.6,
    reviewCount: 219,
    badge: "Best Seller",
    specs: ["601 L capacity", "Water dispenser", "Twin cooling", "Door alarm"],
    image: "fridge",
    tags: ["best-seller"],
    availability: "Low stock",
    attributes: { Capacity: "601 L", "Energy rating": "3 Star", Colour: "Matte Black" },
    sizes: [
      { label: "601 L", priceDelta: 0 },
      { label: "676 L", priceDelta: 18000 },
    ],
    colours: ["Matte Black", "Brushed Steel"],
    addedOn: "2026-04-27",
  },
  {
    id: "prd-1013",
    name: "Corda 7 kg Top Load Washing Machine",
    brand: "Voltek",
    categorySlug: "washing-machines",
    subcategorySlug: "top-load",
    price: 28900,
    mrp: 34900,
    rating: 4.1,
    reviewCount: 612,
    specs: ["7 kg drum", "Pulsator wash", "Auto restart", "Rat mesh base"],
    image: "laundry",
    tags: [],
    availability: "In stock",
    attributes: { Capacity: "7 kg", "Energy rating": "4 Star", Colour: "Graphite" },
    sizes: [
      { label: "6.5 kg", priceDelta: -2500 },
      { label: "7 kg", priceDelta: 0 },
      { label: "8 kg", priceDelta: 4200 },
    ],
    colours: ["Graphite", "Ivory"],
    addedOn: "2026-01-09",
  },
  {
    id: "prd-1014",
    name: "Basa 8 kg Semi Automatic Washer",
    brand: "Terra Studio",
    categorySlug: "washing-machines",
    subcategorySlug: "semi-automatic",
    price: 15900,
    mrp: 19900,
    rating: 3.9,
    reviewCount: 388,
    specs: ["8 kg wash tub", "Twin tub", "Lint filter", "Rust-free body"],
    image: "laundry",
    tags: [],
    availability: "In stock",
    attributes: { Capacity: "8 kg", "Energy rating": "3 Star", Colour: "Ivory" },
    sizes: [
      { label: "7 kg", priceDelta: -1800 },
      { label: "8 kg", priceDelta: 0 },
    ],
    colours: ["Ivory"],
    addedOn: "2025-11-22",
  },
  {
    id: "prd-1015",
    name: "Sereno 1.0 Ton Window Air Conditioner",
    brand: "Voltek",
    categorySlug: "air-conditioners",
    subcategorySlug: "window-ac",
    price: 31900,
    mrp: 39900,
    rating: 4.0,
    reviewCount: 271,
    specs: ["1 ton capacity", "ISEER 3.8", "Anti-dust filter", "Auto restart"],
    image: "laundry",
    tags: [],
    availability: "In stock",
    attributes: { Capacity: "1.0 Ton", "Energy rating": "3 Star", Colour: "Ivory" },
    sizes: [
      { label: "1.0 Ton", priceDelta: 0 },
      { label: "1.5 Ton", priceDelta: 6500 },
    ],
    colours: ["Ivory"],
    addedOn: "2026-02-26",
  },
  {
    id: "prd-1016",
    name: "Aurel Cassette AC 3.0 Ton",
    brand: "Aurel & Co.",
    categorySlug: "air-conditioners",
    subcategorySlug: "cassette-ac",
    price: 118900,
    mrp: 139000,
    rating: 4.4,
    reviewCount: 44,
    specs: ["3 ton capacity", "Four-way flow", "R32 refrigerant", "Wired controller"],
    image: "laundry",
    tags: ["new-arrival"],
    availability: "Pre-order",
    attributes: { Capacity: "3.0 Ton", "Energy rating": "4 Star", Colour: "Ivory" },
    sizes: [
      { label: "2.0 Ton", priceDelta: -26000 },
      { label: "3.0 Ton", priceDelta: 0 },
    ],
    colours: ["Ivory"],
    addedOn: "2026-07-16",
  },
  {
    id: "prd-1017",
    name: "Pura Tower Air Purifier",
    brand: "Marchetti",
    categorySlug: "air-conditioners",
    subcategorySlug: "air-purifiers",
    price: 27400,
    mrp: 32900,
    rating: 4.5,
    reviewCount: 158,
    specs: ["HEPA H13 filter", "480 m³/hr CADR", "Air quality display", "Night mode"],
    image: "laundry",
    tags: ["new-arrival"],
    availability: "In stock",
    attributes: { Coverage: "600 sq ft", Filter: "HEPA H13", Colour: "Matte Black" },
    sizes: [{ label: "Standard", priceDelta: 0 }],
    colours: ["Matte Black", "Ivory"],
    addedOn: "2026-06-30",
  },
  {
    id: "prd-1018",
    name: 'Lumen 43" 4K Smart Television',
    brand: "Nord Vision",
    categorySlug: "televisions",
    subcategorySlug: "4k-smart-tv",
    price: 42900,
    mrp: 52900,
    rating: 4.2,
    reviewCount: 496,
    specs: ["43-inch 4K LED", "60 Hz refresh", "HDR10+", "20 W audio"],
    image: "tv",
    tags: ["best-seller"],
    availability: "In stock",
    attributes: { "Screen size": "43 inch", Panel: "LED", Colour: "Charcoal" },
    sizes: [
      { label: "43 inch", priceDelta: 0 },
      { label: "50 inch", priceDelta: 9800 },
    ],
    colours: ["Charcoal"],
    addedOn: "2026-03-05",
  },
  {
    id: "prd-1019",
    name: "Onda 5.1 Dolby Atmos Soundbar",
    brand: "Marchetti",
    categorySlug: "televisions",
    subcategorySlug: "soundbars",
    price: 38900,
    mrp: 46900,
    rating: 4.6,
    reviewCount: 132,
    badge: "Editor's Pick",
    specs: ["5.1 channels", "Wireless subwoofer", "Dolby Atmos", "HDMI eARC"],
    image: "tv",
    tags: ["featured"],
    availability: "In stock",
    attributes: { Channels: "5.1", Power: "520 W", Colour: "Charcoal" },
    sizes: [
      { label: "3.1", priceDelta: -11000 },
      { label: "5.1", priceDelta: 0 },
    ],
    colours: ["Charcoal", "Ivory"],
    addedOn: "2026-05-28",
  },
  {
    id: "prd-1020",
    name: "Terra 4-Burner Brass Gas Hob",
    brand: "Terra Studio",
    categorySlug: "kitchen-appliances",
    subcategorySlug: "hobs-cooktops",
    price: 26400,
    mrp: 31900,
    rating: 4.3,
    reviewCount: 204,
    specs: ["4 brass burners", "Toughened glass", "Auto ignition", "Cast iron trivets"],
    image: "fridge",
    tags: [],
    availability: "In stock",
    attributes: { Burners: "4", Width: "60 cm", Colour: "Matte Black" },
    sizes: [
      { label: "3 burner", priceDelta: -4600 },
      { label: "4 burner", priceDelta: 0 },
      { label: "5 burner", priceDelta: 7400 },
    ],
    colours: ["Matte Black"],
    addedOn: "2026-04-15",
  },
  {
    id: "prd-1021",
    name: "Forno 70L Built-in Convection Oven",
    brand: "Elba",
    categorySlug: "kitchen-appliances",
    subcategorySlug: "built-in-ovens",
    price: 58900,
    mrp: 69900,
    rating: 4.4,
    reviewCount: 88,
    specs: ["70 L cavity", "10 cooking modes", "Rotisserie", "Triple glazed door"],
    image: "fridge",
    tags: ["new-arrival"],
    availability: "Low stock",
    attributes: { Capacity: "70 L", "Energy rating": "4 Star", Colour: "Graphite" },
    sizes: [
      { label: "60 L", priceDelta: -7500 },
      { label: "70 L", priceDelta: 0 },
    ],
    colours: ["Graphite", "Brushed Steel"],
    addedOn: "2026-07-09",
  },
  {
    id: "prd-1022",
    name: "Mistral 1000 W Mixer Grinder",
    brand: "Voltek",
    categorySlug: "small-appliances",
    subcategorySlug: "mixer-grinders",
    price: 8900,
    mrp: 11900,
    rating: 4.1,
    reviewCount: 921,
    badge: "Best Seller",
    specs: ["1000 W motor", "4 stainless jars", "Overload protection", "Three speeds"],
    image: "fridge",
    tags: ["best-seller"],
    availability: "In stock",
    attributes: { Power: "1000 W", Jars: "4", Colour: "Brushed Steel" },
    sizes: [
      { label: "750 W", priceDelta: -1600 },
      { label: "1000 W", priceDelta: 0 },
    ],
    colours: ["Brushed Steel", "Ivory"],
    addedOn: "2026-02-02",
  },
  {
    id: "prd-1023",
    name: "Aria 7L Dual Basket Air Fryer",
    brand: "Marchetti",
    categorySlug: "small-appliances",
    subcategorySlug: "air-fryers",
    price: 14900,
    mrp: 18900,
    rating: 4.5,
    reviewCount: 465,
    specs: ["7 L dual basket", "Sync finish", "Digital presets", "Dishwasher-safe trays"],
    image: "fridge",
    tags: ["best-seller", "new-arrival"],
    availability: "In stock",
    attributes: { Capacity: "7 L", Power: "1800 W", Colour: "Matte Black" },
    sizes: [
      { label: "5 L", priceDelta: -2600 },
      { label: "7 L", priceDelta: 0 },
    ],
    colours: ["Matte Black", "Ivory"],
    addedOn: "2026-06-11",
  },
  {
    id: "prd-1024",
    name: "Silo Cordless Stick Vacuum",
    brand: "Aurel & Co.",
    categorySlug: "small-appliances",
    subcategorySlug: "vacuum-cleaners",
    price: 33900,
    mrp: 41900,
    rating: 4.4,
    reviewCount: 176,
    specs: ["150 AW suction", "60 min runtime", "HEPA filtration", "Wall dock"],
    image: "fridge",
    tags: ["new-arrival"],
    availability: "In stock",
    attributes: { Runtime: "60 min", Type: "Cordless", Colour: "Graphite" },
    sizes: [{ label: "Standard", priceDelta: 0 }],
    colours: ["Graphite", "Brushed Steel"],
    addedOn: "2026-08-12",
  },
  {
    id: "prd-1025",
    name: "Solene 3-Seater Boucle Sofa",
    brand: "Terra Studio",
    categorySlug: "furniture",
    subcategorySlug: "sofas-seating",
    price: 189000,
    mrp: 219000,
    rating: 4.8,
    reviewCount: 64,
    badge: "Editor's Pick",
    specs: ["Kiln-dried teak frame", "Boucle upholstery", "Feather-wrapped foam", "3-seater"],
    image: "fridge",
    tags: ["featured"],
    availability: "In stock",
    attributes: { Seats: "3", Upholstery: "Boucle", Colour: "Oat" },
    sizes: [
      { label: "2-seater", priceDelta: -46000 },
      { label: "3-seater", priceDelta: 0 },
    ],
    colours: ["Oat", "Slate", "Clay"],
    addedOn: "2026-06-21",
  },
  {
    id: "prd-1026",
    name: "Marchetti Linen Upholstered King Bed",
    brand: "Marchetti",
    categorySlug: "furniture",
    subcategorySlug: "beds-storage",
    price: 154000,
    mrp: 178000,
    rating: 4.6,
    reviewCount: 41,
    specs: ["King size", "Belgian linen headboard", "Hydraulic storage", "Solid ash legs"],
    image: "laundry",
    tags: ["new-arrival"],
    availability: "Low stock",
    attributes: { Size: "King", Material: "Linen", Colour: "Fog" },
    sizes: [
      { label: "Queen", priceDelta: -22000 },
      { label: "King", priceDelta: 0 },
    ],
    colours: ["Fog", "Ink", "Sand"],
    addedOn: "2026-07-18",
  },
  {
    id: "prd-1027",
    name: "Aurel Brass Pendant Cluster",
    brand: "Aurel & Co.",
    categorySlug: "furniture",
    subcategorySlug: "lighting",
    price: 72500,
    mrp: 88000,
    rating: 4.7,
    reviewCount: 58,
    badge: "New",
    specs: ["Five-light cluster", "Hand-spun brass", "Dimmable LED", "Made in India"],
    image: "tv",
    tags: ["new-arrival", "featured"],
    availability: "In stock",
    attributes: { Lights: "5", Finish: "Antique brass", Colour: "Brass" },
    sizes: [
      { label: "3-light", priceDelta: -21000 },
      { label: "5-light", priceDelta: 0 },
    ],
    colours: ["Brass", "Blackened Steel"],
    addedOn: "2026-08-05",
  },
];

/** Catalogue depth. Same shape as the hand-written seeds above, kept terse so
 * the range stays broad without 900 more lines of literals. */
const extra = (
  id: string,
  name: string,
  brand: string,
  categorySlug: string,
  subcategorySlug: string,
  price: number,
  image: ImageKey,
  attributes: Record<string, string>,
  specs: string[],
  addedOn: string,
): Seed => ({
  id,
  name,
  brand,
  categorySlug,
  subcategorySlug,
  price,
  mrp: Math.round((price * 1.22) / 100) * 100,
  rating: 4 + ((Number(id.replace(/\D/g, "")) % 9) / 10),
  reviewCount: 40 + (Number(id.replace(/\D/g, "")) % 240),
  specs,
  image,
  tags: Number(id.replace(/\D/g, "")) % 3 === 0 ? ["new-arrival"] : [],
  availability: Number(id.replace(/\D/g, "")) % 7 === 0 ? "Low stock" : "In stock",
  attributes,
  sizes: [{ label: "Standard", priceDelta: 0 }],
  colours: ["Graphite", "Brushed Steel"],
  addedOn,
});

seeds.push(
  extra("prd-1031", "Aureus 336L Double Door Refrigerator", "Voltek", "refrigerators", "double-door", 42900, "fridge", { Capacity: "336 L", "Energy rating": "3 Star", Colour: "Steel" }, ["336 L capacity", "Convertible freezer", "Frost free"], "2026-06-02"),
  extra("prd-1032", "Aureus 190L Single Door Refrigerator", "Voltek", "refrigerators", "single-door", 18900, "fridge", { Capacity: "190 L", "Energy rating": "5 Star", Colour: "Ivory" }, ["190 L capacity", "Direct cool", "Stabiliser free"], "2026-04-18"),
  extra("prd-1033", "Glacier 601L Side by Side Refrigerator", "Northline", "refrigerators", "side-by-side", 98900, "fridge", { Capacity: "601 L", "Energy rating": "4 Star", Colour: "Matte Black" }, ["601 L capacity", "Water dispenser", "Twin cooling"], "2026-07-09"),
  extra("prd-1034", "Cascade 8kg Front Load Washing Machine", "Hydra", "washing-machines", "front-load", 41900, "laundry", { Capacity: "8 kg", "Energy rating": "5 Star", Colour: "Silver" }, ["8 kg drum", "Inverter motor", "Steam refresh"], "2026-05-27"),
  extra("prd-1035", "Cascade 9kg Washer Dryer", "Hydra", "washing-machines", "washer-dryer", 62900, "laundry", { Capacity: "9 kg", "Energy rating": "4 Star", Colour: "White" }, ["Wash and dry", "Anti-crease", "Quick 30"], "2026-06-21"),
  extra("prd-1036", "Cascade 7kg Top Load Washing Machine", "Hydra", "washing-machines", "top-load", 24900, "laundry", { Capacity: "7 kg", "Energy rating": "4 Star", Colour: "Grey" }, ["7 kg drum", "Pulsator wash", "Auto restart"], "2026-03-30"),
  extra("prd-1037", "Zephyr 1.5T Inverter Split AC", "Aerolux", "air-conditioners", "split-ac", 44900, "tv", { Capacity: "1.5 Ton", "Energy rating": "5 Star", Colour: "White" }, ["Inverter compressor", "PM 2.5 filter", "Copper condenser"], "2026-04-04"),
  extra("prd-1038", "Zephyr 1T Window AC", "Aerolux", "air-conditioners", "window-ac", 28900, "tv", { Capacity: "1 Ton", "Energy rating": "3 Star", Colour: "White" }, ["Rotary compressor", "Auto restart", "Dust filter"], "2026-05-11"),
  extra("prd-1039", "Zephyr Cassette AC 2T", "Aerolux", "air-conditioners", "cassette-ac", 79900, "tv", { Capacity: "2 Ton", "Energy rating": "3 Star", Colour: "White" }, ["Four-way flow", "Ceiling mount", "Remote console"], "2026-07-22"),
  extra("prd-1040", 'Lumen 55" QLED Smart Television', "Nord Vision", "televisions", "qled", 62900, "tv", { "Screen size": "55 inch", Resolution: "4K", Colour: "Black" }, ["Quantum dot panel", "120Hz", "Dolby Atmos"], "2026-06-14"),
  extra("prd-1041", 'Lumen 43" 4K Smart Television', "Nord Vision", "televisions", "4k-smart-tv", 34900, "tv", { "Screen size": "43 inch", Resolution: "4K", Colour: "Black" }, ["HDR10+", "Voice remote", "Slim bezel"], "2026-03-19"),
  extra("prd-1042", "Lumen 3.1.2 Soundbar", "Nord Vision", "televisions", "soundbars", 32900, "tv", { Channels: "3.1.2", Power: "440 W", Colour: "Graphite" }, ["Wireless subwoofer", "Dolby Atmos", "HDMI eARC"], "2026-08-01"),
  extra("prd-1043", "Verre 90cm Auto-Clean Chimney", "Fornax", "kitchen-appliances", "chimneys", 27900, "fridge", { Suction: "1350 m³/hr", Width: "90 cm", Colour: "Black" }, ["Filterless", "Motion sensor", "Auto clean"], "2026-05-02"),
  extra("prd-1044", "Verre 14-Place Dishwasher", "Fornax", "kitchen-appliances", "dishwashers", 54900, "fridge", { Capacity: "14 place", "Energy rating": "5 Star", Colour: "Steel" }, ["Half load", "Intensive Indian wash", "Child lock"], "2026-07-15"),
  extra("prd-1045", "Ember 4.5L Digital Air Fryer", "Fornax", "small-appliances", "air-fryers", 8900, "fridge", { Capacity: "4.5 L", Power: "1500 W", Colour: "Black" }, ["Digital presets", "Rapid air", "Dishwasher-safe basket"], "2026-06-28"),
  extra("prd-1046", "Ember Bean-to-Cup Coffee Maker", "Fornax", "small-appliances", "coffee-makers", 34900, "fridge", { "Bean hopper": "250 g", Pressure: "15 bar", Colour: "Steel" }, ["Integrated grinder", "Milk texturing", "Auto rinse"], "2026-08-09"),
);


/** Fulfilment company is derived from the category, never hardcoded per product */
const fulfilledByFor = (categorySlug: string): Product["fulfilledBy"] =>
  categories.find((c) => c.slug === categorySlug)?.fulfilledBy ?? "Fabluxe Home Solutions";

const specTableFor = (seed: Seed): SpecGroup[] => [
  {
    group: "Key specifications",
    rows: Object.entries(seed.attributes).map(([label, value]) => ({ label, value })),
  },
  {
    group: "Highlights",
    rows: seed.specs.map((spec, index) => ({ label: `Feature ${index + 1}`, value: spec })),
  },
  {
    group: "General",
    rows: [
      { label: "Brand", value: seed.brand },
      { label: "Model code", value: seed.id.toUpperCase() },
      { label: "In the box", value: "Unit, user manual, installation kit" },
      { label: "Fulfilled by", value: fulfilledByFor(seed.categorySlug) },
      { label: "Country of origin", value: "India" },
    ],
  },
];

export const products: Product[] = seeds.map((seed) => ({
  id: seed.id,
  name: seed.name,
  brand: seed.brand,
  categorySlug: seed.categorySlug,
  subcategorySlug: seed.subcategorySlug,
  price: seed.price,
  mrp: seed.mrp,
  rating: seed.rating,
  reviewCount: seed.reviewCount,
  ...(seed.badge ? { badge: seed.badge } : {}),
  specs: seed.specs,
  image: seed.image,
  images: [seed.image, hoverFor[seed.image], seed.image === "tv" ? "fridge" : "tv"],
  fulfilledBy: fulfilledByFor(seed.categorySlug),
  tags: seed.tags,
  availability: seed.availability,
  attributes: seed.attributes,
  variants: { colour: seed.colours, size: seed.sizes },
  description: `The ${seed.name} from ${seed.brand} is specified for Indian homes: ${seed.specs
    .join(", ")
    .toLowerCase()}. Delivered in a two-hour window, installed by a Fabluxe engineer and demonstrated before the team leaves.`,
  specTable: specTableFor(seed),
  addedOn: seed.addedOn,
}));

export const featuredProducts = products.filter((p) => p.tags.includes("featured"));
export const bestSellers = products.filter((p) => p.tags.includes("best-seller"));
export const newArrivals = products.filter((p) => p.tags.includes("new-arrival"));

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const similarProducts = (product: Product, count = 4) =>
  products
    .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
    .concat(products.filter((p) => p.id !== product.id && p.categorySlug !== product.categorySlug))
    .slice(0, count);

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const discountPercent = (product: Pick<Product, "price" | "mrp">) =>
  Math.round(((product.mrp - product.price) / product.mrp) * 100);
