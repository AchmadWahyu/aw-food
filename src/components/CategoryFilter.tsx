'use client';

import { cn } from '@/lib/utils';
import { UtensilsCrossed } from 'lucide-react';

type CategoryFilterProps = {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  totalCount: number;
};

const CATEGORIES = [
  { value: '', label: 'Semua' },
  { value: 'best-seller', label: '🌮 Best Seller' },
  { value: 'fried', label: 'Gorengan' },
  { value: 'sweet', label: 'Manis' },
];

export default function CategoryFilter({
  activeFilter,
  onFilterChange,
  totalCount,
}: CategoryFilterProps) {
  return (
    <div className="px-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-heading font-bold text-lg text-warm-text flex items-center gap-2">
          <UtensilsCrossed className="w-5 h-5 text-warm-primary" />
          Menu Jajan
        </h2>
        <span className="text-sm text-warm-text-muted">{totalCount} menu</span>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onFilterChange(cat.value)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
              activeFilter === cat.value
                ? 'bg-warm-primary text-white'
                : 'bg-white text-warm-text border border-warm-border hover:border-warm-primary'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
