import { createFileRoute, useRouter } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { useAccount } from "@/context/AccountContext";
import { Container } from "@/components/common/Section";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";

const title = "Sign in — Fabluxe Account";
const description = "Sign in to your Fabluxe account to track orders, invoices and saved items.";

export const Route = createFileRoute("/account/login")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

const inputClass =
  "mt-1.5 w-full border border-border bg-background px-3 py-2.5 text-sm text-navy placeholder:text-muted-foreground";

function LoginPage() {
  const { signIn } = useAccount();
  const router = useRouter();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Mock login: any credentials are accepted.
    const data = new FormData(event.currentTarget);
    signIn(String(data.get("email") ?? "you@example.com"));
    void router.navigate({ to: "/account" });
  };

  return (
    <Container className="pb-24">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Sign in" }]} />
      <div className="mx-auto max-w-md border border-border bg-card p-8">
        <span className="rule-gold" aria-hidden="true" />
        <p className="label-eyebrow mt-4 text-teal">Fabluxe account</p>
        <h1 className="mt-3 font-display text-3xl text-navy">Sign in</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Any email and password will work in this prototype.
        </p>
        <form onSubmit={submit} className="mt-6">
          <label className="block text-xs text-muted-foreground">
            Email
            <input name="email" type="email" required placeholder="you@example.com" className={inputClass} />
          </label>
          <label className="mt-4 block text-xs text-muted-foreground">
            Password
            <input name="password" type="password" required placeholder="••••••••" className={inputClass} />
          </label>
          <button
            type="submit"
            className="mt-6 w-full bg-navy px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-teal"
          >
            Sign in
          </button>
        </form>
      </div>
    </Container>
  );
}
