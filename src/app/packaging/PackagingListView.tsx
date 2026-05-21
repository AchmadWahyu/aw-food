'use client';

import { useMemo, useState } from 'react';
import { MessageCircle, Package, Search, X } from 'lucide-react';
import type { Packaging } from '../data.types';
import { Input } from '@/components/ui/input';
import { formatIDR } from '@/lib/utils';

type PackagingListViewProps = {
  data: Packaging[];
};

const ORDER_TEXT = 'Halo%20Kak%2C%20saya%20mau%20tanya%20kemasan';
const WHATSAPP_PHONE = '628568056469';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${ORDER_TEXT}`;
const formatPrice = (price: number) => formatIDR.format(price).replace(/\s/g, ' ');

export default function PackagingListView({ data }: PackagingListViewProps) {
  const [filter, setFilter] = useState('');

  const filteredResult = useMemo(() => {
    const searchTerm = filter.trim().toLowerCase();

    return data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
  }, [data, filter]);

  return (
    <main className="min-h-screen bg-[#fff5e8] pb-8 text-[#5a3b2e]">
      <header className="sticky top-0 z-20 border-b border-[#ead8bf] bg-white">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#f4c86b] bg-[#fff8e8] text-[10px] font-black leading-none text-[#9b7645] shadow-sm">
              AW
              <br />
              Food
            </div>
            <div className="min-w-0">
              <h1 className="truncate font-serif text-xl font-bold leading-6 text-[#5a3b2e]">
                AW Food & Snack
              </h1>
              <p className="truncate text-sm font-medium text-[#8fa0bf]">
                Jajan pasar dekat kampus
              </p>
            </div>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-[#28c45c] px-4 text-sm font-extrabold text-white shadow-sm"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        <div className="relative border-t border-[#f1dfc5] bg-[#fff5e8] px-4 py-3">
          <Search className="pointer-events-none absolute left-7 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8ea1c0]" />
          <Input
            type="text"
            placeholder="Cari kemasan"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="h-11 rounded-xl border-[#e8cfaa] bg-white pl-10 pr-10 text-base text-[#5a3b2e] placeholder:text-[#8fa0bf] focus-visible:ring-[#d86d23]"
          />
          {filter.length > 0 ? (
            <button
              type="button"
              aria-label="Hapus pencarian"
              onClick={() => setFilter('')}
              className="absolute right-6 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-[#8fa0bf]"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </header>

      <section className="px-4 pt-8">
        <div className="mb-4">
          <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-[#6a3f2c]">
            <Package className="h-5 w-5 text-[#d96b21]" />
            Daftar Kemasan
          </h2>
          <p className="mt-1 text-sm font-bold text-[#9caccc]">
            {filteredResult.length} item
          </p>
        </div>

        {filteredResult.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-[#ead8bf] bg-white">
            {filteredResult.map((item) => (
              <div
                key={item.name}
                className="flex min-h-12 items-center justify-between gap-4 border-b border-[#ead8bf] px-4 py-3 last:border-b-0"
              >
                <p className="min-w-0 truncate text-sm font-semibold text-[#4f2419]">
                  {item.name}
                </p>
                <p className="shrink-0 text-sm font-extrabold text-[#db6c22]">
                  {formatPrice(item.price)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#e8cfaa] bg-white p-8 text-center">
            <Package className="mx-auto mb-3 h-8 w-8 text-[#db6c22]" />
            <p className="text-sm font-bold">Kemasan belum ketemu</p>
            <p className="mt-1 text-xs text-[#8fa0bf]">
              Coba kata kunci lain.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
