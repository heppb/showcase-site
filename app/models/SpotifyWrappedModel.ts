import DiscogRecord from "./DiscogRecord";

interface SpotifyWrappedModel {
    recordsAndPlays: RecordsAndPlays[],
    userData: UserData,
    albumData: AlbumData,
  }

interface RecordsAndPlays
{
    discogRecord : DiscogRecord
    playCount : number
    timestamps: string[];
}

interface UserData
{
    wrappedYear : number,
    name : string
}

interface AlbumData {
    topAlbum: {
      title: string;
      artist: string;
      year: number;
      cover: string;
    };
    totalMinutes: number;
    favoriteGenre: string;
    albumsListened: number;
  }

export default SpotifyWrappedModel;