import React from "react";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import BlogsSection from "@/components/BlogsSection";

export const metadata = {
  title: "Blogs | Veerendra Pradeep",
  description: "Latest technical articles, system design guides, and tutorials by Veerendra Pradeep.",
};

export default function BlogsPage() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] bg-dot-pattern transition-colors duration-300">
      <main className="max-w-2xl mx-auto px-4 sm:px-6 min-h-screen flex flex-col justify-between pt-4 pb-32">
        <div>
          {/* Top Bar with Resume & Theme toggle */}
          <TopBar
            title="BLOGS"
            subtitle="Latest articles and tutorials"
          />

          {/* Main Blogs Section */}
          <BlogsSection hideHeader={true} />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
