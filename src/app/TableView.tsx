'use client';

import { useMemo, useState } from 'react';
import { Snack, Packaging } from './data.types';
import Image from 'next/image';
import { formatIDR } from '@/lib/utils';

type Props = {
  data: Snack[] | Packaging[];
  searchPlaceholder: string;
};

export default function TableView({ data, searchPlaceholder }: Props) {
  const [filter, setFilter] = useState('');

  const filteredResult = useMemo(
    () =>
      data.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [data, filter]
  );

  return (
    <>
      <div className="flex items-center z-10 sticky top-0 bg-white">
        <Image
          className="basis-5 shrink-0 mx-2"
          src="/icon-search.png"
          alt=""
          width={20}
          height={20}
        />
        <input
          className="w-full h-16 focus:outline-none"
          type="text"
          placeholder={searchPlaceholder}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {filter.length > 0 ? (
          <button className="p-5" onClick={() => setFilter('')}>
            <Image
              className="basis-5 shrink-0"
              src="/icon-close.png"
              alt="hapus pencarian"
              width={20}
              height={20}
            />
          </button>
        ) : null}
      </div>
      <table className="table-fixed w-full">
        <thead className="z-10 sticky top-16 bg-slate-300">
          <tr>
            <th className="p-0.5">Item</th>
            <th className="p-0.5">Harga</th>
            <th className="p-0.5">Tanggal diupdate</th>
          </tr>
        </thead>
        <tbody>
          {filteredResult.map((data, i) => (
            <tr key={data.name} className={i % 2 == 0 ? '' : 'bg-gray-300'}>
              <td className="min-h-16 p-4 border border-t-transparent border-l-transparent border-r-transparent border-b-slate-300">
                {data.name}
              </td>
              <td className="text-center min-h-16 p-4 border border-t-transparent border-l-transparent border-r-transparent border-b-slate-300">
                <strong>{formatIDR.format(data.price)}</strong>
              </td>
              <td className="text-gray-500 text-right min-h-16 p-4 border border-t-transparent border-l-transparent border-r-transparent border-b-slate-300">
                {new Date(data._updatedAt).toLocaleDateString('id-ID')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
