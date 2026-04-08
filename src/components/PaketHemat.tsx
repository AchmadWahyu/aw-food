'use client';

import { formatIDR } from '@/lib/utils';
import { Gift, PartyPopper, Shuffle, Tag } from 'lucide-react';

const WA_NUMBER = '628568056469';

const PAKET_DATA = [
  {
    id: 'paket-50',
    name: 'Paket 50 pcs',
    description: 'Pilih bebas dari menu gorengan & kue',
    price: 150000,
    discount: 'Hemat 15%',
    icon: Gift,
    waMessage:
      'Halo, saya tertarik dengan Paket 50 pcs. Bisa info lebih lanjut?',
  },
  {
    id: 'paket-100',
    name: 'Paket 100 pcs',
    description: 'Cocok untuk acara besar & pesanan banyak',
    price: 275000,
    discount: 'Hemat 20%',
    icon: PartyPopper,
    waMessage:
      'Halo, saya tertarik dengan Paket 100 pcs. Bisa info lebih lanjut?',
  },
  {
    id: 'paket-mix',
    name: 'Paket Mix Bebas',
    description: 'Mix 2–3 menu pilihan, cocok buat arisan & rapat kecil',
    price: 125000,
    discount: 'Hemat 15%',
    icon: Shuffle,
    waMessage:
      'Halo, saya tertarik dengan Paket Mix Bebas. Bisa info lebih lanjut?',
  },
];

export default function PaketHemat() {
  return (
    <section className="px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-heading font-bold text-lg text-warm-text flex items-center gap-2">
          <Tag className="w-5 h-5 text-warm-primary" />
          Paket Hemat
        </h2>
        <span className="text-xs text-warm-text-muted bg-white px-3 py-1 rounded-full border border-warm-border">
          Beli lebih hemat
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {PAKET_DATA.map((paket) => (
          <div
            key={paket.id}
            className="min-w-[260px] bg-white border border-warm-border rounded-2xl p-4 flex-shrink-0"
          >
            <div className="flex items-start justify-between mb-2">
              <paket.icon className="w-6 h-6 text-warm-primary" />
              <span className="text-xs font-semibold text-warm-primary bg-orange-50 px-2 py-0.5 rounded-full">
                {paket.discount}
              </span>
            </div>
            <h3 className="font-bold text-warm-text mb-1">{paket.name}</h3>
            <p className="text-sm text-warm-text-secondary mb-3 line-clamp-2">
              {paket.description}
            </p>
            <p className="font-bold text-warm-primary mb-3">
              {formatIDR.format(paket.price)}
            </p>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(paket.waMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-warm-primary text-white font-semibold py-2.5 rounded-full text-sm hover:bg-warm-primary-hover transition-colors"
            >
              Tambah
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
