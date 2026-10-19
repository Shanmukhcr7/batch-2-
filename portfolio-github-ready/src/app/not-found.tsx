import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-jet px-6 py-24 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-royal/10 border border-brand-royal/30 flex items-center justify-center mx-auto text-brand-royal">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-6xl font-heading font-extrabold text-white">404</h1>
        <h2 className="text-xl font-heading font-bold text-slate-200">
          Scene Not Found
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          The project or page you are looking for does not exist or may have been relocated in the creative archive.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-brand-royal to-brand-hyacinth shadow-lg hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
