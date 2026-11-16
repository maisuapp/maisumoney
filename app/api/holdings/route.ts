// app/api/holdings/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  // For demo, we use the master admin email hard‑coded
  const user = await prisma.user.findUnique({
    where: { email: 'maisuapp@gmail.com' },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const holdings = await prisma.holding.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      name: true,
      valuation: true,
      pl: true,
      plPercent: true,
    },
  });

  return NextResponse.json({ holdings });
}
