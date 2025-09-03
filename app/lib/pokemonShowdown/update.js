import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import JSON5 from 'json5';

// Ensure required directories exist
const ensureDir = async (dir) => {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {}
};

export async function updateMetagames() {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  if (month === 0) {
    month = 12;
    year -= 1;
  }
  const monthStr = String(month).padStart(2, '0');
  const baseURL = `https://www.smogon.com/stats/${year}-${monthStr}/chaos/`;
  const formats = ['gen9ou', 'gen9uu', 'gen9ubers', 'gen9ru', 'gen9nu', 'gen9doublesou'];

  const statsDir = path.join(process.cwd(), 'stats');
  await fs.mkdir(statsDir, { recursive: true });

  for (const format of formats) {
    const url = `${baseURL}${format}-0.json`;
    try {
      const res = await axios.get(url);
      const filePath = path.join(statsDir, `${format}-0.json`);
      await fs.writeFile(filePath, JSON.stringify(res.data, null, 2));
      console.log(`Saved: ${filePath}`);
    } catch (e) {
      console.warn(`Failed to fetch ${format} stats`, e.message);
    }
  }
}


export async function updateData() {
  const statsDir = path.join(process.cwd(), 'stats');
  await ensureDir(statsDir);

  const writeJSONFromJS = async (url, filename) => {
    const jsText = (await axios.get(url)).data;
    const raw = '{' + jsText.split('{')[1].slice(0, -1);
    await fs.writeFile(path.join(statsDir, filename), raw, 'utf-8');
  };

  await writeJSONFromJS('https://play.pokemonshowdown.com/data/items.js', 'items.json');
  await writeJSONFromJS('https://play.pokemonshowdown.com/data/abilities.js', 'abilities.json');

  await fs.writeFile(
    path.join(statsDir, 'moves.json'),
    (await axios.get('https://play.pokemonshowdown.com/data/moves.json')).data,
    'utf-8'
  );

  await fs.writeFile(
    path.join(statsDir, 'pokedex.json'),
    (await axios.get('https://play.pokemonshowdown.com/data/pokedex.json')).data,
    'utf-8'
  );

  await extractBattleIconIndexesFromUrl(
    'https://raw.githubusercontent.com/smogon/sprites/master/ps-pokemon.sheet.mjs',
    path.join(statsDir, 'forms_index.json')
  );
}

async function extractBattleIconIndexesFromUrl(url, outFilePath) {
  const content = (await axios.get(url)).data.split('\n');
  const start = content.indexOf('const BattlePokemonIconIndexes = {') + 1;
  const end = content.indexOf('};');

  const filtered = content.slice(start, end).filter(line => !line.trim().startsWith('//'));
  let body = filtered.join('');
  body = body.replace(/\/\*[\s\S]*?\*\//g, '');
  body = body.replace(/(\d+ \+ \d+)/g, (m) => eval(m));
  body = body.replace(/(\w+):/g, '"$1":');

  const parsed = JSON5.parse(`{${body}}`);
  await fs.writeFile(outFilePath, JSON.stringify(parsed, null, 2));
}

export async function updateImage() {
  const staticDir = path.join(process.cwd(), 'public/static');
  await ensureDir(staticDir);

  const downloadImage = async (url, filename) => {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    await fs.writeFile(path.join(staticDir, filename), response.data);
  };

  await downloadImage('https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png', 'pokemonicons-sheet.png');
  await downloadImage('https://play.pokemonshowdown.com/sprites/itemicons-sheet.png', 'itemicons-sheet.png');
}

export async function generateFormatList() {
  const formatsText = (await axios.get('https://raw.githubusercontent.com/smogon/pokemon-showdown/master/config/formats.ts')).data;
  const formatNames = [...formatsText.matchAll(/name:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);

  const statsPath = path.join(process.cwd(), 'stats');
  const files = await fs.readdir(statsPath);
  const metas = files.filter(f => f.endsWith('-0.json')).map(f => f.split('-').slice(-2)[0]);

  const metaNames = {};
  for (const meta of metas) {
    const normalized = formatNames.map(n => n.toLowerCase());
    const match = normalized.find(n => n.replace(/[^a-z0-9]/g, '') === meta);
    const found = match ? formatNames[normalized.indexOf(match)] : null;
    if (found) {
      metaNames[meta] = found;
    } else {
      console.log(`Unable to find format name for ${meta}`);
    }
  }

  await fs.writeFile(path.join(statsPath, 'meta_names.json'), JSON.stringify(metaNames, null, 2));
}
