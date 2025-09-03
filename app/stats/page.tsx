'use client';

import { useState } from 'react';
import Select from 'react-select';
import styles from "@/app/styles/Stats.module.css"

// Import pre-downloaded local JSON
import rawStats from '../../data/stats/2025-06/gen9ou-0.json';

export interface PokemonStatsEntry {
  Rank: number;
  Usage: number;
  Abilities?: Record<string, number>;
  Items?: Record<string, number>;
  Moves?: Record<string, number>;
  Spreads?: Record<string, number>;
  Teammates?: Record<string, number>;
  EVs?: Record<string, number>;
  Nature?: Record<string, number>;
  TeraTypes?: Record<string, number>;
}

export interface StatsFile {
  data: Record<string, PokemonStatsEntry>;
  info?: {
    baseStats?: Record<string, Record<string, number>>;
  };
}

const stats = rawStats as StatsFile;
const pokemonNames = Object.keys(stats.data);
const pokemonOptions = pokemonNames.map((name) => ({ label: name, value: name }));

// Helper function to get top N sorted entries
function topEntries(obj: Record<string, number> = {}, top = 5): [string, number][] {
  return Object.entries(obj)
    .sort((a, b) => b[1] - a[1])
    .slice(0, top);
}

export default function StatsPage() {
  const [selectedOption, setSelectedOption] = useState(pokemonOptions[0]);
  const selectedName = selectedOption.value;

  const mon = stats.data[selectedName];
  const baseStats = stats.info?.baseStats?.[selectedName] ?? {};

  if (!stats || !stats.data) {
  return <div>Failed to load stats data.</div>;
  }

  return (
    <div className={styles.statsPage}>
      <h1 className={styles.title}>Gen 9 OU - June 2025 Usage</h1>

      <div className={styles.selectContainer}>
        <Select
          options={pokemonOptions}
          value={selectedOption}
          onChange={(option) => option && setSelectedOption(option)}
          placeholder="Choose a Pokémon"
        />
      </div>

      <div className={styles.infoPanel}>
        <h2>{selectedName}</h2>
        <p><strong>Rank:</strong> {mon.Rank}</p>
        <p><strong>Usage %:</strong> {(mon.Usage * 100).toFixed(2)}%</p>

        <h3>Base Stats</h3>
        <ul>
          {Object.entries(baseStats).map(([stat, val]) => (
            <li key={stat}>{stat}: {val}</li>
          ))}
        </ul>

        <h3>Top Moves</h3>
        <ul>
          {topEntries(mon.Moves).map(([move, pct]) => (
            <li key={move}>{move}: {(pct * 100).toFixed(1)}%</li>
          ))}
        </ul>

        <h3>Top Teammates</h3>
        <ul>
          {topEntries(mon.Teammates).map(([ally, pct]) => (
            <li key={ally}>{ally}: {(pct * 100).toFixed(1)}%</li>
          ))}
        </ul>

        <button
          className={styles.exportButton}
          onClick={() => {
            const exportText = `
${selectedName} @ ITEM
Ability: ABILITY
Tera Type: TYPE
EVs: 252 HP / 252 Atk / 4 Spe
- Move 1
- Move 2
- Move 3
- Move 4
`.trim();
            navigator.clipboard.writeText(exportText);
            alert('Copied to clipboard!');
          }}
        >
          Export to Showdown
        </button>
      </div>
    </div>
  );
}
