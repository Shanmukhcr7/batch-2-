"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { X, ExternalLink, Sparkles, Film } from "lucide-react";
import { Project } from "@/types/project";

interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
}

export function VideoModal({ project, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-brand-jet-surface border border-white/15 rounded-2xl overflow-hidden shadow-2xl shadow-brand-royal/20 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-brand-blackberry/60">
          <div className="flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-brand-royal/20 text-brand-royal">
              <Film className="w-4 h-4" />
            </span>
            <div>
              <h3 id="video-modal-title" className="text-base sm:text-lg font-heading font-semibold text-white">
                {project.title}
              </h3>
              <p className="text-xs font-mono text-brand-hyacinth">
                {project.category} • {project.year}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/projects/${project.slug}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
              onClick={onClose}
            >
              <span>Case Study</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Media Container */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {project.mediaType === "video" ? (
            <video
              ref={videoRef}
              src={project.mediaUrl}
              poster={project.thumbnailUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={project.mediaUrl}
              alt={project.title}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Modal Footer Info */}
        <div className="p-6 bg-brand-jet flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            {project.description}
          </p>
          <Link
            href={`/projects/${project.slug}`}
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-brand-royal to-brand-hyacinth rounded-full shrink-0 hover:opacity-90 transition-opacity"
          >
            <span>View Full Case Study</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
