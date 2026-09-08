import { Info } from "lucide-react";
import { SmartLink } from "@/components/common/SmartLink";
import { Container } from "@/components/common/Section";
import { b2bBrowseOnlyLine } from "@/data/b2b";
import { cn } from "@/lib/utils";

/** Small "B2B" chip used on every page in this section. */
export function B2BLabel({ className }: { className?: string | undefined }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm bg-teal px-2.5 py-1 text-micro font-semibold uppercase tracking-[0.22em] text-beige",
        className,
      )}
    >
      B2B
    </span>
  );
}

/** Navy accented band that visually separates the B2B store from the shop. */
export function B2BHeaderBand() {
  return (
    <div className="bg-navy text-beige">
      <div className="mx-auto flex h-14 max-w-[80rem] flex-wrap items-center gap-x-6 px-5 sm:h-16 sm:px-8">
        <SmartLink to="/b2b" className="flex items-center gap-3">
          <span className="inline-flex items-center rounded-sm bg-teal px-2.5 py-1 text-micro font-semibold uppercase tracking-[0.22em] text-beige">
            B2B
          </span>
          <span className="font-display text-heading leading-none text-beige">
            Fabluxe B2B Store
          </span>
        </SmartLink>
        <nav aria-label="B2B catalogue" className="ml-auto">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <SmartLink
                to="/b2b"
                hash="b2b-categories"
                className="text-caption uppercase tracking-[0.18em] text-sky transition-colors hover:text-gold"
              >
                Categories
              </SmartLink>
            </li>
            <li>
              <SmartLink
                to="/b2b/enquiry"
                className="rounded-sm border border-beige/60 px-3 py-1.5 text-caption uppercase tracking-[0.18em] text-beige transition-colors hover:bg-beige hover:text-navy"
              >
                Raise an enquiry
              </SmartLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

/** Persistent browse-only line — repeated on every page in the section. */
export function B2BBrowseOnlyLine() {
  return (
    <div className="border-b border-teal/25 bg-sky/45">
      <Container>
        <p className="flex items-start gap-2.5 py-2.5 text-caption leading-relaxed text-navy">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" aria-hidden="true" />
          <span>{b2bBrowseOnlyLine}</span>
        </p>
      </Container>
    </div>
  );
}

/** Page-level heading used on every B2B page so the section is always labelled. */
export function B2BPageMark({
  children,
  inverse,
}: {
  children: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <B2BLabel />
      <span className={cn("label-eyebrow", inverse ? "text-beige" : "text-teal")}>
        {children}
      </span>
    </div>
  );
}
