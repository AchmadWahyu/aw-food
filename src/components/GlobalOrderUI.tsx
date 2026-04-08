'use client';

import { useState } from 'react';
import FloatingOrderBar from './FloatingOrderBar';
import OrderSummaryDrawer from './OrderSummaryDrawer';

export default function GlobalOrderUI() {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <>
      <FloatingOrderBar onViewOrder={() => setShowSummary(true)} />
      {showSummary && (
        <OrderSummaryDrawer onClose={() => setShowSummary(false)} />
      )}
    </>
  );
}
