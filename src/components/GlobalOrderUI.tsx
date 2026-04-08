'use client';

import { useRef, useState } from 'react';
import FloatingOrderBar from './FloatingOrderBar';
import OrderSummaryDrawer from './OrderSummaryDrawer';

export default function GlobalOrderUI() {
  const [showSummary, setShowSummary] = useState(false);
  const viewOrderButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <FloatingOrderBar
        viewOrderButtonRef={viewOrderButtonRef}
        onViewOrder={() => setShowSummary(true)}
      />
      {showSummary && (
        <OrderSummaryDrawer
          returnFocusRef={viewOrderButtonRef}
          onClose={() => setShowSummary(false)}
        />
      )}
    </>
  );
}
