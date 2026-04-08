'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus } from 'lucide-react';
import { cn, formatIDR, getFallbackSpritePosition } from '@/lib/utils';
import { SnackFlavour } from '@/app/data.types';
import { useOrder } from '@/context/OrderContext';
import fallbackSprite from '@/assets/fallback_img_sprite-removebg.png';

type ProductCardProps = {
  id: string | number;
  type?: SnackFlavour;
  imgUrl?: string;
  title: string;
  description?: string;
  price: number;
  eager?: boolean;
  href: string;
};

export const ProductCard = ({
  id,
  type,
  imgUrl,
  title,
  description,
  price,
  eager,
  href,
}: ProductCardProps) => {
  const { items, addItem, updateQuantity } = useOrder();
  const cartItem = items.find((i) => i.id === id);
  const qty = cartItem?.quantity ?? 0;

  const handleAdd = () => {
    addItem({
      id,
      name: title,
      price,
      quantity: 1,
      notes: '',
      imgUrl,
    });
  };

  return (
    <div className="bg-white border border-warm-border rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <Link href={href} className="block">
        <div className="relative bg-white p-3 flex items-center justify-center min-h-[140px] border-b border-warm-border">
          {imgUrl ? (
            <Image
              alt={title}
              src={imgUrl}
              width={160}
              height={160}
              loading={eager ? 'eager' : 'lazy'}
              className="rounded-xl object-cover bg-white"
              style={{ width: '140px', height: 'auto' }}
            />
          ) : (
            <div
              className="w-[100px] h-[100px] rounded-xl"
              style={{
                backgroundImage: `url(${fallbackSprite.src})`,
                backgroundSize: '300% auto',
                backgroundPosition: `${getFallbackSpritePosition(type)} center`,
                backgroundRepeat: 'no-repeat',
              }}
            />
          )}
          {type && (
            <span
              className={cn(
                'text-white px-2 py-0.5 rounded-full text-[10px] font-semibold absolute top-2 left-2',
                type === 'sweet' ? 'bg-rose-400' : 'bg-warm-primary-light'
              )}
            >
              {type === 'sweet' ? 'Manis' : 'Gorengan'}
            </span>
          )}
        </div>

        <div className="p-3 pb-0">
          <h3 className="font-bold text-warm-text text-sm leading-tight mb-0.5 truncate">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-warm-text-secondary line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </Link>

      <div className="mt-auto flex flex-col gap-2 p-3 pt-2">
        <p className="font-bold text-warm-primary text-sm">
          {formatIDR.format(price)}
        </p>
        <div className="flex">
          {qty > 0 ? (
            <div className="flex items-center gap-1.5">
              <button
                aria-label={`Decrease quantity for ${title}`}
                onClick={() => updateQuantity(id, qty - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-warm-border transition-colors hover:bg-warm-bg"
              >
                <Minus className="h-3 w-3 text-warm-text" />
              </button>
              <span className="w-5 text-center text-xs font-bold text-warm-text">
                {qty}
              </span>
              <button
                aria-label={`Increase quantity for ${title}`}
                onClick={() => updateQuantity(id, qty + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-warm-primary transition-colors hover:bg-warm-primary-hover"
              >
                <Plus className="h-3 w-3 text-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="rounded-full bg-warm-primary px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-warm-primary-hover"
            >
              Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
