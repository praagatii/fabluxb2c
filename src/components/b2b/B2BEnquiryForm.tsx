import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { SmartLink } from "@/components/common/SmartLink";
import { B2BLabel } from "./B2BChrome";
import { b2bProducts } from "@/data/b2b";

/** Mock reference — the client has no enquiry-numbering format yet, this is a placeholder. */
const makeReference = () =>
  `FBX-B2B-${String(Math.floor(1000 + Math.random() * 8999))}`;

const field =
  "w-full border border-border bg-card px-3 py-2.5 text-body text-navy placeholder:text-muted-foreground focus:border-teal focus:outline-none";
const labelClass = "block text-caption uppercase tracking-[0.18em] text-teal";

export function B2BEnquiryForm({ initialProductId }: { initialProductId?: string | undefined }) {
  const initial = initialProductId
    ? b2bProducts.find((p) => p.id === initialProductId)
    : undefined;
  const [interest, setInterest] = useState(initial ? `${initial.name} (${initial.sku})` : "");
  const [reference, setReference] = useState<string | null>(null);

  if (reference) {
    return (
      <div className="border border-teal/40 bg-sky/40 p-8 sm:p-10">
        <CheckCircle2 className="h-8 w-8 text-teal" aria-hidden="true" />
        <div className="mt-4 flex items-center gap-3">
          <B2BLabel />
          <span className="label-eyebrow text-teal">Enquiry received</span>
        </div>
        <h2 className="mt-3 font-display text-display text-navy">Your enquiry is with the trade desk</h2>
        <p className="mt-3 text-caption text-muted-foreground">Reference number</p>
        <p className="numeric mt-1 text-heading text-navy">{reference}</p>
        <ul className="mt-6 space-y-3 text-body leading-relaxed text-muted-foreground">
          <li>1. A trade account manager reviews the specification within one working day.</li>
          <li>2. We confirm availability, lead time and delivery phasing for your site.</li>
          <li>3. A written quotation follows by email against your reference number.</li>
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <SmartLink
            to="/b2b"
            className="bg-navy px-5 py-3 text-caption uppercase tracking-[0.18em] text-beige transition-colors hover:bg-teal"
          >
            Back to the catalogue
          </SmartLink>
          <button
            type="button"
            onClick={() => setReference(null)}
            className="border border-navy px-5 py-3 text-caption uppercase tracking-[0.18em] text-navy transition-colors hover:bg-navy hover:text-beige"
          >
            Raise another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="space-y-5 border border-border bg-card p-6 sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setReference(makeReference());
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="b2b-company">
            Company name
          </label>
          <input id="b2b-company" name="company" required className={`mt-2 ${field}`} />
        </div>
        <div>
          <label className={labelClass} htmlFor="b2b-contact">
            Contact person
          </label>
          <input id="b2b-contact" name="contact" required className={`mt-2 ${field}`} />
        </div>
        <div>
          <label className={labelClass} htmlFor="b2b-email">
            Email
          </label>
          <input id="b2b-email" name="email" type="email" required className={`mt-2 ${field}`} />
        </div>
        <div>
          <label className={labelClass} htmlFor="b2b-phone">
            Phone
          </label>
          <input id="b2b-phone" name="phone" type="tel" required className={`mt-2 ${field}`} />
        </div>
        <div>
          <label className={labelClass} htmlFor="b2b-gst">
            GST number <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input id="b2b-gst" name="gst" className={`mt-2 ${field}`} placeholder="27AAACF1234F1Z5" />
        </div>
        <div>
          <label className={labelClass} htmlFor="b2b-city">
            City
          </label>
          <input id="b2b-city" name="city" required className={`mt-2 ${field}`} />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="b2b-interest">
          Product(s) of interest
        </label>
        <input
          id="b2b-interest"
          name="interest"
          required
          value={interest}
          onChange={(event) => setInterest(event.target.value)}
          placeholder="Door furniture, soft-close hardware…"
          className={`mt-2 ${field}`}
        />
        {initial ? (
          <p className="mt-2 text-caption text-muted-foreground">
            Pre-filled from {initial.name}. Add more items on the same line if the enquiry covers a
            package.
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="b2b-quantity">
            Quantity required
          </label>
          <input
            id="b2b-quantity"
            name="quantity"
            required
            placeholder="e.g. 250 sets"
            className={`mt-2 ${field}`}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="b2b-timeline">
            Required by <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input id="b2b-timeline" name="timeline" placeholder="Month or phase" className={`mt-2 ${field}`} />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="b2b-message">
          Message
        </label>
        <textarea
          id="b2b-message"
          name="message"
          rows={5}
          placeholder="Project type, site location, finish schedule or drawing references."
          className={`mt-2 ${field}`}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-navy px-6 py-2.5 text-caption uppercase tracking-[0.18em] text-beige transition-colors hover:bg-teal sm:w-auto"
      >
        Submit enquiry
      </button>
      <p className="text-caption text-muted-foreground">
        No payment is taken here. The B2B store is a browsing catalogue — every order is confirmed
        by the trade desk against a written quotation.
      </p>
    </form>
  );
}
