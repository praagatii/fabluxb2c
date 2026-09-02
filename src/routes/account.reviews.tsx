import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { getProduct } from "@/data/products";
import { AccountLayout } from "@/components/account/AccountLayout";
import { SmartLink } from "@/components/common/SmartLink";

const title = "My reviews — Fabluxe Account";
const description = "Reviews you have written on Fabluxe products.";

export const Route = createFileRoute("/account/reviews")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MyReviewsPage,
});

// Mock: reviews written by the signed-in customer.
const myReviews = [
  {
    productId: "prd-1001",
    rating: 5,
    date: "2026-07-18",
    title: "Runs beautifully quiet",
    body: "Installed in an open kitchen and we genuinely cannot hear it. Delivery team was on time and took the packaging away.",
  },
  {
    productId: "prd-1005",
    rating: 4,
    date: "2026-06-02",
    title: "Excellent picture, average sound",
    body: "Filmmaker mode is superb out of the box. We paired it with a soundbar within a week.",
  },
  {
    productId: "prd-1025",
    rating: 5,
    date: "2026-05-29",
    title: "The fabric is the star",
    body: "Boucle is dense and the frame feels solid. Fabluxora's fitters assembled it in twenty minutes.",
  },
];

function MyReviewsPage() {
  return (
    <AccountLayout title="My reviews" crumbs={[{ label: "My reviews" }]}>
      <ul className="divide-y divide-border border border-border bg-card">
        {myReviews.map((review) => {
          const product = getProduct(review.productId);
          return (
            <li key={review.productId} className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-body text-navy">
                  <SmartLink to={`/shop/product/${review.productId}`} className="link-gold">
                    {product?.name ?? review.productId}
                  </SmartLink>
                </p>
                <p className="text-caption text-muted-foreground">{review.date}</p>
              </div>
              <div className="mt-2 flex items-center gap-1" aria-label={`${review.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={index < review.rating ? "h-3.5 w-3.5 text-gold" : "h-3.5 w-3.5 text-muted"}
                    fill="currentColor"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-3 text-body text-navy">{review.title}</p>
              <p className="mt-1 text-caption leading-relaxed text-muted-foreground">{review.body}</p>
            </li>
          );
        })}
      </ul>
    </AccountLayout>
  );
}
