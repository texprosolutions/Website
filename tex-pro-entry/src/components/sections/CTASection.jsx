import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative bg-accent text-accent-foreground overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-foreground/20" />
      <div className="relative mx-auto max-w-monolith px-6 lg:px-10 py-20 text-center">
        <span className="font-mono-tech text-xs text-accent-foreground/70">/ Get started</span>
        <h2 className="mt-4 font-heading text-4xl sm:text-6xl max-w-3xl mx-auto text-balance">
          Got a downed door or a new build on the books?
        </h2>
        <p className="mt-5 max-w-xl mx-auto text-accent-foreground/80">Tell us what you're building or repairing. We'll bring the crew, the hardware and the know-how.

        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 h-14 px-8 bg-foreground text-background font-heading uppercase tracking-wide text-base hover:bg-steel transition-colors active:animate-latch">
            
            Get a Free Quote <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="tel:+19035041803"
            className="inline-flex items-center gap-2 h-14 px-8 border-2 border-accent-foreground/40 font-heading uppercase tracking-wide text-base hover:border-foreground transition-colors">
            
            Call (903) 504-1803
          </a>
        </div>
      </div>
    </section>);

}