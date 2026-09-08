import { ChevronRight } from "lucide-react";
import { SmartLink } from "@/components/common/SmartLink";

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex w-full flex-wrap items-center gap-2 rounded-md border border-teal/15 bg-sky/45 px-4 py-2.5 text-caption text-muted-foreground backdrop-blur-sm">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.to ? (
              <SmartLink to={item.to} className="transition-colors hover:text-teal">
                {item.label}
              </SmartLink>
            ) : (
              <span className="max-w-[16rem] truncate text-navy">{item.label}</span>
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
