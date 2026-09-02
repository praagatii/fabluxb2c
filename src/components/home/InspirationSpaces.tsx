import scandinavian from "@/assets/style-scandinavian.jpg";
import luxe from "@/assets/style-contemporary-luxe.jpg";
import classic from "@/assets/style-classic-indian.jpg";
import industrial from "@/assets/style-industrial.jpg";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SmartLink } from "@/components/common/SmartLink";

const spaces = [
  { image: scandinavian, label: "Scandinavian" },
  { image: luxe, label: "Contemporary Luxe" },
  { image: classic, label: "Classic Indian" },
  { image: industrial, label: "Industrial" },
];

/** Audo-style "Inspiration / Spaces": products shown in room contexts via interior styles. */
export function InspirationSpaces() {
  return (
    <Section className="bg-beige/50">
      <SectionHeading
        eyebrow="Inspiration"
        title="Rooms we have designed"
        copy="Interior directions from Fabluxora, each styled for Indian homes and light."
        action={
          <SmartLink to="/interior-design" className="link-gold text-body text-teal">
            Explore interior design
          </SmartLink>
        }
      />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {spaces.map((space) => (
          <li key={space.label}>
            <SmartLink to="/interior-design" className="group relative block overflow-hidden bg-sky/40">
              <img
                src={space.image}
                alt={`${space.label} room style`}
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="label-eyebrow text-beige">{space.label}</p>
              </div>
            </SmartLink>
          </li>
        ))}
      </ul>
    </Section>
  );
}