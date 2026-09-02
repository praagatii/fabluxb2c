import { useState, type MouseEvent } from "react";
import { X, ZoomIn } from "lucide-react";
import type { Product } from "@/data/products";
import { productImage } from "@/lib/product-images";
import { cn } from "@/lib/utils";

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [zoomed, setZoomed] = useState(false);

  const key = product.images[active] ?? product.image;

  const track = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div>
      <div
        className="relative aspect-4/3 overflow-hidden bg-sky/40"
        onMouseMove={track}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        <img
          src={productImage(key)}
          alt={product.name}
          width={1600}
          height={900}
          className="h-full w-full object-cover transition-transform duration-300 ease-[var(--ease-editorial)]"
          style={{ transformOrigin: origin, transform: zoomed ? "scale(1.8)" : "scale(1)" }}
        />
        <button
          type="button"
          onClick={() => setLightbox(true)}
          aria-label="Open full-screen image"
          className="absolute bottom-3 right-3 flex items-center gap-2 bg-card px-3 py-2 text-caption text-navy"
        >
          <ZoomIn className="h-4 w-4" aria-hidden="true" /> View larger
        </button>
      </div>

      <ul className="mt-4 flex gap-3">
        {product.images.map((image, index) => (
          <li key={`${image}-${index}`}>
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={index === active}
              className={cn(
                "h-20 w-24 overflow-hidden border",
                index === active ? "border-gold" : "border-border",
              )}
            >
              <img
                src={productImage(image)}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      {lightbox ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-navy/90 p-6">
          <button
            type="button"
            aria-label="Close image"
            onClick={() => setLightbox(false)}
            className="absolute right-6 top-6 flex items-center gap-2 text-body text-beige"
          >
            Close <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <img
            src={productImage(key)}
            alt={product.name}
            className="max-h-[80vh] w-auto max-w-full object-contain"
          />
        </div>
      ) : null}
    </div>
  );
}
