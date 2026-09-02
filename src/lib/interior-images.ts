import hero from "@/assets/interiors-hero.jpg";
import modernMinimal from "@/assets/style-modern-minimal.jpg";
import contemporaryLuxe from "@/assets/style-contemporary-luxe.jpg";
import classicIndian from "@/assets/style-classic-indian.jpg";
import scandinavian from "@/assets/style-scandinavian.jpg";
import industrial from "@/assets/style-industrial.jpg";
import coastal from "@/assets/style-coastal.jpg";
import before from "@/assets/interiors-before.jpg";
import type { InteriorImageKey } from "@/data/interiors";

const map: Record<InteriorImageKey, string> = {
  hero,
  "modern-minimal": modernMinimal,
  "contemporary-luxe": contemporaryLuxe,
  "classic-indian": classicIndian,
  scandinavian,
  industrial,
  coastal,
  before,
};

export const interiorImage = (key: InteriorImageKey) => map[key];
