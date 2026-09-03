import { useMemo, useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus, Scale, Share2, ShieldCheck, Star, Tag } from "lucide-react";
import {
  discountPercent,
  formatPrice,
  getProduct,
  products,
  similarProducts,
  type Product,
} from "@/data/products";
import { categories } from "@/data/categories";
import { productImage } from "@/lib/product-images";
import { useStore } from "@/context/StoreContext";
import { Container, Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SmartLink } from "@/components/common/SmartLink";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { DeliveryCheck } from "@/components/shop/DeliveryCheck";
import { ReviewsBlock } from "@/components/shop/ReviewsBlock";
import { SupportEnquiryDialog } from "@/components/shop/SupportEnquiryDialog";
import { ProductCard } from "@/components/shop/ProductCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found — Fabluxe" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — ${product.brand} | Fabluxe`;
    const description = `${product.name} at ${formatPrice(product.price)}. ${product.specs.join(", ")}. Delivered and installed by Fabluxe.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductDetailPage,
});

const tabs = ["Overview", "Specifications", "Reviews", "Support"] as const;
type Tab = (typeof tabs)[number];

function ProductDetailPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, toggleCompare, wishlist, compare } = useStore();

  const [colour, setColour] = useState(product.variants.colour[0] ?? "");
  const [size, setSize] = useState(
    (product.variants.size.find((s) => s.priceDelta === 0) ?? product.variants.size[0])?.label ?? "",
  );
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<Tab>("Overview");
  const [supportOpen, setSupportOpen] = useState(false);
  const [shared, setShared] = useState(false);

  const sizeDelta = product.variants.size.find((s) => s.label === size)?.priceDelta ?? 0;
  const price = product.price + sizeDelta;
  const mrp = product.mrp + sizeDelta;
  const savings = mrp - price;

  const category = categories.find((c) => c.slug === product.categorySlug);
  const similar = useMemo(() => similarProducts(product, 4), [product]);
  const bundle = useMemo(
    () => [product, ...products.filter((p) => p.id !== product.id).slice(0, 2)],
    [product],
  );
  const bundleTotal = bundle.reduce((sum, p) => sum + p.price, 0);

  const wished = wishlist.includes(product.id);
  const compared = compare.includes(product.id);

  const share = async () => {
    const url = typeof window === "undefined" ? "" : window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setShared(true);
      window.setTimeout(() => setShared(false), 2000);
    } catch {
      setShared(false);
    }
  };

  return (
    <>
      <div className="border-b border-border bg-beige">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Shop", to: "/shop" },
              ...(category
                ? [{ label: category.name, to: `/shop/${category.slug}` }]
                : []),
              { label: product.name },
            ]}
          />
        </Container>
      </div>

      <Container>
        <div className="grid gap-10 py-10 lg:grid-cols-2">
          <ProductGallery product={product} />

          <div>
            <p className="label-eyebrow text-teal">{product.brand}</p>
            <h1 className="mt-3 text-heading leading-tight text-navy">
              {product.name}
            </h1>

            <button
              type="button"
              onClick={() => setTab("Reviews")}
              className="mt-3 flex items-center gap-2 text-body text-muted-foreground"
            >
              <Star className="h-4 w-4 text-gold" fill="currentColor" aria-hidden="true" />
              <span className="numeric text-navy">{product.rating.toFixed(1)}</span>
              <span className="numeric link-gold text-teal">
                {product.reviewCount} reviews
              </span>
            </button>

            <div className="mt-6 border-y border-border py-5">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="numeric text-heading font-semibold text-navy">
                  {formatPrice(price)}
                </span>
                <span className="numeric text-caption text-muted-foreground line-through">
                  {formatPrice(mrp)}
                </span>
                <span className="numeric bg-beige px-2 py-1 text-caption font-semibold text-teal">
                  {discountPercent({ price, mrp })}% off
                </span>
              </div>
              <p className="numeric mt-2 text-caption text-teal">
                You save {formatPrice(savings)} · inclusive of all taxes
              </p>
              <p className="mt-3 flex items-center gap-2 text-caption text-muted-foreground">
                <Tag className="h-4 w-4 text-gold" aria-hidden="true" />
                Coupon hint: apply <span className="numeric text-navy">FABLUXE5</span> at checkout
                for an additional bank discount.
              </p>
              <p className="mt-2 text-caption text-navy">{product.availability}</p>
            </div>

            <fieldset className="mt-6">
              <legend className="label-eyebrow text-teal">Colour</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.variants.colour.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setColour(option)}
                    aria-pressed={colour === option}
                    className={cn(
                      "border px-4 py-2 text-body text-navy",
                      colour === option ? "border-gold bg-beige" : "border-border",
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-5">
              <legend className="label-eyebrow text-teal">Capacity / size</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.variants.size.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setSize(option.label)}
                    aria-pressed={size === option.label}
                    className={cn(
                      "numeric border px-4 py-2 text-body text-navy",
                      size === option.label ? "border-gold bg-beige" : "border-border",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center border border-border">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="grid h-11 w-11 place-items-center text-navy"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="numeric w-10 text-center text-body text-navy">{quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => Math.min(9, q + 1))}
                  className="grid h-11 w-11 place-items-center text-navy"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => addToCart(product.id, { quantity, colour, size })}
                className="flex-1 bg-navy px-6 py-3 text-body text-primary-foreground transition-colors hover:bg-beige hover:text-navy"
              >
                Add to cart
              </button>
              <SmartLink
                to="/checkout"
                className="flex-1 bg-gold px-6 py-3 text-center text-body font-medium text-navy transition-opacity hover:opacity-90"
              >
                Buy now
              </SmartLink>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-body text-muted-foreground">
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-pressed={wished}
                className={cn("flex items-center gap-2 hover:text-teal", wished && "text-gold")}
              >
                <Heart className="h-4 w-4" fill={wished ? "currentColor" : "none"} aria-hidden="true" />
                {wished ? "In wishlist" : "Add to wishlist"}
              </button>
              <button
                type="button"
                onClick={() => toggleCompare(product.id)}
                aria-pressed={compared}
                className={cn("flex items-center gap-2 hover:text-teal", compared && "text-gold")}
              >
                <Scale className="h-4 w-4" aria-hidden="true" />
                {compared ? "In compare" : "Add to compare"}
              </button>
              <button type="button" onClick={share} className="flex items-center gap-2 hover:text-teal">
                <Share2 className="h-4 w-4" aria-hidden="true" />
                {shared ? "Link copied" : "Share"}
              </button>
            </div>

            <div className="mt-6">
              <DeliveryCheck />
            </div>

            <div className="mt-4 border border-border p-5">
              <p className="label-eyebrow flex items-center gap-2 text-teal">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Returns and warranty
              </p>
              <p className="mt-3 text-caption text-navy">Returns and warranty as per company policy</p>
              <button
                type="button"
                onClick={() => setSupportOpen(true)}
                className="mt-4 border border-navy px-4 py-2 text-body text-navy transition-colors hover:bg-navy hover:text-primary-foreground"
              >
                Contact customer support for terms
              </button>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-y border-border bg-card">
        <Container>
          <div className="flex gap-6 overflow-x-auto">
            {tabs.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                aria-current={tab === item}
                className={cn(
                  "label-eyebrow whitespace-nowrap border-b-2 py-5 text-teal",
                  tab === item ? "border-gold text-navy" : "border-transparent",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </Container>
      </div>

      <Section>
        {tab === "Overview" ? (
          <div className="max-w-3xl">
            <h2 className="text-heading text-navy">Overview</h2>
            <p className="mt-4 text-caption leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {product.specs.map((spec) => (
                <li key={spec} className="border border-border px-4 py-3 text-caption text-navy">
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {tab === "Specifications" ? (
          <div className="max-w-3xl space-y-8">
            <h2 className="text-heading text-navy">Specifications</h2>
            {product.specTable.map((group) => (
              <div key={group.group}>
                <p className="label-eyebrow text-teal">{group.group}</p>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border border-border text-caption">
                    <tbody>
                      {group.rows.map((row) => (
                        <tr key={row.label} className="border-b border-border last:border-0">
                          <th scope="row" className="w-1/3 bg-beige px-4 py-3 text-left font-medium text-navy">
                            {row.label}
                          </th>
                          <td className="px-4 py-3 text-muted-foreground">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {tab === "Reviews" ? (
          <div>
            <h2 className="text-heading text-navy">Reviews</h2>
            <div className="mt-8">
              <ReviewsBlock productId={product.id} rating={product.rating} />
            </div>
          </div>
        ) : null}

        {tab === "Support" ? (
          <div className="max-w-2xl">
            <h2 className="text-heading text-navy">Support</h2>
            <p className="mt-4 text-caption leading-relaxed text-muted-foreground">
              Installation, demonstration and servicing for this product are handled by{" "}
              {product.fulfilledBy}. Returns and warranty as per company policy.
            </p>
            <button
              type="button"
              onClick={() => setSupportOpen(true)}
              className="mt-6 bg-navy px-5 py-3 text-body text-primary-foreground transition-colors hover:bg-beige hover:text-navy"
            >
              Contact customer support for terms
            </button>
          </div>
        ) : null}
      </Section>

      <Section className="bg-card">
        <SectionHeading
          eyebrow="Compare with similar"
          title="How this model sits against the alternatives"
        />
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[48rem] border border-border text-caption">
            <thead>
              <tr className="bg-beige text-left">
                <th scope="col" className="px-4 py-3 font-medium text-navy">
                  Model
                </th>
                <th scope="col" className="px-4 py-3 font-medium text-navy">
                  Price
                </th>
                <th scope="col" className="px-4 py-3 font-medium text-navy">
                  Rating
                </th>
                <th scope="col" className="px-4 py-3 font-medium text-navy">
                  Key specification
                </th>
                <th scope="col" className="px-4 py-3 font-medium text-navy">
                  Availability
                </th>
              </tr>
            </thead>
            <tbody>
              {[product, ...similar].map((item: Product) => (
                <tr key={item.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <SmartLink to={`/shop/product/${item.id}`} className="link-gold text-navy">
                      {item.name}
                    </SmartLink>
                    {item.id === product.id ? (
                      <span className="label-eyebrow ml-2 text-teal">This model</span>
                    ) : null}
                  </td>
                  <td className="numeric px-4 py-3 text-navy">{formatPrice(item.price)}</td>
                  <td className="numeric px-4 py-3 text-muted-foreground">
                    {item.rating.toFixed(1)} ({item.reviewCount})
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{item.specs[0]}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.availability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Frequently bought together"
          title="Completed by our installation team"
        />
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center">
          <ul className="flex flex-1 flex-wrap gap-4">
            {bundle.map((item) => (
              <li key={item.id} className="flex w-full max-w-sm items-center gap-4 border border-border p-3">
                <img
                  src={productImage(item.image)}
                  alt={item.name}
                  loading="lazy"
                  className="h-16 w-20 object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-body text-navy">{item.name}</p>
                  <p className="numeric text-caption text-muted-foreground">{formatPrice(item.price)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="border border-border bg-beige p-5 lg:w-72">
            <p className="label-eyebrow text-teal">Bundle total</p>
            <p className="numeric mt-2 text-heading font-semibold text-navy">
              {formatPrice(bundleTotal)}
            </p>
            <button
              type="button"
              onClick={() => bundle.forEach((item) => addToCart(item.id))}
              className="mt-4 w-full bg-navy px-4 py-3 text-body text-primary-foreground transition-colors hover:bg-beige hover:text-navy"
            >
              Add all three to cart
            </button>
          </div>
        </div>
      </Section>

      <Section className="bg-card">
        <SectionHeading eyebrow="You may also like" title="More from this category" />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {similar.map((item) => (
            <li key={item.id}>
              <ProductCard product={item} />
            </li>
          ))}
        </ul>
      </Section>

      <SupportEnquiryDialog
        productName={product.name}
        open={supportOpen}
        onClose={() => setSupportOpen(false)}
      />
    </>
  );
}
