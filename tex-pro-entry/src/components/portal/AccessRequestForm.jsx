import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function AccessRequestForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", reason: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await base44.entities.PortalAccessRequest.create({ ...form, status: "pending" });
      base44.functions.invoke("notifySubmission", { type: "portal", data: form }).catch(() => {});
      setDone(true);
      toast({ title: "Request submitted", description: "We'll review it and contact you within 1-2 business days." });
    } catch (err) {
      toast({ variant: "destructive", title: "Something went wrong", description: err?.message || "Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="bg-background border border-border p-8 text-center">
        <CheckCircle2 className="w-10 h-10 mx-auto text-accent" />
        <h3 className="mt-3 font-heading font-bold text-xl text-primary">Your request has been submitted</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We'll review it and contact you within 1-2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-background border border-border p-6 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full Name *">
          <input required value={form.name} onChange={set("name")} className="w-full bg-transparent border-0 focus:outline-none py-1 text-primary" />
        </Field>
        <Field label="Email *">
          <input required type="email" value={form.email} onChange={set("email")} className="w-full bg-transparent border-0 focus:outline-none py-1 text-primary" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Phone Number *">
          <input required value={form.phone} onChange={set("phone")} className="w-full bg-transparent border-0 focus:outline-none py-1 text-primary" />
        </Field>
        <Field label="Company / Business Name">
          <input value={form.company} onChange={set("company")} className="w-full bg-transparent border-0 focus:outline-none py-1 text-primary" />
        </Field>
      </div>
      <Field label="Reason for Access *">
        <textarea required rows={4} value={form.reason} onChange={set("reason")} placeholder="Tell us why you need portal access" className="w-full bg-transparent border-0 focus:outline-none py-1 text-primary resize-none" />
      </Field>
      <button type="submit" disabled={submitting} className="w-full h-12 inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-heading uppercase tracking-wide text-sm hover:brightness-110 transition active:animate-latch disabled:opacity-60">
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Submit Request
      </button>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="font-mono-tech text-[10px] text-muted-foreground">{label}</span>
      <div className="border-b-2 border-border focus-within:border-accent transition-colors">{children}</div>
    </label>
  );
}