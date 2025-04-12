import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar'; // Assuming Navbar.js is in components

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Stock Exchange',
  description: 'FinTech: Automated Trading Agent',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="container mx-auto py-8"> {/* Basic container styling */}
          {children}
        </main>
      </body>
    </html>
  );
}