import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck, HardHat, Clock } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { Image } from "@/components/ui/image";

export default function Hero() {
  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.heroLoadingDock}
          alt="Commercial loading dock with semis at a facility"
          fittingType="fill"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />
      </div>

      {/* Orange seam */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

      <div className="relative mx-auto max-w-monolith px-6 lg:px-10 min-h-[90vh] flex flex-col justify-center py-24">
        <span className="font-mono-tech text-xs text-accent">
          TexPro Solutions · Dallas, TX · Since 2023
        </span>

        <h1 className="mt-5 font-heading text-5xl sm:text-7xl lg:text-8xl text-balance">
          <span className="block">Doors & Docks</span>
          <span className="block text-accent">Built to Perform</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-primary-foreground/75 leading-relaxed">
          Commercial overhead doors, loading docks and entry systems — installed,
          serviced and emergency-repaired across the Texas Triangle. Built to run.
          Built to last.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 h-14 px-8 bg-accent text-accent-foreground font-heading uppercase tracking-wide text-base hover:brightness-110 transition active:animate-latch"
          >
            Get a Free Quote <ArrowUpRight className="w-5 h-5" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 h-14 px-8 border-2 border-primary-foreground/30 text-primary-foreground font-heading uppercase tracking-wide text-base hover:border-accent hover:text-accent transition-colors"
          >
            Schedule Service
          </Link>
        </div>

        {/* Credibility strip */}
        <div className="mt-16 pt-6 border-t border-primary-foreground/15 grid sm:grid-cols-3 gap-6 max-w-3xl">
          {[
            { icon: ShieldCheck, t: "Fully Insured" },
            { icon: HardHat, t: "Factory-Trained Technicians" },
            { icon: Clock, t: "Emergency Response" },
          ].map((x) => (
            <div key={x.t} className="flex items-center gap-3">
              <x.icon className="w-6 h-6 text-accent shrink-0" />
              <span className="font-mono-tech text-[11px] text-primary-foreground/70">{x.t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}