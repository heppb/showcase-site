'use client';

import Link from 'next/link';

export default function CreateSpotifyWrappedButton()
{
    return (
    <Link href="/discogs-tracking/wrapped">
        <button className="baseButton playbutton">Spotify Wrapped</button>
    </Link>
    );
}