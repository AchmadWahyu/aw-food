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
  if (!DATOCMS_API_TOKEN) {
    console.warn('DATOCMS_API_TOKEN is not set. Rendering empty table.');
    return (
      <div>
        <TableView data={[]} searchPlaceholder="Cari kemasan" />
      </div>
    );
  }

  try {
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
  } catch (error) {
    console.error('Failed to fetch packaging data.', error);
    return (
      <div>
        <TableView data={[]} searchPlaceholder="Cari kemasan" />
      </div>
    );
  }
}
