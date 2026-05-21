import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Merriweather } from 'next/font/google';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import BottomNav from './navigations/BottomNav';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-be-vietnam-pro',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-merriweather',
});

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
      <body
        className={`${beVietnamPro.className} ${beVietnamPro.variable} ${merriweather.variable} min-h-screen bg-[#eef2f7] pb-20 max-w-lg mx-auto`}
      >
        {children}

        <BottomNav />
        <Toaster />

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
