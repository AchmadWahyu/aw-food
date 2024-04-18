import TableView from './TableView';
import { Data } from './data.types';

async function getData(): Promise<Data> {
  try {
    const response = await fetch(
      'https://api.github.com/gists/173e65a0667ff93ac35b3961163be27e',
      {
        cache: 'no-store',
        next: {
          revalidate: 0,
        },
      }
    );

    const result = await response.json();
    
    return JSON.parse(result.files['aw-food-price-list.json'].content);
    
  } catch (err) {
    console.log('ERR: ', err);
    throw new Error('Failed to fetch data');
  }
}

export default async function Home() {
  const result = await getData();

  return (
    <main>
      <div className="bg-yellow-300">
        <h1 className="text-xl font-bold text-center">Menu AW Food & Snack</h1>
      </div>
      <TableView data={result.data} />
    </main>
  );
}
