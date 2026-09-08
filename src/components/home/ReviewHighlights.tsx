import { reviewHighlights } from "@/data/site";
import { Section } from "@/components/common/Section";
import { TestimonialCard } from "@/components/common/TestimonialCard";

export function ReviewHighlights() {
  return (
    <Section className="pt-0">
      <div className="text-center">
        <span className="rule-gold mx-auto mb-4" aria-hidden="true" />
        <p className="label-eyebrow text-teal">What customers say</p>
      </div>
      <ul className="mt-10 grid gap-6 lg:grid-cols-3">
        {reviewHighlights.map((review) => (
          <li key={review.id} className="h-full">
            <TestimonialCard
              quote={review.quote}
              name={review.author}
              detail={review.location}
              rating={review.rating}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}