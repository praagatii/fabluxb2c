import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/context/AdminContext";
import type { AdminSection } from "@/data/admin";

export const adminNav: { label: string; to: string; section: AdminSection }[] = [
  { label: "Dashboard", to: "/admin", section: "dashboard" },
  { label: "Products", to: "/admin/products", section: "products" },
  { label: "Categories", to: "/admin/categories", section: "categories" },
  { label: "Orders", to: "/admin/orders", section: "orders" },
  { label: "Coupons", to: "/admin/coupons", section: "coupons" },
  { label: "Reviews", to: "/admin/reviews", section: "reviews" },
  { label: "Interior design", to: "/admin/interiors", section: "interiors" },
  { label: "B2B", to: "/admin/b2b", section: "b2b" },
  { label: "Content", to: "/admin/content", section: "content" },
  { label: "Users & access", to: "/admin/users", section: "users" },
];

/* ------------------------------------------------------ primitives */

export function AdminPageHeader({
  eyebrow,
  title,
  copy,
  actions,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 pb-6">
      <div>
        <span className="rule-gold mb-3" aria-hidden="true" />
        <p className="label-eyebrow text-teal">{eyebrow}</p>
        <h1 className="mt-2 text-heading text-navy">{title}</h1>
        {copy ? <p className="mt-2 max-w-2xl text-caption text-muted-foreground">{copy}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function AdminCard({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-md border border-border bg-card", className)}>
      {title ? (
        <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <h2 className="text-body font-medium text-navy">{title}</h2>
          {action}
        </header>
      ) : null}
      <div className="p-4">{children}</div>
    </section>
  );
}

export function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <p className="label-eyebrow text-teal">{label}</p>
      <p className="numeric mt-2 text-heading text-navy">{value}</p>
      {sub ? <p className="mt-1 text-caption text-muted-foreground">{sub}</p> : null}
    </div>
  );
}

const pillTone: Record<string, string> = {
  positive: "bg-teal/12 text-teal",
  neutral: "bg-muted text-muted-foreground",
  warning: "bg-gold/20 text-navy",
  danger: "bg-destructive/12 text-destructive",
};

export function StatusPill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: keyof typeof pillTone;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-caption font-medium tracking-wide",
        pillTone[tone],
      )}
    >
      {children}
    </span>
  );
}

export function AdminTable({
  head,
  children,
}: {
  head: ReactNode[];
  children: ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-border bg-card">
      <table className="w-full min-w-[46rem] border-collapse text-body">
        <thead>
          <tr className="border-b border-border bg-muted/50 text-left">
            {head.map((cell, i) => (
              <th
                key={i}
                className="px-3 py-2 text-caption font-medium uppercase tracking-[0.12em] text-muted-foreground"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Td({ children, className }: { children?: ReactNode; className?: string }) {
  return <td className={cn("border-b border-border px-3 py-2.5 align-middle", className)}>{children}</td>;
}

export function NoAccess({ section }: { section: string }) {
  const { role } = useAdmin();
  return (
    <div className="mx-auto max-w-lg rounded-md border border-border bg-card p-10 text-center">
      <Lock className="mx-auto h-6 w-6 text-teal" aria-hidden="true" />
      <h2 className="mt-4 text-heading text-navy">You don't have access to this</h2>
      <p className="mt-2 text-body text-muted-foreground">
        {section} is restricted. You are signed in as <strong className="text-navy">{role}</strong>.
        Ask a Director to change your access level.
      </p>
      <Link
        to="/admin"
        className="mt-6 inline-flex items-center justify-center rounded-sm bg-navy px-4 py-2 text-body text-primary-foreground transition-opacity hover:opacity-90"
      >
        Back to dashboard
      </Link>
    </div>
  );
}

/** Section wrapper: renders the no-access state when the role is locked out. */
export function AdminGuard({
  section,
  label,
  children,
}: {
  section: AdminSection;
  label: string;
  children: ReactNode;
}) {
  const { can } = useAdmin();
  if (!can(section)) return <NoAccess section={label} />;
  return <>{children}</>;
}

/** Read-only banner for the Viewer role. */
export function ReadOnlyNote({ section }: { section: AdminSection }) {
  const { mayEdit, role } = useAdmin();
  if (mayEdit(section)) return null;
  return (
    <p className="mb-4 rounded-sm border border-border bg-sky/40 px-3 py-2 text-caption text-navy">
      Read-only — the {role} role can browse this section but not make changes.
    </p>
  );
}

/* ------------------------------------------------------ breadcrumbs */

const crumbLabel = (segment: string) =>
  segment.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());

export function AdminBreadcrumbs() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const parts = pathname.split("/").filter(Boolean).slice(1);

  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-2 text-caption text-muted-foreground">
        <li className="flex items-center gap-2">
          <Link to="/admin" className="transition-colors hover:text-teal">
            Admin
          </Link>
          {parts.length ? <ChevronRight className="h-3 w-3" aria-hidden="true" /> : null}
        </li>
        {parts.map((part, index) => (
          <li key={`${part}-${index}`} className="flex items-center gap-2">
            <span className={index === parts.length - 1 ? "text-navy" : undefined}>
              {crumbLabel(part)}
            </span>
            {index < parts.length - 1 ? (
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
