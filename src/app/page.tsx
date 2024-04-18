import { Data } from './data.types';

async function getData(): Promise<Data> {
  const res = await fetch(
    'https://gist.githubusercontent.com/AchmadWahyu/173e65a0667ff93ac35b3961163be27e/raw'
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const { data } = await getData();

  const formatIDR = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  });

  return (
    <main>
      <div className="bg-yellow-300">
        <h1 className="text-xl font-bold text-center">Menu AW Food & Snack</h1>
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
          {data?.priceList?.map((data, i) => (
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
    </main>
  );
}
