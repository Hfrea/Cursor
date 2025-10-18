import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      async function push() {
        const since = new Date(Date.now() - 2 * 60 * 1000);
        const active = await prisma.analyticsEvent.count({
          where: { type: "VISIT", createdAt: { gte: since } },
        });
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ activeUsers: active })}\n\n`));
      }
      const interval = setInterval(push, 3000);
      // initial kick
      push();
      controller.enqueue(encoder.encode(`event: open\n`));
      controller.enqueue(encoder.encode(`data: ok\n\n`));

      const close = () => {
        clearInterval(interval);
        controller.close();
      };
      // In Next.js, there's no direct abort signal here; rely on GC.
      // We still expose a timeout safeguard.
      setTimeout(close, 1000 * 60 * 15);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
