/**
 * B2B catalogue data. Browse-only: these records deliberately carry NO price,
 * MRP or stock field — purchases in this section are handled through enquiry.
 */
export type B2BImageKey = "fittings" | "hardware" | "fixtures" | "bulk" | "supply";

export type B2BCategory = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: B2BImageKey;
  itemCount: number;
};

export type B2BProduct = {
  id: string;
  name: string;
  brand: string;
  categorySlug: string;
  sku: string;
  summary: string;
  image: B2BImageKey;
  /** Facet attributes — the catalogue filters are generated from these keys */
  attributes: Record<string, string>;
  highlights: string[];
  specTable: { group: string; rows: { label: string; value: string }[] }[];
  /** Indicative order size for project planning — not a price or a quote */
  moq: string;
  leadTime: string;
};

export const b2bCategories: B2BCategory[] = [
  {
    id: "b2b-interior-fittings",
    name: "Interior fittings",
    slug: "interior-fittings",
    tagline: "Handles, levers, rosettes and door furniture",
    description:
      "Solid brass and stainless door furniture specified on hotel, residential tower and workspace fit-outs across India.",
    image: "fittings",
    itemCount: 184,
  },
  {
    id: "b2b-hardware",
    name: "Hardware",
    slug: "hardware",
    tagline: "Hinges, slides, locks and carcass fixings",
    description:
      "Soft-close motion hardware and structural fixings supplied by the carton for joinery workshops and contractors.",
    image: "hardware",
    itemCount: 236,
  },
  {
    id: "b2b-fixtures",
    name: "Fixtures",
    slug: "fixtures",
    tagline: "Sanitaryware, taps, showers and lighting fixtures",
    description:
      "Bath and kitchen fixtures with matching finish families, specified per floor plate and delivered in project phases.",
    image: "fixtures",
    itemCount: 148,
  },
  {
    id: "b2b-bulk-appliances",
    name: "Bulk appliances",
    slug: "bulk-appliances",
    tagline: "Refrigeration, laundry and climate at volume",
    description:
      "Appliance packages for serviced apartments, hostels and builder handovers, with staged delivery and installation.",
    image: "bulk",
    itemCount: 92,
  },
  {
    id: "b2b-project-supply",
    name: "Project supply",
    slug: "project-supply",
    tagline: "Laminates, veneers, profiles and site consumables",
    description:
      "Surface materials and site consumables released against a bill of quantities, floor by floor.",
    image: "supply",
    itemCount: 310,
  },
];

type Seed = Omit<B2BProduct, "specTable"> & {
  specRows: { label: string; value: string }[];
};

