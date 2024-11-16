import { executeQuery } from '@datocms/cda-client';
import type { AllSnackResponse } from './data.types';
import { DATOCMS_API_TOKEN } from './config';
import { ProductCard } from '@/components/ProductCard';

const query = `
{
  allItems(first: 100, skip: 0) {
    id
    name
    price
    images {
      url
    }
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
      next: { revalidate: 60 },
    },
  });

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4">
        {response.allItems.map((item, i) => (
          <ProductCard
            key={item.name}
            imgUrl={item.images?.[0]?.url}
            linkUrl={`/snack/${item.id}`}
            price={item.price}
            title={item.name}
            type={item.tag?.[0]}
          />
        ))}
      </div>
    </div>
  );
}
