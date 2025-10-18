"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          Ember <span className="text-amber-600">&</span> Thyme
        </Link>
        <nav className="flex items-center gap-3">
          <Link
            href="/reservations"
            className={`px-3 py-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition ${pathname === "/reservations" ? "bg-neutral-100 dark:bg-neutral-800" : ""}`}
          >
            Reservations
          </Link>
          <Link
            href="/menu"
            className={`px-3 py-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition ${pathname === "/menu" ? "bg-neutral-100 dark:bg-neutral-800" : ""}`}
          >
            Menu
          </Link>
          <Link
            href="/admin"
            className={`px-3 py-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition ${pathname?.startsWith("/admin") ? "bg-neutral-100 dark:bg-neutral-800" : ""}`}
          >
            Admin
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
