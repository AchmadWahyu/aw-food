'use client';

import { useMemo, useState } from 'react';
import { Data } from './data.types';
import Image from 'next/image';

export default function TableView({ data }: Data) {
  const [filter, setFilter] = useState('');

  const formatIDR = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });

  const filteredResult = useMemo(
    () => data.priceList.filter((item) => item.name.includes(filter)),
    [data.priceList, filter]
  );

  return (
    <>
      <div className="flex items-center">
        <Image
          className="basis-5 shrink-0 mx-2"
          src="/icon-search.png"
          alt=""
          width={20}
          height={20}
        />
        <input
          className="w-full h-16"
          type="text"
          placeholder="cari kue"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <table className="table-fixed w-full">
        <thead className="z-10 sticky top-0 bg-slate-300">
          <tr>
            <th className="p-1">Item</th>
            <th className="p-1">Harga</th>
            <th className="p-1">Tanggal diupdate</th>
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
                {data.lastUpdatedDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}