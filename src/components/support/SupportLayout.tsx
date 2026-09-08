import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { SmartLink } from "@/components/common/SmartLink";
import { cn } from "@/lib/utils";

/** Sub-navigation for the support section. */
const supportNav = [
  { label: "Contact us", to: "/support" },
  { label: "Shipping", to: "/support/shipping" },
  { label: "Returns & warranty", to: "/support/returns" },
  { label: "Privacy", to: "/support/privacy" },
  { label: "Terms", to: "/support/terms" },
  { label: "FAQ", to: "/support/faq" },
  { label: "About Fabluxe", to: "/support/about" },
];

export function SupportLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="bg-background">
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="pt-8 pb-5">
            <span className="rule-gold mb-4" aria-hidden="true" />
            <p className="label-eyebrow text-teal">Customer Support</p>
            <h1 className="mt-3 font-display text-display text-navy">
              Help and support
            </h1>
          </div>
          <nav aria-label="Support" className="-mb-px flex gap-1 overflow-x-auto">
{supportNav.map((item) => {
              const active = item.to === pathname;
              return (
                <SmartLink
                  key={item.label}
                  to={item.to}
                  exactActive
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "shrink-0 whitespace-nowrap border-b-2 px-3 pb-3 text-body transition-colors",
                    active
                      ? "border-gold font-medium text-navy"
                      : "border-transparent text-muted-foreground hover:text-navy",
                  )}
                >
                  {item.label}
                </SmartLink>
              );
            })}
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}