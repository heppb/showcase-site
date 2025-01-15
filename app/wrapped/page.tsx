import GradientBackground from './components/GradientBackground';
import WrappedWriteup from './components/WrappedWriteup';
import styles from '@/app/styles/Home.module.css';


export default async function WrappedPage() {
  return (
    <div className={styles.fullScreenContainer}>
      <GradientBackground />
      <WrappedWriteup />
    </div>
  );
}