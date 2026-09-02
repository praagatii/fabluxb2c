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
        <div className="mx-auto max-w-2xl text-center">
          <span className="rule-gold mx-auto mb-4" aria-hidden="true" />
          <p className="label-eyebrow text-gold">The Fabluxe Letter</p>
          <h2 className="mt-3 text-3xl text-beige sm:text-4xl">
            New arrivals, private offers and design notes
          </h2>
          <p className="mt-3 text-sm text-sky">
            One considered email a month. No forwarding, no selling of data.
          </p>

          {submitted ? (
            <p className="mt-8 text-sm text-gold" role="status">
              Thank you — we have added {email} to the list.
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mt-8 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]"
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
                className="h-12 w-full border border-teal/60 bg-transparent px-4 text-sm text-beige placeholder:text-sky/60"
              />
              <button
                type="submit"
                className="h-12 bg-beige px-6 text-sm font-medium text-navy transition-colors hover:bg-gold"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
