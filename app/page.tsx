import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import EcosystemSection from "@/components/EcosystemSection";
import ProgramTracks from "@/components/ProgramTracks";
import EntrepreneurshipSection from "@/components/EntrepreneurshipSection";
import TheSpaceSection from "@/components/TheSpaceSection";
import DiverseThinkersSection from "@/components/DiverseThinkersSection";
import NeurodiversitySection from "@/components/NeurodiversitySection";
import TeamSection from "@/components/TeamSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navigation />
      <HeroSection />
      <StatsBar />
      <EcosystemSection />
      <ProgramTracks />
      <EntrepreneurshipSection />
      <TheSpaceSection />
      <DiverseThinkersSection />
      <NeurodiversitySection />
      <TeamSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
