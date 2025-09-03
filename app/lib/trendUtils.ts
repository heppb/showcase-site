import fs from 'fs';
import path from 'path';

export function getAvailableMonths(): string[] {
  const statsDir = path.join(process.cwd(), 'data', 'stats');
  return fs.readdirSync(statsDir).filter(name => /^\d{4}-\d{2}$/.test(name));
}

export function getTrendData(format: string, pokemon: string): { month: string, usage: number }[] {
  const months = getAvailableMonths().sort(); // ascending by date
  const trend: { month: string; usage: number }[] = [];

  for (const month of months) {
    const filePath = path.join(process.cwd(), 'data', 'stats', month, `${format}-0.json`);
    if (!fs.existsSync(filePath)) continue;

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const usage = data?.data?.[pokemon]?.usage ?? 0;

    trend.push({ month, usage });
  }

  return trend;
}
