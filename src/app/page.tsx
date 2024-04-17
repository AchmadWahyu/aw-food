import Image from 'next/image';

const data = [
  {
    name: 'Lemper',
    price: 2000,
    lastUpdatedDate: '17/04/24',
  },
  {
    name: 'Tahu Isi',
    price: 2000,
    lastUpdatedDate: '17/04/24',
  },
  {
    name: 'Lontong',
    price: 2000,
    lastUpdatedDate: '17/04/24',
  },
  {
    name: 'Lemper',
    price: 2000,
    lastUpdatedDate: '17/04/24',
  },
  {
    name: 'Tahu Isi',
    price: 2000,
    lastUpdatedDate: '17/04/24',
  },
  {
    name: 'Lontong',
    price: 2000,
    lastUpdatedDate: '17/04/24',
  },
  {
    name: 'Lemper',
    price: 2000,
    lastUpdatedDate: '17/04/24',
  },
  {
    name: 'Tahu Isi',
    price: 2000,
    lastUpdatedDate: '17/04/24',
  },
  {
    name: 'Lontong',
    price: 2000,
    lastUpdatedDate: '17/04/24',
  },
  {
    name: 'Lemper',
    price: 2000,
    lastUpdatedDate: '17/04/24',
  },
  {
    name: 'Tahu Isi',
    price: 2000,
    lastUpdatedDate: '17/04/24',
  },
  {
    name: 'Lontong',
    price: 2000,
    lastUpdatedDate: '17/04/24',
  },
  {
    name: 'Lemper',
    price: 2000,
    lastUpdatedDate: '17/04/24',
  },
  {
    name: 'Tahu Isi',
    price: 2000,
    lastUpdatedDate: '17/04/24',
  },
  {
    name: 'Lontong',
    price: 2000,
    lastUpdatedDate: '17/04/24',
  },
  {
    name: 'Lemper',
    price: 2000,
    lastUpdatedDate: '17/04/24',
  },
  {
    name: 'Tahu Isi',
    price: 2000,
    lastUpdatedDate: '17/04/24',
  },
  {
    name: 'Lontong',
    price: 2000,
    lastUpdatedDate: '17/04/24',
  },
];

export default function Home() {
  return (
    <main>
      <table className="table-fixed w-full">
        <thead className="z-10 sticky top-0 bg-slate-300">
          <tr>
            <th className="p-1">Item</th>
            <th className="p-1">Harga</th>
            <th className="p-1">Tanggal diupdate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, i) => (
            <tr key={data.name} className={i % 2 == 0 ? '' : 'bg-gray-300'}>
              <td className="min-h-16 p-4 border border-t-transparent border-l-transparent border-r-transparent border-b-slate-300">
                {data.name}
              </td>
              <td className="text-center min-h-16 p-4 border border-t-transparent border-l-transparent border-r-transparent border-b-slate-300">
                <strong>{data.price}</strong>
              </td>
              <td className="text-gray-500 text-right min-h-16 p-4 border border-t-transparent border-l-transparent border-r-transparent border-b-slate-300">
                {data.lastUpdatedDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
