import Image from "next/image";
import styles from "../styles/Home.module.css";
import DiscogResponse from "./models/DiscogResponse";

export default async function Home() {
  // Fetch data directly in a Server Component
  const records = (await getRecords()).releases
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.grid}>
          {records.map((record, i) => {
            return (
              <div key={i} className={styles.card}>
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
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
async function getRecords() {
    const response = await fetch(
      `https://api.discogs.com/users/alexrabin/collection/folders/0/releases?token=${process.env.DISCOG_TOKEN}&per_page=100&sort=artist`
    );
    const data = (await response.json()) as DiscogResponse;
    return data
  }
