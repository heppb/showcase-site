import DiscogRecord from "../models/DiscogRecord";
import SpotifyWrappedModel from "../models/SpotifyWrappedModel";
import retrieveRecords from "@/app/utils/retrieveRecords";

const getSpotifyWrapped = async (): Promise<SpotifyWrappedModel | null> => {
    try {
        const records = await retrieveRecords();
        if(records !== null)
        {
            const spotifyWrappedResponse = gatherSpotifyWrappedData(records.releases);
            return spotifyWrappedResponse;
        }
        else
        {
          throw new Error("No records found");
        }
    }catch (e) {
      console.error("Error fetching Spotify Wrapped data:", e);
      return null;
    }
  };

  async function gatherSpotifyWrappedData(records: DiscogRecord[]): Promise<SpotifyWrappedModel | null> {
    if (!records || records.length === 0) {
      return null;
    }
  
    // Example logic to populate SpotifyWrappedModel data
    const recordsAndPlays = records.map((record) => ({
      discogRecord: record,
      playCount: Math.floor(Math.random() * 100), // Simulate likes count
      timestamps: [],
    }));
  
    const userData = {
      wrappedYear: new Date().getFullYear(),
      name: "John Doe", // Replace with actual user data if available
    };
  
    const topAlbum = {
      title: records[0]?.basic_information.title || "Unknown Album",
      artist: records[0]?.basic_information.artists[0].name || "Unknown Artist",
      year: records[0]?.basic_information.year || 0,
      cover: records[0]?.basic_information.cover_image || "https://via.placeholder.com/150", // Fallback for missing cover
    };
  
    const albumData = {
      topAlbum,
      totalMinutes: records.length * 40, // Example: Assume 40 mins per album
      favoriteGenre: records[0].basic_information.genres[0], // Replace with calculated genre
      albumsListened: records.length,
    };
  
    return {
      recordsAndPlays,
      userData,
      albumData,
    };
  }

export default getSpotifyWrapped;