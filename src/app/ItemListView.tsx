'use client';

import { ProductCard } from '@/components/ProductCard';
import { Snack } from './data.types';
import { Input } from '@/components/ui/input';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PageContentSkeleton from './snack/[slug]/loading';

const ItemListView = ({ data }: { data: Snack[] }) => {
  const [filter, setFilter] = useState('');
  const [allParams, setAllParams] = useState('');
  useEffect(() => {
    setAllParams(window?.location?.search);
  }, []);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleClick = (linkUrl: string) => {
    router.push(linkUrl);
  };

  const filteredResult = useMemo(
    () =>
      data.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [data, filter]
  );

  if (isPending) {
    return <PageContentSkeleton />;
  }

  return (
    <div className="p-4">
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
        {filteredResult.map((item, index) => (
          <ProductCard
            onClick={() => {
              startTransition(() => {
                handleClick(`/snack/${item.slug}${allParams}`);
              });
            }}
            key={item.name}
            imgUrl={item.images?.[0]?.url}
            price={item.price}
            title={item.name}
            type={item.tag?.[0]}
            // eager load first 4 cards
            eager={index < 4}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemListView;
