export type Review = {
  id: string;
  productId: string;
  author: string;
  date: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  helpful: number;
};

const authors = [
  "Ananya Raghunathan",
  "Dhruv Mehta",
  "Priya Sundaram",
  "Kabir Anand",
  "Meera Joshi",
  "Rohan Iyer",
  "Sanya Kapoor",
  "Vikram Desai",
];

const titles = [
  "Exactly as described",
  "Worth the premium",
  "Installation was flawless",
  "Quiet and efficient",
  "Good, with small caveats",
  "Would buy again",
];

const bodies = [
  "Delivered inside the promised window and installed the same afternoon. The engineer stayed to demonstrate every setting before leaving.",
  "Build quality is a clear step above what we replaced. It runs quietly enough that we forget it is on.",
  "Packaging was immaculate and the team removed all of it. Only note is that the manual is thin — most learning was hands-on.",
  "Performance has been consistent through a Chennai summer. Energy usage is noticeably lower than our previous unit.",
  "Finish looks expensive against our cabinetry. One panel had a minor scuff that support replaced without argument.",
  "Bought after comparing three models on this site. The comparison table made the decision straightforward.",
];

/** Deterministic pseudo-random so SSR and client render identically. */
const hash = (input: string) => {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) h = (h * 31 + input.charCodeAt(i)) % 100000;
  return h;
};

export const reviewsForProduct = (productId: string, count = 7): Review[] =>
  Array.from({ length: count }, (_, index) => {
    const seed = hash(`${productId}-${index}`);
    const rating = [5, 5, 4, 5, 3, 4, 2][index % 7] ?? 5;
    const month = (seed % 12) + 1;
    const day = (seed % 27) + 1;
    return {
      id: `${productId}-rev-${index}`,
      productId,
      author: authors[seed % authors.length] as string,
      date: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      rating,
      title: titles[seed % titles.length] as string,
      body: bodies[seed % bodies.length] as string,
      verified: seed % 4 !== 0,
      helpful: seed % 43,
    };
  });

export const ratingDistribution = (reviews: Review[]) =>
  [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

export const formatReviewDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
