'use client';

import Link from 'next/link';

export default function CreateDiscogsWrappedButton()
{
    return (
    <Link href="/discogs-tracking/wrapped">
        <button className="baseButton playbutton">Discogs Wrapped</button>
    </Link>
    );
}