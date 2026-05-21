'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ChevronLeft,
  MessageCircle,
  Minus,
  Package,
  Plus,
  Share2,
} from 'lucide-react';
import { formatIDR } from '@/lib/utils';
import FallbackSpriteImage from '@/components/FallbackSpriteImage';

export type LocalSnack = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: { url: string }[];
  slug: string;
  tag: string[];
  _updatedAt: string;
};

type SnackDetailViewProps = {
  snack: LocalSnack;
  snacks: LocalSnack[];
};

const WHATSAPP_PHONE = '628568056469';
const formatPrice = (price: number) => formatIDR.format(price).replace(/\s/g, ' ');

const getTagLabel = (tags: string[]) => {
  if (tags.includes('spicy')) return 'Pedas';
  if (tags.includes('sweet')) return 'Manis';
  if (tags.includes('fried') || tags.includes('salted')) return 'Gorengan';
  if (tags.includes('best-seller')) return 'Best Seller';

  return 'Jajan';
};

export default function SnackDetailView({
  snack,
  snacks,
}: SnackDetailViewProps) {
  const [quantity, setQuantity] = useState(1);
  const relatedSnacks = useMemo(
    () => snacks.filter((item) => item.slug !== snack.slug).slice(0, 8),
    [snack.slug, snacks]
  );
  const total = snack.price * quantity;
  const whatsappUrl = useMemo(() => {
    const message = `Halo Kak, saya mau pesan:\n- ${
      snack.name
    } x${quantity} = ${formatPrice(total)}\n\nTotal: ${formatPrice(total)}`;

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  }, [quantity, snack.name, total]);

  const updateQuantity = (nextQuantity: number) => {
    if (!Number.isFinite(nextQuantity) || nextQuantity < 1) {
      return;
    }

    setQuantity(Math.floor(nextQuantity));
  };

  return (
    <main className="min-h-screen bg-[#fff5e8] pb-44 text-[#5a3b2e]">
      <header className="sticky top-0 z-20 border-b border-[#ead8bf] bg-white">
        <div className="flex items-center justify-between px-4 py-3">
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
            href={`https://wa.me/${WHATSAPP_PHONE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-[#28c45c] px-4 text-sm font-extrabold text-white shadow-sm"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </header>

      <section className="relative">
        <div className="absolute left-4 top-5 z-10 flex w-[calc(100%-2rem)] items-center justify-between">
          <Link
            href="/"
            aria-label="Kembali ke menu"
            className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#5a3b2e] shadow-sm"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <button
            type="button"
            aria-label="Bagikan menu"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: snack.name,
                  text: snack.description,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#5a3b2e] shadow-sm"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>

        <div className="relative aspect-[1/0.9] overflow-hidden bg-[#fff1df]">
          {snack.images?.[0]?.url ? (
            <Image
              className="h-full w-full object-contain"
              alt={snack.name}
              src={snack.images[0].url}
              width={900}
              height={780}
              priority
            />
          ) : (
            <FallbackSpriteImage
              name={snack.name}
              tags={snack.tag}
              className="h-full w-full"
            />
          )}
        </div>
      </section>

      <section className="px-4 py-8">
        <h2 className="font-serif text-3xl font-bold text-[#6a3f2c]">
          {snack.name}
        </h2>
        <p className="mt-3 text-2xl font-extrabold text-[#db6c22]">
          {formatPrice(snack.price)}
        </p>
        <span className="mt-4 inline-flex rounded-full bg-[#f4a45d] px-4 py-1.5 text-xs font-extrabold text-white">
          {getTagLabel(snack.tag)}
        </span>
        <p className="mt-5 text-base font-medium leading-7 text-[#657799]">
          {snack.description}
        </p>
      </section>

      <section className="px-4 pb-10">
        <h2 className="font-serif text-xl font-bold text-[#6a3f2c]">
          Menu Lainnya
        </h2>
        <div className="-mx-4 mt-4 flex gap-3 overflow-x-auto px-4 pb-2">
          {relatedSnacks.map((item) => (
            <Link
              key={item.id}
              href={`/snack/${item.slug}`}
              className="w-36 shrink-0 overflow-hidden rounded-xl border border-[#ead8bf] bg-white"
            >
              <div className="aspect-[1.45/1] bg-white">
                {item.images?.[0]?.url ? (
                  <Image
                    className="h-full w-full object-contain p-2"
                    alt={item.name}
                    src={item.images[0].url}
                    width={180}
                    height={124}
                  />
                ) : (
                  <FallbackSpriteImage
                    name={item.name}
                    tags={item.tag}
                    className="h-full w-full"
                  />
                )}
              </div>
              <div className="border-t border-[#ead8bf] p-3">
                <p className="line-clamp-1 text-xs font-extrabold text-[#6a4a3c]">
                  {item.name}
                </p>
                <p className="mt-1 text-sm font-extrabold text-[#db6c22]">
                  {formatPrice(item.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="fixed bottom-20 left-1/2 z-30 flex w-full max-w-lg -translate-x-1/2 items-center gap-3 border-t border-[#ead8bf] bg-white px-4 py-3">
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Kurangi jumlah"
            onClick={() => updateQuantity(quantity - 1)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-[#ead8bf] text-[#a6795e]"
          >
            <Minus className="h-4 w-4" />
          </button>
          <input
            type="number"
            aria-label="Jumlah pesanan"
            min={1}
            step={1}
            inputMode="numeric"
            value={quantity}
            onFocus={(event) => event.currentTarget.select()}
            onChange={(event) => updateQuantity(Number(event.target.value))}
            className="h-10 w-12 rounded-md border border-[#ead8bf] bg-white text-center text-base font-bold text-[#6a4a3c] outline-none focus:border-[#db6c22] focus:ring-2 focus:ring-[#f3cfb4]"
          />
          <button
            type="button"
            aria-label="Tambah jumlah"
            onClick={() => updateQuantity(quantity + 1)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-[#ead8bf] text-[#a6795e]"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-16 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-[#d86d23] px-4 text-center text-base font-extrabold leading-5 text-white"
        >
          <Package className="hidden h-5 w-5 sm:block" />
          Tambah ke Keranjang -
          <br />
          {formatPrice(total)}
        </a>
      </div>
    </main>
  );
}
