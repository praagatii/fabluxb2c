import { Mail, MapPin, Phone } from "lucide-react";
import { SmartLink } from "@/components/common/SmartLink";
import { footerColumns, policyLinks, companies } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-sky">
      <div className="mx-auto max-w-[80rem] px-5 pt-12 pb-[max(4rem,env(safe-area-inset-bottom))] sm:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title} className="min-w-0">
              <p className="label-eyebrow text-gold">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <SmartLink
                      to={link.to}
                      className="text-body text-sky transition-colors hover:text-gold"
                    >
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-teal/40 pt-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 shrink-0 text-teal" aria-hidden="true" />
              <span className="numeric">1800 209 4455</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 shrink-0 text-teal" aria-hidden="true" />
              <span>care@fabluxe.in</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" aria-hidden="true" />
              <span>4th Floor, Prestige Atrium, Residency Road, Bengaluru 560025</span>
            </li>
          </ul>
          <p className="mt-3 text-caption text-sky/70">
            Electronics fulfilled by {companies.electronics.name} (GSTIN{" "}
            <span className="numeric">{companies.electronics.gstin}</span>). Interiors and
            fittings fulfilled by {companies.interiors.name} (GSTIN{" "}
            <span className="numeric">{companies.interiors.gstin}</span>). Orders containing
            both are invoiced separately under one order reference.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-teal/40 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {policyLinks.map((link) => (
              <li key={link.label}>
                <SmartLink to={link.to} className="text-caption text-sky/80 hover:text-gold">
                  {link.label}
                </SmartLink>
              </li>
            ))}
          </ul>
          <p className="numeric text-caption text-sky/60">
            © {new Date().getFullYear()} Fabluxe. Prototype build.
          </p>
        </div>
      </div>
    </footer>
  );
}