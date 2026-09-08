import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import bandInteriors from "@/assets/band-interiors.jpg";

const map: Record<string, string> = {
  refrigerators: hero1,
  "washing-machines": hero3,
  "air-conditioners": hero2,
  televisions: hero2,
  "kitchen-appliances": hero1,
  "small-appliances": hero3,
};

export const categoryBanner = (slug: string) => map[slug] ?? bandInteriors;