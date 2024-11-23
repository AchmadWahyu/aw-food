'use client';

import { ProductCard } from '@/components/ProductCard';
import { Snack } from './data.types';
import { Input } from '@/components/ui/input';
import { useMemo, useState } from 'react';
import { X } from 'lucide-react';

const ItemListView = ({ data }: { data: Snack[] }) => {
  const [filter, setFilter] = useState('');

  const filteredResult = useMemo(
    () =>
      data.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [data, filter]
  );

  return (
    <div>
      <div className="z-10 sticky top-0 bg-white py-2">
        <div className="relative">
          <Input
            type="text"
            placeholder="Cari Kue"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          {filter.length > 0 ? (
            <button
              onClick={() => setFilter('')}
              type="button"
              className="p-1.5 absolute top-0 right-0"
            >
              <X />
            </button>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredResult.map((item) => (
          <ProductCard
            key={item.name}
            imgUrl={item.images?.[0]?.url}
            linkUrl={`/snack/${item.slug}`}
            price={item.price}
            title={item.name}
            type={item.tag?.[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemListView;
