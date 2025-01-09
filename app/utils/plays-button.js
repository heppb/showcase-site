'use client';
 
import React, { useState, useEffect } from 'react';
 
export default function UpdatedLikeButton({albumName}) {
  const [plays, setLikes] = useState(Number(localStorage.getItem(albumName)) || 0);
  
  useEffect(() => {
    localStorage.setItem(albumName, plays);
  }, [plays]);

  return (
    <button className='baseButton' onClick={(e) => setLikes(plays + 1)}>Plays ({plays})</button>
  );
}