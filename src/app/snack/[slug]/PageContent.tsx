import Image from 'next/image';
import { DATOCMS_API_TOKEN } from '@/app/config';
import { SnackResponse } from '@/app/data.types';
import { executeQuery } from '@datocms/cda-client';
import fallbackImg from '@/assets/panada_sad.png';
import { NavBar } from '@/app/navigations/NavBar';
import { FLAVOUR_TEXT, cn, formatIDR } from '@/lib/utils';

export default async function PageContent({ slug }: { slug: string }) {
  if (!DATOCMS_API_TOKEN)
    throw new Error('NEXT_PUBLIC_DATOCMS_API_TOKEN is not set');

  const response: SnackResponse = await executeQuery(
    `{
          item(filter: {slug: {eq: "${slug}"}}) {
              id
              name
              description
              price
              tag
              images {
                url
              }
            _updatedAt
          }
        }`,
    {
      token: DATOCMS_API_TOKEN,
      requestInitOptions: {
        next: { revalidate: 300 },
      },
    }
  );

  const snack = response.item;
  const hasType = snack.tag && snack.tag.length > 0;
  const type = snack.tag?.[0];

  return (
    <div>
      <div className="w-full relative h-[75vw]">
        <a href={snack.images?.[0]?.url} target="_blank">
          <Image
            className="object-contain bg-neutral-100 absolute w-full h-full"
            src={snack.images?.[0]?.url || fallbackImg}
            alt={snack.name}
            height={225}
            width={300}
            priority
          />
        </a>

        <NavBar />
      </div>

      <div className="p-8">
        <div className="flex justify-between">
          <p className="mb-4 font-bold text-4xl text-slate-900">{snack.name}</p>
        </div>
        <div className="flex items-center mb-6">
          <p className="font-semibold text-xl text-slate-500">
            {formatIDR.format(snack.price)}
          </p>

          {hasType && (
            <span
              className={cn(
                snack.tag?.[0] === 'salted' ? 'bg-amber-400' : 'bg-rose-400',
                'text-white p-1 px-2 rounded-full text-xs ml-2'
              )}
            >
              {FLAVOUR_TEXT[type]}
            </span>
          )}
        </div>
        <p className="text-slate-900">{snack.description}</p>
      </div>
    </div>
  );
}
