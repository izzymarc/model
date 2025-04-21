// Script to rename the new images from April 2025
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory using ES modules approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the images directory
const imagesDir = __dirname;

// Map of timestamped image filenames to new names
const renameMap = {
  'photo_2025-04-21 13.29.39.jpg': 'editorial-red-top.jpg',
  'photo_2025-04-21 13.29.43.jpg': 'editorial-black-dress.jpg',
  'photo_2025-04-21 13.29.47.jpg': 'beauty-black-top.jpg',
  'photo_2025-04-21 13.29.51.jpg': 'beauty-natural.jpg',
  'photo_2025-04-21 13.29.55.jpg': 'commercial-pattern-dress.jpg',
  'photo_2025-04-21 13.29.59.jpg': 'commercial-casual.jpg',
  'photo_2025-04-21 13.30.02.jpg': 'commercial-blue-pattern.jpg',
  'photo_2025-04-21 13.30.06.jpg': 'beauty-headshot.jpg',
  'photo_2025-04-21 13.30.10.jpg': 'beauty-natural-portrait.jpg',
  'photo_2025-04-21 13.30.15.jpg': 'beauty-closeup.jpg',
  'photo_2025-04-21 13.30.18.jpg': 'beauty-profile.jpg',
  'photo_2025-04-21 13.28.56.jpg': 'editorial-casual.jpg',
  'photo_2025-04-21 13.29.03.jpg': 'editorial-evening.jpg',
  'photo_2025-04-21 13.29.10.jpg': 'beauty-minimal.jpg',
  'photo_2025-04-21 13.29.14.jpg': 'commercial-casual-2.jpg',
  'photo_2025-04-21 13.29.18.jpg': 'commercial-pattern-2.jpg',
  'photo_2025-04-21 13.29.31.jpg': 'runway-evening.jpg',
  'photo_2025-04-21 13.29.34.jpg': 'portrait-elegant.jpg'
};

// Function to rename files
function renameNewImages() {
  console.log('Starting new image renaming process...');

  Object.entries(renameMap).forEach(([oldName, newName]) => {
    const oldPath = path.join(imagesDir, oldName);
    const newPath = path.join(imagesDir, newName);

    // Check if old file exists
    if (fs.existsSync(oldPath)) {
      // Rename the file
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed: ${oldName} -> ${newName}`);
    } else {
      console.log(`Warning: ${oldName} not found in directory`);
    }
  });

  console.log('New image renaming completed!');
}

// Execute the renaming process
renameNewImages(); 