# Premium Creative Portfolio & Asset-Based CMS

> Production-quality personal portfolio website for **Veerepalli Shanmukh** — AI Filmmaker, Creative Technologist, AI Video Creator, and Software Developer. Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and Three.js / React Three Fiber.

---

## 🌟 Highlights & Philosophy

- **Automatic Asset-Based Portfolio**: Simply drop videos, images, or 3D models into the root `assets/` folder. The built-in discovery script scans files, auto-generates clean titles, infers categories, syncs web-optimized media, and generates a typed manifest. Zero UI component editing needed to publish new work!
- **Cinematic Creative Studio Aesthetic**: Deep jet black backgrounds (`#08090D`), royal blue accents (`#3B82F6`), hyacinth highlights (`#8B5CF6`), blackberry gradient surfaces (`#171B3A`), and editorial typography.
- **Interactive 3D Hero Experience**: Abstract geometric sculpture with real-time mouse-responsive parallax, floating particles, and brand-tinted point lighting powered by React Three Fiber & Three.js.
- **Rich Media & Video Previews**: Muted hover video previews on desktop, full-screen video lightbox modal, responsive media player, and automatic companion poster extraction.
- **Dynamic Case Study Routes**: Dedicated `/projects/[slug]` pages featuring project objectives, creative processes, technical stacks, results, and previous/next navigation.
- **Complete Biographical Profile**: Detailed About Me page and home section featuring Shanmukh's B.Tech in Artificial Intelligence, creative philosophy, experience with Shanmukh AI Film Makers, specializations, and career goals.
- **100% Local & Static Deployable**: No database, no backend server, no authentication, no paid APIs. Deployable anywhere as a static site (GitHub Pages, Netlify, Cloudflare Pages, Vercel).

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **Next.js 15 (App Router)** | Framework, static route generation, image/video presentation |
| **TypeScript** | Strict end-to-end type safety |
| **Tailwind CSS** | Styling with custom brand palette & glassmorphism |
| **Framer Motion** | Staggered entrance animations, smooth layout transitions |
| **React Three Fiber & Three.js** | Interactive 3D hero canvas with mouse parallax |
| **Lucide React** | Clean, accessible iconography |
| **Node.js Filesystem & TSX** | Automatic build-time asset scanning and sync pipeline |

---

## 📁 Project Structure

