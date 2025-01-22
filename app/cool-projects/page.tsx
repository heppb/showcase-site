import styles from '@/app/styles/Home.module.css';
import image from "@/public/shuckle.png"
import doomPDF from "@/public/file.svg"
import Image from "next/image";
export default async function CoolProjects() {
    return (
        <div className={styles.mainCoolProjects}>
        <h1>These are just unrelated tech, code, or friends side projects that I would like to showcase</h1>
        <div className={styles.flexPageCoolProjects}>
            <a className={styles.card} href="https://triple1195.github.io/">
                <h2>
                    SAPA Repository
                </h2>
                <div className={styles.imageContainer}>
                <Image
                    src={image}
                    alt="SAPA Repository"
                    fill
                    priority
                />
                </div>
            </a>
            <a className={styles.card} href="https://doompdf.dev/">
                <h2>
                    Doom PDF
                </h2>
                <div className={styles.imageContainer}>
                <Image
                    src={doomPDF}
                    alt="DoomPDF"
                    fill
                    priority
                />
                </div>
            </a>  
        </div>
      </div>
    );
  }