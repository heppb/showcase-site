'use client';

import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Chart } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart as ChartJS,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// -- hardcoded format list for now
const formatOptions = [
  { value: 'gen9ou', label: 'Gen 9 OU' },
  { value: 'gen9uu', label: 'Gen 9 UU' },
  { value: 'gen9ubers', label: 'Gen 9 Ubers' },
];

const d = new Date();
d.setMonth(d.getMonth() - 1);
const currentMonth = d.toISOString().slice(0, 7);

export default function StatsPage() {
  const [selectedFormat, setSelectedFormat] = useState('gen9ou');
  const [selectedPokemon, setSelectedPokemon] = useState<string[]>([]);
  const [trendData, setTrendData] = useState<any>(null);
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [data, setData] = useState<any>(null); // usage table data

  // Load monthly usage data for table + options
  useEffect(() => {
    fetch(`/api/stats/${currentMonth}/${selectedFormat}`)
      .then(res => res.json())
      .then(usage => {
        setData(usage);
        const names = Object.keys(usage);
        setPokemonList(
          names.map(name => ({ value: name, label: name }))
        );
      });
  }, [selectedFormat]);

  // Load trend data when Pokémon selected
  useEffect(() => {
    if (selectedPokemon.length === 0) return;

    const query = selectedPokemon.map(p => `pokemon=${encodeURIComponent(p)}`).join('&');
    fetch(`/api/stats/trends?format=${selectedFormat}&${query}`)
      .then(res => res.json())
      .then(setTrendData);
  }, [selectedPokemon, selectedFormat]);

  const handlePokemonSelect = (
    options: readonly { value: string; label: string }[] | null
  ) => {
    setSelectedPokemon(options ? options.map(opt => opt.value) : []);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Usage Stats - {selectedFormat.toUpperCase()} ({currentMonth})</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label>Format:</label>
        <select
          value={selectedFormat}
          onChange={(e) => setSelectedFormat(e.target.value)}
          style={{ marginLeft: '1rem' }}
        >
          {formatOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Compare Pokémon:</label>
        <Select
          options={pokemonList}
          isMulti
          onChange={handlePokemonSelect}
          placeholder="e.g. Garchomp, Blissey..."
          isClearable
        />
      </div>

      {trendData && (
        <div style={{ marginBottom: '2rem' }}>
          <h2>Usage Trends</h2>
          <Chart
            type="line"
            data={{
              labels: trendData.months,
              datasets: trendData.trends.map((t: any, index: number) => ({
                label: t.name,
                data: t.usage,
                borderColor: `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
                fill: false,
              })),
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom' as const },
                title: { display: true, text: 'Monthly Usage (%)' },
              },
            }}
          />
        </div>
      )}

      {data && (
        <div>
          <h2>Current Month Usage Ranking</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem' }}>#</th>
                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Pokémon</th>
                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Usage %</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data)
                .sort((a: any, b: any) => b[1].usage - a[1].usage)
                .map(([name, stats]: any, index) => (
                  <tr key={name}>
                    <td style={{ padding: '0.5rem' }}>{index + 1}</td>
                    <td style={{ padding: '0.5rem' }}>{name}</td>
                    <td style={{ padding: '0.5rem' }}>{(stats.usage * 100).toFixed(2)}%</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
