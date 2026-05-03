import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import EcosystemSection from "@/components/EcosystemSection";
import ProgramTracks from "@/components/ProgramTracks";
import EntrepreneurshipSection from "@/components/EntrepreneurshipSection";
import TheSpaceSection from "@/components/TheSpaceSection";
import DiverseThinkersSection from "@/components/DiverseThinkersSection";
import TestimonialsStrip from "@/components/TestimonialsStrip";
import TeamSection from "@/components/TeamSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

import leadershipData from "@/content/leadership.json";
import facultyData from "@/content/faculty.json";
import boardData from "@/content/board.json";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navigation />
      <HeroSection />
      <StatsBar />
      <DiverseThinkersSection />
      <TestimonialsStrip />
      <TheSpaceSection />
      <ProgramTracks />
      <EntrepreneurshipSection />
      <EcosystemSection />
      <TeamSection
        leadership={leadershipData.members}
        faculty={facultyData.members}
        board={boardData.members}
      />
      <FAQSection />
      <Footer />
    </main>
  );
}
