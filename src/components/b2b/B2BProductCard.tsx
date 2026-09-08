import { Link } from "@tanstack/react-router";
import { SmartLink } from "@/components/common/SmartLink";
import { B2BLabel } from "./B2BChrome";
import { b2bImage } from "@/lib/b2b-images";
import type { B2BProduct } from "@/data/b2b";

export function B2BProductCard({ product }: { product: B2BProduct }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[12px] bg-card transition-shadow hover:shadow-[var(--shadow-soft)]">
      <SmartLink to={`/b2b/product/${product.id}`} className="relative block overflow-hidden bg-[#ececec]">
        <img
          src={b2bImage(product.image)}
          alt={product.name}
          loading="lazy"
          width={1200}
          height={900}
          className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <B2BLabel className="absolute left-3 top-3" />
      </SmartLink>
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <h3 className="line-clamp-2 text-heading leading-snug text-navy">
          <SmartLink to={`/b2b/product/${product.id}`} className="transition-colors hover:text-teal">
            {product.name}
          </SmartLink>
        </h3>
        <dl className="mt-1 grid grid-cols-3 gap-2 border-t border-border pt-2.5 text-caption">
          <div>
            <dt className="block text-muted-foreground">SKU</dt>
            <dd className="numeric mt-0.5 text-navy">{product.sku}</dd>
          </div>
          <div>
            <dt className="block text-muted-foreground">MOQ</dt>
            <dd className="numeric mt-0.5 text-navy">{product.moq}</dd>
          </div>
          <div>
            <dt className="block text-muted-foreground">Lead</dt>
            <dd className="numeric mt-0.5 text-navy">{product.leadTime}</dd>
          </div>
        </dl>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-2.5">
          <Link
            to="/b2b/enquiry"
            search={{ product: product.id }}
            className="inline-flex h-8 shrink-0 items-center rounded-sm bg-navy px-3.5 text-caption font-medium leading-none uppercase tracking-[0.18em] text-white transition-colors hover:bg-beige hover:text-navy"
          >
            Enquire
          </Link>
        </div>
      </div>
    </article>
  );
}