import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const itemSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
  category: z.string().min(2),
  priceCents: z.number().int().nonnegative(),
  calories: z.number().int().optional(),
  imageUrl: z.string().url().optional(),
  isAvailable: z.boolean().optional(),
  ingredients: z.array(z.string()).optional(),
});

export async function GET() {
  const items = await prisma.menuItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = itemSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  const created = await prisma.menuItem.create({ data: parsed.data });
  return NextResponse.json(created, { status: 201 });
}
