import Image from "next/image";
import styles from "@/app/styles/Home.module.css";
import PlaysButton from "@/app/utils/plays-button";
import retrieveRecords from "@/app/utils/retrieveRecords";
import Link from "next/link";
import ClearPlaysButton from "@/app/utils/clear-plays-button";
import CreateSpotifyWrappedButton from "@/app/utils/spotifyWrappedButton"

export default async function Home() {
  // Fetch data directly in a Server Component
  const records = (await getRecords()).releases
  return (
    <div>
      <div className={styles.mainheader}>
        <h1>Discogs Tracking Page with "Spotify Wrapped" Writeup</h1>
        <CreateSpotifyWrappedButton></CreateSpotifyWrappedButton>
        <ClearPlaysButton></ClearPlaysButton>
      </div>
      <main className={styles.main}>
        <div className={styles.grid}>
          {records.map((record, i) => {
            return (
              <div key={record.basic_information.title}>
                <PlaysButton albumName = {record.basic_information.title}></PlaysButton>
                <Link className={styles.card} href={`/discogs-tracking/${record.id}`}>
                  <h2>
                    {record.basic_information.title} -{" "}
                    {record.basic_information.artists[0].name}
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
            );
          })}
        </div>
      </main>
    </div>
  );
}
async function getRecords() {
  //try catch if no user and default to blank map.
    const response = await retrieveRecords();
    if(response !== null)
    {
      return response;
    }
    else
    {
      throw new Error("No records found");
    }

  }