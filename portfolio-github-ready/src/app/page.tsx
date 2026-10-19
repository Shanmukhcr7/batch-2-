import React from "react";
import { Hero } from "@/components/hero/Hero";
import { FeaturedWork } from "@/components/projects/FeaturedWork";
import { WorkGallery } from "@/components/projects/WorkGallery";
import { AboutSection } from "@/components/about/AboutSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import {
  getAllProjects,
  getFeaturedProjects,
  getAllCategories,
} from "@/lib/assets";

export default function HomePage() {
  const allProjects = getAllProjects();
  const featuredProjects = getFeaturedProjects();
  const availableCategories = getAllCategories();

  return (
    <main className="relative">
      {/* 1. Cinematic Opening Hero with 3D Scene */}
      <Hero />

      {/* 2. Curated Featured Projects */}
      <FeaturedWork featuredProjects={featuredProjects} />

      {/* 3. Complete Work & Experiments Archive */}
      <WorkGallery
        initialProjects={allProjects}
        availableCategories={availableCategories}
      />

      {/* 4. About Veerepalli Shanmukh Section */}
      <AboutSection />

      {/* 5. Technical Skills & Workflows */}
      <SkillsSection />

      {/* 6. Direct Contact Section */}
      <ContactSection />
    </main>
  );
}
