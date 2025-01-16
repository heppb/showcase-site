import React, { Suspense } from "react";
import RetrieveAlbumsClientWrapper from "./components/RetrieveAlbumsClientWrapper";
import styles from "@/app/styles/Home.module.css";

export default function Page() {
  return (
    <div>
      <main className={styles.main}>
        <Suspense fallback={<div>Loading...</div>}>
          <RetrieveAlbumsClientWrapper />
        </Suspense>
      </main>
    </div>
  );
}