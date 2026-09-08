import { Link } from "@tanstack/react-router";
import { SmartLink } from "@/components/common/SmartLink";
import { B2BLabel } from "./B2BChrome";
import { b2bImage } from "@/lib/b2b-images";
import type { B2BProduct } from "@/data/b2b";

export function B2BProductCard({ product }: { product: B2BProduct }) {
  return (
    <article className="group flex h-full flex-col">
      <SmartLink
        to={`/b2b/product/${product.id}`}
        className="relative block overflow-hidden rounded-[12px] bg-[#ececec]"
      >
        <img
          src={b2bImage(product.image)}
          alt={product.name}
          loading="lazy"
          width={1200}
          height={900}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <B2BLabel className="absolute left-3 top-3" />
      </SmartLink>
      <div className="flex flex-1 flex-col pt-3">
        <h3 className="line-clamp-2 text-sm leading-snug text-navy">
          <SmartLink to={`/b2b/product/${product.id}`} className="transition-colors hover:text-teal">
            {product.name}
          </SmartLink>
        </h3>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2.5 pt-2.5">
          <dl className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <div className="flex items-center gap-1.5">
              <dt className="text-caption text-muted-foreground">SKU</dt>
              <dd className="numeric text-caption text-navy">{product.sku}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <dt className="text-caption text-muted-foreground">MOQ</dt>
              <dd className="numeric text-caption text-navy">{product.moq}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <dt className="text-caption text-muted-foreground">Lead</dt>
              <dd className="numeric text-caption text-navy">{product.leadTime}</dd>
            </div>
          </dl>
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