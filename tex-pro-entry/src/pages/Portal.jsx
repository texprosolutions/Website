import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import AccessRequestForm from "@/components/portal/AccessRequestForm";
import { ArrowUpRight, Lock } from "lucide-react";

// Published Vertex customer portal
const VERTEX_APP_URL = "https://portal.texprosolutionsllc.com";

export default function Portal() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Already have access? */}
        <section className="bg-primary text-primary-foreground py-24">
          <div className="mx-auto max-w-monolith px-6 lg:px-10">
            <span className="font-mono-tech text-xs text-accent">/ Customer Portal</span>
            <h1 className="mt-4 font-heading font-extrabold text-4xl sm:text-6xl text-balance max-w-2xl">Already have access?</h1>
            <p className="mt-4 max-w-xl text-primary-foreground/70">
              Sign in to the TexPro Solutions portal to manage quotes, track installations and view your service records.
            </p>
            <a
              href={VERTEX_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 h-12 px-7 bg-accent text-accent-foreground font-heading uppercase tracking-wide text-sm hover:brightness-110 transition active:animate-latch">
              <Lock className="w-4 h-4" /> Sign in to the Portal <ArrowUpRight className="w-4 h-4" />
            </a>
            <p className="mt-4 font-mono-tech text-[10px] text-primary-foreground/50">
              Access is granted by TexPro Solutions. Don't have an account? Request access below.
            </p>
          </div>
        </section>

        {/* Request Portal Access */}
        <section id="request-access" className="py-20 bg-background scroll-mt-24">
          <div className="mx-auto max-w-monolith px-6 lg:px-10 grid gap-10 lg:grid-cols-2">
            <div>
              <span className="font-mono-tech text-xs text-accent">/ Request Portal Access</span>
              <h2 className="mt-3 font-heading font-extrabold text-3xl sm:text-4xl text-primary text-balance">Need portal access?</h2>
              <p className="mt-3 text-muted-foreground max-w-md">
                Submit a request and our team will review it and set up your account on the TexPro portal.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li>• Customers track quotes and installations.</li>
                <li>• Suppliers manage orders and deliveries.</li>
                <li>• Employees handle jobs and lead documentation.</li>
              </ul>
            </div>
            <AccessRequestForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}