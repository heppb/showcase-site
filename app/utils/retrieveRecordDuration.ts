import DiscogRelease from "../models/DiscogRelease";

async function retrieveRecordDuration (releaseId : string): Promise<DiscogRelease> {
  const token: string = process.env.DISCOG_TOKEN || "";
  const response = await fetch(`https://api.discogs.com/releases/${releaseId}?token=${token}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch release data: ${response.statusText}`);
  }
  return (await response.json()) as DiscogRelease;
}

export async function calculateAlbumLength(releaseId: string): Promise<number> {
  const releaseData = await retrieveRecordDuration(releaseId);

  if (!releaseData.tracklist || releaseData.tracklist.length === 0) {
    throw new Error("Tracklist is missing or empty");
  }

  let totalSeconds = 0;

  releaseData.tracklist.forEach((track) => {
    if (track.duration) {
      const [minutes, seconds] = track.duration.split(":").map(Number);
      totalSeconds += minutes * 60 + (seconds || 0);
    }
  });

  return totalSeconds / 60;
}