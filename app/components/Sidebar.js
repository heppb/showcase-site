'use client'

import Link from 'next/link';
import styles from "../styles/Sidebar.module.css";
import Image from "next/image";
import yoshi2 from "@/public/YoshiSquishForward.png"
import yoshi3 from "@/public/YoshiSquishPog.png"
import yoshi4 from "@/public/YoshiSquishSidePog.png"
import yoshi5 from "@/public/YoshiTongueConfused.png"
import yoshi6 from "@/public/YoshiTongueSideways.png"

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>Home</Link>
          </li> 
          <li className={styles.navItem}>
            <Link href="/discogs-tracking" className={styles.navLink}>Discogs Tracking</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/stats" className={styles.navLink}>Showdown Stats</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/cool-projects" className={styles.navLink}>Cool Projects</Link>
          </li>
        </ul>
        <div className={styles.imageContainer}>
        <Image
          src={yoshi2}
          alt="yoshi2"
          fill
          priority
        />
      </div>
        <div className={styles.imageContainer}>
        <Image
          src={yoshi3}
          alt="yoshi3"
          fill
          priority
        />
      </div>
        <div className={styles.imageContainer}>
        <Image
          src={yoshi4}
          alt="yoshi4"
          fill
          priority
        />
      </div>
        <div className={styles.imageContainer}>
        <Image
          src={yoshi5}
          alt="yoshi5"
          fill
          priority
        />
      </div>
        <div className={styles.imageContainer}>
        <Image
          src={yoshi6}
          alt="yoshi6"
          fill
          priority
        />
      </div>  
    </div>
  );
};

export default Sidebar;