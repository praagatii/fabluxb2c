import { createFileRoute, Outlet } from "@tanstack/react-router";
import { B2BHeaderBand, B2BBrowseOnlyLine } from "@/components/b2b/B2BChrome";

export const Route = createFileRoute("/b2b")({
  component: B2BLayout,
});

function B2BLayout() {
  return (
    <div className="bg-background">
      <B2BHeaderBand />
      <B2BBrowseOnlyLine />
      <Outlet />
    </div>
  );
}
