import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/generate": {
        target: "https://chloebotbackend-production.up.railway.app/",
        changeOrigin: true,
        secure: true,
      },
      "/tweak": {
        target: "https://chloebotbackend-production.up.railway.app/",
        changeOrigin: true,
        secure: true,
      },
      "/research": {
        target: "https://chloebotbackend-production.up.railway.app/",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    outDir: "dist",
  },
  preview: {
    port: 4173,
  },
});
