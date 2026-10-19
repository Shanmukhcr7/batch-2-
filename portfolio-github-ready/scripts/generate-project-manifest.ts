import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import { Project, ProjectManifest, MediaType } from "../src/types/project";

const ROOT_DIR = process.cwd();
const ASSETS_DIR = path.join(ROOT_DIR, "assets");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const PUBLIC_MEDIA_DIR = path.join(PUBLIC_DIR, "media");
const PUBLIC_DOCS_DIR = path.join(PUBLIC_DIR, "documents");
const PUBLIC_PROFILE_DIR = path.join(PUBLIC_DIR, "profile");
const OUTPUT_MANIFEST_PATH = path.join(ROOT_DIR, "src", "config", "generated-projects.json");

// Universal file format support
const SUPPORTED_IMAGE_EXTS = new Set([
  ".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg", ".bmp", ".tiff", ".ico"
]);
const SUPPORTED_VIDEO_EXTS = new Set([
  ".mp4", ".webm", ".mov", ".mkv", ".avi", ".m4v", ".flv", ".wmv", ".3gp", ".ts", ".ogv"
]);
const SUPPORTED_3D_EXTS = new Set([
  ".glb", ".gltf", ".obj", ".fbx", ".usdz"
]);
const SUPPORTED_DOC_EXTS = new Set([
  ".pdf", ".doc", ".docx"
]);

// Map directory names to friendly categories
const DIRECTORY_CATEGORY_MAP: Record<string, string> = {
  "ai-filmmaking": "AI Filmmaking",
  filmmaking: "AI Filmmaking",
  films: "AI Filmmaking",
  advertisements: "AI Advertisements",
  ads: "AI Advertisements",
  commercials: "AI Advertisements",
  "ai-ugc": "AI UGC",
  ugc: "AI UGC",
  vfx: "VFX",
  "visual-effects": "VFX",
  "motion-graphics": "Motion Graphics",
  motion: "Motion Graphics",
  "software-development": "Software Development",
  software: "Software Development",
  projects: "Software Development",
  "web-development": "Web Development",
  web: "Web Development",
  experiments: "Experiments",
  "3d": "Experiments",
  models: "Experiments",
  thumbnails: "AI Filmmaking",
  images: "Visual Arts",
  videos: "AI Filmmaking",
};

