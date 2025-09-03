import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const FORMATS = ['gen9ou', 'gen9uu', 'gen9ru']; // Add more formats here
const STATS_BASE_URL = 'https://www.smogon.com/stats';
const DATA_DIR = path.join(process.cwd(), 'data', 'stats');

function getPastMonths(count = 3) {
  const months = [];
  const date = new Date();
  date.setDate(1); // normalize to beginning of month

  for (let i = 0; i < count; i++) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    months.push(`${y}-${m}`);
    date.setMonth(date.getMonth() - 1);
  }

  return months;
}

async function fetchAndSave(format, month) {
  const url = `${STATS_BASE_URL}/${month}/chaos/${format}-0.json`;
  const folder = path.join(DATA_DIR, month);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);

    const json = await res.json();

    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder, `${format}-0.json`), JSON.stringify(json, null, 2));

    console.log(`Saved ${format} for ${month}`);
  } catch (err) {
    console.error(`Error fetching ${format} for ${month}: ${err.message}`);
  }
}

export async function updateStats() {
  const months = getPastMonths(3);

  for (const month of months) {
    for (const format of FORMATS) {
      await fetchAndSave(format, month);
    }
  }

  console.log('✅ Stat files updated.');
}

// Run manually from CLI
