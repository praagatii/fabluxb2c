import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[80rem] px-5 sm:px-8", className)}>{children}</div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string | undefined;
  id?: string | undefined;
}) {
  return (
    <section id={id} className={cn("py-14 sm:py-[var(--spacing-section)]", className)}>
      <Container>{children}</Container>
    </section>
  );
}
