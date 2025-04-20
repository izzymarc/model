# Build Instructions

## Node.js Version Requirements

This project requires **Node.js v18.x** (specifically v18.20.8 is recommended) and **npm v10.x** to build correctly.

## Option 1: Using NVM (Node Version Manager)

If you have [NVM](https://github.com/nvm-sh/nvm) installed:

```bash
# Install the required Node.js version
nvm install 18.20.8

# Use the required Node.js version
nvm use 18.20.8

# Install dependencies
npm install

# Run scripts to ensure all required configuration files exist
node ensure-vite-config.js
node fix-tsconfig.js

# Build the project
npm run build
```

## Option 2: Using the Build Script

If you don't have NVM or don't want to change your global Node.js version, use the provided build script:

```bash
# Make the script executable (if not already)
chmod +x build-with-node18.sh

# Run the build script
./build-with-node18.sh
```

This script will:
1. Download and temporarily install Node.js v18.20.8
2. Ensure vite.config.ts exists
3. Fix the tsconfig.json file and create tsconfig.node.json if needed
4. Clean install all dependencies
5. Build the project
6. Clean up the temporary Node.js installation

## Required Files

The following configuration files are required:

1. `client/vite.config.ts` - Vite build configuration
2. `client/tsconfig.json` - Main TypeScript configuration
3. `client/tsconfig.node.json` - TypeScript configuration for Vite

If any of these files is missing, the build will fail. Our scripts will automatically create them if they don't exist.

## Troubleshooting

If you encounter build errors:

1. **Missing configuration files**:
   Run the config scripts manually:
   ```bash
   node ensure-vite-config.js
   node fix-tsconfig.js
   ```

2. **Missing dependencies**:
   Try cleaning node_modules and reinstalling:
   ```bash
   rm -rf node_modules client/node_modules
   rm -f package-lock.json client/package-lock.json
   npm install
   ```

3. **TypeScript errors**:
   The prebuild script should handle this automatically, but you can run it manually:
   ```bash
   node fix-typescript-errors.js
   ```

4. **Other errors**:
   Check the error message for details. You might need to install additional system dependencies depending on your OS.

## Environment Variables

Make sure any required environment variables are properly set up for the build to succeed. 