import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone, Clock, AlertTriangle } from "lucide-react";

const links = [
{ to: "/", label: "Home" },
{ to: "/about", label: "About" },
{ to: "/services", label: "Services" },
{ to: "/gallery", label: "Gallery" },
{ to: "/contact", label: "Contact" },
{ to: "/emergency", label: "Emergency" }];


export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground border-b border-accent/30">
      {/* Utility bar */}
      <div className="hidden md:block bg-black/20 text-primary-foreground">
        <div className="mx-auto max-w-monolith px-6 lg:px-10 flex items-center justify-between h-9 font-mono-tech text-[11px]">
          <div className="flex items-center gap-6">
            <a href="tel:+19035041803" className="flex items-center gap-2 hover:text-accent text-base">
              <Phone className="w-3.5 h-3.5" /> (903) 504-1803
            </a>
            <span className="flex items-center gap-2 text-primary-foreground/70 text-sm">
              <Clock className="w-3.5 h-3.5" /> Mon–Fri · 8am–5pm
            </span>
          </div>
          <span className="flex items-center gap-2 text-accent text-base">
            <AlertTriangle className="w-3.5 h-3.5" /> Emergency Service
          </span>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto max-w-monolith px-6 lg:px-10 flex items-center justify-between h-20">
        <Link to="/" className="flex items-baseline gap-2 group" aria-label="TexPro Solutions home">
          <span className="font-heading font-bold text-2xl tracking-tight text-primary-foreground uppercase">TexPro</span>
          <span className="font-mono-tech text-accent text-base">Solutions</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {links.map((l) =>
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
            `font-heading uppercase tracking-wide text-sm transition-colors ${isActive ? "text-accent" : "text-primary-foreground hover:text-accent"}`
            }>
            
              {l.label}
            </NavLink>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/quote"
            className="inline-flex items-center justify-center h-12 px-6 bg-accent text-accent-foreground font-heading uppercase tracking-wide text-xs hover:brightness-110 transition active:animate-latch">
            
            Request Quote
          </Link>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center w-12 h-12 text-primary-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}>
          
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {open &&
      <div className="md:hidden border-t border-accent/30 bg-primary">
          <nav className="px-6 py-4 flex flex-col gap-1" aria-label="Mobile">
            {links.map((l) =>
          <NavLink
            key={l.to}
            to={l.to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
            `py-3 font-heading uppercase tracking-wide text-base ${isActive ? "text-accent" : "text-primary-foreground"}`
            }>
            
                {l.label}
              </NavLink>
          )}
            <div className="flex gap-3 pt-3 pb-1">
              <Link
              to="/quote"
              onClick={() => setOpen(false)}
              className="flex-1 inline-flex items-center justify-center h-12 bg-accent text-accent-foreground font-heading uppercase tracking-wide text-xs">
              
                Request Quote
              </Link>
            </div>
          </nav>
        </div>
      }
    </header>);

}