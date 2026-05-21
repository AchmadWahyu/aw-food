import { executeQuery } from '@datocms/cda-client';
import type { AllPackagingsResponse } from '../data.types';
import { DATOCMS_API_TOKEN } from '../config';
import PackagingListView from './PackagingListView';

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
    <PackagingListView data={response.allPackagings} />
  );
}
