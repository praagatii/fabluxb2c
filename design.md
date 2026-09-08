# Fabluxe B2C Storefront — Design System

This document is the single source of truth for the visual design of the Fabluxe
B2C storefront. Components never hardcode hex values or font names — everything
below lives in `src/styles.css` and is consumed through Tailwind tokens and
`@utility` classes. A designer can restyle the whole storefront by editing that
one file.

## 1. Brand context

Fabluxe sells "considered appliances and interiors pieces for the modern Indian
home, with installation included." The look is quiet, editorial and premium —
no loud effects, no rounded pills, everything measured.

Division identities sit alongside the storefront (Interior Design, B2B), all
sharing this same design system with different layouts.

## 2. Colour palette

Source of truth: `:root` in `src/styles.css`.

| Token      | Hex       | Usage                                            |
| ---------- | --------- | ------------------------------------------------ |
| `navy`     | `#10223d` | Primary colour, buttons, headings, dark bands    |
| `teal`     | `#567c8d` | Accent, eyebrows, prices-off tags, links         |
| `sky`      | `#c8d9e6` | Soft secondary fills / tints (sky/50, sky/40)    |
| `beige`    | `#f8f7f2` | Page background (default), hover fill on buttons |
| `gold`     | `#c8a45c` | Focus ring, hover accents, gold underline        |

Semantic tokens derived from them:

- `background` = beige, `foreground` = navy
- `card` / `popover` = `#ffffff` (white sections)
- `muted` = `#ece5e0`, `muted-foreground` = `#6b7b8a`
- `border` / `input` = `#dfd8d2`
- `destructive` = `#a4443a`
- `primary` = navy, `secondary` = sky, `accent` = teal

Rule: **no hardcoded hex values in components** (the only tolerated exception is
the `#ececec` image-placeholder background in `ProductCard`). Use tokens only.

## 3. Typography

Two families only.

| Role    | Family                                                   |
| ------- | -------------------------------------------------------- |
| Display | `Fraunces` → `Bodoni Moda` → Georgia, serif (`font-display`) |
| Body    | `Inter` → `Karla` → system, sans (`font-sans` default)   |

Fraunces is reserved for hero and major editorial/display headings. All other
headings (h1–h4 in product, account, support, admin, B2B) inherit Inter.
Headings: `font-weight: 400`, `letter-spacing: -0.01em`.

Type scale (4 core sizes + deliberate micro exception):

| Size       | Value                        | Use                                        |
| ---------- | ---------------------------- | ------------------------------------------ |
| `micro`    | `0.6875rem`                  | Eyebrows and numeric badges only           |
| `caption`  | `0.875rem`                   | Labels, metadata, supporting text          |
| `body`     | `1rem`                       | Copy, nav, buttons, normal UI              |
| `heading`  | `clamp(1.25, 1rem+1vw, 1.5rem)` | Card titles, small section headings     |
| `display`  | `clamp(2.5, 2rem+2vw, 3rem)` | Major editorial / page headings            |
| `hero`     | `clamp(3.5, 2.5rem+3vw, 5rem)` | Full-screen hero only                     |

### Eyebrow labels — `label-eyebrow`

Uppercase micro label, the signature editorial device:

- `font-size: var(--text-micro)`, `font-weight: 600`
- `letter-spacing: 0.22em`, `text-transform: uppercase`
- Colour: `text-teal` normally, `text-gold` on inverse (navy) bands

Use a `label-eyebrow` instead of an `h1`/`h2` for section headers. On editorial
home sections it appears as the *only* heading element (e.g. "Categories",
"Best sellers") with no title below it.

## 4. Shape & radius

`--radius: 0.25rem`. Smooth corners are intentional at `rounded-sm`/`rounded-md`.
**Buttons are rectangular** — never `rounded-full` pills for primary actions
(rounded pills survive only as tiny admin filter chips, not storefront actions).

Cards: `rounded-[12px]` on product/category imagery.

## 5. Spacing & rhythm

| Token              | Value     |
| ------------------ | --------- |
| `--spacing-section`| `4.5rem`  |
| `--spacing-gutter` | `1.25rem` |

