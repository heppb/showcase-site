'use client'

import Link from 'next/link';
import styles from "../styles/Sidebar.module.css";

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
            <Link href="/cool-projects" className={styles.navLink}>Cool Projects</Link>
          </li>
        </ul>
    </div>
  );
};

export default Sidebar;