"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Briefcase,
  Sparkles,
  Quote,
  Target,
  Compass,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Mail,
  MapPin,
} from "lucide-react";
import { siteConfig, isPlaceholder } from "@/config/site";

export function AboutSection() {
  const { about, contact, socials } = siteConfig;

  return (
    <section id="about" className="relative py-28 bg-brand-jet overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-hyacinth/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-brand-royal/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Pre-heading */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-brand-royal font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profile & Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white mb-4">
            About Veerepalli Shanmukh
          </h2>
          <p className="text-lg sm:text-xl font-heading text-brand-hyacinth max-w-3xl leading-relaxed">
            {about.professionalTitle}
          </p>
        </div>

        {/* Hero Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Portrait & Quick Facts */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative group rounded-3xl overflow-hidden border border-white/15 bg-brand-blackberry/30 p-2 shadow-2xl shadow-brand-royal/10">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-brand-blackberry flex items-center justify-center">
                <img
                  src="/profile/shanmukh-portrait.webp"
                  alt={about.fullName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to stylized vector badge if custom photo not loaded
                    const target = e.target as HTMLElement;
                    target.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-jet via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xl font-heading font-bold text-white">{about.fullName}</p>
                  <p className="text-xs font-mono text-brand-royal mt-1">Creative Technologist & AI Filmmaker</p>
                  <div className="flex items-center gap-2 text-xs text-slate-300 mt-2 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-brand-hyacinth" />
                    <span>{contact.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick stats / Highlights */}
            <div className="p-6 rounded-2xl border border-white/10 bg-brand-jet-surface/60 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
                Core Mission
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Pioneering the intersection of artificial intelligence and cinematic storytelling to create high-impact visual narratives, advertisements, and practical creative tools.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-royal hover:text-brand-hyacinth transition-colors"
                >
                  <span>Read Complete Biography</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Professional Introduction & Story */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4 text-slate-300 text-base leading-relaxed">
              {about.introduction.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Creative Philosophy Quote */}
            <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-brand-blackberry/80 to-brand-jet border border-brand-royal/30 shadow-lg">
              <Quote className="w-8 h-8 text-brand-royal/40 mb-3" />
              <blockquote className="text-lg sm:text-xl font-heading font-semibold text-white leading-snug mb-3">
                &ldquo;{about.creativePhilosophy.quote}&rdquo;
              </blockquote>
              <p className="text-sm text-slate-400 leading-relaxed">
                {about.creativePhilosophy.paragraphs[0]}
              </p>
            </div>
          </div>
        </div>

        {/* Education & Experience Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {/* Professional Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-brand-royal/20 text-brand-royal border border-brand-royal/40">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white">
                Professional Experience
              </h3>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-white/10">
              {about.experience.map((exp, idx) => (
                <div key={idx} className="relative pl-8 space-y-2">
                  <span className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-brand-royal border-4 border-brand-jet" />
                  <h4 className="text-lg font-heading font-bold text-white">
                    {exp.role}
                  </h4>
                  <p className="text-xs font-mono text-brand-hyacinth font-semibold">
                    {exp.organization}
                  </p>
                  <ul className="space-y-1.5 pt-2">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-2">
                        <span className="text-brand-royal mt-1">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Achievements */}
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-xl bg-brand-hyacinth/20 text-brand-hyacinth border border-brand-hyacinth/40">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white">
                  Education
                </h3>
              </div>

              <div className="space-y-6">
                {about.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl border border-white/10 bg-brand-jet-surface/60 space-y-1"
                  >
                    <span className="text-xs font-mono text-brand-royal uppercase tracking-wider">
                      {edu.year}
                    </span>
                    <h4 className="text-lg font-heading font-bold text-white">
                      {edu.degree} in {edu.field}
                    </h4>
                    {edu.institution && (
                      <p className="text-xs font-mono text-slate-400">{edu.institution}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-brand-royal/20 text-brand-royal border border-brand-royal/40">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white">
                  Key Achievements
                </h3>
              </div>

              <div className="space-y-3">
                {about.achievements.map((ach, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-white/5 bg-brand-jet-surface/40 text-xs sm:text-sm text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-hyacinth mt-1.5 shrink-0" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Specializations Grid */}
        <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-brand-jet-surface/50">
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="w-5 h-5 text-brand-royal" />
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Core Specializations
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {about.specializations.map((spec, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-white/5 bg-brand-blackberry/30 text-xs sm:text-sm font-medium text-slate-200 hover:border-brand-royal/40 hover:text-white transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-royal to-brand-hyacinth shrink-0" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
