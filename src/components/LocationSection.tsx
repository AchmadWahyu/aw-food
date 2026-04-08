'use client';

import { MapPin, Navigation } from 'lucide-react';

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/wr2cKQEbe6BaAYHp8';

export default function LocationSection() {
 return (
  <section className="px-4 py-6">
   <h2 className="font-heading font-bold text-xl text-warm-text mb-1">
    Lokasi Toko
   </h2>
   <p className="text-sm text-warm-text-muted mb-4">
    Temukan kami di dekat kampus
   </p>

   <div className="bg-white border border-warm-border rounded-2xl overflow-hidden">
    {/* Map preview area */}
    <div className="relative bg-warm-bg flex flex-col items-center justify-center py-12 px-4">
     <div className="w-14 h-14 rounded-full bg-warm-primary/10 flex items-center justify-center mb-3">
      <MapPin className="w-7 h-7 text-warm-primary" />
     </div>
     <p className="font-heading font-bold text-warm-text text-base">
      AW Food & Snack
     </p>
    </div>

    {/* Address + CTA */}
    <div className="p-4 space-y-4">
     <div className="flex items-start gap-3">
      <MapPin className="w-5 h-5 text-warm-primary flex-shrink-0 mt-0.5" />
      <p className="text-sm text-warm-text leading-relaxed">
       Jl Pala Kali No.77 depan, Pintu Masuk kampus, Kukusan, Kota Depok, Jawa
       Barat 16425
      </p>
     </div>

     <a
      href={GOOGLE_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 w-full bg-warm-primary text-white font-semibold py-3 rounded-full text-sm hover:bg-warm-primary-hover transition-colors"
     >
      <Navigation className="w-4 h-4" />
      Buka di Google Maps
     </a>

     <p className="text-xs text-warm-text-muted text-center">
      Bisa pickup langsung atau order via WhatsApp
     </p>
    </div>
   </div>
  </section>
 );
}
