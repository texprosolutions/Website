import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, AlertTriangle } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const VERTEX_URL = "https://portal.texprosolutionsllc.com";
const SERVICE_AREAS = ["Tyler", "Longview", "Mineola", "Sulphur Springs", "Dallas–Fort Worth"];
const SERVICES = [
  { label: "Overhead Doors", to: "/services" },
  { label: "Loading Docks", to: "/services" },
  { label: "Gates", to: "/services" },
  { label: "Residential Garage Doors", to: "/services" },
  { label: "Emergency Repair", to: "/emergency" },
];

export default function SiteFooter() {
  const { user } = useAuth();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-monolith px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand + contact */}
        <div className="lg:col-span-1">
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-bold text-2xl uppercase tracking-tight">TexPro</span>
            <span className="font-mono-tech text-[10px] text-accent">Solutions</span>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/70 max-w-xs leading-relaxed">Commercial overhead doors, loading docks and entry systems engineered for the rhythm of commerce and the security of home.

          </p>
          <div className="mt-6 space-y-3 text-sm">
            <a href="tel:+19035041803" className="flex items-center gap-3 hover:text-accent transition-colors">
              <Phone className="w-4 h-4 text-accent" /> (903) 504-1803
            </a>
            <a href="mailto:texprosoffice@gmail.com" className="flex items-center gap-3 hover:text-accent transition-colors">
              <Mail className="w-4 h-4 text-accent" /> texprosoffice@gmail.com
            </a>
            <div className="flex items-center gap-3 text-primary-foreground/70">
              <MapPin className="w-4 h-4 text-accent" /> Serving East Texas & beyond
            </div>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-heading uppercase tracking-wide text-sm text-accent mb-5">Services</h3>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            {SERVICES.map((s) =>
            <li key={s.label}>
                <Link to={s.to} className="hover:text-accent transition-colors">{s.label}</Link>
              </li>
            )}
          </ul>
        </div>

        {/* Service areas */}
        <div>
          <h3 className="font-heading uppercase tracking-wide text-sm text-accent mb-5">Service Areas</h3>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            {SERVICE_AREAS.map((a) =>
            <li key={a} className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-accent/70" /> {a}
              </li>
            )}
          </ul>
        </div>

        {/* Hours + emergency */}
        <div>
          <h3 className="font-heading uppercase tracking-wide text-sm text-accent mb-5">Hours</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-accent/70" /> Mon–Fri · 8am–5pm</li>
            <li className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-accent/70" /> Sat & Sun · Closed (emergencies only)</li>
          </ul>
          <div className="mt-6 rounded-lg bg-foreground/10 border border-accent/30 p-4">
            <div className="flex items-center gap-2 font-heading uppercase tracking-wide text-sm text-accent">
              <AlertTriangle className="w-4 h-4" /> Emergency Service
            </div>
            <p className="mt-2 text-sm text-primary-foreground/80">
              Downed door or dock? Call <a href="tel:+19035041803" className="text-accent font-semibold">(903) 504-1803</a> — crews ready to roll.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto max-w-monolith px-6 lg:px-10 py-6 flex flex-col sm:flex-row justify-between gap-3 text-xs font-mono-tech text-primary-foreground/50">
          <span>© {new Date().getFullYear()} TexPro Solutions LLC. All rights reserved.</span>
          <span>Fully Insured</span>
          <div className="flex gap-4">
            <Link to="/portal" className="hover:text-accent">Portal</Link>
            {user?.role === "admin" && (
              <Link to="/portal-admin" className="hover:text-accent transition-colors">Access Requests</Link>
            )}
            <a href={VERTEX_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Staff Sign In</a>
          </div>
        </div>
      </div>
    </footer>);

}