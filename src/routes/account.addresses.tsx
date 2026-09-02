import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { AccountLayout } from "@/components/account/AccountLayout";

const title = "Addresses — Fabluxe Account";
const description = "Manage the delivery addresses saved to your Fabluxe account.";

export const Route = createFileRoute("/account/addresses")({
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
  component: AddressesPage,
});

function AddressesPage() {
  const { addresses, removeAddress } = useAccount();

  return (
    <AccountLayout title="Addresses" crumbs={[{ label: "Addresses" }]}>
      <div className="grid gap-5 sm:grid-cols-2">
        {addresses.map((address) => (
          <article key={address.id} className="border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="label-eyebrow text-teal">{address.label}</p>
              {address.isDefault ? (
                <span className="bg-beige px-2 py-0.5 text-xs text-teal">Default</span>
              ) : null}
            </div>
            <p className="mt-3 text-sm text-navy">{address.name}</p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {address.line1}
              {address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state}{" "}
              {address.pincode}
              <br />
              {address.phone}
            </p>
            <button
              type="button"
              onClick={() => removeAddress(address.id)}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-teal"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              Remove
            </button>
          </article>
        ))}
      </div>
      <p className="mt-5 text-xs text-muted-foreground">
        New addresses are added during checkout in this prototype.
      </p>
    </AccountLayout>
  );
}
