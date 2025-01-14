import GradientBackground from './components/GradientBackground';
import WrappedWriteup from './components/WrappedWriteup';


export default async function WrappedPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <GradientBackground />
      <WrappedWriteup />
    </div>
  );
}