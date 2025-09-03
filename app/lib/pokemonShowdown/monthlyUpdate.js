import fs from 'fs/promises';
import path from 'path';
import { updateData, updateImage, updateMetagames, generateFormatList } from './update.js';

export async function checkAndUpdateMonthly() {
  const statsPath = path.join(process.cwd(), 'stats');
  const updateFile = path.join(statsPath, 'last_update.json');

  await fs.mkdir(statsPath, { recursive: true });

  let lastUpdateMonth = '';
  try {
    const data = await fs.readFile(updateFile, 'utf-8');
    lastUpdateMonth = JSON.parse(data).month;
  } catch {}

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  if (lastUpdateMonth !== currentMonth) {
    console.log(`Monthly update triggered...`);
    await updateData();
    await updateImage();
    await updateMetagames();
    await generateFormatList();
    await fs.writeFile(updateFile, JSON.stringify({ month: currentMonth }));
  }
}
