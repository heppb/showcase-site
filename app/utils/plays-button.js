'use client';
 
import { useState } from 'react';
 
export default function LikeButton() {
  const [plays, setLikes] = useState(0);
 
  function handleClick() {
    setLikes(plays + 1);
  }
 
  return <button onClick={handleClick}>Plays ({plays})</button>;
}