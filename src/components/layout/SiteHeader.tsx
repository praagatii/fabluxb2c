import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import { BrandMark } from "./BrandMark";
import { HeaderIcons } from "./HeaderIcons";
import { SmartLink } from "@/components/common/SmartLink";
import { categoryGroups } from "@/data/categories";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function SiteHeader() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const threshold = isHome ? window.innerHeight - 80 : 8;
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  const overHero = isHome && !scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 [&_a]:no-underline",
        !overHero
          ? "border-b border-border bg-background/92 shadow-[0_1px_0_var(--color-border)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-[80rem] items-center px-5 sm:h-16 sm:px-8">
        <BrandMark />

        <div className="ml-auto flex items-center gap-1">
          <HeaderIcons light={overHero} />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-sm transition-colors",
                  !overHero ? "text-navy hover:bg-navy/5" : "text-beige hover:bg-white/10",
                )}
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:max-w-sm">
              <div className="flex h-full flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-5 py-6">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center bg-navy"
                    aria-hidden="true"
                  >
                    <span className="font-display text-caption leading-none text-gold">▲</span>
                  </span>
                  <div className="relative min-w-0 flex-1">
                    <input
                      type="search"
                      placeholder="Search products, brands…"
                      className="h-10 w-full rounded-md border border-border bg-card px-3 text-body text-navy placeholder:text-muted-foreground"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="grid h-8 w-8 shrink-0 place-items-center text-navy transition-colors hover:text-teal"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <nav className="flex flex-col">
                  <SmartLink
                    to="/shop"
                    onClick={() => setOpen(false)}
                    className="block rounded-sm border-b border-border/60 py-2 text-body font-medium text-navy transition-colors hover:bg-navy/[0.06]"
                  >
                    Shop
                  </SmartLink>
                  <SmartLink
                    to="/interior-design"
                    onClick={() => setOpen(false)}
                    className="block rounded-sm border-b border-border/60 py-2 text-body font-medium text-navy transition-colors hover:bg-navy/[0.06]"
                  >
                    Interior Design
                  </SmartLink>
                  <SmartLink
                    to="/b2b"
                    onClick={() => setOpen(false)}
                    className="block rounded-sm border-b border-border/60 py-2 text-body font-medium text-navy transition-colors hover:bg-navy/[0.06]"
                  >
                    B2B Store — trade only
                  </SmartLink>

                  <div className="border-b border-border/60 pb-3 pt-3">
                    <p className="label-eyebrow text-teal">Shop by category</p>
                    <ul className="mt-2 space-y-0.5">
                      {categoryGroups
                        .filter((g) => g.status === "live")
                        .map((group) => (
                          <li key={group.id}>
                            <SmartLink
                              to={group.to ?? `/categories/${group.slug}`}
                              onClick={() => setOpen(false)}
                              className="block rounded-sm py-1.5 text-body font-medium text-navy transition-colors hover:bg-navy/[0.06]"
                            >
                              {group.name}
                            </SmartLink>
                          </li>
                        ))}
                    </ul>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
