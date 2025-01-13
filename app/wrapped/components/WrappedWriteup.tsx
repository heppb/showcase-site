'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '@/app/styles/Home.module.css';
import DiscogRecord from '@/app/models/DiscogRecord';

export default function WrappedWriteup({ data } : {data : DiscogRecord[]}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4">
    <motion.h1
      className="text-4xl md:text-6xl font-bold text-white mb-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      Your Wrapped {new Date().getFullYear()}
    </motion.h1>

    <motion.div
      className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      {data.map((album, index) => (
        <motion.div
          key={index}
          className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
        <div className={styles.imageContainer}>
            <Image
              src={album.basic_information.cover_image}
              alt={album.basic_information.title}
              fill
              priority
            />
          </div>
          <div className="p-4 text-white">
            <h2 className="text-xl font-bold">{album.basic_information.title}</h2>
            <p className="text-md italic text-gray-300">{album.basic_information.artists[0].name}</p>
            <p className="text-sm text-gray-400">{album.basic_information.year}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
  );
}
