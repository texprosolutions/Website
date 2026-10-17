import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import CTASection from "@/components/sections/CTASection";
import { ShieldCheck, Wrench, Clock } from "lucide-react";

export default function About() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-primary text-primary-foreground py-24">
          <div className="mx-auto max-w-monolith px-6 lg:px-10">
            <span className="font-mono-tech text-xs text-accent">/ About</span>
            <h1 className="mt-4 font-heading font-extrabold text-5xl sm:text-6xl text-balance max-w-3xl">About TexPro Solutions</h1>
            <p className="mt-4 max-w-2xl text-primary-foreground/70">Fully insured door, dock and gate specialists serving East Texas & beyond.</p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="mx-auto max-w-3xl px-6 lg:px-10 space-y-6 text-lg leading-relaxed text-foreground/80">
            <p>TexPro Solutions is a fully insured East Texas-based installer and service provider specializing in overhead doors, loading docks, gates, residential garage doors, storage facilities, and metal buildings. This website is the front door to that work — a place where commercial property managers, warehouse and distribution operators, retail tenants and homeowners across Tyler, Longview, Mineola, Sulphur Springs and the Dallas–Fort Worth metroplex can explore completed projects, request quotes and reach a live dispatcher for 24/7 emergency repair.






            </p>
            <p>
              Every project shown in our gallery is real TexPro fieldwork, organized by service category so visitors
              can quickly find the door, dock or gate system that matches their need. Quote requests route straight to
              our office team, and approved customers can sign in to the customer portal to manage quotes, track
              installations and review service records.
            </p>
            <p>
              The site is built and maintained by the TexPro Solutions team to make it straightforward to get expert
              help fast — and to keep your doors closing and your docks loading on schedule.
            </p>
          </div>
        </section>

        <section className="py-16 bg-secondary/30 border-t border-border">
          <div className="mx-auto max-w-3xl px-6 lg:px-10 grid sm:grid-cols-3 gap-8">
            <div>
              <ShieldCheck className="w-6 h-6 text-accent" />
              <h2 className="mt-3 font-heading text-lg">Fully Insured</h2>
              <p className="mt-1 text-sm text-muted-foreground">Licensed and insured installers standing behind every project.</p>
            </div>
            <div>
              <Wrench className="w-6 h-6 text-accent" />
              <h2 className="mt-3 font-heading text-lg">Full-Service</h2>
              <p className="mt-1 text-sm text-muted-foreground">Installation, repair and maintenance across doors, docks and gates.</p>
            </div>
            <div>
              <Clock className="w-6 h-6 text-accent" />
              <h2 className="mt-3 font-heading text-lg">Emergency Service</h2>
              <p className="mt-1 text-sm text-muted-foreground">Live dispatch for downed doors and docks.</p>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <SiteFooter />
    </>);

}