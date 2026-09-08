import { reviewHighlights } from "@/data/site";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TestimonialCard } from "@/components/common/TestimonialCard";

function ReviewCard({ review }: { review: (typeof reviewHighlights)[number] }) {
  return (
    <div className="pb-4">
      <TestimonialCard
        quote={review.quote}
        name={review.author}
        detail={review.location}
        rating={review.rating}
        surface="background"
      />
    </div>
  );
}

export function ReviewHighlights() {
  return (
    <Section className="bg-card">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <SectionHeading
          eyebrow="What customers say"
          title="Judged on delivery, not on discounts"
          align="left"
        />
        <div className="relative h-[24rem] overflow-hidden sm:h-[26rem]">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-linear-to-b from-card to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-linear-to-t from-card to-transparent"
            aria-hidden="true"
          />
          <div className="animate-testimonials flex flex-col">
            {reviewHighlights.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
            <div aria-hidden="true">
              {reviewHighlights.map((review) => (
                <ReviewCard key={`${review.id}-dup`} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}