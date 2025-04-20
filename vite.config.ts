import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Simple production configuration
export default defineConfig({
  plugins: [react()],
  root: "client",
  server: {
    port: 5500,
    strictPort: false,
    host: true,
    cors: true
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true
  }
}); 