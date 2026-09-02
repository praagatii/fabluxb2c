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
        className="label-eyebrow mx-auto max-w-[80rem] px-5 py-2.5 text-center text-sky sm:px-8"
        aria-live="polite"
      >
        {announcements[index]}
      </p>
    </div>
  );
}
