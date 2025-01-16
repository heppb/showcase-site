import GradientBackground from '@/app/discogs-tracking/wrapped/components/GradientBackground';
import WrappedWriteup from '@/app/discogs-tracking/wrapped/components/WrappedWriteup';
import styles from '@/app/styles/Home.module.css';
import Link from 'next/link';


export default async function WrappedPage() {
  return (
    <div className={styles.fullScreenContainer}>
      <Link href={`/discogs-tracking/`}>
        <button className={  `head ${styles.baseButton} ${styles.basePadding}`  }>Return Back</button>
      </Link>
      <GradientBackground />
      <WrappedWriteup />
    </div>
  );
}