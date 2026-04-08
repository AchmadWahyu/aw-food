'use client';

import { useEffect, useMemo, useState } from 'react';
import { Snack, SnackFlavour } from './data.types';
import { Search, SearchX, X } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import PaketHemat from '@/components/PaketHemat';
import CategoryFilter from '@/components/CategoryFilter';
import { ProductCard } from '@/components/ProductCard';
import LocationSection from '@/components/LocationSection';

const ItemListView = ({ data }: { data: Snack[] }) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [allParams, setAllParams] = useState('');

  useEffect(() => {
    setAllParams(window?.location?.search);
  }, []);

  const filteredResult = useMemo(() => {
    let results = data;

    if (searchFilter) {
      results = results.filter((item) =>
        item.name.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    if (categoryFilter) {
      results = results.filter((item) =>
        item.tag?.includes(categoryFilter as SnackFlavour)
      );
    }

    return results;
  }, [data, searchFilter, categoryFilter]);

  return (
    <div className="pb-4">
      {/* Search Bar */}
      <div className="sticky top-[65px] z-20 bg-background/95 backdrop-blur-sm px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-text-muted" />
          <input
            type="text"
            placeholder="Cari jajan..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full h-10 pl-10 pr-10 border border-warm-border rounded-xl bg-white text-sm text-warm-text placeholder:text-warm-text-muted focus:outline-none focus:ring-2 focus:ring-warm-primary/30 font-body"
          />
          {searchFilter.length > 0 && (
            <button
              onClick={() => setSearchFilter('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-100"
            >
              <X className="w-4 h-4 text-warm-text-muted" />
            </button>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Paket Hemat */}
      {/* <PaketHemat /> */}

      {/* Divider */}
      <div className="h-px bg-warm-border-strong mx-4 my-2" />

      {/* Category Filter */}
      <div className="pt-4">
        <CategoryFilter
          activeFilter={categoryFilter}
          onFilterChange={setCategoryFilter}
          totalCount={filteredResult.length}
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 px-4">
        {filteredResult.map((item, index) => (
          <ProductCard
            key={item.id}
            id={item.id}
            imgUrl={item.images?.[0]?.url}
            price={item.price}
            title={item.name}
            description={item.description}
            type={item.tag?.[0]}
            eager={index < 4}
            href={`/snack/${item.slug}${allParams}`}
          />
        ))}
      </div>

      {filteredResult.length === 0 && (
        <div className="text-center py-12 text-warm-text-muted flex flex-col items-center gap-2">
          <SearchX className="w-8 h-8" />
          <p className="text-sm">Tidak ada menu yang cocok</p>
        </div>
      )}

      {/* Location Section */}
      <LocationSection />

      {/* Spacing for floating bar */}
      <div className="h-20" />
    </div>
  );
};

export default ItemListView;
