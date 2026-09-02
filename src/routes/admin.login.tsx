import { createFileRoute } from "@tanstack/react-router";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminPageHeader } from "@/components/admin/AdminChrome";
import { useAdmin } from "@/context/AdminContext";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Fabluxe Admin" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Sign in to the Fabluxe admin portal prototype." },
      { property: "og:title", content: "Sign in — Fabluxe Admin" },
      { property: "og:description", content: "Fabluxe admin portal sign-in." },
    ],
  }),
  component: AdminLoginRoute,
});

function AdminLoginRoute() {
  const { signedIn, email, role } = useAdmin();
  if (!signedIn) return <AdminLogin />;
  return (
    <AdminPageHeader
      eyebrow="Session"
      title="You are already signed in"
      copy={`${email} — ${role}. Use the sidebar to move around, or sign out to switch account.`}
    />
  );
}