// Title formatter: transforms any filename into clean editorial title
function formatTitleFromFilename(filename: string): string {
  let nameWithoutExt = path.parse(filename).name;

  // Strip trailing timestamps e.g. _20261018131520 or -20261018131520
  nameWithoutExt = nameWithoutExt.replace(/[_-]\d{6,}/g, "");

  return nameWithoutExt
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(" ")
    .filter(Boolean)
    .map((word) => {
      const upper = word.toUpperCase();
      if (["AI", "VFX", "UGC", "3D", "UI", "UX", "CGI", "AR", "VR", "OPENART"].includes(upper)) {
        return upper;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

// Slug generator
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyFileSafe(src: string, dest: string) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

// Recursive file scanner
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  }

  return arrayOfFiles;
}

export function generateProjectManifest(): ProjectManifest {
  console.log("🔍 Scanning assets directory:", ASSETS_DIR);

  ensureDir(ASSETS_DIR);
  ensureDir(PUBLIC_DIR);
  ensureDir(PUBLIC_MEDIA_DIR);
  ensureDir(PUBLIC_DOCS_DIR);
  ensureDir(PUBLIC_PROFILE_DIR);
  ensureDir(path.dirname(OUTPUT_MANIFEST_PATH));

  // 1. Sync all documents recursively
  const allAssetFiles = getAllFiles(ASSETS_DIR);
  const docFiles = allAssetFiles.filter((f) => SUPPORTED_DOC_EXTS.has(path.extname(f).toLowerCase()));
  for (const doc of docFiles) {
    const rel = path.basename(doc);
    copyFileSafe(doc, path.join(PUBLIC_DOCS_DIR, rel));
  }

  // 2. Sync profile images & studio emblem
  for (const f of allAssetFiles) {
    const base = path.parse(f).name.toLowerCase();
    if (base.includes("emblem") || base.includes("logo") || base.includes("portrait") || base.includes("profile")) {
      const ext = path.extname(f).toLowerCase();
      if (SUPPORTED_IMAGE_EXTS.has(ext)) {
        if (base.includes("emblem") || base.includes("logo")) {
          copyFileSafe(f, path.join(PUBLIC_PROFILE_DIR, "shanmukh-emblem.png"));
        }
        copyFileSafe(f, path.join(PUBLIC_PROFILE_DIR, `profile${ext}`));
      }
    }
  }

  // 3. Scan all assets for projects
  const projects: Project[] = [];
  const usedSlugs = new Set<string>();

  // Filter for valid media files
  const mediaFiles = allAssetFiles.filter((filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    const base = path.parse(filePath).name.toLowerCase();
    const rel = path.relative(ASSETS_DIR, filePath);

    // Ignore documents and 3D textures
    if (rel.startsWith("documents") || rel.startsWith("3d" + path.sep + "textures")) {
      return false;
    }

    // Ignore companion posters (e.g. video-poster.webp) so they don't appear as duplicate cards
    if (
      base.endsWith("-poster") ||
      base.endsWith("_poster") ||
      base.endsWith("-thumb") ||
      base.endsWith("_thumb") ||
      base.endsWith("-thumbnail") ||
      base.endsWith("_thumbnail")
    ) {
      return false;
    }

    return (
      SUPPORTED_IMAGE_EXTS.has(ext) ||
      SUPPORTED_VIDEO_EXTS.has(ext) ||
      SUPPORTED_3D_EXTS.has(ext)
    );
  });

  for (const filePath of mediaFiles) {
    const ext = path.extname(filePath).toLowerCase();
    const filename = path.basename(filePath);
    const relFromAssets = path.relative(ASSETS_DIR, filePath);
    const dirSegments = path.dirname(relFromAssets).split(path.sep);

    // Determine media type
    let mediaType: MediaType = "image";
    if (SUPPORTED_VIDEO_EXTS.has(ext)) {
      mediaType = "video";
    } else if (SUPPORTED_3D_EXTS.has(ext)) {
      mediaType = "3d";
    }

    // Determine category from directory structure
    let category = "AI Filmmaking";
    for (const seg of dirSegments.reverse()) {
      const lowerSeg = seg.toLowerCase();
      if (DIRECTORY_CATEGORY_MAP[lowerSeg]) {
        category = DIRECTORY_CATEGORY_MAP[lowerSeg];
        break;
      }
    }

    // Target copy path inside public/media
    const publicMediaPath = path.join(PUBLIC_MEDIA_DIR, relFromAssets);
    copyFileSafe(filePath, publicMediaPath);

    // URL path served by Next.js
    const mediaUrl = `/media/${relFromAssets.split(path.sep).join("/")}`;

    // Look for sidecar JSON (e.g. filename.json)
    const sidecarPath = path.join(path.dirname(filePath), `${path.parse(filename).name}.json`);
    let sidecarData: Record<string, any> = {};

    if (fs.existsSync(sidecarPath)) {
      try {
        const rawJson = fs.readFileSync(sidecarPath, "utf-8");
        sidecarData = JSON.parse(rawJson);
      } catch (err) {
        console.warn(`⚠️ Warning: Failed to parse metadata file at ${sidecarPath}:`, err);
      }
    }

    // Check for companion thumbnail or extract poster for videos
    let thumbnailUrl: string | undefined = undefined;
    if (sidecarData.thumbnail) {
      const thumbSrc = path.join(path.dirname(filePath), sidecarData.thumbnail);
      if (fs.existsSync(thumbSrc)) {
        const thumbRel = path.relative(ASSETS_DIR, thumbSrc);
        const thumbDest = path.join(PUBLIC_MEDIA_DIR, thumbRel);
        copyFileSafe(thumbSrc, thumbDest);
        thumbnailUrl = `/media/${thumbRel.split(path.sep).join("/")}`;
      } else {
        thumbnailUrl = sidecarData.thumbnail;
      }
    } else if (mediaType === "video") {
      const baseName = path.parse(filename).name;
      let foundPoster = false;

      // Look for pre-existing companion poster
      for (const thumbExt of [".webp", ".jpg", ".jpeg", ".png"]) {
        const candidatePoster = path.join(path.dirname(filePath), `${baseName}-poster${thumbExt}`);
        const candidateThumb = path.join(path.dirname(filePath), `${baseName}-thumb${thumbExt}`);
        if (fs.existsSync(candidatePoster)) {
          const relP = path.relative(ASSETS_DIR, candidatePoster);
          copyFileSafe(candidatePoster, path.join(PUBLIC_MEDIA_DIR, relP));
          thumbnailUrl = `/media/${relP.split(path.sep).join("/")}`;
          foundPoster = true;
          break;
        } else if (fs.existsSync(candidateThumb)) {
          const relT = path.relative(ASSETS_DIR, candidateThumb);
          copyFileSafe(candidateThumb, path.join(PUBLIC_MEDIA_DIR, relT));
          thumbnailUrl = `/media/${relT.split(path.sep).join("/")}`;
          foundPoster = true;
          break;
        }
      }

      // If no poster exists, extract high-res frame using ffmpeg (Vercel-safe try-catch)
      if (!foundPoster) {
        try {
          const autoPosterPath = path.join(path.dirname(filePath), `${baseName}-poster.webp`);
          execSync(
            `ffmpeg -y -i "${filePath}" -ss 00:00:01 -vframes 1 "${autoPosterPath}"`,
            { stdio: "ignore" }
          );
          if (fs.existsSync(autoPosterPath)) {
            const relP = path.relative(ASSETS_DIR, autoPosterPath);
            copyFileSafe(autoPosterPath, path.join(PUBLIC_MEDIA_DIR, relP));
            thumbnailUrl = `/media/${relP.split(path.sep).join("/")}`;
            console.log(`🎬 Extracted video poster frame: ${thumbnailUrl}`);
          }
        } catch {
          // If ffmpeg is not installed (e.g. on Vercel build container), graceful fallback
        }
      }
    }

    // Derived metadata
    const title = sidecarData.title || formatTitleFromFilename(filename);
    let baseSlug = slugify(title);
    if (!baseSlug) baseSlug = "project";

    // Deduplicate slugs
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (usedSlugs.has(uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }
    usedSlugs.add(uniqueSlug);

    const isFeatured =
      sidecarData.featured !== undefined
        ? Boolean(sidecarData.featured)
        : title.toLowerCase().includes("emblem") ||
          title.toLowerCase().includes("canteen") ||
          title.toLowerCase().includes("vfx") ||
          title.toLowerCase().includes("aurora");

    const project: Project = {
      id: uniqueSlug,
      slug: uniqueSlug,
      title,
      description:
        sidecarData.description ||
        `Cinematic exploration and creative technology work: ${title}. Highlighting generative workflows and visual excellence.`,
      category: sidecarData.category || category,
      year: typeof sidecarData.year === "number" ? sidecarData.year : 2026,
      featured: isFeatured,
      mediaType,
      mediaUrl,
      thumbnailUrl: thumbnailUrl || (mediaType === "image" ? mediaUrl : undefined),
      tools: Array.isArray(sidecarData.tools) && sidecarData.tools.length > 0
        ? sidecarData.tools
        : ["Generative AI", "Cinematic Direction", "Shanmukh AI Film Makers"],
      objective: sidecarData.objective,
      process: sidecarData.process,
      results: sidecarData.results,
      client: sidecarData.client || "Shanmukh AI Film Makers",
      tags: Array.isArray(sidecarData.tags) ? sidecarData.tags : [category, "Shanmukh AI Films"],
      liveUrl: sidecarData.liveUrl,
      githubUrl: sidecarData.githubUrl,
      aspectRatio: sidecarData.aspectRatio || (mediaType === "video" ? "16/9" : "4/3"),
      originalFilename: filename,
      originalRelativePath: relFromAssets.split(path.sep).join("/"),
    };

    projects.push(project);
  }

  // Derive unique categories
  const categoriesSet = new Set<string>();
  projects.forEach((p) => categoriesSet.add(p.category));

  // Sort projects: featured first, then original Shanmukh productions, then newest year
  projects.sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    const aIsOriginal =
      a.client?.includes("Shanmukh") ||
      a.title.includes("Shanmukh") ||
      a.title.includes("Canteen") ||
      a.title.includes("Samosa") ||
      a.title.includes("VFX");
    const bIsOriginal =
      b.client?.includes("Shanmukh") ||
      b.title.includes("Shanmukh") ||
      b.title.includes("Canteen") ||
      b.title.includes("Samosa") ||
      b.title.includes("VFX");
    if (aIsOriginal !== bIsOriginal) {
      return aIsOriginal ? -1 : 1;
    }
    if (a.year !== b.year) {
      return b.year - a.year;
    }
    return a.title.localeCompare(b.title);
  });

  const manifest: ProjectManifest = {
    lastGenerated: new Date().toISOString(),
    totalProjects: projects.length,
    categories: Array.from(categoriesSet),
    projects,
  };

  fs.writeFileSync(OUTPUT_MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");
  console.log(`✅ Project manifest generated with ${projects.length} project(s) at ${OUTPUT_MANIFEST_PATH}`);

  return manifest;
}

// Execute if run directly
if (require.main === module || process.argv[1]?.includes("generate-project-manifest")) {
  generateProjectManifest();
}
