import dynamic from 'next/dynamic';
import { executeQuery } from '@datocms/cda-client';
import type { AllSnackResponse } from './data.types';
import { DATOCMS_API_TOKEN } from './config';

const TableView = dynamic(() => import('./TableView'));
const query = `
{
  allItems(first: 100, skip: 0) {
    id
    name
    price
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
  });

  return (
    <div>
      <TableView data={response.allItems} searchPlaceholder="Cari kue" />
    </div>
  );
}
