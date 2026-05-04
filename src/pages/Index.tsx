import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CTASection } from "@/components/sections/CTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { DataSection } from "@/components/sections/DataSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { SipatCompareSection } from "@/components/sections/SipatCompareSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhyRaeSection } from "@/components/sections/WhyRaeSection";

export default function Index() {
  return (
    <div className="min-h-svh min-h-[100dvh] overflow-x-hidden bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SipatCompareSection />
        <SolutionSection />
        <ServicesSection />
        <ProcessSection />
        <DataSection />
        <WhyRaeSection />
        <TestimonialsSection />
        <FaqSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
