'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import styles from "@/app/styles/Home.module.css";
import PlaysButton from "@/app/utils/plays-button";
import retrieveRecords from "@/app/utils/retrieveRecords";
import Link from "next/link";
import ClearPlaysButton from "@/app/utils/clear-plays-button";
import CreateSpotifyWrappedButton from "@/app/utils/spotifyWrappedButton";
import DiscogRecord from '../models/DiscogRecord';

function DiscogsTracking() {
  const [isLoading, setIsLoading] = useState(true);
  const [records, setRecords] = useState<DiscogRecord[]>([]);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const userData = localStorage.getItem('user');

      if (userData) {
        // User data exists, retrieve records
        setUserExists(true);
        try {
          const response = await getRecords();
          setRecords(response.releases);
        } catch (error) {
          console.error("Error fetching records:", error);
        }
      } else {
        // No user data found
        setUserExists(false);
      }

      setIsLoading(false); // Done checking user
    };

    if (typeof window !== 'undefined') {
      checkUser();
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userExists) {
    return (
      <div className={styles.mainheader}>
        <h2>Enter User Info</h2>
        <p>Please enter your Discogs username to proceed.</p>
        <input type="text" placeholder="Enter your username" id="username" />
        <button
          onClick={() => {
            const username = (document.getElementById("username") as HTMLInputElement)?.value;
            if (username) {
              localStorage.setItem('user', JSON.stringify({ username }));
              window.location.reload(); // Reload the page to fetch records
            }
          }}
        >
          Submit
        </button>
        <p>Don't have an account? Use our default guest user</p>
        <button
          onClick={() => {
              localStorage.setItem('user', (process.env.USER || ""));
              window.location.reload(); // Reload the page to fetch records
          }}
        >
          Guest Account
        </button>
      </div>
    );
  }

  return (
    <div>
    <div className={styles.mainheader}>
      <h1>Discogs Tracking Page with "Spotify Wrapped" Writeup</h1>
      {records ?(
        <>
        <CreateSpotifyWrappedButton />
        <ClearPlaysButton albumNames = {records.map((record) => (record.basic_information.title))}/>
        </>) : <>
        <div className={styles.noRecords}></div>
        </>
        }     
      <button className='baseButton'
        onClick={() => {
          localStorage.removeItem('user');
          window.location.reload(); // Reload the page to fetch records
        }}
      >
        Log Out
      </button>
    </div>
    <main className={styles.main}>
      {records ? (
        <div className={styles.grid}>
          {records.map((record) => (
            <div key={record.basic_information.title}>
              <PlaysButton albumName={record.basic_information.title} />
              <Link className={styles.card} href={`/discogs-tracking/${record.id}`}>
                <h2>
                  {record.basic_information.title} - {record.basic_information.artists[0].name}
                </h2>
                <div className={styles.imageContainer}>
                  <Image
                    src={record.basic_information.cover_image}
                    alt={record.basic_information.title}
                    fill
                    priority
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noRecords}>
          <h2>No records found.</h2>
          <p>Please add some records in discogs or change users.</p>
        </div>
      )}
    </main>
  </div>
  );
}

async function getRecords() {
  try {
    const response = await retrieveRecords();
    return response || { releases: [] };
  } catch (error) {
    console.error("Error retrieving records:", error);
    throw new Error("No records found");
  }
}

export default DiscogsTracking;