import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useGalleryPhotos } from "@/hooks/useGalleryPhotos";

const ROTATE_MS = 3500;

export default function RotatingHero() {
  const { photos, loading } = useGalleryPhotos();
  const [index, setIndex] = useState(0);

  // Keep index in range as the photo set grows or shrinks
  useEffect(() => {
    if (photos.length === 0) {setIndex(0);return;}
    setIndex((i) => i % photos.length);
  }, [photos.length]);

  // Auto-rotate
  useEffect(() => {
    if (photos.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, [photos.length]);

  const active = photos.length ? photos[index % photos.length] : null;

  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden min-h-[86vh] flex flex-col justify-center">
      {/* Rotating photo backdrop */}
      <div className="absolute inset-0">
        {!loading && active &&
        <AnimatePresence initial={false}>
            <motion.div
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0">
            
              <Image src={active.imageUrl} alt="" fittingType="fill" className="w-full h-full object-cover" />
            </motion.div>
          </AnimatePresence>
        }
        <div className="absolute inset-0 bg-gradient-to-br from-primary/92 via-primary/80 to-primary/60" />
      </div>

      {/* Red accent seam */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent z-10" />

      <div className="relative mx-auto max-w-monolith px-6 lg:px-10 py-24 w-full z-10">
        <span className="font-mono-tech text-accent text-4xl">TexPro Solutions · Serving East Texas · Since 2023</span>

        <h1 className="mt-5 font-heading text-5xl sm:text-7xl lg:text-8xl text-balance">
          <span className="block">Doors & Docks</span>
          <span className="block text-accent">Built to Perform</span>
        </h1>

        <p className="mt-6 max-w-xl text-primary-foreground/75 leading-relaxed [font-family:'Oswald',_ui-sans-serif,_system-ui,_sans-serif] text-xl">Commercial overhead doors, loading docks, gates and metal-building systems. Installed, serviced and emergency repairs across Texas.

        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 h-14 px-8 bg-accent text-accent-foreground font-heading uppercase tracking-wide text-base hover:brightness-110 transition active:animate-latch">
            
            Get a Free Quote <ArrowUpRight className="w-5 h-5" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 h-14 px-8 border-2 border-primary-foreground/30 text-primary-foreground font-heading uppercase tracking-wide text-base hover:border-accent hover:text-accent transition-colors">
            
            Schedule Service
          </Link>
        </div>

        {/* Rotating category indicator */}
        {active &&
        <div className="mt-16 pt-6 border-t border-primary-foreground/15 flex items-center gap-3 max-w-xl">
            <span className="font-mono-tech text-primary-foreground/60 text-xl">Now showing</span>
            <span className="inline-flex items-center gap-2 bg-foreground/10 border border-accent/40 px-3 py-1.5 font-mono-tech text-primary-foreground text-xl">
              <span className="w-2 h-2 bg-accent" /> {active.category}
            </span>
            {photos.length > 1 &&
          <span className="font-mono-tech text-xl text-[hsl(var(--background))]">
                {index % photos.length + 1} / {photos.length}
              </span>
          }
          </div>
        }
      </div>
    </section>);

}