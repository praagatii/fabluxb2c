import { useState } from "react";
import { Mail, MapPin, Phone, Search } from "lucide-react";
import { SmartLink } from "@/components/common/SmartLink";
import { supportChannels, groupUrl } from "@/data/support";

export function SupportContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
      {/* Contact channels */}
      <div className="order-2 lg:order-1">
        <div className="grid gap-5 sm:grid-cols-3">
          {supportChannels.map((channel) => (
            <div key={channel.id} className="border border-border bg-card p-6">
              <p className="label-eyebrow text-teal">{channel.title}</p>
              {channel.to ? (
                <SmartLink
                  to={channel.to}
                  className="mt-3 block text-body font-medium text-navy transition-colors hover:text-teal"
                >
                  {channel.value}
                </SmartLink>
              ) : (
                <p className="mt-3 text-body font-medium text-navy">{channel.value}</p>
              )}
              <p className="mt-2 text-caption leading-relaxed text-muted-foreground">{channel.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <span className="rule-gold mb-4" aria-hidden="true" />
          <p className="label-eyebrow text-teal">Frequently asked</p>
          <h2 className="mt-3 text-heading text-navy">Quick answers</h2>
          <ul className="mt-5 space-y-3">
            {[
              "How do I track my order?",
              "How do returns and warranty work?",
              "My order ships from two companies — why?",
            ].map((q) => (
              <li key={q}>
                <SmartLink
                  to="/support/faq"
                  className="group flex items-center justify-between border border-border bg-card px-5 py-4 text-body text-navy transition-colors hover:border-teal"
                >
                  {q}
                  <Search className="h-4 w-4 text-teal" aria-hidden="true" />
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Enquiry form */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
        className="order-1 h-fit border border-border bg-card p-6 lg:order-2"
      >
        <span className="rule-gold mb-4" aria-hidden="true" />
        <p className="label-eyebrow text-teal">Send an enquiry</p>
        <h2 className="mt-3 text-heading text-navy">We'll take it from here</h2>
        <p className="mt-2 text-caption text-muted-foreground">
          An order ID helps us find your details instantly, but isn't required.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block text-caption text-muted-foreground">
            Name
            <input
              required
              placeholder="Your full name"
              className="mt-1.5 w-full border border-border bg-background px-3 py-2.5 text-body text-navy placeholder:text-muted-foreground"
            />
          </label>
          <label className="block text-caption text-muted-foreground">
            Email
            <input
              required
              type="email"
              placeholder="you@example.com"
              className="mt-1.5 w-full border border-border bg-background px-3 py-2.5 text-body text-navy placeholder:text-muted-foreground"
            />
          </label>
          <label className="block text-caption text-muted-foreground">
            Phone
            <input
              required
              type="tel"
              placeholder="10-digit mobile"
              className="mt-1.5 w-full border border-border bg-background px-3 py-2.5 text-body text-navy placeholder:text-muted-foreground"
            />
          </label>
          <label className="block text-caption text-muted-foreground">
            Order ID <span className="text-muted-foreground/70">(optional)</span>
            <input
              placeholder="e.g. FBX-2026-000148"
              className="mt-1.5 w-full border border-border bg-background px-3 py-2.5 text-body text-navy placeholder:text-muted-foreground"
            />
          </label>
        </div>

        <label className="mt-4 block text-caption text-muted-foreground">
          Subject
          <select
            required
            className="mt-1.5 w-full border border-border bg-background px-3 py-2.5 text-body text-navy"
          >
            <option value="">Choose a topic</option>
            <option>Order & delivery</option>
            <option>Installation or demo</option>
            <option>Return or warranty claim</option>
            <option>Service or spares</option>
            <option>Interior design consultation</option>
            <option>B2B enquiry</option>
            <option>Something else</option>
          </select>
        </label>

        <label className="mt-4 block text-caption text-muted-foreground">
          Message
          <textarea
            required
            rows={5}
            placeholder="Tell us what you need help with."
            className="mt-1.5 w-full border border-border bg-background px-3 py-2.5 text-body text-navy placeholder:text-muted-foreground"
          />
        </label>

        <button
          type="submit"
          className="mt-5 w-full bg-navy px-6 py-3.5 text-body font-medium text-primary-foreground transition-colors hover:bg-teal"
        >
          Send enquiry
        </button>

        {sent ? (
          <p className="mt-4 border border-teal/40 bg-teal/5 p-4 text-caption text-teal">
            Thanks — your enquiry is logged. Our team replies within one working day.
          </p>
        ) : null}
      </form>
    </div>
  );
}

export function SupportContactDetails() {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      <div className="flex gap-3 border border-border bg-card p-5">
        <Phone className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
        <div>
          <p className="label-eyebrow text-teal">Call</p>
          <p className="numeric mt-1 text-body font-medium text-navy">1800 209 4455</p>
        </div>
      </div>
      <div className="flex gap-3 border border-border bg-card p-5">
        <Mail className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
        <div>
          <p className="label-eyebrow text-teal">Email</p>
          <p className="mt-1 text-body font-medium text-navy">care@fabluxe.in</p>
        </div>
      </div>
      <div className="flex gap-3 border border-border bg-card p-5">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
        <div>
          <p className="label-eyebrow text-teal">Visit</p>
          <p className="mt-1 text-body text-navy">
            4th Floor, Prestige Atrium, Residency Road, Bengaluru 560025
          </p>
        </div>
      </div>
      <p className="text-caption text-muted-foreground">
        Part of the Fabluxe group —{" "}
        <a
          href={groupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-gold text-gold"
        >
          visit the group website
        </a>
      </p>
    </div>
  );
}