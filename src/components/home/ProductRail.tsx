import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { Section } from "@/components/common/Section";
import { cn } from "@/lib/utils";

type ProductRailProps = {
  eyebrow: string;
  title: string;
  products: Product[];
  className?: string | undefined;
};

const CARD_WIDTH = 320;

export function ProductRail({
  eyebrow,
  title,
  products,
  className,
}: ProductRailProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateFades = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateFades();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateFades, { passive: true });
    window.addEventListener("resize", updateFades);
    return () => {
      el.removeEventListener("scroll", updateFades);
      window.removeEventListener("resize", updateFades);
    };
  }, []);

  const scrollToCard = (delta: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    if (cards.length === 0) return;
    const target = el.scrollLeft + delta * CARD_WIDTH;
    // find the nearest card snap-start position around the target
    let best = cards[0]!.offsetLeft;
    let bestDist = Infinity;
    for (const card of cards) {
      const dist = Math.abs(card.offsetLeft - target);
      if (dist < bestDist) {
        bestDist = dist;
        best = card.offsetLeft;
      }
    }
    el.scrollTo({ left: best, behavior: "smooth" });
  };

  return (
    <Section className={className}>
      <div className="flex items-center justify-between gap-3">
        <p className="label-eyebrow text-teal">{eyebrow}</p>
      </div>
      <div className="relative mt-4">
        <ul
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <li
              key={product.id}
              className="w-[16rem] shrink-0 snap-start sm:w-[18rem] lg:w-[19.5rem]"
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={`Scroll ${title} left`}
          onClick={() => scrollToCard(-1)}
          className={cn(
            "absolute inset-y-0 left-0 flex w-12 items-center justify-start bg-linear-to-r from-background to-transparent transition-opacity duration-300",
            canLeft ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-white">
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </span>
        </button>

        <button
          type="button"
          aria-label={`Scroll ${title} right`}
          onClick={() => scrollToCard(1)}
          className={cn(
            "absolute inset-y-0 right-0 flex w-12 items-center justify-end bg-linear-to-l from-background to-transparent transition-opacity duration-300",
            canRight ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-white">
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </span>
        </button>
      </div>
    </Section>
  );
}