import { useEffect, useState } from "react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import bandInteriors from "@/assets/band-interiors.jpg";
import { heroSlides } from "@/data/site";
import { SmartLink } from "@/components/common/SmartLink";
import { cn } from "@/lib/utils";

const heroImages = { hero1, hero2, hero3 } as const;

type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  primaryCta: { label: string; to: string };
  image: string;
};

const slides: Slide[] = [
  ...heroSlides.map((slide) => ({ ...slide, image: heroImages[slide.image] })),
  {
    id: "hero-interiors",
    eyebrow: "Fabluxora Interiors",
    title: "Rooms designed around you",
    copy: "Interior design consultation, from floor plan to palette.",
    primaryCta: { label: "Explore", to: "/interior-design" },
    image: bandInteriors,
  },
];

/** Audo-style editorial hero that auto-fades between Fabluxe screens. All text
 * lives in one shared box so the crossfade stays perfectly aligned. */
export function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative -mt-14 min-h-dvh w-full overflow-hidden bg-navy sm:-mt-16">
      {/* Crossfading imagery */}
      {slides.map((slide, i) => (
        <div
          key={`img-${slide.id}`}
          aria-hidden="true"
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-[var(--ease-editorial)]",
            i === index ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <img
            src={slide.image}
            alt=""
            width={1600}
            height={900}
            loading={i === 0 ? "eager" : "lazy"}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-linear-to-t from-navy/85 via-navy/25 to-navy/10" />

      {/* Shared, fixed text box — every slide aligns here */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-[80rem] px-5 pb-16 sm:px-8 sm:pb-24">
          <div className="grid">
            {slides.map((slide, i) => (
              <div
                key={`text-${slide.id}`}
                className={cn(
                  "col-start-1 row-start-1 flex flex-col justify-end transition-opacity duration-700 ease-[var(--ease-editorial)]",
                  i === index ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <span className="rule-gold mb-5 block" aria-hidden="true" />
                <p className="label-eyebrow text-gold">{slide.eyebrow}</p>
                <h1 className="mt-4 line-clamp-2 max-w-2xl font-display text-display text-beige">
                  {slide.title}
                </h1>
                <p className="mt-4 line-clamp-2 max-w-md text-body leading-relaxed text-sky">
                  {slide.copy}
                </p>
                <div className="mt-6">
                  <SmartLink
                    to={slide.primaryCta.to}
                    className="inline-block bg-beige px-8 py-4 text-body font-medium text-navy transition-colors hover:bg-gold"
                  >
                    {slide.primaryCta.label}
                  </SmartLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}