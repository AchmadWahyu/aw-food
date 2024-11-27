import { executeQuery } from '@datocms/cda-client';
import type { AllSnackResponse } from './data.types';
import { DATOCMS_API_TOKEN } from './config';
import ItemListView from './ItemListView';

const query = `
{
  allItems(first: 100, skip: 0) {
    id
    name
    price
    images {
      url
    }
    slug
    tag
    _updatedAt
  }
}
`;

export default async function Page() {
  if (!DATOCMS_API_TOKEN)
    throw new Error('NEXT_PUBLIC_DATOCMS_API_TOKEN is not set');

  const response: AllSnackResponse = await executeQuery(query, {
    token: DATOCMS_API_TOKEN,
    requestInitOptions: {
      next: { revalidate: 300 },
    },
  });

  return (
    <div className="p-4">
      <ItemListView data={response.allItems} />
    </div>
  );
}