```
shanmukh-portfolio/
├── assets/                          # 📁 Source of truth for portfolio media
│   ├── images/
│   │   ├── profile/                 # Profile photos (synced to /profile/)
│   │   ├── projects/                # Still graphics, UI mockups, concept art
│   │   ├── thumbnails/              # Custom image thumbnails
│   │   └── backgrounds/             # Atmospheric backgrounds
│   ├── videos/
│   │   ├── ai-filmmaking/           # Cinematic short films & trailers
│   │   ├── advertisements/          # AI commercial ads & brand campaigns
│   │   ├── vfx/                     # Procedural visual effects experiments
│   │   └── experiments/             # Interactive & audio-reactive experiments
│   ├── 3d/
│   │   ├── models/                  # .glb / .gltf 3D assets
│   │   └── textures/                # Texture files
│   └── documents/
│       ├── resume.pdf               # Resume (automatically synced to /documents/resume.pdf)
│       └── certificates/            # Verified credentials
├── public/                          # Publicly served Next.js directory (synced by scanner)
│   ├── documents/
│   ├── media/
│   └── profile/
├── scripts/
│   ├── generate-project-manifest.ts # Asset discovery & manifest generator
│   └── seed-sample-assets.py        # Starter asset generator
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout (fonts, metadata, cursor)
│   │   ├── page.tsx                 # Homepage (Hero, Featured, Gallery, About, Skills, Contact)
│   │   ├── globals.css              # Custom styling, scrollbars, brand colors
│   │   ├── icon.svg                 # Brand favicon
│   │   ├── not-found.tsx            # Custom 404 page
│   │   ├── robots.ts                # Search engine crawler instructions
│   │   ├── sitemap.ts               # Dynamic XML sitemap
│   │   ├── about/
│   │   │   └── page.tsx             # Full biography & curriculum vitae page
│   │   └── projects/
│   │       └── [slug]/
│   │           └── page.tsx         # Dynamic case study route
│   ├── components/
│   │   ├── about/                   # AboutSection component
│   │   ├── contact/                 # ContactSection with direct email & copy action
│   │   ├── hero/                    # Hero section with 3D Canvas
│   │   ├── layout/                  # Navbar & Footer
│   │   ├── projects/                # ProjectCard, FeaturedWork, WorkGallery, VideoModal
│   │   ├── skills/                  # Categorized skills matrix
│   │   ├── three/                   # React Three Fiber HeroScene
│   │   └── ui/                      # CustomCursor & interactive controls
│   ├── config/
│   │   ├── site.ts                  # Centralized configuration (Profile, Links, Skills)
│   │   ├── projects.ts              # Projects query barrel
│   │   └── generated-projects.json  # Auto-generated project manifest
│   ├── lib/
│   │   ├── assets.ts                # Query helpers (getAllProjects, getFeatured, etc.)
│   │   └── utils.ts                 # Utility helpers (cn, slugify)
│   └── types/
│       └── project.ts               # TypeScript interfaces
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm** or **pnpm** / **yarn**

### 2. Installation
```bash
# Install dependencies
npm install
```

### 3. Running in Development
```bash
# Scans assets and starts local dev server at http://localhost:3000
npm run dev
```

### 4. Available Commands

| Command | Action |
|---|---|
| `npm run dev` | Runs asset scanner and launches local Next.js dev server |
| `npm run assets:scan` | Manually triggers the asset discovery and manifest generator |
| `npm run build` | Scans assets and compiles production static export into `/out` |
| `npm run start` | Serves production build locally |

---

## ⚡ How the Automatic Asset Discovery Works

You do **not** need to touch React code or write JSON files when adding new media!

### Step 1: Add your media file to `assets/`
Place your file into the appropriate category folder:
- **Cinematic AI videos**: `assets/videos/ai-filmmaking/my-film.mp4`
- **AI Commercials**: `assets/videos/advertisements/brand-ad.mp4`
- **VFX / Motion**: `assets/videos/vfx/particle-morph.mp4`
- **Software / Web**: `assets/images/projects/saas-dashboard.png`
- **Experiments**: `assets/videos/experiments/audio-reactive.mp4`
- **Resume**: `assets/documents/resume.pdf`
- **Profile Picture**: `assets/images/profile/shanmukh-portrait.webp`

### Step 2: (Optional) Add a Sidecar JSON metadata file
If you want to customize the project title, client name, objective, process, or tools, create a `.json` file with the **exact same name** as your media file:

Example:
For `assets/videos/advertisements/aurora-car-ad.mp4`, create `assets/videos/advertisements/aurora-car-ad.json`:

```json
{
  "title": "Aurora Automotive Film",
  "description": "A cinematic automotive commercial film created with AI filmmaking tools, generative reflections, and synthetic camera tracking.",
  "category": "AI Advertisements",
  "year": 2026,
  "featured": true,
  "tools": ["Google Flow", "OpenArt", "ElevenLabs", "Color Grading"],
  "client": "Aurora Mobility Labs",
  "objective": "Craft a high-octane luxury electric vehicle launch trailer using synthetic visual generation with zero physical shoot.",
  "process": "Explored custom prompt workflows to maintain vehicle exterior consistency across multiple camera angles.",
  "results": "Achieved photorealistic reflections and cinematic atmosphere at 90% reduced production lead time.",
  "tags": ["AI Commercial", "Automotive", "Generative Cinema"]
}
```

### Step 3: What happens if metadata is omitted?
The asset discovery script automatically:
1. Strips dashes and underscores to format a human title (e.g., `cyber-punk-trailer.mp4` becomes **Cyber Punk Trailer**).
2. Infers the category from the folder name (`advertisements` becomes **AI Advertisements**).
3. Assigns default tags and tools based on media type.
4. Looks for a companion poster (e.g., `cyber-punk-trailer-poster.webp`) or generates a video thumbnail.
5. Safely creates a unique URL-friendly slug (`/projects/cyber-punk-trailer/`).

### Step 4: Run the scan
```bash
npm run assets:scan
```
Refresh your browser and the new project will be live!

---

## 🎨 Supported File Formats

| Category | Extensions |
|---|---|
| **Images** | `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif` |
| **Videos** | `.mp4`, `.webm`, `.mov` (H.264 / AAC recommended for universal browser playback) |
| **3D Models** | `.glb`, `.gltf` |
| **Documents** | `.pdf` |

---

## 📝 Customizing Profile, Skills & Social Links

All personal information is managed in one central file:
[`src/config/site.ts`](file:///c:/Users/shanm/Downloads/batch%202%20week%208/src/config/site.ts)

### 1. Update Contact Information
```typescript
contact: {
  email: "your.name@gmail.com",
  location: "Hyderabad, Telangana, India",
  inquiries: "Available for relevant AI filmmaking collaborations...",
}
```

### 2. Update Social Links
```typescript
socials: {
  linkedin: "https://www.linkedin.com/in/your-handle",
  github: "https://github.com/your-username",
  youtube: "https://youtube.com/@your-channel",
  instagram: "https://instagram.com/your-handle",
}
```
> **Smart Placeholder Protection**: Any link left blank or containing bracketed instructions (e.g. `"[Add your LinkedIn URL]"`) is automatically hidden on the published website.

### 3. Update Skills Matrix
Edit the `skills` array inside `src/config/site.ts`:
```typescript
skills: [
  {
    category: "AI Filmmaking & Creative Tools",
    items: ["Google Flow", "OpenArt", "ElevenLabs", "Runway Gen-3", "Midjourney v6"],
  },
  // Add or remove items as desired
]
```

---

## 🚢 Production Build & Deployment

### Static Export (GitHub Pages, Netlify, Cloudflare Pages, S3)
The project is configured for static export (`output: "export"` in `next.config.ts`).

1. Compile the static site:
```bash
npm run build
```
2. The complete static website is exported to the **`out/`** directory.
3. Deploy the contents of **`out/`** to any static host:
   - **GitHub Pages**: Set build command to `npm run build` and publish directory to `out`.
   - **Netlify**: Set build command to `npm run build` and publish directory to `out`.
   - **Vercel**: Import project and Vercel will build automatically.
   - **Cloudflare Pages**: Set build command to `npm run build` and output directory to `out`.

---

## 💡 Troubleshooting & Best Practices

- **Video Autoplay on Mobile**: Mobile browsers disallow unmuted autoplay. All hover video previews are muted with `playsinline` attributes to comply with iOS Safari and Android Chrome policies.
- **Large Video Files**: For optimal web performance, keep video clips compressed to under 15MB each, or use H.264 MP4 with 1080p/720p resolution.
- **Companion Posters**: Adding a `-poster.webp` next to your video (e.g., `film-ad-poster.webp` beside `film-ad.mp4`) ensures lightning-fast card loading before video frames stream.