- Page container: `max-w-[80rem] mx-auto w-full px-5 sm:px-8` (`Container`)
- Section rhythm: `py-14` (56px) mobile → `sm:py-[var(--spacing-section)]`
  (72px) desktop. This is THE uniform rhythm — every `Section` and every
  page-level content container on the site uses it.
- Card columns: `gap-4`/`gap-5` between cards and in horizontal rails.
- Sections alternate backgrounds to create rhythm: beige (default) → `bg-card`
  (white) → `bg-navy` (inverse) → back again.

## 6. Components & patterns

### Buttons
- Primary: `bg-navy text-primary-foreground`, rectangular, `px-6 py-2.5/3`.
- Hover: `hover:bg-beige hover:text-navy` (navy → beige). This is consistent
  across the whole storefront.
- B2B variant: navy button with `uppercase tracking-[0.18em] text-caption`
  label; hover swaps to beige/navy.
- Borders/outline buttons: `border border-border text-navy hover:border-gold`.
- Danger of stale CSS: any hover state that matters should use an explicit
  authored rule in `styles.css` (see `.hero-cta`, `.header-icon`,
  `.category-card`) rather than relying on Tailwind `hover:` variants.

### ProductCard
- Image: `aspect-square`, rounded 12px, settles at `scale-[1.01]`, zooms to
  `1.05` on hover; second image fades in on hover.
- Badges: navy category chip + optional white badge top-left; wishlist heart
  top-right (gold when wished).
- Body: brand `label-eyebrow`-style uppercase, name `text-base line-clamp-2`,
  price row pinned to the bottom with `mt-auto`.
- **Price row alignment**: price → strikethrough MRP → teal `N% off`, then an
  `Add` button next to the discount (rectangular, `h-8`, `rounded-sm`). The row
  always pins to the card bottom so Add buttons align across a rail regardless
  of name length.

### ProductRail (home "Best sellers")
- Header = `label-eyebrow text-teal` only, no title, no gold rule, no top arrows.
- `gap-4` between the eyebrow and the cards (`mt-4`), matching card card gap.
- Cards: `snap-x snap-mandatory`, snap-start, sizes 16rem → 19.5rem.
- Edge affordance: gradient fades over both edges (from `background`) with a
  circular navy chevron button on each; they are clickable, scroll one card
  (smooth), fade in left when scrolled, right hidden at the end. Driven by
  scroll/resize listeners.

### Category card (home)
`category-card` link: image `aspect-[4/3]`, gradient scrim bottom, name in
Fraunces on beige; image zooms `scale(1.08)` on hover (authored CSS).

### Header icons
`header-icon`: hover scales to `1.15` and turns gold — no background circle.

### Links
`link-gold`: gold underline that draws in from the left on hover
(`scaleX` transition, `--ease-editorial`).

### Hero
Full-screen; heading in `text-hero` Fraunces with deliberate 2-line `<br/>`
breaks; copy + one "Explore" CTA centred under the heading; everything aligned
to the left to the container gutter. Hero image can be a crossfading slideshow
(eager only for the active slide, lazy for the rest).

## 7. Motion

- `--ease-editorial: cubic-bezier(0.22, 0.61, 0.36, 1)` — the only easing.
- Image hovers `0.5s editorial`; buttons `0.25s ease`.
- Page scroll is handled by **Lenis** (native scroll preserved, sticky header
  untouched, no transform). GSAP ScrollTrigger updates on Lenis scroll.
- Native scrollbar hidden on `html, body` (`scrollbar-width: none` etc.).
- Brand strip: infinite marquee (`animate-marquee`, pauses on hover).
- `prefers-reduced-motion`: all animation/transition durations collapse to ~0.

## 8. Focus & usability

- `:focus-visible` → 2px gold outline, 3px offset.
- Every icon-button carries an `aria-label`; images use `loading="lazy"`
  + `decoding="async"` below the fold; hero is eager.
- Tabular numerals for prices via `numeric` utility.

## 9. Navigation

Main nav: `FABLUXE | Shop | Interior Design | B2B` only. No categories/brands/
compare in main nav. Mobile hamburger opens a single-row header (logo + search
input + close). Sensitivity: this hierarchy is a deliberate brand decision — do
not expand it without approval.