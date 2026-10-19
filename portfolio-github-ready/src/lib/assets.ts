import { Project, ProjectManifest } from "@/types/project";
import defaultManifest from "@/config/generated-projects.json";

// Safe accessor for project manifest
export function getProjectManifest(): ProjectManifest {
  try {
    return defaultManifest as ProjectManifest;
  } catch {
    return {
      lastGenerated: new Date().toISOString(),
      totalProjects: 0,
      categories: [],
      projects: [],
    };
  }
}

export function getAllProjects(): Project[] {
  return getProjectManifest().projects;
}

export function getFeaturedProjects(): Project[] {
  const projects = getAllProjects();
  const featured = projects.filter((p) => p.featured);
  // If no projects are marked featured, return the first 4 as featured
  return featured.length > 0 ? featured : projects.slice(0, 4);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "All Work" || !category) {
    return getAllProjects();
  }
  return getAllProjects().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getRelatedProjects(currentSlug: string, limit: number = 3): Project[] {
  const current = getProjectBySlug(currentSlug);
  if (!current) return [];

  const all = getAllProjects().filter((p) => p.slug !== currentSlug);
  // Match same category first
  const sameCategory = all.filter((p) => p.category === current.category);
  const others = all.filter((p) => p.category !== current.category);

  return [...sameCategory, ...others].slice(0, limit);
}

export function getAllCategories(): string[] {
  const defaultCategories = [
    "All Work",
    "AI Filmmaking",
    "AI Advertisements",
    "AI UGC",
    "VFX",
    "Motion Graphics",
    "Software Development",
    "Web Development",
    "Experiments",
  ];

  const discovered = getProjectManifest().categories;
  const merged = Array.from(new Set([...defaultCategories, ...discovered]));
  return merged;
}
