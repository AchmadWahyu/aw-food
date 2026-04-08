'use client';

import { Suspense } from 'react';
import { Cookie, Package } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

function BottomNavInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const qs = searchParams.toString();
  const allParams = qs ? `?${qs}` : '';

  const snackMenu = pathname === '/';
  const packagingMenu = pathname === '/packaging';

  return (
    <footer className="flex fixed bottom-0 left-0 right-0 bg-white border-t border-warm-border z-20 max-w-2xl mx-auto">
      <Link
        prefetch
        href={`/${allParams}`}
        className={`w-full flex flex-col items-center py-2.5 gap-0.5 transition-colors ${
          snackMenu ? 'text-warm-primary' : 'text-warm-text-muted'
        }`}
      >
        <Cookie
          className="shrink-0"
          size={28}
          strokeWidth={snackMenu ? 2.5 : 1.5}
        />
        <span
          className={`text-xs ${snackMenu ? 'font-bold' : 'font-medium'}`}
        >
          Menu
        </span>
      </Link>
      <Link
        prefetch
        href={`/packaging${allParams}`}
        className={`w-full flex flex-col items-center py-2.5 gap-0.5 transition-colors ${
          packagingMenu ? 'text-warm-primary' : 'text-warm-text-muted'
        }`}
      >
        <Package
          className="shrink-0"
          size={28}
          strokeWidth={packagingMenu ? 2.5 : 1.5}
        />
        <span
          className={`text-xs ${packagingMenu ? 'font-bold' : 'font-medium'}`}
        >
          Kemasan
        </span>
      </Link>
    </footer>
  );
}

export default function BottomNav() {
  return (
    <Suspense fallback={null}>
      <BottomNavInner />
    </Suspense>
  );
}
