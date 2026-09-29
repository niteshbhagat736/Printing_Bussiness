import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'PrintMaster Pro | Printing, Signage & Fabrication Services',
  description: 'Complete printing, branding, signage and fabrication services. Digital printing, LED sign boards, UV printing, laser cutting, CNC routing, vehicle branding and more — all under one roof.',
  keywords: [
    'printing services nagpur',
    'led sign boards',
    'digital printing',
    'flex printing',
    'uv printing',
    'laser cutting',
    'cnc routing',
    'vehicle branding',
    'visiting cards',
    'acrylic letters',
    'signage company',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Navbar />
          <main style={{ minHeight: '70vh' }}>
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
