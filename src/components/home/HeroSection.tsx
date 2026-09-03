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
    title: "Rooms designed\naround you",
    copy: "Interior design consultation, from floor plan to palette — a room composed entirely around the way you live.",
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
    <section className="relative -mt-[calc(3.5rem+1px)] min-h-dvh w-full overflow-hidden bg-navy sm:-mt-[calc(4rem+1px)]">
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
            className="h-full w-full scale-[1.12] object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-linear-to-t from-navy/85 via-navy/25 to-navy/10" />

      {/* Shared, fixed text box — heading centered on screen, content below */}
      <div className="absolute inset-0">
        <div className="mx-auto flex h-full max-w-[80rem] flex-col justify-center px-5 sm:px-8">
          <div className="grid translate-y-[4rem]">
            {slides.map((slide, i) => (
              <div
                key={`text-${slide.id}`}
                className={cn(
                  "col-start-1 row-start-1 flex flex-col justify-center transition-opacity duration-700 ease-[var(--ease-editorial)]",
                  i === index ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <h1 className="max-w-3xl pb-2 font-display text-hero text-beige">
                  {slide.title.split("\n").map((line, li) => (
                    <span key={li}>
                      {line}
                      {li < slide.title.split("\n").length - 1 ? <br /> : null}
                    </span>
                  ))}
                </h1>
                <p className="mt-5 line-clamp-2 max-w-xl text-lg leading-relaxed text-sky">
                  {slide.copy}
                </p>
                <div className="mt-8">
                  <SmartLink
                    to={slide.primaryCta.to}
                    className="hero-cta inline-block px-8 py-3 text-center text-body font-medium"
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