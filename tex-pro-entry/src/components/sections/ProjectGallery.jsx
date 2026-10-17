import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/images";
import { Image } from "@/components/ui/image";

export default function ProjectGallery({ compact = false }) {
  const scroller = useRef(null);
  const projects = compact ? PROJECTS.slice(0, 3) : PROJECTS;

  const scroll = (dir) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * 420, behavior: "smooth" });
  };

  return (
    <section className="bg-primary text-primary-foreground py-20 lg:py-28">
      <div className="mx-auto max-w-monolith px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="font-mono-tech text-xs text-accent">/ Project ledger</span>
            <h2 className="mt-3 font-heading text-4xl sm:text-5xl text-primary-foreground text-balance">
              Proof, in steel & concrete.
            </h2>
          </div>
          {compact && (
            <Link to="/gallery" className="font-heading uppercase tracking-wide text-sm text-accent hover:gap-2 inline-flex items-center gap-1 transition-all">
              View gallery →
            </Link>
          )}
          {!compact && (
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll(-1)} aria-label="Previous" className="w-12 h-12 border border-primary-foreground/25 hover:border-accent hover:text-accent flex items-center justify-center transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scroll(1)} aria-label="Next" className="w-12 h-12 border border-primary-foreground/25 hover:border-accent hover:text-accent flex items-center justify-center transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div ref={scroller} className="overflow-x-auto no-scrollbar pb-6">
        <div className="flex gap-6 px-6 lg:px-10 mx-auto max-w-monolith">
          {projects.map((p) => (
            <article key={p.id} className="relative shrink-0 w-[340px] sm:w-[380px] bg-background text-foreground border border-border rounded-lg overflow-hidden group">
              <div className="relative h-[260px] overflow-hidden">
                <Image src={p.image} alt={p.title} fittingType="fill" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />
                <span className="absolute top-4 left-4 font-mono-tech text-[10px] text-accent-foreground bg-accent px-2.5 py-1 rounded-sm">
                  {p.type}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl text-foreground">{p.title}</h3>
                <div className="mt-1 font-mono-tech text-[10px] text-muted-foreground">{p.location}</div>
                <ul className="mt-4 space-y-1.5">
                  {p.specs.map((sp) => (
                    <li key={sp} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full" /> {sp}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}