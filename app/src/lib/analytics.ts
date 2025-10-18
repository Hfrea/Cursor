"use client";
import { v4 as uuid } from "uuid";

const STORAGE_KEY = "site_session_id";

function getSessionId(): string {
  if (typeof window === "undefined") return uuid();
  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = uuid();
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}

export type AnalyticsEventInput = {
  type: "VISIT" | "ITEM_VIEW" | "ADD_TO_FAVORITES" | "FILTER" | "SEARCH" | "SORT" | "CLICK";
  path: string;
  referrer?: string | null;
  durationMs?: number;
  itemId?: string | null;
};

export async function track(event: AnalyticsEventInput) {
  const payload = {
    ...event,
    sessionId: getSessionId(),
  };
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {}
}

export function instrumentPageViews() {
  if (typeof window === "undefined") return;
  const path = window.location.pathname + window.location.search;
  track({ type: "VISIT", path, referrer: document.referrer || null });

  let start = Date.now();
  const onHide = () => {
    const durationMs = Date.now() - start;
    track({ type: "CLICK", path, durationMs });
  };
  window.addEventListener("beforeunload", onHide);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") onHide();
    if (document.visibilityState === "visible") start = Date.now();
  });
}
