import { useEffect, useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";
import { X, ChevronLeft, ChevronRight, Film, ChevronDown } from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const CATEGORIES = ["All", "Residential", "Commercial", "Gates", "Storage Facilities", "Metal Buildings"];
const VIDEO_INITIAL = 6;

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [videoLimit, setVideoLimit] = useState(VIDEO_INITIAL);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [imgs, vids] = await Promise.all([
      base44.entities.GalleryPhoto.list("-created_date", 200).catch(() => []),
      base44.entities.GalleryVideo.list("-created_date", 200).catch(() => [])]
      );
      // Dedupe by imageUrl to keep the gallery clean
      const seen = new Set();
      setImages((imgs || []).
      filter((i) => {
        if (!i.imageUrl || seen.has(i.imageUrl)) return false;
        seen.add(i.imageUrl);
        return true;
      }).
      sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)));
      const vSeen = new Set();
      setVideos((vids || []).filter((v) => {
        if (!v.video_url || vSeen.has(v.video_url)) return false;
        vSeen.add(v.video_url);
        return true;
      }));
    } catch {
      setImages([]);setVideos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {load();}, [load]);

  // Live-sync when the admin manager changes categories/order
  useEffect(() => {
    const unsubscribe = base44.entities.GalleryPhoto.subscribe((event) => {
      setImages((prev) => {
        if (event.type === "create" && event.data?.imageUrl) {
          return [...prev, event.data].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
        }
        if (event.type === "update" && event.data?.id) {
          return prev.map((p) => p.id === event.data.id ? { ...p, ...event.data } : p);
        }
        if (event.type === "delete" && event.id) {
          return prev.filter((p) => p.id !== event.id);
        }
        return prev;
      });
    });
    return unsubscribe;
  }, []);

  const visiblePhotos = filter === "All" ? images : images.filter((i) => i.category === filter);
  const visibleVideos = filter === "All" ? videos : videos.filter((v) => v.category === filter);
  const featuredVideos = visibleVideos.slice(0, videoLimit);
  const hasMoreVideos = visibleVideos.length > videoLimit;

  const next = () => setLightbox((i) => i === null ? i : (i + 1) % visiblePhotos.length);
  const prev = () => setLightbox((i) => i === null ? i : (i - 1 + visiblePhotos.length) % visiblePhotos.length);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, visiblePhotos.length]);

  return (
    <>
      <SiteHeader />
      <main>
        {/* Page hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="mx-auto max-w-monolith px-6 lg:px-10">
            <span className="font-mono-tech text-xs text-accent">/ Our Work</span>
            <h1 className="mt-4 font-heading font-extrabold text-4xl sm:text-6xl text-balance max-w-2xl">Our work.</h1>
            <p className="mt-4 max-w-xl text-primary-foreground/70">Real photos and installs from TexPro projects across the area.

            </p>
          </div>
        </section>

        {/* Category filter (covers both sections) */}
        <section className="border-b border-border sticky top-20 bg-background/85 backdrop-blur z-30">
          <div className="mx-auto max-w-monolith px-6 lg:px-10 flex gap-2 overflow-x-auto no-scrollbar py-4">
            {CATEGORIES.map((c) =>
            <button
              key={c}
              onClick={() => {setFilter(c);setLightbox(null);setVideoLimit(VIDEO_INITIAL);}}
              className={`px-4 h-10 font-mono-tech text-[11px] whitespace-nowrap border transition-colors ${filter === c ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-primary"}`}>
              
                {c}
              </button>
            )}
          </div>
        </section>

        {/* PHOTO GALLERY — stills only */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-monolith px-6 lg:px-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono-tech text-xs text-accent">/ Photos</span>
              <h2 className="font-heading font-bold text-2xl text-primary">Installation Gallery</h2>
            </div>
            {loading ?
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) =>
              <div key={i} className="h-72 bg-secondary animate-pulse" />
              )}
              </div> :
            visiblePhotos.length === 0 ?
            <div className="text-center py-24 border border-dashed border-border">
                <p className="font-heading font-bold text-2xl text-primary">No photos yet</p>
                <p className="mt-2 text-muted-foreground max-w-md mx-auto">Installation photos will appear here once published.</p>
              </div> :

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                {visiblePhotos.map((img, idx) =>
              <button
                key={img.id}
                onClick={() => setLightbox(idx)}
                className="mb-4 block w-full break-inside-avoid group relative overflow-hidden bg-secondary text-left">
                
                    <Image src={img.imageUrl} alt="" fittingType="fill" className="w-full transition-transform duration-700 group-hover:scale-105" />
                  </button>
              )}
              </div>
            }
          </div>
        </section>

        {/* VIDEO SHOWCASE — clips only */}
        <section className="py-16 bg-secondary/40 border-t border-border">
          <div className="mx-auto max-w-monolith px-6 lg:px-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono-tech text-xs text-accent">/ Video</span>
              <h2 className="font-heading font-bold text-2xl text-primary">See Our Installs in Action</h2>
            </div>
            {loading ?
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 3 }).map((_, i) =>
              <div key={i} className="aspect-video bg-secondary animate-pulse" />
              )}
              </div> :
            featuredVideos.length === 0 ?
            <div className="text-center py-20 border border-dashed border-border bg-background">
                <Film className="w-8 h-8 mx-auto text-muted-foreground" />
                <p className="mt-3 font-heading font-bold text-xl text-primary">No project videos yet</p>
                <p className="mt-2 text-muted-foreground max-w-md mx-auto">Install and demo videos will appear here once published.</p>
              </div> :

            <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {featuredVideos.map((v) =>
                <div key={v.id} className="bg-background border border-border overflow-hidden group">
                      <div className="relative aspect-video bg-primary">
                        <video
                      src={v.video_url}
                      poster={v.thumbnail_url || undefined}
                      controls
                      preload="metadata"
                      className="w-full h-full object-cover" />
                    
                      </div>
                      <div className="p-4">
                        <div className="font-mono-tech text-[10px] text-accent">{v.category}{v.year ? ` · ${v.year}` : ""}</div>
                        <div className="font-heading font-bold text-primary">{v.title}</div>
                        {v.location && <div className="text-xs text-muted-foreground">{v.location}</div>}
                        {v.description && <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{v.description}</p>}
                      </div>
                    </div>
                )}
                </div>
                {hasMoreVideos &&
              <div className="mt-8 text-center">
                    <button
                  onClick={() => setVideoLimit((n) => n + 6)}
                  className="inline-flex items-center gap-2 h-12 px-6 border-2 border-primary text-primary font-mono-tech text-xs hover:border-accent hover:text-accent transition-colors">
                  
                      See more videos <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
              }
              </>
            }
          </div>
        </section>
      </main>

      {/* Photo lightbox */}
      {lightbox !== null && visiblePhotos[lightbox] &&
      <div className="fixed inset-0 z-[60] bg-primary/95 backdrop-blur-sm items-center flex" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} aria-label="Close" className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-primary-foreground hover:text-accent">
            <X className="w-7 h-7" />
          </button>
          <button onClick={(e) => {e.stopPropagation();prev();}} aria-label="Previous" className="absolute left-4 w-12 h-12 flex items-center justify-center text-primary-foreground hover:text-accent">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button onClick={(e) => {e.stopPropagation();next();}} aria-label="Next" className="absolute right-4 w-12 h-12 flex items-center justify-center text-primary-foreground hover:text-accent">
            <ChevronRight className="w-8 h-8" />
          </button>
          <figure className="max-w-5xl w-full mx-6" onClick={(e) => e.stopPropagation()}>
            <Image src={visiblePhotos[lightbox].imageUrl} alt="" fittingType="fit" className="w-full max-h-[78vh] object-contain" />
          </figure>
        </div>
      }

      <SiteFooter />
    </>);

}