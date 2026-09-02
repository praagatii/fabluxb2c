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
        align="center"
      />
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {reviewHighlights.map((review) => (
          <li key={review.id} className="flex flex-col border border-border bg-card p-6">
            <div className="flex gap-0.5" aria-label={`${review.rating} out of 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 text-gold"
                  fill={i < review.rating ? "currentColor" : "none"}
                  aria-hidden="true"
                />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 font-display text-lg leading-snug text-navy">
              “{review.quote}”
            </blockquote>
            <p className="label-eyebrow mt-5 text-teal">
              {review.author} · {review.location}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
