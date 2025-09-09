import { Card                                                           } from "@/components/ui/card"
import { Search, X                                                      } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { VisuallyHidden                                                 } from "@radix-ui/react-visually-hidden"
import { GalleryProps                                                   } from "./GalleryInterface"

const GalleryImagePreview = (image: GalleryProps) => {
  return (
    <div className="carousel-item flex-none w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-4 snap-start">
      <Card className="py-0 h-full flex flex-col overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow bg-background">
        
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-b-none group cursor-pointer">

              {/* Illustration */}
              {image.imageUrl.endsWith('.webm') || image.imageUrl.endsWith('.mp4') ? (
                <video src={image.imageUrl} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" autoPlay loop muted playsInline />
              ) : (
                <img src={image.imageUrl} alt={image.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              )}

              {/* Hover effect */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Search className="w-10 h-10 text-white" />
              </div>
            </div>
          </DialogTrigger>

          <DialogContent className="md:max-w-4xl p-0 bg-transparent border-0 shadow-none">

            <DialogClose asChild>
              <button className="absolute top-3 right-3 p-1 rounded-full bg-black/50 hover:bg-black/70 text-white transition" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </DialogClose>

            {/* Title hide for screen reader users */}
            <VisuallyHidden>
              <DialogTitle>{image.title}</DialogTitle>
            </VisuallyHidden>

            {/* Illustration */}
            {image.imageUrl.endsWith('.webm') || image.imageUrl.endsWith('.mp4') ? (
              <video src={image.imageUrl} className="w-full h-auto rounded-2xl" autoPlay loop muted playsInline />
            ) : (
              <img src={image.imageUrl} alt={image.title} className="w-full h-auto rounded-2xl" />
            )}
          </DialogContent>
        </Dialog>

      </Card>
    </div>
  )
}

export { GalleryImagePreview }
