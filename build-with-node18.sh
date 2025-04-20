#!/bin/bash

# This script downloads and uses Node.js v18.20.8 to build the project
# without requiring nvm or other version managers

echo "Setting up Node.js v18.20.8 for building..."

# Create a temporary directory for Node.js
TEMP_NODE_DIR="$(pwd)/.temp-node"
mkdir -p "$TEMP_NODE_DIR"

# Determine OS and architecture
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)

# Map architecture to Node.js naming
if [ "$ARCH" = "x86_64" ]; then
  ARCH="x64"
elif [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then
  ARCH="arm64"
fi

# Download Node.js v18.20.8
if [ "$OS" = "darwin" ]; then
  # macOS
  NODE_URL="https://nodejs.org/dist/v18.20.8/node-v18.20.8-$OS-$ARCH.tar.gz"
elif [ "$OS" = "linux" ]; then
  # Linux
  NODE_URL="https://nodejs.org/dist/v18.20.8/node-v18.20.8-$OS-$ARCH.tar.xz"
else
  echo "Unsupported OS: $OS"
  exit 1
fi

echo "Downloading Node.js from $NODE_URL..."
if [ "$OS" = "darwin" ]; then
  curl -L "$NODE_URL" | tar xz -C "$TEMP_NODE_DIR" --strip-components 1
else
  curl -L "$NODE_URL" | tar xJ -C "$TEMP_NODE_DIR" --strip-components 1
fi

# Add Node.js to PATH
export PATH="$TEMP_NODE_DIR/bin:$PATH"

# Check Node.js version
echo "Using Node.js $(node -v) and npm $(npm -v)"

# Fix tsconfig.json first
echo "Fixing tsconfig.json..."
node fix-tsconfig.js

# Clean install dependencies to fix any package issues
echo "Clean installing dependencies..."
rm -rf node_modules
rm -rf client/node_modules
rm -f package-lock.json
rm -f client/package-lock.json

npm install

# Run build
echo "Building project..."
npm run build

# Clean up
echo "Cleaning up temporary Node.js installation..."
rm -rf "$TEMP_NODE_DIR"

echo "Build process completed!" 