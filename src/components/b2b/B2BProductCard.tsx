import { FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SmartLink } from "@/components/common/SmartLink";
import { B2BLabel } from "./B2BChrome";
import { b2bImage } from "@/lib/b2b-images";
import type { B2BProduct } from "@/data/b2b";

export function B2BProductCard({ product }: { product: B2BProduct }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[12px] border border-border bg-card transition-shadow hover:shadow-[var(--shadow-soft)]">
      <SmartLink to={`/b2b/product/${product.id}`} className="block overflow-hidden bg-beige">
        <img
          src={b2bImage(product.image)}
          alt={product.name}
          loading="lazy"
          width={1200}
          height={900}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </SmartLink>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="label-eyebrow text-teal">{product.brand}</p>
          <B2BLabel />
        </div>
        <h3 className="text-heading leading-snug text-navy">
          <SmartLink to={`/b2b/product/${product.id}`} className="link-gold">
            {product.name}
          </SmartLink>
        </h3>
        <p className="text-caption leading-relaxed text-muted-foreground">{product.summary}</p>
        <dl className="mt-1 grid grid-cols-3 gap-2 border-t border-border pt-3 text-caption">
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
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
          <Link
            to="/b2b/enquiry"
            search={{ product: product.id }}
            className="inline-flex items-center gap-2 bg-navy px-4 py-2.5 text-caption uppercase tracking-[0.18em] text-beige transition-colors hover:bg-beige hover:text-navy"
          >
            Enquire
          </Link>
          <SmartLink
            to={`/b2b/product/${product.id}`}
            className="link-gold inline-flex items-center gap-1.5 text-caption uppercase tracking-[0.18em] text-teal"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            Specification
          </SmartLink>
        </div>
      </div>
    </article>
  );
}