import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AdminCard,
  AdminGuard,
  AdminPageHeader,
  AdminTable,
  StatusPill,
  Td,
} from "@/components/admin/AdminChrome";
import { adminRoles, adminUsers, roleBlurb, type AdminRole, type AdminUser } from "@/data/admin";
import { companies } from "@/data/site";
import { useAdmin } from "@/context/AdminContext";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title: "Users and access — Fabluxe Admin" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Director-only user management and access levels." },
      { property: "og:title", content: "Users and access — Fabluxe Admin" },
      { property: "og:description", content: "User table and role assignment." },
    ],
  }),
  component: () => (
    <AdminGuard section="users" label="Users and access">
      <UsersScreen />
    </AdminGuard>
  ),
});

function UsersScreen() {
  const { role: myRole } = useAdmin();
  const [list, setList] = useState<AdminUser[]>(adminUsers);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AdminRole>("Viewer");
  const [company, setCompany] = useState("Fabluxe Group");

  const field =
    "w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-navy outline-none focus:border-teal";

  return (
    <>
      <AdminPageHeader
        eyebrow="Access control"
        title="Users and access"
        copy={`Director is the highest authority and the only role that can create users or change access levels. You are signed in as ${myRole}.`}
      />

      <AdminCard title="Create a user" className="mb-4">
        <form
          className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim() || !email.trim()) return;
            setList((current) => [
              {
                id: `usr-${current.length + 1}`,
                name: name.trim(),
                email: email.trim(),
                role,
                company,
                status: "Invited",
                lastActive: "—",
              },
              ...current,
            ]);
            setName("");
            setEmail("");
          }}
        >
          <label>
            <span className="mb-1 block text-xs font-medium text-navy">Full name</span>
            <input className={field} value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            <span className="mb-1 block text-xs font-medium text-navy">Work email</span>
            <input type="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            <span className="mb-1 block text-xs font-medium text-navy">Company</span>
            <select className={field} value={company} onChange={(e) => setCompany(e.target.value)}>
              <option>Fabluxe Group</option>
              <option>{companies.electronics.name}</option>
              <option>{companies.interiors.name}</option>
            </select>
          </label>
          <label>
            <span className="mb-1 block text-xs font-medium text-navy">Access level</span>
            <select className={field} value={role} onChange={(e) => setRole(e.target.value as AdminRole)}>
              {adminRoles.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <div className="flex items-end">
            <button className="w-full rounded-sm bg-navy px-4 py-2 text-sm text-primary-foreground hover:opacity-90">
              Send invite
            </button>
          </div>
        </form>
        <p className="mt-2 text-xs text-muted-foreground">{roleBlurb[role]}</p>
      </AdminCard>

      <AdminTable head={["Name", "Email", "Company", "Role", "Status", "Last active", ""]}>
        {list.map((user) => (
          <tr key={user.id}>
            <Td>{user.name}</Td>
            <Td className="text-xs">{user.email}</Td>
            <Td className="text-xs">{user.company}</Td>
            <Td>
              <select
                value={user.role}
                onChange={(e) =>
                  setList((current) =>
                    current.map((u) => (u.id === user.id ? { ...u, role: e.target.value as AdminRole } : u)),
                  )
                }
                className="rounded-sm border border-border bg-background px-2 py-1 text-xs text-navy"
              >
                {adminRoles.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Td>
            <Td>
              <StatusPill
                tone={user.status === "Active" ? "positive" : user.status === "Invited" ? "warning" : "danger"}
              >
                {user.status}
              </StatusPill>
            </Td>
            <Td className="text-xs">{user.lastActive}</Td>
            <Td>
              <button
                onClick={() =>
                  setList((current) =>
                    current.map((u) =>
                      u.id === user.id
                        ? { ...u, status: u.status === "Suspended" ? "Active" : "Suspended" }
                        : u,
                    ),
                  )
                }
                className="text-xs text-teal hover:underline"
              >
                {user.status === "Suspended" ? "Restore" : "Suspend"}
              </button>
            </Td>
          </tr>
        ))}
      </AdminTable>
    </>
  );
}
