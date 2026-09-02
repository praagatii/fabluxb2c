import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import {
  AdminCard,
  AdminGuard,
  AdminPageHeader,
  ReadOnlyNote,
  StatusPill,
} from "@/components/admin/AdminChrome";
import { adminReviews, type AdminReview } from "@/data/admin";
import { useAdmin } from "@/context/AdminContext";

export const Route = createFileRoute("/admin/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Fabluxe Admin" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Moderate customer reviews: approve, hide or reply." },
      { property: "og:title", content: "Reviews — Fabluxe Admin" },
      { property: "og:description", content: "Review moderation queue." },
    ],
  }),
  component: () => (
    <AdminGuard section="reviews" label="Reviews">
      <ReviewsScreen />
    </AdminGuard>
  ),
});

const tone = (status: AdminReview["status"]) =>
  status === "Approved" ? "positive" : status === "Pending" ? "warning" : "neutral";

function ReviewsScreen() {
  const { mayEdit } = useAdmin();
  const editable = mayEdit("reviews");
  const [list, setList] = useState<AdminReview[]>(adminReviews);
  const [filter, setFilter] = useState<"All" | AdminReview["status"]>("All");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const rows = list.filter((r) => filter === "All" || r.status === filter);

  const setStatus = (id: string, status: AdminReview["status"]) =>
    setList((current) => current.map((r) => (r.id === id ? { ...r, status } : r)));

  return (
    <>
      <AdminPageHeader
        eyebrow="Moderation"
        title="Reviews"
        copy={`${list.filter((r) => r.status === "Pending").length} awaiting moderation.`}
      />
      <ReadOnlyNote section="reviews" />

      <div className="mb-4 flex flex-wrap gap-2">
        {(["All", "Pending", "Approved", "Hidden"] as const).map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            aria-pressed={filter === option}
            className={
              filter === option
                ? "rounded-full bg-navy px-3 py-1.5 text-caption text-primary-foreground"
                : "rounded-full border border-border px-3 py-1.5 text-caption text-navy hover:border-teal"
            }
          >
            {option}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {rows.map((review) => (
          <AdminCard key={review.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex" aria-label={`${review.rating} out of 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={i < review.rating ? "h-3.5 w-3.5 fill-gold text-gold" : "h-3.5 w-3.5 text-muted-foreground"}
                      />
                    ))}
                  </span>
                  <p className="font-medium text-navy">{review.title}</p>
                  <StatusPill tone={tone(review.status)}>{review.status}</StatusPill>
                </div>
                <p className="mt-1 text-caption text-muted-foreground">
                  {review.author} on {review.productName} · {review.submittedAt}
                </p>
                <p className="mt-2 max-w-2xl text-body text-navy">{review.body}</p>
                {review.reply ? (
                  <p className="mt-2 border-l-2 border-teal pl-3 text-caption text-muted-foreground">
                    Fabluxe replied: {review.reply}
                  </p>
                ) : null}
              </div>
              {editable ? (
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setStatus(review.id, "Approved")} className="rounded-sm border border-border px-3 py-1.5 text-caption text-navy hover:border-teal">
                    Approve
                  </button>
                  <button onClick={() => setStatus(review.id, "Hidden")} className="rounded-sm border border-border px-3 py-1.5 text-caption text-navy hover:border-teal">
                    Hide
                  </button>
                  <button
                    onClick={() => {
                      setReplyTo(review.id);
                      setReplyText(review.reply ?? "");
                    }}
                    className="rounded-sm border border-border px-3 py-1.5 text-caption text-navy hover:border-teal"
                  >
                    Reply
                  </button>
                </div>
              ) : null}
            </div>

            {editable && replyTo === review.id ? (
              <form
                className="mt-3 flex flex-col gap-2 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  setList((current) =>
                    current.map((r) => (r.id === review.id ? { ...r, reply: replyText } : r)),
                  );
                  setReplyTo(null);
                }}
              >
                <input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a public reply"
                  className="grow rounded-sm border border-border bg-background px-3 py-2 text-body text-navy outline-none focus:border-teal"
                />
                <button className="rounded-sm bg-navy px-4 py-2 text-body text-primary-foreground hover:opacity-90">
                  Post reply
                </button>
              </form>
            ) : null}
          </AdminCard>
        ))}
      </div>
    </>
  );
}
