"use client";
import { useEffect, useState } from "react";

export function ActiveUsers() {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    const es = new EventSource("/api/analytics/stream");
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data) as { activeUsers?: number };
        if (typeof data.activeUsers === "number") setCount(data.activeUsers);
      } catch {}
    };
    return () => es.close();
  }, []);
  return <span>{count}</span>;
}
