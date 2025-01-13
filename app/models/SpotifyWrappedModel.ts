import DiscogRecord from "./DiscogRecord";

interface SpotifyWrappedModel {
    records: DiscogRecordAndLikes[],
    userData: UserData,
    albumData: AlbumData,
  }

interface DiscogRecordAndLikes
{
    discogRecord : DiscogRecord
    likeCount : number
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