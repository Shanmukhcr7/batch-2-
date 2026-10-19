"use client";

import React from "react";
import { Cpu, Film, Code, Palette, Terminal, Sparkles, Check } from "lucide-react";
import { siteConfig } from "@/config/site";

export function SkillsSection() {
  const { skills } = siteConfig;

  // Category Icon Resolver
  const getCategoryIcon = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes("filmmaking") || lower.includes("creative tools")) {
      return <Film className="w-5 h-5 text-brand-royal" />;
    }
    if (lower.includes("machine learning") || lower.includes("ai")) {
      return <Cpu className="w-5 h-5 text-brand-hyacinth" />;
    }
    if (lower.includes("frontend") || lower.includes("web")) {
      return <Palette className="w-5 h-5 text-blue-400" />;
    }
    if (lower.includes("vfx") || lower.includes("direction")) {
      return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
    return <Code className="w-5 h-5 text-indigo-400" />;
  };

  return (
    <section id="skills" className="relative py-24 bg-brand-jet-surface/30 border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-brand-royal/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-brand-royal font-semibold mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white mb-4">
            Skills, Workflows & Toolsets
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A comprehensive overview of creative AI suites, machine learning workflows, software development stacks, and frontend engineering tools.
          </p>
        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((group) => (
            <div
              key={group.category}
              className="p-7 rounded-2xl border border-white/10 bg-brand-jet/80 hover:border-brand-royal/40 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                    {getCategoryIcon(group.category)}
                  </div>
                  <h3 className="text-base sm:text-lg font-heading font-bold text-white">
                    {group.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-200 hover:border-brand-royal/50 hover:bg-brand-blackberry/40 hover:text-white transition-colors"
                    >
                      <Check className="w-3 h-3 text-brand-royal shrink-0" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
