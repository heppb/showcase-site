// scripts/updateStats.js
import { downloadLatestMonth } from '../lib/update.js';

console.log('Updating Pokémon stats...');
await downloadLatestMonth();
console.log('✅ Update complete');
