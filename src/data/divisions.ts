/**
 * Top-level divisions — a Ströms-style department structure.
 *
 * The storefront is one unified experience; each division is a curated section
 * of the catalogue. Divisions, categories and products remain data-driven so
 * new divisions/categories can be added without rebuilding components.
 *
 * Trade maps to the B2B browse-only store (no cart/checkout).
 */
import heroHome from "@/assets/hero-1.jpg";
import heroInteriors from "@/assets/band-interiors.jpg";
import heroTrade from "@/assets/band-b2b.jpg";

export type Division = {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  tagline: string;
  intro: string;
  image: string;
  /** Category slugs that belong to this division. */
  categorySlugs: string[];
  /** Primary route for the division landing page. */
  to: string;
};

export const divisions: Division[] = [
  {
    id: "home",
    name: "Fabluxe Home",
    shortName: "Home",
    slug: "home",
    tagline: "Appliances and electronics for the considered home",
    intro:
      "Refrigerators, laundry, air, televisions and kitchen appliances — delivered, installed and demonstrated by Fabluxe.",
    image: heroHome,
    categorySlugs: [
      "refrigerators",
      "washing-machines",
      "air-conditioners",
      "televisions",
      "kitchen-appliances",
      "small-appliances",
    ],
    to: "/home",
  },
  {
    id: "interiors",
    name: "Fabluxora Interiors",
    shortName: "Interiors",
    slug: "interiors",
    tagline: "Furniture, lighting and rooms designed around how you live",
    intro:
      "Seating, storage and light from Fabluxora, plus room styles and a consultation with a senior designer.",
    image: heroInteriors,
    categorySlugs: ["furniture"],
    to: "/interiors",
  },
  {
    id: "trade",
    name: "Fabluxe Trade",
    shortName: "Trade",
    slug: "trade",
    tagline: "B2B fittings and business goods, catalogued for enquiry",
    intro:
      "Browse specifications and build a list. Trade is browse-only — raise an enquiry and our desk responds within one working day.",
    image: heroTrade,
    categorySlugs: [],
    to: "/b2b",
  },
];

export const getDivision = (id: string) => divisions.find((d) => d.id === id);