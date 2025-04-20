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
2. Fix the tsconfig.json file
3. Clean install all dependencies
4. Build the project
5. Clean up the temporary Node.js installation

## Troubleshooting

If you encounter build errors:

1. **tsconfig.json parsing error**:
   Run the fix-tsconfig.js script manually:
   ```bash
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