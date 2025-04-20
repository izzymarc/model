#!/usr/bin/env node

/**
 * This script fixes the tsconfig.json file to ensure it is valid JSON
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tsConfigPath = path.join(__dirname, 'client', 'tsconfig.json');

console.log(`Fixing tsconfig.json at ${tsConfigPath}...`);

// Create a properly formatted tsconfig.json
const tsConfigContent = {
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noImplicitAny": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
};

try {
  // Write the properly formatted JSON
  fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfigContent, null, 2));
  console.log('Successfully fixed tsconfig.json');
} catch (error) {
  console.error(`Error fixing tsconfig.json: ${error.message}`);
  process.exit(1);
} 