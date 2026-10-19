"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { VideoModal } from "./VideoModal";

interface FeaturedWorkProps {
  featuredProjects: Project[];
}

export function FeaturedWork({ featuredProjects }: FeaturedWorkProps) {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section id="work" className="relative py-24 bg-brand-jet">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-royal/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-brand-royal font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white">
              Featured Case Studies
            </h2>
          </div>

          <Link
            href="/#gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white group"
          >
            <span>Explore Complete Archive</span>
            <ArrowRight className="w-4 h-4 text-brand-royal group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              featuredLayout={idx === 0}
              onQuickView={(p) => setActiveModalProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Video / Media Modal */}
      <VideoModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
