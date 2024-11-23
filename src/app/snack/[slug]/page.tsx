import { executeQuery } from '@datocms/cda-client';
import { DATOCMS_API_TOKEN } from '@/app/config';
import Image from 'next/image';
import { SnackResponse } from '@/app/data.types';
import fallbackImg from '@/assets/panada_sad.png';
import { FLAVOUR_TEXT, cn, formatIDR } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { NavBar } from '@/app/navigations/NavBar';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

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
        next: { revalidate: 60 },
      },
    }
  );

  const snack = response.item;
  const hasType = snack.tag && snack.tag.length > 0;
  const type = snack.tag?.[0];

  return (
    <div>
      <div className="w-full relative h-[75vw]">
        <Image
          className="object-contain bg-neutral-100"
          src={snack.images?.[0]?.url || fallbackImg}
          alt={snack.name}
          layout="fill"
        />

        <NavBar />
      </div>

      <div className="p-8">
        <div className="flex justify-between">
          <p className="mb-4 font-bold text-4xl text-slate-900">{snack.name}</p>
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            size="default"
          >
            <Heart />
          </Button>
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
