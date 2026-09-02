import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SmartLink } from "@/components/common/SmartLink";

type ProductRailProps = {
  eyebrow: string;
  title: string;
  copy?: string | undefined;
  products: Product[];
  viewAllTo?: string | undefined;
  actionLabel?: string | undefined;
  className?: string | undefined;
};

export function ProductRail({
  eyebrow,
  title,
  copy,
  products,
  viewAllTo = "/shop",
  actionLabel = "View all",
  className,
}: ProductRailProps) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollBy = (delta: number) => {
    trackRef.current?.scrollBy({ left: delta * 320, behavior: "smooth" });
  };

  return (
    <Section className={className}>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        copy={copy}
        action={
          <div className="flex items-center gap-3">
            <SmartLink to={viewAllTo} className="link-gold text-body text-teal">
              {actionLabel}
            </SmartLink>
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                aria-label={`Scroll ${title} left`}
                onClick={() => scrollBy(-1)}
                className="grid h-9 w-9 place-items-center border border-border text-navy hover:border-gold"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label={`Scroll ${title} right`}
                onClick={() => scrollBy(1)}
                className="grid h-9 w-9 place-items-center border border-border text-navy hover:border-gold"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        }
      />
      <ul
        ref={trackRef}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
    </Section>
  );
}
