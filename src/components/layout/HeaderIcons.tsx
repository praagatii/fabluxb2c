import { Heart, ShoppingBag, Scale, User } from "lucide-react";
import { SmartLink } from "@/components/common/SmartLink";
import { useStore } from "@/context/StoreContext";
import { cn } from "@/lib/utils";

function IconLink({
  to,
  label,
  count,
  light,
  className,
  children,
}: {
  to: string;
  label: string;
  count?: number;
  light?: boolean | undefined;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <SmartLink
      to={to}
      aria-label={count ? `${label}, ${count} items` : label}
className={cn(
        "header-icon relative grid h-9 w-9 shrink-0 place-items-center rounded-sm sm:h-10 sm:w-10",
        light ? "header-icon--light text-beige" : "header-icon--dark text-navy",
        className,
      )}
    >
      {children}
      {count && count > 0 ? (
        <span className="numeric absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-micro font-semibold text-navy">
          {count}
        </span>
      ) : null}
    </SmartLink>
  );
}

export function HeaderIcons({ light }: { light?: boolean | undefined }) {
  const { cartCount, wishlistCount, compareCount, openCart } = useStore();
  return (
    <div className="flex items-center gap-0.5">
      <IconLink
        to="/account"
        label="Account"
        light={light}
      >
        <User className="h-5 w-5" aria-hidden="true" />
      </IconLink>
      <IconLink
        to="/wishlist"
        label="Wishlist"
        count={wishlistCount}
        light={light}
      >
        <Heart className="h-5 w-5" aria-hidden="true" />
      </IconLink>
      {/* Compare is reachable on mobile from the persistent compare bar */}
      <IconLink
        to="/compare"
        label="Compare"
        count={compareCount}
        light={light}
        className="hidden sm:grid"
      >
        <Scale className="h-5 w-5" aria-hidden="true" />
      </IconLink>
      <button
        type="button"
        onClick={openCart}
        aria-label={cartCount ? `Cart, ${cartCount} items` : "Cart"}
className={cn(
        "header-icon relative grid h-9 w-9 shrink-0 place-items-center rounded-sm sm:h-10 sm:w-10",
          light ? "header-icon--light text-beige" : "header-icon--dark text-navy",
        )}
      >
        <ShoppingBag className="h-5 w-5" aria-hidden="true" />
        {cartCount > 0 ? (
          <span className="numeric absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-micro font-semibold text-navy">
            {cartCount}
          </span>
        ) : null}
      </button>
    </div>
  );
}
