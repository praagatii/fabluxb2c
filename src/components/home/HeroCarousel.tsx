import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import { heroSlides } from "@/data/site";
import { SmartLink } from "@/components/common/SmartLink";
import { cn } from "@/lib/utils";

const images = { hero1, hero2, hero3 } as const;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const count = heroSlides.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 8000);
    return () => window.clearInterval(id);
  }, [count]);

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <section aria-roledescription="carousel" aria-label="Featured offers" className="relative -mt-16 sm:-mt-[4.5rem]">
      <div className="relative min-h-dvh w-full overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-[var(--ease-editorial)]",
              i === index ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <img
              src={images[slide.image]}
              alt=""
              width={1600}
              height={900}
              loading={i === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-navy/85 via-navy/55 to-transparent" />
            <div className="absolute inset-0">
              <div className="mx-auto flex h-full max-w-[80rem] items-center px-5 sm:px-8">
                <div className="max-w-xl">
                  <span className="rule-gold mb-4" aria-hidden="true" />
                  <p className="label-eyebrow text-gold">{slide.eyebrow}</p>
                  <h1 className="font-display mt-4 text-display text-beige">
                    {slide.title}
                  </h1>
                  <p className="mt-5 max-w-md text-body leading-relaxed text-sky">
                    {slide.copy}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <SmartLink
                      to={slide.primaryCta.to}
                      className="bg-beige px-6 py-3.5 text-body font-medium text-navy transition-colors hover:bg-gold"
                    >
                      {slide.primaryCta.label}
                    </SmartLink>
                    <SmartLink
                      to={slide.secondaryCta.to}
                      className="border border-sky/70 px-6 py-3.5 text-body font-medium text-beige transition-colors hover:border-gold hover:text-gold"
                    >
                      {slide.secondaryCta.label}
                    </SmartLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => go(-1)}
          className="grid h-9 w-9 place-items-center border border-sky/60 text-beige hover:border-gold hover:text-gold"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <ul className="flex items-center gap-2">
          {heroSlides.map((slide, i) => (
            <li key={slide.id}>
              <button
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={cn("h-1 w-8 transition-colors", i === index ? "bg-gold" : "bg-sky/50")}
              />
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => go(1)}
          className="grid h-9 w-9 place-items-center border border-sky/60 text-beige hover:border-gold hover:text-gold"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
