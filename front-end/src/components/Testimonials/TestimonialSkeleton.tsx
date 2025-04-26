import { Skeleton     } from "@/components/ui/skeleton"
import { CarouselItem } from "@/components/ui/carousel"

const TestimonialSkeleton = () => {
  return (
    <CarouselItem>
      <div className="container flex flex-col items-center text-center">

        {/* Avatar Skeleton */}
        <div className="mb-8">
          <Skeleton className="rounded-full size-24" />
        </div>

        {/* Quote Skeleton */}
        <div className="mb-8 max-w-4xl md:px-8 w-full flex flex-col items-center space-y-2">
          <Skeleton className="h-6 w-4/5 md:w-3/4 lg:w-2/3" />
          <Skeleton className="h-6 w-2/3 md:w-1/2 lg:w-1/3" />
        </div>

        {/* Name */}
        <Skeleton className="h-4 w-32 md:h-5 md:w-48 mb-1" />

        {/* Role */}
        <Skeleton className="h-4 w-40 md:h-5 md:w-56 mb-2" />
      </div>
    </CarouselItem>
  );
}

export { TestimonialSkeleton }
