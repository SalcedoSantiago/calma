import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sitio estático para GitHub Pages (carpeta `out/`).
  output: "export",
  trailingSlash: true,
  // En Pages el sitio vive en /calma; en local queda en la raíz.
  basePath: process.env.PAGES_BASE_PATH || "",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
