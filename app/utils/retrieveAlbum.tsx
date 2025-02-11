import DiscogRecord from "../models/DiscogRecord";
import retrieveRecords from "./retrieveRecords";

interface PageProps {
  album: DiscogRecord;
  appleMusicId: string;
}

const retrieveAlbums = async (appleMusicId: string): Promise<PageProps | null> => {
  try {
    console.log("Apple Music ID:", appleMusicId);
    if (!appleMusicId || typeof appleMusicId !== "string") {
      throw new Error("No valid albumId provided");
    }

    const data = await retrieveRecords(1, 100);
    console.log("Retrieve Records Response:", data);

    if (!data || !data.releases || data.releases.length === 0) {
      throw new Error("No records found");
    }

    const album = data.releases.find((a) => a.id === parseInt(appleMusicId));
    console.log("Album Found:", album);

    if (!album) {
      throw new Error("No album found with the given ID");
    }
    console.log("Determining SRC Issues", album.basic_information.cover_image);
    const albumName = album.basic_information.title.toLowerCase();
    const artistName = album.basic_information.artists[0].name.toLowerCase();
    const searchTerm = (albumName + " " + artistName).replaceAll(" ", "+");
    console.log("Search Term for iTunes:", searchTerm);

    const iTunesResponse = await fetch(
      `https://itunes.apple.com/search?term=${searchTerm}&media=music&explicit=Y&entity=album`
    );
    const iTunesData = await iTunesResponse.json();
    console.log("iTunes Data:", iTunesData);

    if (!iTunesData.results || iTunesData.results.length === 0) {
      throw new Error("No Apple Music ID found");
    }

    const result = iTunesData.results.find(
      (a: any) =>
        albumName
          .split(" ")
          .map((name) =>
            a.collectionName.replace(":", "").toLowerCase().includes(name)
          )
          .includes(true) && a.artistName.toLowerCase().includes(artistName)
    );
    console.log("iTunes Result Found:", result);

    if (!result) {
      throw new Error("No Apple Music ID found");
    }

    return {
      album,
      appleMusicId: result.collectionId,
    };
  } catch (error) {
    console.error("Error in retrieveAlbums:", error);
    return null;
  }
};


    export default retrieveAlbums;