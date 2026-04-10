'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FloatingOrderBar from './FloatingOrderBar';
import OrderSummaryDrawer from './OrderSummaryDrawer';
import { shouldOpenOrderDrawerFromSearchParams } from '@/lib/order-ui';

function GlobalOrderUIInner() {
  const [isManuallyOpen, setIsManuallyOpen] = useState(false);
  const viewOrderButtonRef = useRef<HTMLButtonElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isOpenFromQuery = shouldOpenOrderDrawerFromSearchParams(searchParams);
  const showSummary = isManuallyOpen || isOpenFromQuery;

  useEffect(() => {
    if (!isOpenFromQuery) return;
    const params = new URLSearchParams(searchParams.toString());
    params.delete('open');
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [isOpenFromQuery, searchParams, pathname, router]);

  return (
    <>
      <FloatingOrderBar
        viewOrderButtonRef={viewOrderButtonRef}
        onViewOrder={() => setIsManuallyOpen(true)}
      />
      {showSummary && (
        <OrderSummaryDrawer
          returnFocusRef={viewOrderButtonRef}
          onClose={() => setIsManuallyOpen(false)}
        />
      )}
    </>
  );
}

export default function GlobalOrderUI() {
  return (
    <Suspense fallback={null}>
      <GlobalOrderUIInner />
    </Suspense>
  );
}
