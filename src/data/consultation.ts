// Mock consultation booking data — no back end, purely for the prototype.

export type ConsultationMode = {
  id: "in-person" | "video" | "phone";
  label: string;
  copy: string;
  duration: string;
};

export const consultationModes: ConsultationMode[] = [
  {
    id: "in-person",
    label: "In-person visit",
    copy: "A senior designer visits the property, measures and photographs the space.",
    duration: "About 90 minutes",
  },
  {
    id: "video",
    label: "Video consultation",
    copy: "A walkthrough over video call — useful for a first direction before a site visit.",
    duration: "About 45 minutes",
  },
  {
    id: "phone",
    label: "Phone call",
    copy: "A short call to understand the brief and decide what kind of visit you need.",
    duration: "About 20 minutes",
  },
];

export const propertyTypes = [
  "Apartment",
  "Independent house / villa",
  "Duplex / penthouse",
  "New handover, unfurnished",
  "Renovation of an occupied home",
];

export const projectTimelines = [
  "Ready to start now",
  "Within 1–3 months",
  "In 3–6 months",
  "Later this year",
  "Still exploring",
];

export const timeSlots = [
  "09:30",
  "10:30",
  "11:30",
  "12:30",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

// Deterministic mock availability so the grid looks like a real diary.
export const isSlotAvailable = (dateISO: string, slot: string) => {
  const day = new Date(`${dateISO}T00:00:00`).getDay();
  if (day === 0) return false; // studio closed on Sundays
  const seed = [...`${dateISO}${slot}`].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return seed % 4 !== 0;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS_LONG = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

export const nextBookableDates = (count = 14, from = new Date()) => {
  const dates: { iso: string; weekday: string; day: string; month: string }[] = [];
  const cursor = new Date(from);
  cursor.setDate(cursor.getDate() + 1);
  while (dates.length < count) {
    const iso = cursor.toISOString().slice(0, 10);
    dates.push({
      iso,
      weekday: WEEKDAYS[cursor.getDay()]!,
      day: String(cursor.getDate()).padStart(2, "0"),
      month: MONTHS[cursor.getMonth()]!,
    });
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
};

export const formatBookingDate = (iso: string) => {
  const date = new Date(`${iso}T00:00:00`);
  return `${WEEKDAYS_LONG[date.getDay()]}, ${date.getDate()} ${MONTHS_LONG[date.getMonth()]} ${date.getFullYear()}`;
};

// TODO: reference-number format is a placeholder — the client has no booking
// reference scheme yet.
export const makeReference = () =>
  `FBI-CON-${String(Math.floor(1000 + Math.random() * 8999))}`;

export const designerPhone = "+91 22 4000 1200";
export const designerPhoneHref = "tel:+912240001200";

export const whatHappensNext = [
  "A design coordinator confirms the slot by phone and email within one working day.",
  "You receive a short pre-consultation checklist — floor plan, handover date, must-keep pieces.",
  "The designer meets you at the agreed time and records measurements and requirements.",
  "We return with a layout, a material direction and a phased scope of work, discussed in person.",
];
