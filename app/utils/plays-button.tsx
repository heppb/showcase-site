'use client';
 
import React, { useState, useEffect } from 'react';
import { calculateAlbumLength } from "@/app/utils/retrieveRecordDuration";

interface PlayData {
  count: number;
  timestamps: string[];
}
 
export default function UpdatedLikeButton({albumName, albumID}: { albumName: string , albumID : number}) {
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
    const timestamp = new Date().toLocaleString();
    getRecordDuration(albumID, plays.count);
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

async function getRecordDuration(albumID: number, playCount: number): Promise<number> {
    const durationKey = `albumDuration_${albumID}`;
    const storedDuration = localStorage.getItem(durationKey);
    console.log(durationKey + " " + storedDuration);

    if (!storedDuration || storedDuration == "0" || playCount == 0) {
      try {
        const durationInSeconds = await calculateAlbumLength(albumID.toString());
        if (durationInSeconds !== null) {
          localStorage.setItem(durationKey, durationInSeconds.toString());
          return durationInSeconds;
        }
      } catch (error) {
        console.error(`Failed to calculate duration for ${albumID}`, error);
      }
    }
    else
    {
      console.log("AlbumLength = " + storedDuration);
    }

  return 0;
}
