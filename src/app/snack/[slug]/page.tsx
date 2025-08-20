import { executeQuery } from '@datocms/cda-client';
import PageContent from './PageContent';
import { AllSnackResponse } from '@/app/data.types';
import { DATOCMS_API_TOKEN } from '@/app/config';

export async function generateStaticParams() {
  if (!DATOCMS_API_TOKEN) {
    console.warn('DATOCMS_API_TOKEN is not set. Skipping static generation.');
    return [];
  }

  try {
    const response: AllSnackResponse = await executeQuery(
      `
      {
        allItems(first: 100, skip: 0) {
          slug
        }
      }
      `,
      {
        token: DATOCMS_API_TOKEN,
      }
    );

    return response.allItems.map((item) => ({
      slug: item.slug,
    }));
  } catch (error) {
    console.error('Failed to fetch slugs for static generation.', error);
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return <PageContent slug={slug} />;
}
