import React from "react";
import RetrieveAlbumsClient from "./components/RetrieveAlbumsClient";
import styles from "@/app/styles/Home.module.css";

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