import dynamic from 'next/dynamic';
import { Response } from '../data.types';

const TableView = dynamic(() => import('../TableView'));

async function getData(): Promise<Response> {
  try {
    const response = await fetch(
      'https://api.github.com/gists/133bc4f14ea3d007cd3438e97ad03ccb',
      {
        next: {
          revalidate: 120,
        },
      }
    );

    const result = await response.json();
    const data = JSON.parse(
      result.files['aw-food-packaging-list.json'].content
    );
    console.log('[INFO] fetch data, result: ', JSON.stringify(data));

    return data;
  } catch (err) {
    console.log('[ERROR]: ', err);
    throw new Error('Failed to fetch data');
  }
}

export default async function Page() {
  const result = await getData();

  return (
    <div>
      <TableView data={result.data} searchPlaceholder="Cari kemasan" />
    </div>
  );
}
