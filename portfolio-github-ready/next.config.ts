import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Support static HTML export if deployed to GitHub Pages, Netlify, Cloudflare Pages, etc.
  output: "export",
  outputFileTracingRoot: path.join(__dirname),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Transpile Three.js packages for smooth SSR compatibility
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;
