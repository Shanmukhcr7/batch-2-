import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Calendar,
  Layers,
  Wrench,
  CheckCircle2,
  Lightbulb,
  Workflow,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import {
  getAllProjects,
  getProjectBySlug,
  getRelatedProjects,
} from "@/lib/assets";
import { ProjectCard } from "@/components/projects/ProjectCard";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static routes for every discovered project at build time
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate dynamic SEO metadata
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Veerepalli Shanmukh Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.thumbnailUrl ? [project.thumbnailUrl] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;
  const relatedProjects = getRelatedProjects(slug, 2);

  return (
    <main className="min-h-screen pt-28 pb-24 bg-brand-jet">
      {/* Background ambient lighting */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-brand-royal/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-brand-royal transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Case Studies</span>
          </Link>
        </div>

        {/* Project Header Info */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-brand-royal/15 border border-brand-royal/40 text-brand-royal font-semibold">
              {project.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{project.year}</span>
            </span>
            {project.client && (
              <span className="text-xs font-mono text-brand-hyacinth">
                Client: {project.client}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Hero Media Player / High-Res Showcase */}
        <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/15 bg-black shadow-2xl mb-14">
          {project.mediaType === "video" ? (
            <video
              src={project.mediaUrl}
              poster={project.thumbnailUrl}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover sm:object-contain bg-black"
            />
          ) : (
            <img
              src={project.mediaUrl}
              alt={project.title}
              className="w-full h-full object-cover sm:object-contain bg-black"
            />
          )}
        </div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Main Case Study Narrative */}
          <div className="lg:col-span-8 space-y-10">
            {/* Objective */}
            {project.objective && (
              <div className="p-8 rounded-2xl border border-white/10 bg-brand-jet-surface/60 space-y-3">
                <div className="flex items-center gap-2.5 text-brand-royal">
                  <Lightbulb className="w-5 h-5" />
                  <h3 className="text-lg font-heading font-bold text-white">
                    Project Objective
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {project.objective}
                </p>
              </div>
            )}

            {/* Creative Process */}
            {project.process && (
              <div className="p-8 rounded-2xl border border-white/10 bg-brand-jet-surface/60 space-y-3">
                <div className="flex items-center gap-2.5 text-brand-hyacinth">
                  <Workflow className="w-5 h-5" />
                  <h3 className="text-lg font-heading font-bold text-white">
                    Creative & Technical Process
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {project.process}
                </p>
              </div>
            )}

            {/* Results / Impact */}
            {project.results && (
              <div className="p-8 rounded-2xl border border-white/10 bg-brand-jet-surface/60 space-y-3">
                <div className="flex items-center gap-2.5 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <h3 className="text-lg font-heading font-bold text-white">
                    Results & Impact
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {project.results}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar Metadata */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tools Box */}
            <div className="p-6 rounded-2xl border border-white/10 bg-brand-jet-surface">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-4">
                <Wrench className="w-4 h-4 text-brand-royal" />
                <span>Tools & Technologies</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags Box */}
            {project.tags && project.tags.length > 0 && (
              <div className="p-6 rounded-2xl border border-white/10 bg-brand-jet-surface">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
                  <Layers className="w-4 h-4 text-brand-hyacinth" />
                  <span>Category Tags</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-slate-400 bg-black/40 border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links / External CTA */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="p-6 rounded-2xl border border-white/10 bg-brand-jet-surface space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  External Resources
                </h4>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
                  >
                    <span>View Live Experience</span>
                    <ExternalLink className="w-4 h-4 text-brand-royal" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
                  >
                    <span>View Source Code</span>
                    <GithubIcon className="w-4 h-4 text-brand-hyacinth" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Previous / Next Project Navigation Bar */}
        <div className="pt-10 border-t border-white/10 flex items-center justify-between gap-4 mb-20">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex flex-col items-start gap-1 p-4 rounded-xl hover:bg-white/5 transition-colors max-w-xs"
            >
              <span className="flex items-center gap-1.5 text-xs font-mono uppercase text-slate-400">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Previous Project</span>
              </span>
              <span className="text-sm font-heading font-semibold text-white group-hover:text-brand-royal line-clamp-1">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex flex-col items-end gap-1 p-4 rounded-xl hover:bg-white/5 transition-colors max-w-xs text-right"
            >
              <span className="flex items-center gap-1.5 text-xs font-mono uppercase text-slate-400">
                <span>Next Project</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-sm font-heading font-semibold text-white group-hover:text-brand-royal line-clamp-1">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="pt-10 border-t border-white/10">
            <h3 className="text-2xl font-heading font-bold text-white mb-8">
              Related Case Studies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((rel) => (
                <ProjectCard key={rel.id} project={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
