import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string | undefined;
  align?: "left" | "center" | undefined;
  action?: ReactNode | undefined;
  tone?: "default" | "inverse" | undefined;
  /** Heading level rendered for the title. Use "h1" when this is the page title. */
  as?: "h1" | "h2" | undefined;
  className?: string | undefined;
};

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  action,
  tone = "default",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  const inverse = tone === "inverse";
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center",
        className,
      )}
    >
      <div className={cn("min-w-0", align === "center" && "text-center")}>
        <span
          className={cn("rule-gold mb-4", align === "center" && "mx-auto")}
          aria-hidden="true"
        />
        <p className={cn("label-eyebrow", inverse ? "text-gold" : "text-teal")}>{eyebrow}</p>
        <Heading
          className={cn(
            "font-display mt-3 text-display",
            inverse ? "text-beige" : "text-navy",
          )}
        >
          {title}
        </Heading>

        {copy ? (
          <p
            className={cn(
              "mt-3 max-w-xl text-body leading-relaxed",
              inverse ? "text-sky" : "text-muted-foreground",
              align === "center" && "mx-auto",
            )}
          >
            {copy}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
