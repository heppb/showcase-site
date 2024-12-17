'use client'

import Link from 'next/link';
import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="lg:w-64 h-screen bg-gray-200 p-4">
      <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
        Toggle Sidebar
      </button>
      {isOpen && (
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;