import { useMemo, useState, type FormEvent } from "react";
import { ImagePlus, Star, ThumbsUp } from "lucide-react";
import { formatReviewDate, ratingDistribution, reviewsForProduct } from "@/data/reviews";
import { cn } from "@/lib/utils";

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("flex items-center gap-0.5", className)} aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className="h-3.5 w-3.5 text-gold"
          fill={star <= Math.round(value) ? "currentColor" : "none"}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export function ReviewsBlock({ productId, rating }: { productId: string; rating: number }) {
  const reviews = useMemo(() => reviewsForProduct(productId), [productId]);
  const distribution = useMemo(() => ratingDistribution(reviews), [reviews]);
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [formRating, setFormRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const visible = starFilter ? reviews.filter((r) => r.rating === starFilter) : reviews;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[20rem_1fr]">
      <div>
        <p className="numeric font-display text-display text-navy">{rating.toFixed(1)}</p>
        <Stars value={rating} className="mt-2" />
        <p className="numeric mt-2 text-caption text-muted-foreground">
          Based on {reviews.length} published reviews
        </p>

        <ul className="mt-6 space-y-2">
          {distribution.map((row) => {
            const percent = reviews.length ? (row.count / reviews.length) * 100 : 0;
            return (
              <li key={row.star}>
                <button
                  type="button"
                  onClick={() => setStarFilter(starFilter === row.star ? null : row.star)}
                  className="flex w-full items-center gap-3 text-left"
                  aria-pressed={starFilter === row.star}
                >
                  <span className="numeric w-10 text-caption text-navy">{row.star} ★</span>
                  <span className="h-2 flex-1 bg-sky/60">
                    <span className="block h-full bg-teal" style={{ width: `${percent}%` }} />
                  </span>
                  <span className="numeric w-6 text-right text-caption text-muted-foreground">
                    {row.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {starFilter ? (
          <button
            type="button"
            onClick={() => setStarFilter(null)}
            className="link-gold mt-4 text-caption text-teal"
          >
            Clear star filter
          </button>
        ) : null}

        <form onSubmit={submit} className="mt-8 border border-border bg-card p-5">
          <p className="label-eyebrow text-teal">Write a review</p>
          {submitted ? (
            <p className="mt-3 text-caption text-muted-foreground">
              Thank you — your review has been received and will appear after moderation.
            </p>
          ) : (
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    aria-label={`Rate ${star} stars`}
                    onClick={() => setFormRating(star)}
                  >
                    <Star
                      className="h-5 w-5 text-gold"
                      fill={star <= formRating ? "currentColor" : "none"}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
              <input
                required
                placeholder="Review title"
                className="w-full border border-border bg-background px-3 py-2 text-body text-navy"
              />
              <textarea
                required
                rows={4}
                placeholder="What stood out about this product?"
                className="w-full border border-border bg-background px-3 py-2 text-body text-navy"
              />
              <label className="flex cursor-pointer items-center gap-2 border border-dashed border-border px-3 py-3 text-caption text-muted-foreground">
                <ImagePlus className="h-4 w-4" aria-hidden="true" />
                Add photos (placeholder — uploads are disabled in this prototype)
                <input type="file" className="sr-only" disabled />
              </label>
              <button
                type="submit"
                className="w-full bg-navy px-4 py-3 text-body text-primary-foreground transition-colors hover:bg-teal"
              >
                Submit review
              </button>
            </div>
          )}
        </form>
      </div>

      <ul className="space-y-6">
        {visible.map((review) => (
          <li key={review.id} className="border-b border-border pb-6">
            <div className="flex flex-wrap items-center gap-3">
              <Stars value={review.rating} />
              <p className="text-heading text-navy">{review.title}</p>
            </div>
            <p className="numeric mt-1 text-caption text-muted-foreground">
              {review.author} · {formatReviewDate(review.date)}
              {review.verified ? (
                <span className="label-eyebrow ml-3 bg-beige px-2 py-1 text-teal">
                  Verified purchase
                </span>
              ) : null}
            </p>
            <p className="mt-3 text-body leading-relaxed text-muted-foreground">{review.body}</p>
            <p className="numeric mt-3 flex items-center gap-2 text-caption text-muted-foreground">
              <ThumbsUp className="h-3.5 w-3.5" aria-hidden="true" /> {review.helpful} found this
              helpful
            </p>
          </li>
        ))}
        {visible.length === 0 ? (
          <li className="text-caption text-muted-foreground">No reviews at this rating yet.</li>
        ) : null}
      </ul>
    </div>
  );
}
