import { Headset, Truck, Wrench } from "lucide-react";
import { trustPoints } from "@/data/site";
import { Container } from "@/components/common/Section";

const icons = { truck: Truck, wrench: Wrench, headset: Headset } as const;

export function TrustRow() {
  return (
    <section className="pb-10 pt-0 sm:pb-12">
      <Container>
        <ul className="grid gap-8 pt-0 sm:grid-cols-3">
        {trustPoints.map((point) => {
          const Icon = icons[point.icon as keyof typeof icons];
          return (
            <li key={point.id} className="flex gap-4">
              <Icon className="mt-1 h-6 w-6 shrink-0 text-teal" aria-hidden="true" />
              <div className="min-w-0">
                <h3 className="text-heading text-navy">{point.title}</h3>
                <p className="mt-1.5 text-caption text-muted-foreground">{point.copy}</p>
              </div>
            </li>
          );
        })}
        </ul>
      </Container>
    </section>
  );
}
