import { notFound } from 'next/navigation';
import snacks from '@/lib/data.json';
import SnackDetailView, { LocalSnack } from './SnackDetailView';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const snackList = snacks as LocalSnack[];
  const snack = snackList.find((item) => item.slug === slug);

  if (!snack) {
    notFound();
  }

  return <SnackDetailView snack={snack} snacks={snackList} />;
}

export async function generateStaticParams() {
  return (snacks as LocalSnack[]).map((snack) => ({
    slug: snack.slug,
  }));
}
