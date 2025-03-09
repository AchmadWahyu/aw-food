import { Skeleton } from '@/components/ui/skeleton';

export default function PageContentSkeleton() {
  return (
    <div>
      <Skeleton className="w-full h-[75vw]" />
      <div className="p-8">
        <Skeleton className="w-[40%] h-[2.5rem] mb-4" />
        <Skeleton className="w-[60%] h-[1.75rem] mb-6" />
        <Skeleton className="w-full h-[1.5rem] mb-2" />
        <Skeleton className="w-[75%] h-[1.5rem]" />
      </div>
    </div>
  );
}
