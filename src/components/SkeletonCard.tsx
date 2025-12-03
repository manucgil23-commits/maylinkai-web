import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const SkeletonCard = () => {
  return (
    <Card className="h-[400px] rounded-lg overflow-hidden bg-card border border-border">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-10 w-1/2 mt-6" />
      </div>
    </Card>
  );
};

export const SkeletonBlogGrid = ({ count = 3 }: { count?: number }) => {
  return (
    <section className="py-20 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
