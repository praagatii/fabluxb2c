import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MessageSquare, Phone, CalendarDays, X } from "lucide-react";
import { designerPhone, designerPhoneHref } from "@/data/consultation";

export function TalkToDesigner() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {open ? (
        <div className="w-64 border border-border bg-card p-5 shadow-xl">
          <span className="rule-gold mb-3" aria-hidden="true" />
          <p className="label-eyebrow text-teal">Fabluxora Interiors</p>
          <p className="mt-2 text-heading text-navy">Talk to a designer</p>
          <a
            href={designerPhoneHref}
            className="mt-4 flex items-center gap-3 border border-border px-3 py-3 text-body text-navy transition-colors hover:border-gold"
          >
            <Phone className="h-4 w-4 text-teal" aria-hidden="true" />
            <span>
              Call now
              <span className="block text-caption text-muted-foreground">{designerPhone}</span>
            </span>
          </a>
          <Link
            to="/interior-design/consultation"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center gap-3 bg-navy px-3 py-3 text-body text-primary-foreground transition-colors hover:bg-beige hover:text-navy"
          >
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Book a consultation
          </Link>
          <p className="mt-3 text-caption text-muted-foreground">
            Studio hours 9:30–18:30, Monday to Saturday.
          </p>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex items-center gap-2 bg-navy px-5 py-2.5 text-body font-medium text-primary-foreground shadow-lg transition-colors hover:bg-beige hover:text-navy"
      >
        {open ? (
          <X className="h-4 w-4" aria-hidden="true" />
        ) : (
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
        )}
        {open ? "Close" : "Talk to a designer"}
      </button>
    </div>
  );
}
