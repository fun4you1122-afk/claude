import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/claude/",
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash]-r1.js",
        chunkFileNames: "assets/[name]-[hash]-r1.js",
        assetFileNames: "assets/[name]-[hash]-r1.[ext]",
      },
    },
  },
});
