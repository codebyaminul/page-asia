import { createFileRoute } from "@tanstack/react-router";
import { getSystemHealthFn } from "@/lib/server-api";

export const Route = createFileRoute("/api/health")({
  loader: async ({ location }) => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token") || undefined;
    return await getSystemHealthFn({ data: { token } });
  },
  component: HealthPage,
});

function HealthPage() {
  const health = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-black text-green-400 p-8 font-mono text-sm">
      <div className="max-w-xl mx-auto border border-zinc-800 rounded-lg p-6 bg-zinc-950/80">
        <h1 className="text-lg font-bold text-white mb-4 border-b border-zinc-800 pb-2">
          PAGE International System Telemetry
        </h1>
        <pre className="whitespace-pre-wrap">{JSON.stringify(health, null, 2)}</pre>
      </div>
    </div>
  );
}
