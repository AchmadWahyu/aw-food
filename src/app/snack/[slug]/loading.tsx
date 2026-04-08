import { Skeleton } from '@/components/ui/skeleton';

export default function PageContentSkeleton() {
  return (
    <div>
      <Skeleton className="w-full rounded-none" style={{ height: '45vh' }} />

      <div className="px-5 pt-5">
        <Skeleton className="w-[60%] h-8 mb-3 rounded-lg" />
        <Skeleton className="w-[35%] h-6 mb-4 rounded-lg" />
        <div className="flex gap-2 mb-4">
          <Skeleton className="w-14 h-6 rounded-full" />
          <Skeleton className="w-20 h-6 rounded-full" />
        </div>
        <Skeleton className="w-full h-4 mb-2 rounded" />
        <Skeleton className="w-[80%] h-4 rounded" />
      </div>

      <div className="h-2 bg-warm-bg my-4" />

      <div className="px-5">
        <Skeleton className="w-[40%] h-5 mb-4 rounded-lg" />
      </div>

      <div className="h-2 bg-warm-bg my-4" />

      <div className="px-5">
        <Skeleton className="w-[35%] h-5 mb-3 rounded-lg" />
        <div className="flex gap-3">
          <Skeleton className="w-[140px] h-[140px] rounded-2xl flex-shrink-0" />
          <Skeleton className="w-[140px] h-[140px] rounded-2xl flex-shrink-0" />
          <Skeleton className="w-[140px] h-[140px] rounded-2xl flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
