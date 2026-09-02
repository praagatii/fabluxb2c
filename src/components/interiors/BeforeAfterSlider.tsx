import { useState } from "react";

export function BeforeAfterSlider({
  before,
  after,
  alt,
}: {
  before: string;
  after: string;
  alt: string;
}) {
  const [position, setPosition] = useState(50);

  return (
    <figure className="space-y-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-border sm:aspect-[16/9]">
        <img
          src={after}
          alt={`${alt} — after`}
          loading="lazy"
          width={1200}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          aria-hidden="true"
        >
          <img
            src={before}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <span
          className="pointer-events-none absolute inset-y-0 w-px bg-gold"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        />
        <span className="absolute left-4 top-4 bg-navy/80 px-3 py-1 text-micro tracking-[0.18em] text-primary-foreground">
          BEFORE
        </span>
        <span className="absolute right-4 top-4 bg-navy/80 px-3 py-1 text-micro tracking-[0.18em] text-primary-foreground">
          AFTER
        </span>
      </div>
      <label className="block">
        <span className="sr-only">Reveal the before and after images</span>
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="w-full accent-[var(--color-teal)]"
        />
      </label>
      <figcaption className="text-caption text-muted-foreground">
        Drag to compare the room before and after the fit-out.
      </figcaption>
    </figure>
  );
}
