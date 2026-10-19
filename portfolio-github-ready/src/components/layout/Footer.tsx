"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Sparkles } from "lucide-react";
import { LinkedinIcon, GithubIcon, YoutubeIcon, InstagramIcon } from "@/components/ui/Icons";
import { siteConfig, isPlaceholder } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-brand-jet border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-brand-glow blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Identity & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/profile/shanmukh-emblem.png"
                alt="Shanmukh AI Film Makers"
                className="w-6 h-6 rounded-full object-cover border border-amber-400/50"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = "none";
                }}
              />
              <span className="font-heading font-bold text-lg text-white uppercase tracking-wider">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-hyacinth pt-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Blending Human Imagination with Artificial Intelligence</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-brand-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {siteConfig.resumeUrl && (
                <li>
                  <a
                    href={siteConfig.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-brand-royal transition-colors duration-200"
                  >
                    Download Resume
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Socials & Connect */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold mb-4">
              Connect
            </h4>
            <div className="flex flex-col gap-2.5 text-sm">
              {!isPlaceholder(siteConfig.socials.linkedin) && (
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-brand-white transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-brand-royal" />
                  <span>LinkedIn</span>
                </a>
              )}
              {!isPlaceholder(siteConfig.socials.github) && (
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-brand-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-brand-hyacinth" />
                  <span>GitHub</span>
                </a>
              )}
              {!isPlaceholder(siteConfig.socials.youtube) && (
                <a
                  href={siteConfig.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-brand-white transition-colors"
                >
                  <YoutubeIcon className="w-4 h-4 text-red-400" />
                  <span>YouTube Film Portfolio</span>
                </a>
              )}
              {!isPlaceholder(siteConfig.socials.instagram) && (
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-brand-white transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-400" />
                  <span>Instagram</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} {siteConfig.name}. Designed & Built with Next.js, Three.js & Tailwind CSS.</p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-brand-royal/60 bg-brand-blackberry/40 hover:bg-brand-blackberry text-slate-300 hover:text-white transition-all duration-200"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
