import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { FLAVOUR_TEXT, cn, formatIDR } from '@/lib/utils';
import { SnackFlavour } from '@/app/data.types';
import fallbackImg from '@/assets/panada_sad.png';

type ProductCardProps = {
  linkUrl: string;
  type?: SnackFlavour;
  imgUrl?: string;
  title: string;
  price: number;
  eager?: boolean;
};

export const ProductCard = ({
  linkUrl,
  type,
  imgUrl,
  title,
  price,
  eager,
}: ProductCardProps) => (
  <Link href={linkUrl} className="flex flex-col w-full h-full m-auto">
    <Card className="bg-neutral-100 border-neutral-100 flex-grow mb-2 hover:bg-amber-300 hover:border-amber-300 transition ease-in-out duration-250">
      <CardContent className="relative h-full min-h-[50vw] flex justify-center items-center p-3">
        <Image
          className="rounded-xl"
          alt={title}
          src={imgUrl || fallbackImg}
          width={200}
          height={200}
          loading={eager ? 'eager' : 'lazy'}
          style={{ width: '200px', height: 'auto' }}
        />
        {type && (
          <span
            className={cn(
              type === 'salted' ? 'bg-amber-400' : 'bg-rose-400',
              'text-white p-1 px-2 rounded-full text-xs absolute top-2 left-2'
            )}
          >
            {FLAVOUR_TEXT[type]}
          </span>
        )}
      </CardContent>
    </Card>
    <p className="mb-1 font-bold text-lg text-slate-900 truncate">{title}</p>
    <p className="font-semibold text-sm text-slate-800">
      {formatIDR.format(price)}
    </p>
  </Link>
);
