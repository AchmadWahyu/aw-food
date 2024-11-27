import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import BottomNav from './navigations/BottomNav';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AW Food & Snack',
  description: 'AW Food & Snack website',
  metadataBase: new URL('https://aw-food.vercel.app'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} pb-16`}>
        <div className="bg-yellow-300">
          <h1 className="text-xl font-bold text-center">
            AW Food & Snack
          </h1>
        </div>

        {children}

        <BottomNav />
        <Toaster />

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
