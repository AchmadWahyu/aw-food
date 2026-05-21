'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatIDR, FLAVOUR_TEXT } from '@/lib/utils';
import { SnackFlavour } from '@/app/data.types';
import { Minus, Plus } from 'lucide-react';
import FallbackSpriteImage from '../FallbackSpriteImage';

type ProductCardProps = {
  type?: SnackFlavour;
  tags?: string[];
  imgUrl?: string;
  title: string;
  description?: string;
  price: number;
  quantity?: number;
  eager?: boolean;
  href: string;
  onOrderClick: () => void;
  onDecrementClick: () => void;
};

export const ProductCard = ({
  type,
  tags = [],
  imgUrl,
  title,
  description,
  price,
  quantity = 0,
  eager,
  href,
  onOrderClick,
  onDecrementClick,
}: ProductCardProps) => {
  return (
    <article
      className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#ead8bf] bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <Link
        href={href}
        aria-label={`Lihat detail ${title}`}
        className="absolute inset-0 z-10"
      />

      <div className="pointer-events-none relative aspect-[1.28/1] overflow-hidden bg-white p-3">
        {imgUrl ? (
          <Image
            className="h-full w-full object-contain p-3"
            alt={title}
            src={imgUrl}
            width={260}
            height={220}
            loading={eager ? 'eager' : 'lazy'}
          />
        ) : (
          <FallbackSpriteImage
            name={title}
            tags={tags.length > 0 ? tags : type ? [type] : []}
            className="h-full w-full"
          />
        )}
        {type ? (
          <span className="absolute left-2 top-2 rounded-full bg-[#f4a45d] px-2.5 py-1 text-[10px] font-extrabold text-white">
            {type === 'salted' ? 'Gorengan' : FLAVOUR_TEXT[type]}
          </span>
        ) : null}
      </div>

      <div className="pointer-events-none flex flex-1 flex-col border-t border-[#ead8bf] p-3">
        <h3 className="line-clamp-1 text-sm font-extrabold text-[#6a4a3c]">
          {title}
        </h3>
        <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-[#657799]">
          {description || 'Camilan rumahan dengan rasa akrab dan porsi pas.'}
        </p>

        <div className="mt-auto pt-3">
          <p className="text-base font-extrabold text-[#db6c22]">
            {formatIDR.format(price).replace(/\s/g, ' ')}
          </p>
          {quantity > 0 ? (
            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                aria-label={`Kurangi ${title}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onDecrementClick();
                }}
                className="pointer-events-auto relative z-20 grid h-8 w-8 place-items-center rounded-full border border-[#ead8bf] bg-white text-[#a6795e]"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-4 text-center text-sm font-extrabold text-[#6a4a3c]">
                {quantity}
              </span>
              <button
                type="button"
                aria-label={`Tambah ${title}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onOrderClick();
                }}
                className="pointer-events-auto relative z-20 grid h-8 w-8 place-items-center rounded-full bg-[#db6c22] text-white"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onOrderClick();
              }}
              className="pointer-events-auto relative z-20 mt-2 h-8 rounded-full bg-[#db6c22] px-4 text-sm font-extrabold text-white"
            >
              Order
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
