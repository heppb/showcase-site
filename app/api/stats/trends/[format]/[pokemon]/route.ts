import { NextResponse } from 'next/server';
import { getTrendData } from '@/app/lib/trendUtils';

export async function GET(
  _req: Request,
  { params }: { params: { format: string; pokemon: string } }
) {
  try {
    const trend = getTrendData(params.format, params.pokemon);
    return NextResponse.json(trend);
  } catch {
    return NextResponse.json({ error: 'Failed to load trend data' }, { status: 500 });
  }
}
