import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { productImage } from "@/lib/product-images";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SmartLink } from "@/components/common/SmartLink";

const headline = ["refrigerators", "televisions", "kitchen-appliances", "furniture"];

/** Audo-style category presentation: large image-led cards with minimal text. */
export function ShopByCategory() {
  const shown = categories.filter((c) => c.status === "live" && headline.includes(c.slug));

  return (
    <Section>
      <SectionHeading
        eyebrow="Shop by category"
        title="Curated by room and need"
        copy="Four focused ranges, each installed and demonstrated by Fabluxe."
      />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {shown.map((category) => {
          const image = productImage(
            products.find((p) => p.categorySlug === category.slug)?.image ?? "fridge",
          );
          return (
            <li key={category.id}>
              <SmartLink
                to={`/shop/${category.slug}`}
                className="group relative block overflow-hidden bg-sky/40"
              >
                <img
                  src={image}
                  alt={category.name}
                  loading="lazy"
                  width={1600}
                  height={900}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-heading text-beige">{category.name}</h3>
                </div>
              </SmartLink>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}