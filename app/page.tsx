import styles from "@/app/styles/Home.module.css"
import image from "@/public/discogslogo.png"
import partyImage from "@/public/PartySquare.png"
import Link from "next/link";
import Image from "next/image";
export default async function Home() {
  return (
    <div className={styles.main}>
      <h1>Welcome to Brian Hepp&apos;s Development Collection</h1>
      <h2>Check out the following projects on the sidebar, or by clicking on their relevant images</h2>
      <div className={styles.flexPage}>
        <Link className={styles.card} href={`/discogs-tracking/`}>
          <h2>
            Discogs Tracking Site
          </h2>
          <div className={styles.imageContainer}>
            <Image
              src={image}
              alt="discogs-tracking"
              fill
              priority
            />
          </div>
        </Link>
        <Link className={styles.card} href={`/cool-projects/`}>
          <h2>
            Cool Projects
          </h2>
          <div className={styles.imageContainer}>
            <Image
              src={partyImage}
              alt="cool-projects"
              fill
              priority
            />
          </div>
        </Link>
      </div>   
    </div>
  );
}