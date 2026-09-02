import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AccountLayout, StatusChip } from "@/components/account/AccountLayout";

const title = "Support requests — Fabluxe Account";
const description = "Track your Fabluxe support requests for installation, warranty and returns.";

export const Route = createFileRoute("/account/support")({
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
  component: SupportPage,
});

// Mock support tickets.
const tickets = [
  {
    id: "SR-2026-0451",
    subject: "Installation slot change — Aureus refrigerator",
    order: "FBX-2026-000132",
    raised: "2026-08-20",
    status: "In progress",
  },
  {
    id: "SR-2026-0388",
    subject: "Warranty registration confirmation",
    order: "FBX-2026-000118",
    raised: "2026-07-05",
    status: "Resolved",
  },
];

function SupportPage() {
  const [sent, setSent] = useState(false);

  return (
    <AccountLayout title="Support requests" crumbs={[{ label: "Support requests" }]}>
      <ul className="divide-y divide-border border border-border bg-card">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="flex flex-wrap items-center gap-4 p-5">
            <div className="min-w-0 flex-1">
              <p className="numeric text-sm font-semibold text-navy">{ticket.id}</p>
              <p className="mt-1 text-sm text-navy">{ticket.subject}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Order {ticket.order} · raised {ticket.raised}
              </p>
            </div>
            <StatusChip status={ticket.status} />
          </li>
        ))}
      </ul>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
        className="mt-8 border border-border bg-card p-6"
      >
        <p className="label-eyebrow text-teal">Raise a new request</p>
        <label className="mt-4 block text-xs text-muted-foreground">
          Subject
          <input
            required
            placeholder="What do you need help with?"
            className="mt-1.5 w-full border border-border bg-background px-3 py-2.5 text-sm text-navy placeholder:text-muted-foreground"
          />
        </label>
        <label className="mt-4 block text-xs text-muted-foreground">
          Details
          <textarea
            required
            rows={4}
            placeholder="Share the order ID and what happened."
            className="mt-1.5 w-full border border-border bg-background px-3 py-2.5 text-sm text-navy placeholder:text-muted-foreground"
          />
        </label>
        <button
          type="submit"
          className="mt-5 bg-navy px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-teal"
        >
          Submit request
        </button>
        {sent ? (
          <p className="mt-3 text-xs text-teal">
            Request logged. Our team replies within one working day.
          </p>
        ) : null}
      </form>
    </AccountLayout>
  );
}
