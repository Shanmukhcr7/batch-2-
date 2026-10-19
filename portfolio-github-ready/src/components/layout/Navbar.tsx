"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-brand-jet/80 backdrop-blur-md border-b border-white/10 py-3.5 shadow-lg shadow-black/40"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand identity */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-lg font-heading font-bold tracking-tight text-brand-white focus:outline-none"
        >
          <img
            src="/profile/shanmukh-emblem.png"
            alt="Shanmukh AI Film Makers"
            className="w-7 h-7 rounded-full object-cover border border-amber-400/50 shadow-[0_0_12px_rgba(245,158,11,0.35)] group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLElement;
              target.style.display = "none";
            }}
          />
          <span className="tracking-wider uppercase">
            {siteConfig.shortName}
          </span>
          <span className="text-xs font-mono font-normal text-slate-400 border border-white/10 rounded px-1.5 py-0.5 ml-1 hidden sm:inline-block">
            AI FILM MAKERS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {siteConfig.navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href) && item.href !== "/#";

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative py-1 text-sm tracking-wide transition-colors duration-200 hover:text-brand-white ${
                  isActive ? "text-brand-white font-semibold" : "text-slate-300"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-royal to-brand-hyacinth rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action button: Resume or Contact */}
        <div className="hidden md:flex items-center gap-4">
          {siteConfig.resumeUrl && (
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider text-slate-200 border border-white/15 rounded-full hover:border-brand-royal/60 hover:text-brand-white hover:bg-brand-blackberry/50 transition-all duration-300 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-brand-royal" />
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
          )}
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-brand-royal to-brand-hyacinth rounded-full hover:opacity-95 transition-opacity shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            <span>Let&apos;s Connect</span>
          </a>
        </div>

        {/* Mobile Hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
          aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-brand-jet/95 backdrop-blur-xl border-b border-white/10 px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-200 hover:text-brand-royal py-2 border-b border-white/5"
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                {siteConfig.resumeUrl && (
                  <a
                    href={siteConfig.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-200 border border-white/15 rounded-full"
                  >
                    <FileText className="w-4 h-4 text-brand-royal" />
                    <span>Download Resume</span>
                  </a>
                )}
                <a
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-brand-royal to-brand-hyacinth rounded-full text-center"
                >
                  <span>Let&apos;s Connect</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
