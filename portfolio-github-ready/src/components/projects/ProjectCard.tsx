"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Image as ImageIcon, Box, Star, ArrowUpRight, Maximize2 } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  onQuickView?: (project: Project) => void;
  featuredLayout?: boolean;
}

export function ProjectCard({ project, onQuickView, featuredLayout = false }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (project.mediaType === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted by browser policy; silently ignore
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (project.mediaType === "video" && videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col rounded-2xl bg-brand-jet-surface border border-white/10 hover:border-brand-royal/40 overflow-hidden transition-all duration-300 hover:shadow-[0_15px_35px_-10px_rgba(59,130,246,0.25)] ${
        featuredLayout ? "md:col-span-2 md:grid md:grid-cols-12 md:gap-6" : ""
      }`}
    >
      {/* Media Preview Container */}
      <div
        className={`relative overflow-hidden bg-black ${
          featuredLayout ? "md:col-span-7 aspect-video md:aspect-auto" : "aspect-video"
        }`}
      >
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-jet/80 backdrop-blur-md border border-brand-hyacinth/50 text-[11px] font-mono font-medium text-brand-hyacinth shadow-lg">
            <Star className="w-3 h-3 fill-brand-hyacinth" />
            <span>FEATURED</span>
          </div>
        )}

        {/* Media Type Indicator */}
        <div className="absolute top-3 right-3 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-brand-jet/80 backdrop-blur-md border border-white/10 text-white shadow-lg">
          {project.mediaType === "video" && <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
          {project.mediaType === "image" && <ImageIcon className="w-3.5 h-3.5" />}
          {project.mediaType === "3d" && <Box className="w-3.5 h-3.5 text-brand-hyacinth" />}
        </div>

        {/* Media Display: Video with Hover Preview or Image */}
        {project.mediaType === "video" ? (
          <div className="w-full h-full relative">
            <video
              ref={videoRef}
              src={project.mediaUrl}
              poster={project.thumbnailUrl}
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Center Play Button Overlay on Hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => onQuickView && onQuickView(project)}
                className="w-12 h-12 rounded-full bg-brand-royal/90 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform"
                aria-label={`Preview ${project.title}`}
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : !imageError && project.thumbnailUrl ? (
          <div className="w-full h-full relative">
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => onQuickView && onQuickView(project)}
                className="w-12 h-12 rounded-full bg-brand-royal/90 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform"
                aria-label={`Preview ${project.title}`}
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          /* Graceful Fallback Gradient Banner */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-blackberry via-brand-jet to-slate-900 p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-brand-royal/20 border border-brand-royal/40 flex items-center justify-center mb-3 text-brand-royal">
              <Play className="w-6 h-6 fill-brand-royal" />
            </div>
            <p className="text-sm font-semibold text-white max-w-xs">{project.title}</p>
            <p className="text-xs text-brand-hyacinth font-mono mt-1">{project.category}</p>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div
        className={`p-6 flex flex-col justify-between ${
          featuredLayout ? "md:col-span-5 md:py-8" : ""
        }`}
      >
        <div>
          {/* Category & Year */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-royal font-medium">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-400">{project.year}</span>
          </div>

          {/* Title */}
          <Link href={`/projects/${project.slug}`}>
            <h3 className="text-lg sm:text-xl font-heading font-bold text-white group-hover:text-brand-royal transition-colors mb-2.5">
              {project.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tools & Technologies */}
          {project.tools && project.tools.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.tools.slice(0, 3).map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300"
                >
                  {tool}
                </span>
              ))}
              {project.tools.length > 3 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-400">
                  +{project.tools.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <button
            onClick={() => onQuickView && onQuickView(project)}
            className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            Quick Preview
          </button>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-royal group-hover:text-brand-hyacinth transition-colors"
          >
            <span>View Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
