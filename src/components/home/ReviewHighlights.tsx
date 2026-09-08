import { reviewHighlights } from "@/data/site";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TestimonialCard } from "@/components/common/TestimonialCard";

export function ReviewHighlights() {
  return (
    <Section>
      <SectionHeading
        eyebrow="What customers say"
        title="Judged on delivery, not on discounts"
        align="center"
      />
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