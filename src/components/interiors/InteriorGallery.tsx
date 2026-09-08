import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { interiorImage } from "@/lib/interior-images";
import type { InteriorImageKey } from "@/data/interiors";

export function InteriorGallery({
  images,
  alt,
}: {
  images: InteriorImageKey[];
  alt: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const show = (next: number) => setOpenIndex(((next % images.length) + images.length) % images.length);

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((key, index) => (
          <li key={`${key}-${index}`}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group block w-full overflow-hidden border border-border"
              aria-label={`Open image ${index + 1} of ${images.length}`}
            >
              <img
                src={interiorImage(key)}
                alt={`${alt} — view ${index + 1}`}
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-navy/90 p-4">
          <button
            type="button"
            aria-label="Close gallery"
            onClick={() => setOpenIndex(null)}
            className="absolute right-5 top-5 text-primary-foreground"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => show(openIndex - 1)}
            className="absolute left-4 text-primary-foreground"
          >
            <ChevronLeft className="h-8 w-8" aria-hidden="true" />
          </button>
          <img
            src={interiorImage(images[openIndex] as InteriorImageKey)}
            alt={`${alt} — view ${openIndex + 1}`}
            loading="lazy"
            decoding="async"
            className="max-h-[80vh] w-auto max-w-full object-contain"
          />
          <button
            type="button"
            aria-label="Next image"
            onClick={() => show(openIndex + 1)}
            className="absolute right-4 text-primary-foreground"
          >
            <ChevronRight className="h-8 w-8" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </>
  );
}
