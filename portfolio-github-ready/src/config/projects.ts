import { getAllProjects, getFeaturedProjects, getAllCategories, getProjectBySlug } from "@/lib/assets";

export { getAllProjects, getFeaturedProjects, getAllCategories, getProjectBySlug };

export const defaultCategories = [
  "All Work",
  "AI Filmmaking",
  "AI Advertisements",
  "AI UGC",
  "VFX",
  "Motion Graphics",
  "Software Development",
  "Web Development",
  "Experiments",
] as const;
