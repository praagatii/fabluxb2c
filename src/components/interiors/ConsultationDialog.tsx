import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { roomTypes, roomStyles } from "@/data/interiors";

export function ConsultationDialog({
  open,
  onClose,
  context,
}: {
  open: boolean;
  onClose: () => void;
  context?: string | undefined;
}) {
  const [sent, setSent] = useState(false);
  if (!open) return null;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  const field = "border border-border bg-background px-3 py-2 text-body text-navy";

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-navy/70 p-4">
      <div className="w-full max-w-xl bg-card p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="rule-gold mb-3" aria-hidden="true" />
            <p className="label-eyebrow text-teal">Fabluxora Interiors</p>
            <h2 className="mt-2 text-heading text-navy">Book a consultation</h2>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="text-navy">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {sent ? (
          <div className="mt-6 space-y-4">
            <p className="text-caption text-muted-foreground">
              Thank you — a senior designer will call you within one working day to agree a time,
              at the studio or at your home.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="bg-navy px-6 py-3 text-body font-medium text-primary-foreground transition-colors hover:bg-teal"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            {context ? (
              <p className="text-caption text-muted-foreground">
                Enquiry about <span className="text-navy">{context}</span>.
              </p>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Full name" className={field} />
              <input required type="email" placeholder="Email address" className={field} />
              <input required placeholder="Phone number" className={field} />
              <input required placeholder="City" className={field} />
              <select required defaultValue="" className={field} aria-label="Room type">
                <option value="" disabled>
                  Room type
                </option>
                {roomTypes.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.label}
                  </option>
                ))}
              </select>
              <select defaultValue="" className={field} aria-label="Preferred style">
                <option value="">Preferred style (optional)</option>
                {roomStyles.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.name}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              rows={3}
              placeholder="Tell us about the space — floor plan, timeline, how you use the room"
              className={`${field} w-full`}
            />
            <button
              type="submit"
              className="w-full bg-navy px-6 py-2.5 text-body font-medium text-primary-foreground transition-colors hover:bg-teal"
            >
              Request a consultation
            </button>
            <p className="text-caption text-muted-foreground">
              Enquiry only. A designer discusses scope and cost with you directly after the visit.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