const seeds: Seed[] = [
  {
    id: "b2b-1001",
    name: "Verona Solid Brass Lever Handle",
    brand: "Fabluxe Trade",
    categorySlug: "interior-fittings",
    sku: "FLX-IF-1001",
    summary:
      "Cast solid brass lever on a concealed-fix rosette, supplied with matching escutcheons.",
    image: "fittings",
    attributes: {
      Material: "Solid brass",
      Finish: "Brushed brass",
      Application: "Internal doors",
      Certification: "EN 1906 Grade 4",
    },
    highlights: [
      "Concealed fixing, no visible screws",
      "Lifetime finish warranty on interior use",
      "Matching WC turn and privacy sets available",
    ],
    moq: "24 sets",
    leadTime: "3–4 weeks",
    specRows: [
      { label: "Lever length", value: "132 mm" },
      { label: "Rosette diameter", value: "52 mm" },
      { label: "Spindle", value: "8 mm split" },
      { label: "Door thickness", value: "35–55 mm" },
    ],
  },
  {
    id: "b2b-1002",
    name: "Arno Flush Pull, Sliding Doors",
    brand: "Fabluxe Trade",
    categorySlug: "interior-fittings",
    sku: "FLX-IF-1002",
    summary: "Rectangular flush pull for pocket and barn doors in wardrobe and bath runs.",
    image: "fittings",
    attributes: {
      Material: "Stainless steel 304",
      Finish: "Satin nickel",
      Application: "Sliding doors",
      Certification: "IS 4948",
    },
    highlights: ["Recess-mounted, flush to leaf", "Suits 35–45 mm panels"],
    moq: "50 pieces",
    leadTime: "2 weeks",
    specRows: [
      { label: "Cut-out", value: "120 × 40 mm" },
      { label: "Depth", value: "13 mm" },
      { label: "Pack", value: "10 per carton" },
    ],
  },
  {
    id: "b2b-1003",
    name: "Castella Mortise Lock Body",
    brand: "Kavach",
    categorySlug: "interior-fittings",
    sku: "FLX-IF-1003",
    summary: "Euro-profile mortise body for apartment entrance doors, anti-saw bolt.",
    image: "fittings",
    attributes: {
      Material: "Stainless steel 304",
      Finish: "Matt black",
      Application: "Entrance doors",
      Certification: "EN 12209",
    },
    highlights: ["Anti-saw hardened bolt", "Reversible latch", "Master-key compatible cylinders"],
    moq: "40 pieces",
    leadTime: "3 weeks",
    specRows: [
      { label: "Backset", value: "60 mm" },
      { label: "Face plate", value: "235 × 24 mm" },
      { label: "Cylinder", value: "Euro profile 70 mm" },
    ],
  },
  {
    id: "b2b-1004",
    name: "Nero Cabinet Knob, 32 mm",
    brand: "Fabluxe Trade",
    categorySlug: "interior-fittings",
    sku: "FLX-IF-1004",
    summary: "Turned knob for joinery fronts, supplied with two bolt lengths.",
    image: "fittings",
    attributes: {
      Material: "Solid brass",
      Finish: "Matt black",
      Application: "Joinery",
      Certification: "IS 4948",
    },
    highlights: ["Two bolt lengths in the box", "Finish-matched across the Nero family"],
    moq: "100 pieces",
    leadTime: "2 weeks",
    specRows: [
      { label: "Diameter", value: "32 mm" },
      { label: "Projection", value: "28 mm" },
      { label: "Pack", value: "25 per box" },
    ],
  },
  {
    id: "b2b-2001",
    name: "Glide Soft-Close Drawer Runner, 450 mm",
    brand: "Motus",
    categorySlug: "hardware",
    sku: "FLX-HW-2001",
    summary: "Full-extension undermount runner with integrated damper, tested to 80,000 cycles.",
    image: "hardware",
    attributes: {
      Material: "Cold rolled steel",
      Finish: "Zinc plated",
      Application: "Joinery",
      Certification: "EN 15338 Level 3",
    },
    highlights: ["80,000 cycle tested", "Tool-free front adjustment", "Full extension"],
    moq: "50 pairs",
    leadTime: "2–3 weeks",
    specRows: [
      { label: "Length", value: "450 mm" },
      { label: "Load rating", value: "40 kg" },
      { label: "Extension", value: "Full" },
      { label: "Pack", value: "10 pairs per carton" },
    ],
  },
  {
    id: "b2b-2002",
    name: "Motus Clip-On Soft-Close Hinge",
    brand: "Motus",
    categorySlug: "hardware",
    sku: "FLX-HW-2002",
    summary: "110° clip-on hinge with three-way adjustment and removable damper clip.",
    image: "hardware",
    attributes: {
      Material: "Cold rolled steel",
      Finish: "Nickel plated",
      Application: "Joinery",
      Certification: "EN 15570 Level 2",
    },
    highlights: ["Removable damper clip", "Three-way adjustment", "Clip-on mounting plate"],
    moq: "200 pieces",
    leadTime: "2 weeks",
    specRows: [
      { label: "Opening angle", value: "110°" },
      { label: "Cup diameter", value: "35 mm" },
      { label: "Overlay", value: "Full / half / inset" },
    ],
  },
  {
    id: "b2b-2003",
    name: "Anchor Structural Fixing Set",
    brand: "Kavach",
    categorySlug: "hardware",
    sku: "FLX-HW-2003",
    summary: "Wall and carcass fixings for wardrobe and panelling installation.",
    image: "hardware",
    attributes: {
      Material: "Stainless steel 304",
      Finish: "Natural",
      Application: "Site installation",
      Certification: "IS 1367",
    },
    highlights: ["Mixed lengths per site carton", "Corrosion rated for coastal projects"],
    moq: "20 cartons",
    leadTime: "1–2 weeks",
    specRows: [
      { label: "Sizes", value: "6 × 40 to 10 × 120 mm" },
      { label: "Carton", value: "500 pieces" },
    ],
  },
  {
    id: "b2b-2004",
    name: "Lift-Up Flap Stay, Heavy Duty",
    brand: "Motus",
    categorySlug: "hardware",
    sku: "FLX-HW-2004",
    summary: "Gas-assisted stay for overhead kitchen and utility flaps.",
    image: "hardware",
    attributes: {
      Material: "Cold rolled steel",
      Finish: "Grey powder coat",
      Application: "Joinery",
      Certification: "EN 15338 Level 2",
    },
    highlights: ["Stops at any angle", "Front-fixing adjustment"],
    moq: "40 pieces",
    leadTime: "3 weeks",
    specRows: [
      { label: "Flap height", value: "350–600 mm" },
      { label: "Flap weight", value: "5.5–11 kg" },
    ],
  },
  {
    id: "b2b-3001",
    name: "Cascade Single Lever Basin Mixer",
    brand: "Aquene",
    categorySlug: "fixtures",
    sku: "FLX-FX-3001",
    summary: "Deck-mounted basin mixer with ceramic cartridge and aerated flow.",
    image: "fixtures",
    attributes: {
      Material: "Brass body",
      Finish: "Matt black",
      Application: "Bathrooms",
      Certification: "IS 8931",
    },
    highlights: ["35 mm ceramic cartridge", "Aerated 6 lpm flow", "Finish family across the range"],
    moq: "30 pieces",
    leadTime: "4 weeks",
    specRows: [
      { label: "Spout reach", value: "118 mm" },
      { label: "Height", value: "168 mm" },
      { label: "Pressure", value: "0.5–5 bar" },
    ],
  },
  {
    id: "b2b-3002",
    name: "Cascade Concealed Shower Set",
    brand: "Aquene",
    categorySlug: "fixtures",
    sku: "FLX-FX-3002",
    summary: "Concealed diverter, overhead rain head and hand shower on a slide rail.",
    image: "fixtures",
    attributes: {
      Material: "Brass body",
      Finish: "Chrome",
      Application: "Bathrooms",
      Certification: "IS 8931",
    },
    highlights: ["Two-way diverter", "250 mm rain head", "Anti-scale silicone nozzles"],
    moq: "24 sets",
    leadTime: "5 weeks",
    specRows: [
      { label: "Rain head", value: "250 × 250 mm" },
      { label: "Arm", value: "400 mm ceiling / wall" },
      { label: "Hose", value: "1500 mm" },
    ],
  },
  {
    id: "b2b-3003",
    name: "Lumen Recessed Downlight, 12 W",
    brand: "Lumen Works",
    categorySlug: "fixtures",
    sku: "FLX-FX-3003",
    summary: "Anti-glare recessed downlight for corridors and living areas.",
    image: "fixtures",
    attributes: {
      Material: "Aluminium",
      Finish: "White",
      Application: "Lighting",
      Certification: "IS 10322",
    },
    highlights: ["UGR under 19", "Dimmable driver included", "3000K and 4000K options"],
    moq: "100 pieces",
    leadTime: "3 weeks",
    specRows: [
      { label: "Cut-out", value: "85 mm" },
      { label: "Output", value: "1150 lm" },
      { label: "Beam angle", value: "36°" },
    ],
  },
  {
    id: "b2b-3004",
    name: "Wall Hung WC with Concealed Cistern",
    brand: "Aquene",
    categorySlug: "fixtures",
    sku: "FLX-FX-3004",
    summary: "Rimless wall hung pan with frame, cistern and dual-flush plate.",
    image: "fixtures",
    attributes: {
      Material: "Vitreous china",
      Finish: "Glossy white",
      Application: "Bathrooms",
      Certification: "IS 2556",
    },
    highlights: ["Rimless bowl", "Soft-close seat included", "Frame rated to 400 kg"],
    moq: "20 sets",
    leadTime: "6 weeks",
    specRows: [
      { label: "Projection", value: "540 mm" },
      { label: "Flush", value: "3 / 6 litre" },
      { label: "Frame height", value: "1120 mm" },
    ],
  },
  {
    id: "b2b-4001",
    name: "Project Refrigerator 265L, Pallet Lot",
    brand: "Voltek",
    categorySlug: "bulk-appliances",
    sku: "FLX-BA-4001",
    summary: "Double door frost-free refrigerator supplied by the pallet for handover projects.",
    image: "bulk",
    attributes: {
      Material: "Steel body",
      Finish: "Brushed steel",
      Application: "Serviced apartments",
      Certification: "BEE 3 star",
    },
    highlights: ["Pallet-packed for site delivery", "Installation crew available", "Staged release"],
    moq: "1 pallet (8 units)",
    leadTime: "4 weeks",
    specRows: [
      { label: "Capacity", value: "265 litres" },
      { label: "Rating", value: "BEE 3 star" },
      { label: "Warranty", value: "1 year comprehensive" },
    ],
  },
  {
    id: "b2b-4002",
    name: "Inverter Split AC 1.5 Ton, Project Pack",
    brand: "Voltek",
    categorySlug: "bulk-appliances",
    sku: "FLX-BA-4002",
    summary: "Inverter split units with copper condenser for floor-by-floor handover.",
    image: "bulk",
    attributes: {
      Material: "Copper condenser",
      Finish: "White",
      Application: "Residential towers",
      Certification: "BEE 5 star",
    },
    highlights: ["Copper condenser", "Phased delivery by floor", "Installation and gas charging"],
    moq: "12 units",
    leadTime: "3–5 weeks",
    specRows: [
      { label: "Capacity", value: "1.5 ton" },
      { label: "ISEER", value: "5.0" },
      { label: "Warranty", value: "1 year unit, 10 year compressor" },
    ],
  },
  {
    id: "b2b-4003",
    name: "Commercial Front Load Washer, 8.5 kg",
    brand: "Voltek",
    categorySlug: "bulk-appliances",
    sku: "FLX-BA-4003",
    summary: "Hostel and serviced-apartment laundry unit with coin-op option.",
    image: "bulk",
    attributes: {
      Material: "Stainless drum",
      Finish: "White",
      Application: "Hostels",
      Certification: "BEE 5 star",
    },
    highlights: ["Coin and card operation optional", "Stackable with dryer"],
    moq: "6 units",
    leadTime: "5 weeks",
    specRows: [
      { label: "Capacity", value: "8.5 kg" },
      { label: "Spin", value: "1200 rpm" },
      { label: "Cycle", value: "Under 60 minutes" },
    ],
  },
  {
    id: "b2b-5001",
    name: "Textured Laminate Sheet, 1 mm",
    brand: "Surface Co",
    categorySlug: "project-supply",
    sku: "FLX-PS-5001",
    summary: "Post-formable decorative laminate in 42 project shades.",
    image: "supply",
    attributes: {
      Material: "Decorative laminate",
      Finish: "Suede texture",
      Application: "Joinery",
      Certification: "IS 2046 Type S",
    },
    highlights: ["42 shades held in stock", "Post-formable", "Batch matched per project"],
    moq: "50 sheets",
    leadTime: "2 weeks",
    specRows: [
      { label: "Sheet size", value: "2440 × 1220 mm" },
      { label: "Thickness", value: "1 mm" },
      { label: "Grade", value: "IS 2046 Type S" },
    ],
  },
  {
    id: "b2b-5002",
    name: "Natural Oak Veneer, Crown Cut",
    brand: "Surface Co",
    categorySlug: "project-supply",
    sku: "FLX-PS-5002",
    summary: "Sequence-matched crown cut oak veneer for feature panelling.",
    image: "supply",
    attributes: {
      Material: "Natural veneer",
      Finish: "Unpolished",
      Application: "Panelling",
      Certification: "FSC mix",
    },
    highlights: ["Sequence matched bundles", "FSC mix certified"],
    moq: "30 sheets",
    leadTime: "3 weeks",
    specRows: [
      { label: "Sheet size", value: "2440 × 1220 mm" },
      { label: "Thickness", value: "4 mm on MDF" },
    ],
  },
  {
    id: "b2b-5003",
    name: "Aluminium Shadow Gap Profile",
    brand: "Surface Co",
    categorySlug: "project-supply",
    sku: "FLX-PS-5003",
    summary: "Anodised shadow gap profile for wall-to-ceiling junctions.",
    image: "supply",
    attributes: {
      Material: "Aluminium",
      Finish: "Anodised",
      Application: "Panelling",
      Certification: "IS 733",
    },
    highlights: ["3 metre lengths", "Concealed fixing leg"],
    moq: "100 lengths",
    leadTime: "2–3 weeks",
    specRows: [
      { label: "Length", value: "3000 mm" },
      { label: "Gap", value: "10 mm" },
    ],
  },
  {
    id: "b2b-5004",
    name: "Site Protection Kit",
    brand: "Surface Co",
    categorySlug: "project-supply",
    sku: "FLX-PS-5004",
    summary: "Floor boards, corner guards and adhesive film for handover protection.",
    image: "supply",
    attributes: {
      Material: "Recycled board",
      Finish: "Natural",
      Application: "Site installation",
      Certification: "Fire retardant",
    },
    highlights: ["Fire retardant board", "Reusable across phases"],
    moq: "10 kits",
    leadTime: "1 week",
    specRows: [
      { label: "Coverage", value: "Approx. 40 sq m per kit" },
      { label: "Contents", value: "Board, guards, film, tape" },
    ],
  },
];

