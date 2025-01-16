'use client'

import React from "react";
import { useSearchParams } from "next/navigation"; // Import useSearchParams hook
import RetrieveAlbumsClient from "./components/RetrieveAlbumsClient";
import styles from "@/app/styles/Home.module.css";

export default function Page() {
  const searchParams = useSearchParams();
  const albumid = searchParams.get("albumID"); // Retrieve albumid from query params

  if (!albumid) {
    return <div className={styles.main}>No album ID provided</div>;
  }

  return (
    <div>
      <main className={styles.main}>
        <RetrieveAlbumsClient albumid={albumid} />
      </main>
    </div>
  );
}