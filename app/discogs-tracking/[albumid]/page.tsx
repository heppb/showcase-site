import React from "react";
import RetrieveAlbumsClient from "./components/RetrieveAlbumsClient";
import styles from "@/app/styles/Home.module.css";

export const dynamic = "force-dynamic"; // Ensure dynamic rendering

export default async function Page({ params }: { params: any }) {
  const { albumid } = params;

  return (
    <div>
      <main className={styles.main}>
        <RetrieveAlbumsClient albumid={albumid} />
      </main>
    </div>
  );
}