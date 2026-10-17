import { useState } from "react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import EmergencyForm from "@/components/sections/EmergencyForm";
import { Phone, Mail, Clock, AlertTriangle, DoorOpen, Truck, Fence, Wrench, ArrowRight } from "lucide-react";

const PHONE_DISPLAY = "(903) 504-1803";
const PHONE_HREF = "tel:+19035041803";
const EMAIL = "texprosoffice@gmail.com";

const EMERGENCIES = [
{ icon: DoorOpen, title: "Door stuck open or closed", desc: "Overhead or sectional door won't close, leaving property exposed — or won't open, halting operations." },
{ icon: Truck, title: "Dock equipment failure", desc: "Leveler won't raise, vehicle restraint released, dock seal damaged — freight can't load or unload." },
{ icon: Fence, title: "Gate operator malfunction", desc: "Automatic gate or barrier arm unresponsive, stuck mid-cycle or failing to secure the entry." },
{ icon: Wrench, title: "Broken springs & hardware", desc: "Snapped torsion or extension springs, broken cables, off-track panels — stop using the door immediately." }];


export default function Emergency() {
  const [report, setReport] = useState("");

  const startReport = (e) => {
    setReport(`${e.title} — ${e.desc}`);
    document.getElementById("emergency-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative bg-primary text-primary-foreground py-24 sm:py-32 border-b-4 border-accent">
          <div className="mx-auto max-w-monolith px-6 lg:px-10">
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 font-mono-tech text-xs">
              <AlertTriangle className="w-4 h-4" /> EMERGENCY SERVICE
            </div>
            <h1 className="mt-6 font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-balance max-w-3xl">
              Downed door or dock? We're rolling now.
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/80 max-w-xl leading-relaxed">Broken overhead door, dock that won't lock, gate that won't close? Call the TexPro emergency line. Dispatched across East Texas.

            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-3 h-16 px-8 sm:px-10 bg-accent text-accent-foreground font-heading uppercase tracking-wide text-lg hover:brightness-110 transition active:animate-latch">
                
                <Phone className="w-6 h-6" /> Call Now · {PHONE_DISPLAY}
              </a>
              <span className="font-mono-tech text-xs text-primary-foreground/60 text-center sm:text-left">
                Fastest response — a real person answers.
              </span>
            </div>
          </div>
        </section>

        {/* Contact strip */}
        <section className="bg-secondary border-b border-border">
          <div className="mx-auto max-w-monolith px-6 lg:px-10 py-8 grid sm:grid-cols-3 gap-6">
            <InfoTile icon={Phone} label="Emergency Line" value={PHONE_DISPLAY} href={PHONE_HREF} accent />
            <InfoTile icon={Mail} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
            <InfoTile icon={Clock} label="Dispatch Hours" value="Emergency Dispatch" />
          </div>
        </section>

        {/* What counts as an emergency */}
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-monolith px-6 lg:px-10">
            <span className="font-mono-tech text-xs text-accent">/ When to call</span>
            <h2 className="mt-3 font-heading font-bold text-3xl sm:text-4xl text-primary max-w-2xl">
              What counts as an emergency
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              If your facility or property is exposed, operations are stopped or safety is at risk — it's an emergency. Call first; a technician will triage over the phone.
            </p>

            <div className="mt-12 grid sm:grid-cols-2 gap-px bg-border border border-border">
              {EMERGENCIES.map((e) =>
              <button
                key={e.title}
                type="button"
                onClick={() => startReport(e)}
                className="group bg-background p-8 text-left flex flex-col hover:bg-accent/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 flex items-center justify-center shrink-0">
                      <e.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-primary">{e.title}</h3>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1 font-heading uppercase tracking-wide text-xs text-accent group-hover:gap-2 transition-all">
                    Report this <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              )}
            </div>

            <div className="mt-10 rounded-lg bg-primary text-primary-foreground p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
              <div>
                <h3 className="font-heading font-bold text-xl">Not sure if it's an emergency?</h3>
                <p className="mt-1 text-sm text-primary-foreground/80">Call anyway! We'll tell you. Better safe than exposed.</p>
              </div>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-accent text-accent-foreground font-heading uppercase tracking-wide text-sm hover:brightness-110 transition shrink-0">
                
                <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        {/* Form fallback */}
        <section id="emergency-form" className="py-20 bg-secondary scroll-mt-24">
          <div className="mx-auto max-w-monolith px-6 lg:px-10 grid lg:grid-cols-2 gap-12">
            <div>
              <span className="font-mono-tech text-xs text-accent">/ Can't talk right now</span>
              <h2 className="mt-3 font-heading font-bold text-3xl sm:text-4xl text-primary">
                Send an emergency report
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                If you can't call, submit the form below. Include as much detail as possible — the door type, what happened and whether the property is currently exposed.
              </p>
              <div className="mt-8 space-y-4 text-sm text-primary">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <p><span className="font-heading font-bold">Call for fastest response.</span> Form submissions are monitored continuously, but a phone call gets a crew moving immediately.</p>
                </div>
              </div>
            </div>
            <div>
              <EmergencyForm initialDetails={report} />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>);

}

function InfoTile({ icon: Icon, label, value, href, accent }) {
  const inner =
  <div className="flex items-center gap-4">
      <div className={`w-12 h-12 flex items-center justify-center shrink-0 ${accent ? "bg-accent text-accent-foreground" : "bg-accent/10"}`}>
        <Icon className={accent ? "w-6 h-6" : "w-6 h-6 text-accent"} />
      </div>
      <div>
        <div className="font-mono-tech text-[10px] text-muted-foreground">{label}</div>
        <div className={`font-heading font-bold text-primary ${href ? "hover:text-accent transition-colors" : ""}`}>{value}</div>
      </div>
    </div>;

  return href ? <a href={href}>{inner}</a> : inner;
}