import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
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
      <div className="grid gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="cursor-pointer overflow-hidden rounded-lg border"
          onClick={() => setSelectedIndex(0)}
        >
          <img
            src={images[0]}
            alt={alt}
            className="w-full object-cover"
          />
        </motion.div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <motion.button
                key={image}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedIndex(index)}
                className="flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors hover:border-foreground/40 data-[active=true]:border-foreground"
                data-active={selectedIndex === index}
              >
                <img
                  src={image}
                  alt={`${alt} ${index + 1}`}
                  className="h-20 w-32 object-cover"
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
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 z-10 bg-background/80 backdrop-blur-sm"
                onClick={showPrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}

            <AnimatePresence mode="wait">
              {selectedIndex !== null && (
                <motion.img
                  key={selectedIndex}
                  src={images[selectedIndex]}
                  alt={`${alt} ${selectedIndex + 1}`}
                  className="max-h-[80vh] rounded-lg object-contain"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>

            {images.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 z-10 bg-background/80 backdrop-blur-sm"
                onClick={showNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
