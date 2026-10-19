export type ProjectCategory =
  | "All Work"
  | "AI Filmmaking"
  | "AI Advertisements"
  | "AI UGC"
  | "VFX"
  | "Motion Graphics"
  | "Software Development"
  | "Web Development"
  | "Experiments";

export type MediaType = "image" | "video" | "3d";

export interface ProjectMetadata {
  title?: string;
  description?: string;
  category?: string;
  year?: number;
  featured?: boolean;
  tools?: string[];
  thumbnail?: string;
  objective?: string;
  process?: string;
  results?: string;
  client?: string;
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
  aspectRatio?: "16/9" | "9/16" | "4/3" | "1/1" | string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  year: number;
  featured: boolean;
  mediaType: MediaType;
  mediaUrl: string;
  thumbnailUrl?: string;
  tools: string[];
  objective?: string;
  process?: string;
  results?: string;
  client?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  aspectRatio?: string;
  originalFilename: string;
  originalRelativePath: string;
}

export interface ProjectManifest {
  lastGenerated: string;
  totalProjects: number;
  categories: string[];
  projects: Project[];
}
