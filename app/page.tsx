import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import TrustSection from "@/components/home/TrustSection";
import CurriculumSection from "@/components/home/CurriculumSection";
import BentoWhyUs from "@/components/home/BentoWhyUs";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-[72px]">
        <HeroSection />
        <TrustSection />
        <CurriculumSection />
        <BentoWhyUs />
      </main>
      <Footer />
    </>
  );
}
