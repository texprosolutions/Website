import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

const TILES = [
  { id: "Residential", desc: "Garages, estates, custom homes" },
  { id: "Commercial", desc: "Retail, offices, multi-tenant" },
  { id: "Industrial", desc: "Warehouses & distribution" },
  { id: "Loading Dock", desc: "Levelers, seals, restraints" },
];

const SERVICE_OPTIONS = ["Overhead Door", "Loading Dock", "Commercial Project", "Custom / Other"];

export default function QuoteForm() {
  const [step, setStep] = useState(1);
  const [type, setType] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "Overhead Door", project_details: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await base44.entities.QuoteRequest.create({ ...form, project_type: type });
      base44.analytics.track({ eventName: "quote_submitted" });
      base44.functions.invoke("notifySubmission", { type: "quote", data: { ...form, project_type: type } }).catch(() => {});
      setDone(true);
      toast({ title: "Request received", description: "We'll be in touch within one business day." });
    } catch (err) {
      toast({ variant: "destructive", title: "Something went wrong", description: err?.message || "Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="bg-background border border-border p-10 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
          <Check className="w-7 h-7 text-accent" />
        </div>
        <h3 className="mt-6 font-heading font-bold text-2xl text-primary">Request received.</h3>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">
          A TexPro specialist will review your project and reach out within one business day.
        </p>
        <button onClick={() => { setDone(false); setStep(1); setType(""); }} className="mt-6 font-mono-tech text-xs text-accent hover:underline">
          Submit another request →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-background border border-border p-8 sm:p-10">
      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-8">
        {[1, 2].map((n) => (
          <div key={n} className="flex items-center gap-3">
            <div className={`w-8 h-8 flex items-center justify-center font-mono-tech text-xs ${step >= n ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"}`}>
              {n}
            </div>
            {n === 1 && <span className="font-mono-tech text-[10px] text-muted-foreground">PROJECT TYPE</span>}
            {n === 2 && <span className="font-mono-tech text-[10px] text-muted-foreground">DETAILS</span>}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="font-heading font-bold text-2xl text-primary">What are we securing?</h3>
            <p className="mt-1 text-muted-foreground text-sm">Select your project type to continue.</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {TILES.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => { setType(t.id); setStep(2); }}
                  className={`text-left p-6 border-2 transition-all min-h-[96px] ${type === t.id ? "border-accent bg-accent/5" : "border-border hover:border-primary"}`}
                >
                  <div className="font-heading font-bold text-lg text-primary">{t.id}</div>
                  <div className="text-sm text-muted-foreground">{t.desc}</div>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-1 font-mono-tech text-[10px] text-muted-foreground hover:text-accent mb-6">
              <ChevronLeft className="w-3 h-3" /> Change project type ({type})
            </button>

            <div className="space-y-6">
              <UnderlinedField label="Service needed" required>
                <select value={form.service} onChange={update("service")} className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none py-1 text-primary">
                  {SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </UnderlinedField>

              <div className="grid sm:grid-cols-2 gap-6">
                <UnderlinedField label="Full name" required>
                  <input value={form.name} onChange={update("name")} required className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none py-1 text-primary" />
                </UnderlinedField>
                <UnderlinedField label="Phone">
                  <input value={form.phone} onChange={update("phone")} className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none py-1 text-primary" />
                </UnderlinedField>
              </div>

              <UnderlinedField label="Email" required>
                <input type="email" value={form.email} onChange={update("email")} required className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none py-1 text-primary" />
              </UnderlinedField>

              <UnderlinedField label="Project details" required>
                <textarea rows={3} value={form.project_details} onChange={update("project_details")} required minLength={10} className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none py-1 text-primary resize-none" />
              </UnderlinedField>

              <button
                type="submit"
                disabled={submitting}
                className="w-full h-14 bg-accent text-accent-foreground font-mono-tech text-sm inline-flex items-center justify-center gap-2 active:animate-latch disabled:opacity-60"
              >
                {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : "Submit Request"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function UnderlinedField({ label, required, children }) {
  return (
    <label className="block group">
      <span className="font-mono-tech text-[10px] text-muted-foreground">{label}{required && <span className="text-accent">*</span>}</span>
      <div className="mt-1 border-b-2 border-border group-focus-within:border-accent transition-colors">
        {children}
      </div>
    </label>
  );
}