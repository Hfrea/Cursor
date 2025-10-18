import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const reservationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")).transform((v) => (v ? v : undefined)),
  phone: z.string().min(7).optional().or(z.literal("")).transform((v) => (v ? v : undefined)),
  partySize: z.number().int().min(1).max(20),
  startsAt: z.string().datetime(),
  specialRequests: z.string().max(500).optional().or(z.literal("")).transform((v) => (v ? v : undefined)),
});

export async function GET() {
  const upcoming = await prisma.reservation.findMany({
    where: { startsAt: { gte: new Date() } },
    orderBy: { startsAt: "asc" },
    take: 50,
  });
  return NextResponse.json(upcoming);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = reservationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const { name, email, phone, partySize, startsAt, specialRequests } = parsed.data;
  const created = await prisma.reservation.create({
    data: {
      name,
      email,
      phone,
      partySize,
      startsAt: new Date(startsAt),
      specialRequests,
    },
  });
  return NextResponse.json(created, { status: 201 });
}
