/**
 * Support section content. Static copy for the prototype — real policy
 * documents and reply routing come from the client's systems later.
 */

export const supportChannels = [
  {
    id: "phone",
    title: "Call us",
    value: "1800 209 4455",
    copy: "Order updates, installation and service. Monday to Saturday, 9am to 8pm IST.",
  },
  {
    id: "email",
    title: "Email",
    value: "care@fabluxe.in",
    copy: "We reply to every enquiry within one working day.",
  },
  {
    id: "chat",
    title: "Track an order",
    value: "Track online",
    copy: "Sign in to your Fabluxe account for live order and service status.",
    to: "/account",
  },
];

export type PolicyPage = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  sections: { heading: string; body: string }[];
};

export const shippingPolicy: PolicyPage = {
  slug: "shipping",
  title: "Shipping policy",
  eyebrow: "Delivery & installation",
  intro:
    "When and how your order is delivered, and what to expect at the door. Precise windows and charges depend on the product and the fulfilment company.",
  sections: [
    {
      heading: "Scheduled delivery windows",
      body: "Large appliances are delivered in two-hour windows across 40+ Indian cities, with a call before dispatch so you can confirm you'll be home. Small items are dispatched by courier with a tracking link by email and SMS.",
    },
    {
      heading: "Who fulfils your order",
      body: "Electronics are delivered by Fabluxe Home Solutions, and interiors and fittings by Fabluxora Interiors. When an order mixes the two, each company ships its own items under one order reference.",
    },
    {
      heading: "Installation and demonstration",
      body: "Certified engineers fit, test and demonstrate most large appliances on the delivery day. You can book or reschedule your installation slot after your order is confirmed.",
    },
    {
      heading: "Charges",
      body: "Delivery charges, where any apply, are shown at checkout before you pay. This page is a summary — the exact terms on your order confirmation govern.",
    },
  ],
};

export const returnsPolicy: PolicyPage = {
  slug: "returns",
  title: "Returns and warranty",
  eyebrow: "Returns, service & spares",
  intro:
    "Returns and warranty terms vary by product and by the company that fulfils it. Use this page as a starting point, then raise a request so our team can confirm the exact terms for your item.",
  sections: [
    {
      heading: "Policies vary by product",
      body: "Every product carries its own return window and warranty length — a television, a built-in kitchen appliance and a furniture piece are not the same. The policy attached to your specific item appears on its product page and your order details.",
    },
    {
      heading: "Starting a return or claim",
      body: "Raise a support request with your order ID and we will confirm eligibility, arrange a pickup or a service visit, and keep you updated at every step. We do not ask you to deal with multiple vendors.",
    },
    {
      heading: "Seven-year support",
      body: "Every purchase keeps a single relationship manager for warranty, service and spares, so a claim years later still lands on one desk.",
    },
    {
      heading: "Need the exact terms?",
      body: "The fastest way to get the exact return or warranty terms for your product is to ask. Our team will confirm them before you commit to anything.",
    },
  ],
};

export const privacyPolicy: PolicyPage = {
  slug: "privacy",
  title: "Privacy policy",
  eyebrow: "Your data",
  intro:
    "How Fabluxe collects, uses and protects your information across the store, interior design and B2B enquiries. This is a summary for the prototype.",
  sections: [
    {
      heading: "What we collect",
      body: "Contact and delivery details when you order or enquire, and preference information when you interact with the store. Payment details are handled by our payment partners and never stored by us.",
    },
    {
      heading: "How we use it",
      body: "To fulfil orders, schedule delivery and installation, respond to enquiries and improve the experience. We do not sell personal information.",
    },
    {
      heading: "Your choices",
      body: "You can update your profile, close your account or ask us to remove your data at any time by contacting customer support.",
    },
    {
      heading: "This is a summary",
      body: "The complete policy, including legal bases and retention periods, is issued by the Fabluxe group. Contact us for the full text.",
    },
  ],
};

export const termsPolicy: PolicyPage = {
  slug: "terms",
  title: "Terms of use",
  eyebrow: "Using this site",
  intro:
    "The terms that govern your use of the Fabluxe storefront. This is a concise summary for the prototype.",
  sections: [
    {
      heading: "The storefront and the companies",
      body: "This site is one storefront for three services — Shop, Interior Design and B2B Store — operated by companies in the Fabluxe group. Orders and invoices are issued by the company that fulfils each item.",
    },
    {
      heading: "Prices, offers and availability",
      body: "Prices and offers are shown in Indian rupees and include applicable taxes unless stated. Availability can change and we may decline or cancel orders where information is inaccurate.",
    },
    {
      heading: "Account responsibility",
      body: "You are responsible for keeping your account details and password secure, and for the accuracy of the delivery and payment information you provide.",
    },
    {
      heading: "This is a summary",
      body: "The full terms are issued by the Fabluxe group. Contact us for the complete document.",
    },
  ],
};

export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
  {
    q: "How do I track my order?",
    a: "Sign in to your account and open Orders, or use the tracking link we email and SMS you once an item dispatches. Large appliances show a live two-hour delivery window.",
  },
  {
    q: "Can I change my delivery or installation slot?",
    a: "Yes — open your order and choose a new slot up to the day before delivery, subject to availability in your city. A call before dispatch always confirms the final window.",
  },
  {
    q: "What if my order contains items from both Fabluxe companies?",
    a: "Your order keeps one reference number, but the electronics ship from Fabluxe Home Solutions and the interiors from Fabluxora Interiors. You'll receive two invoices and each item is covered by its own company's warranty.",
  },
  {
    q: "How does the return or warranty work?",
    a: "Terms vary by product. Raise a support request with your order ID and our team confirms the exact policy for your item, then arranges pickup or a service visit — you never deal with multiple vendors.",
  },
  {
    q: "Is the interior design service free to start?",
    a: "The first consultation is free and enquiry-only. There are no prices on this site; after your consultation the designer shares a scope and quote for the work.",
  },
  {
    q: "How do B2B purchases work?",
    a: "The B2B Store is a browse-only catalogue. To buy, raise an enquiry for the products you need and our trade team responds with specifications, availability and a quote.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "Credit and debit cards, UPI, net banking, EMI and cash on delivery on eligible items.",
  },
  {
    q: "Is my personal data shared?",
    a: "No. Your information is used to fulfil orders and answer enquiries, and is never sold. See the Privacy policy for full details.",
  },
];

export const aboutPoints = [
  {
    title: "Fabluxe Home Solutions",
    copy: "Consumer electronics — appliances, entertainment and small kitchen appliances — with scheduled delivery, installation and seven-year support across India.",
  },
  {
    title: "Fabluxora Interiors",
    copy: "End-to-end interior design and furnishing, from a first consultation to execution. Enquiry only on this site.",
  },
  {
    title: "Fabluxe Trade",
    copy: "The B2B catalogue of interior fittings, hardware, fixtures and bulk appliances for contractors, architects and project buyers.",
  },
];

export const groupUrl = "https://fabluxe.example.com";