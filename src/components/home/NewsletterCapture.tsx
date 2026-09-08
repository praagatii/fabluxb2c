import { useState, type FormEvent } from "react";
import { Container } from "@/components/common/Section";

export function NewsletterCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: connect to the client's CRM / mailing list on integration.
    setSubmitted(true);
  };

  return (
    <section className="bg-navy py-14 sm:py-[var(--spacing-section)]">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="max-w-xl">
            <span className="rule-gold mb-5" aria-hidden="true" />
            <p className="label-eyebrow text-gold">The Fabluxe Letter</p>
            <h2 className="mt-3 font-display text-display text-beige">
              New arrivals, private offers and design notes
            </h2>
            <p className="mt-4 max-w-md text-body leading-relaxed text-sky">
              One considered email a month. No forwarding, no selling of data.
            </p>
          </div>

          <div className="lg:justify-self-end lg:text-right">
            {submitted ? (
              <p className="text-body text-gold" role="status">
                Thank you — we have added {email} to the list.
              </p>
            ) : (
              <form
                onSubmit={onSubmit}
                className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] lg:max-w-md"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.name@email.com"
                  className="h-12 w-full border border-teal/50 bg-transparent px-4 text-body text-beige placeholder:text-sky/60 focus:border-gold focus:outline-none"
                />
                <button
                  type="submit"
                  className="h-12 bg-beige px-6 text-body font-medium text-navy transition-colors hover:bg-gold"
                >
                  Subscribe
                </button>
              </form>
            )}
            <p className="mt-5 flex flex-wrap items-center justify-start gap-x-6 gap-y-2 text-caption text-sky/70 lg:justify-end">
              <span>
                Call{" "}
                <a href="tel:18002094455" className="numeric text-beige hover:text-gold">
                  1800 209 4455
                </a>
              </span>
              <span className="hidden text-sky/40 sm:inline">·</span>
              <span>
                <a href="mailto:care@fabluxe.in" className="text-beige hover:text-gold">
                  care@fabluxe.in
                </a>
              </span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
