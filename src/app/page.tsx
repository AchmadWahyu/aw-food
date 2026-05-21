import staticData from '@/lib/data.json';
import ItemListView from './ItemListView';
import { Snack } from './data.types';


export default async function Page() {
  const data = staticData as Snack[];

  return <ItemListView data={data} />;
}
