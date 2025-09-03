// app/api/stats/[month]/[format]/route.ts
import { NextRequest } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(
  req: NextRequest,
  contextPromise: Promise<{ params: { month: string; format: string } }>
) {
  const { params } = await contextPromise;
  const { month, format } = await params;

  try {
    const filePath = path.join(process.cwd(), 'data', `${month}-${format}.json`);
    const fileContents = await readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContents);

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Data not found' }), { status: 404 });
  }
}
