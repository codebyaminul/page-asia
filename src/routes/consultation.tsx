import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/consultation")({
  beforeLoad: () => {
    throw redirect({ to: "/support" });
  },
  component: () => null,
});
