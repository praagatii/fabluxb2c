import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import { adminNav, AdminBreadcrumbs } from "@/components/admin/AdminChrome";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { adminRoles, type AdminRole } from "@/data/admin";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Fabluxe Admin Portal" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Internal Fabluxe admin portal prototype." },
    ],
  }),
  component: AdminRoot,
});

function AdminRoot() {
  return (
    <AdminProvider>
      <AdminShell />
    </AdminProvider>
  );
}

function AdminShell() {
  const { signedIn, email, role, setRole, signOut, can } = useAdmin();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (!signedIn) return <AdminLogin />;

  return (
    <div className="flex min-h-[80vh] flex-col bg-beige lg:flex-row">
      <aside className="bg-navy px-4 py-6 text-sky lg:w-60 lg:shrink-0">
        <p className="label-eyebrow text-gold">Fabluxe</p>
        <p className="mt-1 text-heading text-primary-foreground">Admin portal</p>
        <nav className="mt-6 flex flex-wrap gap-1 lg:flex-col">
          {adminNav
            .filter((item) => can(item.section))
            .map((item) => {
              const active =
                item.to === "/admin" ? pathname === "/admin" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-sm px-3 py-2 text-body transition-colors",
                    active
                      ? "bg-primary-foreground/12 text-primary-foreground"
                      : "text-sky/80 hover:bg-primary-foreground/8 hover:text-primary-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
        </nav>
        <div className="mt-8 border-t border-primary-foreground/15 pt-4 text-caption text-sky/70">
          <p className="truncate">{email}</p>
          <p className="mt-1">Signed in as {role}</p>
          <button
            onClick={signOut}
            className="mt-3 rounded-sm border border-primary-foreground/30 px-3 py-1.5 text-caption text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-5 py-3">
          <p className="text-caption text-muted-foreground">
            Front-end prototype — no data is saved.
          </p>
          <label className="flex items-center gap-2 text-caption text-muted-foreground">
            Demo role
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as AdminRole)}
              className="rounded-sm border border-border bg-background px-2 py-1 text-caption text-navy"
            >
              {adminRoles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
        </header>
        <div className="px-5 py-6">
          <AdminBreadcrumbs />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
