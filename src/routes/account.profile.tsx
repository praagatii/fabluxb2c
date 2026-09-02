import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAccount } from "@/context/AccountContext";
import { AccountLayout } from "@/components/account/AccountLayout";

const title = "Profile — Fabluxe Account";
const description = "Your Fabluxe profile details, contact preferences and password.";

export const Route = createFileRoute("/account/profile")({
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
  component: ProfilePage,
});

const inputClass =
  "mt-1.5 w-full border border-border bg-background px-3 py-2.5 text-body text-navy placeholder:text-muted-foreground";

function ProfilePage() {
  const { user } = useAccount();
  const [saved, setSaved] = useState(false);

  return (
    <AccountLayout title="Profile" crumbs={[{ label: "Profile" }]}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
        }}
        className="grid gap-5 border border-border bg-card p-6 sm:grid-cols-2"
      >
        <label className="block text-caption text-muted-foreground">
          Full name
          <input defaultValue={user?.name ?? "Samarth Shetty"} className={inputClass} />
        </label>
        <label className="block text-caption text-muted-foreground">
          Phone
          <input defaultValue={user?.phone ?? "+91 98450 22110"} className={inputClass} />
        </label>
        <label className="block text-caption text-muted-foreground">
          Email
          <input defaultValue={user?.email ?? "samarth@example.com"} className={inputClass} />
        </label>
        <label className="block text-caption text-muted-foreground">
          New password
          <input type="password" placeholder="••••••••" className={inputClass} />
        </label>
        <label className="flex items-center gap-2 text-caption text-muted-foreground sm:col-span-2">
          <input type="checkbox" defaultChecked className="h-4 w-4 accent-[var(--color-teal)]" />
          Email me about offers, new arrivals and interior design events.
        </label>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="bg-navy px-6 py-3.5 text-body font-medium text-primary-foreground transition-colors hover:bg-teal"
          >
            Save changes
          </button>
          {saved ? <span className="ml-4 text-caption text-teal">Profile updated.</span> : null}
        </div>
      </form>
    </AccountLayout>
  );
}
