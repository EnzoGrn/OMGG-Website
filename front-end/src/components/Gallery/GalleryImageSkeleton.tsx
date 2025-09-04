import { Card     } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const GalleryImageSkeleton = () => {
  return (
    <div className="carousel-item flex-none w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-4 snap-start">
      <Card className="py-0 h-full flex flex-col overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow bg-background">
        
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-b-none">
          <Skeleton className="absolute inset-0 w-full h-full" />
        </div>

      </Card>
    </div>
  )
}

export { GalleryImageSkeleton }
