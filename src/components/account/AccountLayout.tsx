import type { ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
import { Container } from "@/components/common/Section";
import { Breadcrumbs, type Crumb } from "@/components/shop/Breadcrumbs";
import { SmartLink } from "@/components/common/SmartLink";
import { useAccount } from "@/context/AccountContext";

const navItems = [
  { label: "Orders", to: "/account" },
  { label: "Addresses", to: "/account/addresses" },
  { label: "Wishlist", to: "/account/wishlist" },
  { label: "My reviews", to: "/account/reviews" },
  { label: "Profile", to: "/account/profile" },
  { label: "Support requests", to: "/account/support" },
];

export function AccountLayout({
  title,
  eyebrow = "Your account",
  crumbs = [],
  children,
}: {
  title: string;
  eyebrow?: string;
  crumbs?: Crumb[];
  children: ReactNode;
}) {
  const { signOut, signedIn, user } = useAccount();
  const router = useRouter();

  return (
    <div className="pb-24">
      <Container>
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Account", to: "/account" }, ...crumbs]} />
        <span className="rule-gold mb-4" aria-hidden="true" />
        <p className="label-eyebrow text-teal">{eyebrow}</p>
        <h1 className="mt-3 text-heading text-navy">{title}</h1>
        {signedIn && user ? (
          <p className="mt-3 text-caption text-muted-foreground">
            Signed in as {user.name} · {user.email}
          </p>
        ) : (
          <p className="mt-3 text-caption text-muted-foreground">
            You are browsing as a guest.{" "}
            <SmartLink to="/account/login" className="text-teal link-gold">
              Sign in
            </SmartLink>{" "}
            to see live order data.
          </p>
        )}
      </Container>

      <Container className="grid gap-10 py-14 sm:py-[var(--spacing-section)] lg:grid-cols-[16rem_minmax(0,1fr)]">
        <nav aria-label="Account sections" className="h-fit border border-border bg-card">
          <ul className="divide-y divide-border">
            {navItems.map((item) => (
              <li key={item.to}>
                <SmartLink
                  to={item.to}
                  className="block px-5 py-2.5 text-body text-navy transition-colors hover:bg-sky/40 hover:text-teal"
                >
                  {item.label}
                </SmartLink>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  signOut();
                  void router.navigate({ to: "/account/login" });
                }}
                className="block w-full px-5 py-2.5 text-left text-body text-muted-foreground transition-colors hover:bg-sky/40 hover:text-teal"
              >
                Sign out
              </button>
            </li>
          </ul>
        </nav>

        <div className="min-w-0">{children}</div>
      </Container>
    </div>
  );
}

export function StatusChip({ status }: { status: string }) {
  return (
    <span className="label-eyebrow inline-block bg-sky/60 px-2.5 py-1 text-navy">{status}</span>
  );
}
