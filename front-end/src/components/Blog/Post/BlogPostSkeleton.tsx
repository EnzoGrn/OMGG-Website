import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const BlogPostSkeleton = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("py-0 h-full flex flex-col overflow-hidden rounded-2xl shadow-md bg-background", className)}>

      {/* Image Skeleton */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-b-none">
        <Skeleton className="absolute inset-0 w-full h-full" />
        <div className="absolute top-4 left-4 z-10">
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>

      <CardContent className="flex-grow flex flex-col justify-between space-y-3">

        {/* Date */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Title */}
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-5 w-3/4" />

        {/* Excerpt */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>

      <CardFooter className="px-5 pb-5 pt-0">
        <Skeleton className="h-8 w-24 rounded-md" />
      </CardFooter>
    </Card>
  );
}

export { BlogPostSkeleton }
