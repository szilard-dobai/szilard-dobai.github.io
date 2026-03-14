import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight } from "lucide-react"

type ImageGalleryProps = {
  images: string[]
  alt: string
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const showPrev = () =>
    setSelectedIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null))
  const showNext = () =>
    setSelectedIndex((i) => (i !== null ? (i + 1) % images.length : null))

  return (
    <>
      <div className="grid gap-3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="cursor-pointer overflow-hidden rounded-xl border border-border"
          onClick={() => setSelectedIndex(0)}
        >
          <img
            src={images[0]}
            alt={alt}
            className="w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
        </motion.div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <motion.button
                key={image}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedIndex(index)}
                className="cursor-pointer flex-shrink-0 overflow-hidden rounded-lg border-2 border-border transition-all hover:border-primary/50 data-[active=true]:border-primary"
                data-active={selectedIndex === index}
              >
                <img
                  src={image}
                  alt={`${alt} ${index + 1}`}
                  className="h-16 w-28 object-cover"
                />
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-4xl p-0 border-none bg-transparent shadow-none">
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <div className="relative flex items-center justify-center">
            {images.length > 1 && (
              <button
                className="cursor-pointer absolute left-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground transition-colors"
                onClick={showPrev}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            <AnimatePresence mode="wait">
              {selectedIndex !== null && (
                <motion.img
                  key={selectedIndex}
                  src={images[selectedIndex]}
                  alt={`${alt} ${selectedIndex + 1}`}
                  className="max-h-[80vh] rounded-xl object-contain"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>

            {images.length > 1 && (
              <button
                className="cursor-pointer absolute right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground transition-colors"
                onClick={showNext}
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
