'use client';

export default function ClearPlaysButton({albumNames}:{albumNames : string[]})
{
  const handleClearLocalStorage = () => {
    
    const keysToRemove = albumNames; // Replace with actual keys

    // Loop through the keys and remove them
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
    location.reload();
  };

  return <button className="baseButton clearPlaysButton" onClick={handleClearLocalStorage}>Clear Plays</button>
}
