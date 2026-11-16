import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? 'unknown',
    hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    hasNextAuthSecret: Boolean(process.env.NEXTAUTH_SECRET),
  });
}

