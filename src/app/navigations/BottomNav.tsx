'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  const [allParams, setAllParams] = useState('');
  useEffect(() => {
    setAllParams(window?.location?.search);
  }, []);

  const snackMenu = pathname === '/';
  const packagingMenu = pathname === '/packaging';
  const orderMenu = pathname === '/order';

  return (
    <footer className="flex fixed bottom-0 bg-white w-full shadow-2xl max-w-lg mx-auto">
      <Link
        href={`/${allParams}`}
        className="w-full flex flex-col items-center py-3"
      >
        <Image
          className="basis-5 shrink-0 mx-2"
          src={snackMenu ? '/icon-snack-fill.png' : '/icon-snack.png'}
          alt="list kue"
          width={36}
          height={36}
        />
        <p
          className={
            snackMenu ? 'text-sm font-bold text-orange-400' : 'text-sm'
          }
        >
          List Kue
        </p>
      </Link>
      <Link
        href={`/packaging${allParams}`}
        className="w-full flex flex-col items-center py-3"
      >
        <Image
          className="basis-5 shrink-0 mx-2"
          src={
            packagingMenu ? '/icon-packaging-fill.png' : '/icon-packaging.png'
          }
          alt="list kemasan"
          width={36}
          height={36}
        />
        <p
          className={
            packagingMenu ? 'text-sm font-bold text-orange-400' : 'text-sm'
          }
        >
          List Kemasan
        </p>
      </Link>
      <Link
        href={`/order${allParams}`}
        className="w-full flex flex-col items-center py-3"
      >
        <Image
          className="basis-5 shrink-0 mx-2"
          src={orderMenu ? '/icon-order-fill.png' : '/icon-order.png'}
          alt="list kemasan"
          width={36}
          height={36}
        />
        <p
          className={
            orderMenu ? 'text-sm font-bold text-orange-400' : 'text-sm'
          }
        >
          Pesan
        </p>
      </Link>
    </footer>
  );
}
