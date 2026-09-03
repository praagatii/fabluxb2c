import { Star } from "lucide-react";
import { reviewHighlights } from "@/data/site";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";

export function ReviewHighlights() {
  return (
    <Section>
      <SectionHeading
        eyebrow="What customers say"
        title="Judged on delivery, not on discounts"
        copy="Real notes from recent Fabluxe orders, kept short on purpose."
        align="center"
      />
      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {reviewHighlights.map((review) => (
          <li
            key={review.id}
            className="relative flex flex-col border border-border bg-card p-7 pt-8"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-5 top-2 font-display text-[4.5rem] leading-none text-navy/10"
            >
              “
            </span>
            <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 text-gold"
                  fill={i < review.rating ? "currentColor" : "none"}
                  aria-hidden="true"
                />
              ))}
            </div>
            <blockquote className="mt-5 flex-1 font-display text-heading leading-snug text-navy">
              “{review.quote}”
            </blockquote>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
              <span
                className="grid h-9 w-9 shrink-0 place-items-center font-display text-body text-gold"
                aria-hidden="true"
              >
                {review.author.charAt(0)}
              </span>
              <p className="text-caption font-medium text-navy">
                {review.author}
                <span className="block font-normal text-muted-foreground">{review.location}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
