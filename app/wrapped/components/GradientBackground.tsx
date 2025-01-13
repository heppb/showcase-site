'use client';

import { motion } from 'framer-motion';
import styles from '/Users/Brian Hepp/Desktop/CodeProjects/NextJSApp/discogs-example/app/styles/GradiantBackground.module.css'

export default function GradientBackground() {
  return (
    <motion.div
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: 'linear',
      }}
      className={styles.gradientBackground}
      style={{
        backgroundSize: '200% 200%',
      }}
    />
  );
}
