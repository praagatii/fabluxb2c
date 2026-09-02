import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnnouncementBar } from "./AnnouncementBar";
import { BrandMark } from "./BrandMark";
import { SearchField } from "./SearchField";
import { HeaderIcons } from "./HeaderIcons";
import { ShopMegaMenu } from "./ShopMegaMenu";
import { SmartLink } from "@/components/common/SmartLink";
import { primaryNav } from "@/data/site";
import { categories } from "@/data/categories";

export function SiteHeader() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-beige/95 backdrop-blur [padding-top:env(safe-area-inset-top)]">
      <AnnouncementBar />

      {/* Top row */}
      <div className="mx-auto flex max-w-[80rem] items-center gap-2 px-4 py-3 sm:gap-4 sm:px-8">
        <button
          type="button"
          className="grid h-10 w-10 shrink-0 place-items-center text-navy lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <Menu className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <BrandMark className="shrink-0" />
        <div className="hidden min-w-0 flex-1 lg:block">
          <SearchField />
        </div>
        <div className="ml-auto lg:ml-0">
          <HeaderIcons />
        </div>
      </div>

      {/* Mobile search */}
      <div className="px-5 pb-3 lg:hidden">
        <SearchField id="site-search-mobile" />
      </div>

      {/* Second row — desktop navigation */}
      <nav
        aria-label="Primary"
        className="hidden border-y border-border lg:block"
        onMouseLeave={() => setMegaOpen(false)}
      >
        <ul className="mx-auto flex max-w-[80rem] items-center gap-8 px-8">
          {primaryNav.map((item) => (
            <li key={item.label}>
              {item.hasMegaMenu ? (
                <button
                  type="button"
                  className="label-eyebrow flex items-center gap-1.5 py-3.5 text-navy transition-colors hover:text-teal"
                  aria-expanded={megaOpen}
                  onMouseEnter={() => setMegaOpen(true)}
                  onClick={() => setMegaOpen((o) => !o)}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              ) : (
                <SmartLink
                  to={item.to}
                  className="label-eyebrow link-gold block py-3.5 text-navy transition-colors hover:text-teal"
                  onMouseEnter={() => setMegaOpen(false)}
                >
                  {item.label}
                </SmartLink>
              )}
            </li>
          ))}
        </ul>
        {megaOpen ? <ShopMegaMenu /> : null}
      </nav>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="border-t border-border bg-card lg:hidden">
          <div className="flex items-center justify-between px-5 py-3">
            <p className="label-eyebrow text-teal">Menu</p>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="grid h-9 w-9 place-items-center text-navy"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <ul className="px-5 pb-6">
            {primaryNav.map((item) => (
              <li key={item.label} className="border-t border-border">
                <SmartLink
                  to={item.to}
                  className="block py-3 text-body font-medium text-navy"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </SmartLink>
                {item.hasMegaMenu ? (
                  <ul className="pb-3">
                    {categories.map((c) => (
                      <li key={c.id}>
                        {c.status === "live" ? (
                          <SmartLink
                            to={`/shop/${c.slug}`}
                            className="block py-1.5 text-caption text-muted-foreground"
                            onClick={() => setMobileOpen(false)}
                          >
                            {c.name}
                          </SmartLink>
                        ) : (
                          <span className="block py-1.5 text-caption text-muted-foreground/70">
                            {c.name} — coming soon
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
