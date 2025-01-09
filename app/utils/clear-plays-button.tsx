'use client';
 
import React, { useState, useEffect } from 'react';

export default function ClearPlaysButton()
{
  const handleClearLocalStorage = () => {
    //This is not clean I need to get the remove item array import in working and then a state update after on the child buttons
    localStorage.clear();
    location.reload();
  };

  return <button className="baseButton clearPlaysButton" onClick={handleClearLocalStorage}>Clear Plays</button>
}
