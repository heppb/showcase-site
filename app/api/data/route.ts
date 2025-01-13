import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    topAlbum: {
      title: 'Album One',
      artist: 'Artist One',
      year: 2023,
      cover: '/images/album1.jpg',
    },
    totalMinutes: 12345,
    favoriteGenre: 'Indie Pop',
    albumsListened: 150,
  };

  return NextResponse.json(data);
}
