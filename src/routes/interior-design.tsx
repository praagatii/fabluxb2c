import { createFileRoute, Outlet } from "@tanstack/react-router";
import { TalkToDesigner } from "@/components/interiors/TalkToDesigner";

export const Route = createFileRoute("/interior-design")({
  component: InteriorDesignLayout,
});

function InteriorDesignLayout() {
  return (
    <>
      <Outlet />
      <TalkToDesigner />
    </>
  );
}
