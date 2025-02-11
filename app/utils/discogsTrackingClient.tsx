'use client';

import { useCallback, useEffect, useState } from 'react';
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<'artist' | 'title' | 'genre' | 'year'>('artist'); // Default sort by artist
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRecords = useCallback(async (newPage = 1) => {
    try {
      const response = await getRecords(newPage, 100);
      setRecords(response.releases);
      setTotalPages(response?.pagination?.pages || 1);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  }, []); // No dependencies since `getRecords` is assumed to be stable.
  
  useEffect(() => {
    const checkUser = async () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUserExists(true);
        try {
          await fetchRecords(page);
        } catch (error) {
          console.error("Error fetching records:", error);
        }
      } else {
        setUserExists(false);
      }
      setIsLoading(false);
    };

    if (typeof window !== 'undefined') {
      checkUser();
    }
  }, [page, fetchRecords]);

  async function getRecords(page: number, perPage: number) {
    try {
      const response = await retrieveRecords(page, perPage, false);
      return response || { releases: [], pagination: null };
    } catch (error) {
      console.error("Error retrieving records:", error);
      throw new Error("No records found");
    }
  }
  
  const sortRecords = useCallback(() => {
    setRecords((prevRecords) => {
      return [...prevRecords].sort((a, b) => {
        let aPrimary = "";
        let bPrimary = "";
        let aSecondary = "";
        let bSecondary = "";
  
        switch (sortField) {
          case "title":
            aPrimary = a.basic_information.title.toLowerCase();
            bPrimary = b.basic_information.title.toLowerCase();
            break;
          case "artist":
            aPrimary = a.basic_information.artists[0]?.name.toLowerCase() || "";
            bPrimary = b.basic_information.artists[0]?.name.toLowerCase() || "";
            aSecondary = a.basic_information.title.toLowerCase();
            bSecondary = b.basic_information.title.toLowerCase();
            break;
          case "genre":
            aPrimary = a.basic_information.genres[0]?.toLowerCase() || "";
            bPrimary = b.basic_information.genres[0]?.toLowerCase() || "";
            break;
          case "year":
            aPrimary = a.basic_information.year?.toString() || "";
            bPrimary = b.basic_information.year?.toString() || "";
            break;
          default:
            aPrimary = a.basic_information.title.toLowerCase();
            bPrimary = b.basic_information.title.toLowerCase();
            break;
        }
  
        const primaryComparison = sortOrder === "asc" ? aPrimary.localeCompare(bPrimary) : bPrimary.localeCompare(aPrimary);
  
        if (primaryComparison === 0 && aSecondary && bSecondary) {
          return sortOrder === "asc" ? aSecondary.localeCompare(bSecondary) : bSecondary.localeCompare(aSecondary);
        }
  
        return primaryComparison;
      });
    });
  }, [sortField, sortOrder]);

  useEffect(() => {
    if (records.length > 0) {
      sortRecords();
    }
  }, [records.length, sortRecords]);
  

  const filteredRecords = records.filter(record => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const fieldsToSearch = {
      title: record.basic_information.title.toLowerCase(),
      artist: record.basic_information.artists[0]?.name.toLowerCase() || '',
      genre: record.basic_information.genres[0]?.toLowerCase() || '',
      year: record.basic_information.year?.toString() || '',
    };

    return Object.values(fieldsToSearch).some(value => value.includes(lowerSearchTerm));
  });

  if (isLoading) return <div>Loading...</div>;
  if (!userExists) {
    return (
      <div className={`${styles.mainheaderUserInfo} ${styles.loginSpacing}`}>
        <h2>Enter User Info</h2>
        <p className={styles.marginBottom}>Please enter your Discogs username to proceed.</p>
        <input type="text" placeholder="Enter your username" id="username" />
        <button className={styles.baseLoginButton} onClick={() => {
          const username = (document.getElementById("username") as HTMLInputElement)?.value;
          if (username) {
            localStorage.setItem('user', username);
            window.location.reload();
          }
        }}>Submit</button>
        <p>Don&apos;t have an account? Use our default guest user</p>
        <button className={styles.baseLoginButton} onClick={() => {
          localStorage.setItem('user', process.env.USER || "DrFrappuccino");
          window.location.reload();
        }}>Guest Account</button>
      </div>
    );
  }

  return (
    <div className={styles.maxWidth}>
      <div className={styles.mainheader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Discogs Tracking Page</h1>
          <button className={styles.baseLogoutButton} onClick={() => {
              localStorage.removeItem('user');
              window.location.reload();
            }}>Log Out
          </button>
        </div>
        <div className={styles.buttonGroup}>
          <CreateSpotifyWrappedButton />
          <ClearPlaysButton albumNames={records.map(record => record.basic_information.title)} />
        </div>
        <div className={styles.controlsRow}>
          <input 
            type="text" 
            placeholder="Search album by artist / title / genre / year" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchBox}
          />
          
          {/* Sort By Dropdown */}
          <select onChange={(e) => { setSortField(e.target.value as 'artist' | 'title' | 'genre' | 'year'); sortRecords(); }}>
            <option value="artist">Sort by Artist</option>
            <option value="title">Sort by Title</option>
            <option value="genre">Sort by Genre</option>
            <option value="year">Sort by Year</option>
          </select>
          
          <button className={styles.sortButton} onClick={() => {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            sortRecords();
          }}>Sort {sortOrder === "asc" ? "↓" : "↑"}</button>
        </div>
        <div className={styles.paginationContainer}>
          <button className={styles.pageButton} disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
          <span className={styles.pageInfo}>Page {page} of {totalPages}</span>
          <button className={styles.pageButton} disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
      <main className={styles.main}>
        {filteredRecords.length > 0 ? (
          <div className={styles.grid}>
            {filteredRecords.map(record => (
              <div key={record.basic_information.id}>
                <PlaysButton albumName={record.basic_information.title} albumID={record.basic_information.id} />
                <Link className={styles.card} href={`/discogs-tracking/album?albumID=${record.id}`}>
                  <h2>{record.basic_information.title} - {record.basic_information.artists[0].name}</h2>
                  <div className={styles.imageContainer}>
                    <Image src={record.basic_information.cover_image} alt={record.basic_information.title} fill priority />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noRecords}>
            <h2>No records found.</h2>
            <p>Please add some records in Discogs or change users.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default DiscogsTracking;
