#!/usr/bin/env node

/**
 * This script ensures the vite.config.ts file exists in the client directory
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientDir = path.join(__dirname, 'client');
const viteConfigPath = path.join(clientDir, 'vite.config.ts');

console.log(`Checking for vite.config.ts at ${viteConfigPath}...`);

// Default Vite config content
const viteConfigContent = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: false,
    host: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
`;

try {
  // Create vite.config.ts if it doesn't exist
  if (!fs.existsSync(viteConfigPath)) {
    fs.writeFileSync(viteConfigPath, viteConfigContent);
    console.log(`Created vite.config.ts at ${viteConfigPath}`);
  } else {
    console.log(`vite.config.ts already exists at ${viteConfigPath}`);
  }
} catch (error) {
  console.error(`Error ensuring vite.config.ts exists: ${error.message}`);
  process.exit(1);
} 