import { useEffect, useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { HeaderIcons } from "./HeaderIcons";
import { SmartLink } from "@/components/common/SmartLink";
import { divisions } from "@/data/divisions";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

/** Single-line navigation. Everything lives in one row so the header stays calm
 * and the catalogue is understandable at a glance. */
export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight - 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300 [padding-top:env(safe-area-inset-top)] [&_a]:no-underline",
        scrolled
          ? "border-b border-border bg-background backdrop-blur-md"
          : "border-b-0 bg-background/60 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-14 max-w-[80rem] items-center gap-3 px-4 sm:h-16 sm:px-6">
        <BrandMark className="shrink-0" />

        {/* Single-line desktop navigation */}
        <div className="hidden lg:block">
          <NavigationMenu
            className={cn(
              "static",
              "[&>.absolute]:inset-x-0 [&>.absolute]:top-full [&>.absolute]:w-full",
              "[&_[data-slot=navigation-menu-viewport]]:mt-1 [&_[data-slot=navigation-menu-viewport]]:!w-full",
              "[&_[data-slot=navigation-menu-viewport]]:rounded-none [&_[data-slot=navigation-menu-viewport]]:shadow-xl [&_[data-slot=navigation-menu-viewport]]:ring-0",
              "[&_[data-slot=navigation-menu-viewport]]:border-0 [&_[data-slot=navigation-menu-viewport]]:border-b",
              "[&_[data-slot=navigation-menu-viewport]]:border-border",
              "[&_[data-slot=navigation-menu-viewport]]:bg-card",
              "[&_[data-slot=navigation-menu-viewport]]:transition-all [&_[data-slot=navigation-menu-viewport]]:duration-300 [&_[data-slot=navigation-menu-viewport]]:ease-in-out",
            )}
          >
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9 rounded-md bg-transparent px-3 text-body font-medium text-[#15202b] transition-colors hover:bg-navy/5 hover:text-teal focus:bg-navy/5 focus:text-teal data-[active]:bg-navy/5 data-[state=open]:bg-navy/5 data-[state=open]:text-teal">
                  Shop
                </NavigationMenuTrigger>
                <NavigationMenuContent className="!w-full">
                  <div className="mx-auto grid max-w-[80rem] gap-8 px-6 py-10 sm:px-8 lg:grid-cols-6">
                    {/* Departments (divisions) */}
                    <div className="lg:col-span-1">
                      <p className="label-eyebrow text-teal">Departments</p>
                      <ul className="mt-4 space-y-1">
                        {divisions.map((division) => (
                          <li key={division.id}>
                            <SmartLink
                              to={division.to}
                              className="block py-2 text-body font-medium text-[#15202b] transition-colors hover:text-teal"
                            >
                              {division.shortName}
                            </SmartLink>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Categories */}
                    <div className="lg:col-span-4">
                      <p className="label-eyebrow text-teal">Categories</p>
                      <div className="mt-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => (
                          <div key={category.id} className="min-w-0">
                            <div className="rule-gold mb-3" aria-hidden="true" />
                            {category.status === "live" ? (
                              <SmartLink
                                to={`/shop/${category.slug}`}
                                className="link-gold text-heading text-[#15202b]"
                              >
                                {category.name}
                              </SmartLink>
                            ) : (
                              <span className="text-heading text-muted-foreground">
                                {category.name}
                                <span className="label-eyebrow ml-2 text-teal">Coming soon</span>
                              </span>
                            )}
                            <ul className="mt-3 space-y-2">
                              {category.subcategories.map((sub) => (
                                <li key={sub.slug}>
                                  <SmartLink
                                    to={`/shop/${category.slug}/${sub.slug}`}
                                    className="text-caption text-muted-foreground transition-colors hover:text-teal"
                                  >
                                    {sub.name}
                                  </SmartLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Editorial rail */}
                    <div className="hidden lg:col-span-1 lg:block">
                      <p className="label-eyebrow text-teal">Explore</p>
                      <ul className="mt-4 space-y-1">
                        <li>
                          <SmartLink
                            to="/collections"
                            className="block py-2 text-body text-[#15202b] transition-colors hover:text-teal"
                          >
                            Collections
                          </SmartLink>
                        </li>
                        <li>
                          <SmartLink
                            to="/brands"
                            className="block py-2 text-body text-[#15202b] transition-colors hover:text-teal"
                          >
                            Brands
                          </SmartLink>
                        </li>
                        <li>
                          <SmartLink
                            to="/interior-design"
                            className="block py-2 text-body text-[#15202b] transition-colors hover:text-teal"
                          >
                            Interior Design
                          </SmartLink>
                        </li>
                        <li>
                          <SmartLink
                            to="/b2b"
                            className="block py-2 text-body text-[#15202b] transition-colors hover:text-teal"
                          >
                            B2B store
                          </SmartLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <SmartLink
                  to="/interior-design"
                  className="h-9 rounded-md bg-transparent px-3 text-body font-medium text-[#15202b] transition-colors hover:text-teal"
                >
                  Interior Design
                </SmartLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <SmartLink
                  to="/b2b"
                  className="h-9 rounded-md bg-transparent px-3 text-body font-medium text-[#15202b] transition-colors hover:text-teal"
                >
                  B2B
                </SmartLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop search */}
        <div className="hidden flex-1 justify-center px-4 lg:flex">
          <Search
            className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 text-teal"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search products…"
            className="h-10 w-full max-w-xs rounded-md border border-border bg-card pl-3 pr-3 text-body text-[#15202b] placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-teal"
          />
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-1">
          <HeaderIcons />

          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  className="grid h-10 w-10 place-items-center rounded-md text-[#15202b]"
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full bg-beige sm:max-w-sm">
                <div className="flex h-full flex-col overflow-y-auto px-6 py-8">
                  <div className="mb-6 flex items-center justify-between">
                    <BrandMark />
                    <button
                      type="button"
                      onClick={() => setMobileOpen(false)}
                      aria-label="Close menu"
                      className="grid h-9 w-9 place-items-center text-[#15202b]"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Departments at the top of the mobile menu */}
                  <div className="mb-6 grid grid-cols-3 overflow-hidden border border-border">
                    {divisions.map((division) => (
                      <SmartLink
                        key={division.id}
                        to={division.to}
                        onClick={() => setMobileOpen(false)}
                        className="border-border py-3 text-center text-caption font-semibold uppercase tracking-[0.12em] text-[#15202b] [&:not(:last-child)]:border-r"
                      >
                        {division.shortName}
                      </SmartLink>
                    ))}
                  </div>

                  <div className="relative mb-6">
                    <Search
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-teal"
                      aria-hidden="true"
                    />
                    <input
                      type="search"
                      placeholder="Search products…"
                      className="h-11 w-full rounded-md border border-border bg-card pl-9 pr-3 text-body text-[#15202b] placeholder:text-muted-foreground"
                    />
                  </div>

                  <nav className="flex flex-col gap-1">
                    <div className="border-b border-border pb-4">
                      <p className="label-eyebrow text-teal">Shop</p>
                      <ul className="mt-3 space-y-1">
                        {categories.map((category) =>
                          category.status === "live" ? (
                            <li key={category.id}>
                              <SmartLink
                                to={`/shop/${category.slug}`}
                                onClick={() => setMobileOpen(false)}
                                className="block py-2 text-body font-medium text-[#15202b]"
                              >
                                {category.name}
                              </SmartLink>
                            </li>
                          ) : null,
                        )}
                      </ul>
                    </div>

                    <SmartLink
                      to="/interior-design"
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-body font-medium text-[#15202b] transition-colors hover:text-teal"
                    >
                      Interior Design
                    </SmartLink>
                    <SmartLink
                      to="/b2b"
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-body font-medium text-[#15202b] transition-colors hover:text-teal"
                    >
                      B2B store
                    </SmartLink>
                    <SmartLink
                      to="/collections"
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-body font-medium text-[#15202b] transition-colors hover:text-teal"
                    >
                      Collections
                    </SmartLink>
                    <SmartLink
                      to="/brands"
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-body font-medium text-[#15202b] transition-colors hover:text-teal"
                    >
                      Brands
                    </SmartLink>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
