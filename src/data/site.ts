export const announcements = [
  "Festive edit — up to 35% off large appliances, with free installation",
  "Complimentary interior design consultation on orders above ₹1,50,000",
  "B2B enquiries answered within one working day",
];

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  primaryCta: { label: string; to: string };
  secondaryCta: { label: string; to: string };
  image: "hero1" | "hero2" | "hero3";
};

export const heroSlides: HeroSlide[] = [
  {
    id: "hero-refrigeration",
    eyebrow: "The Festive Edit",
    title: "Cold storage, quietly considered",
    copy: "French door refrigeration from Voltek and Elba, with installation and demonstration included across 40 Indian cities.",
    primaryCta: { label: "Shop refrigerators", to: "/shop" },
    secondaryCta: { label: "View the edit", to: "/offers" },
    image: "hero1",
  },
  {
    id: "hero-television",
    eyebrow: "New This Season",
    title: "A picture that behaves like a painting",
    copy: "The Lumen OLED Evo series, calibrated in Filmmaker mode and wall-mounted by our own installation team.",
    primaryCta: { label: "Explore televisions", to: "/shop" },
    secondaryCta: { label: "Book installation", to: "/support" },
    image: "hero2",
  },
  {
    id: "hero-laundry",
    eyebrow: "Utility, Refined",
    title: "Laundry and air, engineered to disappear",
    copy: "Front load machines at 32 dB and five-star inverter cooling, chosen for homes where appliances should not announce themselves.",
    primaryCta: { label: "Shop the range", to: "/shop" },
    secondaryCta: { label: "Compare models", to: "/compare" },
    image: "hero3",
  },
];

export const brands = [
  "Voltek",
  "Nord Vision",
  "Elba",
  "Terra Studio",
  "Marchetti",
  "Aurel & Co.",
];

export const trustPoints = [
  {
    id: "trust-delivery",
    title: "Scheduled delivery",
    copy: "Two-hour delivery windows across 40 cities, with a call before dispatch.",
    icon: "truck",
  },
  {
    id: "trust-installation",
    title: "Installation included",
    copy: "Certified engineers fit, test and demonstrate every large appliance.",
    icon: "wrench",
  },
  {
    id: "trust-support",
    title: "Seven-year support",
    copy: "One relationship manager for warranty, service and spares.",
    icon: "headset",
  },
];

export const reviewHighlights = [
  {
    id: "rev-1",
    quote:
      "The refrigerator arrived on the promised window, was installed in under an hour, and the engineer walked us through every setting.",
    author: "Ananya Raghunathan",
    location: "Bengaluru",
    rating: 5,
  },
  {
    id: "rev-2",
    quote:
      "We bought the television through Fabluxe and had the wall panelling designed by Fabluxora. One conversation, one order reference.",
    author: "Dhruv Mehta",
    location: "Mumbai",
    rating: 5,
  },
  {
    id: "rev-3",
    quote:
      "Our office fit-out enquiry was answered the next morning with a proper specification sheet, not a sales pitch.",
    author: "Ritu Bansal",
    location: "Gurugram",
    rating: 4,
  },
];

export const primaryNav = [
  { label: "Shop", to: "/shop", hasMegaMenu: true },
  { label: "Interior Design", to: "/interior-design", hasMegaMenu: false },
  { label: "B2B Store", to: "/b2b", hasMegaMenu: false },
  { label: "Offers", to: "/offers", hasMegaMenu: false },
  { label: "Support", to: "/support", hasMegaMenu: false },
];

export const searchSuggestions = [
  "French door refrigerator",
  "65 inch OLED television",
  "Front load washing machine 9 kg",
  "1.5 ton inverter AC",
  "Auto-clean chimney 90 cm",
  "Interior design consultation",
];

export const footerColumns = [
  {
    title: "Shop",
    links: [
      { label: "Refrigerators", to: "/shop" },
      { label: "Washing Machines", to: "/shop" },
      { label: "Air Conditioners", to: "/shop" },
      { label: "Televisions", to: "/shop" },
      { label: "Kitchen Appliances", to: "/shop" },
      { label: "Small Appliances", to: "/shop" },
    ],
  },
  {
    title: "Interior Design",
    links: [
      { label: "Room styles", to: "/interior-design" },
      { label: "Portfolio", to: "/interior-design" },
      { label: "Book a consultation", to: "/interior-design" },
      { label: "How we work", to: "/interior-design" },
    ],
  },
  {
    title: "Business",
    links: [
      { label: "B2B catalogue", to: "/b2b" },
      { label: "Raise a B2B enquiry", to: "/b2b" },
      { label: "Bulk fit-out projects", to: "/b2b" },
    ],
  },
  {
    title: "Support",
    links: [
{ label: "Track an order", to: "/account" },
      { label: "Installation & demo", to: "/support" },
      { label: "Warranty & service", to: "/support/returns" },
      { label: "Returns", to: "/support/returns" },
      { label: "Contact us", to: "/support" },
    ],
  },
];

export const policyLinks = [
{ label: "Terms of use", to: "/support/terms" },
  { label: "Privacy policy", to: "/support/privacy" },
  { label: "Shipping policy", to: "/support/shipping" },
  { label: "FAQ", to: "/support/faq" },
];

export const paymentMarks = ["Visa", "Mastercard", "RuPay", "UPI", "Net Banking", "EMI"];

export const companies = {
  electronics: {
    name: "Fabluxe Home Solutions",
    gstin: "29AAGCF1234K1ZP",
  },
  interiors: {
    name: "Fabluxora Interiors",
    gstin: "29AAHCF9876M1ZR",
  },
};
