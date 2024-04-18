import TableView from './TableView';
import { Data } from './data.types';

async function getData(): Promise<Data> {
  const res = await fetch(
    'https://gist.githubusercontent.com/AchmadWahyu/173e65a0667ff93ac35b3961163be27e/raw/aw-food-price-list.json'
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const { data } = await getData();

  return (
    <main>
      <div className="bg-yellow-300">
        <h1 className="text-xl font-bold text-center">Menu AW Food & Snack</h1>
      </div>
      <TableView data={data} />
    </main>
  );
}
