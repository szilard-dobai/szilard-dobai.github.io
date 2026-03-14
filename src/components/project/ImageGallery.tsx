import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

function Lightbox({
  images,
  alt,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  alt: string;
  selectedIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        className="cursor-pointer absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close lightbox"
      >
        <X className="h-5 w-5" />
      </button>

      {images.length > 1 && (
        <button
          className="cursor-pointer absolute left-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      <AnimatePresence mode="wait">
        <motion.img
          key={selectedIndex}
          src={images[selectedIndex]}
          alt={`${alt} ${selectedIndex + 1}`}
          className="max-h-[90vh] max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-4rem)] rounded-xl object-contain"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <button
          className="cursor-pointer absolute right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </motion.div>
  );
}

type ImageGalleryProps = {
  images: string[];
  alt: string;
};

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const showPrev = () =>
    setSelectedIndex((i) =>
      i !== null ? (i - 1 + images.length) % images.length : null
    );
  const showNext = () =>
    setSelectedIndex((i) => (i !== null ? (i + 1) % images.length : null));

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
                className="cursor-pointer shrink-0 overflow-hidden rounded-lg border-2 border-border transition-all hover:border-primary/50 data-[active=true]:border-primary"
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

      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox
            images={images}
            alt={alt}
            selectedIndex={selectedIndex}
            onClose={() => setSelectedIndex(null)}
            onPrev={showPrev}
            onNext={showNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}
