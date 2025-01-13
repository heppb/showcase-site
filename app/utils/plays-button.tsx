'use client';
 
import React, { useState, useEffect } from 'react';

interface PlayData {
  count: number;
  timestamps: string[];
}
 
export default function UpdatedLikeButton({albumName}: { albumName: string }) {
  const [plays, setPlays] = useState<PlayData>(() => {
    // Retrieve data from local storage or initialize with default values
    const storedData = localStorage.getItem(albumName);
    return storedData ? JSON.parse(storedData) : { count: 0, timestamps: [] };
  });

  useEffect(() => {
    // Update local storage whenever `plays` changes
    localStorage.setItem(albumName, JSON.stringify(plays));
  }, [plays, albumName]);

  const handlePlay = () => {
    const timestamp = new Date().toISOString();
    setPlays((prev) => ({
      count: prev.count + 1,
      timestamps: [...prev.timestamps, timestamp], // Add the new timestamp
    }));
  };

  return (
    <button className="baseButton" onClick={handlePlay}>
      Plays ({plays.count})
    </button>
  );
}