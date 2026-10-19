import { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/assets";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://shanmukh-ai.com"; // Configurable domain
  const projects = getAllProjects();

  const projectUrls = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p.featured ? 0.9 : 0.7,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectUrls,
  ];
}
