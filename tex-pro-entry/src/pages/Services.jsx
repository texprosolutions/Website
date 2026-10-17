import { useMemo } from "react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import CTASection from "@/components/sections/CTASection";
import { SERVICES } from "@/lib/images";
import { Image } from "@/components/ui/image";
import { Check } from "lucide-react";
import { useGalleryPhotos } from "@/hooks/useGalleryPhotos";

// Map each Services-page service to its closest GalleryPhoto category.
// Each service pulls a distinct real TexPro project photo from that category.
const CAT_MAP = {
  "overhead-door": "Commercial",
  "loading-dock": "Commercial",
  "gates": "Gates",
  "residential": "Residential",
};

// User-selected real project photo overrides (per slug). These take priority
// over the auto-selected GalleryPhoto image.
const PHOTO_OVERRIDE = {
  "overhead-door":
    "https://base44.app/api/apps/6a89b8b2ea1c2593fbb473b8/files/mp/public/6a89b8b2ea1c2593fbb473b8/38cef8a2a_322558e0a_IMG_1425.jpg",
  "residential":
    "https://base44.app/api/apps/6a89b8b2ea1c2593fbb473b8/files/mp/public/6a89b8b2ea1c2593fbb473b8/a044a84e3_11e43c3f3_IMG_2482.jpg",
  "loading-dock":
    "https://base44.app/api/apps/6a89b8b2ea1c2593fbb473b8/files/mp/public/6a89b8b2ea1c2593fbb473b8/922cf2b7a_dock_leveler.jpg",
};

export default function Services() {
  const { photos, loading } = useGalleryPhotos();

  const byCat = useMemo(() => {
    const m = {};
    for (const p of photos) (m[p.category] ||= []).push(p);
    return m;
  }, [photos]);

  // Assign a distinct photo per service (rotates through the category's photos
  // so two services sharing a category don't show the same image).
  const assigned = useMemo(() => {
    const counters = {};
    const out = {};
    for (const s of SERVICES) {
      const cat = CAT_MAP[s.slug];
      const list = byCat[cat] || [];
      const idx = list.length ? (counters[cat] || 0) % list.length : 0;
      counters[cat] = (counters[cat] || 0) + 1;
      out[s.slug] = list[idx];
    }
    return out;
  }, [byCat]);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-primary text-primary-foreground py-24">
          <div className="mx-auto max-w-monolith px-6 lg:px-10">
            <span className="font-mono-tech text-xs text-accent">/ Capabilities</span>
            <h1 className="mt-4 font-heading font-extrabold text-5xl sm:text-7xl text-balance max-w-3xl">
              Services engineered for every door and dock.
            </h1>
          </div>
        </section>

        {SERVICES.map((s, i) => {
          const photo = PHOTO_OVERRIDE[s.slug] ? { imageUrl: PHOTO_OVERRIDE[s.slug] } : assigned[s.slug];
          return (
            <section key={s.slug} className={`py-24 ${i % 2 ? "bg-secondary/30" : "bg-background"}`}>
              <div className="mx-auto max-w-monolith px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className={`relative h-[420px] ${i % 2 ? "lg:order-2" : ""}`}>
                  {photo ? (
                    <Image
                      src={photo.imageUrl}
                      alt={`${s.title} project by TexPro Solutions`}
                      fittingType={["overhead-door", "residential", "loading-dock"].includes(s.slug) ? "fit" : "fill"}
                      className={`w-full h-full ${["overhead-door", "residential", "loading-dock"].includes(s.slug) ? "object-contain bg-secondary" : "object-cover"}`}
                    />
                  ) : loading ? (
                    <div className="w-full h-full bg-secondary animate-pulse" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center border border-dashed border-border bg-secondary">
                      <span className="font-mono-tech text-[10px] text-muted-foreground">No {s.title.toLowerCase()} project photo yet</span>
                    </div>
                  )}
                  <span className="absolute top-4 left-4 font-mono-tech text-[10px] text-primary-foreground bg-accent px-2 py-1">{s.tag}</span>
                </div>
                <div className={i % 2 ? "lg:order-1" : ""}>
                  <span className="font-mono-tech text-xs text-accent">0{i + 1}</span>
                  <h2 className="mt-3 font-heading font-extrabold text-3xl sm:text-4xl text-primary">{s.title}</h2>
                  <p className="mt-4 text-muted-foreground">{s.summary}</p>
                  <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-sm text-primary">
                        <span className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-accent" />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          );
        })}

        <CTASection />
      </main>
      <SiteFooter />
    </>
  );
}