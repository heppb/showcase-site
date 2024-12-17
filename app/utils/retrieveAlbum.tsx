import DiscogRecord from "../models/DiscogRecord";
import retrieveRecords from "./retrieveRecords";

interface PageProps {
  album: DiscogRecord;
  appleMusicId: string;
}

const retrieveAlbums = async (appleMusicId : string): Promise<(PageProps) | null> => {
    try {
        const albumId =  appleMusicId || {};
        if (!albumId || typeof albumId !== "string") {
        throw new Error("No albumId present");
        }
        const data = await retrieveRecords();
        if (!data || data.releases.length <= 0) {
          throw new Error("No records found");
        }
        
        const album = data.releases.find((a) => a.id === parseInt(albumId));
        if (!album) {
          throw new Error("No album found with the given id"); 
        }
        const albumName = album.basic_information.title.toLowerCase();
        const artistName = album.basic_information.artists[0].name.toLowerCase();
        const searchTerm = (albumName + " " + artistName).replaceAll(" ", "+");
        const iTunesResponse = await fetch(
            `https://itunes.apple.com/search?term=${searchTerm}&media=music&explicit=Y&entity=album`
          );
          const iTunesData = await iTunesResponse.json();

          if (!iTunesData.results || iTunesData.results.length < 0) {
            throw new Error("No apple music id found");
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
          if (!result) {
            throw new Error("No apple music id found");
          }
          return {
              album,
              appleMusicId: result.collectionId,
          };
      } catch (e) {
        return null;
      }
    };

    export default retrieveAlbums;