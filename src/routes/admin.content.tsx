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
import { adminBanners, adminStaticPages, sectionTemplates, type AdminBanner } from "@/data/admin";
import { useAdmin } from "@/context/AdminContext";

export const Route = createFileRoute("/admin/content")({
  head: () => ({
    meta: [
      { title: "Content — Fabluxe Admin" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Manage homepage banners, promo bands and static pages." },
      { property: "og:title", content: "Content — Fabluxe Admin" },
      { property: "og:description", content: "Banners, promo bands and static pages." },
    ],
  }),
  component: () => (
    <AdminGuard section="content" label="Content">
      <ContentScreen />
    </AdminGuard>
  ),
});

const tone = (status: AdminBanner["status"]) =>
  status === "Live" ? "positive" : status === "Scheduled" ? "warning" : "neutral";

function ContentScreen() {
  const { mayEdit } = useAdmin();
  const editable = mayEdit("content");
  const [banners, setBanners] = useState<AdminBanner[]>(adminBanners);
  const [template, setTemplate] = useState(sectionTemplates[0]!);
  const [sections, setSections] = useState<{ id: string; template: string; title: string }[]>([]);
  const [title, setTitle] = useState("");

  return (
    <>
      <AdminPageHeader
        eyebrow="Storefront"
        title="Content"
        copy="Homepage banners, promo bands and the static support pages. New sections can be added after launch without a release."
      />
      <ReadOnlyNote section="content" />

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <h2 className="mb-2 text-body font-medium text-navy">Banners and promo bands</h2>
          <AdminTable head={["Title", "Placement", "Link", "Updated", "Status"]}>
            {banners.map((banner) => (
              <tr key={banner.id}>
                <Td>{banner.title}</Td>
                <Td className="text-caption">{banner.placement}</Td>
                <Td className="numeric text-caption">{banner.link}</Td>
                <Td className="text-caption">{banner.updatedAt}</Td>
                <Td>
                  <button
                    disabled={!editable}
                    onClick={() =>
                      setBanners((current) =>
                        current.map((b) =>
                          b.id === banner.id ? { ...b, status: b.status === "Live" ? "Draft" : "Live" } : b,
                        ),
                      )
                    }
                    className="disabled:cursor-not-allowed"
                  >
                    <StatusPill tone={tone(banner.status)}>{banner.status}</StatusPill>
                  </button>
                </Td>
              </tr>
            ))}
          </AdminTable>
        </div>

        <div>
          <h2 className="mb-2 text-body font-medium text-navy">Static pages</h2>
          <AdminTable head={["Page", "URL", "Updated", ""]}>
            {adminStaticPages.map((page) => (
              <tr key={page.slug}>
                <Td>{page.title}</Td>
                <Td className="numeric text-caption">/support/{page.slug}</Td>
                <Td className="text-caption">{page.updatedAt}</Td>
                <Td>
                  <button disabled={!editable} className="text-caption text-teal hover:underline disabled:text-muted-foreground disabled:no-underline">
                    Edit copy
                  </button>
                </Td>
              </tr>
            ))}
          </AdminTable>
        </div>
      </div>

      <AdminCard title="Add a section to the storefront" className="mt-4">
        <form
          className="flex flex-wrap items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!title.trim()) return;
            setSections((current) => [...current, { id: `sec-${Date.now()}`, template, title: title.trim() }]);
            setTitle("");
          }}
        >
          <label>
            <span className="mb-1 block text-caption font-medium text-navy">Section template</span>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="rounded-sm border border-border bg-background px-3 py-2 text-body text-navy"
            >
              {sectionTemplates.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="grow">
            <span className="mb-1 block text-caption font-medium text-navy">Heading</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Festive kitchen edit"
              className="w-full rounded-sm border border-border bg-background px-3 py-2 text-body text-navy outline-none focus:border-teal"
            />
          </label>
          <button disabled={!editable} className="rounded-sm bg-navy px-4 py-2 text-body text-primary-foreground hover:opacity-90 disabled:opacity-50">
            Add section
          </button>
        </form>
        {sections.length ? (
          <ul className="mt-3 space-y-2">
            {sections.map((section) => (
              <li key={section.id} className="flex items-center justify-between rounded-sm border border-border px-3 py-2 text-body text-navy">
                <span>
                  {section.title} <span className="text-caption text-muted-foreground">· {section.template}</span>
                </span>
                <StatusPill tone="warning">Draft</StatusPill>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-caption text-muted-foreground">
            Sections added here would appear on the homepage after publishing — no developer release required.
          </p>
        )}
      </AdminCard>
    </>
  );
}
