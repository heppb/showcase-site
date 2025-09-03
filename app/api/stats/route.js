import fs from 'fs/promises';
import path from 'path';
import { checkAndUpdateMonthly } from '@/lib/pokemonShowdown/monthlyUpdate';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get('format') || 'gen9ou';

  try {
    await checkAndUpdateMonthly();

    const filePath = path.join(process.cwd(), 'stats', `${format}-0.json`);
    const raw = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(raw)?.data?.[format]?.data;

    if (!data) {
      return new Response(JSON.stringify({ error: 'No format data found.' }), { status: 404 });
    }

    const graphData = Object.entries(data)
      .map(([name, info]) => ({
        name,
        usage: parseFloat(info.usage),
      }))
      .filter(p => p.usage > 0)
      .sort((a, b) => b.usage - a.usage)
      .slice(0, 10);

    return new Response(JSON.stringify({ graphData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
