import DiscogRelease from "../models/DiscogRelease";

async function retrieveIndividualRecord (releaseId : string): Promise<DiscogRelease> {
  const token: string = process.env.DISCOG_TOKEN || "";
  const response = await fetch(`https://api.discogs.com/releases/${releaseId}?token=${token}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch release data: ${response.statusText}`);
  }
  return (await response.json()) as DiscogRelease;
}

export default retrieveIndividualRecord;