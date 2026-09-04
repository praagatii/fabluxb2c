import { getProduct, formatPrice } from "@/data/products";
import { productImage } from "@/lib/product-images";
import { Container } from "@/components/common/Section";
import { SmartLink } from "@/components/common/SmartLink";

/** Empi.re-style oversized product story: one hero product told in full —
 * large imagery beside generous typography and a single commercial CTA. */
export function FeaturedStory() {
  const product = getProduct("prd-1001");
  if (!product) return null;

  return (
    <section>
      <Container className="py-14 sm:py-[var(--spacing-section)]">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <SmartLink to={`/shop/product/${product.id}`} className="group relative block overflow-hidden bg-sky/40">
            <img
              src={productImage(product.image)}
              alt={product.name}
              loading="lazy"
              width={1600}
              height={1200}
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
            />
          </SmartLink>

          <div className="max-w-xl">
            <span className="rule-gold mb-5 block" aria-hidden="true" />
            <p className="label-eyebrow text-teal">The Festive Edit · Featured</p>
            <h2 className="font-display text-display text-navy">Cold storage, quietly considered</h2>
            <p className="mt-5 line-clamp-2 max-w-lg text-body leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <dl className="mt-8 grid gap-x-8 gap-y-4 border-t border-border pt-7 sm:grid-cols-2">
              {product.specs.slice(0, 4).map((spec) => (
                <div key={spec} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  <dd className="label-eyebrow text-muted-foreground">{spec}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <SmartLink
                to={`/shop/product/${product.id}`}
                className="bg-navy px-7 py-2.5 text-body font-medium text-primary-foreground transition-colors hover:bg-beige hover:text-navy"
              >
                View {product.brand} {product.name.split(" ")[0]}
              </SmartLink>
              <p className="text-heading text-navy">
                {formatPrice(product.price)}
                <span className="numeric ml-3 text-caption text-muted-foreground line-through">
                  {formatPrice(product.mrp)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
