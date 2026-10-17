import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Construction, DoorOpen, Truck, Fence, Home, Check } from "lucide-react";
import { SERVICES } from "@/lib/images";
import { Image } from "@/components/ui/image";

const ICONS = {
  "overhead-door": DoorOpen,
  "loading-dock": Truck,
  gates: Fence,
  residential: Home,
};

function Badge({ slug }) {
  const Icon = ICONS[slug] ?? DoorOpen;
  return (
    <span className="inline-flex items-center justify-center w-11 h-11 bg-accent text-accent-foreground rounded-sm shrink-0">
      <Icon className="w-6 h-6" />
    </span>
  );
}

export default function ServiceMatrix({ preview = false }) {
  const items = SERVICES;
  const [featured, ...rest] = items;

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-monolith px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="font-mono-tech text-xs text-accent">/ What we build</span>
            <h2 className="mt-3 font-heading text-4xl sm:text-5xl text-foreground text-balance">
              Four disciplines. One crew.
            </h2>
          </div>
          {!preview && (
            <Link to="/quote" className="hidden md:inline-flex font-heading uppercase tracking-wide text-sm text-foreground hover:text-accent transition-colors">
              Get a quote →
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Featured */}
          <Link
            to="/services"
            className="group md:col-span-2 grid md:grid-cols-2 bg-white border border-border border-t-4 border-t-accent rounded-lg overflow-hidden hover:border-accent transition-colors"
          >
            <div className="relative min-h-[240px] md:min-h-full overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fittingType="fill"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-primary/80 via-primary/30 to-transparent" />
              <span className="absolute top-4 left-4 font-mono-tech text-[11px] text-accent-foreground bg-accent px-2.5 py-1 rounded-sm">
                01
              </span>
            </div>
            <div className="p-8 flex flex-col">
              <Badge slug={featured.slug} />
              <h3 className="mt-5 font-heading text-3xl text-foreground">{featured.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{featured.summary}</p>
              <ul className="mt-5 grid grid-cols-2 gap-y-2 gap-x-3">
                {featured.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /> {p}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-1 font-heading uppercase tracking-wide text-sm text-accent group-hover:gap-2 transition-all">
                Explore service <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Standard cards */}
          {rest.map((s, i) => (
            <Link
              key={s.slug}
              to="/services"
              className="group bg-white border border-border border-t-4 border-t-accent rounded-lg overflow-hidden flex flex-col hover:border-accent transition-colors"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fittingType="fill"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                <span className="absolute top-3 left-3 font-mono-tech text-[10px] text-accent-foreground bg-accent px-2 py-0.5 rounded-sm">
                  0{i + 2}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <Badge slug={s.slug} />
                <h3 className="mt-4 font-heading text-2xl text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{s.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1 font-heading uppercase tracking-wide text-sm text-accent group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}

          {/* Custom-build CTA tile */}
          <Link
            to="/quote"
            className="group bg-primary text-primary-foreground rounded-lg p-7 flex flex-col justify-between hover:bg-steel transition-colors"
          >
            <Construction className="w-8 h-8 text-accent" />
            <div>
              <h3 className="mt-6 font-heading text-2xl text-primary-foreground">
                Don't see your scope?
              </h3>
              <p className="mt-2 text-sm text-primary-foreground/70">
                We handle custom builds, retrofits and multi-site rollouts. Tell us what you need.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 font-heading uppercase tracking-wide text-sm text-accent group-hover:gap-2 transition-all">
              Start a quote <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}