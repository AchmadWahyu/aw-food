import { Suspense } from 'react';
import PageContent from './PageContent';
import PageContentSkeleton from './PageContentSkeleton';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <Suspense fallback={<PageContentSkeleton />}>
      <PageContent slug={slug} />
    </Suspense>
  );
}
