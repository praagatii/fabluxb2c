import { SmartLink } from "@/components/common/SmartLink";
import { cn } from "@/lib/utils";

type EditorialFeatureProps = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  copy: string;
  cta: { label: string; to: string };
  align?: "left" | "right";
};

/** Audo-style full-bleed editorial block: large image with short overlaid copy and a single CTA. */
export function EditorialFeature({
  image,
  alt,
  eyebrow,
  title,
  copy,
  cta,
  align = "left",
}: EditorialFeatureProps) {
  const right = align === "right";
  return (
    <section className="relative w-full overflow-hidden bg-navy">
      <img
        src={image}
        alt={alt}
        width={1600}
        height={900}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className={cn(
          "absolute inset-0",
          right ? "bg-linear-to-l from-navy/85 via-navy/40 to-navy/10" : "bg-linear-to-r from-navy/85 via-navy/40 to-navy/10",
        )}
      />
      <div className={cn("relative mx-auto max-w-[80rem] px-5 py-24 sm:px-8 sm:py-36", right && "flex justify-end")}>
        <div className={cn("max-w-xl", right && "text-right")}>
          <span className={cn("rule-gold mb-5", right && "ml-auto")} aria-hidden="true" />
          <p className="label-eyebrow text-gold">{eyebrow}</p>
          <h2 className="mt-4 font-display text-display text-beige">{title}</h2>
          <p className="mt-5 text-body leading-relaxed text-sky">{copy}</p>
          <SmartLink
            to={cta.to}
            className={cn(
              "mt-8 inline-block border border-beige/70 px-7 py-3.5 text-body font-medium text-beige transition-colors hover:border-gold hover:text-gold",
              right && "ml-auto",
            )}
          >
            {cta.label}
          </SmartLink>
        </div>
      </div>
    </section>
  );
}