import { Star } from "lucide-react";

type TestimonialCardProps = {
  quote: string;
  name: string;
  detail: string;
  rating?: number | undefined;
  /** Card surface: white ("card") on beige bands, beige ("background") on white bands. */
  surface?: "card" | "background" | undefined;
  className?: string | undefined;
};

export function TestimonialCard({
  quote,
  name,
  detail,
  rating,
  surface = "card",
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={`flex h-full flex-col rounded-[12px] border border-border p-5 ${
        surface === "card" ? "bg-card" : "bg-background"
      } ${className ?? ""}`}
    >
      {rating ? (
        <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-3 w-3 text-gold"
              fill={i < rating ? "currentColor" : "none"}
              aria-hidden="true"
            />
          ))}
        </div>
      ) : (
        <span className="rule-gold" aria-hidden="true" />
      )}
      <blockquote className="mt-4 flex-1 text-body leading-relaxed text-navy">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <span
          className="grid h-8 w-8 shrink-0 place-items-center text-body font-medium text-gold"
          aria-hidden="true"
        >
          {name.charAt(0)}
        </span>
        <p className="text-caption font-medium text-navy">
          {name}
          <span className="block font-normal text-muted-foreground">{detail}</span>
        </p>
      </div>
    </div>
  );
}