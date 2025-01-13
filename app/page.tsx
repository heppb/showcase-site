import Image from "next/image";
import styles from "./styles/Home.module.css";
import PlaysButton from "./utils/plays-button";
import retrieveRecords from "./utils/retrieveRecords";
import Link from "next/link";
import ClearPlaysButton from "./utils/clear-plays-button";
import CreateSpotifyWrappedButton from "./utils/spotifyWrapped"

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
              <div>
                <PlaysButton albumName = {record.basic_information.title}></PlaysButton>
                <Link className={styles.card} href={`/${record.id}`}>
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