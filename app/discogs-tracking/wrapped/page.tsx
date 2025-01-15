import GradientBackground from '@/app/discogs-tracking/wrapped/components/GradientBackground';
import WrappedWriteup from '@/app/discogs-tracking/wrapped/components/WrappedWriteup';
import styles from '@/app/styles/Home.module.css';


export default async function WrappedPage() {
  return (
    <div className={styles.fullScreenContainer}>
      <GradientBackground />
      <WrappedWriteup />
    </div>
  );
}