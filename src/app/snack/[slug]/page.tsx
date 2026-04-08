import { notFound } from 'next/navigation';
import type { Snack } from '@/app/data.types';
import ProductDetail from './ProductDetail';
import staticData from '@/lib/data.json';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const data = staticData as Snack[];

  const snack = data.find((item) => item.slug === slug);

  if (!snack) notFound();

  const relatedItems = data.filter((i) => i.slug !== slug).slice(0, 6);

  return <ProductDetail snack={snack} relatedItems={relatedItems} />;
}