export const b2bProducts: B2BProduct[] = seeds.map(({ specRows, ...seed }) => ({
  ...seed,
  specTable: [
    { group: "Key specification", rows: specRows },
    {
      group: "Trade information",
      rows: [
        { label: "SKU", value: seed.sku },
        { label: "Minimum order", value: seed.moq },
        { label: "Indicative lead time", value: seed.leadTime },
        { label: "Supplied by", value: "Fabluxe Home Solutions — Trade Division" },
      ],
    },
  ],
}));

export const getB2BCategory = (slug: string) => b2bCategories.find((c) => c.slug === slug);
export const getB2BProduct = (id: string) => b2bProducts.find((p) => p.id === id);
export const b2bProductsIn = (slug: string) =>
  b2bProducts.filter((p) => p.categorySlug === slug);

/** The single line repeated across the section. */
export const b2bBrowseOnlyLine =
  "This is a browsing catalogue. Prices and purchases are handled through enquiry — our trade desk responds within one working day.";

export const b2bAudience = [
  {
    title: "Interior contractors",
    copy: "Fit-out teams specifying door furniture, motion hardware and surfaces across multiple sites.",
  },
  {
    title: "Architects and design studios",
    copy: "Studios building finish schedules who need consistent families across a whole project.",
  },
  {
    title: "Developers and builders",
    copy: "Handover packages for towers, villas and serviced apartments, released floor by floor.",
  },
  {
    title: "Hospitality and facilities",
    copy: "Hotels and managed properties running refurbishment cycles and replacement stock.",
  },
];
