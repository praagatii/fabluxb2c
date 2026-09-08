import { Star } from "lucide-react";

type TestimonialCardProps = {
  quote: string;
  name: string;
  detail: string;
  rating?: number | undefined;
  /** Card surface: white ("card"), beige ("background") or navy ("navy"). */
  surface?: "card" | "background" | "navy" | undefined;
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
  const naval = surface === "navy";
  return (
    <div
      className={`flex h-full flex-col rounded-[12px] p-4 ${
        naval
          ? "border border-teal/40 bg-navy"
          : surface === "card"
            ? "border border-border bg-card"
            : "border border-border bg-background"
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
      <blockquote
        className={`mt-3 flex-1 text-caption leading-relaxed ${naval ? "text-beige" : "text-navy"}`}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-4 flex items-center gap-2.5 border-t border-border pt-3">
        <span
          className="grid h-6 w-6 shrink-0 place-items-center text-micro font-medium text-gold"
          aria-hidden="true"
        >
          {name.charAt(0)}
        </span>
        <p className={`text-micro font-medium leading-tight ${naval ? "text-beige" : "text-navy"}`}>
          {name}
          <span className={`block font-normal ${naval ? "text-sky" : "text-muted-foreground"}`}>
            {detail}
          </span>
        </p>
      </div>
    </div>
  );
}