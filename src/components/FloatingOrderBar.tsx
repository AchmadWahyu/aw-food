'use client';

import { useOrder } from '@/context/OrderContext';
import { formatIDR } from '@/lib/utils';
import { ClipboardList } from 'lucide-react';
import { usePathname } from 'next/navigation';

type FloatingOrderBarProps = {
  onViewOrder: () => void;
};

export default function FloatingOrderBar({
  onViewOrder,
}: FloatingOrderBarProps) {
  const { totalItems, totalQuantity, totalPrice } = useOrder();
  const pathname = usePathname();
  const isDetailPage = pathname.startsWith('/snack/');

  if (totalItems === 0 || isDetailPage) return null;

  return (
    <div className="fixed left-0 right-0 z-25 px-4 pb-2 max-w-2xl mx-auto bottom-[60px]">
      <button
        onClick={onViewOrder}
        className="w-full bg-warm-primary text-white rounded-2xl px-4 py-3 flex items-center justify-between shadow-lg hover:bg-warm-primary-hover transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <ClipboardList className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-white text-warm-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          </div>
          <div className="text-left">
            <span className="block text-xs text-white/80">
              {totalQuantity} item dipilih
            </span>
            <span className="block font-bold text-sm">
              {formatIDR.format(totalPrice)}
            </span>
          </div>
        </div>
        <span className="font-semibold text-sm bg-white/20 px-4 py-2 rounded-xl">
          Kirim ke WhatsApp →
        </span>
      </button>
    </div>
  );
}
