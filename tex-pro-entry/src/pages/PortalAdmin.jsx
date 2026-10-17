import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const STATUS_STYLES = {
  pending: "bg-secondary text-primary border-border",
  approved: "bg-accent/15 text-accent border-accent/40",
  granted: "bg-accent text-accent-foreground border-accent",
  denied: "bg-primary text-primary-foreground border-primary",
};

export default function PortalAdmin() {
  const { user } = useAuth();
  const [requests, setRequests] = useState(null);
  const [busy, setBusy] = useState(null);
  const { toast } = useToast();

  const load = async () => {
    try {
      const data = await base44.entities.PortalAccessRequest.list("-created_date", 200);
      setRequests(data);
    } catch (err) {
      setRequests([]);
      toast({ variant: "destructive", title: "Could not load requests", description: err?.message });
    }
  };

  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    setBusy(id);
    try {
      await base44.entities.PortalAccessRequest.update(id, { status });
      setRequests((rs) => (rs || []).map((r) => (r.id === id ? { ...r, status } : r)));
      toast({ title: `Marked ${status}` });
    } catch (err) {
      toast({ variant: "destructive", title: "Update failed", description: err?.message });
    } finally {
      setBusy(null);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <>
        <SiteHeader />
        <main className="py-32 text-center">
          <p className="font-heading text-2xl text-primary">Admins only</p>
          <p className="mt-2 text-muted-foreground">You must be signed in as an admin to review portal access requests.</p>
        </main>
        <SiteFooter />
      </>
    );
  }

  const rows = requests || [];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-primary text-primary-foreground py-20">
          <div className="mx-auto max-w-monolith px-6 lg:px-10">
            <span className="font-mono-tech text-xs text-accent">/ Admin</span>
            <h1 className="mt-4 font-heading font-extrabold text-4xl sm:text-5xl">Portal Access Requests</h1>
            <p className="mt-3 text-primary-foreground/70 max-w-xl">Review and approve, grant or deny incoming portal access requests.</p>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="mx-auto max-w-monolith px-6 lg:px-10">
            {requests === null ? (
              <div className="flex items-center justify-center py-24 text-muted-foreground">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : rows.length === 0 ? (
              <p className="text-center py-24 text-muted-foreground">No access requests yet.</p>
            ) : (
              <div className="border border-border divide-y divide-border">
                {rows.map((r) => (
                  <div key={r.id} className="p-6 grid lg:grid-cols-[1fr_auto] gap-6">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-heading font-bold text-lg text-primary">{r.name}</span>
                        <span className={`font-mono-tech text-[10px] px-2 py-1 border ${STATUS_STYLES[r.status] || STATUS_STYLES.pending}`}>{r.status}</span>
                      </div>
                      <div className="mt-2 grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-muted-foreground">
                        <span><a href={`mailto:${r.email}`} className="hover:text-accent">{r.email}</a></span>
                        <span><a href={`tel:${r.phone}`} className="hover:text-accent">{r.phone}</a></span>
                        {r.company && <span className="sm:col-span-2">Company: {r.company}</span>}
                      </div>
                      {r.reason && (
                        <p className="mt-3 text-sm text-primary/80 border-l-2 border-accent/40 pl-3">{r.reason}</p>
                      )}
                    </div>
                    <div className="flex lg:flex-col gap-2 lg:w-40">
                      <button onClick={() => setStatus(r.id, "approved")} disabled={busy === r.id} className="flex-1 h-10 bg-accent/15 text-accent font-heading uppercase tracking-wide text-xs border border-accent/40 hover:bg-accent/25 transition disabled:opacity-50">Approve</button>
                      <button onClick={() => setStatus(r.id, "granted")} disabled={busy === r.id} className="flex-1 h-10 bg-accent text-accent-foreground font-heading uppercase tracking-wide text-xs hover:brightness-110 transition disabled:opacity-50">Grant</button>
                      <button onClick={() => setStatus(r.id, "denied")} disabled={busy === r.id} className="flex-1 h-10 bg-primary text-primary-foreground font-heading uppercase tracking-wide text-xs hover:opacity-90 transition disabled:opacity-50">Deny</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}