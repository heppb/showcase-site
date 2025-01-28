"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import DiscogRecord from "@/app/models/DiscogRecord";
import SpotifyWrappedModel from "@/app/models/SpotifyWrappedModel";
import retrieveRecords from "@/app/utils/retrieveRecords";
import styles from "@/app/styles/Home.module.css";
import Image from "next/image";

export default function WrappedWriteup() {
  const [spotifyWrappedData, setSpotifyWrappedData] = useState<SpotifyWrappedModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const user: string = process.env.USER as string;
  

  const gatherSpotifyWrappedData = useCallback(
    async (records: DiscogRecord[]): Promise<SpotifyWrappedModel | null> => {
      if (!records || records.length === 0) {
        return null;
      }

      const recordsAndPlays = records.map((record) => {
        const storedData = localStorage.getItem(record.basic_information.title);
        const durationKey = `albumDuration_${record.basic_information.id}`;
        const albumLength = localStorage.getItem(durationKey);
        console.log("AlbumLength = " + albumLength);
        record.basic_information.albumLength = Number(albumLength);
        const playData = storedData ? JSON.parse(storedData) : { count: 0, timestamps: [] };

        return {
          discogRecord: record,
          playCount: playData.count,
          timestamps: playData.timestamps,
        };
      });

      const userData = {
        wrappedYear: new Date().getFullYear(),
        name: user || "Guest User",
      };
      
      const sortedRecords = recordsAndPlays.sort((a, b) => b.playCount - a.playCount);
      const topAlbum = {
        title: sortedRecords[0]?.discogRecord.basic_information.title || "Unknown Album",
        artist: sortedRecords[0]?.discogRecord.basic_information.artists[0].name || "Unknown Artist",
        year: sortedRecords[0]?.discogRecord.basic_information.year || 0,
        cover: sortedRecords[0]?.discogRecord.basic_information.cover_image || "https://via.placeholder.com/150",
      };

      if (!topAlbum) {
        console.warn("No top album available.");
        return null;
      }

      const genreCounts: { [key: string]: number } = {};
      recordsAndPlays.forEach((record) => {
        record.discogRecord.basic_information.genres.forEach((genre: string) => {
          genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        });
      });

      const favoriteGenre =
        Object.entries(genreCounts)
          .sort(([, countA], [, countB]) => countB - countA)
          .map(([genre]) => genre)[0] || "Unknown Genre";

      const albumData = {
        topAlbum,
        totalMinutes: recordsAndPlays.reduce((total, record) => total + record.playCount * (record.discogRecord.basic_information.albumLength | 40), 0),
        favoriteGenre,
        albumsListened: recordsAndPlays.length,
      };

      return {
        recordsAndPlays,
        userData,
        albumData,
      };
    },
    [user]
  );

  const fetchData = useCallback(async () => {
    try {
      const records = await retrieveRecords();
      if (records !== null) {
        const spotifyWrappedResponse = await gatherSpotifyWrappedData(records.releases);
        setSpotifyWrappedData(spotifyWrappedResponse);
      }
    } catch (error) {
      console.error("Error fetching Discogs Wrapped data:", error);
    } finally {
      setLoading(false); // Ensure loading state updates
    }
  }, [gatherSpotifyWrappedData]); // Remove retrieveRecords from the dependencies

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <p>Loading your Discogs Wrapped...</p>
      </motion.div>
    );
  }

  if (!spotifyWrappedData || spotifyWrappedData.recordsAndPlays.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <p>Could not load your Discogs Wrapped data. Please try again later.</p>
      </motion.div>
    );
  }
    const sections = [
      {
        title: `Discogs Wrapped ${spotifyWrappedData.userData.wrappedYear}`,
        content: `${spotifyWrappedData.userData.name}'s Highlights`,
      },
      {
        title: 'Top Album',
        content: `${spotifyWrappedData.albumData.topAlbum.title} by ${spotifyWrappedData.albumData.topAlbum.artist}`,
        image: spotifyWrappedData.albumData.topAlbum.cover,
      },
      {
        title: 'Fun Facts',
        content: `You listened to ${spotifyWrappedData.albumData.totalMinutes} minutes of music this year, with ${spotifyWrappedData.albumData.favoriteGenre} as your favorite genre.`,
      },
      {
        title: 'Top 5 Records',
        content: spotifyWrappedData.recordsAndPlays
          .sort((a, b) => b.playCount - a.playCount)
          .slice(0, 5)
          .map((record, index) => ({
            text: `${index + 1}. ${record.discogRecord.basic_information.title} by ${record.discogRecord.basic_information.artists[0].name}`,
            playCount: record.playCount,
            lastPlayed: record.timestamps[record.timestamps.length - 1] || "N/A",
          })),
      },
    ];
  
    const handleNext = () => {
      setCurrentSection((prev) => (prev + 1) % sections.length); // Loop back to the start
    };
    const current = sections[currentSection];

    return (
      <motion.div
        className={`${styles.wrappedContainer}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center">
          <motion.h1
            key={`title-${currentSection}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {current.title}
          </motion.h1>
  
          {current.image && (
            <motion.div
              className={styles.wrappedImageContainer}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
             <div className={styles.imageContainer}>
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  priority
                />
              </div>
            </motion.div>
          )}
  
          {Array.isArray(current.content) ? (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {current.content.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.text} - {item.playCount} Plays
                  Last Played - {item.lastPlayed}
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <motion.p
              key={`content-${currentSection}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {current.content}
            </motion.p>
          )}
  
          <motion.button
            onClick={handleNext}
            className={styles.wrappedButton}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
          Next
        </motion.button>
        <motion.div
          className={`${styles.progressIndicator}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {sections.map((_, index) => (
            <motion.div
              key={index}
              className={`${styles.progressDot} ${
                index === currentSection ? styles.activeDot : ""
              }`}
              animate={{
                scale: index === currentSection ? 1.5 : 1,
                opacity: index === currentSection ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>
        </div>
      </motion.div>
    );
}
