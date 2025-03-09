import { Suspense } from 'react';
import PageContent from './PageContent';
import PageContentSkeleton from './loading';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return <PageContent slug={slug} />;
}
