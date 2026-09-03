import appliances from "@/assets/hero-3.jpg";
import gadgets from "@/assets/hero-2.jpg";
import kitchen from "@/assets/hero-1.jpg";
import furniture from "@/assets/style-contemporary-luxe.jpg";
import interiors from "@/assets/band-interiors.jpg";
import lighting from "@/assets/interiors-hero.jpg";

/**
 * One clearly different image per broad category group, so the homepage and
 * shop category tiles never repeat a visual. Uses the site's product + interior
 * photography rather than a single fallback.
 */
export const categoryGroupImage = (slug: string): string =>
  (
    {
      appliances,
      kitchen,
      gadgets,
      furniture,
      interiors,
      lighting,
    } as Record<string, string>
  )[slug] ?? furniture;
