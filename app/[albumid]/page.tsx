import React from "react";
import retrieveAlbum from "../utils/retrieveAlbum";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";


export default async function Page({params} : {params:any}) {
  const { albumid } = params;
  const albumGotten = (await getAlbums(albumid))
  const album = albumGotten.album
  const appleMusicID = albumGotten.appleMusicId
    return (
      <div>
        <main className={styles.main}>
          <Link className={styles.card} href={`/`}>
            <button className="baseButton">Back</button>
          </Link>
          <div className={styles.card}>
            <h2>
              {album.basic_information.title} -{" "}
              {album.basic_information.artists[0].name}
            </h2>
            <div className={styles.imageContainer}>
              <Image
                src={album.basic_information.cover_image}
                alt={album.basic_information.title}
                fill
                priority
              />
            </div>
          </div>
          <div>
            <iframe
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              frameBorder="0"
              height="450"
              style={{
                width: "100%",
                overflow: "hidden",
                background: "transparent",
                borderRadius: "15px",
              }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
              src={`https://embed.music.apple.com/us/album/${appleMusicID}`}
            ></iframe>
          </div>
        </main>
      </div>
    );
  }
  async function getAlbums(albumId : string) {
    //try catch if no user and default to blank map.
      const response = await retrieveAlbum(albumId);
      if(response !== null)
      {
        return response;
      }
      else
      {
        throw new Error("No records found");
      }
  
    }