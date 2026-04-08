import { Suspense } from 'react';
import type { Snack } from './data.types';
import ItemListView from './ItemListView';
import staticData from '@/lib/data.json';

export default async function Page() {
  const data = staticData as Snack[];

  return (
    <Suspense fallback={null}>
      <ItemListView data={data} />
    </Suspense>
  );
}
