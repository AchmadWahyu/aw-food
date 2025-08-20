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
  if (!DATOCMS_API_TOKEN) {
    console.warn('DATOCMS_API_TOKEN is not set. Rendering empty list.');
    return <ItemListView data={[]} />;
  }

  try {
    const response: AllSnackResponse = await executeQuery(query, {
      token: DATOCMS_API_TOKEN,
      requestInitOptions: {
        next: { revalidate: 300 },
      },
    });

    return <ItemListView data={response.allItems} />;
  } catch (error) {
    console.error('Failed to fetch initial data.', error);
    return <ItemListView data={[]} />;
  }
}
