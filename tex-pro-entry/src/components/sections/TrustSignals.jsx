import { ShieldCheck, BadgeCheck, HardHat, Star, MapPin } from "lucide-react";

const CERTS = [
{ icon: ShieldCheck, t: "\xA0Insured", d: "Full coverage on every install and service call." },
{ icon: BadgeCheck, t: "", d: "" },
{ icon: HardHat, t: "OSHA-Compliant Crews", d: "Safety-programmed job sites and certified equipment opertor" },
{ icon: Star, t: "", d: "" }];


const AREAS = ["Tyler", "Longview", "Mineola", "Sulphur Springs", "Dallas–Fort Worth"];

export default function TrustSignals() {
  return (
    <section className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-monolith px-6 lg:px-10 grid lg:grid-cols-2 gap-10">
        {/* Testimonial */}
        <div className="bg-background border border-border rounded-lg p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="flex gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, i) =>
              <Star key={i} className="w-5 h-5 fill-accent" />
              )}
            </div>
            <blockquote className="mt-6 font-heading text-2xl lg:text-3xl text-foreground leading-tight text-balance">
              "A semi backs into our dock and bends a leveler at 2am. TexPro had a crew on site
              before sunrise and we were loading again by first shift. That is what reliable looks like."
            </blockquote>
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <div className="font-heading uppercase tracking-wide text-foreground">Marcus Delgado</div>
            <div className="font-mono-tech text-[11px] text-muted-foreground">Operations Manager · Lone Star Logistics</div>
          </div>
        </div>

        {/* Certs + service areas */}
        <div className="flex flex-col gap-8">
          <div>
            <span className="font-mono-tech text-xs text-accent">/ Credentials</span>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl text-foreground">
              Trusted on job sites across Texas
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {CERTS.map((c) =>
            <div key={c.t} className="flex gap-4">
                <c.icon className="w-7 h-7 text-accent shrink-0 mt-0.5 hidden" />
                <div>
                  <div className="font-heading uppercase tracking-wide text-sm text-foreground">{c.t}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{c.d}</div>
                </div>
              </div>
            )}
          </div>
          <div className="pt-2">
            <div className="flex items-center gap-2 font-mono-tech text-xs text-accent mb-3">
              <MapPin className="w-4 h-4" /> Service areas
            </div>
            <div className="flex flex-wrap gap-2">
              {AREAS.map((a) =>
              <span key={a} className="font-mono-tech text-[11px] text-foreground bg-background border border-border rounded-sm px-3 py-1.5">
                  {a}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}