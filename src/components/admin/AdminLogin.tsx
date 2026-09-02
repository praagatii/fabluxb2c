import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { adminRoles, roleBlurb, type AdminRole } from "@/data/admin";
import { cn } from "@/lib/utils";

/** Prototype sign-in: any credentials are accepted. The role switcher exists
 * so the demo can show what each access level sees. */
export function AdminLogin() {
  const { signIn } = useAdmin();
  const [email, setEmail] = useState("rohit@fabluxe.in");
  const [password, setPassword] = useState("demo1234");
  const [role, setRole] = useState<AdminRole>("Director");

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-beige px-4 py-16">
      <div className="w-full max-w-md rounded-md border border-border bg-card p-8">
        <span className="rule-gold mb-3" aria-hidden="true" />
        <p className="label-eyebrow text-teal">Fabluxe admin</p>
        <h1 className="mt-2 font-heading text-2xl text-navy">Sign in to the portal</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Prototype only — any credentials work. Pick a role to preview its access level.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            signIn(email, role);
          }}
        >
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-navy">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-navy outline-none focus:border-teal"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-navy">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-navy outline-none focus:border-teal"
            />
          </label>

          <fieldset>
            <legend className="mb-2 text-xs font-medium text-navy">Demo role</legend>
            <div className="grid grid-cols-2 gap-2">
              {adminRoles.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRole(option)}
                  aria-pressed={role === option}
                  className={cn(
                    "rounded-sm border px-3 py-2 text-sm transition-colors",
                    role === option
                      ? "border-navy bg-navy text-primary-foreground"
                      : "border-border text-navy hover:border-teal",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{roleBlurb[role]}</p>
          </fieldset>

          <button
            type="submit"
            className="w-full rounded-sm bg-navy px-4 py-2.5 text-sm text-primary-foreground transition-opacity hover:opacity-90"
          >
            Sign in as {role}
          </button>
        </form>
      </div>
    </div>
  );
}
