import { prisma } from "@/lib/prisma";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const items = await prisma.menuItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  const byCategory = items.reduce<Record<string, typeof items>>((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(byCategory);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-8">Our Menu</h1>
      <div className="space-y-12">
        {categories.map((cat) => (
          <section key={cat}>
            <h2 className="text-2xl font-semibold mb-6">{cat}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {byCategory[cat].map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-lg transition group bg-white dark:bg-neutral-900"
                >
                  {item.imageUrl && (
                    <div className="relative h-44">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <span className="font-semibold text-amber-700 dark:text-amber-400">
                        ${(item.priceCents / 100).toFixed(2)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
