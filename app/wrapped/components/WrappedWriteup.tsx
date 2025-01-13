'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '@/app/styles/Home.module.css';
import SpotifyWrappedModel from '@/app/models/SpotifyWrappedModel';

export default function WrappedWriteup({ data } : {data : SpotifyWrappedModel}) {
   // Sort the records by likes and get the top 5
   const topRecords = data.recordsAndPlays
   .sort((a, b) => b.playCount - a.playCount)
   .slice(0, 5);

 return (
   <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 text-center">
     <motion.h1
       className="text-4xl md:text-6xl font-bold text-white mb-8"
       initial={{ opacity: 0, y: -50 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 1 }}
     >
       Your Wrapped {data.userData.wrappedYear}
     </motion.h1>

     {/* User Data */}
     <motion.div
       className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 shadow-lg mb-6 text-white max-w-md"
       initial={{ opacity: 0, y: 30 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8 }}
     >
       <h2 className="text-2xl font-bold mb-4">{data.userData.name}'s Highlights</h2>
       <p>Total Minutes Listened: {data.albumData.totalMinutes}</p>
       <p>Favorite Genre: {data.albumData.favoriteGenre}</p>
       <p>Albums Listened: {data.albumData.albumsListened}</p>
     </motion.div>

     {/* Top Album */}
     <motion.div
       className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 shadow-lg mb-6 text-white max-w-md"
       initial={{ opacity: 0, y: 30 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8 }}
     >
       <h2 className="text-2xl font-bold mb-4">Top Album</h2>
       <div className={styles.imageContainer}>
            <Image
              src={data.albumData.topAlbum.cover}
              alt={data.albumData.topAlbum.title}
              fill
              priority
            />
          </div>
       <h3 className="text-xl">{data.albumData.topAlbum.title}</h3>
       <p>By {data.albumData.topAlbum.artist}</p>
       <p>Released in {data.albumData.topAlbum.year}</p>
     </motion.div>

     {/* Top 5 Records */}
     <motion.div
       className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl"
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
       {topRecords.map((record, index) => (
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
              src={record.discogRecord.basic_information.cover_image}
              alt={record.discogRecord.basic_information.title}
              fill
              priority
            />
          </div>
           <div className="p-4 text-white">
             <h3 className="text-xl font-bold">{record.discogRecord.basic_information.title}</h3>
             <p className="text-md italic text-gray-300">{record.discogRecord.basic_information.artists[0].name}</p>
             <p className="text-sm text-gray-400">Year: {record.discogRecord.basic_information.year}</p>
             <p className="text-sm text-yellow-400">Plays: {record.playCount}</p>
             <p>Last Played: {record.timestamps[record.timestamps.length - 1] || "N/A"}</p>
           </div>
         </motion.div>
       ))}
     </motion.div>
   </div>
  );
}
