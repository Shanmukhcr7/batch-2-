"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, FolderPlus, Film, Image as ImageIcon, Box, Sparkles, Layers } from "lucide-react";
import { Project, MediaType } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { VideoModal } from "./VideoModal";

interface WorkGalleryProps {
  initialProjects: Project[];
  availableCategories: string[];
}

export function WorkGallery({ initialProjects, availableCategories }: WorkGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Work");
  const [selectedMediaType, setSelectedMediaType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "newest" | "oldest" | "title">("featured");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = [...initialProjects];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tools?.some((t) => t.toLowerCase().includes(q)) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== "All Work") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Media type filter
    if (selectedMediaType !== "all") {
      result = result.filter((p) => p.mediaType === selectedMediaType);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "featured") {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return b.year - a.year;
      }
      if (sortBy === "newest") return b.year - a.year;
      if (sortBy === "oldest") return a.year - b.year;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

    return result;
  }, [initialProjects, searchQuery, selectedCategory, selectedMediaType, sortBy]);

  return (
    <section id="gallery" className="relative py-24 bg-brand-jet-surface/40 border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-brand-hyacinth/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-brand-hyacinth font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Digital Archive</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white mb-4">
            Complete Work & Experiments
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A comprehensive collection of AI filmmaking projects, commercial advertisements, visual effects, and software applications.
          </p>
        </div>

        {/* Filter Bar Controls */}
        <div className="flex flex-col gap-6 mb-12">
          {/* Search & Media Type & Sort Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title, tool, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-brand-jet border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-royal transition-colors"
              />
            </div>

            {/* Media Type Filter & Sort Controls */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              {/* Media Type Tabs */}
              <div className="flex items-center p-1 rounded-full bg-brand-jet border border-white/10 text-xs">
                <button
                  onClick={() => setSelectedMediaType("all")}
                  className={`px-3 py-1.5 rounded-full transition-colors ${
                    selectedMediaType === "all"
                      ? "bg-brand-royal text-white font-medium"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedMediaType("video")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
                    selectedMediaType === "video"
                      ? "bg-brand-royal text-white font-medium"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Film className="w-3 h-3" />
                  <span>Videos</span>
                </button>
                <button
                  onClick={() => setSelectedMediaType("image")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
                    selectedMediaType === "image"
                      ? "bg-brand-royal text-white font-medium"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>Images</span>
                </button>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 rounded-full bg-brand-jet border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-brand-royal cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Title (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {availableCategories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? "bg-brand-royal text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] border border-brand-royal"
                      : "bg-brand-jet/80 border border-white/10 text-slate-300 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard
                    project={project}
                    onQuickView={(p) => setActiveModalProject(p)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty State Guide */
          <div className="py-20 px-6 rounded-2xl border border-dashed border-white/15 bg-brand-jet/60 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-brand-royal/10 border border-brand-royal/30 flex items-center justify-center mx-auto mb-4 text-brand-royal">
              <FolderPlus className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">
              {searchQuery || selectedCategory !== "All Work"
                ? "No matching projects found"
                : "No projects discovered yet"}
            </h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed max-w-lg mx-auto">
              {searchQuery || selectedCategory !== "All Work"
                ? "Try adjusting your search keywords or switching category filters."
                : "To showcase your work, drop videos, images, or 3D assets into the root assets folder and run the discovery script."}
            </p>

            {searchQuery || selectedCategory !== "All Work" ? (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Work");
                  setSelectedMediaType("all");
                }}
                className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-brand-royal hover:bg-brand-royal-hover transition-colors"
              >
                Reset All Filters
              </button>
            ) : (
              <div className="text-left bg-black/40 border border-white/10 rounded-xl p-4 text-xs font-mono text-slate-300 max-w-md mx-auto space-y-2">
                <p className="text-brand-royal font-semibold">Quick Setup:</p>
                <p>1. Place video in: <code className="text-white">assets/videos/advertisements/</code></p>
                <p>2. Optional metadata: <code className="text-white">my-video.json</code></p>
                <p>3. Run command: <code className="text-brand-hyacinth">npm run assets:scan</code></p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Video / Media Modal */}
      <VideoModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
