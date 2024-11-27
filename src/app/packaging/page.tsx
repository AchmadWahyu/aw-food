import dynamic from 'next/dynamic';
import { executeQuery } from '@datocms/cda-client';
import type { AllPackagingsResponse } from '../data.types';
import { DATOCMS_API_TOKEN } from '../config';

const TableView = dynamic(() => import('../TableView'));

const query = `
{
  allPackagings(first: 100, skip: 0) {
    id
    name
    price
    _updatedAt
  }
}
`;

export default async function Page() {
  if (!DATOCMS_API_TOKEN)
    throw new Error('NEXT_PUBLIC_DATOCMS_API_TOKEN is not set');

  const response: AllPackagingsResponse = await executeQuery(query, {
    token: DATOCMS_API_TOKEN,
    requestInitOptions: {
      next: { revalidate: 300 },
    },
  });

  return (
    <div>
      <TableView
        data={response.allPackagings}
        searchPlaceholder="Cari kemasan"
      />
    </div>
  );
}
