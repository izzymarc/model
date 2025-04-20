#!/usr/bin/env node

/**
 * This script fixes the tsconfig.json file and creates tsconfig.node.json if it doesn't exist
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientDir = path.join(__dirname, 'client');
const tsConfigPath = path.join(clientDir, 'tsconfig.json');
const tsConfigNodePath = path.join(clientDir, 'tsconfig.node.json');

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

// Create tsconfig.node.json content
const tsConfigNodeContent = {
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
};

try {
  // Write the properly formatted JSON
  fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfigContent, null, 2));
  console.log('Successfully fixed tsconfig.json');
  
  // Create tsconfig.node.json if it doesn't exist
  if (!fs.existsSync(tsConfigNodePath)) {
    fs.writeFileSync(tsConfigNodePath, JSON.stringify(tsConfigNodeContent, null, 2));
    console.log(`Created tsconfig.node.json at ${tsConfigNodePath}`);
  } else {
    console.log(`tsconfig.node.json already exists at ${tsConfigNodePath}`);
  }
} catch (error) {
  console.error(`Error fixing TypeScript config files: ${error.message}`);
  process.exit(1);
} 