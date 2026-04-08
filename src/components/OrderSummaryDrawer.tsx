'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useOrder } from '@/context/OrderContext';
import { formatIDR } from '@/lib/utils';
import { Minus, Plus, Trash2, X } from 'lucide-react';

type OrderSummaryDrawerProps = {
  onClose: () => void;
};

export default function OrderSummaryDrawer({
  onClose,
}: OrderSummaryDrawerProps) {
  const {
    items,
    updateQuantity,
    removeItem,
    totalPrice,
    totalQuantity,
    generateWhatsAppUrl,
  } = useOrder();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/40 animate-fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-t-2xl animate-slide-up max-h-[80vh] flex flex-col">
        <div className="p-6 pb-0">
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-lg text-warm-text">
              Pesanan Kamu
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-warm-text-muted" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-4">
          {items.length === 0 ? (
            <p className="text-center text-warm-text-muted py-8">
              Belum ada pesanan
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 pb-4 border-b border-warm-border last:border-0"
                >
                  {item.imgUrl && (
                    <Image
                      src={item.imgUrl}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="rounded-lg object-cover w-12 h-12 flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-warm-text text-sm">
                      {item.name}
                    </h4>
                    {item.notes && (
                      <p className="text-xs text-warm-text-muted mt-0.5">
                        {item.notes}
                      </p>
                    )}
                    <p className="text-sm font-bold text-warm-primary mt-1">
                      {formatIDR.format(item.price * item.quantity)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-7 h-7 rounded-lg border border-warm-border flex items-center justify-center hover:bg-warm-bg"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val > 0)
                          updateQuantity(item.id, val);
                      }}
                      className="w-10 h-7 text-center text-sm font-semibold border border-warm-border rounded focus:outline-none focus:ring-2 focus:ring-warm-primary/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-7 h-7 rounded-lg border border-warm-border flex items-center justify-center hover:bg-warm-bg"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 pt-4 border-t border-warm-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-warm-text-secondary text-sm">
                Total ({totalQuantity} item)
              </span>
              <span className="font-bold text-lg text-warm-text">
                {formatIDR.format(totalPrice)}
              </span>
            </div>
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-500 text-white font-semibold py-3.5 rounded-full text-base hover:bg-green-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Kirim Pesanan ke WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
