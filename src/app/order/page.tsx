import dynamic from 'next/dynamic';
import { Response } from '../data.types';
import Link from 'next/link';

export default async function Page() {
  return (
    <div className='p-4'>
      <p>Free Tissue makan</p>
      <p>Pemesanan minimal H-2</p>
      <p>
        Pemesanan Hub:
        <Link className='block my-2 text-blue-700' href="https://wa.me/+628568056469">08568056469</Link>
        <Link className='block my-2 text-blue-700' href="https://wa.me/+6285693049424">085693049424</Link>
      </p>
        <Link className='block my-2 text-blue-700' href="https://maps.app.goo.gl/scTwfansx3ZvGx7s8">Gmaps toko</Link>
    </div>
  );
}
