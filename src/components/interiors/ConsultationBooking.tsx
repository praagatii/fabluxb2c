import { useMemo, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Phone } from "lucide-react";
import { roomTypes, roomStyles } from "@/data/interiors";
import {
  consultationModes,
  propertyTypes,
  projectTimelines,
  timeSlots,
  isSlotAvailable,
  nextBookableDates,
  formatBookingDate,
  makeReference,
  designerPhone,
  designerPhoneHref,
  whatHappensNext,
} from "@/data/consultation";

const field =
  "w-full border border-border bg-background px-3 py-2.5 text-sm text-navy placeholder:text-muted-foreground focus:border-gold focus:outline-none";
const labelCls = "label-eyebrow text-teal";

type Booking = {
  reference: string;
  name: string;
  mode: string;
  date: string;
  slot: string;
};

export function ConsultationBooking() {
  const dates = useMemo(() => nextBookableDates(14), []);
  const [mode, setMode] = useState<string>("in-person");
  const [name, setName] = useState("");
  const [rooms, setRooms] = useState<string[]>([]);
  const [dateISO, setDateISO] = useState(dates[0]!.iso);
  const [slot, setSlot] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);

  const toggleRoom = (id: string) =>
    setRooms((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]));

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!slot) {
      setError("Please choose an available time slot.");
      return;
    }
    setError(null);
    setBooking({
      reference: makeReference(),
      name: name.trim(),
      mode: consultationModes.find((m) => m.id === mode)?.label ?? "Consultation",
      date: dateISO,
      slot,
    });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (booking) {
    return (
      <div className="border border-border bg-card p-6 sm:p-10">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-beige text-teal">
          <Check className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="rule-gold mb-3 mt-6 block" aria-hidden="true" />
        <p className={labelCls}>Consultation requested</p>
        <h2 className="mt-3 font-display text-3xl text-navy">
          Thank you{booking.name ? `, ${booking.name.split(" ")[0]}` : ""} — your slot is held
        </h2>

        <dl className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-4">
          {[
            // TODO: reference format is a placeholder pending the client's scheme.
            { label: "Reference", value: booking.reference },
            { label: "Mode", value: booking.mode },
            { label: "Date", value: formatBookingDate(booking.date) },
            { label: "Time", value: booking.slot },
          ].map((row) => (
            <div key={row.label} className="bg-card p-5">
              <dt className={labelCls}>{row.label}</dt>
              <dd className="mt-2 text-sm text-navy">{row.value}</dd>
            </div>
          ))}
        </dl>

        <h3 className="mt-10 font-display text-xl text-navy">What happens next</h3>
        <ol className="mt-4 grid gap-3">
          {whatHappensNext.map((step, index) => (
            <li key={step} className="flex gap-3 border-l-2 border-gold bg-beige/60 px-4 py-3">
              <span className="font-display text-lg text-gold">{index + 1}</span>
              <span className="text-sm leading-relaxed text-muted-foreground">{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={designerPhoneHref}
            className="flex items-center gap-2 border border-navy px-6 py-3 text-sm text-navy transition-colors hover:border-gold hover:text-teal"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call the studio — {designerPhone}
          </a>
          <Link
            to="/interior-design/portfolio"
            className="bg-navy px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-teal"
          >
            Browse completed projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-10">
      {/* Mode selector — the phone option sits alongside booking, not behind it. */}
      <fieldset className="min-w-0">
        <legend className={labelCls}>How would you like to meet?</legend>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {consultationModes.map((option) => {
            const active = mode === option.id;
            return (
              <label
                key={option.id}
                className={`cursor-pointer border p-5 transition-colors ${
                  active ? "border-gold bg-beige" : "border-border bg-card hover:border-teal"
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  value={option.id}
                  checked={active}
                  onChange={() => setMode(option.id)}
                  className="sr-only"
                />
                <span className="block font-display text-lg text-navy">{option.label}</span>
                <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                  {option.copy}
                </span>
                <span className="mt-3 block text-xs uppercase tracking-widest text-teal">
                  {option.duration}
                </span>
              </label>
            );
          })}
        </div>
        <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          Prefer to speak first?
          <a
            href={designerPhoneHref}
            className="inline-flex items-center gap-2 border border-navy px-4 py-2 text-sm text-navy transition-colors hover:border-gold hover:text-teal"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call a designer now — {designerPhone}
          </a>
        </p>
      </fieldset>

      <fieldset className="min-w-0">
        <legend className={labelCls}>Your details</legend>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <input
            required
            maxLength={100}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Full name"
            aria-label="Full name"
            className={field}
          />
          <input
            required
            type="email"
            maxLength={255}
            placeholder="Email address"
            aria-label="Email address"
            className={field}
          />
          <input
            required
            type="tel"
            maxLength={20}
            placeholder="Phone number"
            aria-label="Phone number"
            className={field}
          />
          <input
            required
            maxLength={80}
            placeholder="City"
            aria-label="City"
            className={field}
          />
          <select required defaultValue="" aria-label="Property type" className={field}>
            <option value="" disabled>
              Property type
            </option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select required defaultValue="" aria-label="Project timeline" className={field}>
            <option value="" disabled>
              Project timeline
            </option>
            {projectTimelines.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset className="min-w-0">
        <legend className={labelCls}>Rooms of interest</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {roomTypes.map((room) => {
            const active = rooms.includes(room.id);
            return (
              <button
                key={room.id}
                type="button"
                aria-pressed={active}
                onClick={() => toggleRoom(room.id)}
                className={`border px-4 py-2 text-sm transition-colors ${
                  active
                    ? "border-gold bg-navy text-primary-foreground"
                    : "border-border bg-card text-navy hover:border-teal"
                }`}
              >
                {room.label}
              </button>
            );
          })}
        </div>
        <div className="mt-4 sm:max-w-sm">
          <select defaultValue="" aria-label="Preferred style" className={field}>
            <option value="">Preferred style (optional)</option>
            {roomStyles.map((style) => (
              <option key={style.id} value={style.id}>
                {style.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset className="min-w-0">
        <legend className={labelCls}>Pick a date</legend>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {dates.map((date) => {
            const active = date.iso === dateISO;
            const anyOpen = timeSlots.some((s) => isSlotAvailable(date.iso, s));
            return (
              <button
                key={date.iso}
                type="button"
                disabled={!anyOpen}
                onClick={() => {
                  setDateISO(date.iso);
                  setSlot(null);
                }}
                className={`min-w-[4.5rem] border px-3 py-3 text-center transition-colors ${
                  active
                    ? "border-gold bg-navy text-primary-foreground"
                    : "border-border bg-card text-navy hover:border-teal"
                } disabled:cursor-not-allowed disabled:border-dashed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-60`}
              >
                <span className="block text-xs uppercase tracking-widest">{date.weekday}</span>
                <span className="mt-1 block font-display text-xl">{date.day}</span>
                <span className="block text-xs">{date.month}</span>
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-sm text-navy">
          Slots for <span className="font-medium">{formatBookingDate(dateISO)}</span>
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {timeSlots.map((time) => {
            const available = isSlotAvailable(dateISO, time);
            const active = slot === time;
            return (
              <button
                key={time}
                type="button"
                disabled={!available}
                aria-pressed={active}
                onClick={() => {
                  setSlot(time);
                  setError(null);
                }}
                className={`border px-3 py-3 text-sm transition-colors ${
                  active
                    ? "border-gold bg-navy text-primary-foreground"
                    : "border-border bg-card text-navy hover:border-teal"
                } disabled:cursor-not-allowed disabled:border-dashed disabled:bg-muted disabled:text-muted-foreground disabled:line-through disabled:opacity-60`}
              >
                {time}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Struck-through slots are already taken. Sundays are closed.
        </p>
      </fieldset>

      <fieldset className="min-w-0">
        <legend className={labelCls}>Anything else</legend>
        <textarea
          rows={4}
          maxLength={1000}
          aria-label="Message"
          placeholder="Tell us about the space — floor plan, handover date, pieces you want to keep."
          className={`${field} mt-4`}
        />
      </fieldset>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div>
        <button
          type="submit"
          className="bg-navy px-8 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-teal"
        >
          Request this consultation
        </button>
        <p className="mt-3 text-xs text-muted-foreground">
          Enquiry only. Nothing is priced online — scope and cost are discussed with a designer
          after the consultation.
        </p>
      </div>
    </form>
  );
}
