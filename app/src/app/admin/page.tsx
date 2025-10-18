import { getServerSession, type Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import { ActiveUsers } from "./realtime";

export default async function AdminIndexPage() {
  const session: Session | null = await getServerSession(authOptions);
  if (!session || session.user?.role !== "OWNER") {
    redirect("/admin/login");
  }

  const now = new Date();
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [visits24h, visits7d, topItems] = await Promise.all([
    prisma.analyticsEvent.count({ where: { type: "VISIT", createdAt: { gte: dayAgo } } }),
    prisma.analyticsEvent.count({ where: { type: "VISIT", createdAt: { gte: weekAgo } } }),
    prisma.menuItem.findMany({
      take: 10,
      orderBy: { views: { _count: "desc" } },
      include: { _count: { select: { views: true } } },
    }),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">Welcome back, {session.user?.name ?? session.user?.email}</p>

      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <div className="rounded-xl border p-4 bg-white dark:bg-neutral-900">
          <div className="text-sm text-neutral-500">Visitors (24h)</div>
          <div className="text-2xl font-semibold mt-1">{visits24h}</div>
        </div>
        <div className="rounded-xl border p-4 bg-white dark:bg-neutral-900">
          <div className="text-sm text-neutral-500">Visitors (7d)</div>
          <div className="text-2xl font-semibold mt-1">{visits7d}</div>
        </div>
        <div className="rounded-xl border p-4 bg-white dark:bg-neutral-900">
          <div className="text-sm text-neutral-500">Active users (now)</div>
          <div className="text-2xl font-semibold mt-1"><Suspense fallback="…"><ActiveUsers /></Suspense></div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Top 10 Dishes</h2>
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-900">
              <tr>
                <th className="text-left p-3">Dish</th>
                <th className="text-left p-3">Category</th>
                <th className="text-right p-3">Views</th>
              </tr>
            </thead>
            <tbody>
              {topItems.map((i) => (
                <tr key={i.id} className="border-t">
                  <td className="p-3">{i.name}</td>
                  <td className="p-3">{i.category}</td>
                  <td className="p-3 text-right">{(i as any)._count.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
