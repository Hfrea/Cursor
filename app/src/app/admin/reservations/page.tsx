import { getServerSession, type Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminReservationsPage() {
  const session: Session | null = await getServerSession(authOptions);
  if (!session || session.user?.role !== "OWNER") {
    redirect("/admin/login");
  }

  const upcoming = await prisma.reservation.findMany({
    where: { startsAt: { gte: new Date() } },
    orderBy: { startsAt: "asc" },
    take: 200,
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Upcoming Reservations</h1>
      <div className="rounded-xl border overflow-hidden bg-white dark:bg-neutral-900">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-900">
            <tr>
              <th className="text-left p-3">When</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Party</th>
              <th className="text-left p-3">Contact</th>
              <th className="text-left p-3">Notes</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {upcoming.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{new Date(r.startsAt).toLocaleString()}</td>
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.partySize}</td>
                <td className="p-3">{r.email || r.phone || "—"}</td>
                <td className="p-3 max-w-[24ch] truncate" title={r.specialRequests || undefined}>{r.specialRequests || "—"}</td>
                <td className="p-3">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
