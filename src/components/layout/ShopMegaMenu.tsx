import { categories } from "@/data/categories";
import { SmartLink } from "@/components/common/SmartLink";

export function ShopMegaMenu() {
  return (
    <div className="border-t border-border bg-card shadow-xl">
      <div className="mx-auto grid max-w-[80rem] gap-8 px-8 py-10 lg:grid-cols-4">
        {categories.map((category) => (
          <div key={category.id} className="min-w-0">
            <div className="rule-gold mb-3" aria-hidden="true" />
            {category.status === "live" ? (
              <SmartLink
                to={`/shop/${category.slug}`}
                className="link-gold font-display text-lg text-navy"
              >
                {category.name}
              </SmartLink>
            ) : (
              <span className="font-display text-lg text-muted-foreground">
                {category.name}
                <span className="label-eyebrow ml-2 text-teal">Coming soon</span>
              </span>
            )}
            <ul className="mt-3 space-y-2">
              {category.subcategories.map((sub) => (
                <li key={sub.slug}>
                  <SmartLink
                    to={`/shop/${category.slug}/${sub.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-teal"
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
  );
}
