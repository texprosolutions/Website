import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useGalleryPhotos } from "@/hooks/useGalleryPhotos";

// User-designated featured photo per category (takes priority over auto-selected).
const FEATURED_OVERRIDE = {
  Residential:
    "https://base44.app/api/apps/6a89b8b2ea1c2593fbb473b8/files/mp/public/6a89b8b2ea1c2593fbb473b8/a044a84e3_11e43c3f3_IMG_2482.jpg",
  "Metal Buildings":
    "https://base44.app/api/apps/6a89b8b2ea1c2593fbb473b8/files/mp/public/6a89b8b2ea1c2593fbb473b8/9983f21bc_1417d16c5_IMG_7347.jpg",
};

const CATEGORIES = [
{
  key: "Residential",
  title: "Residential",
  desc: "Garage doors and home entry systems tuned for curb appeal, quiet operation and security."
},
{
  key: "Commercial",
  title: "Commercial",
  desc: "Sectional and rolling-steel doors, loading docks and high-cycle hardware that keep freight and facilities moving through every shift."
},
{
  key: "Gates",
  title: "Gates",
  desc: "Automatic gates, barrier arms and access control for driveways, facilities and secured lots. Installed, serviced and upgraded for reliable entry."
},
{
  key: "Storage Facilities",
  title: "Storage Facilities",
  desc: "Roll-up doors and secure access systems engineered for self-storage sites, climate-controlled units and high-traffic facilities."
},
{
  key: "Metal Buildings",
  title: "Metal Buildings",
  desc: "Doors, hardware and access systems for metal shops, pole barns and custom steel buildings. These doors are built to take heavy use and Texas weather."
}];


export default function CategoryShowcase() {
  const { photos, loading } = useGalleryPhotos();
  const featuredFor = (key) => {
    if (FEATURED_OVERRIDE[key]) return { imageUrl: FEATURED_OVERRIDE[key], _override: true };
    return photos.find((p) => p.category === key);
  };

  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-monolith">
        {CATEGORIES.map((c, i) => {
          const featured = featuredFor(c.key);
          const flip = i % 2 === 1;
          return (
            <div
              key={c.key}
              className="grid lg:grid-cols-2 gap-0 border-b border-border last:border-b-0">
              
              <div className={`relative bg-background ${flip ? "lg:order-2" : ""}`}>
                <div className="aspect-[4/3] w-full bg-secondary">
                  {loading ?
                  <div className="w-full h-full animate-pulse bg-secondary" /> :
                  featured ?
                  <Image
                    src={featured.imageUrl}
                    alt={`${c.title} installation by TexPro Solutions`}
                    fittingType={featured._override ? "fit" : "fill"}
                    className={`w-full h-full ${featured._override ? "object-contain bg-secondary" : "object-cover"}`} /> :


                  <div className="w-full h-full flex items-center justify-center border border-dashed border-border">
                      <span className="font-mono-tech text-[10px] text-muted-foreground">No {c.title.toLowerCase()} photo yet</span>
                    </div>
                  }
                </div>
              </div>

              <div className={`p-8 lg:p-14 flex flex-col justify-center bg-background ${flip ? "lg:order-1" : ""}`}>
                <span className="font-mono-tech text-xs text-accent">
                  / {String(i + 1).padStart(2, "0")} · {c.title}
                </span>
                <h3 className="mt-3 font-heading text-3xl sm:text-4xl text-primary">{c.title}</h3>
                <p className="mt-4 text-foreground/75 max-w-md leading-relaxed">{c.desc}</p>
                <Link
                  to="/gallery"
                  className="mt-6 inline-flex items-center gap-2 font-mono-tech text-xs text-accent hover:underline self-start">
                  
                  View {c.title} gallery <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>);

        })}
      </div>
    </section>);

}