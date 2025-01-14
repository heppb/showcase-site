"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DiscogRecord from "@/app/models/DiscogRecord";
import SpotifyWrappedModel from "@/app/models/SpotifyWrappedModel";
import retrieveRecords from "@/app/utils/retrieveRecords";
import styles from "@/app/styles/Home.module.css";
import Image from "next/image";

export default function WrappedWriteup() {
  const [spotifyWrappedData, setSpotifyWrappedData] = useState<SpotifyWrappedModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const records = await retrieveRecords();
        if (records !== null) {
          const spotifyWrappedResponse = await gatherSpotifyWrappedData(records.releases);
          setSpotifyWrappedData(spotifyWrappedResponse);
        }
      } catch (error) {
        console.error("Error fetching Spotify Wrapped data:", error);
      } finally {
        setLoading(false); // Ensure loading state updates
      }
    };

    fetchData();
  }, []);

  const gatherSpotifyWrappedData = async (records: DiscogRecord[]): Promise<SpotifyWrappedModel | null> => {
    if (!records || records.length === 0) {
      return null;
    }

    const recordsAndPlays = records.map((record) => {
      const storedData = localStorage.getItem(record.basic_information.title);
      const playData = storedData ? JSON.parse(storedData) : { count: 0, timestamps: [] };

      return {
        discogRecord: record,
        playCount: playData.count,
        timestamps: playData.timestamps,
      };
    });

    const userData = {
      wrappedYear: new Date().getFullYear(),
      name: "Guest User",
    };

    const topAlbum = {
      title: records[0]?.basic_information.title || "Unknown Album",
      artist: records[0]?.basic_information.artists[0].name || "Unknown Artist",
      year: records[0]?.basic_information.year || 0,
      cover: records[0]?.basic_information.cover_image || "https://via.placeholder.com/150",
    };

    if (!topAlbum) {
      console.warn("No top album available.");
      return null;
    }

    const albumData = {
      topAlbum,
      totalMinutes: recordsAndPlays.reduce((total, record) => total + record.playCount * 40, 0),
      favoriteGenre: "Pop",
      albumsListened: recordsAndPlays.length,
    };

    return {
      recordsAndPlays: recordsAndPlays,
      userData,
      albumData,
    };
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="loading-container"
      >
        <p>Loading your Spotify Wrapped...</p>
      </motion.div>
    );
  }

  if (!spotifyWrappedData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="error-container"
      >
        <p>Could not load your Spotify Wrapped data. Please try again later.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="wrapped-container"
    >
      <h1>Spotify Wrapped {spotifyWrappedData.userData.wrappedYear}</h1>
      <h2>{spotifyWrappedData.userData.name}'s Summary</h2>

      <div className="album-section">
        <h3>Top Album</h3>
        <p>
          {spotifyWrappedData.albumData.topAlbum.title} by {spotifyWrappedData.albumData.topAlbum.artist} (
          {spotifyWrappedData.albumData.topAlbum.year})
        </p>
        <div className={styles.imageContainer}>
          <Image
            src={spotifyWrappedData.albumData.topAlbum.cover}
            alt={spotifyWrappedData.albumData.topAlbum.title}
            fill
            priority
          />
        </div>
      </div>

      <div className="records-section">
        <h3>Top 5 Records</h3>
        {spotifyWrappedData.recordsAndPlays
        .sort((a, b) => b.playCount - a.playCount) // Sort by playCount in descending order
        .slice(0, 5) // Take the top 5 records
        .map((record, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="record-item"
          >
            <p>Album: {record.discogRecord.basic_information.title}</p>
            <div className={styles.imageContainer}>
              <Image
                src={record.discogRecord.basic_information.cover_image}
                alt={record.discogRecord.basic_information.title}
                fill
                priority
              />
            </div>
            <p>Artist: {record.discogRecord.basic_information.artists[0].name}</p>
            <p>Year: {record.discogRecord.basic_information.year}</p>
            <p>Plays: {record.playCount}</p>
            <p>Last Played: {(record.timestamps[record.timestamps.length - 1]) || "N/A"}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
