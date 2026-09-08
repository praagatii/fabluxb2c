import { Link } from "@tanstack/react-router";
import type { AnchorHTMLAttributes } from "react";

type SmartLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  /** Fragment identifier for the target route, e.g. "b2b-categories". */
  hash?: string;
  /** Restrict TanStack Link's active matching to an exact route match. */
  exactActive?: boolean;
};

/** Route prefixes that exist today — these navigate client-side so cart,
 * wishlist and compare state survive the navigation. Everything else falls
 * back to a plain anchor until its route module is built. */
const registered = [
  "/shop",
  "/compare",
  "/wishlist",
  "/cart",
  "/checkout",
  "/account",
  "/order",
  "/interior-design",
  "/b2b",
  "/support",
  "/brands",
  "/collections",
  "/home",
  "/interiors",
];

const isRegistered = (to: string) =>
  to === "/" || registered.some((prefix) => to === prefix || to.startsWith(`${prefix}/`));

export function SmartLink({ to, children, exactActive, ...rest }: SmartLinkProps) {
if (isRegistered(to)) {
    const { href: _href, ...linkProps } = rest;
    return (
      <Link
        to={to as never}
        {...(linkProps as Record<string, unknown>)}
        {...(exactActive ? { activeOptions: { exact: true } } : {})}
      >
        {children}
      </Link>
    );
  }
  return (
    <a href={to} {...rest}>
      {children}
    </a>
  );
}
