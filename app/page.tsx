import React from "react";
import TopBar from "@/components/TopBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SocialLinks from "@/components/SocialLinks";
import SpotifyCard from "@/components/SpotifyCard";
import GitContributions from "@/components/GitContributions";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] bg-dot-pattern transition-colors duration-300">
      <main className="max-w-2xl mx-auto px-4 sm:px-6 min-h-screen flex flex-col justify-between pt-4 pb-12">
        <div>
          {/* Section 5.1: Top bar */}
          <TopBar />

          {/* Section 5.2: Hero / identity block */}
          <HeroSection />

          {/* Section 5.3: About Me */}
          <AboutSection />

          {/* Section 5.4: Social Links */}
          <SocialLinks />

          {/* Section 5.5: Spotify Card */}
          <SpotifyCard />

          {/* Section 5.6: GitHub Contributions */}
          <GitContributions />

          {/* Section 5.7: Projects */}
          <ProjectsSection />
        </div>

        {/* Section 5.8: Footer */}
        <Footer />
      </main>
    </div>
  );
}
