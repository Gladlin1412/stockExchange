// layout.js (Modified)
'use client'; 
import './globals.css';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

export default function RootLayout({ children }) {
  const [isNavOpen, setNavOpen] = useState(true);

  return (
    <html lang="en">
      <body className="flex bg-black text-white">
        <aside
          className={`w-64 min-h-screen border-r border-white transition-transform duration-300 ${
            isNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Navbar isNavOpen={isNavOpen} setNavOpen={setNavOpen} /> 
        </aside>
        <main className="container mx-auto py-8 flex-1">
          {children}
        </main>
        {/* Add a button to toggle the navigation */}
        <button 
          onClick={() => setNavOpen(!isNavOpen)} 
          className="fixed bottom-4 left-4 bg-gray-800 p-2 rounded-full"
        >
          {isNavOpen ? 'Close Nav' : 'Open Nav'}
        </button>
      </body>
    </html>
  );
}