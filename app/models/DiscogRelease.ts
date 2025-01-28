interface DiscogRelease {
    id: number;
    title: string;
    tracklist: Track[];
  }
  
interface Track {
    position: string; // e.g., "1", "A1", etc.
    title: string;
    duration?: string; // e.g., "4:30" (optional since not all tracks include durations)
  }

export default DiscogRelease;