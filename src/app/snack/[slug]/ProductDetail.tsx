'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Share2,
  Minus,
  Plus,
} from 'lucide-react';
import { useOrder } from '@/context/OrderContext';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { ORDER_DRAWER_OPEN_HREF } from '@/lib/order-ui';
import { cn, formatIDR, getFallbackSpritePosition } from '@/lib/utils';
import type { Snack } from '@/app/data.types';
import fallbackSprite from '@/assets/fallback_img_sprite-removebg.png';

type ProductDetailProps = {
  snack: Snack;
  relatedItems: Snack[];
};

export default function ProductDetail({
  snack,
  relatedItems,
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { addItem } = useOrder();
  const { toast } = useToast();

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      setActiveImageIndex(Math.round(scrollLeft / width));
    }
  }, []);

  const handleAddToCart = () => {
    addItem({
      id: snack.id,
      name: snack.name,
      price: snack.price,
      quantity,
      notes: '',
      imgUrl: snack.images?.[0]?.url,
    });
    toast({
      title: `${snack.name} ditambahkan`,
      description: `${quantity} item ke pesanan`,
      action: (
        <ToastAction asChild altText="Buka keranjang">
          <Link href={ORDER_DRAWER_OPEN_HREF} scroll={false}>
            Buka keranjang
          </Link>
        </ToastAction>
      ),
    });
    setQuantity(1);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?utm_source=share-button&utm_medium=web`;
    try {
      if (!window.navigator?.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable');
      }
      await window.navigator.clipboard.writeText(shareUrl);
      toast({ title: 'Link tersalin!' });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Gagal menyalin tautan',
        description: 'Coba lagi atau salin alamat dari bilah alamat.',
      });
    }
  };

  const images =
    snack.images?.length > 0 ? snack.images : [{ url: '' as string }];
  const hasType = snack.tag && snack.tag.length > 0;
  const totalPrice = snack.price * quantity;

  return (
    <div className="pb-40">
      {/* ── Image Carousel ── */}
      <div className="relative">
        {/* Floating nav */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between p-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-warm-text" />
          </button>
          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          >
            <Share2 className="w-5 h-5 text-warm-text" />
          </button>
        </div>

        {/* Swipeable images */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="w-full flex-shrink-0 snap-center bg-warm-bg flex items-center justify-center"
              style={{ height: '45vh' }}
            >
              {img.url ? (
                <Image
                  src={img.url}
                  alt={`${snack.name} ${i + 1}`}
                  width={400}
                  height={400}
                  priority={i === 0}
                  className="object-contain w-full h-full"
                />
              ) : (
                <div
                  className="w-[200px] h-[200px]"
                  style={{
                    backgroundImage: `url(${fallbackSprite.src})`,
                    backgroundSize: '300% auto',
                    backgroundPosition: `${getFallbackSpritePosition(snack.tag?.[0])} center`,
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-2 h-2 rounded-full transition-colors',
                  i === activeImageIndex
                    ? 'bg-warm-primary'
                    : 'bg-warm-text-muted/40'
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Product Info ── */}
      <div className="px-5 pt-5 pb-4">
        <h1 className="font-heading font-bold text-2xl text-warm-text mb-2">
          {snack.name}
        </h1>

        <p className="font-bold text-xl text-warm-primary mb-3">
          {formatIDR.format(snack.price)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hasType && (
            <span
              className={cn(
                'text-white px-3 py-1 rounded-full text-xs font-semibold',
                snack.tag[0] === 'sweet'
                  ? 'bg-rose-400'
                  : 'bg-warm-primary-light'
              )}
            >
              {snack.tag[0] === 'sweet' ? 'Manis' : 'Gorengan'}
            </span>
          )}
        </div>

        {/* Short description */}
        {snack.description && (
          <p className="text-warm-text-secondary text-sm leading-relaxed">
            {snack.description}
          </p>
        )}
      </div>

      {/* ── Divider ── */}
      <div className="h-2 bg-warm-bg" />

      {/* ── Related Products ── */}
      {relatedItems.length > 0 && (
        <div className="py-4">
          <h2 className="font-heading font-bold text-base text-warm-text px-5 mb-3">
            Menu Lainnya
          </h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5 pb-2">
            {relatedItems.map((item) => (
              <Link
                key={item.id}
                href={`/snack/${item.slug}`}
                className="min-w-[140px] flex-shrink-0"
              >
                <div className="bg-white border border-warm-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-white p-2 flex items-center justify-center h-24 border-b border-warm-border">
                    {item.images?.[0]?.url ? (
                      <Image
                        src={item.images[0].url}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-lg object-contain h-full w-auto"
                      />
                    ) : (
                      <div
                        className="w-16 h-16 rounded-lg"
                        style={{
                          backgroundImage: `url(${fallbackSprite.src})`,
                          backgroundSize: '300% auto',
                          backgroundPosition: `${getFallbackSpritePosition(item.tag?.[0])} center`,
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                    )}
                  </div>
                  <div className="p-2.5">
                    <h3 className="font-semibold text-warm-text text-xs truncate mb-0.5">
                      {item.name}
                    </h3>
                    <p className="font-bold text-warm-primary text-xs">
                      {formatIDR.format(item.price)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Sticky Bottom Bar ── */}
      <div className="fixed left-0 right-0 z-20 bg-white border-t border-warm-border px-5 py-3 max-w-2xl mx-auto bottom-[60px]">
        <div className="flex items-center gap-4">
          {/* Quantity stepper */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 rounded-xl border border-warm-border flex items-center justify-center hover:bg-warm-bg transition-colors"
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
              className="w-10 h-9 text-center font-semibold text-warm-text border border-warm-border rounded focus:outline-none focus:ring-2 focus:ring-warm-primary/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 rounded-xl border border-warm-border flex items-center justify-center hover:bg-warm-bg transition-colors"
            >
              <Plus className="w-4 h-4 text-warm-text" />
            </button>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-warm-primary text-white font-semibold px-5 py-3 rounded-xl text-sm hover:bg-warm-primary-hover transition-colors active:scale-[0.98]"
          >
            Tambah ke Keranjang — {formatIDR.format(totalPrice)}
          </button>
        </div>
      </div>
    </div>
  );
}
