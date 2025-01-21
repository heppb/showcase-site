"use client";

import React, { useState, useEffect } from "react";
import retrieveAlbums from "@/app/utils/retrieveAlbum";
import styles from "@/app/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";

interface RetrieveAlbumsClientProps {
  albumid: string;
}

const RetrieveAlbumsClient: React.FC<RetrieveAlbumsClientProps> = ({ albumid }) => {
  const [albumData, setAlbumData] = useState<any>(null);
  const [appleMusicID, setAppleMusicID] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await retrieveAlbums(albumid);
        if (response) {
          setAlbumData(response.album);
          setAppleMusicID(response.appleMusicId);
        } else {
          throw new Error("No records found");
        }
      } catch (err) {
        console.error("Error fetching album data:", err);
        setError("Failed to fetch album data");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [albumid]);

  if (loading) return <div>Loading...</div>;

  if (error || !albumData) {
    return <div>Error: {error || "No album data available"}</div>;
  }

  return (
    <>
      <Link className={styles.card} href={`/discogs-tracking/`}>
        <button className="baseButton">Back</button>
      </Link>
      <div className={styles.card}>
        <h2>
          {albumData.basic_information.title} -{" "}
          {albumData.basic_information.artists[0].name}
        </h2>
        <div className={styles.imageContainer}>
          <Image
            src={albumData.basic_information.cover_image}
            alt={albumData.basic_information.title}
            fill
            priority
            unoptimized //allows working with github pages
          />
        </div>
      </div>
      {appleMusicID && (
        <div>
          <iframe
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
            frameBorder="0"
            height="450"
            style={{
              width: "100%",
              overflow: "hidden",
              background: "transparent",
              borderRadius: "15px",
            }}
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
            src={`https://embed.music.apple.com/us/album/${appleMusicID}`}
          ></iframe>
        </div>
      )}
    </>
  );
};

export default RetrieveAlbumsClient;
