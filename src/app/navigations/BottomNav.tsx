'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cookie, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BottomNav() {
  const pathname = usePathname();
  const [allParams, setAllParams] = useState('');
  useEffect(() => {
    setAllParams(window?.location?.search);
  }, []);

  const snackMenu = pathname === '/';
  const packagingMenu = pathname === '/packaging';
  return (
    <footer className="fixed bottom-0 z-30 flex w-full max-w-lg border-t border-[#ead8bf] bg-white shadow-[0_-8px_24px_rgba(90,59,46,0.08)]">
      <Link
        prefetch
        href={`/${allParams}`}
        className={cn(
          'flex w-full flex-col items-center gap-1 py-3 text-sm font-bold',
          snackMenu ? 'text-[#db6c22]' : 'text-[#94a3bd]'
        )}
      >
        <Cookie className="h-7 w-7" />
        Menu
      </Link>
      <Link
        prefetch
        href={`/packaging${allParams}`}
        className={cn(
          'flex w-full flex-col items-center gap-1 py-3 text-sm font-bold',
          packagingMenu ? 'text-[#db6c22]' : 'text-[#94a3bd]'
        )}
      >
        <Package className="h-7 w-7" />
        Kemasan
      </Link>
    </footer>
  );
}
