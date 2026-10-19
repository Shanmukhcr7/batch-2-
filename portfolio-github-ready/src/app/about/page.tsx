import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  GraduationCap,
  Briefcase,
  Quote,
  Target,
  Compass,
  Heart,
  Mail,
  MapPin,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { siteConfig, isPlaceholder } from "@/config/site";

export const metadata: Metadata = {
  title: "About Veerepalli Shanmukh | AI Filmmaker & Creative Technologist",
  description:
    "Learn about Veerepalli Shanmukh — background in Artificial Intelligence, AI filmmaking workflows, generative cinema, visual effects, and software development.",
};

export default function AboutPage() {
  const { about, contact, socials } = siteConfig;

  return (
    <main className="min-h-screen pt-32 pb-24 bg-brand-jet">
      {/* Ambient background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-brand-glow blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-brand-royal transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-16 pb-12 border-b border-white/10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-brand-royal font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curriculum Vitae & Story</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-white tracking-tight mb-4">
            {about.fullName}
          </h1>
          <p className="text-lg sm:text-2xl font-heading text-brand-hyacinth font-medium max-w-3xl leading-snug">
            {about.professionalTitle}
          </p>
        </div>

        {/* Profile Introduction & Story */}
        <div className="space-y-16 mb-20">
          {/* Introduction */}
          <section className="space-y-6">
            <h2 className="text-2xl font-heading font-bold text-white tracking-tight">
              Professional Introduction
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              {about.introduction.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* My Story */}
          <section className="space-y-6">
            <h2 className="text-2xl font-heading font-bold text-white tracking-tight">
              My Story & Creative Journey
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              {about.story.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* Creative Philosophy */}
          <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-brand-blackberry/80 via-brand-jet-surface to-brand-jet border border-brand-royal/30 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <Quote className="w-7 h-7 text-brand-royal" />
              <h2 className="text-2xl font-heading font-bold text-white">
                Creative Philosophy
              </h2>
            </div>
            <blockquote className="text-xl sm:text-2xl font-heading font-semibold text-white leading-snug border-l-2 border-brand-hyacinth pl-4 italic">
              &ldquo;{about.creativePhilosophy.quote}&rdquo;
            </blockquote>
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
              {about.creativePhilosophy.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* Experience & Education */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-6">
            {/* Experience */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-brand-royal/20 text-brand-royal border border-brand-royal/30">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-white">
                  Professional Experience
                </h2>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-white/10">
                {about.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-8 space-y-2">
                    <span className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-brand-royal border-4 border-brand-jet" />
                    <h3 className="text-lg font-heading font-bold text-white">
                      {exp.role}
                    </h3>
                    <p className="text-xs font-mono text-brand-hyacinth font-semibold">
                      {exp.organization}
                    </p>
                    <ul className="space-y-2 pt-2">
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
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-brand-hyacinth/20 text-brand-hyacinth border border-brand-hyacinth/30">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-white">
                    Education
                  </h2>
                </div>

                <div className="space-y-4">
                  {about.education.map((edu, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl border border-white/10 bg-brand-jet-surface space-y-1"
                    >
                      <span className="text-xs font-mono text-brand-royal font-semibold uppercase">
                        {edu.year}
                      </span>
                      <h3 className="text-lg font-heading font-bold text-white">
                        {edu.degree} in {edu.field}
                      </h3>
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
                  <div className="p-2 rounded-xl bg-brand-royal/20 text-brand-royal border border-brand-royal/30">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-white">
                    Key Highlights
                  </h2>
                </div>

                <div className="space-y-3">
                  {about.achievements.map((ach, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl border border-white/5 bg-brand-jet-surface text-xs sm:text-sm text-slate-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-hyacinth mt-1.5 shrink-0" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Current Focus & Future Goals */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div className="p-8 rounded-3xl border border-white/10 bg-brand-jet-surface space-y-4">
              <div className="flex items-center gap-2.5 text-brand-royal">
                <Target className="w-5 h-5" />
                <h3 className="text-xl font-heading font-bold text-white">
                  Current Focus
                </h3>
              </div>
              <ul className="space-y-2.5">
                {about.currentFocus.map((item, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-royal mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-3xl border border-white/10 bg-brand-jet-surface space-y-4">
              <div className="flex items-center gap-2.5 text-brand-hyacinth">
                <Compass className="w-5 h-5" />
                <h3 className="text-xl font-heading font-bold text-white">
                  Future Goals
                </h3>
              </div>
              <ul className="space-y-2.5">
                {about.futureGoals.map((item, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-hyacinth mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Personal Interests */}
          <section className="p-8 rounded-3xl border border-white/10 bg-brand-jet-surface/40 space-y-4">
            <div className="flex items-center gap-2.5 text-pink-400">
              <Heart className="w-5 h-5" />
              <h3 className="text-xl font-heading font-bold text-white">
                Personal Interests & Passions
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {about.personalInterests.map((interest, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-white/5 bg-brand-jet text-xs font-medium text-slate-300"
                >
                  {interest}
                </div>
              ))}
            </div>
          </section>

          {/* Contact Inquiries Callout */}
          <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-brand-royal/10 via-brand-blackberry to-brand-hyacinth/10 border border-brand-royal/30 text-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              Interested in Collaborating?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              {contact.inquiries}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-brand-royal to-brand-hyacinth shadow-lg hover:opacity-90 transition-opacity"
              >
                <Mail className="w-4 h-4" />
                <span>Get In Touch</span>
              </a>
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-300 border border-white/20 hover:text-white hover:bg-white/5 transition-colors"
              >
                <span>View Portfolio Projects</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
