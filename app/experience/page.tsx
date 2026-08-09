import React from "react";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ExperienceSection from "@/components/ExperienceSection";

export const metadata = {
  title: "Experience | Veerendra Pradeep",
  description: "Work experience and AI internship background of Veerendra Pradeep.",
};

export default function ExperiencePage() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] bg-dot-pattern transition-colors duration-300">
      <main className="max-w-2xl mx-auto px-4 sm:px-6 min-h-screen flex flex-col justify-between pt-4 pb-32">
        <div>
          {/* Top Bar with Resume & Theme toggle */}
          <TopBar
            title="EXPERIENCES"
            subtitle="My work Experience"
          />

          {/* Main Experience Timeline Container */}
          <ExperienceSection hideHeader={true} />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
