import { useState, type FormEvent } from "react";
import { X } from "lucide-react";

export function SupportEnquiryDialog({
  productName,
  open,
  onClose,
}: {
  productName: string;
  open: boolean;
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);
  if (!open) return null;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy/70 p-4">
      <div className="w-full max-w-lg bg-card p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="rule-gold mb-3" aria-hidden="true" />
            <p className="label-eyebrow text-teal">Customer support</p>
            <h2 className="mt-2 font-display text-2xl text-navy">Contact us for terms</h2>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="text-navy">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {sent ? (
          <p className="mt-6 text-sm text-muted-foreground">
            Thank you — a Fabluxe support advisor will respond to your enquiry about{" "}
            <span className="text-navy">{productName}</span> within one working day.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              Enquiry regarding <span className="text-navy">{productName}</span>.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="Full name"
                className="border border-border bg-background px-3 py-2 text-sm text-navy"
              />
              <input
                required
                type="email"
                placeholder="Email address"
                className="border border-border bg-background px-3 py-2 text-sm text-navy"
              />
            </div>
            <input
              required
              placeholder="Phone number"
              className="w-full border border-border bg-background px-3 py-2 text-sm text-navy"
            />
            <textarea
              required
              rows={4}
              placeholder="What would you like to know?"
              className="w-full border border-border bg-background px-3 py-2 text-sm text-navy"
            />
            <button
              type="submit"
              className="w-full bg-navy px-4 py-3 text-sm text-primary-foreground transition-colors hover:bg-teal"
            >
              Send enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
