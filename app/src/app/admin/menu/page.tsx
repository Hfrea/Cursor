import { getServerSession, type Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminMenuPage() {
  const session: Session | null = await getServerSession(authOptions);
  if (!session || session.user?.role !== "OWNER") {
    redirect("/admin/login");
  }

  const items = await prisma.menuItem.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Menu Manager</h1>
      <div className="grid gap-3">
        {items.map((i) => (
          <div key={i.id} className="rounded-xl border p-4 flex justify-between">
            <div>
              <div className="font-medium">{i.name}</div>
              <div className="text-sm text-neutral-500">{i.category}</div>
            </div>
            <div className="font-semibold">${(i.priceCents / 100).toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
