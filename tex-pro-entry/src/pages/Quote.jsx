import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import QuoteForm from "@/components/sections/QuoteForm";
import { Phone, Mail, ShieldCheck } from "lucide-react";

export default function Quote() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-primary text-primary-foreground py-20">
          <div className="mx-auto max-w-monolith px-6 lg:px-10">
            <span className="font-mono-tech text-xs text-accent">/ Quote Portal</span>
            <h1 className="mt-4 font-heading font-extrabold text-4xl sm:text-6xl text-balance max-w-2xl">
              Request a quote.
            </h1>
            <p className="mt-4 max-w-lg text-primary-foreground/70">
              Two quick steps. Tell us what you're securing and we'll handle the rest within one business day.
            </p>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="mx-auto max-w-monolith px-6 lg:px-10 grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <QuoteForm />
            </div>
            <aside className="space-y-6">
              <div className="bg-background border border-border p-6">
                <h3 className="font-mono-tech text-xs text-accent mb-4">Prefer to talk?</h3>
                <div className="space-y-4 text-sm text-primary">
                  <a href="tel:+19035041803" className="flex items-center gap-3 hover:text-accent">
                    <Phone className="w-4 h-4 text-accent" /> (903) 504-1803
                  </a>
                  <a href="mailto:texprosoffice@gmail.com" className="flex items-center gap-3 hover:text-accent">
                    <Mail className="w-4 h-4 text-accent" /> texprosoffice@gmail.com
                  </a>
                </div>
              </div>
              <div className="bg-background border border-border p-6">
                <h3 className="font-mono-tech text-xs text-accent mb-4">Service hours</h3>
                <ul className="space-y-2 text-sm text-primary">
                  <li className="flex justify-between"><span className="text-muted-foreground">Mon–Fri</span> 8am–5pm</li>
                  <li className="flex justify-between"><span className="text-muted-foreground">Sat & Sun</span> Closed</li>
                  <li className="flex justify-between"><span className="text-muted-foreground">Emergency</span> Available</li>
                </ul>
              </div>
              <div className="bg-primary text-primary-foreground p-6">
                <ShieldCheck className="w-6 h-6 text-accent" />
                <p className="mt-3 text-sm text-primary-foreground/80">
                  Every quote is backed by our licensed, bonded, insured guarantee — no obligation, no pressure.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}