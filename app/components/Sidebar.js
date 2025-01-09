'use client'

import Link from 'next/link';
import { useState } from 'react';
import styles from "../styles/Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/about" className={styles.navLink}>About</Link>
          </li>
        </ul>
    </div>
  );
};

export default Sidebar;