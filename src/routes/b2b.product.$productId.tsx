import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Download, FileText, ArrowRight } from "lucide-react";
import { Section, Container } from "@/components/common/Section";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { SmartLink } from "@/components/common/SmartLink";
import { B2BLabel, B2BPageMark } from "@/components/b2b/B2BChrome";
import { B2BProductCard } from "@/components/b2b/B2BProductCard";
import { getB2BProduct, getB2BCategory, b2bProductsIn } from "@/data/b2b";
import { b2bImage } from "@/lib/b2b-images";

export const Route = createFileRoute("/b2b/product/$productId")({
  loader: ({ params }) => {
    const product = getB2BProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable — Fabluxe B2B" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — Trade Specification | Fabluxe B2B`;
    return {
      meta: [
        { title },
        { name: "description", content: product.summary },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:title", content: title },
        { property: "og:description", content: product.summary },
      ],
    };
  },
  notFoundComponent: ProductMissing,
  component: B2BProductPage,
});

function ProductMissing() {
  return (
    <Section>
      <h1 className="text-heading text-navy">That catalogue item does not exist</h1>
      <p className="mt-3 text-caption text-muted-foreground">
        <SmartLink to="/b2b/catalogue" className="link-gold text-teal">
          Browse the full catalogue
        </SmartLink>
      </p>
    </Section>
  );
}

function B2BProductPage() {
  const { product } = Route.useLoaderData();
  const category = getB2BCategory(product.categorySlug);
  const related = b2bProductsIn(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "B2B Store", to: "/b2b" },
            { label: "Catalogue", to: "/b2b/catalogue" },
            ...(category
              ? [{ label: category.name, to: `/b2b/catalogue/${category.slug}` }]
              : []),
            { label: product.name },
          ]}
        />
      </Container>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <img
            src={b2bImage(product.image)}
            alt={product.name}
            width={1200}
            height={900}
            className="aspect-[4/3] w-full object-cover"
          />

          <div>
            <B2BPageMark>{product.brand}</B2BPageMark>
            <h1 className="mt-4 text-heading leading-tight text-navy">
              {product.name}
            </h1>
            <p className="mt-4 text-body leading-relaxed text-muted-foreground">{product.summary}</p>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-5 text-body">
              <div>
                <dt className="label-eyebrow text-teal">SKU</dt>
                <dd className="numeric mt-1 text-navy">{product.sku}</dd>
              </div>
              <div>
                <dt className="label-eyebrow text-teal">Minimum order</dt>
                <dd className="numeric mt-1 text-navy">{product.moq}</dd>
              </div>
              <div>
                <dt className="label-eyebrow text-teal">Lead time</dt>
                <dd className="numeric mt-1 text-navy">{product.leadTime}</dd>
              </div>
              <div>
                <dt className="label-eyebrow text-teal">Pricing</dt>
                <dd className="mt-1 text-navy">On enquiry</dd>
              </div>
            </dl>

            <ul className="mt-6 space-y-2 text-body text-muted-foreground">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/b2b/enquiry"
                search={{ product: product.id }}
                className="inline-flex items-center gap-2 bg-navy px-6 py-2.5 text-caption uppercase tracking-[0.18em] text-beige transition-colors hover:bg-teal"
              >
                Enquire about this product
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              {/* TODO: spec sheets come from the client's product documentation library. */}
              <button
                type="button"
                disabled
                title="Spec sheet PDF to be supplied by the client"
                className="inline-flex cursor-not-allowed items-center gap-2 border border-border px-6 py-2.5 text-caption uppercase tracking-[0.18em] text-muted-foreground"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download spec sheet (PDF)
              </button>
            </div>
            <p className="mt-3 text-caption text-muted-foreground">
              Spec sheet placeholder — documentation is issued with the quotation.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-card">
        <div className="flex items-center gap-3">
          <FileText className="h-4 w-4 text-teal" aria-hidden="true" />
          <h2 className="text-heading text-navy">Specification</h2>
          <B2BLabel className="ml-auto" />
        </div>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          {product.specTable.map((group) => (
            <div key={group.group} className="border border-border">
              <p className="label-eyebrow border-b border-border bg-beige px-5 py-3 text-teal">
                {group.group}
              </p>
              <table className="w-full text-body">
                <tbody>
                  {group.rows.map((row) => (
                    <tr key={row.label} className="border-b border-border last:border-b-0">
                      <th scope="row" className="w-1/2 px-5 py-3 text-left font-normal text-muted-foreground">
                        {row.label}
                      </th>
                      <td className="px-5 py-3 text-navy">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="mt-8 border border-border">
          <p className="label-eyebrow border-b border-border bg-beige px-5 py-3 text-teal">
            Attributes
          </p>
          <table className="w-full text-body">
            <tbody>
              {Object.entries(product.attributes).map(([key, value]) => (
                <tr key={key} className="border-b border-border last:border-b-0">
                  <th scope="row" className="w-1/2 px-5 py-3 text-left font-normal text-muted-foreground">
                    {key}
                  </th>
                  <td className="px-5 py-3 text-navy">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Bulk enquiry banner */}
      <Section className="bg-teal py-10 sm:py-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="label-eyebrow text-beige">Buying at volume?</p>
            <h2 className="mt-2 font-display text-display text-beige">
              Bulk and project pricing is quoted by the trade desk
            </h2>
            <p className="mt-2 max-w-xl text-caption leading-relaxed text-sky">
              Send the quantity, the site and the programme. We confirm availability, phasing and a
              written price against your reference number.
            </p>
          </div>
          <Link
            to="/b2b/enquiry"
            search={{ product: product.id }}
            className="inline-flex shrink-0 items-center gap-2 bg-beige px-6 py-2.5 text-caption uppercase tracking-[0.18em] text-navy transition-opacity hover:opacity-90"
          >
            Raise a bulk enquiry
          </Link>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section>
          <h2 className="text-heading text-navy">More in {category?.name}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <B2BProductCard key={item.id} product={item} />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
