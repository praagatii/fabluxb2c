import { ChevronRight } from "lucide-react";
import { SmartLink } from "@/components/common/SmartLink";

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-5">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.to ? (
              <SmartLink to={item.to} className="transition-colors hover:text-teal">
                {item.label}
              </SmartLink>
            ) : (
              <span className="text-navy">{item.label}</span>
            )}
            {index < items.length - 1 ? (
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
