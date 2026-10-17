import { useEffect, useState } from "react";
import { Check, Loader2, AlertTriangle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

const PHONE_HREF = "tel:+19035041803";
const PHONE_DISPLAY = "(903) 504-1803";

export default function EmergencyForm({ initialDetails }) {
  const [form, setForm] = useState({ name: "", phone: "", project_details: initialDetails || "" });

  // When a user clicks an emergency card above, sync the new description in.
  useEffect(() => {
    if (initialDetails !== undefined) {
      setForm((f) => f.project_details === initialDetails ? f : { ...f, project_details: initialDetails });
    }
  }, [initialDetails]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const detail = `EMERGENCY REPORT: ${form.project_details}`;
      await base44.entities.QuoteRequest.create({
        name: form.name,
        email: "emergency@texpro.field",
        phone: form.phone,
        project_type: "Other",
        service: "Custom / Other",
        project_details: detail,
        status: "new"
      });
      base44.functions.invoke("notifySubmission", {
        type: "emergency",
        data: {
          name: form.name,
          email: "emergency@texpro.field",
          phone: form.phone,
          project_type: "Emergency",
          service: "Emergency Repair",
          project_details: detail
        }
      }).catch(() => {});
      base44.analytics.track({ eventName: "emergency_submitted" });
      setDone(true);
      toast({ title: "Emergency report received", description: "A dispatcher is reviewing it now." });
    } catch (err) {
      toast({ variant: "destructive", title: "Something went wrong", description: err?.message || "Please call instead." });
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="bg-background border-2 border-accent p-8 sm:p-10 text-center">
        <div className="mx-auto w-14 h-14 bg-accent text-accent-foreground flex items-center justify-center">
          <Check className="w-7 h-7" />
        </div>
        <h3 className="mt-6 font-heading font-bold text-2xl text-primary">Report received.</h3>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">
          A TexPro dispatcher is reviewing your report. For the fastest response, call us now.
        </p>
        <a
          href={PHONE_HREF}
          className="mt-6 inline-flex items-center justify-center gap-2 h-12 px-6 bg-accent text-accent-foreground font-heading uppercase tracking-wide text-sm hover:brightness-110 transition">
          
          Call {PHONE_DISPLAY}
        </a>
      </div>);

  }

  return (
    <form onSubmit={submit} className="bg-background border-2 border-accent p-8 sm:p-10">
      <div className="flex items-center gap-2 font-mono-tech text-xs text-accent mb-6">
        <AlertTriangle className="w-4 h-4" /> EMERGENCY REPORT
      </div>
      <div className="space-y-6">
        <Field label="Full name" required>
          <input value={form.name} onChange={update("name")} required className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none py-1 text-primary" />
        </Field>
        <Field label="Call-back phone" required>
          <input type="tel" value={form.phone} onChange={update("phone")} required className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none py-1 text-primary" />
        </Field>
        <Field label="What's the emergency?" required>
          <textarea
            rows={4}
            value={form.project_details}
            onChange={update("project_details")}
            required
            minLength={10}
            placeholder="e.g. Dock door #4 won't close, facility exposed, freight can't load"
            className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none py-1 text-primary resize-none placeholder:text-muted-foreground/50" />
          
        </Field>
        <button
          type="submit"
          disabled={submitting}
          className="w-full h-14 bg-accent text-accent-foreground font-heading uppercase tracking-wide text-sm inline-flex items-center justify-center gap-2 active:animate-latch disabled:opacity-60 hover:brightness-110 transition">
          
          {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Dispatching…</> : "Send Emergency Report"}
        </button>
        <p className="font-mono-tech text-[10px] text-muted-foreground text-center">
          For immediate response, call {PHONE_DISPLAY}
        </p>
      </div>
    </form>);

}

function Field({ label, required, children }) {
  return (
    <label className="block group">
      <span className="font-mono-tech text-muted-foreground text-xs">{label}{required && <span className="text-accent">*</span>}</span>
      <div className="mt-1 border-b-2 border-border group-focus-within:border-accent transition-colors">
        {children}
      </div>
    </label>);

}