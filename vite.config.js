import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/generate": "https://chloebotbackend-production.up.railway.app/",
      "/tweak": "https://chloebotbackend-production.up.railway.app/",
      "/research": "https://chloebotbackend-production.up.railway.app/",
    },
  },
});
