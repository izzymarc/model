#!/bin/bash

# Kill any processes running on port 3000 or 4000 or 4500
echo "Killing any processes running on ports 3000, 4000, and 4500..."

# For port 3000
if lsof -i :3000 >/dev/null 2>&1; then
  echo "Processes on port 3000:"
  lsof -i :3000
  echo "Killing processes on port 3000..."
  lsof -ti:3000 | xargs kill -9
  echo "Processes on port 3000 killed."
else
  echo "No processes found on port 3000."
fi

# For port 4000
if lsof -i :4000 >/dev/null 2>&1; then
  echo "Processes on port 4000:"
  lsof -i :4000
  echo "Killing processes on port 4000..."
  lsof -ti:4000 | xargs kill -9
  echo "Processes on port 4000 killed."
else
  echo "No processes found on port 4000."
fi

# For port 4500
if lsof -i :4500 >/dev/null 2>&1; then
  echo "Processes on port 4500:"
  lsof -i :4500
  echo "Killing processes on port 4500..."
  lsof -ti:4500 | xargs kill -9
  echo "Processes on port 4500 killed."
else
  echo "No processes found on port 4500."
fi

echo "All ports cleared. You can now run: npm run dev" 