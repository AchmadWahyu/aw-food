'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useOrder } from '@/context/OrderContext';
import { formatIDR } from '@/lib/utils';
import { Minus, Plus, X } from 'lucide-react';
import type { Snack } from '@/app/data.types';

type AddItemSheetProps = {
  item: Snack | null;
  onClose: () => void;
};

export default function AddItemSheet({ item, onClose }: AddItemSheetProps) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const { addItem } = useOrder();

  useEffect(() => {
    if (item) {
      setQuantity(1);
      setNotes('');
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  if (!item) return null;

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      notes,
      imgUrl: item.images?.[0]?.url,
    });
    onClose();
  };

  const totalPrice = item.price * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/40 animate-fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-t-2xl p-6 animate-slide-up">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5 text-warm-text-muted" />
        </button>

        <div className="flex items-start gap-4 mb-6">
          {item.images?.[0]?.url && (
            <Image
              src={item.images[0].url}
              alt={item.name}
              width={64}
              height={64}
              className="rounded-xl object-cover w-16 h-16"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-bold text-lg text-warm-text">
              {item.name}
            </h3>
            {item.description && (
              <p className="text-sm text-warm-text-secondary mt-0.5">
                {item.description}
              </p>
            )}
            <p className="text-warm-primary font-bold mt-1">
              {formatIDR.format(item.price)}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold text-warm-text mb-2 block">
            Jumlah
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-xl border border-warm-border flex items-center justify-center hover:bg-warm-bg transition-colors"
            >
              <Minus className="w-4 h-4 text-warm-text" />
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val) && val > 0) setQuantity(val);
              }}
              className="w-20 h-10 text-center border border-warm-border rounded-xl font-semibold text-warm-text focus:outline-none focus:ring-2 focus:ring-warm-primary/30"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-xl border border-warm-border flex items-center justify-center hover:bg-warm-bg transition-colors"
            >
              <Plus className="w-4 h-4 text-warm-text" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm font-semibold text-warm-text mb-2 block">
            Catatan (opsional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Contoh: tidak pedas, tambah sambal..."
            className="w-full h-20 border border-warm-border rounded-xl p-3 text-sm resize-none placeholder:text-warm-text-muted focus:outline-none focus:ring-2 focus:ring-warm-primary/30"
          />
        </div>

        <button
          onClick={handleAdd}
          className="w-full bg-warm-primary text-white font-semibold py-3.5 rounded-full text-base hover:bg-warm-primary-hover transition-colors"
        >
          Tambah ke Pesanan — {formatIDR.format(totalPrice)}
        </button>
      </div>
    </div>
  );
}
