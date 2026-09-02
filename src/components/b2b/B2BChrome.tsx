import { Info } from "lucide-react";
import { SmartLink } from "@/components/common/SmartLink";
import { Container } from "@/components/common/Section";
import { b2bBrowseOnlyLine, b2bCategories } from "@/data/b2b";
import { cn } from "@/lib/utils";

/** Small "B2B" chip used on every page in this section. */
export function B2BLabel({ className }: { className?: string | undefined }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-teal px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-beige",
        className,
      )}
    >
      B2B
    </span>
  );
}

/** Teal accented band that visually separates the B2B store from the shop. */
export function B2BHeaderBand() {
  return (
    <div className="bg-teal text-beige">
      <Container>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-3">
          <SmartLink to="/b2b" className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-beige px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-teal">
              B2B
            </span>
            <span className="font-display text-lg leading-none">Fabluxe B2B Store</span>
          </SmartLink>
          <nav aria-label="B2B catalogue" className="ml-auto">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {b2bCategories.map((category) => (
                <li key={category.id}>
                  <SmartLink
                    to={`/b2b/catalogue/${category.slug}`}
                    className="text-[0.7rem] uppercase tracking-[0.18em] text-sky transition-colors hover:text-beige"
                  >
                    {category.name}
                  </SmartLink>
                </li>
              ))}
              <li>
                <SmartLink
                  to="/b2b/enquiry"
                  className="rounded-full border border-beige/60 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-beige transition-colors hover:bg-beige hover:text-teal"
                >
                  Raise an enquiry
                </SmartLink>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  );
}

/** Persistent browse-only line — repeated on every page in the section. */
export function B2BBrowseOnlyLine() {
  return (
    <div className="border-b border-teal/25 bg-sky/45">
      <Container>
        <p className="flex items-start gap-2.5 py-2.5 text-xs leading-relaxed text-navy">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" aria-hidden="true" />
          <span>{b2bBrowseOnlyLine}</span>
        </p>
      </Container>
    </div>
  );
}

/** Page-level heading used on every B2B page so the section is always labelled. */
export function B2BPageMark({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <B2BLabel />
      <span className="label-eyebrow text-teal">{children}</span>
    </div>
  );
}
