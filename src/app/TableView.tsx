'use client';

import { useMemo, useState } from 'react';
import { Snack, Packaging } from './data.types';
import { Search, X, Package } from 'lucide-react';
import { formatIDR } from '@/lib/utils';

type Props = {
  data: Snack[] | Packaging[];
  searchPlaceholder: string;
};

export default function TableView({ data, searchPlaceholder }: Props) {
  const [filter, setFilter] = useState('');

  const filteredResult = useMemo(
    () =>
      data.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [data, filter]
  );

  return (
    <div className="pb-24">
      {/* Search Bar */}
      <div className="sticky top-[65px] z-20 bg-background/95 backdrop-blur-sm px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-text-muted" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full h-10 pl-10 pr-10 border border-warm-border rounded-xl bg-white text-sm text-warm-text placeholder:text-warm-text-muted focus:outline-none focus:ring-2 focus:ring-warm-primary/30 font-body"
          />
          {filter.length > 0 && (
            <button
              onClick={() => setFilter('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-100"
            >
              <X className="w-4 h-4 text-warm-text-muted" />
            </button>
          )}
        </div>
      </div>

      {/* Section header */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="font-heading font-bold text-lg text-warm-text flex items-center gap-2">
          <Package className="w-5 h-5 text-warm-primary" />
          Daftar Kemasan
        </h2>
        <p className="text-sm text-warm-text-muted mt-0.5">
          {filteredResult.length} item
        </p>
      </div>

      {/* Clean list */}
      <div className="px-4">
        <div className="bg-white rounded-2xl border border-warm-border overflow-hidden">
          {filteredResult.map((item, i) => (
            <div
              key={item.name}
              className={`flex items-center justify-between px-4 py-3.5 ${
                i < filteredResult.length - 1
                  ? 'border-b border-warm-border'
                  : ''
              }`}
            >
              <span className="text-sm text-warm-text font-medium">
                {item.name}
              </span>
              <span className="text-sm font-bold text-warm-primary flex-shrink-0 ml-4">
                {formatIDR.format(item.price)}
              </span>
            </div>
          ))}
        </div>

        {filteredResult.length === 0 && (
          <div className="text-center py-12 text-warm-text-muted">
            <p className="text-sm">Tidak ada kemasan yang cocok</p>
          </div>
        )}
      </div>
    </div>
  );
}
