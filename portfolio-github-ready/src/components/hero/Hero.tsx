"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, ArrowRight, Play } from "lucide-react";
import { siteConfig } from "@/config/site";

// Dynamically import 3D Hero Scene with SSR disabled to prevent hydration mismatch
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-brand-jet flex items-center justify-center opacity-30">
      <div className="w-64 h-64 rounded-full bg-brand-glow blur-3xl animate-pulse" />
    </div>
  ),
});

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* 3D WebGL Canvas Layer */}
      <HeroScene />

      {/* Atmospheric Ambient Lighting Gradients */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-royal/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-brand-hyacinth/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-jet/40 via-transparent to-brand-jet pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-brand-royal/30 shadow-[0_0_15px_rgba(59,130,246,0.15)] mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-mono tracking-wide text-slate-200 uppercase">
            {siteConfig.availability.label}
          </span>
        </motion.div>

        {/* Intro Greeting & Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mb-4"
        >
          <h2 className="text-sm sm:text-base font-mono uppercase tracking-[0.25em] text-brand-hyacinth font-semibold">
            {siteConfig.hero.greeting}
          </h2>
        </motion.div>

        {/* Cinematic Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight text-white leading-[1.1] mb-6 max-w-4xl"
        >
          Transforming Ideas into{" "}
          <span className="text-gradient-brand">Cinematic AI Worlds</span> &{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-white">
            Intelligent Code
          </span>
        </motion.h1>

        {/* Subtitle / Professional Bio Summary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-10"
        >
          {siteConfig.hero.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href={siteConfig.hero.primaryCta.href}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-brand-royal via-blue-600 to-brand-hyacinth rounded-full shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{siteConfig.hero.primaryCta.label}</span>
          </a>

          <Link
            href={siteConfig.hero.secondaryCta.href}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold tracking-wide text-slate-200 border border-white/20 hover:border-brand-royal/60 rounded-full hover:bg-brand-blackberry/50 transition-all duration-300"
          >
            <span>{siteConfig.hero.secondaryCta.label}</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 sm:mt-24 flex flex-col items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400"
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-brand-royal" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
