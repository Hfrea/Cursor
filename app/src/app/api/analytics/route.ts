import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UAParser } from "ua-parser-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      type,
      path,
      referrer,
      durationMs,
      itemId,
      sessionId,
    } = body as {
      type: "VISIT" | "ITEM_VIEW" | "ADD_TO_FAVORITES" | "FILTER" | "SEARCH" | "SORT" | "CLICK";
      path: string;
      referrer?: string | null;
      durationMs?: number | null;
      itemId?: string | null;
      sessionId: string;
    };

    const ua = req.headers.get("user-agent") || "";
    const parsed = new UAParser(ua).getResult();

    await prisma.analyticsEvent.create({
      data: {
        type,
        path,
        referrer: referrer || null,
        durationMs: durationMs ?? null,
        itemId: itemId ?? null,
        sessionId,
        device: parsed.device.type || "desktop",
        os: parsed.os.name || null,
        browser: parsed.browser.name || null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
