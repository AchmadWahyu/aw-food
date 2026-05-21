export default function PageContentSkeleton() {
  return (
    <main className="min-h-screen bg-[#fff5e8] p-4">
      <div className="mb-4 h-16 animate-pulse rounded-2xl bg-white" />
      <div className="mb-8 aspect-[1/0.9] animate-pulse rounded-3xl bg-[#f4dfc7]" />
      <div className="space-y-4">
        <div className="h-8 w-32 animate-pulse rounded-full bg-[#f4dfc7]" />
        <div className="h-7 w-24 animate-pulse rounded-full bg-[#f4dfc7]" />
        <div className="h-20 animate-pulse rounded-2xl bg-white" />
      </div>
    </main>
  );
}
