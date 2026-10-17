import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import QuoteForm from "@/components/sections/QuoteForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-primary text-primary-foreground py-20">
          <div className="mx-auto max-w-monolith px-6 lg:px-10">
            <span className="font-mono-tech text-xs text-accent">/ Contact</span>
            <h1 className="mt-4 font-heading font-extrabold text-4xl sm:text-6xl text-balance max-w-2xl">
              Let's talk service.
            </h1>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="mx-auto max-w-monolith px-6 lg:px-10 grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading font-bold text-2xl text-primary">Reach the team</h2>
              <p className="mt-2 text-muted-foreground">Fully insured. Mon–Fri · 8am–5pm. Weekends reserved for emergency calls.</p>
              <div className="mt-8 space-y-6">
                <ContactRow icon={Phone} label="Phone" value="(903) 504-1803" href="tel:+19035041803" />
                <ContactRow icon={Mail} label="Email" value="texprosoffice@gmail.com" href="mailto:texprosoffice@gmail.com" />
                <ContactRow icon={MapPin} label="Service area" value="East Texas & beyond" />
                <ContactRow icon={Clock} label="Hours" value="Mon–Fri 8am–5pm · Sat & Sun Closed (emergencies 24/7)" />
              </div>
            </div>

            <div>
              <QuoteForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function ContactRow({ icon: Icon, label, value, href }) {
  const inner = (
    <div className="flex items-start gap-4 py-4 border-b border-border group">
      <div className="w-10 h-10 bg-accent/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <div>
        <div className="font-mono-tech text-[10px] text-muted-foreground">{label}</div>
        <div className={`font-heading font-bold text-primary ${href ? "group-hover:text-accent" : ""}`}>{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}