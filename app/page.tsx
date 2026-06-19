import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import TrustSection from "@/components/home/TrustSection";
import CompoundCalculator from "@/components/home/CompoundCalculator";
import CurriculumSection from "@/components/home/CurriculumSection";
import BentoWhyUs from "@/components/home/BentoWhyUs";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-[72px]">
        <HeroSection />
        <TrustSection />
        <CompoundCalculator />
        <CurriculumSection />
        <BentoWhyUs />
      </main>
      <Footer />
    </>
  );
}
