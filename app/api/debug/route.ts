import { NextResponse } from 'next/server';
export async function GET() {
  // Return a subset of env vars for security (we'll include the ones we care about)
  const { NEXTAUTH_URL, NEXTAUTH_SECRET, DATABASE_URL } = process.env;
  return NextResponse.json({
    NEXTAUTH_URL,
    NEXTAUTH_SECRET,
    DATABASE_URL,
    envCount: Object.keys(process.env).length,
  });
}

