import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ThemeSelectorSection from "@/components/ThemeSelectorSection";
import StatsBar from "@/components/StatsBar";
import DiverseThinkersSection from "@/components/DiverseThinkersSection";
import TheSpaceSection from "@/components/TheSpaceSection";
import ProgramTracks from "@/components/ProgramTracks";
import EcosystemSection from "@/components/EcosystemSection";
import StudentLifeSection from "@/components/StudentLifeSection";
import CelebrationsSection from "@/components/CelebrationsSection";
import CalendarSection from "@/components/CalendarSection";
import TestimonialsStrip from "@/components/TestimonialsStrip";
import TeamSection from "@/components/TeamSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import ImageBreak from "@/components/ImageBreak";

import leadershipData from "@/content/leadership.json";
import facultyData from "@/content/faculty.json";
import boardData from "@/content/board.json";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navigation />
      <ThemeSelectorSection />
      <HeroSection />
      <StatsBar />
      <StudentLifeSection />

      {/* Break 1 — students collaborating, before "Who This School Is For" */}
      <ImageBreak
        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&h=700&fit=crop&auto=format&q=80"
        alt="High school students working together at a whiteboard — placeholder for CSST students"
        height={380}
        caption="Placeholder · Replace with CSST student photos"
      />

      <DiverseThinkersSection />

      {/* Break 2 — students with tech, before The Space / Programs */}
      <ImageBreak
        src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1600&h=700&fit=crop&auto=format&q=80"
        alt="Students using technology in a modern classroom — placeholder for CSST campus"
        height={340}
        caption="Placeholder · Replace with CSST campus photos"
      />

      <TheSpaceSection />
      <ProgramTracks />

      {/* Break 3 — students in group / community, before Partners */}
      <ImageBreak
        src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1600&h=700&fit=crop&auto=format&q=80"
        alt="Diverse group of high school students — placeholder for CSST student community"
        height={360}
        caption="Placeholder · Replace with CSST community photos"
      />

      <EcosystemSection />

      {/* Break 4 — students presenting / pitching, before Testimonials */}
      <ImageBreak
        src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&h=700&fit=crop&auto=format&q=80"
        alt="Students presenting a project — placeholder for CSST pitch day"
        height={320}
        caption="Placeholder · Replace with CSST event photos"
      />

      <TestimonialsStrip />

      {/* Break 5 — celebrations / community vibe */}
      <ImageBreak
        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&h=700&fit=crop&auto=format&q=80"
        alt="Students celebrating together — placeholder for CSST community moments"
        height={320}
        caption="Placeholder · Replace with CSST event photos"
      />

      <CelebrationsSection />
      <CalendarSection />

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
