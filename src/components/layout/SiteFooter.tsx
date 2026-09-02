import { Mail, MapPin, Phone } from "lucide-react";
import { SmartLink } from "@/components/common/SmartLink";
import { footerColumns, policyLinks, paymentMarks, companies } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-sky">
      <div className="mx-auto max-w-[80rem] px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {footerColumns.map((column) => (
            <div key={column.title} className="min-w-0">
              <p className="label-eyebrow text-gold">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <SmartLink
                      to={link.to}
                      className="text-sm text-sky transition-colors hover:text-gold"
                    >
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="min-w-0">
            <p className="label-eyebrow text-gold">Contact</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                <span className="numeric">1800 209 4455</span>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                <span>care@fabluxe.in</span>
              </li>
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                <span>
                  4th Floor, Prestige Atrium, Residency Road, Bengaluru 560025
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-teal/40 pt-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="min-w-0">
              <p className="text-sm">
                Part of the Fabluxe group —{" "}
                <a
                  href="https://fabluxe.example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-gold text-gold"
                >
                  visit the group website
                </a>
              </p>
              <p className="mt-2 text-xs text-sky/70">
                Electronics fulfilled by {companies.electronics.name} (GSTIN{" "}
                <span className="numeric">{companies.electronics.gstin}</span>). Interiors and
                fittings fulfilled by {companies.interiors.name} (GSTIN{" "}
                <span className="numeric">{companies.interiors.gstin}</span>). Orders containing
                both are invoiced separately under one order reference.
              </p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {paymentMarks.map((mark) => (
                <li
                  key={mark}
                  className="label-eyebrow border border-teal/60 px-2.5 py-1 text-sky/90"
                >
                  {mark}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-teal/40 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <SmartLink to={link.to} className="text-xs text-sky/80 hover:text-gold">
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
            <p className="numeric text-xs text-sky/60">
              © {new Date().getFullYear()} Fabluxe. Prototype build.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
