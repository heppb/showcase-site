// app/api/formats/[month]/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  _req: Request,
  { params }: { params: { month: string } }
) {
  const { month } = params;
  const dir = path.join(process.cwd(), 'data', 'stats', month);

  try {
    const files = fs.readdirSync(dir);
    const formats = files
      .filter(file => file.endsWith('-0.json'))
      .map(file => file.replace('-0.json', ''));
    return NextResponse.json(formats);
  } catch (e) {
    console.error(`Unable to list formats for ${month}`, e);
    return NextResponse.json([], { status: 404 });
  }
}
