import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import RotatingHero from "@/components/sections/RotatingHero";
import AboutSection from "@/components/sections/AboutSection";
import CategoryShowcase from "@/components/sections/CategoryShowcase";
import StatBar from "@/components/sections/StatBar";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <RotatingHero />
        <AboutSection />
        <CategoryShowcase />
        <StatBar />
        <CTASection />
      </main>
      <SiteFooter />
    </>
  );
}