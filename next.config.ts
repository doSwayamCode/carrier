import type { NextConfig } from "next";

// GITHUB_PAGES=true builds a static export served from https://<owner>.github.io/carrier
const pages = process.env.GITHUB_PAGES === "true";
const basePath = pages ? "/carrier" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(pages && { output: "export", basePath, trailingSlash: true }),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: pages
    ? { loader: "custom", loaderFile: "./lib/imageLoader.ts" }
    : { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
