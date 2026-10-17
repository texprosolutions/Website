import { ShieldCheck, HardHat, Clock } from "lucide-react";

const CRED = [
{ icon: ShieldCheck, t: "Fully Insured" },
{ icon: HardHat, t: "Trained Technicians" },
{ icon: Clock, t: "Emergency Response" }];


export default function AboutSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-monolith px-6 lg:px-10 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <span className="font-mono-tech text-xs text-accent">/ Who we are</span>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl text-primary">Built for the way Texas works.</h2>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <p className="text-lg text-foreground/85 leading-relaxed">TexPro Solutions installs, services and emergency-repairs overhead doors, loading docks and gates for homes, warehouses and secured facilities. From a single residential garage door to a multi-door distribution center, every job gets the same crew, hardware and accountability.

          </p>
          <div className="grid sm:grid-cols-3 gap-6 pt-2 border-t border-border">
            {CRED.map((x) =>
            <div key={x.t} className="flex items-center gap-3 pt-6">
                <x.icon className="w-6 h-6 text-accent shrink-0" />
                <span className="font-mono-tech text-[11px] text-foreground">{x.t}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}