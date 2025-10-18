"use client";
import { useEffect } from "react";
import { instrumentPageViews } from "@/lib/analytics";

export function Analytics() {
  useEffect(() => {
    instrumentPageViews();
  }, []);
  return null;
}
