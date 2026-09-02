import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AdminCard,
  AdminGuard,
  AdminPageHeader,
  AdminTable,
  ReadOnlyNote,
  StatusPill,
  Td,
} from "@/components/admin/AdminChrome";
import { consultationRequests, type ConsultationRequest } from "@/data/admin";
import { projects, roomStyles, roomTypeLabel } from "@/data/interiors";
import { useAdmin } from "@/context/AdminContext";

export const Route = createFileRoute("/admin/interiors")({
  head: () => ({
    meta: [
      { title: "Interior design — Fabluxe Admin" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Manage room styles, portfolio projects and consultation requests." },
      { property: "og:title", content: "Interior design — Fabluxe Admin" },
      { property: "og:description", content: "Styles, portfolio and consultation requests." },
    ],
  }),
  component: () => (
    <AdminGuard section="interiors" label="Interior design">
      <InteriorsScreen />
    </AdminGuard>
  ),
});

const tone = (status: ConsultationRequest["status"]) =>
  status === "Confirmed" || status === "Completed"
    ? "positive"
    : status === "Cancelled"
      ? "danger"
      : "warning";

function InteriorsScreen() {
  const { mayEdit } = useAdmin();
  const editable = mayEdit("interiors");
  const [tab, setTab] = useState<"styles" | "projects" | "requests">("requests");
  const [requests, setRequests] = useState<ConsultationRequest[]>(consultationRequests);
  const [published, setPublished] = useState<string[]>(projects.map((p) => p.id));

  return (
    <>
      <AdminPageHeader
        eyebrow="Interior design"
        title="Studio management"
        copy="Enquiry-only module — no prices are stored or shown anywhere in this section."
      />
      <ReadOnlyNote section="interiors" />

      <div className="mb-4 flex flex-wrap gap-2">
        {([
          ["requests", `Consultation requests (${requests.length})`],
          ["styles", `Room styles (${roomStyles.length})`],
          ["projects", `Portfolio (${projects.length})`],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            aria-pressed={tab === key}
            className={
              tab === key
                ? "rounded-full bg-navy px-3 py-1.5 text-caption text-primary-foreground"
                : "rounded-full border border-border px-3 py-1.5 text-caption text-navy hover:border-teal"
            }
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "requests" ? (
        <AdminTable head={["Reference", "Name", "Contact", "Mode", "Date", "Slot", "Status"]}>
          {requests.map((request) => (
            <tr key={request.id}>
              <Td className="numeric text-caption">{request.id}</Td>
              <Td>{request.name}</Td>
              <Td className="text-caption">{request.contact}</Td>
              <Td className="text-caption">{request.mode}</Td>
              <Td className="text-caption">{request.date}</Td>
              <Td className="numeric text-caption">{request.slot}</Td>
              <Td>
                {editable ? (
                  <select
                    value={request.status}
                    onChange={(e) =>
                      setRequests((current) =>
                        current.map((r) =>
                          r.id === request.id
                            ? { ...r, status: e.target.value as ConsultationRequest["status"] }
                            : r,
                        ),
                      )
                    }
                    className="rounded-sm border border-border bg-background px-2 py-1 text-caption text-navy"
                  >
                    <option>New</option>
                    <option>Confirmed</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                ) : (
                  <StatusPill tone={tone(request.status)}>{request.status}</StatusPill>
                )}
              </Td>
            </tr>
          ))}
        </AdminTable>
      ) : null}

      {tab === "styles" ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {roomStyles.map((style) => (
            <AdminCard key={style.id} title={style.name}>
              <p className="text-caption text-muted-foreground">{style.tagline}</p>
              <p className="mt-2 text-caption text-muted-foreground">
                {style.materials.length} materials · {style.gallery.length} gallery images
              </p>
              <div className="mt-3 flex gap-2">
                <button disabled={!editable} className="rounded-sm border border-border px-3 py-1.5 text-caption text-navy hover:border-teal disabled:opacity-50">
                  Edit style
                </button>
                <button disabled={!editable} className="rounded-sm border border-border px-3 py-1.5 text-caption text-navy hover:border-teal disabled:opacity-50">
                  Manage gallery
                </button>
              </div>
            </AdminCard>
          ))}
        </div>
      ) : null}

      {tab === "projects" ? (
        <AdminTable head={["Project", "Style", "Room", "City", "Year", "Visibility"]}>
          {projects.map((project) => (
            <tr key={project.id}>
              <Td>{project.title}</Td>
              <Td className="text-caption">{roomStyles.find((s) => s.id === project.styleId)?.name}</Td>
              <Td className="text-caption">{roomTypeLabel(project.roomTypeId)}</Td>
              <Td className="text-caption">{project.city}</Td>
              <Td className="numeric text-caption">{project.year}</Td>
              <Td>
                <button
                  disabled={!editable}
                  onClick={() =>
                    setPublished((current) =>
                      current.includes(project.id)
                        ? current.filter((id) => id !== project.id)
                        : [...current, project.id],
                    )
                  }
                  className="disabled:cursor-not-allowed"
                >
                  <StatusPill tone={published.includes(project.id) ? "positive" : "neutral"}>
                    {published.includes(project.id) ? "Published" : "Hidden"}
                  </StatusPill>
                </button>
              </Td>
            </tr>
          ))}
        </AdminTable>
      ) : null}
    </>
  );
}
