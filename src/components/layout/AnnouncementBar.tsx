import { useEffect, useState } from "react";
import { announcements } from "@/data/site";

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % announcements.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="bg-navy text-primary-foreground">
      <p
        className="label-eyebrow mx-auto flex min-h-[3rem] max-w-[80rem] items-center justify-center px-5 text-center text-sky sm:min-h-8 sm:px-8"
        aria-live="polite"
      >
        {announcements[index]}
      </p>
    </div>
  );
}
