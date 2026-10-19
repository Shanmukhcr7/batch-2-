"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, MapPin, Send, MessageSquare } from "lucide-react";
import { LinkedinIcon, GithubIcon, YoutubeIcon, InstagramIcon } from "@/components/ui/Icons";
import { siteConfig, isPlaceholder } from "@/config/site";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const { contact, socials, name } = siteConfig;

  const handleCopyEmail = () => {
    if (contact.email && !isPlaceholder(contact.email)) {
      navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="contact" className="relative py-28 bg-brand-jet overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-glow blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-brand-royal font-semibold mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white mb-4">
            Let&apos;s Build Something Extraordinary
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {contact.inquiries}
          </p>
        </div>

        {/* Contact Interaction Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-brand-jet-surface/80 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Email Info */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-brand-hyacinth uppercase tracking-wider font-semibold">
              <Mail className="w-4 h-4" />
              <span>Professional Email</span>
            </div>
            <p className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight break-all">
              {contact.email}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-slate-400 font-mono">
              <MapPin className="w-3.5 h-3.5 text-brand-royal" />
              <span>{contact.location}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-200 border border-white/15 hover:border-brand-royal hover:bg-white/5 transition-all duration-200"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${contact.email}?subject=Creative%20Collaboration%20Inquiry%20-%20${encodeURIComponent(name)}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-brand-royal to-brand-hyacinth shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:opacity-95 transition-opacity"
            >
              <Send className="w-4 h-4" />
              <span>Compose Email</span>
            </a>
          </div>
        </div>

        {/* Social Links Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {!isPlaceholder(socials.linkedin) && (
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl border border-white/5 bg-brand-blackberry/30 hover:bg-brand-blackberry/60 hover:border-brand-royal/40 transition-all text-center group flex flex-col items-center gap-2"
            >
              <LinkedinIcon className="w-6 h-6 text-brand-royal group-hover:scale-110 transition-transform" />
              <span className="text-xs font-heading font-semibold text-white">LinkedIn</span>
              <span className="text-[10px] font-mono text-slate-400">Connect</span>
            </a>
          )}

          {!isPlaceholder(socials.github) && (
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl border border-white/5 bg-brand-blackberry/30 hover:bg-brand-blackberry/60 hover:border-brand-hyacinth/40 transition-all text-center group flex flex-col items-center gap-2"
            >
              <GithubIcon className="w-6 h-6 text-brand-hyacinth group-hover:scale-110 transition-transform" />
              <span className="text-xs font-heading font-semibold text-white">GitHub</span>
              <span className="text-[10px] font-mono text-slate-400">Repositories</span>
            </a>
          )}

          {!isPlaceholder(socials.youtube) && (
            <a
              href={socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl border border-white/5 bg-brand-blackberry/30 hover:bg-brand-blackberry/60 hover:border-red-500/40 transition-all text-center group flex flex-col items-center gap-2"
            >
              <YoutubeIcon className="w-6 h-6 text-red-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-heading font-semibold text-white">YouTube</span>
              <span className="text-[10px] font-mono text-slate-400">AI Films</span>
            </a>
          )}

          {!isPlaceholder(socials.instagram) && (
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl border border-white/5 bg-brand-blackberry/30 hover:bg-brand-blackberry/60 hover:border-pink-500/40 transition-all text-center group flex flex-col items-center gap-2"
            >
              <InstagramIcon className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-heading font-semibold text-white">Instagram</span>
              <span className="text-[10px] font-mono text-slate-400">Visuals</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
