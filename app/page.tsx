import Image from "next/image";
import styles from "./styles/Home.module.css";
import PlaysButton from "./utils/plays-button";
import CookieStore from "./utils/cookie-store";
import retrieveRecords from "./utils/retrieveRecords";
import Link from "next/link";

export default async function Home() {
  // Fetch data directly in a Server Component
  const records = (await getRecords()).releases
  return (
    <div>
      <div className={styles.mainheader}>
        <h1>Eventually Track Plays in Cookies and Have a Spotify Writeup Button</h1>
        <button>Spotify Wrapped</button>
      </div>
      <main className={styles.main}>
        <div className={styles.grid}>
          {records.map((record, i) => {
            return (
              <Link key={i} className={styles.card} href={`/${record.id}`}>
                <PlaysButton></PlaysButton>
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
