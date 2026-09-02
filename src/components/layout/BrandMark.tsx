import { cn } from "@/lib/utils";
import { SmartLink } from "@/components/common/SmartLink";

/** Placeholder for the group logo: navy square, FABLUXE in gold serif. */
export function BrandMark({ className }: { className?: string | undefined }) {
  return (
    <SmartLink
      to="/"
      aria-label="Fabluxe — home"
      className={cn("flex items-center gap-2 sm:gap-3", className)}
    >
      <span
        className="grid h-9 w-9 shrink-0 place-items-center bg-navy sm:h-10 sm:w-10"
        aria-hidden="true"
      >
        <span className="font-display text-body leading-none text-gold">▲</span>
      </span>
      <span className="font-display text-body tracking-[0.1em] text-gold sm:text-heading sm:tracking-[0.14em]">FABLUXE</span>
    </SmartLink>
  );
}
