'use client';

import { ProductCard } from '@/components/ProductCard';
import { Snack, SnackFlavour } from './data.types';
import { Input } from '@/components/ui/input';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  ChevronRight,
  Minus,
  MapPin,
  MessageCircle,
  Navigation,
  Plus,
  Search,
  ShoppingBasket,
  Trash2,
  Utensils,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import { cn, formatIDR } from '@/lib/utils';
import FallbackSpriteImage from '@/components/FallbackSpriteImage';

type CategoryFilter = 'all' | 'best' | SnackFlavour;
type CartItem = Snack & { quantity: number };

const categories: { label: string; value: CategoryFilter }[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Best Seller', value: 'best' },
  { label: 'Gorengan', value: 'salted' },
  { label: 'Manis', value: 'sweet' },
];

const ORDER_TEXT = 'Halo%20Kak%2C%20saya%20mau%20pesan%20kue';
const WHATSAPP_PHONE = '628568056469';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${ORDER_TEXT}`;
const MAPS_URL = 'https://maps.app.goo.gl/NJcdNAejprjHdgg58';

const formatPrice = (price: number) => formatIDR.format(price).replace(/\s/g, ' ');

const ItemListView = ({ data }: { data: Snack[] }) => {
  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartSheetMounted, setCartSheetMounted] = useState(false);
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [allParams, setAllParams] = useState('');
  useEffect(() => {
    setAllParams(window?.location?.search);
  }, []);

  useEffect(() => {
    if (cartOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCartSheetMounted(false);
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [cartOpen]);

  const filteredResult = useMemo(
    () => {
      const searchTerm = filter.trim().toLowerCase();

      return data.filter((item) => {
        const itemName = item.name.toLowerCase();
        const matchesSearch = itemName.includes(searchTerm);
        const matchesCategory =
          selectedCategory === 'all' ||
          (selectedCategory === 'best' && data.indexOf(item) < 8) ||
          item.tag?.includes(selectedCategory as SnackFlavour);

        return matchesSearch && matchesCategory;
      });
    },
    [data, filter, selectedCategory]
  );
  const menuSummary = `${filteredResult.length} menu`;

  const cartItems = useMemo(() => Object.values(cart), [cart]);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const whatsappCheckoutUrl = useMemo(() => {
    const orderLines = cartItems
      .map(
        (item) =>
          `- ${item.name} x${item.quantity} = ${formatPrice(
            item.price * item.quantity
          )}`
      )
      .join('\n');
    const message = `Halo Kak, saya mau pesan:\n${orderLines}\n\nTotal: ${formatPrice(
      cartTotal
    )}`;

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  }, [cartItems, cartTotal]);

  const addToCart = (item: Snack) => {
    const itemId = item.id.toString();

    setCart((currentCart) => ({
      ...currentCart,
      [itemId]: {
        ...item,
        quantity: (currentCart[itemId]?.quantity || 0) + 1,
      },
    }));
  };

  const updateCartQuantity = (itemId: string | number, nextQuantity: number) => {
    setCart((currentCart) => {
      const nextCart = { ...currentCart };
      const cartItemId = itemId.toString();

      if (nextQuantity <= 0) {
        delete nextCart[cartItemId];
      } else {
        nextCart[cartItemId] = {
          ...nextCart[cartItemId],
          quantity: nextQuantity,
        };
      }

      return nextCart;
    });
  };

  const removeFromCart = (itemId: string | number) => {
    setCart((currentCart) => {
      const nextCart = { ...currentCart };
      delete nextCart[itemId.toString()];
      return nextCart;
    });
  };

  const openCartSheet = () => {
    setCartSheetMounted(true);
    window.requestAnimationFrame(() => {
      setCartOpen(true);
    });
  };

  const closeCartSheet = () => {
    setCartOpen(false);
  };

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
            placeholder="Cari jajan..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-11 rounded-xl border-[#e8cfaa] bg-white pl-10 pr-10 text-base text-[#5a3b2e] placeholder:text-[#8fa0bf] focus-visible:ring-[#d86d23]"
          />
          {filter.length > 0 ? (
            <button
              onClick={() => setFilter('')}
              type="button"
              aria-label="Hapus pencarian"
              className="absolute right-6 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-[#8fa0bf]"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </header>

      <section className="px-4 pt-4">
        <div className="rounded-2xl bg-[#4a2f23] px-6 py-7 text-white shadow-sm">
          <p className="text-sm font-normal text-white/70">
            Pesan buat acara atau kumpul?
          </p>
          <h2 className="mt-2 max-w-[260px] font-serif text-2xl font-normal leading-7">
            Bisa pesan banyak
            <br />
            & mix menu <span aria-hidden>🎉</span>
          </h2>
          <p className="mt-2 text-sm font-normal text-white/70">
            Cocok buat arisan, seminar, acara kampus
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-sm font-normal text-[#6a4a3c]"
          >
            <MessageCircle className="h-4 w-4 text-[#27b95a]" />
            Pesan via WhatsApp
            <ChevronRight className="h-4 w-4 text-[#8fa0bf]" />
          </a>
        </div>
      </section>

      <section className="px-4 pt-4">
        <div className="border-t border-[#d9a971]" />
      </section>

      <section className="px-4 pt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-serif text-2xl font-normal text-[#6a3f2c]">
            <UtensilsCrossed className="h-5 w-5 text-[#d96b21]" />
            Menu Jajan
          </h2>
          <p className="text-sm font-normal text-[#9caccc]">{menuSummary}</p>
        </div>

        <div className="mb-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => {
            const selected = selectedCategory === category.value;

            return (
              <button
                key={category.value}
                type="button"
                onClick={() => setSelectedCategory(category.value)}
                className={cn(
                  'inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-normal shadow-sm transition',
                  selected
                    ? 'border-[#db6c22] bg-[#db6c22] text-white'
                    : 'border-[#ead8bf] bg-white text-[#6d554a]'
                )}
              >
                {category.value === 'best' ? <span aria-hidden>🧺</span> : null}
                {category.label}
              </button>
            );
          })}
        </div>

        {filteredResult.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredResult.map((item, index) => (
              <ProductCard
                href={`/snack/${item.slug}${allParams}`}
                onOrderClick={() => addToCart(item)}
                onDecrementClick={() =>
                  updateCartQuantity(
                    item.id,
                    (cart[item.id.toString()]?.quantity || 0) - 1
                  )
                }
                key={item.name}
                description={item.description}
                imgUrl={item.images?.[0]?.url}
                price={item.price}
                quantity={cart[item.id.toString()]?.quantity || 0}
                tags={item.tag}
                title={item.name}
                type={item.tag?.[0]}
                // eager load first 4 cards
                eager={index < 4}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#e8cfaa] bg-white p-8 text-center">
            <Utensils className="mx-auto mb-3 h-8 w-8 text-[#db6c22]" />
            <p className="text-sm font-bold">Menu belum ketemu</p>
            <p className="mt-1 text-xs text-[#8fa0bf]">
              Coba kata kunci atau kategori lain.
            </p>
          </div>
        )}
      </section>

      <section className="px-4 pb-8 pt-7">
        <h2 className="font-serif text-2xl font-bold text-[#6a3f2c]">
          Lokasi Toko
        </h2>
        <p className="mt-1 text-sm font-medium text-[#8fa0bf]">
          Temukan kami di dekat kampus
        </p>

        <div className="mt-5 overflow-hidden rounded-2xl border border-[#ead8bf] bg-white">
          <div className="grid min-h-44 place-items-center bg-[#fff1df]">
            <div className="text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#f8dfcc] text-[#db6c22]">
                <MapPin className="h-7 w-7" />
              </div>
              <p className="font-serif text-lg font-bold text-[#6a3f2c]">
                AW Food & Snack
              </p>
            </div>
          </div>

          <div className="space-y-5 p-4 text-center">
            <div className="flex items-start gap-3 text-left">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#f06e25]" />
              <p className="text-sm font-medium leading-6 text-[#6a3f2c]">
                Jl Pala Kali No.77 depan, Pintu Masuk kampus, Kukusan, Kota
                Depok, Jawa Barat 16425
              </p>
            </div>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#d96b21] px-5 text-sm font-extrabold text-white"
            >
              <Navigation className="h-4 w-4" />
              Buka di Google Maps
            </a>

            <p className="text-xs font-medium text-[#9caccc]">
              Bisa pickup langsung atau order via WhatsApp
            </p>
          </div>
        </div>
      </section>

      {cartCount > 0 ? (
        <button
          type="button"
          onClick={openCartSheet}
          className="fixed bottom-[5.75rem] left-1/2 z-30 flex h-16 w-[calc(100%-2rem)] max-w-[calc(32rem-2rem)] -translate-x-1/2 items-center justify-between rounded-2xl bg-[#d86d23] p-3 text-left text-white shadow-xl"
        >
          <div className="flex items-center gap-3">
            <div className="relative grid h-10 w-10 place-items-center">
              <ShoppingBasket className="h-6 w-6" />
              <span className="absolute -right-0.5 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[11px] font-extrabold text-[#d86d23]">
                {cartCount}
              </span>
            </div>
            <div>
              <p className="text-xs font-extrabold">
                {cartCount} item dipilih
              </p>
              <p className="text-base font-extrabold">
                {formatPrice(cartTotal)}
              </p>
            </div>
          </div>

          <span className="rounded-xl bg-[#ea8a43] px-5 py-3 text-sm font-extrabold">
            Kirim ke WhatsApp →
          </span>
        </button>
      ) : null}

      {cartSheetMounted ? (
        <div
          className={cn(
            'fixed inset-0 z-50 flex items-end justify-center bg-black/40 transition-opacity duration-300 ease-out',
            cartOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
        >
          <button
            type="button"
            aria-label="Tutup keranjang"
            className="absolute inset-0 cursor-default"
            onClick={closeCartSheet}
          />

          <section
            className={cn(
              'relative w-full max-w-lg transform rounded-t-[28px] bg-white pb-6 shadow-2xl transition-transform duration-300 ease-out',
              cartOpen ? 'translate-y-0' : 'translate-y-full'
            )}
          >
            <div className="mx-auto mt-6 h-1 w-10 rounded-full bg-[#cbd2dc]" />

            <div className="flex items-center justify-between px-6 pb-5 pt-7">
              <h2 className="font-serif text-xl font-bold text-[#6a3f2c]">
                Pesanan Kamu
              </h2>
              <button
                type="button"
                aria-label="Tutup keranjang"
                onClick={closeCartSheet}
                className="grid h-9 w-9 place-items-center rounded-full text-[#8fa0bf]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[42vh] space-y-4 overflow-y-auto px-6 pb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  {item.images?.[0]?.url ? (
                    <Image
                      className="h-12 w-12 shrink-0 rounded-xl bg-[#fff1df] object-cover"
                      alt={item.name}
                      src={item.images[0].url}
                      width={64}
                      height={64}
                    />
                  ) : (
                    <FallbackSpriteImage
                      name={item.name}
                      tags={item.tag}
                      className="h-12 w-12 shrink-0 rounded-xl bg-[#fff1df]"
                    />
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-extrabold text-[#6a4a3c]">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-[#db6c22]">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={`Kurangi ${item.name}`}
                      onClick={() =>
                        updateCartQuantity(item.id, item.quantity - 1)
                      }
                      className="grid h-8 w-8 place-items-center rounded-full border border-[#ead8bf] text-[#a6795e]"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <input
                      type="number"
                      aria-label={`Jumlah ${item.name}`}
                      min={1}
                      step={1}
                      inputMode="numeric"
                      value={item.quantity}
                      onClick={(event) => event.stopPropagation()}
                      onFocus={(event) => event.currentTarget.select()}
                      onChange={(event) => {
                        const nextQuantity = Number(event.target.value);

                        if (!Number.isFinite(nextQuantity) || nextQuantity < 1) {
                          return;
                        }

                        updateCartQuantity(item.id, Math.floor(nextQuantity));
                      }}
                      className="h-8 w-12 rounded-md border border-[#ead8bf] bg-white text-center text-sm font-bold text-[#6a4a3c] outline-none focus:border-[#db6c22] focus:ring-2 focus:ring-[#f3cfb4]"
                    />
                    <button
                      type="button"
                      aria-label={`Tambah ${item.name}`}
                      onClick={() =>
                        updateCartQuantity(item.id, item.quantity + 1)
                      }
                      className="grid h-8 w-8 place-items-center rounded-full border border-[#ead8bf] text-[#a6795e]"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Hapus ${item.name}`}
                      onClick={() => removeFromCart(item.id)}
                      className="grid h-8 w-8 place-items-center rounded-full text-[#ff6b6b]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#ead8bf] px-6 pt-5">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-base font-medium text-[#657799]">
                  Total ({cartCount} item)
                </p>
                <p className="text-xl font-extrabold text-[#6a4a3c]">
                  {formatPrice(cartTotal)}
                </p>
              </div>

              <a
                href={whatsappCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#31c763] text-base font-extrabold text-white"
              >
                <MessageCircle className="h-5 w-5" />
                Kirim Pesanan ke WhatsApp
              </a>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
};

export default ItemListView;
